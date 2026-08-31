#!/usr/bin/env python3
"""
TinyFish Search & Fetch CLI client.
Uses only stdlib — no pip install required.

API key resolution order:
  1. --key-file CLI argument
  2. .tinyfish-key file in the skill root (auto-detected from script location)
  3. TINYFISH_API_KEY environment variable

Usage:
  python tinyfish-client.py search --query "your query" [--location US] [--language en] [--page 0]
  python tinyfish-client.py fetch --urls "https://example.com" ["https://example2.com"] [--format markdown] [--ttl 0]
"""

import argparse
import json
import os
import random
import sys
import time
import urllib.request
import urllib.parse
import urllib.error

SEARCH_ENDPOINT = "https://api.search.tinyfish.ai"
FETCH_ENDPOINT = "https://api.fetch.tinyfish.ai"
TIMEOUT = 150  # seconds (recommended by TinyFish for Fetch)

# ── Auto-detect skill root for key file ──────────────────────────────
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_SKILL_ROOT = os.path.dirname(_SCRIPT_DIR)  # scripts/ → skill root
_DEFAULT_KEY_FILE = os.path.join(_SKILL_ROOT, ".tinyfish-key")


def _resolve_api_key(key_file_override=None):
    """Resolve API key from override → key file → env var."""
    # 1. CLI override
    if key_file_override:
        try:
            with open(key_file_override, "r") as f:
                key = f.readline().strip()
                if key:
                    return key
        except (FileNotFoundError, PermissionError):
            pass
        print(json.dumps({
            "error": "Cannot read key file",
            "path": key_file_override,
            "hint": "Run setup first: create .tinyfish-key with your API key"
        }, indent=2))
        sys.exit(1)

    # 2. Auto-detected .tinyfish-key in skill root
    if os.path.isfile(_DEFAULT_KEY_FILE):
        try:
            with open(_DEFAULT_KEY_FILE, "r") as f:
                key = f.readline().strip()
                if key:
                    return key
        except (PermissionError, OSError):
            pass

    # 3. Environment variable
    env_key = os.environ.get("TINYFISH_API_KEY", "")
    if env_key:
        return env_key

    # Nothing found — give clear guidance
    print(json.dumps({
        "error": "No TinyFish API key configured",
        "fix": "Create a file at one of these locations with your API key as the only content:",
        "options": [
            _DEFAULT_KEY_FILE,
            "Or set the TINYFISH_API_KEY environment variable",
            "Or pass --key-file /path/to/key"
        ],
        "get_key": "Visit https://agent.tinyfish.ai/api-keys to get your API key"
    }, indent=2))
    sys.exit(1)


RETRY_STATUSES = {429, 500, 502, 503, 504}
MAX_RETRIES = 3
BASE_BACKOFF = 2.0  # seconds; doubles per attempt + jitter


def _request(method, url, body=None, api_key=None):
    """Make an HTTP request with the X-API-Key header.
    Retries with exponential backoff on 429/5xx so transient rate-limit
    errors don't kill a run."""
    data = json.dumps(body).encode("utf-8") if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-API-Key", api_key)
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json")

    for attempt in range(MAX_RETRIES + 1):
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code in RETRY_STATUSES and attempt < MAX_RETRIES:
                # Respect Retry-After if the server sent one
                retry_after = e.headers.get("Retry-After") if e.headers else None
                delay = (float(retry_after) if retry_after and retry_after.isdigit()
                         else BASE_BACKOFF * (2 ** attempt) + random.uniform(0, 1))
                print(json.dumps({"retry": e.code, "attempt": attempt + 1,
                                  "wait_s": round(delay, 1)}), file=sys.stderr)
                time.sleep(delay)
                continue
            error_body = e.read().decode("utf-8", errors="replace")
            try:
                error_json = json.loads(error_body)
            except json.JSONDecodeError:
                error_json = {"error": error_body}
            print(json.dumps({
                "http_status": e.code,
                "error": error_json
            }, indent=2))
            sys.exit(1)
        except urllib.error.URLError as e:
            print(json.dumps({"error": f"Connection failed: {e.reason}"}, indent=2))
            sys.exit(1)
        except Exception as e:
            print(json.dumps({"error": str(e)}, indent=2))
            sys.exit(1)


def cmd_search(args):
    """Execute a search query."""
    api_key = _resolve_api_key(args.key_file)
    params = {"query": args.query}
    if args.location:
        params["location"] = args.location
    if args.language:
        params["language"] = args.language
    if args.page is not None:
        params["page"] = args.page

    qs = urllib.parse.urlencode(params)
    url = f"{SEARCH_ENDPOINT}?{qs}"
    result = _request("GET", url, api_key=api_key)
    print(json.dumps(result, indent=2))


def cmd_fetch(args):
    """Fetch and extract content from URLs."""
    api_key = _resolve_api_key(args.key_file)
    body = {"urls": args.urls}

    if args.format:
        body["format"] = args.format
    if args.links:
        body["links"] = True
    if args.image_links:
        body["image_links"] = True
    if args.ttl is not None:
        body["ttl"] = args.ttl

    result = _request("POST", FETCH_ENDPOINT, body=body, api_key=api_key)
    print(json.dumps(result, indent=2))


def main():
    parser = argparse.ArgumentParser(
        description="TinyFish Search & Fetch CLI",
        prog="tinyfish-client"
    )
    parser.add_argument("--key-file", default=None,
                        help="Path to file containing API key (default: <skill-dir>/.tinyfish-key)")

    sub = parser.add_subparsers(dest="command", required=True)

    # Search subcommand
    search_p = sub.add_parser("search", help="Search the web")
    search_p.add_argument("--query", required=True, help="Search query string")
    search_p.add_argument("--location", default=None, help="Country code (US, GB, FR, DE, etc.)")
    search_p.add_argument("--language", default=None, help="Language code (en, fr, de, etc.)")
    search_p.add_argument("--page", type=int, default=None, help="Page number (0-based, max 10)")
    search_p.set_defaults(func=cmd_search)

    # Fetch subcommand
    fetch_p = sub.add_parser("fetch", help="Fetch and extract page content")
    fetch_p.add_argument("--urls", nargs="+", required=True, help="One or more URLs (max 10)")
    fetch_p.add_argument("--format", default="markdown", choices=["markdown", "html", "json"],
                         help="Output format (default: markdown)")
    fetch_p.add_argument("--links", action="store_true", help="Include all <a href> links from page")
    fetch_p.add_argument("--image-links", action="store_true", help="Include all <img src> links from page")
    fetch_p.add_argument("--ttl", type=int, default=None,
                         help="Cache TTL in seconds (0=live fetch, omit=any cache)")
    fetch_p.set_defaults(func=cmd_fetch)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()

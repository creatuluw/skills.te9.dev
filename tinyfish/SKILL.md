---
name: tinyfish
description: "Search the web using TinyFish Search API and fetch clean, LLM-ready extracted content from URLs using TinyFish Fetch API (real browser rendering, Markdown/HTML/JSON output). Use ALONGSIDE websearch and websearch_deep when the user wants to search the internet, find information online, or fetch page content from specific URLs — TinyFish provides additional coverage and different result rankings. Keywords: tinyfish, web search, fetch url, page content, extract text."
---

# TinyFish Search & Fetch

## Setup (First Run)

Before using this skill, the LLM MUST check whether the API key is configured:

```
1. Check if <skill-dir>/.tinyfish-key exists
2. If EXISTS: proceed to use the script
3. If MISSING:
   a. Tell user: "TinyFish needs an API key. Get one at https://agent.tinyfish.ai/api-keys"
   b. Ask user: "Please paste your TinyFish API key and I'll store it:"
   c. Write the trimmed key to <skill-dir>/.tinyfish-key
   d. Confirm: "API key stored. Ready."
```

Replace `<skill-dir>` with the absolute path to this skill's directory.

## Quick Start

```bash
python "<skill-dir>/scripts/tinyfish-client.py" search --query "quantum computing"
python "<skill-dir>/scripts/tinyfish-client.py" fetch --urls "https://example.com" "https://example2.com"
```

The script auto-detects `.tinyfish-key` in the skill root. Use `--help` on any subcommand for all options.

## When to Use This vs. Built-in Tools

TinyFish runs **alongside** `websearch` and `websearch_deep` — not instead of them:

| Tool | Best for |
|------|----------|
| `websearch` | Broad first pass (SearXNG + DuckDuckGo) |
| **TinyFish Search** | Additional rankings from a different engine — same query, more results |
| `websearch_deep` | Fast text extraction from known URLs |
| **TinyFish Fetch** | JS-heavy pages, real browser rendering, cleaner Markdown extraction |

## Workflows

### Broad Research (Use All Tools)

```
1. websearch("topic") + TinyFish search --query "topic"  → run both in parallel
2. Deduplicate URLs across both result sets
3. websearch_deep on top URLs → fast extraction
4. TinyFish fetch on JS-heavy / remaining URLs → browser-rendered Markdown
```

### Geo-Targeted Search

```bash
python scripts/tinyfish-client.py search --query "restaurants" --location FR --language fr
```

### Live Fetch (Bypass Cache)

```bash
python scripts/tinyfish-client.py fetch --urls "https://example.com" --ttl 0
```

## Rate Limits & Pacing

**Measured 2026-08-10** (this setup): search burst ~100 req/min ran clean (no 429); fetch 15 URLs/min fine, latency 1–13s per call. The documented plan caps below are the real ceiling — stay under them.

**Hard caps — do not exceed:**
- **Search: max 20 requests per minute** (documented cap: 30/min on Free & Pay As You Go) and **max 3 searches in parallel**
- **Fetch: max 10 URLs per call** (API max) and space calls **≥2s apart**; documented cap: 150 URLs/min on Free & Pay As You Go
- On 429: the client auto-retries with backoff (up to 3x). If it still fails, **pause ≥60s** before the next call
- TinyFish runs *alongside* websearch — a research task doubles engine traffic. Fewer, well-chosen queries beat many variations

## Key Script Flags

**Search**: `--query` (required), `--location`, `--language`, `--page`
**Fetch**: `--urls` (required, max 10), `--format` (markdown|html|json), `--links`, `--image-links`, `--ttl`
**Global**: `--key-file` (override auto-detected key path)

See `--help` or [REFERENCE.md](REFERENCE.md) for full schemas, error codes, and rate limits.

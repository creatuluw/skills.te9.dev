# TinyFish API Reference

## Authentication

All requests require the `X-API-Key` header. The script resolves the key in this order:

1. `--key-file` CLI argument (explicit path to a key file)
2. `<skill-dir>/.tinyfish-key` (auto-detected from script location — **recommended**)
3. `TINYFISH_API_KEY` environment variable

### Recommended: Key file

Create `<skill-dir>/.tinyfish-key` with your API key as the only content:

```
sk-tinyfish-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The LLM handles this automatically on first use — it checks for the file, asks you for the key if missing, and writes it.

### Alternative: Environment variable

```bash
export TINYFISH_API_KEY="your_api_key_here"
```

Get your key at: https://agent.tinyfish.ai/api-keys

---

## Search API

### Endpoint

```
GET https://api.search.tinyfish.ai
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | **Yes** | Search query. Supports operators: `site:domain`, `-site:domain` |
| `location` | string | No | Country code (US, GB, FR, DE, etc.). Auto-resolves from language if omitted. Defaults to US. |
| `language` | string | No | Language code (en, fr, de, etc.). Auto-resolves from location if omitted. Defaults to en. |
| `page` | number | No | Page number, 0-based. Max 10. |

Location & language auto-resolution: if only one is provided, the other auto-resolves to the predominant pairing (e.g. `location=BR` → `language=pt`).

### Response Shape

```json
{
  "query": "web automation tools",
  "results": [
    {
      "position": 1,
      "site_name": "tinyfish.ai",
      "title": "TinyFish — AI Web Automation Platform",
      "snippet": "Automate any website with natural language instructions...",
      "url": "https://tinyfish.ai"
    }
  ],
  "total_results": 10,
  "page": 0
}
```

### HTTP Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Invalid request — missing query or bad parameter |
| 401 | Missing or invalid API key |
| 402 | Payment required — active subscription required |
| 403 | Search API not enabled for this account |
| 404 | Search API not available |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 503 | Search service unavailable — retry with backoff |

### Rate Limits (requests/minute)

| Plan | RPM |
|------|-----|
| Free | 30 |
| Pay As You Go | 30 |
| Starter | 60 |
| Pro | 120 |

### Billing

Search does **not** consume credits.

---

## Fetch API

### Endpoint

```
POST https://api.fetch.tinyfish.ai
```

### Request Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `urls` | string[] | **Yes** | — | URLs to fetch (max 10). Must be http/https. Private IPs, localhost, cloud metadata endpoints rejected. |
| `format` | string | No | `"markdown"` | Output format: `html`, `markdown`, or `json` |
| `links` | boolean | No | `false` | Include all `<a href>` URLs from the page |
| `image_links` | boolean | No | `false` | Include all `<img src>` URLs from the page |
| `ttl` | integer | No | omitted | Cache freshness in seconds. `0` = live fetch, omit = any cache, positive = max age. |
| `proxy_config` | object | No | — | Route through specific country: `{"country_code": "US"}` |

### Response Shape

```json
{
  "results": [
    {
      "url": "https://www.tinyfish.ai/",
      "final_url": "https://www.tinyfish.ai/",
      "title": "TinyFish | Enterprise Web Agent Infrastructure",
      "description": "TinyFish provides enterprise infrastructure for AI web agents.",
      "language": "en",
      "text": "# TinyFish | Enterprise Web Agent Infrastructure\n\n...",
      "format": "markdown",
      "latency_ms": 1234
    }
  ],
  "errors": []
}
```

Fields that cannot be extracted (`title`, `description`, `language`, `author`, `published_date`) are **omitted** from the response when null.

### HTTP Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Invalid request — missing urls, too many URLs (>10), or bad parameter |
| 401 | Missing or invalid API key |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### Per-URL Error Codes (in `errors[]`)

| Error Code | Status Field | Meaning |
|------------|-------------|---------|
| `target_http_error` | HTTP code | Target server returned non-2xx (not 404/410) |
| `page_not_found` | 404 or 410 | Target URL does not exist |
| `target_unreachable` | — | Connection refused, TLS failure, DNS failure |
| `timeout` | — | Page didn't finish loading within 110s deadline |
| `bot_blocked` | — | Bot-protection challenge (Cloudflare, Incapsula) |
| `empty_content` | — | HTML returned but no extractable text |
| `invalid_url` | — | URL rejected (private IP, invalid scheme) |
| `invalid_redirect_url` | — | Redirect target rejected |
| `proxy_error` | — | Proxy tunnel failed |

Per-URL failures appear in `errors[]` alongside a **200 response** — they do not fail the entire request.

### Supported Content Types

| Type | Behavior |
|------|----------|
| HTML | Full text extraction with formatting |
| PDF | Text content extracted |
| JSON | Raw JSON returned as text |
| Plain text | Full text returned |
| Images (PNG, JPG) | Not supported — returns error |

### Rate Limits (URLs/minute)

| Plan | URLs/min |
|------|----------|
| Free | 150 |
| Pay As You Go | 150 |
| Starter | 300 |
| Pro | 600 |

### Billing

Fetch does **not** consume credits.

### Timeouts

- Per-URL backend timeout: **110 seconds**
- CDN ceiling for full batch: **120 seconds**
- Recommended client timeout: **≥150 seconds**

---

## Output Format Comparison

| Format | Use Case | Example |
|--------|----------|---------|
| `markdown` | LLM consumption, readable storage (default) | `# Title\n\nParagraph text...` |
| `html` | Semantic structure preservation | `<h1>Title</h1><p>Text...</p>` |
| `json` | Programmatic content processing | `{"type":"document","children":[...]}` |

---

## Usage Endpoints

### Search Usage

```
GET https://api.search.tinyfish.ai/usage
```

### Fetch Usage

```
GET https://api.fetch.tinyfish.ai/usage
```

Query params: `start_after`, `end_before` (ISO 8601), `status`, `limit` (1-1000), `page`.

---

## Security Best Practices

- Store API key in environment variable — never hardcode in source
- Rotate keys periodically
- Use separate keys for development and production
- Monitor usage in the TinyFish dashboard

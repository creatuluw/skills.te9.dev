---
name: productsear.ch
description: "Discover working solutions, libraries, packages, patterns, and tools for a build problem via productsear.ch — a curated product/tool search engine with purpose and category metadata. Use when exploring options, finding packages, comparing libraries, hunting for examples/patterns, or when websearch results are too noisy or generic. Complements websearch/tinyfish: productsear.ch returns named products with structured metadata instead of blog posts."
---

# Productsear.ch Solutions Finder

Find named, working solutions (libraries, packages, SaaS, patterns) for a
concrete problem — before hand-rolling code or picking the first Google hit.

## When to use

- "Is there a package/tool for X?" / "what are my options for X?"
- "find a library that does X" / "best way to do X"
- Exploring alternatives before building
- websearch returned noise (blog posts, tutorials) instead of named tools

## Quick start

```bash
# One query, digest top results
curl -s "https://productsear.ch/api/search?q=<urlencoded query>" --max-time 20
```

Each result: `title`, `url`, `domain`, `excerpt`, `purpose` (1-line what-it-does),
`category`, `tags`. No API key, no auth.

## Query pattern (the important part)

Query **the problem shape**, not the marketing name — short noun phrases work
best (2–4 words). Examples that return high-quality hits:

- `url to markdown` — converters/readers
- `ocr pdf` — document extraction
- `svelte component library` — UI kits
- `rate limiter redis` — middleware
- `rich text editor` — input components

**Bad queries**: full sentences, code snippets, error messages. If results are
weak, rephrase as `[job-to-be-done] [tech/domain]`, not a question.

## Workflow

1. **Search** — 1–3 query variants (synonyms, different angle):
   `curl -s "https://productsear.ch/api/search?q=web+scraping+markdown"`
2. **Triage** — read `purpose` + `category` per result; shortlist 2–4 candidates
3. **Verify** — fetch the candidate URLs (github readme, docs) via
   `websearch_deep`/`fetch` to confirm: does it actually work, is it
   maintained, license, size/complexity
4. **Decide** — one line per option: name, what it does, why (not) a fit

Verification is mandatory — search snippets regularly describe abandoned or
aspirational projects. Working > popular: a 200-line maintained lib beats a
5k-star abandoned one for embedding in an app.

## Response shape

```json
{"query":"...","tookMs":1200,"count":20,"results":[
  {"title":"owner/name: ...","url":"https://github.com/...","domain":"github.com",
   "excerpt":"...","purpose":"...","category":"Content Extraction Service", ...}
]}
```

Ranking fields (`vecDistance`, `textRank`, `rrf`) exist but the default order
is already good — don't re-sort.

## Limits & pacing

- No key, no documented rate limit; observed ~1.5s latency, bursts of 3 fine
- Keep it to **≤6 queries per task** and **≤2 in parallel** — cheap tool, lazy
  habit of query-spamming is the only real risk
- 20 results per page; there is no pagination — refine the query instead

## Combining with other tools

| Need | Tool |
|---|---|
| Named tools/packages for a problem | **this skill** |
| How-tos, docs, opinions, current events | `websearch` |
| Full page content / JS-rendered pages | `websearch_deep` or tinyfish fetch |

Run productsear.ch + websearch in parallel for broad coverage; dedupe by URL.

## Decision checklist (per candidate)

- [ ] Actually does the job (read its readme/docs, not just the snippet)
- [ ] Maintained (recent commits or explicitly stable)
- [ ] License compatible (MIT/Apache safe; check for the rest)
- [ ] Cost of adoption < cost of hand-rolling (deps, config, surface area)
- [ ] Verified working — ran it, or read evidence of it running

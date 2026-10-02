# Leaf Search Method

How leaves search when a question needs external facts (grounded strategy,
and any leaf that must verify rather than reason). Ported from the search
patterns of [last30days-skill](https://github.com/mvanhorn/last30days-skill):
resolve before searching, expand queries, diversify source classes, fetch
depth, score, and floor for relevance.

## 1. RESOLVE before you search (the pre-research brain)

Before firing any search query, resolve what you are actually looking for:

- **Entities**: who/what are the named things? Resolve official names,
  aliases, common misspellings, and disambiguation (two people named X?).
- **BY vs ABOUT**: if the subject is a person/company, "things they said"
  and "things said about them" are different lanes — search both separately.
- **Where it lives**: which communities/venues hold the real discussion
  (subreddits, HN threads, GitHub issues, forums) and which hold the official
  record (docs, specs, release notes, filings).
- **Search terms**: for each leaf question, write 2–4 query variants —
  synonyms, entity aliases, expert phrasing vs lay phrasing, `site:`-targeted
  variants. One phrasing finds one slice; variants find the rest.

Log the resolution if it happens at the orchestrator level:
`{"event": "resolve", "node": "q-003", "entities": ["..."], "queries": ["..."]}`

## 2. Diversify source classes

Run query variants across source classes — each class is a different kind of
signal, and corroboration across classes is what upgrades confidence:

| Class | Signal | `site:` targets / where |
|-------|--------|--------------------------|
| Community | unfiltered practitioner opinion, gotchas | reddit.com, news.ycombinator.com, stackoverflow.com |
| Official | the authoritative record | vendor docs domains, w3.org, ietf.org |
| Academic | papers behind the hype | arxiv.org, scholar, acm.org |
| Code | what actually shipped | github.com (issues, releases, PRs) |
| News | editorial coverage, announcements | news domains |
| Primary | the source itself | specs, filings, datasets, changelogs |

A claim found only in News is weaker than the same claim in Official + Code.

## 3. Depth over snippets

Do not settle for search-result snippets. Pick the 2–4 most promising URLs
and fetch full content; extract the exact passages that answer the question.
Quote the passage, not your paraphrase of a snippet. A snippet that "looks
right" is how fabricated citations happen.

## 4. Score and floor

Rank what you found by:

- **Engagement**: upvotes, comment count, citations, stars — did anyone
  else with stakes agree?
- **Freshness**: note the publication date; prefer recent for
  fast-moving topics, and state "as of <date>" for anything versioned.
- **Relevance floor**: drop results that score high on engagement but are
  about a different thing (homonyms, adjacent products, old versions).
  A viral off-topic thread is noise, not signal.

## 5. Corroborate

- Same finding from ≥2 independent source classes → mark corroborated,
  confidence up.
- Single source → reported-only, confidence capped at medium.
- Contradiction between classes → record both; that is a finding, not an
  error to hide.

## 6. Leave a trail

The report is only as trustworthy as its trail: record what you actually
searched so the run is auditable and thin results are debuggable. Every leaf
that searched appends a **Search trail** section to its agent file (format in
[output-format.md](output-format.md)):

- the query variants actually run
- URLs opened (deep-fetched) and what was extracted from each
- URLs rejected and why (off-topic, stale, paywalled, low-trust)

A finding with no trail behind it is an opinion, not research.

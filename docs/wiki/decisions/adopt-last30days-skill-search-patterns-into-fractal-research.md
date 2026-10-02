---
type: Decision
title: Adopt last30days-skill search patterns into fractal-research
description: Context
tags: [fractal-research, search, skill, last30days]
status: accepted
timestamp: "2026-09-14T20:22:55.868Z"
---

# Adopt last30days-skill search patterns into fractal-research

## Context

User pointed at [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) and asked which of its methods would improve [[fractal-research-skill]]'s search/find effectiveness. That skill is social-media-trend oriented (Reddit/X/HN/Polymarket with API keys) but its *search method* is stronger than fractal-research's undifferentiated "web search" grounding.

## Decision

Port the search-method patterns (not the social-media machinery) into fractal-research:

**Adopted:**
- **Pre-research brain** → RESOLVE as operation 0 (`resolve` log event): resolve entities, BY/ABOUT lanes, and "where it lives" before any search fires.
- **Multi-query expansion** → 2–4 variants per search (synonyms, aliases, `site:` targets) instead of one phrasing.
- **Source-class diversification** → community / official / academic / code / news classes via `site:` queries (reddit.com, arxiv.org, github.com, HN) — same signal types as last30days' source matrix with **zero auth surface** (no API keys).
- **Depth over snippets** → deep-fetch promising URLs and quote the passage; relevance floor + engagement/freshness scoring + "as of" dating on every finding.
- **Cross-source cluster merging** → same finding across sources = one cluster with a corroboration count (formalizes what the Kahan convergence did organically).
- **Preflight/doctor + prior-run reuse + follow-up grounding** → preflight before dispatch, "from your library" reuse of overlapping prior runs.

**Skipped (deliberately, told not smuggled):** API-key source matrix, Best-Takes humor scoring, discovery/trending mode, watchlist/SQLite/library feeds, HTML emit — social-media-specific or scope creep for a question-driven research skill.

## Alternatives

- Port everything: rejected — API-key matrix adds auth surface and config burden for signal classes `site:` queries already reach.
- Port nothing: rejected — the pre-port GROUND prompt let leaves settle for snippets, single query phrasings, and no corroboration counting; a live spot-test ("current Active LTS of Node.js?") showed the ported method producing a strictly stronger leaf (4 query variants, deep-fetched authoritative source, named authority over averaging on patch-version drift).

## Consequences

- New `references/search-method.md` (§1 resolve, §2 source classes, §3–4 depth/scoring) is now the search-behavior reference; ANSWER/GROUND/SYNTHESIZE prompts point into it.
- Eval count 10 → 12: new #11 (search-effectiveness), #12 (continuity/corroboration).
- Full-tree regression not re-run — additions are prompt/reference-level and covered by the leaf spot-test; grade evals 2–8 next.

---
type: Entity
title: fractal-research skill
description: "A research skill in this repo: a port of [Cranot/deep-research](https://github.com/Cranot/deep-research) — fractal recursive multi-agent research — packaged per"
tags: [research, skill, multi-agent, agentskills, search]
timestamp: "2026-09-14T20:23:07.896Z"
---

# fractal-research skill

A research skill in this repo: a port of [Cranot/deep-research](https://github.com/Cranot/deep-research) — fractal recursive multi-agent research — packaged per the agentskills.io specification, later upgraded with search-method patterns ported from [last30days-skill](https://github.com/mvanhorn/last30days-skill). The orchestrator decomposes a question into a tree of sub-questions, dispatches leaf agents in parallel (via the harness's sub-agent delegation), and synthesizes bottom-up so the **root agent's file IS the final report**.

## Details

- **Location**: `fractal-research/`
  - `SKILL.md` — spec-compliant frontmatter + orchestration loop (RESOLVE = operation 0, preflight before dispatch)
  - `references/search-method.md` — the search method: entity resolution, multi-query expansion (2–4 variants), source-class table (community/official/academic/code/news via `site:`), depth-over-snippets, relevance floor, corroboration
  - `references/strategies.md` — 4 strategies: recursive, socratic, perspective, grounded
  - `references/prompts.md` — exact prompts: DECOMPOSE (`Q:` line protocol), ANSWER, SYNTHESIZE (cluster merging + corroboration count), DETECT, GROUND (scoring/floor/as-of dating), SOCRATIC
  - `references/output-format.md` — report tree, `research.log` JSONL schema (incl. `resolve` event), node states (Unknown → Explored → Validated → Synthesized)
  - `scripts/metrics.py` — derives `metrics.json` from `research.log` + `agents/` (stdlib only, `--self-test`)
  - `evals/evals.json` — 12 evals + a 5-dimension research-quality rubric (coverage, depth, accuracy, synthesis, traceability; 1–5 scale); #11 search-effectiveness, #12 continuity/corroboration cover the last30days port
- **Configuration**: depth ≤ 5, fan-out ≤ 5 (hard-clamped — deliberate divergence from upstream, see [the port decision](../../decisions/fractal-research-port.md)); trivial questions take a cheap single-pass path
- **Output contract**: `reports/YYYY-MM-DD-slug/` containing `agents/d{depth}-{seq}-{role}.md`, `research.log` (JSONL), and `metrics.json`
- **Verified**: live end-to-end run at depth 1 / fan-out 3 → `reports/2026-09-14-smart-people-bad-decisions/` (clean metrics, zero warnings); post-port leaf spot-test ("current Active LTS of Node.js?") exercised the full search method. Depth ≥ 2 and grounded-strategy live runs covered by eval specs only.

## Relationships

- [fractal-research-port](../../decisions/fractal-research-port.md) — why it diverges from upstream (budget caps, harness-native delegation)
- [adopt-last30days-skill-search-patterns-into-fractal-research](../../decisions/adopt-last30days-skill-search-patterns-into-fractal-research.md) — why the search method is shaped this way, and what was deliberately not adopted
- [fractal-research-metrics-gotchas](../../learnings/fractal-research-metrics-gotchas.md) — gotchas when maintaining metrics.py against the log schema
- [evals-json-edits-can-silently-clobber-adjacent-evals](../../learnings/evals-json-edits-can-silently-clobber-adjacent-evals.md) — gotcha when appending evals
- Distinct from `deep-research-v1/v2/v3` (linear/pipeline research skills in this repo) — this one is fractal recursion

## Lifecycle

- First added: 2026-09-14 — user request to port Cranot/deep-research as an agentskills.io-spec skill, tested end-to-end with evals.
- Significant changes: 2026-09-14 — ported last30days-skill search patterns: RESOLVE operation, preflight, prior-run reuse, `references/search-method.md`, evals 10 → 12.

## Source

- `fractal-research/SKILL.md` — entry point
- `README.md` — repo skill listing (updated with fractal-research)

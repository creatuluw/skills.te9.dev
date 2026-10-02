---
okf_version: "0.1"
---

<!-- wiki-memory:start -->
# Memory — the live contract

Auto-generated digest of the most recent conventions, decisions, rules and
development patterns, plus architecture and global patterns — newest first.
The actual files live in the wiki subfolders; follow the links (clickable in /wiki).
Regenerated on every wiki write and on wiki_mark_synced. Generated 2026-10-02T10:30:15.731Z.

## Recent Decisions

- [README is an LLM skill-routing index covering all ~95 skills](decisions/readme-is-an-llm-skill-routing-index-covering-all-95-skills.md) — Context (2026-10-02)
- [Build okf-wiki-skill fully self-contained, not on top of okf-open-knowledge-format](decisions/build-okf-wiki-skill-fully-self-contained-not-on-top-of-okf-.md) — Context (2026-09-30)
- [Adopt last30days-skill search patterns into fractal-research](decisions/adopt-last30days-skill-search-patterns-into-fractal-research.md) — Context (2026-09-14)
- [Port Cranot/deep-research as fractal-research skill, with capped budget and harness-native delegation](decisions/fractal-research-port.md) — Context (2026-09-14)

## Active Rules

- [Vendor skills as plain directories — no embedded .git](rules/vendor-skills-as-plain-directories-no-embedded-git.md) — Guideline (2026-10-02)

## Recent Learnings — development patterns

- [Parsing SKILL.md frontmatter across this repo needs a second pass](learnings/parsing-skill-md-frontmatter-across-this-repo-needs-a-second.md) — Enumerating skills in this repo by globbing `SKILL.md` and parsing frontmatter needs two passes: (2026-10-02)
- [evals.json edits can silently clobber adjacent evals](learnings/evals-json-edits-can-silently-clobber-adjacent-evals.md) — While adding evals #11–#12 to `fractal-research/evals/evals.json`, a structural edit **swallowed eval 10's assertions** — the JSON stayed va… (2026-09-14)
- [fractal-research metrics.py gotchas: leaf synthesis coverage and run_end status pollution](learnings/fractal-research-metrics-gotchas.md) — While building and testing `fractal-research/scripts/metrics.py` (which derives metrics.json from `research.log` JSONL + the `agents/` direc… (2026-09-14)

## Architecture

- [File tree](architecture/file-tree.md) — Complete project file listing with per-file descriptions. (2026-10-02)

<!-- wiki-memory:end -->

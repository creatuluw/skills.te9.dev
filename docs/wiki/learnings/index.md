# Learnings

_Captured learnings will be listed here._
- [fractal-research metrics.py gotchas: leaf synthesis coverage and run_end status pollution](./fractal-research-metrics-gotchas.md) - While building and testing `fractal-research/scripts/metrics.py` (which derives metrics.json from `research.log` JSONL + the `agents/` directory), three non-obv
- [evals.json edits can silently clobber adjacent evals](./evals-json-edits-can-silently-clobber-adjacent-evals.md) - While adding evals #11–#12 to `fractal-research/evals/evals.json`, a structural edit **swallowed eval 10's assertions** — the JSON stayed valid and the count in
- [Parsing SKILL.md frontmatter across this repo needs a second pass](./parsing-skill-md-frontmatter-across-this-repo-needs-a-second.md) - Enumerating skills in this repo by globbing `SKILL.md` and parsing frontmatter needs two passes:

---
type: Learning
title: evals.json edits can silently clobber adjacent evals
description: "While adding evals #11–#12 to `fractal-research/evals/evals.json`, a structural edit **swallowed eval 10's assertions** — the JSON stayed valid and the count in"
tags: [fractal-research, evals, gotcha]
timestamp: "2026-09-14T20:22:55.867Z"
---

# evals.json edits can silently clobber adjacent evals

While adding evals #11–#12 to `fractal-research/evals/evals.json`, a structural edit **swallowed eval 10's assertions** — the JSON stayed valid and the count incremented, so only a manual re-read of eval 10 caught it.

**Rule of thumb for this repo:** after editing `evals/evals.json`, don't just `json.load` it — re-check that *adjacent* eval entries still have their full structure (prompt, assertions, dimensions), then run `metrics.py --self-test`. Valid JSON ≠ intact evals.

Related: [[fractal-research-skill]], [[fractal-research metrics.py gotchas]].

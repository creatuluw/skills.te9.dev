---
type: Learning
title: "fractal-research metrics.py gotchas: leaf synthesis coverage and run_end status pollution"
description: While building and testing `fractal-research/scripts/metrics.py` (which derives metrics.json from `research.log` JSONL + the `agents/` directory), three non-obv
tags: [fractal-research, metrics, python, testing]
timestamp: "2026-09-14T20:17:37.323Z"
---

# fractal-research metrics.py gotchas: leaf synthesis coverage and run_end status pollution

While building and testing `fractal-research/scripts/metrics.py` (which derives metrics.json from `research.log` JSONL + the `agents/` directory), three non-obvious behaviors surfaced:

1. **Leaf nodes do not emit their own `synthesize` event** — the parent's synthesize event covers its children. Metrics that expect one synthesize event per node will false-positive "unsynthesized node" warnings on every leaf.
2. **`run_end`'s `status` field pollutes node-status counts** — the log mixes node lifecycle events and run-level events in one JSONL stream; a naive "count statuses across all events" includes the run's terminal status (e.g. `completed`) as if it were a node state.
3. `sum()` has no `default` kwarg (that's `max`/`min`) — an empty iterable already sums to 0 in Python.

Also validated: injected anomalies (deleting the final report, leaving a node unsynthesized) correctly trigger warnings, and the agent tree can be fully reconstructed from `research.log` alone — which is what eval 7 in `fractal-research/evals/evals.json` grades.

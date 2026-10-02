---
type: Decision
title: Port Cranot/deep-research as fractal-research skill, with capped budget and harness-native delegation
description: Context
tags: [research, skills, multi-agent, fractal-research]
status: accepted
timestamp: "2026-09-14T20:17:37.323Z"
---

# Port Cranot/deep-research as fractal-research skill, with capped budget and harness-native delegation

## Context

The user asked for a faithful port of [Cranot/deep-research](https://github.com/Cranot/deep-research) — a fractal recursive multi-agent research system — into an agentskills.io-spec skill in this repo. The upstream repo spawns `claude` CLI subprocesses recursively with unbounded fan-out and reads results back from per-agent markdown files via a `Q:` line protocol.

## Choice

Built `fractal-research/` as an agentskills.io-spec skill (SKILL.md + references/ + scripts/ + evals/) that preserves the source's core mechanics — fractal decomposition, the `Q:` line protocol, parallel branch exploration, bottom-up synthesis where the root agent's file IS the final report, all 4 strategies (recursive, socratic, perspective, grounded), dead-end handling, and the `reports/d{depth}-{seq}-{role}.md` output contract — with two deliberate divergences:

1. **Budget clamping**: depth ≤ 5 and fan-out ≤ 5, hard-clamped. Upstream's unbounded fan-out is a footgun — a depth-4/fan-out-5 run is already ~156 agents; anything more explodes cost exponentially. The skill keeps the ⚠️ fan-out cost warning even below the cap.
2. **Harness-native delegation**: upstream's `claude`-CLI subprocess spawning maps to the coding harness's sub-agent delegation (one parallel `delegate` batch for all siblings), not to shelling out to a CLI.

## Alternatives considered

- **Literal port (subprocess spawning, unbounded fan-out)**: rejected — cost explosion and CLI dependency don't fit a portable skill.
- **Deep-research-v2-style single-agent pipeline** (already in this repo): different architecture — that one is a linear engine with citation/evidence stores, not fractal recursion. Fractal was the explicit ask.

## Consequences

- Anyone comparing `fractal-research/` against upstream will find the clamps and the delegation mechanism differ — by design, not by omission.
- Runs are bounded: worst case ~hundreds of leaf agents at max depth/fan-out, still expensive but predictable.
- The repo now has four research skills (`deep-research-v1/v2/v3`, `fractal-research`) with distinct architectures; pick by shape of question, not by name.

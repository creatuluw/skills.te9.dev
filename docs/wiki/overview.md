---
type: System Overview
title: Overview
description: What this project contains and its structure.
timestamp: "2026-10-02T10:26:23.977Z"
---

# Overview

A collection of agent skills — one directory per skill, each carrying a `SKILL.md`
plus optional `references/`, `scripts/`, `evals/`, and `assets/`. Published to
`creatuluw/skills.te9.dev` on GitHub. Skills come from two sources: authored here
(e.g. `te9-research`, `te9-writing`, `okf-wiki`, `add-evals-to-skill`) and vendored
from external repos as plain directories with no embedded `.git`
(see [[vendor-skills-as-plain-dirs]]).

Structure:

- One top-level directory per skill; multi-skill collections (e.g. `design-skills/`,
  `taste-skills/`, `matt-pocock-skills/`) nest their members below.
- `.archive/` — retired skills kept for reference.
- `docs/wiki/` — this OKF knowledge base (excluded from staleness detection).
- `skills-lock.json` — skill inventory/lockfile.
- Full listing: [[file-tree]].

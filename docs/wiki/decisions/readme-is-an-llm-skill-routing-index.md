---
type: Decision
title: README is an LLM skill-routing index covering all ~95 skills
description: Context
tags: [docs, readme, skills, llm-routing]
status: accepted
timestamp: "2026-10-02T10:30:15.694Z"
---

# README is an LLM skill-routing index covering all ~95 skills

## Context

The repo README listed only 16 skills while the repo actually ships ~95 (authored skills + vendored collections like `matt-pocock*`, `council-of-high-intelligence`). Several skills overlap in trigger space — deep-research v1/v2/v3, `te9-research` vs `web-research` vs `tinyfish`, three.js variants, `te9-writing` vs toepy-writing vs unslop, `html-docs` vs effective-html — so an LLM picking from raw descriptions alone routes badly. Commit `7333a61`.

## Choice

The README is now an **LLM routing index**, not a curated list:

- 11 task sections (research, planning, code quality, frontend, HTML/slides, 3D, writing, docs, learning, platforms, meta), each a **"Route here when → What you get"** table.
- Vendored collections are listed as collections, not enumerated member-by-member.
- A **"Choosing between overlapping skills"** section gives explicit tie-breakers for the known collisions.
- Install instructions stay at the top, unchanged.

## Alternatives considered

- **Keep the old curated short list** — rejected: it had drifted to 16/95 coverage; curation-only indexes rot.
- **Generate the index mechanically from SKILL.md frontmatter** — not chosen for the committed doc: naive frontmatter parsing is lossy here (block scalars, nested dirs — see learning), and a curated index can carry tie-breaker guidance that raw descriptions cannot.

## Consequences

- Every new skill must be added to its README task section; new skill overlaps must be added to the collision section.
- The index can drift — sanity-check its coverage against the tree when touching it.

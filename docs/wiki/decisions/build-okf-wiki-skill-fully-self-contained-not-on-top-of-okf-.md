---
type: Decision
title: Build okf-wiki-skill fully self-contained, not on top of okf-open-knowledge-format
description: Context
tags: [skills, okf, self-contained]
status: accepted
timestamp: "2026-09-30T11:43:01.138Z"
---

# Build okf-wiki-skill fully self-contained, not on top of okf-open-knowledge-format

## Context

Task was to create a new `okf-wiki-skill` in `E:\skills.te9.dev\` based on the OKF spec (okf.md), the Google Cloud announcement, and a dev.to explainer — with a data/ERD flagship template (PK/FK, relationships, metrics, dimensions, business value) plus 5 more domain templates. An existing skill `okf-open-knowledge-format/` already covers generic OKF authoring, so the obvious lazy path was to inherit/require it.

## Decision

`okf-wiki-skill` is **fully self-contained**: all OKF spec content (v0.1 + v0.2 trust fields), templates, and the validator are written into the skill itself. It does **not** reference, require, or reuse the existing `okf-open-knowledge-format` skill. User mandated this explicitly ("dont use the existing one").

## Alternatives considered

- **Reuse existing skill as a dependency** — rejected: user instruction; also the new skill needs opinionated per-domain templates the generic skill doesn't ship.
- **Thin wrapper that links to the other skill** — rejected: same dependency problem, and skills must be portable/installable standalone.

## Consequences

- The two skills intentionally duplicate OKF spec material. Do NOT "dedupe" them into a shared dependency later — the duplication is deliberate for standalone portability.
- `scripts/validate.sh` inside okf-wiki-skill is its own tested copy (FAIL on missing frontmatter/type, WARN on soft fields), not the one from okf-open-knowledge-format.

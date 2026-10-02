---
type: Entity
title: okf-wiki-skill
description: A pi skill that builds and maintains OKF (Open Knowledge Format) wikis — self-describing markdown directories with YAML frontmatter that AI agents and devs navi
tags: [skill, okf, data-documentation, erd]
timestamp: "2026-09-30T11:43:01.138Z"
---

# okf-wiki-skill

A pi skill that builds and maintains OKF (Open Knowledge Format) wikis — self-describing markdown directories with YAML frontmatter that AI agents and devs navigate without an SDK.

## What it is

The **wiki-builder variant** of OKF authoring: opinionated, ready-made per-domain templates rather than a generic spec reference. Flagship domain is data/ERD documentation — table/dataset concepts capturing PK/FK relationships, cardinality, join keys, mermaid ERDs, metrics, dimensions, business value, and known issues — so an LLM or dev gets the full meaning of a database, not just its schema.

## Details

- **Location**: `E:\skills.te9.dev\okf-wiki-skill\`
- **Structure**:
  - `SKILL.md` (98 lines — kept under the <100 checklist target) — workflow + triggers
  - `REFERENCE.md` (186 lines) — full OKF spec detail, v0.1 + v0.2 trust fields
  - `EXAMPLES.md` (486 lines) — data/ERD flagship template + 5 other domains: API docs, runbooks, codebase architecture, ML models, compliance policies
  - `scripts/validate.sh` (40 lines) — frontmatter/type checker; FAIL (nonzero exit) on missing frontmatter/type, WARN (zero exit) on soft fields — CI-gateable
- **Configuration**: install into `C:\Users\PTW\.pi\agent\skills\`
- **Triggers**: "create/extend an OKF bundle", "agent-readable wiki", "data catalog as markdown", documenting databases/tables/ERDs/metric definitions for LLMs
- [okf-wiki-skill self-contained decision](../../decisions/build-okf-wiki-skill-fully-self-contained-not-on-top-of-okf-.md) — deliberately shares nothing with the existing `okf-open-knowledge-format` skill; spec content is duplicated on purpose for standalone portability

## Relationships

- `okf-open-knowledge-format` — sibling skill covering generic OKF authoring; independent, no dependency either way
- `write-a-skill` — the repo convention used to author this skill (frontmatter, progressive disclosure, <100-line SKILL.md)

## Lifecycle

- First added: 2026-09 turn — created from okf.md spec, Google Cloud announcement, and dev.to article; validator tested; draft reviewed in browser.

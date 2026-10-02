---
type: Entity
title: identify-models skill
description: A single-file pi skill that grills a problem (or a set of problems) from first principles until the correct **model** — the entities, states, and invariants tha
tags: [skill, productivity, first-principles, interview]
timestamp: "2026-09-25T17:21:23.866Z"
---

# identify-models skill

A single-file pi skill that grills a problem (or a set of problems) from first principles until the correct **model** — the entities, states, and invariants that give the problem its shape — falls out, then names it and states the first attack. The deliverable of a session using this skill is the model itself, the thing that makes the eventual solution obvious.

## What it is

A productivity skill in the matt-pocock skills collection. It fuses two sources:

- **grill-me** (`../grill-me/SKILL.md`) — the interview engine: one question at a time, a recommended answer with every question, explore the codebase instead of asking when possible, walk each branch of the decision tree resolving dependencies one by one.
- **First-principles thinking** (sunilsadasivan.com article) — the method: "box the experience" (name the default answer from past experience, park it visibly), a question ladder (why → entities → states → invariants → outside forces), and "the simplest model that survives every branch wins."

Written using the write-a-skill conventions (`../../../write-a-skill/SKILL.md`): single SKILL.md, frontmatter name + trigger-rich description, no scripts or reference docs.

## Why it matters

Attacking a problem with the wrong model means every solution fights the problem; the right model usually makes the solution obvious. This skill operationalizes finding that model as an interview with a fixed output schema, so the result is comparable across problems and sessions.

## Details

- **Location**: `matt-pocock/skills/productivity/identify-models/SKILL.md`
- **Interface**: 5-phase method — 1. Frame (state problem(s); if a set, settle shared-model-vs-per-problem first), 2. Box the experience, 3. Grill down to bedrock, 4. Derive the model (simplest one that survives every branch), 5. State the first attack (momentum ending).
- **Output schema** (per model): `Model` (a name), `Assumption boxed`, `Entities`, `States`, `Invariants`, `Forces`, `First attack`.
- **Configuration**: none — single self-contained file.

## Relationships

- Derived from the grill-me interview workflow and the first-principles-thinking method; authored per the write-a-skill conventions (neighboring skills in `matt-pocock/skills/productivity/`).

## Lifecycle

- First added: 2026-09-25 — user asked for a skill fusing grill-me's workflow with first-principles thinking, aimed at identifying the model needed to attack a problem set.

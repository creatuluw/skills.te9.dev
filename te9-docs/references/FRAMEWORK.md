# FRAMEWORK — the four-concern document framework

The te9-docs suite is **spec-driven**: every document is produced and judged
through four parallel concerns, each owned by one Concern spec and bound by one
Concern contract. This file is the canon. The suite's six-step workflow
(intake → TYPES-first → compose → figures → playback gate → storage menu) is
the fixed context; the concern specs are its variation points.

Decisions: ADR-0008 (lenses, not stages) · ADR-0009 (composition canon) ·
ADR-0010 (contracts cannot be bypassed). Vocabulary: `CONTEXT.md` — terms below
are defined there and only summarized here.

## The four concerns

| # | Concern | Owns | Theme-switch test |
|---|---|---|---|
| 1 | **Content** | What the rooms say — prose, facts, numbers, sources, voice | Survives the flip |
| 2 | **Composition** | What rooms exist, their order, hierarchy, grouping — every arrangement decision that carries meaning | Survives the flip |
| 3 | **Style** | The theme layer — the swappable sensory system a theme switch owns (tokens, accent discipline, decoration) | The flip owns it |
| 4 | **Wayfinding** | Where the doors and signs are — the apparatus that exposes structure to the reader | Survives the flip (its feedback states may not) |

**The theme-switch test** is the composition/style boundary: if a
`prefers-color-scheme` flip touches it, it is Style; if it survives, it is
Composition. The suite's own dark flip is the reference implementation — it
swaps token values and not one structural rule. (Type scale, section rhythm,
plate anatomy and spacing rhythm are Composition; color values, accent
discipline and the dark flip itself are Style.)

## Order of touch (authoring a new template)

The concerns are parallel — no stage boundaries, nothing "finishes" before the
next — but they are touched in a canonical order:

1. **Content** — gather the substance from the Document brief and SUITE-BRIEF
   facts. Content grounds everything; nothing is arranged before it exists.
2. **Composition** — arrange the substance: sections, hierarchy, grouping.
3. **Style** — render the arrangement in the current Style lane (Clay
   Explainer) or the lane the run targets.
4. **Wayfinding** — derive the navigation apparatus from the settled structure
   (jump navs, card indexes, page numerals). Touched last because it is
   *derived from* structure, never designed alongside it.

## Concern specs — one canon per concern

| Concern | Spec (normative home) | Status |
|---|---|---|
| Composition | `references/COMPOSITION.md` — ten principles, per-principle CAN/CANNOT with code quoted from real templates | This release |
| Style | `references/CLAY-STYLE.md` — tokens, type scale, accent discipline, dark flip, print | Declared (existing) |
| Wayfinding | `references/WAYFINDING.md` — the navigation iron rules | This release |
| Content | The trio: the **Document brief** (input contract) + **SUITE-BRIEF.md** (facts source) + the iron rules (ground numbers in verified reality · no invention · self-describing placeholders) | Declared (existing, distributed) |

Each spec is a **variation point**: author a new or alternate spec for a
concern and the suite's output changes for that concern — the workflow does
not. Style lanes are the proven case (the suite was born from a restyle over
frozen content); composition and wayfinding now have the same explicit slot.

## Concern contracts — specs inform, contracts bind

Every concern also carries a **contract**: the paste-able block of MUST-rules
the LLM holds while working that concern. Contracts cannot be bypassed — the
review gate passes a document only when all four hold (ADR-0010).

Contracts load **per touchpoint** — never all up front:

| Touchpoint | Contract source |
|---|---|
| Production run (compose a type) | The type's contract block in `TYPES.md` — TASK/FORMAT + BLOCK GRAMMAR + SECTION ORDER (composition), the shared palette here and in CLAY-STYLE (style), navigation requirements (wayfinding), IRON RULES (content) are the four contracts per type. **One file.** |
| Extension run (build a new template) | Load this file's contracts + the four specs as needed |
| Review gate (every document, every run) | The four-lens, four-contract pass — see below |

## The review gate — the four-lens pass

The playback gate now inspects four lenses in one pass. A document ships only
when all four verdicts are *pass*:

1. **Content** — every number counted from verified reality, facts trace to
   SUITE-BRIEF, voice matches the Document brief, nothing invented.
2. **Composition** — the ten principles hold per `COMPOSITION.md` (gate check
   line per principle).
3. **Style** — tokens only, accent discipline intact, dark flip works, print
   degrades correctly per `CLAY-STYLE.md`.
4. **Wayfinding** — the document exposes its own skeleton per `WAYFINDING.md`
   (wayfinding present, numerals, target feedback, honest fold summaries).

A violated contract fails the gate; the document does not ship until fixed.

## Governance

- Framework or spec changes are convention changes: MINOR version bump +
  CHANGELOG entry (the suite's semver rules apply).
- Alternate specs (a new Style lane, a different wayfinding canon) are added
  as new named artifacts — never by editing the active spec in place without
  a gate decision.
- Glossary is the vocabulary authority: `CONTEXT.md` in the repo root.

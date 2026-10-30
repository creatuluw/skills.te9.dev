---
name: te9-docs
description: "Produce polished, shareable, single-file HTML documents from a 36-template suite in the Clay Explainer design system. Use when the user wants: a decision brief, evidence dossier, presentation deck, explainer, concept breakdown, research/management/data/annual report, project plan, meeting notes, business case, SOP, API documentation, RFP/RFI, forecast, cashflow statement, tutorial, blogpost, wikipage, decisions log, or any visual document for humans. Triggers: make a document, create a report, write a brief, build a deck, document this, explain visually. Also use when the user names a te9-docs template type directly."
license: Proprietary. LICENSE at repo root has complete terms.
compatibility: "Build-time figure rendering requires Node.js and the pele npm package (scripts/). Documents themselves are offline, zero-JS single files."
metadata:
  author: te9
  suite-version: "2.7.0"
  design-system: "Clay Explainer"
  repo: "skills.te9.dev"
---

# te9-docs

Produce polished, shareable, self-contained HTML documents from the suite
templates at `assets/templates/`. Every document is one `.html` file in the Clay
Explainer design system: offline, zero network requests, dark mode, print-ready.
Full suite facts for placeholder content: `references/SUITE-BRIEF.md`.

## Workflow

### 1. Intake (mandatory, before any writing)

Ask the user for the document's **goal** and **acceptance criteria**. Then state
your **own recommendation**: the document type you'd pick and why, derived from
the context you already have. Wait for confirmation of the type.

### 2. Index-first classification

Read `assets/templates/index.json` — the single registry of types. Ground the
type decision in it; never assume a type from memory. If two types could match,
ask. If none match, go to Extension (below).

### 3. Instance the template

Copy the Template file; replace its self-describing placeholder content with the
user's real content. Preserve the layout, structure, interactions, and Clay
tokens. Never rebuild from scratch — the template is a finished document, the
instance is a content swap.

### 4. Figures

When a document calls for a diagram: write Mermaid source, render at build time
with pele, inline the static SVG (colors as Clay CSS variables), fence it in a
gray-100 plate with a mono `FIG · NN` caption.

```bash
cd scripts && npm install && node render-figure.mjs --input diagram.mmd --output diagram.svg
```

(`npm install` is only needed on first use — pele is the sole dependency.)

Hand-authored Clay-grammar SVG figures remain valid for visuals Mermaid cannot
express.

### 5. Playback (review gate)

Show the finished document in the browser. Fold all feedback in. No document is
delivered unreviewed. The gate is the **four-lens, four-contract pass**
(`references/FRAMEWORK.md`): Content, Composition, Style, Wayfinding — a
document ships only when all four hold.

### 6. Storage menu

Offer exactly four options after approval:

- **(a)** project docs folder — `<project>/docs/<YYYY-MM-DD>-<slug>.html`
- **(b)** central collection — `E:\te9-docs\documents\`
- **(c)** preview only — no disk write
- **(4th)** specify location — always wins when used

## Design rules (every document, no exceptions)

- **Clay Explainer** — the normative spec is `references/CLAY-STYLE.md`:
  tokens, type scale, header anatomy, gestalt review. Raw clay `#FE6C2D` is
  decorative-only on light ground; accent text is `--clay-ink #B8430F`.
- **Clay discipline** — zero scripts by default: `<details>` folds, `:target`
  jumps, hover states. Only the deck's canonical arrow-key/HUD script is
  built-in. Real JavaScript requires the published script whitelist
  (`references/WHITELIST.md`).
- **Self-containment** — all CSS in `<style>`, no CDN, no webfonts, no external
  images, works offline from a double-click, prints correctly (folds force open).
- **AA contrast** — see the token table in CLAY-STYLE.md; never introduce a
  color outside the token set.

## The four-concern framework

Every document is produced and judged through four parallel concerns —
**Content · Composition · Style · Wayfinding** — each owned by one Concern
spec, each bound by one Concern contract the LLM cannot bypass (ADRs 0008–0010;
canon in `references/FRAMEWORK.md`):

- **Content** — the substance. Spec: Document brief + SUITE-BRIEF + iron rules.
- **Composition** — the ten-principle table, code-backed:
  `references/COMPOSITION.md`.
- **Style** — the theme layer a theme switch owns: `references/CLAY-STYLE.md`.
- **Wayfinding** — the navigation iron rules: `references/WAYFINDING.md`.

The boundary is the theme-switch test: what survives a theme flip is
composition; what the flip owns is style. Contracts load per touchpoint —
production runs receive them compiled in the template's head comment (BLOCK
GRAMMAR, SECTION ORDER, COLORS, IRON RULES); extension runs read
FRAMEWORK.md; the review gate runs the four-lens, four-contract pass. The
suite is spec-driven: each Concern spec is a variation point — a new or
alternate spec changes output, never workflow.

## Extension (unmatched document types)

The suite grows autonomously. When a session needs a type not in the index:

1. Build the new template to the full conventions (Clay, self-describing
   placeholder content from SUITE-BRIEF, whitelist compliance, quality gates).
2. Save to `assets/templates/` with a descriptive numbered filename.
3. Regenerate `assets/templates/index.json` (one entry: slug, file, description).
4. Bump `suite-version` in this file's metadata and in SUITE-BRIEF.md; append a
   one-line changelog entry to `CHANGELOG.md`.

No proposal step, no staging. The user discovers new types in the index next
session. Full protocol: `references/EXTENSION.md`.

## References (load on demand)

- `references/SUITE-BRIEF.md` — canonical suite facts (placeholder content source)
- `references/FRAMEWORK.md` — the four-concern framework canon (specs, contracts, gate)
- `references/COMPOSITION.md` — Composition spec: ten principles, code-backed CAN/CANNOT
- `references/WAYFINDING.md` — Wayfinding spec: the navigation iron rules
- `references/CLAY-STYLE.md` — the Clay Explainer design system spec
- `references/EXTENSION.md` — the extension protocol in full
- `references/WHITELIST.md` — script whitelist per template type
- pele docs (https://pele.run/examples) — the diagram-type catalog for picking a figure type
- `scripts/render-figure.mjs` + `scripts/clayify.mjs` — build-time Mermaid → SVG via pele, then Clay ring-grammar post-processing

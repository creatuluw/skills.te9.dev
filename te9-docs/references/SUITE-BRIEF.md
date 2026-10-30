# SUITE-BRIEF — canonical suite facts

The single source of truth for te9-docs placeholder content. Every template's
placeholder content documents THESE facts — no template may assert anything about
the suite that contradicts this brief. Update this file whenever the suite itself
changes, then refresh affected template content. Stamped with the suite version.

Suite version: **3.0.0** — the **v2 compose edition**: the suite ships no
templates; documents are composed from the type catalog (TYPES.md), BASE-CSS
and the concern specs (ADR-0011). 28 types in the catalog.

## What te9-docs is

te9-docs is a document-suite skill: it produces polished, shareable,
single-file HTML documents for human readers. It lives in the skills.te9.dev repo
as a plain-dir Agent Skill (agentskills.io conformant) and is packaged for the pi
agent as a thin plugin wrapper. It is the clean-room sibling of the vendored
`html-docs` skill — every pattern adopted from it was re-justified and is owned as
a te9 signature.

## The design system: Clay Explainer

- Extracted from the founding examples (brief / dossier / deck) at
  `E:\te9-docs\docs\examples`, specified in `references/CLAY-STYLE.md`.
- Warm ivory paper ground, 1.5px hairlines, mono pill kickers, giant serif
  headlines with one italic clay word, fenced gray-100 figure plates with mono
  `FIG · NN` captions.
- Accent family: raw clay `#FE6C2D` is decorative-only on light ground (borders,
  rings, icons); all accent TEXT uses `--clay-ink #B8430F` (AA). Olive and rust
  are supporting hues with ink+soft variants.
- First-class `prefers-color-scheme: dark` token flip; full print spec (folds
  force open, light palette on paper).
- Three faces, zero webfonts: ui-serif display, system-ui body, ui-monospace
  micro-labels. Zero network requests in every document.
- Zero scripts by default (Clay discipline): `<details>` folds, `:target` jumps,
  hover states. The deck's canonical arrow-key/HUD script is the built-in
  exemption. Anything more needs the script whitelist.

## The workflow (what a production run does)

1. **Intake** — before any writing, ask for the document's goal and acceptance
   criteria; state the skill's own recommendation (type + approach) from context.
2. **TYPES-first** — ground the type decision in `references/TYPES.md` (the
   catalog + selection heuristics) and `assets/index.json`; confirm with the
   user if two types could match.
3. **Compose** — on `references/BASE-CSS.md` (copied verbatim), build the
   body in the type's frozen section order per its contract block in TYPES.md,
   with real facts from SUITE-BRIEF; restate the type's contract in a head
   comment (ADR-0010).
4. **Figures** — Mermaid → pele render (build-time, Node) → inline SVG in Clay
   variables, fenced plate, FIG caption.
5. **Playback** — show the document in the browser; fold in feedback.
6. **Storage menu** — (a) project docs folder (`<project>/docs/<YYYY-MM-DD>-<slug>.html`),
   (b) central collection `E:\te9-docs\documents\`, (c) preview only, (4th)
   specify location — which always wins when used.

## The suite

- **Launch taxonomy**: 36 types — the three founding documents plus 33
  additional types: introduction of concepts, concept breakdown, link/dependency
  analysis, before-and-after showcase (visual + textual), what/how/why/who/when,
  decisions log, interview transcript, research report, directional report,
  management report, high-level timelines and steps, 2D quadrant overview,
  feature breakdown, wikipage + index, data report, business case, I-am-12
  explainer, project plan, annual report, meeting notes, workflow template,
  top-down explainer, compendium of archetypes, blogpost/article, journalistic
  investigation, standard operating procedure, API documentation, request for
  proposal, request for information, rolling forecast, cashflow statement,
  tutorial.
- **Founding documents**: `brief.html` (decision brief), `dossier.html`
  (evidence dossier), `deck.html` (presentation deck) — kept as worked
  exemplars at `assets/examples/`.
- **Catalog**: machine-readable registry at `assets/index.json` (slug +
  description per type) alongside the selection heuristics and per-type
  contracts in `references/TYPES.md` — normative for discovery (v2 restores
  heuristics; ADR-0011).
- **Extension protocol**: fully autonomous. A session needing an unlisted type
  builds it to the same conventions (Clay, self-describing content, whitelist
  compliance, quality gates), registers the type in TYPES.md and the catalog,
  the index, bumps the suite version, and writes its own changelog line. The
  user discovers new types in the index next session.
- **Versioning**: semver `MAJOR.MINOR.PATCH`, stamped here and in the manifest.
  New template = MINOR; template/convention fix = PATCH; breaking = MAJOR.
  Every bump appends a one-line changelog entry (`CHANGELOG.md`).

## Vocabulary (use these words in placeholder content)

Type (a catalog entry with a composition contract) · Composed document
(the produced artifact; the founding trio in assets/examples/ are worked
exemplars) ·
Founding documents · Suite brief (this file) · Index · Intake ·
Review gate (browser approval after each build) · Storage menu ·
Clay discipline · Script whitelist · Figure · Pele · Suite version ·
Extension protocol · Build clusters · Signature pattern · Clean-room sibling ·
Central collection (`E:\te9-docs\documents\`)

## Provenance (safe to mention in content)

- Decisions recorded in `docs/adr/0001–0006` (clean-room sibling; Clay design
  system; self-describing placeholders; discipline + whitelist; Pele at build
  time; autonomous extension).
- Reference skill: html-docs (vendored, untouched) — source of the
  finished-file template mechanic and the one-shared-palette pattern.
- Diagram engine: pele 1.12.0 (open-source Mermaid→SVG, CSS-variable theming).

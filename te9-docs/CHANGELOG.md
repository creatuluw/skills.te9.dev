# Changelog — te9-docs suite

All notable suite changes. Autonomous extensions append their own entries
(newest first). Format: `## [X.Y.Z] - YYYY-MM-DD` + one line on what/why.

> **Reconstruction note (2026-10-30).** The original changelog was lost to a
> zero-byte truncation during a failed file edit this session — the te9-docs
> tree was not yet git-tracked, and no copy existed elsewhere. Entries from
> **[2.5.0]** onward are verbatim; **[2.4.0]** and **[1.3.0]** are restored
> from the project wiki's dated learnings; everything earlier is summarized
> from verifiable disk evidence (the template index, ADRs, and template
> colophons). Lesson recorded: commit the tree; verify every write.

## [2.7.0] - 2026-10-30

- Convention (MINOR): the four-concern framework — every document is produced
  and judged through Content, Composition, Style and Wayfinding. One Concern
  spec per concern (COMPOSITION.md new; CLAY-STYLE.md declared; WAYFINDING.md
  new; Content = Document brief + SUITE-BRIEF + iron rules), one non-bypassable
  Concern contract per concern, loaded per touchpoint (template head comment in
  production, FRAMEWORK.md on extension); the review gate is now the four-lens,
  four-contract pass. Canon: references/FRAMEWORK.md. Decisions: ADR-0008
  (lenses not stages), ADR-0009 (ten-principle canon), ADR-0010 (contracts
  cannot be bypassed).
- Packaging: cut all non-skill sources — vendored node_modules (pele now
  installs via `npm install` in scripts/, first use only), the pele examples
  gallery, the figure build-source archive, the parked step-player experiment
  (exporter + assets, sharp dependency dropped) and the dev-time wiki. Repo:
  36 MB / 798 files → 1.5 MB / 55 files. CONTEXT.md (glossary) and docs/adr/
  (decision records) stay — both are load-bearing.

## [2.6.0] - 2026-10-29

- New template: 28-2d-quadrant-overview (opens formats & remaining
  cluster). Positioning grammar: JUDGMENT strip, axis band with corner
  rule, native pele quadrantChart (open rings = to build, filled = landed,
  build-first corner tinted), four corner-meaning sections with resident
  tables and consequences. Subject: the last eight, plotted.

## [2.5.0] - 2026-10-29

- New template: 27-cashflow-statement (financial cluster). Accounting
  grammar: right-aligned mono numerals, grouped inflows/outflows, net
  rows, double-ruled closing balance, policy notes. Subject: the v1.0.0
  build economy denominated in effort hours (MODEL·NOT-MEASUREMENT).

## [2.4.0] - 2026-10-29

- Convention fix: highlight states wrap the padding, never replace it —
  tinted table rows re-add the 12px cell padding (review finding at the
  gate #26 rolling-forecast build: highlighted text sat flush against the
  tinted edge). Recorded as a house rule.

## [1.3.0] - 2026-10-29

- Ledger repair: the changelog's own registration bookkeeping had silently
  drifted from the template directory (exposed by the gate #15 annual
  report's verified stat tiles); counts and registration repaired at this
  version.

## [1.0.0 → 2.4.0] - 2026-10-29 (reconstructed summary)

- Founding trio (01-brief, 02-dossier, 03-deck) converted from the examples
  and gated in one session; the Clay Explainer design system adopted
  (ADR-0002); Clay discipline + script whitelist (ADR-0004); pele/clip
  build-time figure pipeline (ADR-0005/0007, clayify 0.4.x hardening);
  autonomous extension proven (ADR-0006). Templates 04–24 landed across the
  explainer, analysis, plans-and-process and formal clusters — the landing
  sequence and per-entry details of this span are the portion lost with the
  original file; counts are verifiable in assets/templates/index.json.

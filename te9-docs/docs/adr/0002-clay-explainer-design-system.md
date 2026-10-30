# The te9-docs design system is the Clay Explainer lane, extracted from Te9-docs examples

Every te9-docs template shares ONE house design system: the **Clay Explainer** style
lane, extracted from the settled examples at `E:\te9-docs\docs\examples`
(`brief.html`, `dossier.html`, `deck.html`) whose conventions are documented in
`E:\te9-docs\docs\examples\patterns.md`. The suite adopts the «one shared, tokenized,
suite-wide palette» pattern from html-docs, but fills it with the te9-owned Clay
system instead of html-docs' unretuned ivory/slate/clay set.

What this commits us to (all AA-verified, see patterns.md §2):

- Tokens: `--ivory/--slate/--body/--muted/--gray-100/--gray-300`, `--border` (1.5px),
  `--radius-panel 12px` / `--radius-chip 999px`, accent family
  `--clay` (decorative only on light ground) + `--clay-ink` (all accent text),
  `--clay-soft`, olive/rust triads with ink+soft variants, `--oat`, and the
  `prefers-color-scheme: dark` flip carried wholesale.
- Three faces: ui-serif display, system-ui body, ui-monospace micro-labels — zero
  webfonts, zero network requests in every template.
- Header anatomy: mono pill kicker + tracked kicker-meta → serif heading with one
  italic clay-ink word → hairline-rhythm sections.

## Considered Options

- **Adopt html-docs' ivory/slate/clay verbatim** — rejected: ships an unretuned
  palette (clay at 2.69:1 as text is an AA violation) under the te9 name; not a
  signature.
- **Design a fresh palette in-session** — rejected: the work already exists, is
  documented, AA-checked, and embodied in three reviewed example documents; a fresh
  palette would discard proven design and duplicate effort.

## Consequences

- Playbooks change html-docs-inherited palettes only insofar as Clay defines them;
  the raw-`clay`-decorative-only rule is mandatory, not advisory.
- Dark mode and the print spec are part of the system by default — fixing html-docs'
  stated-but-actual gap by construction.
- `patterns.md` (§1–§8) is the normative spec; templates failing its checklist are
  non-conformant.

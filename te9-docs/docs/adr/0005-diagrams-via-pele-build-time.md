# Diagrams render through Pele at build time; documents stay single-file and offline

Diagrams (flowcharts, sequence, ER, class, state, mermaid-class visuals) are
authored as Mermaid text and rendered with [Pele](https://pele.run) — the
open-source Mermaid→SVG renderer with zero runtime dependencies, mapped to the
Clay tokens via its CSS-variable theming (`--clay`, `--gray-300`, mono faces) so
diagrams participate in dark mode without re-rendering.

The render happens at **build time**: the skill ships a thin Node script wrapping
`pele`'s `render()`; the session runs it once and inlines the resulting static SVG
into the document. No document ever carries the pele runtime, a CDN reference, or
diagram JS. This replaces html-docs' pretty-mermaid pipeline (plus its font-stripping
and var()-hexification post-processing) and its vanilla-JS pan/zoom/fullscreen
viewer, both of which are rejected patterns for te9-docs.

## Considered Options

- **Runtime mount from CDN** — rejected: breaks the zero-network, file:// offline
  contract; adds a script to every diagram-bearing document; reintroduces the
  CDN-dependency hole html-docs already has (nomnoml from unpkg).
- **Hand-authored only** — rejected as the general rule: hand-authoring 50-arrow
  ER or sequence diagrams is error-prone; hand figures remain valid for bespoke
  visuals pele can't express.

## Consequences

- Node + the pele package is a production-time dependency of the skill (like the
  pretty-mermaid dependency upstream) — but never a dependency of a finished
  Document.
- Pele's built-in zoom/pan is unused by default; adding client-side diagram
  interactivity later would go through the script whitelist (ADR-0004), not the
  diagram pipeline.

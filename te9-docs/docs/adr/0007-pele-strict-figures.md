# All figures render through Pele — the hand-authored fallback shrinks to true impossibility

User verdict, 2026-10-29, gate #4: "I can't imagine we can't draw a similar
diagram with Mermaid via pele." Tested and confirmed: pele renders circle nodes
(`((node))`), double circles (`(((node)))`), `classDef` stroke/fill (open clay
rings, transparent fills), and edge-label captions. The earlier session learning
("pele's flat-box output can't express the Clay ring grammar") overstated the
case — what pele gives up is *pixel-level composition control* (uniform radii,
corner legends, exact node placement), not the ability to draw the grammar.

This supersedes the fallback clause of ADR-0005. New rule:

- **Every figure is Mermaid source rendered through pele at build time.**
- The Clay ring grammar maps to pele: clay ring = `classDef`
  `fill:transparent,stroke:#FE6C2D,stroke-width:2px`; the deliverable = double
  circle; supporting vocabulary = gray-stroked rings; edge captions = Mermaid
  link labels.
- Hand-authoring an SVG is allowed **only** when pele cannot express the diagram
  type at all, and the reason must be noted at the review gate.
- Fills stay transparent (not clay-filled) so the dark-mode flip works without
  hardcoded-hex/contrast conflicts; "filled = deliverable" becomes
  "double ring = deliverable".

## Consequences

- The founding examples' figures (journey circuit, citation map) remain
  historical hand-authored art; suite templates from 04 onward render via pele.
- Template 04's FIG · 01 was re-rendered through pele as the first proof.

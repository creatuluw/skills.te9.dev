# te9-docs is a clean-room sibling of html-docs, not an evolution of it

The skills repo already vendors `html-docs` (22 templates across 9 categories). We
decided to build `te9-docs` as a new skill alongside it rather than modifying
html-docs in place or folding its patterns into an existing doc skill. Rationale:
"signature patterns" require deliberate ownership — patterns are ported one by one
with an explicit adopt/adapt/reject verdict, and html-docs stays untouched as a live
reference for comparison until te9-docs proves itself in real sessions.

## Considered Options

- **Evolve html-docs in place** — rejected: muddies the provenance of a vendored
  skill and inherits its baggage (stated conventions its own templates don't follow).
- **Absorb into an existing doc skill** (simple-docs / readout) — rejected: collapses
  two distinct concerns into one skill.

## Consequences

- Two doc skills coexist temporarily; a later decision will deprecate one.
- Every beneficial html-docs pattern must be consciously re-justified in te9-docs,
  not assumed.

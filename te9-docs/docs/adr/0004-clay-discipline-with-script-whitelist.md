# Clay discipline is the suite default; real JavaScript requires a published whitelist

Suite documents default to zero scripts: progressive disclosure via `<details>`
folds and `:target` jumps, hover states, plus the deck's single sanctioned
arrow-key/HUD navigation script (carried from the founding documents). A template
type may carry additional JavaScript only if its type is listed on the suite's
script whitelist in the skill; each whitelisted addition is justified at that
template's review gate, and the whitelist is versioned with the suite.

Why not pure zero-JS (the founding trio's discipline): some of the 33 additional
types (API documentation, data report, editor-style documents) plausibly need
behavior no CSS mechanism provides; a rule that pretends otherwise will decay or
be bypassed invisibly. Why not html-docs-level interactivity: it reintroduces the
upstream patterns we deliberately excluded (JS viewers, pan/zoom, editors) into
every document, and breaks the print/offline guarantees Clay bakes in.

## Consequences

- The whitelist is normative skill content: a template with non-whitelisted
  scripts is non-conformant.
- Print and offline guarantees (zero network, folds force open, light palette)
  remain mandatory for every template, whitelisted or not.

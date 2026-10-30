# Script whitelist — the only JS a document may carry

Clay discipline (ADR-0004): documents carry **zero scripts** by default.
Progressive disclosure is CSS-native (`<details>` folds, `:target` jumps, hover
states). The exemptions below are the *complete* list; anything not listed here
is non-conformant.

| Template type | Script | Justification |
|---|---|---|
| deck | Canonical arrow-key/HUD navigation (carried from the founding `deck.html`) | A deck is a linear performance surface; CSS alone cannot arrow-key through cards or track position in the HUD pill |
| **all figure-bearing templates** | FULLSCREEN button per figure plate — one inline vanilla snippet per document: serializes the figure's SVG to a Blob URL and opens it in a new browser tab | "See the diagram at full size" is a reader expectation for plate-figured documents; pure-HTML data-URL links are blocked by browsers, so a 6-line listener is the minimal behavior. clayify embeds Clay text styles + the dark flip inside the SVG, so the standalone tab is Clay-correct and offline. Degrades to nothing with scripts disabled (figure stays inline and readable) |
| data report | Sort/filter of one table (vanilla, inline) | Sorting a data table is behavior no CSS mechanism provides; must degrade gracefully on print (default order) |
| wikipage + index | Client-side search filter over the index list (vanilla, inline) | Instant filtering across many entries; degrades to full list on print |

## Rules for whitelisted scripts

- Vanilla JS only, inline at end of `<body>`, no dependencies, no network.
- Must fail silent and safe: with scripts disabled the document stays fully
  readable (content visible, default order, full list).
- Print CSS must neutralize script effects (sort order, filtered state).
- Adding a row to this table requires a review-gate justification and a PATCH
  version bump; it is a convention change, not a template detail.

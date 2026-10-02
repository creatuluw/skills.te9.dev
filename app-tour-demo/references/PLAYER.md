# Player engine — internals

`templates/player.html` is a self-contained player. Read this before editing
the engine. Data contract first, then the motion engine.

## Data (injected by build.mjs)

- `const FRAMES = [{ name, html, scrolls }]` — full-document snapshots,
  stacked as same-origin `srcdoc` iframes in a fixed **1440×900** stage;
  only the active frame is displayed. `html` contains a `<!--CSS0-->`
  comment where the shared CSS blob is injected at load.
- `const CSS = [blob]` — one entry: the deduped union of all serialized
  stylesheets from every captured page, with local fonts inlined base64.
- `const STAPPEN = […]` — the narration (see SKILL.md schema).
- `scrolls: [{ path: [childIdx…], top, left }]` — scroll positions restored by
  walking child indices from `body` after iframe load.

## Motion engine (the parts that look magic)

- `doelPositie(el)` — the ONLY correct way to map an iframe element to screen
  coordinates: `frameRect.left + elRect.left * k` with
  `k = frameRect.width / iframe.offsetWidth`. Never add raw iframe coords to
  the stage rect — that is the classic offset-to-the-right bug (stage is
  CSS-transform-scaled; iframe-internal rects are not).
- `cursorNaar(el)` — rAF glide: quadratic bezier through a randomized
  control point (slight arc), ease-in-out cubic, duration
  `clamp(550…1400ms, distance × 1.6)`, ±0.6px per-frame hand tremor, final
  frame lands exactly on target. Respects `pauze` and `snelheid` by
  accumulating `dt × speed` only while unpaused. A new glide (`glijdId++`)
  cancels the previous one — restart calls `glijdId++` too.
- `klik(el)` — glide → 450ms aim dwell → click pulse (`klik` class + `flits`
  ring on the element) → 500ms settle.
- `typIn(el, tekst)` — glide → focus → type at 55–100ms/char (randomized).
  Works on frozen frames: setting `.value` renders without hydration.
- `zetStap(i)` — dots + badge caption + subtitle text + clears the ✓ line.
- `toonKlaar(tekst)` — shows the green result line under the subtitle.
- Pacing: 1500ms step intro (subtitle reading time), 650ms tour dwell per
  anchor, ✓ line holds 2200ms, plain tail 1100ms.

## Presentation chrome

Badge with step dots + caption (top-right), controls (restart / pause /
speed 0.5×–2×, bottom-right), subtitle bar (bottom-center, dark pill) with the
✓ result chip under it, end card overlay. The stage scales via
`transform: scale()` — that is why coordinate math must go through `doelPositie`.

## Verification hooks (used by scripts/verify.mjs)

`flits`, `doelPositie`, `cursor`, `STAPPEN` are plain top-level script
bindings — a test can wrap them after PAUSING the autoplay
(`#btn-pauze`), then resume. Click accuracy is asserted by comparing the
cursor position inside a wrapped `flits` against `doelPositie(el)`.

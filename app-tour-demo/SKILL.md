---
name: app-tour-demo
description: Build a pixel-perfect interactive step-by-step demo player of any web-app feature. Captures the real app as DOM+CSS snapshots via Playwright, then replays them with a human-like animated cursor, per-action subtitles (what you do + why), result checkmarks, and step dots. Use when asked to create a demo, tour, walkthrough, or explainer-player of a feature/module showing the real UI, or to regenerate one after UI changes. Output is one self-contained HTML file that works from file://.
license: Apache-2.0
metadata:
  author: te9
  version: "1.0"
compatibility: Requires Node 20+, Playwright (chromium) resolvable from the target repo, a running dev server, and login credentials for a test account. No ffmpeg needed.
---

# app-tour-demo — real-UI feature tours as self-contained players

Produce, per feature, a **new dedicated subfolder named after the demo** —
the folder carries the demo's name (e.g. `<feature>-tour/`), so a tour lives at
`<docs>/<feature>-tour/<feature>-tour.html` (or under a shared `tours/` root:
`tours/<feature>-tour/…`). That subfolder holds everything the tour needs:

- `capture.mjs` (copy of `scripts/capture.mjs`, DRAAIBOEK edited) → `tour-assets.json`
- `steps.json` (narration: actions, goals, results)
- `tour-assets.json` (captured frames + css, written by capture.mjs)
- `<feature>-tour.html` — the player (template `templates/player.html`)

One tour, one folder: the four files live in that subfolder and nowhere else.
Tour files never sit loose in the surrounding docs folder, and nothing else
moves in — probe- en eenmalige scripts worden na de run verwijderd;
build.mjs/verify.mjs worden niet gekopieerd maar vanuit de skill-map gedraaid.

Why DOM snapshots instead of recordings or rebuilt UIs: a snapshot **cannot
drift** from the real app (it *is* the rendered app), stays interactive to
inspect, and one pipeline serves every feature. Recorded video is fixed-timing;
a hand-rebuilt UI always diverges.

## Workflow

1. **Draaiboek** — decide the tour stops from the feature's docs/explainer.
   Begin met een nieuwe, eigen subfolder voor de tour (zie hierboven) — alle
   vier de bestanden komen daar te staan.
   One frame per *screen state* (not per action — several steps can reuse a
   frame; a state change needs a new frame). Cover every user action listed in
   the docs, including confirmation modals (open them, never confirm on real data).
2. **Capture** — copy `scripts/capture.mjs` into the feature folder, edit only
   the DRAAIBOEK block (login, seed/cleanup hooks, frames+anchors), run it
   against the dev server. Sanity output: every frame logs `anchors n/n`.
3. **Steps** — write `steps.json`: order, captions, subtitles, and result
   lines (schema below). Narrate action + goal + what it achieved, and give
   screen-to-screen transitions their own step.
4. **Build** — `node scripts/build.mjs --assets … --steps … --out … --titel … --badge … --eindtekst …`
5. **Verify** — `node scripts/verify.mjs --demo <out>` must print GESLAAGD
   (end card reached, all dots, clicks ≤ 2.5px off, no console errors).
   Run it with cwd = de repo-root van het target-project (Playwright wordt via
   createRequire uit de CWD geladen); het script zelf mag gewoon in de skill-map
   blijven. Then open the file in a browser for a human pass.
6. **Opruimen** — een tour mag geen sporen nalaten, op de vier bestanden in de
   tour-subfolder na:
   - capture.mjs draait `cleanup` in een `finally` — zaaisel wordt óók bij een
     crash halverwege de frames opgeruimd; handmatige opruimscripts zijn dus
     nooit nodig. Zie je "CLEANUP MISLUKT", dán pas handmatig ingrijpen.
   - Laat cleanup loggen dat het account netto is (0 ritten / 0 sessies over)
     — controleren, niet aannemen.
   - Verwijder eenmalige probe-/verkenningsscripts en screenshots uit de
     feature-map; `build.mjs`/`verify.mjs` horen daar niet thuis.
   - Gecrashte runs kunnen zaaisel hebben achtergelaten: laat cleanup álle
     ritten/sessies van het demo-account weghalen (lijst-endpoints lezen, dan
     per id verwijderen), niet alleen de ids die het zaaisel-boekhoudt.

## steps.json schema

```json
{
  "titel": "Feature - rondleiding",
  "badge": "Feature",
  "eindtekst": "One-sentence summary of the flow.",
  "stappen": [
    { "f": "frame-naam", "cap": "short badge caption", "tekst": "subtitle: what you are doing and what goal it has",
      "tour": ["anchor", "anchor"],
      "anchor": "anchor", "act": "click", "klaar": "result line shown after the action" },
    { "f": "frame-naam", "anchor": "input-anchor", "act": "type", "text": "typed live into the frozen input" }
  ]
}
```

- `tour` — cursor glides over these anchors (no click); use to point things out.
- `anchor` + `act: click|type` — the action; `text` types char-by-char.
- `klaar` — green ✓ line; use for every action that achieves something.
- Steps may repeat a frame (`f`) — frame switches happen on `f` change; clicks
  on the *current* frame drive the visual transition to the next step's frame.

## Anchor finders

Anchors are `[naam, '() => …']` expressions evaluated **in the page** before
serialization; mark elements with `data-demo-anchor`. Native `querySelector`
cannot match text — use `[...document.querySelectorAll('button')].find(b => b.textContent.trim() === '…')`
patterns. Prefer `data-testid`/`aria-label` when present.

## Hard rules & pitfalls

- **file:// constraints**: the player may not `fetch()` anything — all data is
  embedded; local `.woff2` fonts must be inlined base64 (capture.mjs does this
  when `fontsMap` exists); relative `src`/`href`/`srcset` are rewritten to the
  prod origin. Keep it that way when you extend the template.
- **Scale bug guard**: iframe-internal `getBoundingClientRect()` is in
  *unscaled* px. The cursor math must multiply by `frameRect.width / iframe.offsetWidth`
  (see `doelPositie` in the template). If clicks land systematically
  right/below the target, this multiplication is missing. verify.mjs fails on it.
- **CSS is a union**: Svelte/Vite inject per-component styles, so collect
  `document.styleSheets` rules across **all** captured pages and dedupe — one
  page's CSS is never enough.
- **Serialization contract** (capture.mjs implements it): strip
  `script/style/link/noscript`, insert `<!--CSS0-->` before `</head>`, rewrite
  relative URLs, record scroll-container positions as child-index paths.
- **Escape `</` as `<\/`** when embedding JSON into the player's
  `<script>` (build.mjs does) — a literal `</script>` in content breaks the page.
- **`eval('(...)')` returns the function — call it** (`typeof fn === 'function' ? fn() : fn`).
- **Cursor motion**: never re-enable CSS `transition` on the cursor — it fights
  the rAF glide loop (trailing mush). Keep `transition: none`.
- **Autoplay starts when frame 0 loads** — if you instrument the player in a
  test, PAUSE first, then patch, then resume.
- **Seed via the real APIs only** (dogfooding, never DB inserts) and make the
  demo **netto-opruimend**: cleanup after capture via the same APIs — capture.mjs
  roept cleanup aan in een `finally`, dus óók bij een crash halverwege. Watch for
  records that *survive* their parent's delete (ledger lines, junction rows) —
  delete those explicitly via their list endpoint; ruim desnoods alles van het
  demo-account op via de lijst-endpoints in plaats van boekgehouden ids.
- **Never write artifacts inside the running dev project mid-capture**: the incremental tour-assets tussenstand gaat naar de OS-temp-map. Een wegschrijven binnen de vite-watch geeft HMR-hot-updates (bijv. `/src/app.css`) die de pagina halverwege een `voor()`-stap herladen — "Execution context was destroyed" en een kapotte cleanup zijn het gevolg.
- **Dev server may share the production DB** — treat seeded data as real data:
  clean it up, and never click a real "Verwijderen"-confirm during capture.
- **Honest beats staged**: if a button genuinely is absent mid-quarter / a list
  genuinely is empty, show that and let the subtitle explain — do not fake states.
- **Every click must cause the real navigation**: a click-step on frame A followed by frame B is only honest if the app really works that way (tab-click switches tab, Annuleren closes the modal). If the real app behaves differently (e.g. "Nieuw" opens a new chat, not another tab), make it a tour-only step and narrate the cut in the subtitle ("Terug op ..."). Never claim a frozen frame shows something it doesn't (e.g. "de rit staat erbij" while the list never grew) — capture an extra frame after the mutation instead.
- **Anchor finders for icon-only buttons**: `IconButton`/`NavCard` actions often
  have only a `tooltip` — no accessible name, so `getByRole(name)` and text
  finders fail. Match the lucide svg instead, e.g.
  `b.querySelector('svg path[d="M5 12h14"]')` (Plus) or
  `svg circle[cx="11"]` (Search).
- **steps.json `text` must match the captured data**: a type-step types into a
  frozen frame while the *next* frame shows the result captured live — if
  capture typed a filter term derived from the first card, use that same term
  in steps.json (inspect tour-assets.json frames before writing steps).
- **A captured "empty list" can be transient** (slow load / API hiccup) — check
  the frame's text content after capture; re-run if a list that should have
  rows shows an empty state.
- Windows console mangles non-ASCII in inline `node -e` — write files with a
  write tool / standalone scripts instead of heredoc one-liners.

## Templates & scripts

- `scripts/capture.mjs` — edit the DRAAIBOEK; machinery below it is generic.
- `scripts/build.mjs` — generic; validates that steps reference existing frames.
- `scripts/verify.mjs` — the exit-code check to run after every build.
- `templates/player.html` — the whole player (chrome + humanized cursor engine
  + subtitle system). Markers: `__FRAMES__ __CSS__ __STAPPEN__ __EINDTEKST__
  __PAGINATITEL__ __BADGE__`. See [references/PLAYER.md](references/PLAYER.md)
  before changing the engine.

## Regenerating after UI changes

Re-run capture (frames only) → keep steps.json (anchors/fames rarely change) →
build → verify. If an anchor moved, only its finder in the DRAAIBOEK changes.

## Evals

`evals/` implements the eval discipline for this skill (see
`evals/run.mjs`). Run from the **target project** root so Playwright and real
tour artifacts are found:

```bash
node <skill>/evals/run.mjs                 # static + live (default)
node <skill>/evals/run.mjs --suite static   # fast, no browser
node <skill>/evals/run.mjs --suite judge    # LLM-rechter (dev-server + login nodig)
```

Exit 0 = no FAIL. The design follows evaluation best practices:
task-specific (no generic metrics), **automated/executable graders wherever
possible**, negative cases (bad input must be rejected), pass/fail over open
scoring for the LLM judge, and run-after-every-change.

- **static** — template markers, build contract (mini fixtures + a bad-input
  case that must fail), `</script>` escaping, narration rubric (cap/tekst
  per step, klaar per click, no em-dashes, 20-240 chars), frame↔step
  consistency, CSS/font invariants, player structure. No browser needed.
- **live** — executable evals: each real player must play to the end card
  with ≤2.5px click accuracy and zero console errors (wraps verify.mjs).
- **judge** — LLM-as-judge on the narration via the target app's own
  `/api/chat/deepseek/complete` proxy (needs dev server + login env). The
  rubric lives in `evals/cases.mjs` (`RUBRIEK`). Judge contract notes:
  request fields are **camelCase** (`maxTokens`, `reasoningEffort`,
  `responseFormat`), and `reasoningEffort: 'none'` is required — reasoning
  tokens otherwise eat the budget and content comes back empty. The judge
  must reason **inside** the JSON (`{"redenering", "pass", "issues"}`);
  asking for prose-before-JSON breaks parsing.

When you change the player template, the engine, or build/capture scripts:
re-run `--suite static` always, `--suite live` when the engine changed, and
use `--suite judge` when narration guidance changed. When a tour turns out
wrong in a new way, add the smallest case that would have caught it — evals
grow from real misses, not from speculation.

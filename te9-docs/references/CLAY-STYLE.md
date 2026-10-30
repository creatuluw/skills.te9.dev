# Clay Explainer — style lane patterns

Lane 36 of the llm-doc-suite. Reference: **the app explainer at `E:/kees.pippeloi.nl/docs/explainers/apps-declaraties/apps-declaraties-intro.html`** (a Dutch expense-module intro page: pill kicker, giant serif headline with one italic clay word, vertical timeline, floating-icon cards; local file probed 2026-10). Content frozen from `00-desktop-printer/` (deck / dossier / brief — Flour Union, fictional Leeds micro-bakery); only the style layer changed. Contract header lines read `… v0.1 — STYLE: Clay Explainer`.

## 1. Style concept

One idea: **the document as a warm paper explainer — ivory ground, hairline-ruled sections, and one clay-orange thread doing all the wayfinding.** The source page earns its character from five moves, and the lane reproduces each one: (1) a **mono pill kicker** (bordered, uppercase, rounded-full) paired with a wide-tracked kicker-meta line opens every page and every section; (2) a **giant serif headline** (`clamp(44–88px)`, weight 500, tight leading) whose single italic word is the only accent-colored text on the page; (3) the **vertical timeline** — a 1.5px line down the left, clay-outlined ring stations, filled ring = the step that works; (4) **floating-icon cards** — white 1.5px-bordered 12px-radius panels with a 20px clay stroke icon floated into the top-right corner; (5) a complete **`prefers-color-scheme: dark` token flip** — the reference ships dark mode as first-class, and the lane carries the flip wholesale. Everything else is discipline: system font stacks only (`ui-serif/Georgia` display, `system-ui` body, `ui-monospace` labels — **zero webfont requests, the only lane in the suite with zero external requests**), 1.5px `#D1CFC5` hairlines everywhere, and clay used sparingly: the raw `#FE6C2D` never carries text on light ground (2.69:1 on ivory — decorative only: borders, rings, icons, SVG fills, hovers); all accent *text* uses the retuned `--clay-ink #B8430F`.

## 2. Token table

| Token | Value | Source |
|---|---|---|
| `--ivory` | `#FAF9F5` page ground | **Live template** — `--ivory` |
| `--slate` / `--body` / `--muted` | `#141413` / `#3D3D3A` / `#67665F` | **Live template** — `--slate`, `--gray-700`; muted retuned from source `--gray-500 #87867F` (3.64:1 on white — kept for decorative only; `#67665F` ≥ 4.96:1 everywhere it carries text) |
| `--gray-100` / `--gray-300` | `#F0EEE6` soft plates / `#D1CFC5` hairlines | **Live template** — verbatim |
| `--border` | `1.5px solid var(--gray-300)` | **Live template** — the reference's heavier-than-usual 1.5px hairline, used on every panel, chip and table |
| `--radius-panel` / `--radius-chip` | `12px` / `999px` | **Live template** — `--radius-panel`, pill radius |
| `--clay` | `#FE6C2D` — decorative only | **Live template** — `--clay`; borders, timeline rings, icons, SVG fills, hover borders, dark-mode text |
| `--clay-ink` | `#B8430F` — all accent text | **Retuned** — clay darkened for AA (source uses clay for text at 2.69:1 on ivory) |
| `--clay-soft` | `#FDEBE0` — chip/rec-card tint | **Derived** — clay's tint step, on-grammar with the source's tinted-pill kicker |
| `--olive` / `--olive-ink` / `--olive-soft` | `#788C5D` decor / `#55673C` text / `#EEF2E6` plate | **Live template** — `--olive`; text retuned (source olive = 3.68:1 on white) |
| `--rust` / `--rust-soft` | `#B04A3F` / `#F8ECE9` | **Live template** — `--rust` verbatim (5.39:1 on white — the source's own risk hue already passes) |
| `--oat` | `#E3DACC` — receipt/plate tint | **Live template** — verbatim |
| Dark flip | `--ivory:#191817 · --white:#201F1D · --slate:#F0EEE6 · --body:#D6D4CC · --muted:#A5A39B · --gray-100:#232220 · --gray-300:#3D3D3A · --oat:#4A4438 · --clay-ink→#FE6C2D · --clay-soft:#3A241A · --olive-ink:#A9BC8B · --olive-soft:#262D1E · --rust:#D98A80 · --rust-soft:#3A2622` | **Live template** — `prefers-color-scheme: dark` block carried wholesale (values verbatim; lane token names substituted); clay becomes AA text on dark (6.25:1) exactly as in the source |
| Type stacks | `ui-serif, Georgia, serif` / `system-ui, -apple-system, sans-serif` / `ui-monospace, "SF Mono", Menlo, monospace` | **Live template** — verbatim; no webfonts, no `@import`, zero network requests |

Contrast guardrails baked in (WCAG AA, computed): text tones `#141413` 18.43:1 on white / `#3D3D3A` 10.34:1 on ivory / `#67665F` ≥ 4.96:1 on white, ivory and gray-100 (never below on any text ground); accent text `#B8430F` ≥ 4.70:1 on white, ivory, gray-100 and clay-soft; olive text `#55673C` ≥ 5.45:1 on white and olive-soft; rust `#B04A3F` ≥ 4.66:1 on white and rust-soft. On ink panels: ivory 18.43:1, `#D6D4CC` 11.95:1, clay em `#FE6C2D` 6.49:1 on slate. Dark mode: ink 15.26:1, body 11.95:1, muted 7.02:1, clay 6.25:1, olive-ink 6.94:1, rust 5.34:1 — all AA. Raw clay `#FE6C2D` (2.69:1 on ivory, 2.45:1 on clay-soft) is contractually decorative-only on light ground; it may carry text only on dark/ink grounds (≥ 5.11:1).

## 2b. Gestalt conformance — all nine principles

| Principle | Where | How to review |
|---|---|---|
| Similarity | One chip grammar (mono caps pills: 1.5px border, 999px radius) for status, tags, confidence, TOC/index, kill chips and SVG legend; one ring grammar (17px, 2px clay outline) for timeline stations and journey/citation SVG nodes; identical kicker anatomy (pill + tracked meta) on every page and section | Scan deck finding tags vs dossier confidence chips vs brief jump-nav pills — anything that looks alike IS the same kind of thing |
| Continuity | Deck journey SVG: one 2px gray-300 axis through five ring stations; deck + dossier timelines: the 1.5px vertical line runs item-to-item unbroken; dossier citation map: 11 curves claim→receipt; brief bars share 0–50 gridlines every 10; every section opens on the same hairline rhythm | Follow the journey axis edge-to-edge; trace A1→S1 without lifting the eye; read totals against shared gridlines |
| Proximity | Label hard above its value in every meta row; pillar stap-label hugs its h3 (8px); step meta → h3 → desc → flag stacked in one timeline cell; kill chip hugs its option card's dotted rule; receipt S# strip sits directly above its fold | In deck card 02 each numeral belongs to its paragraph by gap alone; fold summaries name exactly what appears beneath them |
| Figure-Ground | Three ground levels: ivory → white bordered panels → tinted inner plates (gray-100 figure plates, oat receipts, soft-tint chips); plus **hero figures**: the borderless cover/hero directly on ivory (the source's opening move), the clay-soft rec card (deck), clay-soft matrix winner column (brief), and the slate ink panels (quote, verdicts) — figure by saturation and by darkness | Squint each doc: panels detach by border+tint alone; count the saturated figures — deck 2, dossier 1, brief 1 (plus ink = figure by darkness) |
| Common Fate | Panel borders warm to clay and grow a soft clay-soft ring **together** on `:target`; pills tint clay-soft on hover as one motion; table rows and timeline items keep quiet (this lane's motion budget is spent on the ring+border pair, mirroring the source's hover discipline); print deliberately keeps none of it (§7) | Click a card-index chip (deck) or a jump-nav pill (brief) — border, ring and shadow move as one |
| Closure | Deck journey + dossier timelines: the filled clay ring reads as "the station that works" against the open series — the source's own `klaar` convention; brief: dotted kill-condition rules imply the cut, empty bar tracks imply the 0–50 scale | In the deck SVG the filled QUEUE node reads as "do not touch" with the corner legend confirming it |
| Symmetry & Order | Brief frame grid (two equal columns), matrix (even numeric columns), risk rows (1:1 risk/mitigation tint pairs), options (equal cards); deck findings and pillars share identical padding and label rhythm; dossier themes mirror each other's finding anatomy | Compare brief frame columns — equal width, equal rule rhythm; check deck cards align to the same left edge at every width |
| Prägnanz | Three system faces with strict jobs, one accent family (clay + two supporting hues olive/rust) + neutrals, two radii (12px panels / 999px chips), three surface tones (ivory / white / gray-100) + two tints (oat, soft chips) — minimum vocabulary that still grades five information levels | Count hues on any page: ivory/white/gray-100/oat + ink tones + clay + olive + rust — nothing else |
| Common Region | Bordered panels enclose every deck card and dossier finding; receipts are oat sub-regions inside their claim's fold; the ink quote/verdict panels enclose the strongest statements; brief risk rows are two-cell tinted regions (rust-soft / olive-soft); SVG exhibits sit in fenced gray-100 plates | In the dossier, receipt rows read as evidence pinned inside the claim panel; in the brief, risk + mitigation visibly share one row |

## 3. Type scale, header anatomy, extractable facts

Type levels (≥4 per doc, three system faces with strict jobs):

| Level | Face | Spec | Used for |
|---|---|---|---|
| Display | ui-serif 500 | h1 clamp(44–88px) lh 1.05, h2 30px lh 1.15, card h3 19–22px, lh ≥1.15, ls −.01em | doc titles, section h2s, card/timeline h3s, verdict pick |
| Body | system-ui 400/600 | 14–15.5px / 1.6, ledes 17–19px in `--body`, measure ≤ 62ch | paragraphs, ledes, table cells, receipts |
| Micro-label | ui-monospace 400/500 | 10–11px, UPPERCASE, ls .06–.18em | kicker pills, kicker-meta, stap-labels, table headers, tags/chips, meta `dt`s, fold summaries, SVG corner texts |
| Numeral / meta | ui-monospace 400 | 10–13px | card numbers, receipt S# chips, matrix scores, SVG station labels |

Header anatomy (identical construction on every page and section): **mono pill** (bold org segment in clay-ink · muted context) + **wide-tracked kicker-meta** → **serif heading**, optionally with the one italic clay word — closed by the hairline rhythm (sections sit on `border-top: 1px solid gray-300` with 40px headroom, exactly as the source spaces its `<section>`s). Page numerals (`01 / 08`) always mono, top-right.

Extractable-fact patterns — a reader scanning only mono elements gets the skeleton: cover meta rows (prepared-by / date / status), card-index chips (01–08), finding IDs + tag/confidence chips, receipt `S#` strips (visible even when folds are closed — iron rule kept), matrix weights ×1–×3 and weighted totals, SVG numerals (43/38/29 of 50), actions table (owner/effort/due columns), risk "owner:" labels, colophon DOC ID row.

## 4. Grouping & enclosure

- **Deck**: the cover is the source's hero — no border, pill kicker, giant serif h1, meta row under a hairline — with the card-index pill strip beneath; cards 02–08 are white 1.5px-bordered panels on ivory; findings are the source's floating-icon cards; the quote card is the ink region; the journey SVG sits in a fenced gray-100 plate and the journey detail reuses the source timeline verbatim; the rec card is the clay-soft figure with clay frame.
- **Dossier**: masthead is the borderless hero; TOC is a mono pill strip; TL;DR takeaways are a three-pillar grid; findings are white panels whose receipts fold open into oat plates (S# chips stay visible closed); verdict is the ink region; the citation map sits in its fenced plate; register is a ruled table.
- **Brief**: the whole sheet sits directly on ivory (no outer card — the source page never wraps itself in a panel); options are bordered cards with dotted kill rules; matrix winner column tinted clay-soft with the winning total as a clay chip; the bars plate fences the chart; risk rows are two-cell tinted regions (rust-soft risk / olive-soft mitigation); the verdict is the ink region.

## 5. Progressive disclosure inventory (all JS-free, ≥2 mechanisms per doc)

| Doc | Mechanism 1 — `<details>` folds | Mechanism 2 — `:target` |
|---|---|---|
| deck.html | Card 04: "Corroboration — what confirms this" folds the corroborate paragraph (on-dark). Card 06: "Why the batch schedule stays untouched" folds the rec-foot rationale | Cover **card-index** (01–08) targets `#c1…#c8`; a targeted card's border warms to clay under a soft clay-soft ring |
| dossier.html | All 6 findings: "Receipts · N source(s) back this claim" fold the receipt rows (S# chips stay visible closed — iron rule kept); TL;DR: "Confidence ledger — every finding, graded" folds the per-finding grades | TOC pills target every section `#tldr…#colophon`; a targeted section's top hairline thickens to a 3px clay rule and its section pill flips to clay-soft |
| brief.html | Verdict: "Runner-up — where B stands, and when it returns" folds the runner-up note (on-dark); Actions: "Critical path — the order the actions unlock each other" folds the chain chips | Masthead **jump nav** (01–07) targets `#frame…#colophon`; a targeted section tints `var(--gray-100)` |

No JS powers either mechanism; the deck's only script is the canonical arrow-key/HUD code. **This lane adds zero scripts beyond the canonical deck navigation.**

## 6. Chrome disclosure (every non-source string this lane added)

Derived chrome wording (ledes, summaries, figcaptions) is **carried over from the lane series (35)** — same frozen content, already-reviewed phrasing — so restyle lanes stay comparable. New or adapted chrome in this lane: **deck** — context pillar micro-labels and headline splits ("01 · The ask / A regular waited twenty minutes.", "02 · The record / Paper slips on the pass.", "03 · The fieldwork / Two weeks inside." — derived only from in-section facts), the `<em>` word on the cover h1 ("without"), journey SVG corner texts ("ONE ORDER · FIVE HAND-OFFS", "FILLED = DO NOT TOUCH") and per-station PAIN / WORKING WELL sub-labels, figcaption "FIG · 01 — THE SATURDAY LOAF, PHONE TO TILL", card-index labels 01–08 (section names reused verbatim from card kickers); **dossier** — TOC index numerals 01–07, TL;DR pillar micro-labels ("01 · Demand", "02 · Duty", "03 · Constraint"), the receipt S# chip strips above each fold (IDs re-rendered from frozen receipts — the iron-rule mechanism), the h1 `<em>` ("losing"), citation-map aria/title/desc wording ("edges marked by confidence; slate dots…clay rings"); **brief** — jump-nav numerals 01–07, the h1 `<em>` ("first"), figcaption "FIG · 01 — THE WEIGHTED TOTALS, DRAWN TO SCALE OUT OF 50", bars SVG aria/title wording (data unchanged). Structural chrome, no new facts: fold summaries, SELECTED pill, chain chips and legend lines all carried verbatim from lane 35. Contract comments: header line gained "— STYLE: Clay Explainer"; each COLORS line now describes this palette (lane convention). All claim, station, option, and source names inside the SVGs are copied verbatim from document content. Frame column labels kept the frozen "Constraints — the rails" / "Criteria — weighted" wording (verbatim rule wins over restyle suggestions).

## 7. Print

All three docs print light and quiet — **the dark-mode flip is explicitly reverted in `@media print`** (the source's dark palette never reaches paper): ivory→white, HUD and index/jump-nav strips hidden, deck one card per page (`page-break-after: always`, min-height 96vh, cover auto), `:target` effects neutralized, panels borderless, plates quieted, break-inside:avoid on findings, tables, plates, risk rows and verdict panels. **All folds force open on paper** (`details > *:not(summary){display:block !important}`, marker set to "−") — corroboration, receipts, ledger, runner-up and the critical path are never lost in print. **Common-Fate degradation (noted):** the `:target` ring/tint is a pointer-era effect and vanishes on paper; the static hierarchy (hairlines, panel borders, ink panels, ring fills) carries grouping in print, by design.

## 8. Human review checklist — the 10-minute route

1. **(1 min)** Open all three files from disk (`file://`) — with DevTools network open: **zero requests** (system fonts only; the suite's only fully offline lane).
2. **(1 min)** Deck cover: pill kicker, giant serif h1 with the single clay italic word; click index chip 05 — card 05's border warms to clay under a soft ring; press ArrowDown — the HUD pill tracks cards.
3. **(1 min)** Deck card 02: three pillars with clay micro-labels; the hairline rhythm matches the reference page's section spacing.
4. **(1 min)** Deck card 03: each finding is a floating-icon card — clay stroke icon floated top-right, strong lead, one tag chip; verify Signal/Pain/Risk map to olive/clay-ink/rust chips.
5. **(1 min)** Deck card 04: the only ink region; the italic clay phrase is the only colored text on the panel; open the fold — corroboration reads on the dark plate.
6. **(1 min)** Deck card 05: journey SVG — one axis, five rings, QUEUE filled; then the timeline — filled ring sits on "Queue · working well", exactly the source's `klaar` convention.
7. **(1 min)** Deck card 06: the clay-soft figure with clay frame; open the fold — rationale reads on the white body.
8. **(1 min)** Dossier: click TOC pill "B · Compliance" — the section's top rule thickens to 3px clay; open finding B1's fold — both receipts (S4, S5) appear as oat plates; the S# chips were visible before opening.
9. **(1 min)** Dossier sources: trace B1→S4 and B1→S5 — the map matches the register's "Cited by" column exactly (11 traces; the 3 medium-confidence curves dashed); verdict panel is the only ink region.
10. **(1 min)** Brief: jump to Matrix — winner column tinted clay-soft, total-winner cell is the clay chip with 43; bars show clay 43 vs slate 38/29 against gridlines every 10; open "Runner-up" on the ink panel.
11. **(1 min)** Tab through all three docs — every link/summary shows the clay focus ring; then toggle your OS to dark mode: every token flips (page, panels, chips, SVGs) and clay becomes the accent text color, exactly as the source's dark theme behaves.
12. **(1 min)** Print-preview the deck — eight pages, one card each, folds open, light palette, no hover remnants, no index strip.

---

## Appendix — te9-docs figure integration (Pele → Clay mapping)

Pele themes via `--pele-*` variables (https://pele.run/theming). Set them on the
figure container via CSS — **never in the SVG's inline style attribute** (inline
var() indirection failed to resolve in-suite and painted edge-label chips black;
CSS on `.fig svg` is the proven path, v0.2.3). Same for sizing: clayify strips pele's inline `max-width:100%;height:auto` from the svg root — inline style would override the base-reading-size rule.

### Complete Pele → Clay mapping (normative)

| Pele variable | Clay token |
|---|---|
| `--pele-fg` | `var(--slate)` |
| `--pele-fg-on-light` | `var(--body)` |
| `--pele-fg-on-dark` | `var(--ivory)` |
| `--pele-muted` | `var(--gray-500)` |
| `--pele-line` | `var(--gray-300)` (hairline edges; weight via `linkStyle ... 1.5px`) |
| `--pele-surface` / `--pele-surface-alt` | `transparent` (open rings read the plate; subgraph regions stay hairline-fenced) |
| `--pele-bg` | `transparent` (edge-label chips vanish; captions read as plain text) |
| `--pele-border` | `var(--gray-300)` |
| `--pele-accent` | `var(--clay)` |
| `--pele-critical` / `--pele-error` | `var(--rust)` |
| `--pele-font` / `--pele-font-mono` | system-ui stack / ui-monospace stack |
| `--pele-title-weight` / `--pele-heading-weight` | `500` |
| `--pele-radius` | `4px` (rings; the 12px plate radius stays on `.fig`) |
| `--pele-series-1...8` | data charts: clay, olive, rust, slate, then gray steps — never pele's default blues |

Width system: the page column (.page/.wrap, 920px founding grammar; 1000px where a template declares it) is the ONE structural cap; sections, grids, panels, and text fill their parents fully — NO measure caps (no 66ch/620px). Media queries adjust the column on small screens. Sizing (base reading size, no scroll): figures ADAPT THEIR LAYOUT to the plate
at build time — render with `--max-width 880 --direction-breakpoint 1600`, so
wide graphs re-flow tall and narrow instead of wide. Elements keep the base
reading size (16px labels); no scrollbars; no shrink-to-fit.
`.fig svg { width:auto; max-width:100%; height:auto; margin:0 auto }` is a
safety net only; FULLSCREEN opens the full view. Suppress the in-SVG title in plate figures (the mono `FIG · NN` caption is the
sole label): `.fig svg .pele-title { display: none; }`.

### Ring grammar in pele — the clayify pipeline (normative)

Figures are **pele layout + `scripts/clayify.mjs` post-processing** (ADR-0007):
pele positions nodes and routes edges; clayify restores the founding grammar on
top — uniform ring radii, mono labels OUTSIDE the rings, CONCEPT NN sub-labels,
supporting nodes as small filled gray dots, captioned plain hairline edges (no
arrowheads), optional legend row.

- Mermaid source: circles `((Name))`, deliverable as double circle `(((Name)))`,
  edge captions as link labels, `linkStyle default` for hairline weight.
- Spec JSON beside the `.mmd`: node labels/subs + legend entries.
- Pipeline: `node render-figure.mjs --input f.mmd --output f.svg` then
  `node clayify.mjs --in f.svg --spec f.json`. Figure sources are run-local —
  write the `.mmd` + `.spec.json` beside the document being built; the suite
  no longer vendors a figure-source archive.
- classDef/linkStyle colors are theme-fixed by design; transparent fills +
  Clay-stroked shapes keep the dark flip safe.

### Native pele diagram types — use them per template type

quadrantChart (2D quadrant overview) · gantt + timeline (timelines/steps,
project plan, annual report) · pie/xychart/sankey (data report, cashflow,
rolling forecast) · mindmap (top-down explainer, concept breakdown) · state
(workflow template) · sequence/er/class (API docs, link/dependency analysis) ·
kanban (decisions log, meeting notes) · journey (user-facing explainers).
Full list: https://pele.run/examples.

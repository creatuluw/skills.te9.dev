# COMPOSITION — the ten-principle conformance spec

Composition is the concern of **arrangement**: which blocks exist, their order,
hierarchy, and grouping — every decision that carries meaning and survives the
theme-switch test (`FRAMEWORK.md`). Its canon is the suite's ten-principle
table; CRAP (contrast, repetition, alignment, proximity) survives only as a
teaching mnemonic for the core four (ADR-0009).

The keywords MUST / SHOULD / MAY are used as in RFC 2119. Every CAN example is
quoted from a real template in `assets/templates/`; every CANNOT example cites
a documented failure mode or house decision. Nothing here is invented fresh.

Anatomy per principle: the principle in one sentence → **CAN** → **CANNOT** →
**Gate check** (the one-line check the review gate runs).

---

## 1 · Hierarchy

Important things MUST be visibly more important — five information levels
(doc → section → block → meta → caption) graded by the same small vocabulary.

**CAN** — grade levels by face, case and size together. From the brief's
masthead — type label, then the giant serif heading with the single italic
accent word (`01-brief.html`):

```html
<span class="type-label">Decision Brief</span>
<h1>Which ordering front door opens <em>first</em>?</h1>
```
```css
h1{font-size:clamp(44px, 6.5vw, 80px); ...}
h1 em{font-style:italic; color:var(--clay-ink);}
```

**CANNOT** — buy hierarchy by shrinking lower levels below base reading size.
Diagram labels MUST stay ≥ 16px; an over-wide figure re-flows tall at build
time — the layout adapts, the text does not (`CLAY-STYLE.md` appendix; the
"never shrink diagram labels" house rule). Wrong:

```css
.fig svg text{font-size:12px}  /* MUST NOT — labels leave base reading size */
```

**Gate check** — squint the page: the five levels still grade without effort.

## 2 · Similarity

Things that look alike MUST be alike — one grammar per kind of content.

**CAN** — one pill construction reused for every chip-shaped need (index
links, jump nav, status pills share face, case, tracking, border, radius —
`13-management-report.html`):

```css
.pill{font-family:var(--mono); font-size:11px; text-transform:uppercase;
      letter-spacing:0.06em; color:var(--gray-500); background:var(--gray-100);
      border:var(--border); border-radius:999px; padding:5px 11px;}
```

**CANNOT** — a second palette for one template, or off-token chart colors.
The house palette is suite-wide ("one suite, one palette — per-template
palettes are an anti-pattern", `CONTEXT.md`), and pele's series colors MUST be
mapped to Clay (clay, olive, rust, slate, then grays — never the default
blues; `CLAY-STYLE.md` appendix, "pele chart gotchas" learning). Wrong:

```css
.template-x{--accent:#3B82F6}  /* MUST NOT — a hue outside the token set */
```

**Gate check** — scan every chip/tag/pill: anything that looks alike IS the
same kind of thing, in the same tokens.

## 3 · Proximity

Belonging MUST be expressed by gap alone — a label sits hard above its value.

**CAN** — the meta row: micro-label with a 4px fall to its value
(`13-management-report.html`); the pillar label hugging its heading at 8px
(`03-deck.html`):

```css
.meta-row dt{...; margin-bottom:4px;}
.pillar h3{font-weight:600; font-size:22px; line-height:1.25; margin-top:8px;}
```

**CANNOT** — splitting a unit across a distance: legends belong in the plate
header, never under the figure ("Legends live in the plate header, always" —
clayify v0.4.9 decision), and receipt S# chips sit directly above the fold
they open. Wrong:

```html
<div class="fig-legend">…</div>  <!-- MUST NOT sit below .fig-b -->
<div class="fig-b">…</div>
```

**Gate check** — every label/value and figure/legend pair groups by gap alone;
no rule lines needed to prove belonging.

## 4 · Continuity

The eye MUST be able to travel unbroken lines — one axis through the diagram,
one rhythm down the page.

**CAN** — the journey axis: a single 2px hairline through five ring stations
(`03-deck.html`), and the section rhythm every template repeats —
`border-top: 1px` with equal headroom:

```html
<line x1="50" y1="58" x2="870" y2="58" stroke="#D1CFC5" stroke-width="2"/>
```

**CANNOT** — ragged rhythm: an h2 whose space above differs from the space the
previous block leaves below. Headings MUST sit on a symmetric rhythm — equal
gap both sides, follower top margin neutralized (the "symmetric h2 heading
rhythm" house rule; its violation is a documented review finding). Wrong:

```css
h2{margin-top:40px}  /* MUST NOT without neutralizing the previous sibling's
                        bottom margin — the rhythm doubles or collapses */
```

**Gate check** — trace the diagram axis edge-to-edge; walk the section
hairlines page-long; neither stutters.

## 5 · Closure

Completion MUST be implied, not drawn — open shapes recruit the reader.

**CAN** — the ring grammar: filled = complete, open = work remains, double
ring = destination — three states, zero labels needed
(`13-management-report.html` figure legend):

```html
<circle cx="7" cy="7" r="5.5" fill="#FE6C2D" .../>          <!-- filled -->
<circle cx="7" cy="7" r="5" fill="none" stroke="#FE6C2D" stroke-width="2"/>  <!-- open -->
<circle cx="7" cy="7" r="5" fill="none" .../><circle cx="7" cy="7" r="2.5" fill="none" .../>  <!-- the destination -->
```

**CANNOT** — over-drawing what the reader supplies: captioned plain hairline
edges carry no arrowheads (the clayify ring grammar — `CLAY-STYLE.md`
appendix), and dotted kill rules imply the cut without a strike-through.
Wrong:

```css
.clay-edge path{marker-end:url(#arrow)}  /* MUST NOT — arrowheads on captioned edges */
```

**Gate check** — the filled/open distinction reads at a glance; nothing is
decorated that implication already carries.

## 6 · Figure–Ground

Depth MUST come from surface, not shadow — three grounds (ivory → white
bordered panel → tinted plate) plus figure-by-darkness (ink) and
figure-by-saturation (soft tints).

**CAN** — the ink panel as the strongest ground a page owns — the BLUF band
(`13-management-report.html`):

```css
.bluf{background:var(--slate); border-radius:var(--radius-panel);
      padding:30px 34px 26px; break-inside:avoid;}
```

**CANNOT** — simulating depth with effects instead of surfaces: drop shadows,
gradients or any surface outside the token set ("never introduce a color
outside the token set" — `SKILL.md` design rules; panels detach by border+tint
alone — the squint test, `CLAY-STYLE.md` §2b). Wrong:

```css
.card{box-shadow:0 4px 16px rgba(0,0,0,.12)}  /* MUST NOT — depth by shadow */
```

**Gate check** — squint the page: exactly three grounds plus the sanctioned
figures; panels detach without shadows.

## 7 · Common Region

Ownership MUST be visible by enclosure — related items share one fenced region.

**CAN** — the risk row: risk and mitigation as two tinted cells of one ruled
row (`01-brief.html`):

```css
.risk-row .risk{background:var(--rust-soft); color:var(--rust);
                border-right:1px solid var(--gray-300);}
.risk-row .mit{background:var(--olive-soft); color:var(--olive-ink);}
```

**CANNOT** — scattering co-owned items across containers (a risk in one card,
its mitigation in another): the row exists because the pair is one fact. The
same rule encloses receipts inside their claim's fold (dossier). Gate evidence
comes from the region, not from adjacency memory.

**Gate check** — every belongs-to relationship is enclosed somewhere the eye
can circle.

## 8 · Symmetry & Order

Equal things MUST get equal treatment — equal columns, equal rows, one shared
edge.

**CAN** — the plan board: header and rows locked to one four-column grid
(`13-management-report.html`):

```css
.plan-head{display:grid; grid-template-columns:minmax(0,1.7fr) minmax(150px,1fr) 52px 100px;
           gap:14px 20px; ...}
.plan-row{display:grid; grid-template-columns:minmax(0,1.7fr) minmax(150px,1fr) 52px 100px;
          gap:14px 20px; align-items:center; ...}
```

**CANNOT** — states that eat the grid: a highlight that replaces cell padding.
Tinted rows MUST re-add the 12px cell padding — the documented v2.4.0 defect
was highlight text sitting flush against the tinted edge ("highlights wrap the
padding" house rule; "state-dependent styling defects" learning). Wrong:

```css
tr.now td{padding:0; background:var(--clay-soft)}  /* MUST NOT — the tint eats the padding */
```

**Gate check** — columns align at every width; tinted states keep the padding
they inherited.

## 9 · Prägnanz

The vocabulary MUST be the minimum that still grades the levels — three faces,
one accent family, two radii, five surfaces; nothing else.

**CAN** — the whole color system in one token block (`01-brief.html`):

```css
--clay:#FE6C2D; --clay-ink:#B8430F; --clay-soft:#FDEBE0;
--oat:#E3DACC; --olive:#788C5D; --olive-ink:#55673C; --olive-soft:#EEF2E6;
--rust:#B04A3F; --rust-soft:#F8ECE9;
--gray-100:#F0EEE6; --gray-300:#D1CFC5; --muted:#67665F; --body:#3D3D3A;
```

**CANNOT** — the fifth hue, the third radius, the second accent. A document
MAY use only what the token table declares; the "count the hues" squint test
is the gate's prägnanz probe (`CLAY-STYLE.md` §Prägnanz row). Wrong:

```css
--teal:#0D9488;  /* MUST NOT — a hue the table never declared */
border-radius:6px /* MUST NOT — a third radius (12px panels, 999px chips) */
```

**Gate check** — count surfaces, hues, radii: nothing outside the token table.

## 10 · Common Fate

Parts MUST move together or not at all — the motion budget is spent on the
`:target` pair, everything else stays quiet.

**CAN** — one state change moving three parts as one: the top rule thickens
AND the section pill flips (`13-management-report.html`; the dossier's
`::before` variant does the same, `02-dossier.html`):

```css
section:target{border-top:3px solid var(--clay); padding-top:38px;}
section:target .sec-kick{background:var(--clay-soft); border-color:var(--clay);
                         color:var(--clay-ink);}
```

**CANNOT** — spending the budget twice: hover effects on table rows and
timeline items MUST stay quiet (the lane's motion discipline —
`CLAY-STYLE.md` §Common Fate), and states MUST degrade: print neutralizes
`:target` (both templates revert it in `@media print`). Wrong:

```css
tr:hover{background:var(--clay-soft); transform:translateX(4px)}  /* MUST NOT —
   the motion budget belongs to the :target pair; print cannot print motion */
```

**Gate check** — one motion grammar; with scripts and pointers absent the
document loses nothing it needs.

# WAYFINDING — the navigation conformance spec

Wayfinding is the concern of **exposure**: the apparatus that shows a reader
where they are, what the document holds, and how to move — jump navs, card
indexes, TOC pills, page numerals, folds, and the colophon anchor. It is
derived from the settled structure and touched last (`FRAMEWORK.md`). "Index"
elsewhere in the suite means the template registry; never document navigation.

The keywords MUST / SHOULD / MAY follow RFC 2119. CAN examples are quoted from
real templates in `assets/templates/`; CANNOT examples cite documented rules
or findings. Anatomy: rule → CAN → CANNOT → Gate check.

---

## 1 · Every document carries wayfinding

A document MUST offer one-click reach to every section: the brief's jump nav,
the deck's card index, the dossier's TOC pills — one grammar, mono, pill-shaped.

**CAN** — the part index on the masthead (`13-management-report.html`):

```html
<nav class="part-index" aria-label="Section index">
  <div class="index-links">
    <a href="#bluf"><b>01</b>Bottom line</a>
    <a href="#numbers"><b>02</b>The numbers</a>
```

**CANNOT** — a document whose sections are reachable only by scrolling, or a
nav strip in a second visual grammar (similarity rule — one pill grammar).

**Gate check** — every section has a `#target` reachable from the masthead.

## 2 · Page numerals, mono, top-right

The reader MUST always know their position: a mono numeral in the top-right of
every card/section — `01 / 08` grammar.

**CAN** — the deck's card numerals (`03-deck.html`):

```html
<span class="card-num">05 / 08</span>
```

**CANNOT** — position markers that drift by viewport or hide on first paint
(they are part of the static skeleton that also carries grouping in print).

**Gate check** — every unit states its position in the `NN / NN` form.

## 3 · Jump targets give feedback — JS-free

A `:target` MUST visibly answer the jump: the top rule thickens to 3px clay
and the section pill flips (`FRAMEWORK.md`'s common-fate example is this
mechanism). Both mechanisms are CSS-only.

**CAN** — the dossier's variant, rule + pill as one motion (`02-dossier.html`):

```css
section:target::before{height:3px; background:var(--clay);}
section:target .sec-kick{background:var(--clay-soft); color:var(--clay-ink);
                         border-color:var(--clay);}
```

**CANNOT** — feedback that needs scripts, or feedback that survives print:
`:target` effects MUST be neutralized in `@media print` (both templates revert
them; static hierarchy carries grouping on paper).

**Gate check** — click a nav pill: rule and pill answer as one motion; print
preview shows no target remnants.

## 4 · Fold summaries are promises

A `<details>` summary MUST name exactly what appears beneath it — the reader
pre-authorizes the reveal by the summary alone.

**CAN** — the dossier's receipt folds (`02-dossier.html`):

```html
<summary>Receipts · 2 sources back this claim</summary>
```

**CANNOT** — vague invitations ("More info", "Details"): the summary is part
of the mono-scanning skeleton; vagueness breaks the scan and hides scope.

**Gate check** — every summary names its content; open one and compare.

## 5 · Skeleton keys stay visible when doors close

Identity chips that label hidden content MUST remain visible with the fold
closed — the reader indexes the document without opening it. The iron rule:
receipt `S#` chips stay visible above the closed fold.

**CAN** — the receipt strip above the fold (`02-dossier.html`):

```html
<div class="receipt-strip"><span class="sid-chip">S1</span><span class="sid-chip">S6</span></div>
<details class="fold">
  <summary>Receipts · 2 sources back this claim</summary>
```

**CANNOT** — burying the keys inside the fold they name: closed state must
still index the unit.

**Gate check** — with all folds closed, the document's evidence structure is
still readable.

## 6 · The mono-scanning skeleton

A reader scanning ONLY the mono elements MUST get the document's skeleton:
kickers, numerals, chips, table headers, captions, the DOC ID. Wayfinding
MUST therefore be mono-set — micro-labels 10–11px uppercase, tracked
(`CLAY-STYLE.md` type table).

**CAN** — every wayfinding surface in the suite is mono: `.stap-label`,
`.sec-kick`, `.card-num`, `.fig-id`, `.fig-f` — one face, one treatment.

**CANNOT** — serif or body-face navigation labels: they dissolve into the
prose and the skeleton disappears.

**Gate check** — blur the document: the mono layer alone still reads as the
outline.

## 7 · The colophon anchors the journey

The last word MUST be the document describing itself: template name + version,
the assembly statement, and the DOC ID row — the reader's proof of provenance
and the suite's self-description convention.

**CAN** — the deck's colophon row (`03-deck.html`):

```html
<span>DOC ID · FLU-DECK-001</span>
```

**CANNOT** — a document that ends on body content: without the colophon the
wayfinding chain has no terminus and the document loses its self-description.

**Gate check** — the last section is the colophon, carrying the DOC ID.

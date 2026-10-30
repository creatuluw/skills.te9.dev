# TYPES — document-type catalog & selection heuristics

**v2 "compose edition".** The suite ships no templates: a document is
*composed* from this catalog + `BASE-CSS.md` + the concern specs. This file is
normative for type choice — the **TYPES-first** step grounds every type
decision here, never in memory. If two types could match, ask the user. If
none match, go to `EXTENSION.md` (adding a type = adding a section here).

## How a document gets composed

1. **Classify** — pick the type from the heuristics table below.
2. **Read the type's section** — its contract block is the per-type
   composition law: task, format, hierarchy, section order, block grammar,
   iron rules, voice.
3. **Compose on `BASE-CSS.md`** — copy it verbatim as the document's `<style>`
   base; add the type's own sections per its block grammar. Never re-derive
   the shared layer.
4. **Bind the contracts** — the four concern contracts apply
   (`FRAMEWORK.md`); the composed document MUST carry a head comment
   restating this type's contract block (per ADR-0010).
5. **Gate** — the four-lens, four-contract pass.

## Shared conventions (bind every type)

- **Palette** — the `CLAY-STYLE.md` token table: raw clay decorative-only on
  light ground, `--clay-ink` for all accent text; never a hue outside the
  tokens. (Each contract's COLORS line therefore lives here, once.)
- **Figures** — Mermaid → pele → clayify (`scripts/`), fenced gray-100 plate,
  `FIG · NN` mono caption, legend in the plate header.
- **Scripts** — zero by default; `WHITELIST.md` is the complete exemption list.
- **Reading** — base reading size ≥ 16px; one structural cap (the page
  column); no measure caps inside it.
- **Wayfinding** — `WAYFINDING.md` binds: wayfinding apparatus present,
  `NN / NN` numerals, `:target` feedback, honest fold summaries.
- **Closure** — a colophon: type name + version, assembly statement, DOC ID
  row (`TE9-<ABC>-001` grammar).
- **Self-description** — placeholder content documents te9-docs itself, from
  `SUITE-BRIEF.md` facts only.

## Selection heuristics

Pick by reader intent and instruction signals — not by surface keywords alone.
When the material is quantitative, prefer the quantitative types (data report,
rolling forecast, cashflow); when it is decision-forcing, prefer `brief` over
`dossier`; when it must perform, prefer `deck`.

| Reader intent / instruction signals | Type |
|---|---|
| Force a decision between named options — one sheet, kill rules, weighted matrix | `brief` |
| Prove claims with evidence — receipts, grading, citation map | `dossier` |
| Deliver findings as a stakeholder readout — linear, presentable | `deck` |
| Orient a reader in a SET of new concepts | `introduction-of-concepts` |
| Take ONE concept apart — anatomy, parts, behavior | `concept-breakdown` |
| Explain one subject top-down — whole first, then levels | `top-down-explainer` |
| Explain so a 12-year-old understands — plain words, metaphors | `i-am-12-explainer` |
| Break down ONE feature — what it does for the user | `feature-breakdown` |
| Examine ONE subject through WHAT / HOW / WHY / WHO / WHEN | `what-how-why-who-when` |
| Chronicle decisions as a running ledger | `decisions-log` |
| Report a structured investigation — question, method, findings | `research-report` |
| State ONE chosen direction and hold it to account | `directional-report` |
| Report a program upward — BLUF, KPIs, progress vs plan | `management-report` |
| Present one quantitative subject — charts plus a metrics table | `data-report` |
| Report one year of one organization — publication grade | `annual-report` |
| Plan one objective's execution — phases, milestones, scope | `project-plan` |
| Show processes as step tracks and timelines | `high-level-timelines-and-steps` |
| Codify a repeatable workflow — roles, steps, checkpoints | `workflow-template` |
| Capture one meeting — agenda, decisions, actions | `meeting-notes` |
| Record an interview — turn-taking Q&A, pull quotes | `interview-transcript` |
| Prescribe a mandatory procedure — MUST/SHALL clauses | `standard-operating-procedure` |
| Document an API — signatures, parameter tables, examples | `api-documentation` |
| Solicit proposals — background, requirements, criteria | `request-for-proposal` |
| Ask light questions before a proposal — an RFI | `request-for-information` |
| Justify ONE investment — options, cost models, cost-benefit | `business-case` |
| Project a living number forward — re-roll rule, variance | `rolling-forecast` |
| State an economy as cash in/out by period, net | `cashflow-statement` |
| Position items on two axes across four quadrants | `2d-quadrant-overview` |
| Report ONE period of a team/stream — RAG health, shipped, blockers with asks | `status-report` |
| Reconstruct ONE incident/project — timeline, root cause, owned actions | `post-mortem` |
| Evaluate 2+ options across one fixed weighted criteria set — no forced winner | `comparison-matrix` |
| Lay out direction over NOW/NEXT/LATER horizons — themes with outcomes | `roadmap` |
| Set or grade ONE period's OKRs — outcomes with baselines, 0.0-1.0 grading | `okr-sheet` |
| Tell ONE customer/project story — before→after proof metrics, limits | `case-study` |
| Everything essential about ONE initiative on a single sheet — 60-second scan | `one-pager` |
| Answer the questions a readership actually asks — self-sufficient answers | `faq` |
| Teach ONE task to completion — steps with observable expected results | `tutorial` |
| Publish ONE editorial article — thesis, moves, steel-manned counterpoint | `blogpost` |

---

# The catalog

Each section below is the type's contract, verbatim from the v1 template it
was mined from (contract version noted). Compose to it as written.


## 01 · `brief` — Decision Brief (contract v0.1)


**Use when:** Decision brief: one sheet on ivory — options with kill rules, weighted matrix, risk pairs, verdict; the founding brief layout


```text
     TASK        Force a decision between named options and hand
                 back an actionable plan. No verdict, no brief.
     FORMAT      Dense single-page memo — the most compact doc in
                 the suite. Tables over prose everywhere.
     HIERARCHY   brief > frame > options > verdict > actions > risks
     SECTION     masthead → frame → options → matrix → verdict →
     ORDER       actions → risks → colophon  (never omit matrix or
                 verdict; options come as N parallel columns)

     BLOCK GRAMMAR
       masthead    kicker, type label, title (the decision in ≤ 10
                   words), meta row incl. DECIDE-BY date + status
       frame       the question (one sentence) + 3–5 constraints +
                   3–6 criteria, each with an explicit weight (×1–×3)
       options     2–4 parallel columns: name, one-liner, cost/time
                   chips, and a "killed if" line (its own kill
                   condition)
       matrix      criterion × option score table, 1–5 per cell,
                   WEIGHTED totals row. Same criteria, same order,
                   for every option — no custom criteria per option.
       verdict     exactly ONE winner + 2–3 why bullets + runner-up
                   note. Ties are broken by the highest-weighted
                   criterion and the tiebreak is stated.
       actions     table: action · owner (a name, not a team) ·
                   effort · due · depends-on. No action without an
                   owner.
       risks       2–4 compact rows: risk → mitigation. Named,
                   concrete, owned.

     SCORING     Scores are judgments — that's fine — but the
                 weights come from the frame and never change
                 mid-table. Show the arithmetic (weighted cells).
     VOICE       Plausible, domain-real facts. No invented precise
     STATUS      metrics. One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
                 Dark mode: token flip under prefers-color-scheme.
================================================================ -->
```


## 02 · `dossier` — Evidence Dossier (contract v0.1)


**Use when:** Evidence dossier: TOC pills, TL;DR pillars, findings with fold-out receipts, citation map, ink verdict; the founding dossier layout


```text
     TASK        Answer a research question with sourced, graded
                 claims — receipts or it didn't happen.
     FORMAT      Long-form reading document with sticky TOC,
                 TL;DR up top, source register at the bottom.
     HIERARCHY   dossier > section (theme) > finding > evidence
     SECTION     tldr → theme ×2–4 → verdict → sources → colophon
     ORDER       (exactly one TL;DR, one verdict, one register)

     BLOCK GRAMMAR
       tldr           2–4 numbered takeaways, each one sentence,
                      + overall confidence chip
       theme          lettered section: intro lede + 1–3 findings
       finding        claim (one declarative sentence, ≤ 40 words)
                      + confidence chip + ≥ 1 evidence receipt
       receipt        source ID (S#) + title + source type + date
                      + one line: what it supports for THIS claim
       verdict        the answer box (≤ 80 words) + confidence chip
                      + "what would change our mind" — 2–3 explicit
                      falsifiers
       sources        register table: ID · title · type · date

     CONFIDENCE  High = corroborated by ≥ 2 independent receipts.
                 Medium = single receipt or reasonable inference.
                 Low = thin or anecdotal — say so, keep the finding.
     IRON RULE   No claim without a receipt ID. No receipt without
                 a claim that cites it. Orphan sources and orphan
                 claims are both generation bugs.
     VOICE       Plausible, domain-real facts. No invented precise
     STATUS      metrics. One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 03 · `deck` — Readout Deck (contract v0.1)


**Use when:** Presentation deck: cover hero, numbered cards, journey SVG, timeline, rec figure; arrow-key navigation (the one sanctioned script)


```text
     TASK        Turn discovery/research into a stakeholder readout.
     FORMAT      Scrollable full-width slide cards. One card = one
                 idea = one PDF page (print CSS enforces this).
     HIERARCHY   deck > card > block > item
     CARD ORDER  cover → context → findings → quote → journey →
                 recommendation → next-steps → colophon
                 (exactly one of each; never reorder; never invent
                 new card types)

     CARD GRAMMAR
       cover          kicker (org · client), type label, title (≤ 8
                      words), subtitle (one sentence), meta row
                      (prepared-by · date · status chip)
       context        lede + 2–3 numbered context items
       findings       intro line + grid of 3–4 numbered cards:
                      headline (≤ 8 words) + body (≤ 60 words) + tag
                      (Signal | Pain | Risk)
       quote          one pull quote + attribution (name · role) +
                      corroboration line (who/what confirms it)
       journey        3–6 steps in chronological order: step name,
                      one-sentence description, meta line (place ·
                      time), label (Pain | Working well)
       recommendation "Where we'd start" callout: 2–3 concrete moves
       next-steps     2–4 actions, each with owner + horizon
       colophon       doc ID, suite links, generation note

     VOICE       Declarative. Concrete nouns. No hedging except in
                 confidence chips. Facts plausible and domain-real;
                 no invented precise metrics.
     STATUS      one chip on the cover only:
                 Draft | Believe | Reviewed | Signed-off
                 Dark mode: token flip under prefers-color-scheme.
================================================================ -->
```


## 04 · `introduction-of-concepts` — Introduction Of Concepts (contract v0.1)


**Use when:** Introduction of concepts: concept panels with definitions, why-it-matters, fold-out worked examples, cross-link chips, relationship figure; for orienting a reader in a new concept set


```text
     TASK        Give a reader orientation over a SET of new concepts —
                 each gets identity, definition, why-it-matters and a
                 first worked example; relationships are shown, not implied.
     FORMAT      Long-form reading document: concept-index pill strip up
                 top, concept panels, one relationship figure, closing
                 synthesis, colophon.
     HIERARCHY   doc > section > concept panel > (fold: worked example)
     SECTION     masthead → concept set (5–6) → how they relate (FIG)
                 → how they fit together → colophon
     ORDER       (exactly one figure section, one synthesis, one colophon)

     BLOCK GRAMMAR
       concept        mono micro-label (CONCEPT NN · ROLE grammar)
                      + serif h3 name + definition (glossary wording)
                      + why-it-matters (real suite facts)
                      + cross-links (mono chips to sibling concepts)
                      + fold: one worked example on an oat plate
       figure         ONE hand-authored or pele-rendered SVG in a fenced
                      gray-100 plate with mono FIG · NN caption
       fit-together   the run order the concepts execute, in sequence
       colophon       DOC ID · suite link · siblings · prepared-by

     IRON RULES  Definitions match the glossary word for word. Worked
                 examples cite SUITE-BRIEF facts only — no invented
                 suite facts. One figure; it may not carry a claim the
                 panels don't.
     VOICE       Plausible, domain-real. No invented precise metrics.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 05 · `concept-breakdown` — Concept Breakdown (contract v0.1)


**Use when:** Concept breakdown: the anatomy of ONE concept — subject double ring, 4-6 part panels with definition/behavior/folds, misconceptions, composition run-order


```text
     TASK        Take ONE concept and break it down — the anatomy of a
                 single concept: its parts, each examined in depth
                 (definition, behavior, edge cases), how the parts
                 compose, and the common misconceptions. Distinct from
                 introduction-of-concepts, which orients across MANY
                 concepts; this type goes deep on exactly one.
     FORMAT      Long-form reading document: part-index pill strip up
                 top, one anatomy figure, sub-part panels, misconceptions,
                 composition run-order, colophon.
     HIERARCHY   doc > section > part panel > (fold: edge case / misconception)
     SECTION     masthead → anatomy (FIG · 01, the subject as double ring)
                 → parts (4–6, numbered) → misconceptions (2–3)
                 → how the parts compose → colophon
     ORDER       exactly one figure; misconceptions in one section;
                 one colophon.

     BLOCK GRAMMAR
       part           mono micro-label (PART NN · NAME grammar) + serif h3
                      + definition lede (glossary wording, clay rule)
                      + behavior body (real suite facts)
                      + fold: one edge case or misconception on an oat plate
       figure         ONE pele-rendered SVG in a fenced gray-100 plate with
                      mono FIG · NN caption; the subject concept as the
                      double ring, sub-parts as clay rings chained in run
                      order, supporting sources as gray dots; FULLSCREEN pill
       misconception  struck-through claim (or rust chip) + correction in
                      body ink; rust-soft / white two-cell region
       compose        the run order the parts execute, in sequence
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Definitions match the glossary word for word. Parts are
                 grounded in SUITE-BRIEF facts only — no invented suite
                 facts. One figure; it may not carry a claim the panels
                 don't.
     VOICE       Plausible, domain-real. No invented precise metrics.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 06 · `top-down-explainer` — Top-Down Explainer (contract v0.1)


**Use when:** Top-down explainer: the whole in one breath, then drill-down levels — statement band, pillar grid, per-pillar depth panels, folds as level 4; drill-down tree figure


```text
     TASK        Explain one subject top-down: start with the whole in
                 one breath, then drill down level by level — whole →
                 parts → each part in depth → details on demand. The
                 drill-down is the organizing principle, not an
                 accessory; progressive disclosure IS the last level.
     FORMAT      Long-form reading document: statement band directly on
                 ivory, 2×2 pillar grid, drill-down figure, full-width
                 depth panels with one fold each, colophon.
     HIERARCHY   doc > level > pillar / deep panel > (fold = level 4)
     SECTION     masthead → part-index pill strip → LEVEL 1 the whole
                 (large serif statement, no panel) → LEVEL 2 the four
                 pillars (2×2 white panels) → drill-down figure (FIG · 01)
                 → LEVEL 3 each pillar in depth (full-width panels, one
                 fold each) → colophon
     ORDER       exactly one figure; one fold per depth panel; the folds
                 are LEVEL 4 — they get no section of their own; one
                 colophon.

     BLOCK GRAMMAR
       statement      LEVEL 1 · large serif statement directly on ivory
                      — the whole in one breath; no panel, no fence
       pillar         LEVEL 2 · white panel in a 2×2 grid: mono
                      micro-label (PILLAR NN · NAME) + serif h3 + short
                      body + IN DEPTH link to its Level 3 panel
       figure         ONE pele-rendered drill-down tree in a fenced
                      gray-100 plate: double ring = the whole, four
                      rings = the pillars, gray dots = their key facts;
                      header with FIG ID + legend strip + FULLSCREEN;
                      body = diagram only; footer = caption
       deep           LEVEL 3 · full-width white panel, one per pillar:
                      definition lede (glossary wording, clay rule) +
                      behavior body + ONE <details> fold
       fold           LEVEL 4 · the fold IS the fourth level; summary
                      prefixed "Level 4 ·"; body on an oat plate
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Facts grounded in SUITE-BRIEF only — no invented suite
                 facts. Definitions match the glossary word for word.
                 The figure may not carry a claim the panels don't.
                 Zero scripts beyond the whitelisted fullscreen
                 listener.
     VOICE       Plausible, domain-real. No invented precise metrics.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 07 · `i-am-12-explainer` — I Am 12 Explainer (contract v0.1)


**Use when:** I-am-12 explainer: real facts in 12-year-old words — short sentences, everyday metaphors, story-step panels, big-words-simply term cards with verbatim glossary folds


```text
     TASK        Explain one subject to a 12-year-old: short sentences,
                 concrete everyday metaphors, zero jargon — real facts
                 in simple words. Playful, never condescending: the
                 reader is smart, the words are just small.
     FORMAT      Long-form reading document: masthead hero, "the big
                 idea" in short paragraphs, THE 4 STEPS as numbered
                 story panels, three term cards with folded real
                 definitions, one story-map figure, an ink "try it"
                 band, colophon.
     HIERARCHY   doc > section > step / term card > (fold = the real
                 definition)
     SECTION     masthead → part-index pill strip → the big idea (3–4
                 short paragraphs, direct on ivory) → the 4 steps (2×2
                 story panels) → big words, simply (3 term cards, one
                 fold each) → story-map figure (FIG · 01) → try it
                 yourself (ink band) → colophon
     ORDER       exactly one figure; one fold per term card; one ink
                 band; one colophon.

     BLOCK GRAMMAR
       idea-par      short paragraph on ivory: max 2 sentences, each
                     under 15 words, direct address ("you")
       step          numbered story panel: mono micro-label (STEP NN ·
                     NAME) + serif h3 (the kid sentence) + short body +
                     grown-up line naming the real suite term
       grown         the real term, named small: "GROWN-UPS CALL THIS ·
                     INTAKE" — mono micro-label, clay-ink term
       term card     white panel: big word + kid analogy + ONE fold
                     holding the glossary definition, word for word
       figure        ONE pele-rendered story chain in a fenced gray-100
                     plate: rings = the steps, double ring = the
                     document you keep; header with FIG ID + legend
                     strip + FULLSCREEN; body = diagram only; footer =
                     caption
       band          the ink region: serif line with one clay em, short
                     recap, one question to the reader
       fold          summary "The real definition"; body on an oat plate

     IRON RULES  Facts grounded in SUITE-BRIEF only — no invented suite
                 facts. Glossary definitions quoted word for word.
                 Sentences under 15 words. No corporate words in the
                 kid voice. The figure may not carry a step the panels
                 don't. Zero scripts beyond the whitelisted fullscreen
                 listener.
     VOICE       Playful, direct, honest. Questions to the reader are
                 good. Everyday comparisons: a finished example essay,
                 a check-before-handing-in, a folder you choose.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 08 · `feature-breakdown` — Feature Breakdown (contract v0.1)


**Use when:** Feature breakdown: capability cards, pipeline figure, a real source-to-plate proof pair, options table, honest limitations — for mastering one product feature


```text
     TASK        Break down ONE product feature: what it does for the
                 user, its capabilities, how each works, the options,
                 and the honest limitations. Product-facing — the
                 reader is deciding whether to use the feature and
                 needs to master it, not admire it.
     FORMAT      Capability cards up front, pipeline figure, a
                 source-to-plate proof pair, options table,
                 limitations, colophon.
     HIERARCHY   doc > section > capability/limitation card > (fold)
     SECTION     masthead → capabilities at a glance → how it works
                 (FIG · 01, the pipeline) → from source to plate
                 (proof pair) → options → limitations → colophon
     ORDER       one pipeline figure + one proof pair; options in one
                 table; one colophon.

     BLOCK GRAMMAR
       capability     mono micro-label (CAPABILITY NN · NAME) + one-line
                      promise, in a white 1.5px-bordered card
       pipeline       pele+clayify chain in the mandatory plate:
                      header (FIG ID + legend strip + FULLSCREEN) /
                      body (diagram only) / footer (caption)
       proof pair     LEFT: the real Mermaid source in a mono block;
                      RIGHT: that exact source rendered — the source
                      is the figure
       options        table: option / what it does / default
       limitation     honest card: what the feature does NOT do
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every capability must be demonstrable from the suite
                 facts. The proof pair's source must be the actual
                 source of the rendered result. Limitations are never
                 hidden — they are part of the contract.
     VOICE       Plausible, domain-real. Direct address. No marketing.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 09 · `what-how-why-who-when` — What · How · Why · Who · When (contract v0.1)


**Use when:** Five-lens explainer: one subject through WHAT/HOW/WHY/WHO/WHEN — giant interrogative stamps, perfectly equal lens sections, hub figure; for full-circle orientation


```text
     TASK        Examine ONE subject through five interrogative
                 lenses — WHAT / HOW / WHY / WHO / WHEN — one section
                 per lens, equal weight, each answering fully. The
                 interrogative is the motif; the five-lens equality is
                 the point.
     FORMAT      Long-form reading document: lens strip (five pills)
                 up top, one hub figure, five equal lens sections each
                 opened by its question word as a giant serif stamp,
                 colophon.
     HIERARCHY   doc > lens section > (fold: concrete example)
     SECTION     masthead + lens strip → the map (FIG · 01, the
                 subject as double ring, five question rings fanning
                 right) → five lens sections (WHAT / HOW / WHY / WHO /
                 WHEN) → colophon
     ORDER       exactly one figure; the five lens sections perfectly
                 equal — identical anatomy, identical rhythm; one
                 colophon.

     BLOCK GRAMMAR
       lens strip    five mono pills (WHAT / HOW / WHY / WHO / WHEN)
                     as the jump-nav, inside the masthead
       lens stamp    the question word as a HUGE serif display element
                     (clamp(60px, 10vw, 120px)), ink with the clay-ink
                     question mark, above the section heading
       lens section  stamp → sec-kick (LENS NN · WORD) → h2 → answer
                     lede (clay rule) → 2–3 supporting paragraphs →
                     one <details> fold (a concrete example on an oat
                     plate) — identical anatomy in every lens
       hub figure    pele+clayify chain in the mandatory plate:
                     header (FIG ID + legend strip + FULLSCREEN) /
                     body (diagram only) / footer (caption)
       colophon      DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every fact grounded in SUITE-BRIEF only — no
                 invented suite facts. The five lens sections are
                 perfectly equal: no lens longer or shorter than
                 another. One figure; it may not carry a claim the
                 lens sections don't.
     VOICE       Plausible, domain-real. No invented precise metrics.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 10 · `decisions-log` — Decisions Log (contract v0.1)


**Use when:** Decisions log: a ruled, append-ordered ledger of decisions — ID/date/status rail, always-visible one-liner, reasoning folds; superseded entries struck and chipped


```text
     TASK        Keep ONE running record — the suite's decisions as an
                 append-ordered ledger: every decision with its ID, date,
                 title, the decision in one line, and its status. A log is
                 scanned, not savored: compact ruled entries, newest on top.
     FORMAT      Ledger reading document: masthead + summary band, log
                 index pill strip, THE LEDGER (compact white ruled entries),
                 one chronological chain figure, colophon.
     HIERARCHY   doc > section > ledger entry > (fold: the reasoning)
     SECTION     masthead (h1 + meta row + mono summary band + log index)
                 → the ledger (entries, newest first, tight padding
                 16–18px — not the tall part-panel grammar) → chain figure
                 (FIG · 01, oldest → newest) → colophon
     ORDER       strictly newest first; exactly one figure; one colophon.

     BLOCK GRAMMAR
       entry    compact white 1.5px-bordered row, two columns:
                LEFT rail (hairline-ruled) = mono DEC-NN id + ADR-NNNN ref
                + date + status chip, stacked; RIGHT = serif title + one-
                line decision summary ALWAYS visible + <details> fold "the
                reasoning" (2–3 sentence context + consequence line)
       chip     Believe = clay-soft/clay-ink · Superseded = rust-soft/rust,
                and its entry: struck muted title + visible "superseded by
                ADR-NNNN" note — a log remembers, it does not delete
       figure   ONE pele TD chain, ADR-0001 top → ADR-NNNN bottom, each ring
                labeled ADR-NNNN with short-name sub; the superseded
                decision as a gray dot; fenced gray-100 plate, legend row
                in the plate header, mono FIG · NN caption, FULLSCREEN pill
       colophon DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every entry grounded in the decision records (docs/adr/)
                 + SUITE-BRIEF — no invented suite facts. Statuses match
                 the records exactly; the newest-first order never breaks.
                 The figure may not claim an order or status the ledger
                 doesn't.
     VOICE       Plausible, domain-real. No invented precise metrics.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 11 · `research-report` — Research Report (contract v0.1)


**Use when:** Research report: question, method band, numbered findings with root-cause/fix/status, conclusion contract, recommendations strip — evidence-first investigation


```text
     TASK        Report ONE structured investigation: a research
                 question, the method that pursued it, numbered findings
                 each carrying observation → root cause → fix and a
                 status chip, and the conclusion + recommendations the
                 findings produced. Analytical, evidence-first, honest:
                 a finding without a fix says so.
     FORMAT      Long-form reading document: masthead + research-question
                 lede, contents pill strip, method band (mono strip),
                 one comparison figure, findings (numbered panels), ink
                 conclusion, mono recommendations strip, colophon.
     HIERARCHY   doc > section > finding panel > (fold: the verification)
     SECTION     masthead (h1 + lede stating the question + meta row +
                 contents) → method (mono strip band) → figure
                 (FIG · 01) → findings (3–6, numbered F1–FN, discovery
                 order) → conclusion (the ink panel) → recommendations
                 (3 mono items) → colophon
     ORDER       findings in discovery order, numbered F1–FN; exactly
                 one figure; one conclusion; one recommendations strip;
                 one colophon.

     BLOCK GRAMMAR
       finding      white 1.5px-bordered panel: mono FINDING FN · tag
                    label left + status chip right + serif h3 + three
                    hairline-ruled rows (OBSERVATION / ROOT CAUSE / FIX)
                    + fold "Verified by · the rerun that closed it" on
                    an oat plate
       status chip  Fixed = olive-soft / olive-ink, olive border, with
                    the version or subsystem that closed it; an open
                    finding stays rust-chipped, never deleted
       method band  mono strip: bordered band, hairline-separated cells,
                    each a mono numeral + mono title + one line
       figure       ONE pele-rendered SVG in a fenced gray-100 plate,
                    legend row in the plate header, mono FIG · NN
                    caption, FULLSCREEN pill
       conclusion   the ink panel — the doc's ONE ink-inverted region;
                    the contract the findings produced, as mono-keyed
                    clauses on a dark plate
       recs         mono strip band of 3 numbered items R1–R3:
                    imperative, one line each
       colophon     DOC ID · suite version · siblings · prepared-by

     IRON RULES  Findings come from the investigation's real record —
                 no invented metrics. Every observation names the
                 environment it was seen in. Every finding carries a
                 root cause and a fix, and its chip matches its true
                 state. The figure may not claim an environment or a
                 failure the findings don't.
     VOICE       Plausible, domain-real, honest about what broke.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 12 · `directional-report` — Directional Report (contract v0.1)


**Use when:** Directional report: current position, chosen direction with BECAUSE rows, cluster markers timeline, explicit anti-direction cards, review triggers — the bearing, stated


```text
     TASK        State ONE chosen direction and hold it to account: the
                 current position, the destination, why this bearing,
                 the markers on the path, what is explicitly NOT the
                 direction, and the triggers that would reopen the
                 question. Forward-looking and opinionated — it takes
                 sides, and says what it declines.
     FORMAT      Long-form reading document: compact mono fact-row band
                 (the position), big statement band on ivory (the
                 direction), one path figure, vertical-marker timeline
                 (deck grammar), anti-direction cards in a 2×2 grid,
                 review-trigger mono strip, colophon.
     HIERARCHY   doc > section > station / refusal card / trigger row
                 > (fold: rationale / procedure)
     SECTION     masthead → jump-nav pill strip → from here (fact band)
                 → the direction (statement band + why-this-bearing
                 rows + fold) → figure (FIG · 01, the path) → markers
                 (vertical timeline: 1.5px line, ring stations, filled
                 = reached/locked) → not the direction (4 rust-chip
                 cards, 2×2) → review triggers (mono strip + fold)
                 → colophon
     ORDER       exactly one figure; exactly four anti-direction cards;
                 one trigger strip; one colophon.

     BLOCK GRAMMAR
       fact-band      compact mono band on ivory between hairlines:
                      label (10px mono muted caps) hard above a mono
                      value — scannable in five seconds
       statement      the direction in one breath — big serif band
                      directly on ivory, one italic clay word, no
                      panel, no fence
       why-row        BECAUSE NN · mono label + body: the bearing's
                      grounds, hairline-separated
       marker         timeline station, deck grammar: mono stap-label
                      (MARKER NN · STATE) + serif h3 + desc + status
                      flag; filled ring = reached / locked
       anti-card      white panel, rust chip NOT THE DIRECTION + serif
                      h3 naming the refusal + body; 2×2 grid
       trigger        rust-soft strip row: TRIGGER NN chip + mono
                      statement + REOPENS · line naming the question
                      it reopens
       fold           <details> on an oat plate; rationale or procedure
       figure         ONE pele-rendered SVG in a fenced gray-100 plate:
                      filled ring = here-now, rings = cluster markers,
                      double ring = the destination; header with FIG ID
                      + legend strip + FULLSCREEN; body = diagram only;
                      footer = caption
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Facts grounded in SUITE-BRIEF and CHANGELOG reality
                 only — no invented suite facts. Opinionated in voice,
                 factual in claims. The figure may not carry a claim
                 the panels don't. Zero scripts beyond the whitelisted
                 fullscreen listener.
     VOICE       Plausible, domain-real, opinionated. No invented
                 precise metrics.
     STATUS      One chip in the masthead only:
                 Draft | Believe | Reviewed | Signed-off
================================================================ -->
```


## 13 · `management-report` — Management Report (contract v0.1)


**Use when:** Management report: BLUF verdict, KPI tiles, cluster progress bars, highlights/lowlights, decisions needed — scannable in 60 seconds


```text
     TASK        Report ONE program upward, to leadership and
                 stakeholders: the bottom line first (verdict + status),
                 the numbers (KPI stat tiles), progress against plan,
                 what went well and what did not, and the explicit
                 decisions requested. Upward-facing and honest — no
                 rounding in the program's favor.
     FORMAT      Scannable-first document: BLUF band on ink (verdict,
                 status chip, three things to know), big-number KPI
                 tiles, per-cluster progress rows with Clay bars,
                 two-column highlights/lowlights, one status figure,
                 decisions-needed rows with background folds, colophon.
                 Scannable in 60 seconds, complete in 3 minutes.
     HIERARCHY   doc > section > tile / plan row / signal item / ask row
                 > (fold: method / membership / background)
     SECTION     masthead → jump-nav pill strip → executive summary
                 (BLUF, ink panel) → the numbers (4–5 KPI tiles + method
                 fold) → against plan (bar rows per cluster + membership
                 fold) → highlights / lowlights (two columns) → figure
                 (FIG · 01, the progress chain) → decisions needed
                 (asks + folds) → colophon
     ORDER       BLUF is the first section — never last. Exactly one
                 figure; one decisions section; one colophon.

     BLOCK GRAMMAR
       bluf band      ink panel (slate ground): status chip + reporting
                      period strip, the verdict in big serif with one
                      italic clay phrase, three numbered know-rows, a
                      mono next-gate line. First section of the document.
       kpi tile       white bordered panel (one clay-soft hero): mono
                      micro-label, giant mono numeral, one sub-line.
                      Numbers counted from the repository at build time.
       plan row       hairline-separated row: cluster name + members,
                      landed count in mono, Clay progress bar (gray
                      track, clay fill), % in mono, status flag
                      (Complete olive / In progress clay / Queued gray).
       signal         chip (olive H·NN or rust L·NN) + serif lead + body,
                      stacked in a two-column highlights/lowlights grid.
       ask            decision row: D-NN chip + needed-by line, the ask
                      as serif h3, the unlock it buys, background fold
                      on an oat plate.
       fold           <details> on an oat plate; method, membership,
                      background.
       figure         ONE pele-rendered SVG in a fenced gray-100 plate:
                      filled ring = complete cluster, open ring = work
                      remains (sub-label carries the count), double ring
                      = the destination; header with FIG ID + legend
                      strip + FULLSCREEN; body = diagram only; footer =
                      caption
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every number counted from the repository at build time
                 (template directory, index.json, CHANGELOG, docs/adr/,
                 assets/experiments/) — never estimated, never rounded
                 in the program's favor. Facts grounded in SUITE-BRIEF
                 and CHANGELOG reality only. The figure may not carry a
                 claim the rows don't. Zero scripts beyond the
                 whitelisted fullscreen listener.
     VOICE       Plausible, domain-real, direct. Verdict first.
     STATUS      One chip in the BLUF band: the program status
                 (On track | At risk | Off track).
================================================================ -->
```


## 14 · `data-report` — Data Report (contract v0.1)


**Use when:** Data report: dataset + method, pele pie and xychart charts in clay series colors, metrics table with real byte counts, numbered observations — numbers-first reporting


```text
     TASK        Present one quantitative subject: what was measured
                 and how (the dataset), two charts each grounded in a
                 stated source and counting method, a bytes-on-disk
                 metrics table, and numbered observations. Numbers
                 first — every figure traceable to its counting method.
     FORMAT      Numbers-first document: dataset section with headline
                 counter tiles, two figure plates (pele pie + pele
                 xychart, Clay series colors via --pele-series-*),
                 ruled metrics table (files / bytes / KB per area),
                 four numbered one-sentence observations, colophon.
                 Scannable in 60 seconds, auditable in 3 minutes.
     HIERARCHY   doc > section > tile / figure plate / table row /
                 observation row > (fold: counting method)
     SECTION     masthead → jump-nav pill strip → the dataset (tiles +
                 method fold) → fig · 01 (composition pie) → fig · 02
                 (growth bars) → metrics table → observations →
                 colophon
     ORDER       The dataset is the first section — method before
                 numbers. Exactly two figures, one table, one
                 observations section, one colophon.

     BLOCK GRAMMAR
       tile           white bordered panel (one clay-soft hero): mono
                      micro-label, giant mono numeral, one sub-line.
                      Counted from the repository at collection date.
       figure plate   pele-rendered SVG in a fenced gray-100 plate:
                      header = FIG ID + FULLSCREEN pill, legend strip =
                      the chart's decoding key as mono text + swatches
                      (the emitted legend info, pasted into the header),
                      body = the diagram only, footer = caption naming
                      the source and the collection date.
       table          ruled register: mono uppercase headers, hairline
                      rows, mono right-aligned numerals, 1.5px total
                      rule, counting note under the table.
       observation    numbered row: O-NN chip + ONE sentence, grounded
                      in a number stated on this page.
       fold           <details> on an oat plate; the counting method.

     IRON RULES  Every number counted from the repository at the
                 collection date (ls/du file counts, byte sums, the
                 registry, the changelog) — never estimated, never
                 invented. Every chart names its source and its
                 counting method. Chart series colors are Clay:
                 clay #FE6C2D, olive #788C5D, rust #B04A3F, slate
                 #141413, then gray steps — set via --pele-series-1..8
                 on the plate CSS, never pele's default blues. The
                 measuring document excludes itself from template byte
                 sums (the instrument does not measure itself) and says
                 so in the method fold. Zero scripts beyond the
                 whitelisted fullscreen listener.
     VOICE       Plain, quantitative, declarative. Numbers first.
     STATUS      The collection date is stated in the masthead, in
                 every figure footer and in the table note.
================================================================ -->
```


## 15 · `annual-report` — Annual Report (contract v0.1)


**Use when:** Annual report: publication-grade yearly summary — cover numeral, year-at-a-glance tiles, signed lead's letter, the day in review timeline, performance table, portfolio catalog, outlook


```text
     TASK        Report ONE YEAR of ONE organization as a publication-
                 grade summary: the cover masthead, the year at a
                 glance, the lead's signed letter, the year in review
                 as a timeline, the performance numbers, the portfolio,
                 and the outlook. Formal and polished — the suite's
                 flagship document type. Honest compression: own the
                 real shape of the year, never fake a spread of dates.
     FORMAT      Annual-publication grammar: a cover that reads like a
                 masthead (giant display YEAR, kicker line, org pill),
                 stat tiles, a serif letter signed in italic, an
                 hour-based timeline, a ruled numbers table, a compact
                 ruled catalog, one phase figure, short outlook
                 paragraphs, colophon. Scannable in 90 seconds,
                 complete in 5 minutes.
     HIERARCHY   doc > section > tile / letter / station / table row /
                 catalog row / outlook row > (fold: method / counting)
     SECTION     masthead cover (the YEAR as display numeral + "THE
                 FOUNDING YEAR" kicker + org pill) → jump-nav pill
                 strip → year at a glance (6 stat tiles + method fold)
                 → the lead's letter (serif, first person, signed)
                 → the day in review (timeline, honestly approximate
                 times, labeled as reconstructed) → performance (ruled
                 table + counting fold) → the portfolio (catalog by
                 cluster) → figure (FIG · 01, the phases) → outlook
                 (short paragraphs) → colophon
     ORDER       Cover first, colophon last. Exactly one letter, one
                 figure, one numbers table, one catalog, one outlook.

     BLOCK GRAMMAR
       cover          the hero directly on ivory: org pill kicker, the
                      YEAR as a giant serif display numeral, mono
                      "THE FOUNDING YEAR" kicker line, serif standfirst
                      with the one italic clay word, lede, meta rows.
       glance tile    white bordered panel (one clay-soft hero): mono
                      micro-label, giant mono numeral, one sub-line.
                      Numbers counted at build time — never estimated.
       letter         white bordered panel; serif body 1.75 leading,
                      first person singular, 3–4 short paragraphs,
                      mono dateline, signature in italic serif.
       station        deck timeline grammar: 1.5px vertical line, 17px
                      clay rings, filled = completed; mono time label,
                      serif h3, body desc; flags for honest caveats.
       perf row       ruled table: measure (600 weight) · value (mono)
                      · counted-how (body). One counting fold beneath.
       catalog row    hairline-ruled compact list under mono cluster
                      labels: mono number + serif name + one-line.
       outlook row    ruled row: mono chip (O·NN) + serif h3 + short
                      paragraph. No asks — an outlook states, not begs.
       figure         ONE pele-rendered SVG in a fenced gray-100 plate:
                      filled rings = phases completed on the day, time
                      subs under each ring, double ring = the year
                      ahead; header FIG ID + legend strip + FULLSCREEN;
                      body = diagram only; footer = caption.
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every number counted from the repository at build
                 time — never estimated, never rounded in the year's
                 favor. Dates: only dates that exist (here: ONE founding
                 day); times are approximate and labeled "reconstructed
                 from the session log". The figure may not carry a claim
                 the timeline and table don't. Zero scripts beyond the
                 whitelisted fullscreen listener.
     VOICE       Formal, first-person-plural institutional EXCEPT the
                 letter, which is first-person singular and signed.
================================================================ -->
```


## 16 · `project-plan` — Project Plan (contract v0.1)


**Use when:** Project plan: objective band, scope in/out, five phase panels with deliverables/exit-criteria/status, milestone chain to v1.0.0, dependencies & risks, governance — the execution contract


```text
     TASK        Plan ONE objective's execution: what is in and out of
                 scope, the phases in build order (each with exact
                 deliverables and exit criteria), the milestone chain,
                 the dependencies and risks, and the governance the
                 work runs under. The plan a team actually executes
                 against — counts real, criteria checkable, status
                 honest.
     FORMAT      Execution-breakdown document: objective band on ink,
                 scope table (in / out), phase panels with status
                 chips, one milestone figure, dependency strip +
                 risk/mitigation table, governance rows, colophon.
                 Executable over aspirational.
     HIERARCHY   doc > section > phase panel / dep row / risk row /
                 governance row > (fold: membership / counting method)
     SECTION     masthead → jump-nav pill strip → objective (ink band)
                 → scope (IN/OUT table + membership fold) → phases
                 (panels, build order; each = deliverables + exit
                 criteria + status chip) → milestones (FIG · 01, the
                 phase chain) → dependencies & risks (dep strip +
                 tinted risk/mitigation table) → governance (gate +
                 extension protocol + ledger) → colophon
     ORDER       objective first, colophon last. Exactly one figure;
                 one scope table; one risk table; one colophon.

     BLOCK GRAMMAR
       objective band ink panel (slate ground): status chip + horizon
                      strip, the objective in big serif with one
                      italic clay phrase, mono rows (done-when /
                      protocol / measure), mono next-gate line. First
                      section of the document.
       scope table    ruled two-column table: IN the work / OUT the
                      deferrals, row-aligned; membership fold beneath
                      names every in-scope item.
       phase panel    white bordered panel: PHASE NN chip + name h3 +
                      status flag (In progress clay / Queued gray) +
                      numbered deliverables (exact names) + exit
                      criteria on a gray mono plate. One per remaining
                      cluster, in build order.
       dep strip      gray-100 strip, mono DEP-NN rows: what waits on
                      what, one line each.
       risk row       two-cell tinted region (rust-soft risk /
                      olive-soft mitigation), R-NN / MITIGATION chips.
       governance     white panel, GOV-NN rows: the rule stated once,
                      with its source.
       fold           <details> on an oat plate; membership, counting.
       figure         ONE pele-rendered SVG in a fenced gray-100
                      plate: filled ring = here-now, open rings =
                      phases ahead (sub-label carries the count),
                      double ring = the destination; header with FIG
                      ID + legend strip + FULLSCREEN; body = diagram
                      only; footer = caption
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every count taken from the repository at build time
                 (template directory, index.json, CHANGELOG, the
                 cluster board). Facts grounded in SUITE-BRIEF and
                 CHANGELOG reality only — no invented suite facts, no
                 test suite claimed that the repository does not show.
                 Phases follow the canonical cluster board
                 (3+6+5+5+3+4+9 = 35). The figure may not carry a
                 claim the panels don't. Zero scripts beyond the
                 whitelisted fullscreen listener.
     VOICE       Plausible, domain-real, direct. Executable over
                 aspirational: every exit criterion checkable.
     STATUS      One chip in the objective band, one flag on every
                 phase panel: In progress | Queued.
================================================================ -->
```


## 17 · `high-level-timelines-and-steps` — High Level Timelines And Steps (contract v0.1)


**Use when:** High-level timelines and steps: the suite's four core processes as step tracks — numbered circles on hairlines, per-step trigger/output cards, effort estimates; the sequencing view


```text
     TASK        Present a program's processes as timelines broken
                 into steps — each step with its trigger, its
                 duration/effort (an honest estimate, labeled), and
                 its output. The sequencing view: when, in what
                 order, and what each step produces. A schedule, not
                 a player — no done/active states.
     FORMAT      Timeline-and-step document: order thesis on ink,
                 one section per timeline — each a horizontal step
                 track (numbered clay rings on a hairline, names
                 beneath) above a grid of step cards (STEP NN chip,
                 effort estimate, trigger line, output line, suite-
                 term line) — one chain figure, colophon.
     HIERARCHY   doc > section (timeline) > step track + step card >
                 (fold: estimate method)
     SECTION     masthead → jump-nav pill strip → order band (ink)
                 → timeline 01 the production run (+ FIG · 01, the
                 chain) → timeline 02 the template build →
                 timeline 03 the extension protocol → timeline 04
                 the video export (status note) → colophon
     ORDER       thesis first, colophon last. Exactly one figure;
                 four timeline sections; one colophon.

     BLOCK GRAMMAR
       order band     ink panel (slate ground): schedule-view chip +
                      count strip, the thesis in big serif with one
                      italic clay word, mono rows (timeline / step /
                      output / states / estimates), mono next line.
                      First section of the document.
       timeline head  TIMELINE NN sec-kick + effort chip (the ≈
                      summary, labeled as estimates), serif h2,
                      one-line purpose lede.
       step track     horizontal track: mono-numbered clay-stroked
                      rings connected by a hairline, step names in
                      mono caps beneath. The order at a glance.
       step card      white bordered card: STEP NN chip + effort
                      estimate (right, mono), name h3, TRIGGER line,
                      OUTPUT line (mono label + text), and where the
                      step maps to a real suite term, a clay-ink mono
                      line "the suite calls this: X".
       figure         ONE pele-rendered chain in a fenced gray-100
                      plate: open rings = steps, edge labels = the
                      outputs handed forward, double ring = the
                      destination; header with FIG ID + legend strip +
                      FULLSCREEN; body = diagram only; footer =
                      caption
       fold           <details> on an oat plate; the estimate method.
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Facts grounded in SUITE-BRIEF only — no invented
                 suite facts. Every duration is an honest estimate,
                 labeled as one; the video export's are guesses, and
                 its section says so outright (the pipeline is
                 parked). This is a schedule view: no done/active
                 states anywhere. Counts taken from the repository at
                 build time (16 templates on disk, index at 1.4.0;
                 denominator = the 35-type launch taxonomy). The
                 figure may not carry a claim the cards don't. Zero
                 scripts beyond the whitelisted fullscreen listener.
     VOICE       Plausible, domain-real, direct. The order is the
                 payload: a step's output is the next step's input.
     STATUS      Schedule view — no status chips on steps; the only
                 chip per timeline is its effort summary.
================================================================ -->
```


## 18 · `workflow-template` — Workflow Template (contract v0.1)


**Use when:** Workflow template: roles strip, do/verify step rows with role chips, decision-point callouts, per-phase checklists, definition-of-done band; swimlane figure in two role lanes


```text
     TASK        Publish an operating procedure a team actually
                 follows — here: the document production workflow of
                 the human + agent pair. Phases with role-assigned
                 do/verify steps, decision-point callouts, per-phase
                 checklists, one definition of done. A procedure to
                 execute, not a report to read.
     FORMAT      Workflow document: roles strip (two role cards +
                 grammar strip), one swimlane figure, one section per
                 phase — each step a row (role chip · action · mono
                 VERIFY line "done when: …"), each phase closed by a
                 static checklist (CSS box glyphs, print-safe, not
                 interactive) — decision callouts between phases, a
                 definition-of-done ink band, colophon.
     HIERARCHY   doc > section (phase) > step row + checklist >
                 (fold: why every step carries a verify line)
     SECTION     masthead → jump-nav pill strip → roles (+ FIG · 01,
                 the run split by role) → phase 01 ask & align
                 (+ decisions 01–02, the type gate) → phase 02 build
                 → phase 03 check (+ decision 03, the gate) → phase 04
                 keep → definition of done (ink) → colophon
     ORDER       roles first, colophon last. Exactly one figure; four
                 phase sections; three decision callouts; one ink band.

     BLOCK GRAMMAR
       roles strip    two white bordered cards side by side — YOU and
                      THE SESSION — each: role chip, mono verbs line,
                      one-line responsibility. Above them, a grammar
                      strip: four cells (role · action · verify ·
                      checklist) that teach the step anatomy once.
       phase head     PHASE NN sec-kick + chip (steps count, who acts),
                      serif h2, one-line purpose lede.
       step row       hairline-separated row: role chip (YOU = clay,
                      THE SESSION = olive) · action h3 + one-line body
                      · mono verify plate "done when: …". Every step
                      carries role AND verify — no exceptions.
       checklist      white bordered card, mono title, static CSS box
                      glyphs (empty squares, 1.5px muted border). Not
                      interactive; they keep their boxes on paper.
       decision       clay-soft callout: rotated-square "?" glyph, mono
                      kicker "DECISION NN · <condition>", the rule in
                      one sentence, one supporting line. Placed at the
                      phase exit it governs. The document never computes
                      the branch — the pair does, out loud.
       done band      ink panel (slate ground): chip + the thesis in big
                      serif with one italic clay word, numbered mono rows
                      — the four conditions, the fourth marked
                      conditional. Last content section before colophon.
       figure         ONE pele-rendered swimlane (swimlane-beta) in a
                      fenced gray-100 plate: two lanes YOU / THE SESSION
                      across the production phases, rings = steps, double
                      ring = the deliverable; header with FIG ID + legend
                      strip + FULLSCREEN; body = diagram only; footer =
                      caption.
       fold           <details> on an oat plate — one only: why every
                      step carries a verify line.
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Facts grounded in SUITE-BRIEF's workflow section only —
                 no invented suite facts. Every step carries a role and
                 a verify line. Checklists are static: no checkboxes
                 inputs, no scripts, boxes print as drawn. Decision
                 callouts restate the brief's own rules (confirm when
                 two types match; nothing builds past a failed gate;
                 the extension protocol when no type matches). Counts
                 taken at build time (17 templates on disk, index at
                 1.5.0; denominator = the 35-type launch taxonomy). Zero
                 scripts beyond the whitelisted fullscreen listener.
     VOICE       An operating procedure: imperative, direct, second
                 person where the role is you. The verify line is the
                 payload — a step without "done when" is not a step.
     STATUS      Execution view — the boxes start empty every run;
                 nothing here tracks state between documents.
================================================================ -->
```


## 19 · `meeting-notes` — Meeting Notes (contract v0.1)


**Use when:** Meeting notes: attendees, agenda, per-topic discussion, decisions made as chip-led rows, action table with owners, follow-ups — the suite's lightest grammar, everything visible


```text
     TASK        Capture ONE meeting so it can be read once and acted
                 on: who attended, what was on the agenda, what was
                 said per topic, which decisions were made, which
                 action items carry owners, and what follows. The
                 suite's lightest grammar — a meeting note is written
                 fast and read once.
     FORMAT      Meeting note: masthead + meta row (attendee chips
                 live here), meeting index pill strip, agenda as a
                 numbered ruled list, discussion as short labeled note
                 groups, decisions as chip-led compact ruled rows
                 (decisions-log tightness), action items as a compact
                 table with owner chips, a follow-ups strip, one
                 meeting-chain figure, colophon.
     HIERARCHY   doc > section > ruled row / note group > (nothing —
                 everything visible, no folds)
     SECTION     masthead (h1 + meta row + attendee chips + meeting
                 index) → agenda (numbered ruled list) → discussion
                 (per agenda item: short labeled notes) → decisions
                 (compact chip-led rows) → action items (item / owner
                 chip / status) → follow-ups strip → chain figure
                 (FIG · 01) → colophon
     ORDER       agenda order is the discussion order is the figure
                 order; decisions sit after discussion, actions after
                 decisions; colophon last. Exactly one figure; no
                 folds, no tall panels — everything visible.

     BLOCK GRAMMAR
       attendee chip  mono pill in the meta row, role-chip grammar:
                      YOU = clay-soft/clay-ink, THE SESSION =
                      olive-soft/olive-ink, BOTH = neutral gray
       agenda row     hairline-ruled row: mono numeral (clay-ink) ·
                      serif topic + one-line scope · right mono
                      REVIEW NN meta — the discussion reuses these
                      numbers
       note group     topic head (mono TOPIC NN + serif h3 + chip
                      "AGENDA · NN") over 2–3 note rows: mono label
                      rail + one/two-line text, hairline-ruled,
                      tight padding
       decision row   decisions-log compactness: 122px rail (mono
                      DEC-NN + agenda ref + ADOPTED chip) · serif
                      title + one-line decision ALWAYS visible — no
                      fold, the reasoning is the one line
       action row     compact 3-column ruled table: item text · owner
                      chip · status chip (IN PROGRESS = clay-soft,
                      STANDING = neutral, QUEUED = olive-soft)
       follow-up      slim gray band: mono NEXT SYNC label + one line
       figure         ONE pele chain of the meeting itself — three
                      review rings down the agenda, three filled
                      decision rings at the bottom (filled = locked,
                      the klaar convention); fenced gray-100 plate,
                      legend in the plate header, mono FIG · NN
                      caption, FULLSCREEN pill
       colophon       DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every fact grounded in the meeting's actual history
                 and SUITE-BRIEF — no invented suite facts. Counts
                 taken at build time (18 templates on disk at the
                 sync; denominator = the 35-type launch taxonomy).
                 The agenda, discussion, decisions, actions and
                 figure tell one consistent story: no row may claim
                 what another row contradicts. Zero scripts beyond
                 the whitelisted fullscreen listener. No <details>:
                 a meeting note never hides its own content.
     VOICE       Written fast, read once: short ruled rows, compact
                 tables, mono labels before prose. A note is a fact,
                 not a paragraph.
     STATUS      One chip in the masthead only:
                 Recorded | Draft | Believe | Signed-off
================================================================ -->
```


## 20 · `interview-transcript` — Interview Transcript (contract v0.1)


**Use when:** Interview transcript: turn-taking Q&A in four themes — speaker chips, clay-ruled answers, ink pull quotes; true founding-session history


```text
     TASK        Record ONE interview so the reader follows the
                 conversation, not an essay: who asked what, what was
                 answered, organized by theme, with the strongest
                 statements pulled as ink quotes. Turn-taking
                 typography is the whole design.
     FORMAT      Interview transcript: masthead + meta row (speaker
                 chips live here), theme index pill strip, four theme
                 sections of Q&A exchanges, ink pull-quote panels
                 inside the themes, one arc figure, colophon.
     HIERARCHY   doc > theme section > Q&A exchange > (nothing —
                 no folds, no tall panels: the turns are the document)
     SECTION     masthead (h1 + meta row + speaker chips + theme
                 index) → theme 01 · on starting clean → theme 02 ·
                 on the gates (+ PULL 01) → theme 03 · on what broke
                 (+ PULL 02) → theme 04 · on what's next → arc figure
                 (FIG · 01) → colophon
     ORDER       themes in conversation order is the figure order;
                 colophon last. Exactly one figure; 8 Q&A exchanges
                 (2 per theme); 2 pull quotes; no <details> — a
                 transcript never hides its own content.

     BLOCK GRAMMAR
       exchange      one Q&A unit: turn-head (mono TURN NN + speaker
                     chip) over the Q line, then the indented answer
                     block. Compact ruled rhythm, tight padding.
       Q line        mono "Q ·" mark in clay-ink + the question in
                     medium-weight sans, slate ink
       answer block  indented under a thin clay left rule; speaker
                     chip (THE FOUNDING SESSION) + answer in body ink
       speaker chips role-chip grammar carried from the workflow and
                     meeting siblings: YOU = clay-soft/clay-ink,
                     THE FOUNDING SESSION = olive-soft/olive-ink
       theme         mono sec-kick pill (THEME NN · label) + serif h2
                     + one-line lede over a .turns rail of exchanges
       pull quote    slim ink panel (slate ground): mono PULL QUOTE
                     label, serif quote whose single italic phrase is
                     clay, mono attribution line. At most 3 per
                     document; each earns its ink.
       figure        ONE pele chain of the interview arc — four
                     stations; filled ring = theme on the record
                     (settled), open ring = still ahead, the deck's
                     klaar convention. Fenced gray-100 plate, legend
                     in the plate header, mono FIG · NN caption,
                     FULLSCREEN pill.
       colophon      DOC ID · suite version · siblings · prepared-by

     IRON RULES  Every fact grounded in the interview's actual history
                 and SUITE-BRIEF — no invented suite facts. Counts
                 taken at build time (20 of 35 types landed at this
                 template's build; denominator = the 35-type launch
                 taxonomy). Themes, exchanges, pulls and figure tell
                 one consistent story: no turn may claim what another
                 turn contradicts. Zero scripts beyond the whitelisted
                 fullscreen listener. No <details>.
     VOICE       Spoken, not written: questions are questions, answers
                 are answers. Mono carries the scan (turn numbers,
                 speaker chips, theme labels); the pull quotes carry
                 the memory.
     STATUS      One chip in the masthead only:
                 On the record | Recorded | Draft
================================================================ -->
```


## 21 · `standard-operating-procedure` — Standard Operating Procedure (contract v0.1)


**Use when:** Standard operating procedure: doc-control table, numbered clauses with MUST/SHALL, verification, records, revision history, approval block — the compliance-grade grammar. Subject: operating the figure pipeline


```text
     TASK        Govern ONE repeatable operation as a compliance-grade
                 SOP: doc control, numbered clauses in MUST/SHALL,
                 verification, records, revision history, approval.
                 The most formal grammar in the suite — austere and
                 precise; everything visible, nothing folded.
     FORMAT      SOP reading document: masthead + DOC CONTROL table,
                 clause index pill strip, seven numbered sections,
                 procedure clauses in a left-rail grid, one chain
                 figure, approval block with signature lines, colophon.
     HIERARCHY   doc > section > clause > (no folds — an SOP shows
                 everything it requires)
     SECTION     masthead (h1 + doc-control table + clause index)
                 → 1 purpose → 2 scope → 3 prerequisites → 4 procedure
                 (clauses 4.1–4.7 + FIG · 01 chain) → 5 verification →
                 6 records → 7 revision history → approval → colophon
     ORDER       sections numbered 1–7; clauses break only at sentence
                 boundaries; exactly one figure; colophon last.

     BLOCK GRAMMAR
       doc-control  ruled table at the top of the masthead — the
                    formal signature: SOP ID, version, effective date,
                    owner, review cycle, supersedes; mono micro row
                    labels, plain values; one chip only (Effective)
       clause       white 1.5px-bordered row, two columns: LEFT rail
                    (hairline-ruled) = mono CLAUSE micro-label + the
                    clause number; RIGHT = the clause text, complete
                    sentences only, MUST/SHALL in clay-ink bold,
                    paths/flags in mono code marks
       tables       verification (check · pass condition), records
                    (record · form · location), revision history
                    (version · date · author · description) — ruled,
                    mono headers, break-inside avoid
       approval     two signature cells: prepared-by (signed at issue)
                    and approved-by (pending — signed at the review
                    gate); serif-italic signature over a hairline
       figure       pele chain of the procedure clauses, one ring per
                    clause in execution order; fenced gray-100 plate,
                    legend row in the plate header, mono FIG · NN
                    caption, FULLSCREEN pill
     IRON RULES   Every clause grounded in the suite's real figure
                  pipeline (SUITE-BRIEF + CLAY-STYLE appendix + the
                  research report's findings) — no invented tooling.
                  MUST/SHALL only where the suite actually enforces;
                  no <details> anywhere; zero scripts beyond the
                  whitelisted fullscreen listener.
     VOICE        Austere, imperative, auditable. Short sentences.
     STATUS       One chip only, in the doc-control head: Effective.
================================================================ -->
```


## 22 · `api-documentation` — Api Documentation (contract v0.1)


**Use when:** API documentation: precision reference for the build-time CLI — signatures, parameter tables, real captured examples, exit codes, PeleError anatomy; documented from source, verified by running the tools


```text
     TASK        Document ONE tool surface as a precision reference:
                 signatures, parameter tables, invocations with their
                 expected output, error/exit-code tables. Everything
                 exact — a reader integrates against this page, so
                 every fact is transcribed from the real sources.
     FORMAT      API reading document: masthead + REFERENCE CONTROL
                 table, index pill strip, numbered sections, one tool
                 section per tool (signature → parameters → example →
                 errors), one chain figure, an error-handling section,
                 colophon.
     HIERARCHY   doc > section > tool > (no folds — a reference hides
                 nothing the integrator needs)
     SECTION     masthead (h1 + reference-control table + index)
                 → 1 reference surface (+ FIG · 01 chain) → 2 shared
                 conventions (arg grammar, exit-code contract, output
                 discipline) → 3 render-figure.mjs → 4 clayify.mjs →
                 5 render-figure-video.mjs → 6 error handling →
                 colophon
     ORDER       sections numbered 1–6; every tool section keeps the
                 same block order: SIGNATURE, PARAMETERS, EXAMPLE,
                 ERRORS; colophon last.

     BLOCK GRAMMAR
       reference-control  ruled table at the top of the masthead —
                          reference ID, documents, suite, engine,
                          owner; one chip only (Current)
       tool section       tool head (exact lowercase path pill + role
                          line) → SIGNATURE usage block (verbatim from
                          the source) → PARAMETERS ruled table (name ·
                          type · default · behavior) → EXAMPLE: the
                          invocation on a gray-100 mono plate, its
                          expected output on an ink terminal block →
                          ERRORS ruled table (exit · message · cause)
       spec schema        clayify's spec JSON as a ruled table
                          (key · type · default · meaning)
       pipeline steps     SOP clause rows (left rail = STEP n) for the
                          video tool's five-stage render pipeline
       terminal           ink block: fixed dark ground in both modes,
                          output verbatim as the tool prints it — only
                          real captured output goes in a terminal
       figure             pele chain of the three tools, one ring per
                          tool, double ring = the document, gray dots =
                          files; fenced gray-100 plate, clayified
                          legend row pasted into the plate header, mono
                          FIG · NN caption, FULLSCREEN pill
     IRON RULES   Every flag, default, message, log line and exit code
                  transcribed from the actual sources (render-figure.mjs,
                  clayify.mjs, render-figure-video.mjs, pele 1.12.0) —
                  no invention, no paraphrase of stderr. Terminal blocks
                  carry only output actually captured from a run.
                  No <details> anywhere; zero scripts beyond the
                  whitelisted fullscreen listener.
     VOICE        Exact, declarative, checkable. Short sentences.
     STATUS       One chip only, in the reference-control head: Current.
================================================================ -->
```


## 23 · `request-for-proposal` — Request For Proposal (contract v0.1)


**Use when:** Request for proposal: outbound solicitation — background, objectives, scope in/out, mandatory/desirable requirements, weighted evaluation (sums 100), submission instructions, timeline, terms. Subject: RFP-2026-01, the accessibility & print audit


```text
     TASK        Solicit ONE outbound procurement as a formal-
                 contractual RFP: background, objectives, scope of
                 work, mandatory/desirable requirements, weighted
                 evaluation criteria, submission instructions,
                 timeline, terms & conditions. The most outward-
                 facing formal grammar in the suite — the document
                 asks vendors to propose; it is an invitation, not
                 an offer.
     FORMAT      RFP reading document: masthead + RFP CONTROL table,
                 index pill strip, eight numbered sections, objectives
                 and terms as clause-rail rows, requirement and
                 evaluation tables, one timeline figure, colophon.
     HIERARCHY   doc > section > clause/table row > (no folds — a
                 solicitation shows every term it will be held to)
     SECTION     masthead (h1 + control table + index) → 1 background
                 → 2 objectives → 3 scope of work → 4 requirements →
                 5 evaluation criteria → 6 submission instructions →
                 7 timeline (+ FIG · 01 chain) → 8 terms & conditions
                 → colophon
     ORDER       sections numbered 1–8; evaluation weights sum to
                 exactly 100; the deadline reads identically in the
                 control table, section 6 and section 7; colophon last.

     BLOCK GRAMMAR
       rfp-control  ruled table at the top of the masthead — the
                    formal signature: RFP number, issue date, buyer,
                    responses due, channel; one chip only (Open)
       clause       white 1.5px-bordered row, two columns: LEFT rail
                    (hairline-ruled) = mono OBJECTIVE/TERM micro-label
                    + the clause number; RIGHT = the clause text,
                    complete sentences only, MUST/SHALL in clay-ink
                    bold, paths/labels in mono code marks
       tables       requirements (MANDATORY M1–M5 / DESIRABLE D1–D3),
                    evaluation (criterion · weight · what scores —
                    weights sum to 100), scope (in-scope S-1…S-4 /
                    out-of-scope X-1…X-4), proposal format (P-1…P-5),
                    timeline (milestone · date · what happens) —
                    ruled, mono headers, break-inside avoid
       figure       pele chain of the RFP timeline, one ring per
                    milestone in date order; filled ring = here-now,
                    double ring = the destination; fenced gray-100
                    plate, legend row in the plate header, mono
                    FIG · NN caption, FULLSCREEN pill
     IRON RULES   Every fact grounded in the suite's real state
                  (SUITE-BRIEF + CLAY-STYLE + the template directory
                  on disk) — no invented tooling, no invented dates.
                  MUST/SHALL only where the RFP actually binds.
                  No <details> anywhere; zero scripts beyond the
                  whitelisted fullscreen listener.
     VOICE        Formal-contractual. The buyer proposes terms; the
                  vendor proposes work. Short declarative sentences.
     STATUS       One chip only, in the control head: Open.
================================================================ -->
```


## 24 · `request-for-information` — Request For Information (contract v0.1)


**Use when:** Request for information: the light inquiry — control table, not-a-solicitation strip, four numbered question groups on automated template-quality tooling, response guidelines, explicit no-obligation next steps


```text
     TASK        Run ONE outbound market inquiry as a formal RFI:
                 background, area of interest as numbered question
                 groups, response guidelines, what happens next.
                 The RFI is the lighter inquiry sibling of the RFP:
                 it asks for INFORMATION to inform a possible future
                 solicitation. No award, no scoring, no obligation —
                 the respondent educates the issuer, and the document
                 says so explicitly (strip, control note, section 4).
     FORMAT      RFI reading document: masthead + not-a-solicitation
                 strip + RFI CONTROL table, index pill strip, four
                 sections, question GROUPS as numbered panels with
                 mono Q numbers, a checklist-style ruled response
                 list, one chain figure, colophon.
     HIERARCHY   doc > section > question group > question row
                 (no folds — an inquiry hides nothing it asks)
     SECTION     masthead (h1 + strip + control table + index) →
                 1 background (incl. the gates as they run today)
                 → 2 area of interest (4 question groups) →
                 3 response guidelines (checklist) → 4 what happens
                 next (+ FIG · 01 chain) → colophon
     ORDER       sections numbered 1–4; question groups numbered
                 1–4 with rows Qn.1…Qn.m; the deadline reads
                 identically in the control table, the checklist and
                 FIG · 01; colophon last.

     BLOCK GRAMMAR
       nas-strip   clay-soft band under the lede — the RFI's
                   signature: NOT A SOLICITATION pill + the no-
                   award/no-scoring/no-obligation sentence
       rfi-control ruled table at the top of the masthead — RFI
                   number, subject, issued, responses due, channel,
                   plus an explicit NOTE row; one chip only (Open)
       qgroups     white 1.5px-bordered panels: mono group numeral +
                   serif h3 + mono frame label, then ruled rows with
                   mono Q numbers (Q1.1…) — deliberately NO weighted
                   table; this is the lighter grammar
       checklist   ruled C-1…C-n rows with an empty clay checkbox
                   square — what a useful response contains
       next        ruled numbered rows (mono numerals) — the honest
                   chain from responses to a possible RFP
       figure      pele chain RFI issue → responses → summary →
                   (possible) RFP-2026-02; filled ring = here-now,
                   double ring = the possible outcome, DASHED edge =
                   only if warranted; fenced gray-100 plate, legend
                   row in the plate header, mono FIG · NN caption,
                   FULLSCREEN pill
     IRON RULES   Every fact grounded in the suite's real state
                  (SUITE-BRIEF + CLAY-STYLE + the template directory
                  on disk) — no invented tooling, no invented dates.
                  MUST/SHALL only where the RFI actually binds —
                  which is almost nowhere; state the non-binding
                  character instead. No <details> anywhere; zero
                  scripts beyond the whitelisted fullscreen listener.
     VOICE        Plain-informative. The issuer asks; the market
                  answers; nothing is won or lost. Short declarative
                  sentences.
     STATUS       One chip only, in the control head: Open.
================================================================ -->
```


## 25 · `business-case` — Business Case (contract v0.1)


**Use when:** Business case: retrospective validation of the founding investment — three options with cost models, cost-benefit table, break-even xychart (clay series), sensitivity rows, risks, validated verdict


```text
     TASK        Justify ONE investment with numbers: what was spent,
                 the options that were on the table (each with its own
                 cost model), the cost-benefit comparison, the break-
                 even point drawn as a chart, the returns the model
                 cannot count, the sensitivity of the conclusion to
                 the assumptions, the risks OF the investment, and a
                 recommendation. Financial register — numbers lead,
                 prose supports.
     FORMAT      Business-case reading document: masthead + estimates
                 strip (the honesty signature), ask band (ink), three
                 option cards each with a mini cost column, ruled
                 cost-benefit table, break-even figure in full plate
                 grammar (pele xychart, Clay series colors), benefits
                 tiles, small sensitivity table, risk rows, verdict
                 (ink) with a reopen fold, colophon. Scannable in 60
                 seconds, auditable in 3 minutes.
     HIERARCHY   doc > section > option card / table row / risk row >
                 (fold: model assumptions, reopen conditions)
     SECTION     masthead (h1 + estimates strip + meta + index) →
                 1 the ask → 2 options considered → 3 cost–benefit →
                 4 fig · 01 break-even → 5 benefits beyond time →
                 6 sensitivity → 7 risks → 8 recommendation → colophon
     ORDER       The ask comes first and states that the investment is
                 ALREADY SPENT — a retrospective case validates a sunk
                 cost against the alternatives; it requests no money.
                 Every number traces to the stated model. The
                 recommendation is the last word before the colophon.

     BLOCK GRAMMAR
       estimates    clay-soft strip under the lede — MODEL, NOT
                    MEASUREMENT pill + the honesty sentence. This
                    case's signature: every number is a labeled
                    estimate, and the strip says so before any number.
       ask band     ink region in section 1: what was spent, when, and
                    that it is sunk — the only question left is
                    whether the alternatives were cheaper.
       option cards three white 1.5px-bordered cards, each with a mini
                    cost column (build / per document / at 10 docs·yr
                    as ruled dl rows), consistency + offline chips and
                    a dotted-top status line; the SELECTED option is
                    the clay-soft hero card with the clay frame.
       cb-table     ruled register: option / build cost / cost per
                    document / cost at 10 docs·yr / consistency /
                    offline single-file; selected row tinted
                    clay-soft; model note under the table; the full
                    derivation in an oat fold beneath.
       figure       pele xychart-beta — cumulative effort hours vs
                    documents produced, three lines — fenced gray-100
                    plate, header legend strip = the decoding key
                    (swatches + per-doc rates + the off-scale note),
                    mono FIG · NN caption, FULLSCREEN pill.
       benefits     tiles for the returns the model cannot count —
                    labeled unquantified, on purpose.
       sensitivity  small ruled table: scenario / docs·yr / option C
                    vs A / option C vs B / holds?
       risks        brief rows: rust-soft risk cell vs olive-soft
                    mitigation cell, one row per risk.
       verdict      ink panel: VALIDATED chip + the recommendation +
                    a fold naming what would reopen the case.

     IRON RULES  Every number is an ESTIMATE from the stated model —
                 10 documents/year, effort at €60/h, the agency line
                 a market estimate, not a received quote — and says
                 so at point of use. No invented precision beyond the
                 model; derived cells show their arithmetic. The
                 investment is treated as sunk throughout. Assumptions
                 live in the fold and are summarized in the strip.
                 Chart series colors are Clay: clay #FE6C2D, olive
                 #788C5D, rust #B04A3F — set via --pele-series-1..3 on
                 the plate CSS, never pele's default blues. Zero
                 scripts beyond the whitelisted fullscreen listener.
     VOICE       Financial register. Numbers lead, prose supports;
                 short declarative sentences; estimates labeled.
     STATUS      Retrospective — validates the founding-day build
                 decision; the recommendation feeds the v1.0.0 gate.
================================================================ -->
```


## 26 · `rolling-forecast` — Rolling Forecast (contract v0.1)


**Use when:** Rolling forecast: window band with the re-roll rule, forecast-vs-actuals ledger with variance chips, cumulative actuals+forecast xychart to the 35-template horizon, assumptions in the open


```text
     TASK        Project ONE living number forward: what the remaining
                 work is expected to cost, what has actually been spent,
                 the variance between the two, the forward window the
                 forecast covers, and — the part that makes it rolling —
                 the stated rule by which the numbers re-baseline each
                 period. Financial-planning grammar: the forecast is a
                 living number with a refresh discipline, never a
                 promise. Estimates labeled; actuals counted where they
                 exist.
     FORMAT      Rolling-forecast reading document: masthead + model
                 strip (the honesty signature), window band (ink:
                 coverage + re-baseline rule before any number), the
                 forecast-vs-actuals ledger with variance chips, the
                 forward chart in full plate grammar (actuals solid to
                 the junction, forecast dashed beyond it), the re-roll
                 rule as a three-step strip with a never-rewrites fold,
                 an assumptions band with the effort model in the open,
                 colophon. Scannable in 60 seconds, auditable in 3.
     HIERARCHY   doc > section > ledger row / re-roll step / band line >
                 (fold: what a re-roll never rewrites, why the rate is
                 a range)
     SECTION     masthead (h1 + model strip + meta + index) → 1 the
                 window (ink) → 2 forecast vs actuals → 3 fig · 01 the
                 forward line → 4 the re-roll rule → 5 assumptions →
                 colophon
     ORDER       The window comes first and states coverage + the
                 re-baseline rule BEFORE any number — a reader must know
                 when the numbers expire before reading them. Actuals
                 are cited (CHANGELOG), never estimated. The assumptions
                 band keeps the MODEL·NOT-MEASUREMENT label welded to
                 the model. The colophon is the last word.

     BLOCK GRAMMAR
       model strip   clay-soft strip under the lede — MODEL·NOT-
                     MEASUREMENT pill + the honesty sentence: forward
                     numbers are estimates, the past is counted.
       window band   ink region in section 1: baseline, coverage, and
                     the one-line re-roll rule — the window is stated
                     before the numbers it bounds. Window-figures chip
                     row carries the counts (+ the ≈ total, labeled).
       ledger        ruled table: cluster / forecast at this baseline /
                     actual / variance chip. Chips: ON PLAN (olive),
                     OVER (rust — exists in the grammar, stamped only by
                     a re-roll), OPEN (clay — in window, no actual yet),
                     — (muted — no separate forecast existed). Chip-key
                     strip above the table.
       figure        pele xychart-beta — cumulative templates (y) over
                     suite versions + forecast gates (x): actual line
                     solid to the baseline junction, forecast line
                     dashed beyond it, fenced gray-100 plate, header
                     legend strip = the decoding key, mono FIG · NN
                     caption, FULLSCREEN pill. The dash rides the plate
                     CSS (pele xychart has no dash syntax); the forecast
                     series is stated FIRST so the actual paints over
                     its re-traced pre-junction leg (spec.json).
       re-roll       three step cards — RE-ESTIMATE from the cluster's
                     actuals → RE-STAMP the chips → SLIDE the window —
                     plus a fold: what a re-roll never rewrites (the
                     counted past, the 35-type scope, the Clay bar).
       assumptions   oat band, ruled lines in the open: the per-gated-
                     template rate, the release step, the window
                     arithmetic (shown), what sits outside the model —
                     each line load-bearing, all labeled. Fold beneath:
                     why the rate is a range and which end is likelier.

     IRON RULES  Every forward number is an ESTIMATE from the stated
                 effort model (≈1–1.5 h per gated template including
                 figure, self-review and gate round-trip; ≈2 h release
                 audit) and says so at point of use; actuals are counted
                 from the CHANGELOG and never re-estimated. The window
                 re-baselines at each cluster completion — the re-roll
                 rule is content, not chrome. No invented precision
                 beyond the model; derived cells show their arithmetic.
                 Chart series colors are Clay: clay #FE6C2D (forecast),
                 olive #788C5D (actual) — set via --pele-series-1..2 on
                 the plate CSS, never pele's default blues. Zero scripts
                 beyond the whitelisted fullscreen listener.
     VOICE       Financial-planning register, calm. Numbers lead, the
                 refresh discipline is stated like a policy; short
                 declarative sentences; estimates labeled; the forecast
                 is a living number and says so.
     STATUS      Forward-looking — the window runs from suite v2.2.0
                 (25/35 landed, counted) to the v1.0.0 release gate.
================================================================ -->
```


## 27 · `cashflow-statement` — Cashflow Statement (contract v0.1)


**Use when:** Cashflow statement: the v1.0.0 build economy in effort hours — inflows/outflows by activity, per-period columns, net rows, double-ruled closing balance, accounting policy notes, balance xychart


```text
     TASK        State a program's build economy as a cashflow
                 statement: inflows (budget released) and outflows
                 (operating draw) grouped by activity, one column per
                 period, net taken per period, opening carried into
                 closing — the statement ending under a DOUBLE rule.
                 Denominated here in EFFORT HOURS, not currency, with
                 the accounting policy said out loud in notes: hours
                 are a model unit, estimates are labeled, and the
                 statement re-denominates if a currency budget ever
                 exists.
     FORMAT      Statement-reading document: masthead + model strip
                 (the honesty signature), periods band (ink: the three
                 periods + the denomination, before any number), the
                 statement table itself (accounting grammar: gray-100
                 group bands, right-aligned mono numerals, hairline
                 rows, single rule above totals, DOUBLE rule under the
                 closing balance), FIG · 01 (the closing balance line),
                 the accounting-policy notes (small), colophon.
                 Scannable in 60 seconds, auditable in 3.
     HIERARCHY   doc > section > statement row / policy note / band
                 line > (fold: where P0's hardening sits, what a
                 currency budget would change)
     SECTION     masthead (h1 + model strip + meta + index) → 1 the
                 periods (ink) → 2 the statement → 3 fig · 01 the
                 closing line → 4 accounting policy → colophon
     ORDER       The periods and the denomination come BEFORE the
                 statement — a reader must know what the numbers are
                 denominated in before reading them. Actuals are
                 counted where they exist (P0), estimates are labeled
                 ≈ at point of use (P2), folded activity is marked —
                 not zeroed silently. The colophon is the last word.

     BLOCK GRAMMAR
       model strip   clay-soft strip under the lede — MODEL·NOT-
                     MEASUREMENT pill + the honesty sentence: the
                     forecast column is the effort model restated as
                     flows; the founding day is counted history.
       periods band  ink region in section 1: P0 / P1 / P2 defined and
                     the denomination declared before any figure.
                     Period-figures chip row carries the releases and
                     the closing band.
       statement     THE table: line item | P0 Founding day | P1
                     Clusters (to date) | P2 Remaining (forecast).
                     Group headers are full-width gray-100 bands
                     (INFLOWS · BUDGET RELEASED / OUTFLOWS · OPERATING).
                     Every amount cell is a RIGHT-ALIGNED ui-monospace
                     numeral, tabular. Rows sit on hairlines. TOTAL
                     OUTFLOWS and NET carry a single rule ABOVE (the
                     sub-total rule); CLOSING BALANCE is tinted
                     clay-soft, keeps the 12px left padding (the
                     v2.4.0 tint convention) and ends the statement
                     under border-bottom: 3px double. Numerals:
                     clay-ink when positive-net, rust when negative
                     (both AA on the tints they touch), slate at zero.
                     A legend strip above the table decodes: bare
                     numeral = counted · ≈ = model estimate · — =
                     folded, no separate draw.
       figure        pele xychart — closing balance over periods
                     (P0 → P1 → P2 → 1.0.0), single clay series via
                     --pele-series-1, NO clayify (native data-chart
                     convention), fenced gray-100 plate, header legend
                     strip = the decoding key, mono FIG · NN caption,
                     FULLSCREEN pill. The P2 point is the band top
                     (after the last gated build); the 1.0.0 point is
                     the band bottom (after the release step) — the
                     segment between them IS the statement's
                     double-ruled closing band.
       notes         the accounting policy, small: denomination
                     (hours, not currency), estimates vs actuals, the
                     closing band, the re-roll clause (the rolling
                     forecast's re-roll re-baselines P2), what sits
                     outside the model. Fold beneath: what a currency
                     budget would change — the re-denomination clause.
       statement fold "Where P0's hardening sits" — the ≈2 h of fixes
                     (label rendering, alpha, sizing) that landed
                     inside the build hours and never drew a line.

     IRON RULES  The statement balances by construction: closing =
                 opening + net, per period, and the P2 band's ends
                 show their arithmetic (8.0 + 2.4 + 2.0 + 0.6 = 13.0
                 low; + 2.6 = 15.0 high, the ≈2 h release step riding
                 the top). P0 spent ≈13 h of the ≈13 h release →
                 closing 0.0; P2 releases ≈15 h against ≈13–15 h of
                 forecast draw → closing ≈0.0–2.0. No invented
                 precision beyond the model: bands stay bands. Tinted
                 rows keep the 12px left padding. Numerals flip with
                 the dark-mode token flip. Zero scripts beyond the
                 whitelisted fullscreen listener.
     VOICE       Accounting register, austere and calm. Numbers lead
                 right-aligned; the policy notes read like policy;
                 short declarative sentences; the double rule is the
                 statement's full stop.
     STATUS      Snapshot at suite v2.4.0 · 26 of 35 landed (counted).
                 P2 re-baselines with the rolling forecast's re-roll —
                 this statement is superseded at each cluster gate,
                 never defended.
================================================================ -->
```


## 28 · `2d-quadrant-overview` — 2D Quadrant Overview (contract v0.1)


**Use when:** 2D quadrant overview: the last eight types plotted by build effort vs reader impact — native pele quadrantChart, four corner-meaning sections with resident tables and build-order consequences, landed anchors proving the axes


```text
     TASK        Position items on two axes across four quadrants — the
                 reading is in the quadrants: each corner means
                 something. This instance plots the suite's own
                 formats & remaining cluster: the 8 remaining template
                 types of the 35-type launch taxonomy by BUILD EFFORT
                 (x: light→heavy; structural novelty × figure
                 complexity) against READER IMPACT (y: niche→core; how
                 central the type is to the suite's promise of
                 shareable, polished, single-file documents), with 3
                 landed anchor types proving the axes on known cases.
     FORMAT      Quadrant reading document: masthead + method strip
                 (the honesty signature), the axis band (ink: both
                 axes + the corner rule before any position), fig · 01
                 the plot in full plate grammar (native pele
                 quadrantChart — open clay rings = to build, filled
                 olive = landed, tinted corner = build first), FOUR
                 quadrant sections — one per corner, each: what the
                 quadrant means, which plotted types fall there with a
                 one-line argument each, and the consequence for build
                 order — colophon. Scannable in 60 seconds, arguable
                 in 3.
     HIERARCHY   doc > section > quadrant resident row / band line >
                 (fold: what the axes deliberately do not measure, why
                 the mediums read right of center)
     SECTION     masthead (h1 + method strip + meta + index) → 1 the
                 method (ink) → 2 fig · 01 the plot → 3 build first →
                 4 plan carefully → 5 quick wins → 6 defer → colophon
     ORDER       The method comes first and states both axes and the
                 corner rule BEFORE any position — a reader must know
                 how to read the corners before reading the residents.
                 Positions are argued, never measured: every plotted
                 type carries its one-line justification in its own
                 quadrant section. The colophon is the last word.

     BLOCK GRAMMAR
       method strip  clay-soft strip under the lede — JUDGMENT·NOT-
                     MEASUREMENT pill + the honesty sentence: positions
                     are the founding session's argued judgment; each
                     one justified in its quadrant section.
       axis band     ink region in section 1: the x axis, the y axis,
                     the corner rule (each corner means something),
                     and the plotted-population chip row (11 points =
                     8 remaining + 3 anchors; 27/35 counted; ≤ 11 is
                     the point-label legibility ceiling).
       figure        native pele quadrantChart (pele 1.12.0), NO
                     clayify — quadrants theme via pele vars + plate
                     CSS: open rings fill transparent, stroke clay
                     2.5px (the living work); the 4 landed points fill
                     olive (the counted past: 3 anchors + this
                     template, landing at this gate); the build-first
                     quadrant rect fills clay-soft via
                     .pele-quadrant[data-id="2"]. pele quadrantChart
                     has no point-class binding, so the landed/open
                     distinction pins to the circles' data-id attrs in
                     plate CSS (14-data-report convention). Header
                     legend strip = the decoding key, mono FIG · NN
                     caption, FULLSCREEN pill.
       quadrant
       section       one per corner: meaning lede → ruled table
                     (resident / plotted position / the one-line
                     argument; landed residents carry an olive LANDED
                     chip) → consequence-for-build-order strip (mono,
                     dotted clay rule). Section-head chip stamps the
                     corner verdict: BUILD FIRST (clay-soft), PLAN
                     CAREFULLY (clay outline), QUICK WINS (olive),
                     DEFER (muted).
       folds         JS-free <details> in §1 (what the axes
                     deliberately do not measure) and §4 (why the
                     medium types read right of center).

     IRON RULES  Positions are ARGUED, not measured — the method note
                 says so at point of use and every type carries its
                 one-line justification in its quadrant section. 11
                 plotted points is the legibility ceiling. Point
                 colors ride the Clay family through plate CSS (never
                 pele's default blues): clay #FE6C2D open rings for the
                 living work, olive #788C5D fills for the counted past
                 — the same clay-alive / olive-counted signature as the
                 rolling forecast's chart. Raw clay is decorative-only
                 on light ground; all accent text is --clay-ink (AA).
                 Dark flip covers the chart through the pele vars on
                 .fig svg; the tinted corner rides --clay-soft and
                 flips with it. Zero scripts beyond the whitelisted
                 fullscreen listener.
     VOICE       Prioritization register, argued but calm. Each corner
                 gets its verdict in one breath, then the residents,
                 then the consequence. The chart is an argument, not a
                 measurement, and says so; positions move when the
                 argument moves.
     STATUS      Landing document — the first of the formats &
                 remaining eight to land (28th on disk), plotting its
                 seven siblings still to build. Baseline: suite v2.5.0,
                 27 of 35 landed, counted from index.json +
                 CHANGELOG.md.
================================================================ -->
```

## 29 · `status-report` — Status Report (contract v0.1)

**Use when:** Status report: recurring period report for a team or workstream — RAG health strip, shipped list, in-progress with owners, blockers with explicit asks, next-period look-ahead; scannable in two minutes.

```text
     LLM AUTHORING CONTRACT — STATUS REPORT v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Report ONE period of ONE team's or stream's work — what
                 shipped, what moved, what's blocked, what's next — so a
                 stakeholder reads it in two minutes and knows exactly
                 where things stand.
     FORMAT      Recurring lightweight report: health strip (RAG chip per
                 stream), shipped list, in-progress rows with %, blocked
                 rows with owners and asks, next-period look-ahead. Facts
                 counted from trackers, never estimated.
     HIERARCHY   doc > health strip > section > item row > (fold: context)
     SECTION     masthead (period + team + health) → 1 shipped →
     ORDER       2 in progress → 3 blocked / asks → 4 next up → colophon
                 (never omit the health strip; blockers before next-up)
     ORDER       Health first — the RAG chips are the verdict. Blocked
                 items MUST carry an owner and an explicit ask; a blocker
                 without an ask is a complaint, not a report. Shipped
                 items cite the artifact (link, ID, count).
     BLOCK GRAMMAR
       health       chip row under the kicker — one RAG chip per stream
       strip        (ON TRACK olive / AT RISK amber-clay / OFF TRACK
                    rust) + period label in mono.
       shipped      ruled list, one line each: what + artifact link or ID.
       in-progress  rows: name + % in mono + owner chip.
       blocked      rust-tinted rows: what happened, owner, the ask as a
                    clay chip (directed at a named person/team).
       next         3-5 look-ahead bullets, one line each.
     IRON RULES  Numbers counted from trackers/reality — never estimated.
                 One RAG per stream, no split states. Every ask directed
                 at a named owner. Zero scripts beyond the whitelist.
     VOICE       Plain, factual, unhedged. "Shipped X", not "worked on X".
     STATUS      Period chip in the kicker + one RAG chip per stream.
```

## 30 · `post-mortem` — Post-mortem (contract v0.1)

**Use when:** Post-mortem: blameless reconstruction of ONE incident or completed project — timestamped timeline, root-cause chain, quantified impact, owned action items; sober, forward-facing.

```text
     LLM AUTHORING CONTRACT — POST-MORTEM v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Reconstruct ONE incident or completed project — what
                 happened, why, what it cost, and what changes so it
                 cannot repeat — blamelessly but without softening the
                 cause.
     FORMAT      Timeline-first investigation: summary band (severity +
                 outcome + duration/cost), timestamped timeline, root-
                 cause chain, quantified impact, action items with owners
                 and dates, a short honest what-went-well.
     HIERARCHY   doc > summary band > timeline event > cause step >
                 action row
     SECTION     masthead → 1 the one-line summary (ink) → 2 timeline →
     ORDER       3 root cause → 4 impact → 5 action items → 6 what went
                 well → colophon (verdict band precedes the story)
     ORDER       The summary band states outcome + severity BEFORE the
                 narrative. The root-cause chain asks "why?" until the
                 answer is a process or system, not a person. Every
                 action item names an owner, a date, and the recurrence
                 it prevents.
     BLOCK GRAMMAR
       summary      ink panel: severity chip (SEV-1..4 or project
       band         equivalent), one-sentence outcome, duration/cost
                    as a mono pair.
       timeline     vertical hairline, mono timestamp stamps, clay
                    ring stations; cause-critical events marked.
       root cause   numbered why-chain, each link answered, the
                    terminal systemic cause on an oat plate.
       impact       mono stat tiles: duration, units lost, cost,
                    customers affected — labeled MODEL where estimated.
       actions      ruled table: action / owner / due / prevents.
       went well    short olive-tinted list — kept honest and brief.
     IRON RULES  Blameless: causes name processes and systems, never
                 people. Timeline timestamps verifiable from logs or
                 records. Impact quantified where records allow, labeled
                 MODEL where estimated. An action without an owner is
                 not an action.
     VOICE       Sober, precise, forward-facing. No dramatization, no
                 euphemism.
     STATUS      Severity chip in the summary band.
```

## 31 · `comparison-matrix` — Comparison Matrix (contract v0.1)

**Use when:** Comparison matrix: side-by-side evaluation of 2+ options across one fixed, weighted criteria set — full trade-off surface with a sensitivity note; documents the evaluation, does not force a single winner.

```text
     LLM AUTHORING CONTRACT — COMPARISON MATRIX v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Evaluate TWO or more options side by side across a
                 fixed criteria set — same criteria, same order, every
                 option — so a reader sees the full trade-off surface
                 and can disagree with any conclusion from the same
                 evidence. Distinct from the brief: documents the
                 evaluation; does not force a single winner.
     FORMAT      Criteria-driven evaluation: subject band (what is
                 compared + why now), the criteria set with weights, the
                 scored matrix with weighted totals, per-option readings,
                 and an explicit sensitivity note under alternative
                 weightings.
     HIERARCHY   doc > criteria set > matrix row > option reading
     SECTION     masthead → 1 subjects + why compared → 2 criteria & →
     ORDER       weights → 3 the matrix → 4 per-option readings →
                 5 sensitivity → colophon (matrix may never be omitted)
     ORDER       Criteria are fixed BEFORE any scoring — same criteria,
                 same order for every option; no custom criteria per
                 option. Scores are 1-5 with the weighting rule stated.
                 The sensitivity section lets the reader re-weight
                 honestly.
     BLOCK GRAMMAR
       subject      clay-soft strip: the options as chips + the
       band         comparison question in one line.
       criteria     ruled table: criterion / what it means / weight
                    ×1-×3.
       matrix       full table: criteria rows, option columns, mono
                    scores, weighted total row; the leading column per
                    criterion may be marked — the leading COLUMN overall
                    tinted clay-soft (column leader, not a pick).
       readings     per-option card: strongest criterion, weakest, one-
                    line verdict.
       sensitivity  fold: the top two options re-ranked under three
                    alternative weightings.
     IRON RULES  Same criteria, same order, for every option. Scores
                 sourced where possible; subjective scores labeled
                 SUBJ. Column leaders are arithmetic, not advocacy —
                 the document picks no winner unless asked.
     VOICE       Even-handed. Every option gets its best case made.
     STATUS      Weighting chip: MEASURED or MODEL·NOT-MEASUREMENT
                 where subjective.
```

## 32 · `roadmap` — Roadmap (contract v0.1)

**Use when:** Roadmap: one product/program direction over NOW/NEXT/LATER horizons — themed lanes with outcome statements, committed-vs-proposed confidence, and the explicit not-on-the-roadmap list.

```text
     LLM AUTHORING CONTRACT — ROADMAP v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Lay out ONE product's or program's direction over
                 horizons — what's now, what's next, what's later — as
                 themes with outcomes, deliberately loose on dates.
     FORMAT      Horizon bands: NOW / NEXT / LATER, each holding 2-4
                 themed lanes with outcome statements and confidence
                 markers; a direction statement on ink first; the
                 explicit not-on-the-roadmap list last. Dates only where
                 they are commitments.
     HIERARCHY   doc > direction > horizon > theme > item > (fold:
                 rationale)
     SECTION     masthead → 1 direction statement (ink) → 2 NOW →
     ORDER       3 NEXT → 4 LATER → 5 not on the roadmap → colophon
                 (the not-list is mandatory, not optional)
     ORDER       The direction statement precedes every item — each
                 theme MUST trace to it. Horizons are time-relative
                 (now = in flight, next = queued next, later = believed),
                 never quarter-dated unless the date is a commitment.
                 The not-list is maintained: silent drops are how scope
                 creep enters.
     BLOCK GRAMMAR
       direction    ink panel: serif statement with one italic clay
                    word — where this is heading and why.
       horizon      band labeled in mono (NOW / NEXT / LATER) with its
       band         definition line.
       theme        theme name (serif h3) + outcome line (the change in
       lane         the world) + items as chips with confidence dots:
                    filled = committed, open = proposed.
       not-list     ruled list: item + when/where it was declined.
     IRON RULES  Every theme states an OUTCOME, not a feature list.
                 Confidence is always shown. No silent drops — items
                 leave the roadmap onto the not-list, never into
                 nothing.
     VOICE       Directional, confident, honest about uncertainty.
     STATUS      One chip per theme: COMMITTED / PROPOSED / EXPLORING.
```

## 33 · `okr-sheet` — OKR Sheet (contract v0.1)

**Use when:** OKR sheet: ONE period's objectives & key results — SET at period start (confidence per KR) or GRADED at end (scores from metrics); grading scale stated before any KR.

```text
     LLM AUTHORING CONTRACT — OKR SHEET v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Set or grade ONE period's OKRs — 3-5 objectives, each
                 with 3-5 measurable key results — so ambition,
                 measurement and grading are unambiguous before the
                 period starts and honest after it ends.
     FORMAT      Two-state document (mode chip SET or GRADED): grading
                 scale on an oat plate first, then objective panels with
                 key-result rows (metric, baseline → target, owner,
                 confidence at set-time / score at grade-time), and —
                 when graded — a retrospective fold per objective.
     HIERARCHY   doc > mode > objective > key-result row
     SECTION     masthead (period + team + mode chip) → 1 grading scale →
     ORDER       2 objectives & key results → 3 (GRADED only) scores & →
                 retrospective → colophon (scale before any KR)
     ORDER       The grading scale is stated BEFORE any key result:
                 0.0-1.0, 0.7 = success, 1.0 = never guaranteed. Key
                 results are outcomes with baselines, not tasks — a KR
                 that names a task is rewritten as an outcome. Grades
                 come from the metric record, never from effort or
                 memory.
     BLOCK GRAMMAR
       mode chip    pill in the kicker: SET (planning) / GRADED
                    (retrospective).
       scale        oat plate: the 0.0 / 0.7 / 1.0 anchors in mono.
       objective    white panel: objective as serif h3 + one-line why;
       panel        KR rows: metric in mono, baseline → target with a
                    clay arrow, owner chip; confidence % (SET) or score
                    (GRADED — big mono numeral, ≥0.7 olive, <0.7 rust).
       retrospective fold per objective: what the score teaches and
                    what carries into the next period's sheet.
     IRON RULES  3-5 objectives, 3-5 KRs each — more is a task list.
                 Every KR has a baseline and a target; no baseline, no
                 KR. Scores from the metric record. No hedged targets —
                 "improve", "help with" are not key results.
     VOICE       Ambitious but measurable.
     STATUS      Mode chip + per-KR confidence (SET) or score (GRADED).
```

## 34 · `case-study` — Case Study (contract v0.1)

**Use when:** Case study: ONE customer/project story end to end — before state with numbers, what was actually done, before→after proof metrics, ink pull quote, honest limits.

```text
     LLM AUTHORING CONTRACT — CASE STUDY v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Tell ONE customer's or project's story end to end —
                 where they started, what was done, what measurably
                 changed — so the reader can judge the approach by its
                 results, not its adjectives.
     FORMAT      Narrative with proof: context band, the challenge (the
                 before state with numbers), the approach (what was
                 actually done, turns included), results as before→after
                 metric pairs, a pull quote from the subject, and the
                 honest limits.
     HIERARCHY   doc > act (challenge/approach/results) > proof metric
     SECTION     masthead → 1 the starting point → 2 the challenge →
     ORDER       3 the approach → 4 results (before→after) → 5 in their
                 words (ink) → 6 limits → colophon (results are the
                 point — the approach never outruns them)
     ORDER       Every approach claim MUST be paid for in the results
                 section. Before-numbers are cited from records, not
                 recalled. Limits exist in every real story; a case
                 study without one is an advertisement.
     BLOCK GRAMMAR
       context      clay-soft strip: who / where / when in one line.
       band
       challenge    short narrative of the before state + before-metric
                    chips in mono.
       approach     3-5 numbered moves, each one sentence + what it
                    targeted.
       results      metric pair rows: before (mono, slate) → after
                    (mono, clay-ink) with the delta chip (olive) and a
                    MEASURED / REPORTED / MODEL proof chip.
       pull quote   ink panel, serif, one sentence, attributed.
       limits       honest ruled list — scope, context, caveats.
     IRON RULES  Every result metric carries a before value and a
                 source. The approach describes what WAS done, not what
                 was planned. One subject per document.
     VOICE       Narrative but numeric. Show the before; earn the after.
     STATUS      Proof chip per metric: MEASURED / REPORTED / MODEL.
```

## 35 · `one-pager` — One-pager (contract v0.1)

**Use when:** One-pager: everything essential about ONE initiative/product/team on a single sheet — pitch band on ink, how-it-works strip, three facts that matter, status row, one specific ask; 60-second scan.

```text
     LLM AUTHORING CONTRACT — ONE-PAGER v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Give a reader EVERYTHING essential about ONE
                 initiative, product or team — what it is, why it
                 exists, how it works, where it stands, what it needs —
                 on a single sheet, scannable in 60 seconds. Distinct
                 from the brief: orients and updates; does not force a
                 decision.
     FORMAT      Summary sheet: pitch band on ink (what + why in one
                 breath), how-it-works step strip, the three facts that
                 matter as a fact grid, status chip row, and one
                 explicit ask.
     HIERARCHY   doc > band > fact row
     SECTION     masthead → 1 what & why (pitch band, ink) → 2 how it →
     ORDER       works → 3 the facts that matter → 4 where it stands →
                 5 the ask → colophon (never exceed one sheet)
     ORDER       The pitch band is the document compressed to two
                 sentences — if it is wrong, everything under it is
                 wrong. The ask is specific: one action, one owner, one
                 date. The facts are the three a reader must retain.
     BLOCK GRAMMAR
       pitch        ink panel: what-it-is in serif + the why-now line
       band         carrying the italic clay word.
       how strip    3-4 step chips on a hairline.
       fact grid    three columns: mono label + big value + one-line
                    source.
       status row   chip row: stage, health, next milestone.
       ask          clay-soft band: the ask as serif h3 + owner/date
                    mono row.
     IRON RULES  One sheet — overflow moves to an appendix document,
                 never to smaller type. Every fact carries its source.
                 The ask names a person and a date.
     VOICE       Pitched but factual. Every sentence survives the "so
                 what?" test.
     STATUS      Stage + health chips in the status row.
```

## 36 · `faq` — FAQ (contract v0.1)

**Use when:** FAQ: the questions a readership actually asks about ONE subject — jump-linked question index, themed groups, self-sufficient answers that lead with the answer, freshness chips.

```text
     LLM AUTHORING CONTRACT — FAQ v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Answer the questions a readership actually asks about
                 ONE subject — grouped, ranked by frequency, each
                 answer self-sufficient — so the reader's question is
                 resolved in one place.
     FORMAT      Grouped Q&A bank: a question index (every question as a
                 jump-linked mono pill), themed groups (getting started
                 / how-do-I / decisions / trouble), each question a fold
                 whose answer leads with the answer, and an explicit
                 still-stuck route.
     HIERARCHY   doc > theme > Q&A pair
     SECTION     masthead → question index → grouped Q&A (by theme) →
     ORDER       still stuck → colophon (index covers every question)
     ORDER       Questions come from evidence — support tickets, real
                 asks — ranked most-asked first within their group.
                 Answers are self-sufficient (no "see above") and state
                 the answer in the first sentence, reasons after.
     BLOCK GRAMMAR
       question     mono pill strip, jump-linked, one pill per
       index        question.
       Q&A pair     fold: the question as the summary (mono, clay-ink);
                    the answer opens on white — first sentence bold =
                    the answer, then detail, then related-question
                    chips.
       theme        sec-kick + question count.
       divider
       still stuck  oat plate: who to ask, what to include.
     IRON RULES  Answers lead with the answer. Questions are sourced or
                 observed — no invented strawmen. Near-duplicates merge
                 with cross-link chips.
     VOICE       Direct, warm, second person. No hedging in the first
                 sentence.
     STATUS      Freshness chip per theme: last reviewed date.
```

## 37 · `tutorial` — Tutorial (contract v0.1)

**Use when:** Tutorial: teach ONE task to completion — end state shown first, testable prerequisites, numbered steps each with an observable expected result, verification, troubleshooting.

```text
     LLM AUTHORING CONTRACT — TUTORIAL v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Teach ONE task to completion — a reader who has never
                 done it finishes with the thing actually done, having
                 understood each step rather than copied it.
     FORMAT      Hands-on path: what-you'll-build band (the end state,
                 shown first), testable prerequisites, numbered steps
                 (action → expected result per step), a verification
                 assertion, troubleshooting for known failure modes,
                 and onward links.
     HIERARCHY   doc > step > expected result
     SECTION     masthead → 1 what you'll build → 2 prerequisites →
     ORDER       3 the steps → 4 verify → 5 troubleshooting → 6 next →
                 colophon (every step executed as written before ship)
     ORDER       Every step is ONE action with an observable outcome —
                 a step without an expected result is two steps or
                 zero. Prerequisites are testable ("run this check"),
                 not vibes ("be familiar with"). The end state is shown
                 before step 1 so the target stays visible.
     BLOCK GRAMMAR
       build band   clay-soft strip: the finished result described + a
                    small figure or end-state artifact.
       prereq       checklist rows, each with a check command or test.
       steps        numbered clay circles on a hairline: verb-first
                    title, the action (mono when it is a command),
                    expected result on an oat line.
       verify       the acceptance check as one runnable assertion.
       trouble      symptom → cause → fix; minimum three known failure
                    modes.
       next         2-3 onward links.
     IRON RULES  The tutorial shipped only after its own steps were
                 executed as written. Commands in mono, exactly
                 copy-pasteable. Expected results observable (output,
                 file, state).
     VOICE       Second person, imperative, encouraging. No detours
                 mid-step.
     STATUS      Tested-on chip: environment + date.
```

## 38 · `blogpost` — Blogpost (contract v0.1)

**Use when:** Blogpost: ONE editorial article — cold-open hook, quotable thesis, sections that advance one move each, steel-manned counterpoint, TL;DR box for scanners, one next action.

```text
     LLM AUTHORING CONTRACT — BLOGPOST v0.1 — STYLE: Clay Explainer
     te9-docs suite — compose-edition contract. The LLM assembles; it
     does not redesign the grammar.

     TASK        Publish ONE editorial article — an idea argued from a
                 hook to a takeaway — so a reader who arrives cold
                 leaves with the point, the reasoning, and the next
                 step.
     FORMAT      Editorial flow: TL;DR box up top for scanners, cold-
                 open hook (no heading), the thesis stated plainly,
                 body sections advancing one move each with an ink pull
                 quote as the mid-article break, a steel-manned
                 counterpoint, and a close with one next action. Facts
                 cited inline; opinions owned.
     HIERARCHY   doc > section > move
     SECTION     masthead → TL;DR box → hook (lede starts cold) →
     ORDER       thesis → body sections → pull quote (ink) →
                 counterpoint → close → colophon (thesis before
                 arguments; counterpoint never dropped)
     ORDER       The thesis appears before the arguments and is
                 quotable in one sentence. Each section advances
                 exactly one move — two moves make two sections. The
                 strongest objection is included and answered fairly;
                 a post without its counterpoint is a press release.
     BLOCK GRAMMAR
       TL;DR        oat plate, three bullets: the point, the proof,
                    the ask.
       hook         2-3 sentence lede, giant serif opening line.
       section      sec-kick + serif h2 + 2-4 paragraphs — one move
                    only.
       pull quote   ink panel, serif, one sentence, mid-article.
       counterpoint rust-soft band: the objection stated at its
                    strongest, then the answer.
       close        the takeaway + one next action (link or step).
     IRON RULES  Facts cite sources inline. Claims of number carry the
                 number. The counterpoint is steel-manned, not
                 strawmanned.
     VOICE       Owned opinions, first person, short sentences at the
                 tension points.
     STATUS      Reading-time chip in the kicker (mono).
```

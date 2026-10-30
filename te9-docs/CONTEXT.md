# te9-docs

The document-suite skill: produces polished, shareable, single-file HTML documents for
human readers. This context covers the skill's design, its template taxonomy, and the
patterns it adopts as te9 conventions.

## Language

### The skill and its world

**te9-docs**:
The clean-room document-suite skill being designed here. Source of truth is the
plain-dir skill in skills.te9.dev; packaged for pi as a thin plugin wrapper.
_Avoid_: document suite (that is the artifact set, not the skill), html-docs (the
vendored reference — never conflate the two)

**html-docs**:
The vendored reference skill this effort learns from. Stays untouched in the repo;
consulted as a pattern catalog, never edited.
_Avoid_: the base skill, upstream

**Signature pattern**:
A design or packaging pattern deliberately adopted into te9-docs (from html-docs
analysis or invented fresh) and owned as a te9 convention.
_Avoid_: best practice (unowned), borrowed pattern

**Clean-room sibling**:
te9-docs' relationship to html-docs: independently built, patterns ported deliberately
one by one with an explicit adopt/adapt/reject verdict, nothing inherited wholesale.
_Avoid_: fork, port, evolution

**Storage menu**:
The post-playback storage decision offered after a produced Document is reviewed in
the browser. Exactly three standard options — (a) save to the project docs folder
(`<project>/docs/`, `<YYYY-MM-DD>-<slug>.html`), (b) save to the central suite
folder, (c) preview only, no disk write — plus option 4: **specify location**, which
always wins when used.
_Avoid_: default save, autosave

### The output

**Document**:
A single self-contained HTML file produced by te9-docs for human readers outside the
building session — the deliverable, never a scratch file.
_Avoid_: page, report (that is one document type, not the concept)

### The suite

**Launch taxonomy**:
The template set the suite ships with at v1.0: the three founding documents plus the
33 user-specified additional document types, each a Template in Clay. Grows only
via the extension protocol — never by one-off bespoke documents.
_Avoid_: template list (the index), catalog

**Review gate**:
The build-step approval rule: after each template is built, it is shown in the
browser (or file path named) and the user approves or gives feedback; nothing is
built forward until the gate passes. Feedback applies to the current template AND
the conventions for all later waves.
_Avoid_: batch review, QA pass

**Founding documents**:
`brief.html`, `dossier.html`, `deck.html` from `E:\te9-docs\docs\examples` — the
three seed templates of the suite, already settled in Clay.
_Avoid_: examples (they are the originals; the templates are their suite editions)

**Build clusters**:
The similarity-grouped construction order of the 36 templates: the founding trio
first, then the 33 types built in sibling groups (explainers, reports, formal
contract types, financial, …) so gate feedback on one template immediately
benefits its neighbors.
_Avoid_: waves (the abandoned batch concept), alphabetical order

**Agent Skills conformance**:
The skill validates against the agentskills.io spec: frontmatter `name` matching
the directory, keyword-rich `description`, `compatibility` declaring Node + pele,
SKILL.md body under 500 lines with detail in `references/`, standard
`scripts/`/`references/`/`assets/` directories.
_Avoid_: plugin manifest (the pi wrapper layer, separate)

**Suite version**:
Semantic `MAJOR.MINOR.PATCH` declared in the skill manifest and stamped in the
suite brief. New template type = MINOR; changes to existing templates/conventions =
PATCH (MAJOR if breaking); taxonomy reshapes = MAJOR. Every bump appends a one-line
changelog entry — autonomous extensions write their own.
_Avoid_: build number, date stamp

**Suite brief**:
`SUITE-BRIEF.md` inside the skill — the canonical, maintained list of suite facts
(what te9-docs is, its features, conventions, and version history) that every
template build reads. The single source of truth placeholder content may assert.
_Avoid_: fact sheet, about page

**Extension protocol**:
How the suite grows in normal use: when a session needs a document type not in the
suite, it builds the Template autonomously — Clay conformance, self-describing
placeholder content, script-whitelist compliance — registers it in the index, and
bumps the suite version, all without asking. The user discovers new types in the
index next session.
_Avoid_: proposal gate, staging area

**Self-describing placeholder content**:
The convention that every Template's placeholder content documents te9-docs itself —
the suite is its own first subject. Produces dogfooded, reviewable templates and
makes the template index double as the suite's manual.
_Avoid_: dummy text, lorem ipsum

**Clay discipline**:
The default zero-script behavior of suite documents: progressive disclosure via
`<details>` folds and `:target` jumps, hover states, and no JavaScript — the only
sanctioned exempt is the deck's canonical arrow-key/HUD navigation script.
_Avoid_: JS-free zealotry (exceptions exist by whitelist)

**Script whitelist**:
The published list of template types permitted real JavaScript beyond the deck
script. Each addition is justified at its review gate; anything not whitelisted
stays under Clay discipline.
_Avoid_: allowed JS list, exceptions

**Figure**:
A visual exhibit inside a Document. Strict pipeline: Mermaid source → Pelé
build-time render → inline static SVG tinted with Clay CSS variables, placed in a
fenced gray-100 plate with a mono `FIG · NN` caption. The deliverable node is
the double ring; hand-authored figures only when Pelé cannot express the type
(ADR-0007).
_Avoid_: diagram (reserved for the Mermaid-rendered kind), chart

**Pelé**:
The open-source Mermaid→SVG renderer used for ALL figures, integrated build-time
via a skill-owned Node script; themes via CSS variables mapped to Clay tokens.
_Avoid_: pretty-mermaid (upstream's rejected pipeline), hand-drawing (the
shrunk exception, not the rule)

**Central collection**:
`E:\te9-docs\documents\` — the workspace-wide home of produced Documents saved
under storage option (b); date-slugged filenames, one browsable portfolio.
_Avoid_: output folder, showcase

**Index**:
The suite's single machine-readable template registry (`index.json`): every type,
slug, file, and one-line description. Normative for discovery: every production run
reads the index first and grounds its type decision in it — there is no separate
keyword-heuristics file.
_Avoid_: catalog, CATEGORIES (upstream's heuristics file — rejected)

**Intake**:
The mandatory first step of every production run, before any writing: the session
asks for the document's goal and acceptance criteria, then states its own
recommendation — suggested document type and approach — derived from the context
it already has. The user confirms type before building.
_Avoid_: classification (the internal step that maps the ask to a Template),
kickoff brief

**Document brief**:
The confirmed goal + acceptance criteria from Intake — the contract the finished
Document is reviewed against at playback.
_Avoid_: task description, spec

### The four concerns

**Composition**:
The first of the four concerns (ADR-0008): every arrangement decision that carries
meaning — which blocks exist, their order, hierarchy, and grouping. Defined by the
theme-switch test: whatever survives a theme flip (type scale, section rhythm, plate
anatomy, spacing rhythm) is composition. Its canon is the ten-principle conformance
table (hierarchy, similarity, proximity, continuity, closure, figure–ground, common
region, symmetry & order, Prägnanz, common fate), each principle backed by explicit
do/don't rules with code examples for composition runs (ADR-0009). CRAP survives only
as a teaching mnemonic for the core four.
_Avoid_: layout (ambiguous), design language (reserved for the style-lane concept),
CRAP-4 as canon (teaching mnemonic only)

**Style**:
The second concern: the theme layer — the swappable sensory system a theme switch
owns (color tokens, the accent discipline, and in principle any theme-switchable
value), plus decoration that renders the composition. The suite instantiates it as a
Style lane (Clay Explainer); the dark flip is its built-in theme switch.
_Avoid_: theme (the switch is the boundary test, never a name for this concern), skin

**ToC**:
An artifact Wayfinding may produce — a table of contents, jump nav, or card index —
never the name of the concern itself. The framework's third concern is Wayfinding.
_Avoid_: using as the concern's name

**Wayfinding**:
The third concern (ADR-0008): the navigation and self-indexing apparatus that exposes
a document's structure to its reader — jump navs, card indexes, TOC pills, page
numerals, the mono-scanning skeleton. Derived from the settled structure, touched
last. Scope rule: Composition decides what the rooms are; Wayfinding decides where
the doors and signs are.
_Avoid_: Index (owned by the template registry), structure (owned by Composition),
navigation menu (too narrow)

**Content**:
The fourth concern: the substance of a document — prose, facts, numbers, sources,
voice. Produced from the Document brief and SUITE-BRIEF facts, governed by the
grounding and no-invention iron rules. Figures straddle: a figure's claims and
numbers are Content; its rendering is Composition + Style.
_Avoid_: Data (collides with the data-report type and figure data), copy (marketing
connotation)

**Concern spec**:
The named artifact that owns one concern's canon — the suite's control point for
that concern's behavior. One per concern: COMPOSITION.md, CLAY-STYLE.md,
WAYFINDING.md, and the Document brief + SUITE-BRIEF + iron-rule trio for Content.
Authoring a new or alternate spec for a concern changes the suite's output for that
concern without touching the workflow.
_Avoid_: config (curated prose + code, not settings), module

**Concern contract**:
The binding obligation block per concern: the paste-able MUST-rules an LLM holds
while working that concern and cannot bypass — enforced by the review gate, which
passes a document only when all four contracts hold. The per-template contract
comments (BLOCK GRAMMAR, SECTION ORDER, COLORS, IRON RULES) are the contracts'
per-type compilation.
_Avoid_: guideline (advisory — contracts bind), reference (the Concern spec
informs; the contract binds)

### Types and mechanics (v2 compose edition)

**Template**:
_Retired at 3.0.0._ The v1 unit: a finished, polished HTML document with
realistic placeholder content, copied and content-swapped. The founding trio
survive as `assets/examples/` exemplars; the other 27 live only in git history
(tag `v2.7.0-template-suite`).
_Avoid_: treating as current (superseded by Type, ADR-0011)

**Template instance**:
_Superseded at 3.0.0_ by Compose (ADR-0011).
_Avoid_: using as the production mechanic

**Type**:
The unit of the v2 suite: a catalog entry (`assets/index.json` + a numbered
section in `references/TYPES.md`) naming a document kind with a frozen section
order, a block grammar, and a composition contract.
_Avoid_: template (retired), kind

**Compose**:
The v2 production mechanic: copy `references/BASE-CSS.md` verbatim, add the
type's own blocks per its contract in TYPES.md, write the body in the type's
frozen section order, restate the contract in a head comment. The LLM
assembles; it does not redesign the grammar.
_Avoid_: generate, build from scratch, instance

**House palette**:
The single color token set shared by every template, expressed as CSS custom
properties. One suite, one palette — per-template palettes are an anti-pattern.
_Avoid_: theme (reserved), tokens

**Clay Explainer**:
The te9-docs house design system, extracted from `E:\te9-docs\docs\examples`
(brief / dossier / deck) and specified by `patterns.md` there: warm ivory ground,
1.5px hairlines, mono pill kickers, giant serif headlines with one italic clay word,
AA-retuned accent family, first-class dark flip, full print spec, zero network
requests. The normative source for every template.
_Avoid_: clay (ambiguous — the token vs the whole system)

**Style lane**:
A named, documented style system like Clay Explainer that owns tokens, type,
anatomy, and review rules for a class of documents.
_Avoid_: skin, theme, design language

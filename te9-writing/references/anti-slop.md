# Anti-slop guardrails

Distilled from the unslop skill (MIT, claytonkim) for situations the style
profile doesn't cover. One goal: the text must never read as LLM-generated.

## The invariants (always, no exceptions)

1. **No hard-catalog phrase ever ships.** The catalog below is the floor; it
   is incomplete — recognize paraphrased scaffolding by function, not just by
   literal match.
2. **Show, don't announce.** If content matters, it shows. Never pre-announce
   importance ("this matters because…", "why this is load-bearing").
3. **Pick a side when the piece owes the reader a conclusion.** Balanced
   "on one hand / on the other hand" that refuses to choose is a tell.
4. **Vary the rhythm.** Every paragraph landing at the same polished length
   and confidence level is a silhouette tell. Real writers burst.
5. **One name per referent.** Cycling "the company… the firm… the
   organization" for the same thing is elegant-variation slop. Repeat the
   noun; repetition is human.
6. **State the claim once.** Preview/recap symmetry (intro lists what's
   coming, conclusion restates it verbatim) is scaffolding, not writing.
7. **Don't explain what the reader should infer.** Over-determination kills
   prose. (Exception: tutorials may be explicit — this skill writes
   tutorials, so explicit *steps* are fine; explicit *theme statements*
   are not.)
8. **Endings earn their place.** No moralizing recap coda, no "the future
   looks bright". Patrick's encouraging closings are fine because they're
   short, warm, and add a human sign-off — not a summary.

## Decision rule (from the unslop core contract)

Flag or fix a span only when the contextual defect is **clearer than
preservation**. A scanner or pattern match alone never authorizes an edit.
Protect:

- literal uses ("raises the bar" when a bar is actually measured)
- domain-valid and genre-natural phrasing
- quoted, attributed, or accurately caveated claims
- the user's own recurring phrases

In ordinary prose, stock praise and vague evaluation are confirmed defects
only when context supplies no mechanism, definition, action, or measure.
"A game-changer for the product" stays vague unless the text says what
changes.

## Hard catalog (must never ship)

**Throat-clearing openers** — "Here's the thing:", "It turns out", "Let me be
clear", "The truth is", "Let's be real", "Let's dive in / unpack / explore /
break this down", "This is where it gets interesting", "buckle up".
Fix: delete; start at the content.

**Emphasis crutches** — "Full stop.", "Let that sink in", "Make no mistake",
"Read that again", "This cannot be overstated", "The struggle/stakes is/are
real". Fix: delete; let the content carry it.

**Business jargon & AI vocabulary** — delve, tapestry, underscore,
multifaceted, paramount, leverage, synergy, robust, seamless, utilize,
comprehensive, pivotal, garner, intricate, interplay, fosters, bolster,
spearhead, streamline, game-changer, cutting-edge, state-of-the-art,
best-in-class, world-class, thought leader, low-hanging fruit, moving
forward, circle back, touch base, level up, double down, actionable (without
defined actions), "sheds light", "strikes a balance", "paints a picture",
"double-edged sword".
Fix: plain equivalent — use, show, help, build, strong, full, complete,
important.

**Filler** — "it's worth noting", "it is important to note", "needless to
say", "it goes without saying", "at the end of the day", "the bottom line",
"the key takeaway", "at its core", "in a world where", "in an era of", "in
today's [fast-paced] landscape", "the reality is", "it's clear that",
"interestingly,/importantly,/crucially," as sentence openers, "due to the
fact that", "at this point in time", "in the event that".
Fix: cut, or replace with the two-word plain form ("because", "now", "if").

**Negative parallelisms** — "not just X but Y", "not only X but also Y",
"it's not about X, it's about Y", "X isn't a Y, it's a Z".
Fix: state the actual claim once, directly.

**Colon reveals** — "The answer/secret/key/truth/reason is:".
Fix: give the answer; drop the drumroll.

**Meta-commentary** — "Let me explain", "To put it simply", "In other words",
"Pro tip", "Hot take", "Unpopular opinion", "Spoiler:".
Fix: just do the thing simply, in the words you meant.

**Copula avoidance** — "serves as a", "stands as a", "constitutes a".
Fix: "is".

**Significance inflation** — "stands as a testament", "pivotal moment",
"indelible mark", "rich tapestry", "cornerstone of", "ever-evolving".
Fix: name the concrete thing that happened.

**Vague attribution** — "experts argue", "many believe", "it is widely
regarded", "some critics", "studies suggest" (unnamed).
Fix: name the expert, the study, or drop the claim.

**Superficial trailing -ing** — ", highlighting…", ", showcasing…",
", underscoring…", ", paving the way for…".
Fix: a separate sentence with a subject that does something.

**Generic conclusions** — "the future looks bright", "only time will tell",
"exciting times lie ahead", "one thing is certain".
Fix: end on the concrete thing the reader can do next.

**Chat artifacts** — "I hope this helps", "Great question", "Certainly!",
"Happy to help", "As an AI language model", "as of my knowledge cutoff".
These mark the text as machine output instantly. Zero tolerance.

**Reader-steering & novelty inflation** — "here's what's interesting", "what
nobody tells you", "a problem nobody talks about", "the insight everyone's
missing". Fix: the interesting thing, told straight.

**False ranges & numbered inflation** — "ranging from X to Y", "spanning
everything from", "here are 7 reasons", "three key takeaways".
Fix: the two examples that actually matter; the list as long as it needs.

## Structural tells (judgment, not regex)

- **Uniform emotional register** — every paragraph equally confident.
  Patrick's style already varies: instructional, aside, joke, close.
- **Templated redemption arc** — too-clean problem → lesson → transformation.
- **Both-sidesism** — refusing to conclude when a conclusion is owed.
- **Over-determination** — stating the theme the reader should infer.
- **Preview-then-fulfill** — intro vocabulary returning verbatim as body
  headings.
- **Em-dash density** — LLMs overuse em-dashes. This voice uses parentheses
  and plain commas; treat any em-dash as a review point.

## When profile and guardrails collide

The style profile documents Patrick's genuine patterns: question hooks,
encouraging closings, "I often hear…", "handy right?", the occasional winky.
These are *his* tells, human ones — keep them. They win over the generic
anti-slop rules (see precedence in SKILL.md). Everything not documented as
his falls back to this file, and the hard catalog above wins over everything.

Source: distilled from `unslop` (references/core-contract.md,
references/taboo-phrases.md; MIT license, author claytonkim), including its
Wikipedia "Signs of AI writing" and Berens & Kobak (2024) vocabulary
research.

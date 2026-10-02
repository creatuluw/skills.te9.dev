# Strategies

Four strategies, ported from Cranot/deep-research. All share the same
orchestration loop, output contract, and budget parameters; they differ in
which operations run and in what order.

## 1. recursive_research (default)

General research. Best for "deep dive on X", "why does X", "investigate X".

```
research(question, depth):
    if question is atomic or depth == 0:
        return ANSWER(question)          # leaf sub-agent
    children = DECOMPOSE(question)       # orchestrator, ≤ max_fanout
    results = parallel_map(research, children, depth - 1)
    return SYNTHESIZE(question, results) # orchestrator, bottom-up
```

- Depth-first synthesis: deepest internal nodes synthesize first, their
  outputs feeding parents, until the root synthesis (the final report).
- A decomposition of N children is one parallel batch of N leaf/deeper agents.

## 2. socratic

For vague, loaded, or unclear problems ("How do I become more productive?",
"Is AI overhyped?"). Runs SOCRATIC before any branching:

1. Challenge the question: assumptions, definitions, framing, missing context
   (see references/prompts.md). Half a page max.
2. Produce the improved question (or split into 2–3 if it bundles several).
3. If the answer truly depends on facts only the user has, ask ONE compact
   clarifying question — otherwise proceed with stated assumptions.
4. Run recursive_research on the improved question.
5. Final report includes the challenge section ("The question, examined") so
   the user sees how their question changed and why.

## 3. perspective_expander

For contested or many-sided topics ("What makes good leadership?", "Is remote
work better?"). Replaces blind decomposition with named perspectives:

1. Generate 5–7 perspectives covering distinct angles: at least one academic
   discipline, one practitioner/stakeholder, one skeptic/contrarian, one
   historical or cross-cultural view, one forward-looking view. Name each
   ("The behavioral economist", "The burned-out manager", "The historian").
2. ANSWER the question from each perspective — one leaf sub-agent each,
   parallel, same leaf prompt plus "Answer strictly from this perspective:
   <name> (persona: <one line>)".
3. DETECT blind spots: one sub-agent (or the orchestrator) reads all answers
   and lists what every perspective missed.
4. SYNTHESIZE: the root report presents the strongest case per perspective,
   where perspectives conflict and why, the blind spots found, and the
   orchestrator's own integrated take — clearly labeled as such.

Depth is typically 1 (perspectives are the fan-out). `--perspective-depth 2`
means each perspective may branch once if its slice is genuinely compound.

## 4. grounded_research

For facts, current events, versions, prices, anything checkable —
"fact-check", "what's the current X", "is it true that".

Same tree as recursive_research, but leaves must ground their claims:

1. Leaf drafts its answer from reasoning (same ANSWER prompt).
2. Leaf runs GROUND on each key factual claim: live web search, open sources,
   verdict per claim (verified / reported-only / contradicted / unverifiable),
   URLs recorded.
3. Leaf writes its agent file with claims labeled
   `[verified: URL]` / `[reported-only: URL]` / `[unverified]`.
4. Synthesis propagates the labels — the final report separates **verified**,
   **reported-only**, and **unverified** claims, and ends with a Sources
   section listing every URL actually opened.

Rules:

- Leaves follow [references/search-method.md](search-method.md): resolve
  entities and query variants before searching, diversify across source
  classes (community / official / academic / code / news), deep-fetch the
  promising URLs, apply the relevance floor, and count corroboration.
- Never mark verified from memory. No search available → the whole run
  degrades honestly to reported-only and says so.
- A contradicted claim goes in as a contradiction with both sources.
- Numbers, dates, versions, prices, names of living things = always ground.
- Fast-moving topics: state an "as of <date>" line in the final report.

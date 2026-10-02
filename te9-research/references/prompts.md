# Agent Prompts

Exact prompts for each operation. Adapt wording, keep the structure — the
`Q:` line protocol in DECOMPOSE is the wire format the orchestrator parses.

## DECOMPOSE (run by the orchestrator itself, no sub-agent)

```
Decompose this research question into 2-4 sub-questions that together cover
it without overlapping:

QUESTION: <question>

Rules:
- Each sub-question must be independently answerable
- No overlap: an answer to one should not answer another
- Skip questions that are trivially answerable in one sentence
- Prefer angles a single analyst would miss (second-order effects,
  counterexamples, mechanisms, boundary conditions)

Output ONLY the sub-questions, one per line, each prefixed "Q:".
No numbering, no commentary.
```

Parse every `Q:` line → one child node. If the model emits more than
`max_fanout`, keep the strongest N (prefer diverse, non-overlapping angles)
and note the trim in the log event (`"trimmed": true`).

## ANSWER (leaf sub-agent)

```
You are a leaf researcher answering ONE atomic question. Context: you are one
branch of a larger research tree on: "<root question>".

YOUR QUESTION: <sub-question>

Write a focused answer (max ~1 page) to <agents_dir>/d<depth>-<seq>-researcher.md
in exactly this format:

# Q: <the question>

## Findings
- <finding> — evidence/reasoning, confidence (high|medium|low)

## Tensions
- <contradiction or uncertainty you noticed, or "none">

## Open questions
- <what a deeper branch should investigate, or "none">

## Search trail (only if you searched; omit the section otherwise)
- queries: <the variants actually run>
- fetched: <URL> — <what was extracted>
- rejected: <URL> — <why>

Rules:
- Answer only your question. Do not branch into neighboring topics.
- Distinguish established knowledge from your own inference; label confidence.
- If the question cannot be answered from reasoning alone and facts are
  required, say what evidence is missing rather than inventing it.
- If you must verify external facts, follow references/search-method.md:
  resolve entities + 2–4 query variants first, search across source classes,
  deep-fetch the promising URLs (quote the passage, not the snippet),
  floor for relevance, corroborate across classes.
```

## SYNTHESIZE (run by the orchestrator)

```
Synthesize the children's findings for this node into one answer.

NODE QUESTION: <question>
CHILDREN FILES: <list of agents/*.md paths>

Rules:
- Read every child file first. Drop nothing silently.
- Open with the direct answer to the node question (2-4 sentences).
- Cluster before merging: the same finding appearing in multiple branches is
  ONE finding with a corroboration count ("found independently by the bias
  and emotion branches") — corroboration raises confidence; note which
  branches corroborate. Duplicate-looking findings that differ in a load-
  bearing detail are a tension, not a cluster.
- Integrate findings; where children conflict, present the conflict, both
  sides, and your confidence assessment — do not average it away.
- Rank findings by importance to the node question, not by child order.
- Close with "Open questions" inherited or surfaced from children.
```

The root-level synthesis additionally gets: a one-paragraph executive summary,
a "How this was researched" line (nodes, depth, branches), and any strategy
add-on sections (Blind spots / Sources / Socratic challenges).

## DETECT (blind spots — perspective strategy)

```
Here are N answers to the same question, each from one perspective:
<the N agent files>

List what ALL of them missed. Look for: shared assumptions none questioned,
stakeholders nobody represented, time horizons nobody considered, disconfirming
evidence nobody sought, second-order effects nobody traced.

Output 3-6 bullets. Be specific — name the actual gap, not "more research
needed". If a gap is genuinely unknowable, say why.
```

## GROUND (claim verification — grounded strategy)

```
Verify each key claim below with live web search. For each claim output:

- CLAIM: <claim>
  VERDICT: verified | reported-only | contradicted | unverifiable
  SOURCES: <1-3 URLs actually checked>
  NOTE: <one line — what the sources say, or why verification failed>

Claims:
<key claims extracted from the leaf's draft answer>

Rules:
- Search with 2-4 query variants per claim (synonyms, aliases, `site:`
  targets) — see references/search-method.md for the full method.
- A claim is "verified" only if a source you actually opened states it —
  fetch full content for the promising URLs; a snippet that looks right is
  not verification. "Reported-only" means sources repeat it but none is
  primary/authoritative.
- Corroborate across source classes (community / official / academic /
  code / news): ≥2 independent classes raise confidence; single-source
  claims cap at reported-only.
- Apply the relevance floor: engagement-high but off-topic results are
  dropped, not cited.
- Note the publication date of what you cite; state "as of <date>" for
  versioned facts (LTS versions, prices, releases).
- Never mark verified from memory alone. If search fails, say unverifiable.
- Record the URL you checked, not the URL the search engine showed.
```

In the grounded strategy, the leaf agent runs GROUND on its own draft before
writing its agent file, and embeds the verdicts in its Findings lines as
`[verified: URL]` / `[reported-only]` / `[unverified]`.

## SOCRATIC (question improvement — socratic strategy)

```
Before researching this question, stress-test it:

QUESTION: "<question>"

Answer in this order:
1. ASSUMPTIONS — what is this question presupposing? (3-5, stated plainly)
2. DEFINITIONS — which key terms are doing hidden work and need pinning down?
3. FRAMING — is this the right question at all? What would a skeptic ask?
4. MISSING CONTEXT — what would change the answer depending on facts we
   don't have? (ask the user only if the answer is truly blocked)
5. IMPROVED QUESTION(S) — restate the question so it is answerable,
   or split it if it bundles several questions.

Keep it under half a page. Do not answer the question yet.
```

The improved question replaces the original for the recursive phase; both the
challenge section and the improvement go into the final report.

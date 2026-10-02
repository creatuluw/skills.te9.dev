---
name: te9-research
description: "Fractal deep research: turn any question into multi-agent exploration. A question spawns angles, each angle spawns deeper angles, the tree grows until questions become atomic, all branches are explored in parallel via sub-agents, then everything synthesizes back up into one comprehensive answer. Four strategies: recursive research, socratic questioning, perspective expansion with blind-spot detection, and web-grounded fact-checked research. Use when the user asks to deep-research, thoroughly investigate, or explore a question from all angles, wants assumptions challenged or a question improved, or needs web-verified facts with citations."
license: MIT
compatibility: "Requires a sub-agent delegation tool (e.g. pi's delegate with tasks[]). The grounded strategy additionally requires web search. The HTML report template is self-contained (no build step, no external skill). No API keys or installs needed."
metadata:
  version: "1.0"
  source: "https://github.com/Cranot/deep-research"
  ported-from: Cranot/deep-research (MIT)
---

# Fractal Research

Fractal exploration of any question through recursive sub-agents — ported from
[Cranot/deep-research](https://github.com/Cranot/deep-research).

```
Question: "Why do smart people make bad decisions?"
 ├── What cognitive biases affect intelligent people?
 │   ├── How does overconfidence manifest in experts?
 │   ├── What is the curse of knowledge?
 │   └── ... (each can branch further)
 ├── How does expertise create blind spots?
 │   └── ...
 └── What role does emotional reasoning play?
     └── ...

        ↓ ALL BRANCHES EXPLORED IN PARALLEL ↓
        ↓ SYNTHESIZE BACK UP THE TREE ↓

[Comprehensive Answer]  ← the root agent's file IS the final report
```

## ⚠️ Read this before your first run

**Fan-out costs.** One decomposition can produce many sub-questions, and each
spawns a child agent, which can decompose again. A modest 4-way branch at
depth 3 is ~64 leaf agents; at depth 5 it is ~1,000+. Sub-agent delegation is
heavier than a CLI call — **always start at depth 1 and watch what it does
before going deeper.**

Interrupting a run is safe but unrecoverable — write agent files as you go so
partial results survive.

## Budget parameters

Defaults are safe. Users can override; you must enforce the hard limits.

| Parameter | Default | Hard limit | Meaning |
|-----------|---------|------------|---------|
| `depth` | 2 | 5 | Max recursion depth below the root. Depth 0 = root only (answer directly). |
| `max_fanout` | 4 | 5 | Max sub-questions per DECOMPOSE. Trim the model's output to the strongest N. |
| `parallel` | 4 | 8 | Max child agents running at once (one delegate batch). |

If the user asks for more than the hard limit, clamp it, say so in one line,
and proceed. Never run unbounded fan-out.

## The orchestration loop

You are the orchestrator. Research is a tree of typed nodes with epistemic
states: `Unknown → Explored → Validated → Synthesized`.

Five operations drive all state transitions, plus a search pre-pass:

0. **RESOLVE** (before searching): when leaves need external facts, resolve
   entities, BY-vs-ABOUT lanes, and 2–4 query variants per question *before*
   any search fires — see [references/search-method.md](references/search-method.md).
1. **DECOMPOSE** (Question → sub-questions): Only when the question is NOT
   atomic AND depth budget remains. Emit one `Q:` line per sub-question
   (see [references/prompts.md](references/prompts.md)). Cap at `max_fanout`.
   Each `Q:` line becomes one child agent.
2. **ANSWER** (Question → Answer): Leaf agents answer atomic questions with
   findings, confidence, and open questions.
3. **SYNTHESIZE** (children's findings → one answer): Bottom-up. Resolve
   tensions, merge overlaps, keep disagreements visible. The root synthesis is
   the final report.
4. **DETECT** (findings → blind spots): What did every branch miss? Used by
   the perspective strategy.
5. **GROUND** (claim → verified claim): Verify leaf claims with live web
   search; attach citations. Used by the grounded strategy.

### The atomicity test

Decompose only if the question fails this test — i.e. the question is atomic
when ALL of these hold:

- It can be answered in one focused pass (a paragraph to a page)
- It does not visibly contain 2+ distinct sub-questions
- Answering it does not require different evidence/kinds of expertise

Atomic questions go straight to ANSWER. Never decompose trivia ("What year did
the Titanic sink?") or single-fact lookups.

## Strategy selection

Pick from the question; do not ask the user which strategy unless genuinely
ambiguous.

| Strategy | When | Flow |
|----------|------|------|
| `recursive_research` (default) | General research, "deep dive on X" | DECOMPOSE → (recurse \| ANSWER) → SYNTHESIZE |
| `socratic` | Vague, loaded, or unclear problems | Challenge assumptions → improved question(s) → recursive_research on the improved question |
| `perspective_expander` | Contested or complex topics | N perspectives → ANSWER per perspective → DETECT blind spots → SYNTHESIZE |
| `grounded_research` | Facts, current events, anything checkable | recursive_research but every leaf claim is GROUND-verified with citations; unverifiable claims flagged |

Full strategy details: [references/strategies.md](references/strategies.md).

## How to run it

### Step 1 — Preflight and setup

**Preflight** (one glance, prevents dead runs): confirm your sub-agent tool
is available, and if the strategy needs web grounding (or leaves may verify
facts), confirm web search is available — if not, degrade honestly to
ungrounded and say so. Also glance at existing `reports/` slugs: if a prior
run overlaps this topic, say so and reuse its findings as a starting branch
instead of re-researching.

```bash
mkdir -p "reports/$(date +%F)-<slug>/agents"
```

Create `research.log` (JSONL, one event per line — schema in
[references/output-format.md](references/output-format.md)) and log the first
event:

```json
{"event": "run_start", "question": "...", "strategy": "recursive_research", "depth": 2, "max_fanout": 4}
```

### Step 2 — Grow the tree

At each node, run the atomicity test:

- **Not atomic + depth remains** → DECOMPOSE. You write the decomposition
  yourself (no sub-agent needed). Log it:
  `{"event": "decompose", "node": "q-001", "depth": 0, "children": ["q-002", "q-003"]}`
- **Atomic or depth exhausted** → ANSWER via a leaf sub-agent (below).

### Step 3 — Fan out leaf agents (ANSWER)

Dispatch child agents **in parallel** using your sub-agent tool. With pi's
`delegate`, one batch = one call, `tasks[]` = the children (≤ `parallel` per
batch; batch again if more). Use the cheap recon agent (e.g. `scout`) for
leaves — they answer one atomic question each and **write their own agent
file** directly:

```
report_dir/agents/d{depth}-{seq}-{role}.md    e.g. d1-002-researcher.md
```

Leaf task template (see [references/prompts.md](references/prompts.md) for the
full prompt): *"You are a leaf researcher. Answer this atomic question:
<QUESTION>. Write your answer to <report_dir>/agents/d1-003-researcher.md in
the leaf format (findings with evidence/confidence, tensions, open questions,
1 page max)."* If the leaf must verify external facts, it follows the search
method in [references/search-method.md](references/search-method.md):
resolve entities and query variants first, search across source classes,
deep-fetch the promising URLs, floor for relevance — and leave a Search
trail section in its file (see [references/search-method.md](references/search-method.md) §6) so the
run is auditable.

When each leaf returns, log:
`{"event": "answer", "node": "q-003", "agent_file": "agents/d1-003-researcher.md", "status": "explored"}`

### Step 4 — Synthesize bottom-up

Starting from the deepest nodes, SYNTHESIZE each internal node from its
children's agent files (you do this yourself — read the children, merge).
Mark nodes `synthesized` in the log as you go. The **root synthesis is the
final report**: write it to `agents/d0-001-orchestrator.md`. It must:

- Answer the original question directly, up front
- Integrate every branch's key findings (drop nothing silently)
- Resolve or explicitly surface tensions between branches
- Name remaining unknowns / open questions

### Step 5 — Metrics, HTML report, and handoff

```bash
python <skill_dir>/scripts/metrics.py reports/<report_dir>
```

Writes `metrics.json` into the report dir.

**Render the HTML report.** Copy `<skill_dir>/assets/report-template.html` to
`<report_dir>/report.html` and fill the placeholders per the instructions in
its header comment: executive summary, one section per branch, tensions, open
questions, strategy add-on sections, and the `TREE` JSON for the collapsible
question tree (built from `research.log`: `decompose` events give
parent→children, `answer` events give status). The template is fully
self-contained — no build step, no external assets, no dependency on any other
skill — so the report opens offline from `file://`. Open it in the browser when
done. Markdown artifacts stay alongside it as the audit trail.

Then hand the user the `report.html` path (plus the report dir) and a 3-line
executive summary.

## Strategy add-ons

- **socratic**: before Step 2, write a short assumptions/challenge section
  into the final report; replace the question with the improved one (log
  `{"event": "question_refined", ...}`); research proceeds on the improved
  question.
- **perspective_expander**: replace DECOMPOSE with perspective generation
  (5–7 named angles: disciplines, stakeholders, time horizons, skeptics).
  After answers, run DETECT (one sub-agent asked "what did all of these
  miss?") and include a **Blind spots** section.
- **grounded_research**: leaves must attempt web verification of each key
  claim; findings carry `[source: URL]` citations and a confidence label
  (verified / reported / unverifiable). The final report gets a **Sources**
  section and flags unverifiable claims. Leaves follow
  [references/search-method.md](references/search-method.md): multi-query
  expansion, source-class diversification, deep-fetching, relevance
  flooring, and corroboration counting.

## Edge cases

- **Trivial / single-fact question** → depth 0: answer directly, no tree, no
  sub-agents. Log `run_start` with `depth: 0` and finish.
- **User demands depth > 5 or fan-out > 5** → clamp to the hard limit, state
  the clamp in one line, proceed.
- **A branch dead-ends** (leaf finds nothing solid) → mark the node
  `{"status": "dead_end"}` in the log; the synthesis notes it. Dead ends are
  findings, not failures.
- **Children disagree** → do not average away the disagreement; surface it
  with both sides and your confidence assessment.
- **Very broad question at depth 1** → prefer more fan-out over more depth:
  5 shallow branches beat 2 deep ones at the same cost.

## What good looks like

The source project's field observations, and this skill's bar:

1. **Multi-angle beats single-angle** — a report from 4+ branches is broader
   than any one-pass answer
2. **Every question contains hidden angles** — recursive exploration surfaces
   what nobody thought to ask
3. **Synthesis is not concatenation** — the root report resolves tensions and
   ranks findings; it is not a stapled pile of branch outputs

If your final report could have been written without the tree, the tree was
wasted — start again with better decomposition.

After handing off: follow-up questions can be answered from the report
artifacts without re-running the tree — read the agent files and answer
grounded in what the run already found; only spawn new branches for what the
run genuinely did not cover.

## References

- [references/strategies.md](references/strategies.md) — the four strategies in detail
- [references/prompts.md](references/prompts.md) — exact prompts for RESOLVE, DECOMPOSE, ANSWER, SYNTHESIZE, DETECT, GROUND, SOCRATIC
- [references/search-method.md](references/search-method.md) — leaf search method: resolve-first, multi-query, source classes, deep-fetch, scoring, corroboration
- [references/output-format.md](references/output-format.md) — report tree, research.log schema, agent file formats, node states
- [scripts/metrics.py](scripts/metrics.py) — run metrics from research.log + agents/
- [assets/report-template.html](assets/report-template.html) — self-contained HTML report template (design lineage: html-docs); fill after synthesis, no external dependencies
- [evals/evals.json](evals/evals.json) — quality and outcome evals

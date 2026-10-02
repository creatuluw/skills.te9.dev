---
name: identify-models
description: Two tasks, one first-principles engine, one always-written deliverable — (1) grill a stated problem until the correct model (entities, states, invariants) falls out, or (2) audit an existing solution by inferring what it's trying to solve and judging it against the problem's true model. Every run writes two structured ProblemSolutionGraph files (problem-model + solution direction). Use when asked to identify the model, find the right abstraction, first-principles a problem, or figure out how to attack a problem — or when auditing, sanity-checking, or reverse-engineering a solution against the problems it actually solves.
metadata:
  version: "1.1.0"
---

# Identify Models

A model is a purpose-built simplification of reality, data, or behavior that lets you reason, predict, simulate, or build something more easily. Attack a problem with the wrong model and every solution fights it. This skill does two things with one engine:

1. **Identify** — the user brings a problem (or set). You derive the model needed to attack it.
2. **Audit** — the user brings a solution. You infer the problem(s) it's trying to solve, surface what it implies but doesn't handle, derive the true model, and judge the fit.

Every run — both tasks — ends in the same written deliverable: two graph files (§ Deliverables). The interview builds the graph; the graph is the artifact any later use case builds on.

## First question — direction

Before anything else, ask exactly one question:

"Are we identifying the model for a problem you're bringing, or auditing a solution you already have?"

Give your recommended answer from context: a pain point, wish list, or "how should we attack X" → identify. Code, a diff, a design doc, or "does this make sense" → audit. If both arrive, split the session: audit the existing solution first — its inferred problems feed the identify run.

## Interview rules

Ask the questions one at a time. For each question, provide your recommended answer. If a question can be answered by exploring the codebase or the running system, explore instead of asking.

Before writing the first file, ask where to store the deliverables — one question, with a recommended path (default: a `models/` directory beside the code in play). Remember the answer; don't re-ask within a session. If the user declines to choose, use the default.

## Shared engine

- **Box the experience.** Name what past experience or the existing artifact says the answer is, label it an assumption, set it aside — visibly. It doesn't get to answer first.
- **Grill to bedrock.** Walk these branches one by one, resolving dependencies in order: Why does this exist? Who hurts? What are the irreducible entities? What are the states? What must never happen (invariants)? What forces act from outside? Stop a branch when a fact can't be reduced further.
- **Simplest survivor wins.** Derive the model from bedrock facts, check it against every resolved branch, then ask: could a simpler model hold? Complexity enters only when a branch forces it.
- **Land every result in the graph.** Boxing an assumption, killing a claim, reframing the problem — each is a graph move (§ Construction). The chat readout is rendered from the graphs, never the other way around.

## Deliverables

Always two files, both tasks, one schema (full types and conventions: [references/schema.md](references/schema.md)):

- `<slug>.model.json` — the problem-model graph: the purpose-built simplification of the problem's shape. Slug from the problem ("checkout", "search-relevance").
- `<slug>.solution.json` — the solution-direction graph. Graph-level `derivesFrom` names the model file; its nodes point back via `sourceIds`.

Schema summary — a graph carries `name`, `purpose`, optional `scope`/`exclusions`, `status` (draft | proposed | validated), `version`, optional `derivesFrom`, `nodes`, `edges`, `competencyQuestions`, `rules`. Nodes carry `id`, `type` (35 vocabulary types including `Model`, `Event`, `Force`, `Tradeoff`), `label`, `status` (observed | inferred | assumed | proposed | approved | rejected), and lean metadata (`confidence`, `sourceIds`, `properties`, …). Edges carry `from`, `relation` (34 relations), `to`, `status`, optional `rationale`, `evidenceIds`, `properties`.

The chat readout (§ Output) is rendered from the graphs. Never paste full JSON in chat — the files are the artifact.

## Construction

The grill builds the graph. Rules:

- **A node earns its place** only by answering a competency question, participating in a rule, or changing a decision. Everything else stays out.
- **Statuses are honest.** `observed` only with evidence behind it (sourceIds point at files, runs, measurements); `inferred` when derived; `assumed` when parked. `rejected` nodes stay in the graph with rationale — the graveyard is the audit trail.
- **Boxing is a node.** The boxed assumption becomes an `Assumption` node, `status: "assumed"`, deliberately unlinked from the model core. Evidence promotes it or kills it — or converts it into an `Option` the solution graph can reject.
- **Killing is preserved.** A claim that dies: `status: "rejected"` + rationale. A reframed problem: new `Problem` node, edge `new supersedes old`, old one `rejected`.
- **Model node.** Exactly one per model graph — the root the core hangs from (`part_of`). Graph `purpose` states what the simplification is for; `exclusions` records what was considered and deliberately left out. A simplification is defined as much by what it leaves out as what it keeps.
- **Invariants live in `rules[]`.** Hard "must never happen" statements, referencing node ids where they bind. Softer bounds are `Constraint` nodes.
- **Competency questions are the graph's test suite.** Each must be answerable by walking nodes and edges. One that can't be is a hole — reopen that grill branch.
- **Lint before writing:** every edge's endpoints exist; no orphan nodes except parked assumptions; no cycles in `derives_from`/`supersedes`; nothing `approved` rests solely on `rejected` claims.
- **Parsimony guard.** The vocabulary is a menu, not a checklist. A typical model graph is 8–20 nodes; past ~30, name the branch that forced it or cut. Empty optional fields stay empty; statuses and confidence only where actually known.

Shape conventions (state machines, forces, tradeoffs, events vs actions, formal content in properties, cross-graph linkage) — see [references/schema.md](references/schema.md).

## Task 1 — Identify

1. Frame the problem in the user's words. If a set: do they share one model or several? Resolve that branch first.
2. Box the experience — the default answer habit suggests.
3. Grill to bedrock. You own convergence to the actual problem statement — drive it with recommended answers and exploration, not by relaying questions.
4. Watch while you grill. A refinement signal means the statement itself is a hypothesis, not a given:
   - A solution is smuggled into the statement — a tool or technology, "we need X" where X isn't a hurt.
   - Nobody can name who hurts, or what observation proves the problem exists.
   - Exploration contradicts the statement — the code or running system says otherwise.
   - The branch won't reduce — every why lands on another symptom, never bedrock.
   - The statement drifts — probing reveals it names a different problem each time.
5. If a signal fires, audit the framing: box the statement — the assumption its framing makes — then demand evidence. What observation proves the problem is real? How often does it hurt? What is observably different once it's solved? Verify or kill the statement as a claim. If it dies, reframe to the actual problem with the user and resume the grill. If no signal fires, trust the grill — don't audit a statement that's holding up.
6. Derive the model → write `<slug>.model.json`: Model root, entities and states from bedrock, invariants in `rules`, forces, competency questions, purpose/scope/exclusions. Close the CQ loop; lint; then emit.
7. State the first attack → write `<slug>.solution.json`: Goals (why it exists, who hurts), Requirements (invariants + constraints), two or more Options — smallest first, the first attack leads — Tradeoffs where real, a Decision (`selects`/`rejects` with rationale), a `Test` for the first attack, predicted `Outcome` (`proposed`). Architecture/Component/Interface only when the direction can't be stated without them.

## Task 2 — Audit

1. **Read the solution as a frozen hypothesis.** Explore it fully before asking anything — do not ask the user what it does. Extract: what it does, what it names, what it guards against, what it ignores.
2. **List the inferred problems.** Every guardrail answers a believed problem; every gap implies one the builders didn't see. Label each: real, stale, or missing.
3. Box the solution's own story — its justification is the experience to set aside.
4. Grill to bedrock on the actual problem, treating the inferred problems as claims to verify or kill.
5. Derive the true model → write `<slug>.model.json`. The solution's implied model enters as `inferred` nodes; inferred problems as `Problem` nodes — real → `observed`, stale → `rejected` (rationale), missing → `proposed`.
6. **Verdict** — edges from the solution's System/Architecture node to each Problem: `satisfies` (fits) / `constrains` (partially fits) / `blocks` (fights), with confidence and rationale. **Repair** — the smallest realignment, as `proposed` nodes in `<slug>.solution.json`. Emit both files.

## Output

Written to disk: `<slug>.model.json` + `<slug>.solution.json`. In chat, render from the graphs:

```
Files: <where>/<slug>.model.json, <slug>.solution.json
Charter — Model: <name> | Purpose: <one line> | Scope: <…> | Exclusions: <…>
Competency questions: <list>
Rules (invariants): <list>
Assumption boxed: <the parked default — and whether evidence promoted or killed it>
Readout:
  Entities / States / Invariants / Forces: <one line each, from the graph>
  First attack: <the lead Test> → predicted Outcome: <…>
Problem status: <real | misframed (actual: …) | phantom> — only when a signal fired
```

Audit adds:

```
Solution's implied model: <name — the inferred subgraph>
Inferred problems: <each labeled observed | rejected | proposed>
Verdict: <fits | partially fits | fights> — why (the satisfies/constrains/blocks edges)
Repair: <smallest change — the proposed nodes>
```

## Examples

Four worked runs, condensed here; the full walkthroughs with trimmed JSON — including emit sketches — live in [references/examples.md](references/examples.md):

1. **Identify — double-charged checkout.** No signal; boxed "idempotency middleware". Bedrock: one payment intent per user action; states intent → captured; invariant at-most-one capture per intent. Model: payment-intent state machine keyed by client request id. First attack: dedupe the charge at the boundary on request id.
2. **Identify with refinement — "we need a caching layer."** Signal: solution smuggled as problem. Evidence: one dashboard endpoint, 40 queries/request, nobody else hurts. Actual problem: the N+1, not the missing cache. Model: one query per request at the data-access boundary. First attack: collapse the loop — no cache. The boxed caching layer stays an unlinked `Assumption` node; the original statement is a `rejected` `Claim` the reframed problem `derives_from`.
3. **Audit — the distributed lock.** Implied model: "payment is a race to be serialized" (inferred nodes). Real problem yields exactly-once capture; the lock adds latency and a failure mode the problem never asked for. Verdict: `blocks` — fights the problem. Repair: drop the lock, key the charge on request id.
4. **Identify with refinement — "without data you can't improve results."** Signal: an aphorism, not a problem — a claim smuggled as a problem; nobody hurts, nothing observed. Boxed: "we need an analytics platform." Evidence: results *are* observed daily — anecdotally, from memory. What's missing isn't data; it's that observations are never recorded against a baseline, so nothing accumulates and no change can be attributed. The "no data" claim dies; reframed problem: improvement is undecidable — changes get judged on memory. Model: measure-record-compare loop — an operational metric for the result, a baseline before any change, a post-change reading, and a keep/revert/adjust learning that feeds the next change. Invariant: a change is judged only against its recorded baseline. Exclusions: analytics platforms, data warehousing — the boxed assumption resurfaces as an `Option` and is `rejected` (a baseline needs a number and a habit, not a platform). First attack: write down today's number for the one metric that matters; judge the next change against it.

## Edge cases

- **A problem set arrives:** do the items share one model or several? Resolve before grilling — several models means several slugs and file pairs.
- **The problem dissolves under grilling (phantom):** emit anyway. The kill chain — claim, evidence, `rejected`, what the framing was actually protecting — is the deliverable.
- **Both tasks in one session:** audit first; its inferred problems feed the identify run.
- **User won't name a storage location:** use the default `models/` beside the code in play and say so.
- **Graph wants to exceed ~30 nodes:** cut, or name the branch that forced it. If a solution direction can't be stated without Architecture/Component nodes, that's a signal the model isn't done — back to the grill, not deeper design.

## References

- [references/schema.md](references/schema.md) — full `ProblemSolutionGraph` types, lean profile, shape conventions, cross-graph linkage.
- [references/examples.md](references/examples.md) — four full worked runs with trimmed JSON emit sketches.

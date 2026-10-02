# Worked examples

Four runs, condensed from real sessions. Each ends in the same two files. JSON is trimmed to the load-bearing parts — lean profile applies (unknown optionals omitted).

## 1. Identify — double-charged checkout

Statement: "Users get double-charged when they retry checkout."

No refinement signal — the statement holds up under the grill. Boxed: "idempotency middleware" (`Assumption`, unlinked). Bedrock: one payment intent per user action; states intent → captured; invariant at-most-one capture per intent. Model: payment-intent state machine keyed by client request id. First attack: dedupe the charge at the boundary on request id.

`checkout.model.json` (trimmed):

```json
{
  "name": "checkout-payment-intents",
  "purpose": "Reason about charge correctness under client retries",
  "scope": "One payment intent per user action, from creation to capture",
  "exclusions": ["refunds", "fraud scoring", "provider failover"],
  "status": "proposed",
  "version": "0.1.0",
  "nodes": [
    { "id": "n-model", "type": "Model", "label": "payment-intent state machine", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-intent", "type": "Entity", "label": "payment intent", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-request", "type": "Resource", "label": "client request id", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-s-intent", "type": "State", "label": "intent", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-s-captured", "type": "State", "label": "captured", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-retry", "type": "Event", "label": "client retry", "status": "observed", "version": "0.1.0", "properties": {} }
  ],
  "edges": [
    { "id": "e1", "from": "n-intent", "relation": "part_of", "to": "n-model", "status": "observed" },
    { "id": "e2", "from": "n-s-intent", "relation": "part_of", "to": "n-intent", "status": "observed" },
    { "id": "e3", "from": "n-s-captured", "relation": "part_of", "to": "n-intent", "status": "observed" },
    { "id": "e4", "from": "n-s-intent", "relation": "transforms", "to": "n-s-captured", "status": "observed",
      "properties": { "event": "capture", "guard": "intent not yet captured" } },
    { "id": "e5", "from": "n-intent", "relation": "requires", "to": "n-request", "status": "proposed", "rationale": "the request id is the dedup key that makes retries identifiable" }
  ],
  "competencyQuestions": [
    "Can this intent capture twice?",
    "What happens when the client retries?",
    "Which capture wins when two race?"
  ],
  "rules": ["at-most-one capture per n-intent"]
}
```

`checkout.solution.json` (trimmed):

```json
{
  "name": "checkout-payment-intents.direction",
  "purpose": "Smallest direction that makes double-charging impossible",
  "status": "draft",
  "version": "0.1.0",
  "derivesFrom": "checkout.model.json",
  "nodes": [
    { "id": "n-goal", "type": "Goal", "label": "no double charge", "status": "observed", "sourceIds": ["n-intent"], "version": "0.1.0", "properties": {} },
    { "id": "n-req", "type": "Requirement", "label": "at-most-one capture per client request id", "status": "proposed", "sourceIds": ["n-request"], "version": "0.1.0", "properties": {} },
    { "id": "n-opt-a", "type": "Option", "label": "dedupe at the boundary on request id", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-opt-b", "type": "Option", "label": "distributed lock around charging", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-trade", "type": "Tradeoff", "label": "lock: serialization vs latency + new failure mode", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-dec", "type": "Decision", "label": "boundary dedupe first", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-test", "type": "Test", "label": "retry a captured payment with the same request id", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-out", "type": "Outcome", "label": "second call returns the first result; one charge", "status": "proposed", "version": "0.1.0", "properties": {} }
  ],
  "edges": [
    { "id": "e1", "from": "n-opt-a", "relation": "contributes_to", "to": "n-goal", "status": "proposed" },
    { "id": "e2", "from": "n-opt-b", "relation": "contributes_to", "to": "n-goal", "status": "proposed" },
    { "id": "e3", "from": "n-opt-b", "relation": "affects", "to": "n-trade", "status": "proposed", "properties": { "cost": "latency + stuck locks" } },
    { "id": "e4", "from": "n-dec", "relation": "selects", "to": "n-opt-a", "status": "proposed", "rationale": "smallest step that satisfies the invariant" },
    { "id": "e5", "from": "n-dec", "relation": "rejects", "to": "n-opt-b", "status": "proposed", "rationale": "adds a failure mode the problem never asked for" },
    { "id": "e6", "from": "n-test", "relation": "tests", "to": "n-opt-a", "status": "proposed" },
    { "id": "e7", "from": "n-test", "relation": "predicts", "to": "n-out", "status": "proposed" }
  ],
  "competencyQuestions": ["Which option is the smallest real step?", "What proves it worked?"],
  "rules": ["every capture attempt carries n-request"]
}
```

## 2. Identify with refinement — "we need a caching layer"

Signal: a solution smuggled in as the problem. Graph moves:

- Boxed: "caching layer" → `Assumption` node, `assumed`, unlinked from the model core.
- Original statement → `Claim` "we need a cache", killed under evidence (one dashboard endpoint issues 40 queries per request; nobody else hurts) → `rejected`.
- Reframed `Problem`: "the N+1 — one query per row, per request" → edge `supersedes` the dead claim; old one stays `rejected`.
- Model: one query per request at the data-access boundary. No cache in the model.
- First attack: collapse the loop — no cache.

What the trimmed model graph carries that prose wouldn't: the killed claim, its evidence, and the supersession chain — so a reader who asks "why isn't there a cache?" finds the answer as graph structure, not tribal memory.

## 3. Audit — the distributed lock

A checkout service wraps charging in a distributed lock. Implied model: "payment is a race to be serialized" — enters the model graph as `inferred` nodes.

Inferred problems, verified by grilling:

| Inferred problem | Label | Graph status |
|---|---|---|
| "Concurrent charges race" | stale — retries are sequential; concurrency never observed | `Problem`, `rejected`, rationale |
| "Double capture on retry" | real | `Problem`, `observed` |
| "Lock contention stalls checkout" | missing — the builders didn't see it | `Problem`, `proposed` |

True model: exactly-once capture (same payment-intent state machine as example 1). Verdict edges from the service (`System`) node:

```json
{ "id": "e-v1", "from": "n-service", "relation": "satisfies", "to": "n-p-race", "status": "disputed", "rationale": "built for a problem that never occurs" },
{ "id": "e-v2", "from": "n-service", "relation": "constrains", "to": "n-p-double-capture", "status": "observed", "rationale": "prevents it, but at a cost the problem never asked for" },
{ "id": "e-v3", "from": "n-service", "relation": "blocks", "to": "n-p-contention", "status": "observed", "rationale": "adds latency and a stuck-lock failure mode" }
```

Verdict: fights the problem. Repair, as `proposed` nodes in the solution graph: drop the lock; key the charge on request id.

## 4. Identify with refinement — "without data you can't improve results"

Full walkthrough — this is the shape of most refinement runs.

**Statement.** "Without data you can't improve results."

**Signal.** It's an aphorism, not a problem: a claim smuggled as a problem, nobody hurts, nothing observed. Boxed: "we need an analytics platform" → `Assumption`, `assumed`, unlinked.

**Verify or kill.** Evidence contradicts the claim: results *are* observed daily — anecdotally, from memory. `Observation` nodes with the team's own examples as `sourceIds`. What's missing isn't data; it's that observations are never recorded against a baseline, so nothing accumulates and no change can be attributed. The "no data" claim dies → `rejected` with that rationale.

**Reframe.** The actual problem: improvement is undecidable — changes get judged on memory. New `Problem` supersedes the old framing.

**Model: measure-record-compare loop.** `improvement.model.json` (trimmed):

```json
{
  "name": "result-improvement-loop",
  "purpose": "Decide whether a change actually improves the result, and learn from it",
  "scope": "One result and its metric, from baseline capture to attribution of a change",
  "exclusions": ["analytics platforms", "data warehousing", "ML-based optimization"],
  "status": "proposed",
  "version": "0.1.0",
  "nodes": [
    { "id": "n-model", "type": "Model", "label": "measure-record-compare loop", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-problem", "type": "Problem", "label": "improvement is undecidable — changes judged on memory", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-claim", "type": "Claim", "label": "we can't improve because we have no data", "status": "rejected", "description": "Results are observed daily, anecdotally — that is data; it isn't recorded, so it can't accumulate or be compared.", "version": "0.1.0", "properties": {} },
    { "id": "n-problem-orig", "type": "Problem", "label": "without data we can't improve results", "status": "rejected", "description": "The aphorism as originally stated — a claim smuggled as a problem.", "version": "0.1.0", "properties": {} },
    { "id": "n-result", "type": "Outcome", "label": "the result to improve", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-metric", "type": "Metric", "label": "operational definition of the result", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-base", "type": "Measurement", "label": "baseline reading (before any change)", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-post", "type": "Measurement", "label": "post-change reading", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-change", "type": "Action", "label": "a change to the process", "status": "observed", "version": "0.1.0", "properties": {} },
    { "id": "n-learn", "type": "Learning", "label": "keep / revert / adjust", "status": "proposed", "version": "0.1.0", "properties": {} }
  ],
  "edges": [
    { "id": "e1", "from": "n-problem", "relation": "supersedes", "to": "n-problem-orig", "status": "observed", "rationale": "reframed from the 'no data' aphorism after evidence review" },
    { "id": "e2", "from": "n-metric", "relation": "measures", "to": "n-result", "status": "proposed" },
    { "id": "e3", "from": "n-base", "relation": "measures", "to": "n-metric", "status": "proposed" },
    { "id": "e4", "from": "n-post", "relation": "measures", "to": "n-metric", "status": "proposed", "properties": { "when": "after change" } },
    { "id": "e5", "from": "n-change", "relation": "affects", "to": "n-result", "status": "observed" },
    { "id": "e6", "from": "n-post", "relation": "depends_on", "to": "n-base", "status": "proposed", "rationale": "comparison needs both readings" },
    { "id": "e7", "from": "n-learn", "relation": "acts_on", "to": "n-change", "status": "proposed", "rationale": "the decision feeds the next change" }
  ],
  "competencyQuestions": [
    "What is the baseline for this metric?",
    "Did the metric move after the change?",
    "Can the movement be attributed to the change rather than noise?"
  ],
  "rules": ["a change is judged only against its recorded baseline (n-post compared to n-base on the same n-metric)"]
}
```

**Solution direction.** `improvement.solution.json` (trimmed) — note the boxed platform resurfacing as a rejected `Option`:

```json
{
  "name": "result-improvement-loop.direction",
  "purpose": "Smallest direction that makes improvement decidable",
  "status": "draft",
  "version": "0.1.0",
  "derivesFrom": "improvement.model.json",
  "nodes": [
    { "id": "n-goal", "type": "Goal", "label": "improve the result, decidable", "status": "observed", "sourceIds": ["n-problem"], "version": "0.1.0", "properties": {} },
    { "id": "n-req", "type": "Requirement", "label": "a recorded baseline exists per metric before any change", "status": "proposed", "sourceIds": ["n-base"], "version": "0.1.0", "properties": {} },
    { "id": "n-opt-a", "type": "Option", "label": "log one metric by hand + weekly review", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-opt-b", "type": "Option", "label": "adopt an analytics platform", "status": "proposed", "description": "the boxed assumption, converted to an option by evidence", "version": "0.1.0", "properties": {} },
    { "id": "n-trade", "type": "Tradeoff", "label": "signal latency vs effort", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-dec", "type": "Decision", "label": "instrument the single metric that matters", "status": "proposed", "version": "0.1.0", "properties": {} },
    { "id": "n-test", "type": "Test", "label": "write down today's number for the one metric that matters", "status": "proposed", "sourceIds": ["n-base"], "version": "0.1.0", "properties": {} },
    { "id": "n-out", "type": "Outcome", "label": "next change judged against a number, not memory", "status": "proposed", "sourceIds": ["n-post"], "version": "0.1.0", "properties": {} }
  ],
  "edges": [
    { "id": "e1", "from": "n-opt-a", "relation": "contributes_to", "to": "n-goal", "status": "proposed" },
    { "id": "e2", "from": "n-opt-b", "relation": "contributes_to", "to": "n-goal", "status": "proposed" },
    { "id": "e3", "from": "n-trade", "relation": "affects", "to": "n-opt-a", "status": "proposed", "properties": { "cost": "signal latency of a week" } },
    { "id": "e4", "from": "n-dec", "relation": "selects", "to": "n-opt-a", "status": "proposed", "rationale": "a baseline needs a number and a habit, not a platform" },
    { "id": "e5", "from": "n-dec", "relation": "rejects", "to": "n-opt-b", "status": "proposed", "rationale": "effort before the loop exists buys nothing" },
    { "id": "e6", "from": "n-test", "relation": "tests", "to": "n-req", "status": "proposed" }
  ],
  "competencyQuestions": ["Is there a baseline for the metric we're about to move?", "What did the last change cost, and did it pay?"],
  "rules": ["no change is proposed without naming its n-test metric and its current value"]
}
```

**Readout in chat** (rendered from the graphs, per SKILL.md § Output):

```
Files: <where>/improvement.model.json, improvement.solution.json
Charter — Model: measure-record-compare loop | Purpose: decide whether a change improves the result | Scope: one result, baseline → attribution | Exclusions: analytics platforms, warehousing, ML optimization
Competency questions: baseline? moved? attributable?
Rules: a change is judged only against its recorded baseline
Assumption boxed: "we need an analytics platform" — evidence converted it to an Option; rejected (a baseline needs a number and a habit, not a platform)
Readout:
  Entities / States / Invariants / Forces: result + metric; before-change / after-change; judge only against baseline; review cadence
  First attack: write down today's number for the one metric that matters → predicted Outcome: next change judged against a number, not memory
Problem status: misframed (actual: improvement is undecidable — changes judged on memory)
```

**Patterns worth stealing from this run:** aphorisms hide claims — demand the who and the observation; boxed assumptions don't have to die, they can resurface as rejected `Options`; loop models are a recurring shape (change → reading → learning → next change); and the first attack is often embarrassingly small — that's the point.

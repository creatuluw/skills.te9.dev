---
name: identify-models
description: Two tasks, one first-principles engine — (1) grill a stated problem until the correct model (entities, states, invariants) falls out, or (2) audit an existing solution by inferring what it's trying to solve and judging it against the problem's true model. Use when user asks to identify the model, find the right abstraction, first-principles a problem, or figure out how to attack a problem — or when auditing, sanity-checking, or reverse-engineering a solution against the problems it actually solves.
---

# Identify Models

A model is the simplest correct description of a problem's shape — its entities, relationships, states, and invariants. Attack a problem with the wrong model and every solution fights it. This skill does two things with one engine:

1. **Identify** — the user brings a problem (or set). You derive the model needed to attack it.
2. **Audit** — the user brings a solution. You infer the problem(s) it's trying to solve, surface what it implies but doesn't handle, derive the true model, and judge the fit.

## First question — direction

Before anything else, ask exactly one question:

"Are we identifying the model for a problem you're bringing, or auditing a solution you already have?"

Give your recommended answer from context: a pain point, wish list, or "how should we attack X" → identify. Code, a diff, a design doc, or "does this make sense" → audit. If both arrive, split the session: audit the existing solution first — its inferred problems feed the identify run.

## Interview rules

Ask the questions one at a time. For each question, provide your recommended answer. If a question can be answered by exploring the codebase or the running system, explore instead of asking.

## Shared engine

- **Box the experience.** Name what past experience or the existing artifact says the answer is, label it an assumption, set it aside — visibly. It doesn't get to answer first.
- **Grill to bedrock.** Walk these branches one by one, resolving dependencies in order: Why does this exist? Who hurts? What are the irreducible entities? What are the states? What must never happen (invariants)? What forces act from outside? Stop a branch when a fact can't be reduced further.
- **Simplest survivor wins.** Derive the model from bedrock facts, check it against every resolved branch, then ask: could a simpler model hold? Complexity enters only when a branch forces it.

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
6. Derive the model.
7. State the first attack — the smallest step that tests the model against reality. Momentum over outcomes.

## Task 2 — Audit

1. **Read the solution as a frozen hypothesis.** Explore it fully before asking anything — do not ask the user what it does. Extract: what it does, what it names, what it guards against, what it ignores.
2. **List the inferred problems.** Every guardrail answers a believed problem; every gap implies one the builders didn't see. Label each: real, stale, or missing.
3. Box the solution's own story — its justification is the experience to set aside.
4. Grill to bedrock on the actual problem, treating the inferred problems as claims to verify or kill.
5. Derive the true model.
6. **Verdict**: fits / partially fits / fights the problem — plus the repair: the smallest change that realigns solution to model.

## Output

Identify:

```
Model: <name, e.g. "3-state machine", "single-writer ledger">
Assumption boxed: <default answer that was parked>
Entities / States / Invariants / Forces: <from bedrock>
First attack: <smallest step that tests the model>
Problem status: <real | misframed (actual: …) | phantom> — include only when a refinement signal fired
```

Audit (same block, plus):

```
Solution's implied model: <name>
Inferred problems: <each labeled real | stale | missing>
Verdict: <fits | partially fits | fights> — why
Repair: <smallest change that realigns>
```

## Example

Identify — "Users get double-charged when they retry checkout." No signal: the statement holds up under the grill. Boxed: "idempotency middleware." Bedrock: one payment intent per user action; states intent → captured; invariant at-most-one capture per intent. Model: payment-intent state machine keyed by client request id. First attack: dedupe the charge at the boundary on request id.

Identify with refinement — "We need a caching layer." Signal: a solution smuggled in as the problem. Boxed: "caching layer." Evidence: one dashboard endpoint issues 40 queries per request; nobody else hurts. Actual problem: the N+1, not the missing cache. Model: one query per request at the data-access boundary. First attack: collapse the loop — no cache.

Audit — a checkout service wraps charging in a distributed lock. Implied model: "payment is a race to be serialized." Grilling the real problem yields exactly-once capture; the lock adds latency and a failure mode the problem never asked for. Verdict: fights the problem. Repair: drop the lock, key the charge on request id.

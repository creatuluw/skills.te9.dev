# ProblemSolutionGraph schema

The deliverable schema for both graph files. Emit JSON conforming to these types.

## Types

```ts
type NodeType =
  | "Context" | "Actor" | "Stakeholder" | "System" | "Resource" | "Entity"
  | "State" | "Evidence" | "Observation" | "Measurement" | "Claim" | "Assumption"
  | "Hypothesis" | "Question" | "Problem" | "Goal" | "Metric" | "Constraint"
  | "Risk" | "Requirement" | "Capability" | "Option" | "Decision" | "Architecture"
  | "Component" | "Interface" | "Workflow" | "Action" | "Test" | "Outcome" | "Learning"
  | "Model" | "Event" | "Force" | "Tradeoff"
// Model: the simplification itself. Event: happenings. Force: external pressures.
// Tradeoff: structural exchanges (reified so n-ary trades become nodes).

type Relation =
  | "is_a" | "part_of" | "contains" | "owns" | "affects" | "observes" | "measures"
  | "supports" | "weakens" | "contradicts" | "explains" | "predicts" | "causes"
  | "contributes_to" | "depends_on" | "enables" | "blocks" | "constrains" | "requires"
  | "prohibits" | "satisfies" | "derives_from" | "allocates_to" | "realizes" | "selects"
  | "rejects" | "authorizes" | "acts_on" | "transforms" | "tests" | "verifies"
  | "validates" | "produces" | "updates" | "supersedes"

type OntologyNode = {
  id: string                       // short, stable, readable: "n1" or "n-payment-intent"
  type: NodeType
  label: string
  description?: string
  status: "observed" | "inferred" | "assumed" | "proposed" | "approved" | "rejected"
  confidence?: number              // 0..1; omit when unknown
  ownerId?: string
  sourceIds?: string[]             // in solution graphs: node ids in the model graph
  validFrom?: string
  validTo?: string
  version: string                  // lean default "0.1.0"
  properties: Record<string, unknown>
}

type OntologyEdge = {
  id: string
  from: string
  relation: Relation
  to: string
  status: "observed" | "inferred" | "assumed" | "disputed" | "rejected"
  confidence?: number
  evidenceIds?: string[]
  rationale?: string
  validFrom?: string
  validTo?: string
  properties?: Record<string, unknown>  // event/guard on transitions, tradeoff axes, strengths
}

type ProblemSolutionGraph = {
  name: string
  purpose: string                  // what the simplification is for
  scope?: string                   // what's inside the boundary
  exclusions?: string[]            // considered and deliberately left out
  status: "draft" | "proposed" | "validated"
  version: string
  derivesFrom?: string             // solution graph → model graph file
  nodes: OntologyNode[]
  edges: OntologyEdge[]
  competencyQuestions: string[]
  rules: string[]
}
```

## Lean profile

Omit every optional field that is trivially unknown: `ownerId`, `validFrom`/`validTo`, `confidence`, `evidenceIds`, `description`. Keep what evidence actually produced. `version` stays (default `"0.1.0"`); `properties` stays (often `{}`). `status` values are honest, never decorative — see SKILL.md § Construction.

Graph `status` lifecycle: `draft` while the grill runs, `proposed` when emitted, `validated` only after the first attack (or repair) reports back from reality.

## Shape conventions

The vocabulary is a menu, not a checklist. These conventions cover shapes that need a decision to stay consistent:

- **Model node.** Exactly one per model graph — the root the core hangs from via `part_of`. It carries the name; `purpose` says what the simplification is for; `exclusions` records what was considered and deliberately left out.
- **State machines.** `State` nodes (`part_of` their `Entity`) joined by `transforms`/`causes` edges; edge `properties` carry `{ event, guard }`.
- **Forces.** External pressures are `Force` nodes with `affects`/`constrains` edges pointing inward at the system or model.
- **Tradeoffs.** A `Tradeoff` node with `affects` edges to both sides; edge `properties` name the axes (`{ gain: "…", cost: "…" }`). Reified as a node because a trade is n-ary, not a pair.
- **Events vs Actions.** Things that happen to the system are `Event`s; things agents do are `Action`s.
- **Invariants.** Hard "must never happen" statements live in `rules[]`, referencing node ids where they bind (e.g. `"at-most-one capture per n-intent"`). Softer bounds are `Constraint` nodes.
- **Formal content.** Rates, distributions, equations ride in `properties` and `rules` — the graph holds the shape; the mechanics live there (e.g. a queue's `properties: { arrivalProcess: "Poisson(3/min)" }`).
- **Audit verdicts.** Edges from the solution's `System`/`Architecture` node to each `Problem`: `satisfies` (fits) / `constrains` (partially fits) / `blocks` (fights), with `confidence` and `rationale`.

## Cross-graph linkage

The solution-direction graph relates to the model graph in two places, and only two:

- Graph level: `derivesFrom` names the model graph **file** (`"<slug>.model.json"`).
- Node level: `sourceIds` on a solution node lists **node ids in the model graph** it responds to (a Goal pointing at the `Problem`, a Requirement pointing at the rule-bound `Entity`, and so on).

No other cross-references. Each file must lint on its own: every edge's endpoints exist within the same file; no cycles in `derives_from`/`supersedes`; competency questions answerable by walking that file's nodes and edges.

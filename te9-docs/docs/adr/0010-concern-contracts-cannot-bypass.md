# Every concern ships a contract the LLM cannot bypass

Grill addition, 2026-10-30: each of the four concerns (composition, style,
wayfinding, content) carries not only its Concern spec (the normative reference —
CAN/CANNOT/gate checks) but also a **Concern contract**: the paste-able block of
MUST-rules the LLM is obliged to hold while working that concern. "Cannot bypass"
is enforced architecturally, not nominally: the review gate passes a document only
when all four contracts hold, and the workflow requires the relevant contract to be
loaded at the moment the concern is touched.

The pattern is not new to the suite — it generalizes the existing LLM AUTHORING
CONTRACT comments embedded in every template ("The LLM assembles; it does not
redesign"). Those head comments are the contracts' per-type compilation: BLOCK
GRAMMAR and SECTION ORDER are the composition contract instance, COLORS is the
style contract instance, the navigation requirements are the wayfinding contract
instance, IRON RULES carry the content contract. FRAMEWORK.md defines the four
contracts once; template head comments compile them per type.

Considered and rejected: advisory specs without binding blocks (nothing forces
conformance at the moment of work), and runtime enforcement fantasies (a prose
skill has no interpreter — the gate is the enforcement point, by design).

Consequence: the review gate becomes the four-lens, four-contract pass; extension
runs load FRAMEWORK.md's contracts directly; production runs receive them via the
template they instance. Missing or violated contract = gate fails, document does
not ship.

# Composition's canon is the ten-principle table, enforced by do/don't rules with code examples

Grill verdict, 2026-10-30: Composition's principle list is the suite's existing
**ten-principle conformance table** (hierarchy, similarity, proximity, continuity,
closure, figure–ground, common region, symmetry & order, Prägnanz, common fate) —
not Robin Williams' CRAP-4, which is demoted to a teaching mnemonic for the core
four. Considered and rejected: CRAP-4 as canon (too coarse to judge a finished
layout — no closure, figure–ground, or common fate), and a dual-inventory split
(generation grammar vs review grammar) — rejected because two lists invite
drift; there is one canon, used at both authoring and review time.

Additional requirement: every principle in the table must carry **explicit,
code-backed conformance rules for composition runs** — what the LLM can do and
what it can not do, each with HTML/CSS examples drawn from the suite's own
templates. Shape follows the script-whitelist precedent: normative, example-
grounded, citing real template code rather than inventing fresh patterns.

Consequence: the spec exists as `references/COMPOSITION.md` in the skill (settled
in-session, Q6) — one section per principle, each with a fixed anatomy: principle
in one sentence → CAN (rule + code quoted from a real template, with file citation)
→ CANNOT (same) → Gate check (one line). Normative language: MUST/SHOULD/MAY per
RFC 2119. SKILL.md cites it as the Composition lens's normative spec; the review
gate inspects against the ten principles, not CRAP.

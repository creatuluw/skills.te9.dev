## Evals

`evals/evals.json` bevat prompt-cases (agentskills.io-formaat): prompt +
expected_output + assertions. De loop:

1. Draai elke case **met** en **zonder** dit skill in een schone sessie; bewaar
   outputs onder een workspace `iteration-N/<case>/with_skill|without_skill/`.
2. Grade per output elke assertion in `grading.json` (PASS/FAIL + concreet
   bewijs — citeer de output). Mechanische checks (bestaat, geldig JSON,
   tellingen) doe je met een script, de rest met oordeel.
3. Aggregeer met `node evals/grade.mjs --workspace <iteration-map>` →
   benchmark.json met pass-rate en delta (with vs without).
4. Itereer: faalt een case zonder het skill maar slaagt mét — daar zit de
   waarde. Assertions die altijd slagen in beide runs zijn ruis: verwijder ze.
   Promoot echte misses (productie of review) naar nieuwe cases.

---
name: add-evals-to-skill
description: Add a structured eval setup to an existing agent skill (agentskills.io spec). Analyzes the target skill, scaffolds an evals/ folder with a runner plus cases, and appends an Evals section to its SKILL.md. Covers both script-driven skills (deterministic contract + executable evals) and instruction-driven skills (prompt/expected/assertion cases run with vs without the skill). Use when asked to add, create, or improve evals for a skill, or to make a skill testable/verifiable.
license: Apache-2.0
metadata:
  author: te9
  version: "1.0"
compatibility: Requires Node 20+. For live/executable evals the target skill's own dependencies must be resolvable from where the evals run.
---

# add-evals-to-skill — give a skill a feedback loop

An eval suite that always passes tells you nothing; the goal is evals that
**change what ships**: a failing eval must point at a concrete fix in the
skill (an instruction, a script, a template). This skill adds that loop to
any existing skill.

## Workflow

1. **Analyze** — `node scripts/analyze.mjs --skill <dir>` reports the target's
   shape: spec compliance (frontmatter, name↔dir), flavor, existing evals.
   Fix spec violations first — evals can't rescue an invalid skill.
2. **Design before scaffolding** — decide the eval cases from the skill's real
   failure modes, not from a template. Read [references/EVAL-DESIGN.md](references/EVAL-DESIGN.md)
   for the full guide. The short version:
   - **Deterministic first.** Every check a script can make (exit codes, file
     exists, valid JSON, structure, negative cases that must fail) is a script
     case. LLM-judge only what is genuinely semantic.
   - **Start with 2-3 real cases.** Vary phrasing/complexity; include one edge
     or adversarial case and one negative case (bad input must be rejected).
   - **Name failure modes concretely** ("output file missing axis labels",
     not "quality"): each case guards a named failure with evidence.
   - **Judge rules** (if used): pass/fail over scores, criteria as explicit
     SAFE/UNSAFE-style lists, reasoning INSIDE the JSON verdict, calibrate
     once against your own judgment, and distrust an always-pass judge.
3. **Scaffold** — `node scripts/scaffold.mjs --skill <dir> [--force]` writes:
   - script-skill flavor → `evals/run.mjs` + `evals/cases.mjs` skeleton
     (spec case + script-contract case + negative-case placeholder) + `fixtures/`
   - instruction-skill flavor → `evals/evals.json` (prompt + expected_output +
     assertions per the agentskills.io format) + `evals/grade.mjs` grader
   - appends an `## Evals` section to the target SKILL.md (what to run, when,
     and how to extend)
   The skeleton is a starting point — **replace the placeholders with the real
   cases you designed in step 2**.
4. **Run & prove** — run the generated suite; every case must pass on the
   current (assumed-good) skill, and the negative cases must fail when fed bad
   input. An eval that can't fail is decoration.
5. **Iterate like the sources prescribe** — rerun after every skill change;
   promote real misses into new cases ("add the smallest case that would have
   caught it"); prune assertions that always pass in both with-skill and
   without-skill runs; for instruction skills, compare with-skill vs
   without-skill and track the delta (pass-rate, time, tokens).

## Flavor decision

| Target has… | Flavor | Eval shape |
|---|---|---|
| `scripts/` with executable logic, templates, a build pipeline | script-skill | contract checks (spec, structure), executable runs, negative fixtures, optional judge on outputs |
| Only SKILL.md instructions (agent follows them) | instruction-skill | `evals.json` prompt cases with expected_output + assertions; runs with vs without the skill; graded by `grade.mjs` + judgment |
| Both | script-skill suite for the machinery + a few evals.json cases for the instructions | |

## Pitfalls (all hit in practice)

- **Path resolution**: eval scripts must resolve inputs against the CWD (where
  they are run from), and their own skill's assets against the script dir —
  never mix the two. Third-party deps (e.g. Playwright) come from the target
  project: use `createRequire(process.cwd() + '/package.json')`.
- **Missing data ≠ failure**: when evals scan for real artifacts, a missing
  artifact should SKIP (reported, not red) so the suite survives on machines
  without that data — but a present-but-broken artifact is a FAIL.
- **LLM-judge plumbing** (if the target environment has an LLM endpoint):
  request field names follow the endpoint's contract (camelCase vs snake_case
  bites); reasoning models can burn the whole token budget on hidden reasoning
  (`finishReason: length`, empty content) — disable reasoning or raise the
  budget; prose-before-JSON breaks json mode — demand the reasoning INSIDE the
  JSON object.
- **Assertion discipline**: assertions must be verifiable from the output
  alone, specific, and countable. "Output is good" is not an assertion;
  "contains exactly 3 recommendations" is. Add assertions only AFTER a first
  real run showed you what good output looks like.
- **Never scaffold blind**: if analyze reports the skill already has evals,
  extend them (add cases) instead of regenerating — unless the user says otherwise.

## Files

- `scripts/analyze.mjs` — target analysis (spec check + flavor detection)
- `scripts/scaffold.mjs` — evals/ generator + SKILL.md section inserter
- `references/EVAL-DESIGN.md` — the evaluation design guide (source-distilled)
- `evals/` — this skill's own evals: fixtures + suite proving analyze/scaffold
  work; run them after changing this skill

## Evals

`evals/` bewaakt dit skill zelf (analyze + scaffold + gegenereerde suites).
Draai vanuit de skill-map:

```bash
node evals/run.mjs
```

Exit 0 = geen FAIL. **Draai na elke wijziging aan analyze/scaffold/templates.**
Nieuwe cases ontstaan uit echte misses: voeg de kleinste case toe die de miss
de volgende keer had gevangen. Zie evals/cases.mjs.

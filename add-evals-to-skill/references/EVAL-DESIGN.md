# Eval design for skills — distilled guide

Sources distilled: OpenAI *evaluation best practices*, agentskills.io
*evaluating-skills*, Evidently *LLM evaluation framework*, arXiv 2506.13023
*Rudd et al., A Practical Guide for Evaluating LLMs*, LangChain *LLM Evals:
the feedback loop*, plus session-proven practice from building evals for a
real pipeline skill (DOM-snapshot demo tours).

## The one rule

An eval earns its place only if its failure would **change what ships** — a
fix in an instruction, a script, or a template. A suite that always passes is
decoration; a score that never becomes a dataset example, a check, or a fix
is a dashboard toy.

## What are we even evaluating?

Skills are mostly **deterministic pipelines plus instructions** — the
nondeterminism sits in (a) the live environment/data the skill operates on,
(b) the agent's choices while following the instructions, and (c) generated
output quality. Map each source of nondeterminism to an eval:

| Nondeterminism | Eval shape | Grader |
|---|---|---|
| Script/template contracts | static checks + negative fixtures | deterministic (code) |
| Real environment behavior | executable run of the real thing | deterministic assertions |
| Instruction-following | prompt cases, run with vs without the skill | assertions + judgment/LLM |
| Output quality (semantic) | rubric judge | LLM-as-judge, pass/fail |

Deterministic first: every check a script can make is a script check —
cheaper, faster, and unanimous. Judges are for the genuinely semantic rest.

## Dataset rules (what cases to write)

- Start with 2-3 real cases. Grow from **observed misses**, never from
  speculation. Promote production failures and review complaints into cases.
- Vary phrasing/detail/formality — instructions must survive sloppy users.
- Always include: one **edge/adversarial** case and one **negative** case
  (bad input must be *rejected*, loudly — silent acceptance is the worst bug
  class).
- The 5 D's (Rudd et al.): **D**efined scope, **D**emonstrative of production,
  **D**iverse, **D**econtaminated (not just examples the model already knows),
  **D**ynamic (cases are a living set).
- Happy-path / edge / adversarial are three different datasets (Evidently);
  a case belongs to exactly one.

## Grader rules

- **Code/functional evaluators** catch: invalid JSON, missing files, wrong
  exit codes, exact structure, counts. Use them everywhere possible; they're
  unanimous and reusable across iterations.
- **LLM-as-judge**: binary or few-label pass/fail beats open scoring; write
  criteria as explicit lists (SAFE when…, UNSAFE when…); put the judge's
  reasoning INSIDE the JSON verdict (prose-before-JSON breaks json mode);
  beware verbosity/position bias; **calibrate once** against your own labels
  before trusting it; a judge that never fails is not discriminative — fix
  the rubric or the case.
- **Assertions** (agentskills.io): verifiable from the output alone,
  specific, countable. "Output is good" ✗; "contains exactly 3
  recommendations" ✓. Write assertions AFTER the first real run showed you
  what good looks like.
- **Evidence required**: a PASS cites the output (quote/reference). No
  benefit of the doubt.
- Assertion hygiene after each iteration: remove ones that pass in both
  with- and without-skill runs (they measure the model, not the skill);
  fix ones that fail in both (broken assertion or impossible ask); study the
  pass-with/fail-without set — that is the skill's actual value.

## With/without baseline (instruction skills)

Run each case **with the skill** and **without** (or against the previous
version — snapshot it). Record `timing.json` (tokens, duration) per run;
aggregate pass rates + deltas in `benchmark.json`. The delta tells you what
the skill costs (time, tokens) and what it buys (pass rate). If pass-with ≈
pass-without, the skill isn't earning its context window — fix or delete.

## Non-determinism & robustness

- Run flaky-suspect cases n times and look at variance before blaming the
  skill (Rudd et al. §4.1); report means with spread, not single runs.
- Judge the *thread/outcome*, not one pretty reply (LangChain): a demo that
  plays perfectly but ends on the wrong screen fails as a whole.

## Anti-patterns (all sources agree)

Generic borrowed metrics; vague criteria ("usefulness"); one mega-judge;
designing evals in theory without looking at real outputs; "it seems to
work"; waiting until after ship; keeping always-green suites; scores nobody
acts on.

## War stories from a real pipeline skill

- Eval-runner paths: resolve user inputs against **CWD**, skill assets
  against the **script dir**, third-party deps via
  `createRequire(process.cwd() + '/package.json')`. Mixing these is the #1
  scaffold crash.
- Missing artifacts → **SKIP** (not FAIL) so suites survive on other
  machines; present-but-broken → FAIL.
- LLM endpoints have their own request contract (camelCase vs snake_case);
  reasoning models can burn the entire `maxTokens` on hidden reasoning
  (`finishReason: "length"`, empty content) — disable reasoning or budget
  for it; json mode + "explain first" instructions = unparseable output.
- Fixture naming must match real conventions exactly (an assets→steps
  mapping by filename replace broke on `mini-assets.json`).
- The loop works: an LLM judge flagged a thin narration line; fixing it and
  re-running took minutes and measurably improved the artifact. Build evals
  that make that loop cheap.

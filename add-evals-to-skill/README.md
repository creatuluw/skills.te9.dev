# add-evals-to-skill

Ever shipped a skill that "seemed to work"? You tried it once, it did the
thing, done. But will it still work next month, after you changed that one
script? Or on a colleague's machine? That's the gap this skill closes: it
gives any existing skill a proper eval setup, so you can prove it works
instead of hoping it does.

## What you get

Point it at a skill directory and it does three things:

1. Checks the skill against the [agentskills.io](https://agentskills.io/specification)
   spec (frontmatter, naming, size) and tells you what to fix first.
2. Generates an `evals/` folder that fits the skill's flavor:
   - **Script skills** (the skill ships scripts or templates) get a runner
     with deterministic checks, a negative case, and a contract case.
   - **Instruction skills** (just a SKILL.md with instructions) get
     `evals.json` prompt cases with assertions, plus a grader that
     aggregates with-skill vs without-skill results into a benchmark.
3. Adds an `## Evals` section to the skill's SKILL.md, so whoever uses it
   next knows how to run and grow the suite.

## When do you use it?

- You built a skill and want to know it actually works. (That's most days.)
- You changed a script, template, or instruction and don't want to break
  things quietly.
- You inherited someone's skill and need a safety net before touching it.
- Your evals went stale and need a fresh, honest start.

## How this skill was created

This one has a fun origin story, because it came straight out of real work.

We had just built `app-tour-demo`, a skill that creates pixel-perfect demo
players for web apps. Nice skill, but how do we know it keeps working? So we
added evals to it: static checks, a live test that plays the whole demo, and
an LLM judge with a rubric. The judge even caught a weak subtitle for us.
That's when it clicked - an eval that changes what you ship is worth ten
that just produce a score.

Then we studied five sources on evaluation (OpenAI, Evidently, LangChain, an
arXiv paper by Rudd et al., and the agentskills.io guide on evaluating
skills) and folded in every trap we hit in practice: path resolution,
missing-data handling, LLM endpoints that eat your token budget on hidden
reasoning, judges that refuse to output clean JSON... all of that went
straight into the pitfalls.

The result is this skill: the study, the session scars, and a scaffolder
that does the boring parts for you. The skeletons it generates are just a
starting point - the real cases come from your skill's actual failure modes.
Easy right?

## Try it

```bash
node scripts/analyze.mjs --skill /path/to/your-skill   # what are we dealing with?
node scripts/scaffold.mjs --skill /path/to/your-skill  # generate evals + docs
```

Then replace the TODO placeholders with real cases, run the suite, and grow
it from real misses. Full design guidance lives in
[references/EVAL-DESIGN.md](references/EVAL-DESIGN.md).

Have fun, and happy evaluating!

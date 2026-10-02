---
name: te9-writing
description: Write and rewrite prose in the friendly, tutorial-first voice of Patrick Tehubijuluw (qlikshow.com) while removing every AI-writing tell. Use when asked to write, rewrite, or de-slop blog posts, tutorials, articles, or documentation in Patrick's / the te9 style, to make text sound human instead of LLM-generated, or when editing text that shows AI tells like "delve", "it's worth noting", "not just X but Y", or "In today's fast-paced landscape". Ships a deterministic linter (scripts/lint.mjs) and evals.
license: Proprietary
compatibility: Requires Node 20+ for the linter (scripts/lint.mjs) and the eval suite (evals/run.mjs).
metadata:
  author: te9
  version: "1.0"
  style-source: my-writing-style.md
---

# te9-writing

Write and rewrite in the voice of Patrick Tehubijuluw, and never sound like an
LLM doing it. Two jobs, always together: the voice, and the de-slop.

## Load order

1. **This file** — always. It carries the workflow and the condensed voice.
2. [my-writing-style.md](my-writing-style.md) — the full style profile. Read it
   before your first write or rewrite in a session, and whenever a case below
   doesn't obviously resolve.
3. [references/anti-slop.md](references/anti-slop.md) — the unslop guardrails.
   Read it when the text contains AI tells, when the situation is not covered
   by the style profile, and before you return any final text.

## The voice in one breath

A knowledgeable colleague explaining things over coffee. Formality 3/10.
Short paragraphs (1–4 sentences), generous white space, numbered steps for
anything procedural. First person ("I think", "I often hear…"), direct "you"
address, inclusive "we". Simple everyday words, action verbs, concrete
specifics (file paths, settings, exact clicks). Explain a technical term the
moment you introduce it. Open with a hook — often a question or a small
personal moment. Close warm and encouraging: "Have fun!", "Happy designing!",
"See you soon!". Occasional light humor, never at the reader's expense.

**Never in this voice**: buzzwords ("synergy", "leverage", "optimize",
"harness"), jargon without explanation, dense paragraphs, passive voice where active is
clearer, lectures, negativity, abrupt endings.

The full markers, metrics, sample phrases, and dos/don'ts live in
[my-writing-style.md](my-writing-style.md). Use its appendix phrases as
patterns, not as a fill-in-the-blank template.

## Workflow: rewrite existing text

1. **Lint first.** Run the linter on the source before you touch anything:

   ```bash
   node scripts/lint.mjs <file-or-text>        # human report
   node scripts/lint.mjs --json <file>          # machine-readable
   ```

   Exit 1 means hard AI tells; advisories are style review points. This is
   your diagnosis pass — every hard hit is a span that must not survive.

2. **Read for facts.** List what must survive byte-for-byte in spirit: facts,
   numbers, dates, names, quotations, citations, code, links, units, scope,
   attribution, and any hedged uncertainty.

3. **Rewrite in the voice.** Rebuild the piece following the style profile:
   hook → context → body with headers → numbered steps where procedural →
   encouraging close. Transform tone and structure freely; transform facts
   never.

4. **Lint your output.** It must exit 0 on hard findings. Advisories are
   judgment calls — resolve each one explicitly (fix it, or say why it stays,
   e.g. "robust" quoted from the source).

5. **Self-check, then return** the rewritten text only — no commentary, unless
   the user asked for analysis too.

## Workflow: write new text

Read [my-writing-style.md](my-writing-style.md), draft following the document
structure pattern (hook, context, headers, steps, links/downloads, encouraging
close), run the linter on your draft, fix, return. If the topic is outside
Patrick's usual domains, keep the voice and swap the domain examples — the
style is about how he teaches, not what he teaches.

## Preservation rules (non-negotiable)

- Never invent facts, numbers, dates, quotes, or sources that aren't in the
  original.
- Never invent specific personal experiences. Generic first-person framing
  ("I often hear…", "I think…") is fine; "Last Tuesday I…" is fabrication.
- Keep force-bearing "never", "must", "all" exactly as strong as the source
  states them, in safety, security, legal, and technical passages.
- Attributed claims stay attributed. If a claim conflicts with the rest of the
  source, keep both and state the conflict — don't quietly pick a winner.
- Links, code blocks, and downloads stay in the text (screenshots and files
  can be referenced where the original had them).

## Unknown situations: precedence

When the style profile and the anti-slop rules seem to collide, or the
situation isn't covered, resolve in this order:

1. The user's explicit instruction.
2. A **documented** Patrick pattern from the style profile (e.g. his
   encouraging closings and question hooks are genuine style, not AI tells).
3. The [anti-slop guardrails](references/anti-slop.md).
4. The plainest possible English.

One absolute floor below all four: **hard AI tells never ship**, whatever the
precedence says above. If the only way to keep a documented pattern is to emit
a hard tell, drop the pattern.

## Edge cases

- **Source is already in Patrick's style**: don't churn it. Lint, fix only
  real findings, keep the rest as-is. A rewrite that changes good prose has
  failed.
- **Source is formal/corporate (announcement, docs)**: keep facts and
  register-appropriate restraint; you can't force "Have fun!" onto a security
  advisory. Bring the structural virtues (short paragraphs, active voice,
  concrete steps, no jargon) and dial the playfulness to what the genre bears.
  When unsure, ask the user how much voice they want.
- **Quoted or technical text**: phrases inside quotes, code fences, or cited
  passages are examples, not prose to fix — leave them, the linter masks them.
- **Non-English source**: ask before rewriting; the profile is English.
- **Empty or whitespace-only input**: say so and stop; there is nothing to
  rewrite.

## Linting

`scripts/lint.mjs` (zero dependencies, Node 20+) scans text for two tiers:

- **Hard** — AI tells that must never ship (throat-clearing, filler,
  jargon/AI vocabulary, "not just X but Y" parallelisms, colon reveals, vague
  attributions, generic conclusions, chat artifacts, …), distilled from
  [references/anti-slop.md](references/anti-slop.md).
- **Advisory** — review points (em-dashes, long sentences, uniform sentence
  length, long paragraphs, passive-voice density, wordy phrases).

Code fences, inline code, quoted spans, and blockquotes are masked before
scanning. Note: `references/anti-slop.md` quotes tell phrases as a catalog —
linting it flags by design; it is reference material, not prose to fix.
Exit codes: `0` clean, `1` hard findings (`--strict` also fails advisories),
`2` usage error. Use it on sources, drafts, and final output.

## Evals

```bash
node evals/run.mjs          # deterministic contract suite (linter + spec)
node evals/run.mjs --suite static
```

Exit 0 = all pass. `evals/evals.json` holds instruction-level cases (rewrite
prompts + countable assertions) to run with vs without the skill when judging
voice quality by hand or with an LLM endpoint. After any change to SKILL.md,
the guardrails, or the linter: rerun the suite, and promote real misses into
the smallest new case that would have caught them.

## File map

| File | Role |
|------|------|
| `my-writing-style.md` | Full style profile of Patrick Tehubijuluw |
| `references/anti-slop.md` | Unslop-derived guardrails; read for AI tells and unknown situations |
| `scripts/lint.mjs` | Deterministic hard/advisory linter |
| `evals/` | Contract suite + instruction cases + fixtures |

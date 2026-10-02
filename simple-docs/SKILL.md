---
name: simple-docs
description: Document processes, flows, and events as navigable node trees — every node annotated with the files and functions that implement it, wrapped in a plain-language self-contained HTML doc. Use when asked to "document this flow/process/event", "make a node tree", "explain step by step with file refs", "simple-docs", or when tracing how a click, request, or event travels through a codebase for documentation.
---

# simple-docs

Turn a traced process into two artifacts: a **node tree** (in chat) and a **self-contained HTML doc** (plain-language walkthrough + tree panel). The tree is the map; the writing is for readers who never open the code.

## The rule: trace first, draw second

Read the actual code end to end — every node must resolve to a real `file → function` you have opened. A guessed node is a broken map. Follow the event from trigger to final state: UI → client → route → service → write → UI update. Errors, gates, and dev-only branches are first-class nodes, never footnotes.

## Workflow

1. **Trace** the event through the codebase (grep, read, follow every branch).
2. **Draw the node tree in chat** — anatomy below. This is always shown, even if only the doc was asked for.
3. **Fill `template.html`** (sits beside this file) and write it to the target repo's `docs/` (or where the user asks). Open with show_in_browser and say what to review.
4. **Recap in 3 lines max** — what was documented, where it lives, what was skipped.

## Node tree anatomy

```
Event in plain words ("Click Indienen on /apps/…")
│
├─ What happens at this step, in plain words
│     path/to/File.svelte → functionName()        ← mono ref line
│       · the one non-obvious detail (guard, gate, freeze)
├─ Branch: what happens when a gate fails
│     path/to/service.ts → gateFunction()
└─ Final state (badge flips, button disappears, row written)
```

Rules:

- Node label = plain language, one line. No jargon in the label; jargon goes in the ref.
- Ref line = `path → function` in mono, directly under its node. Folder paths may be shortened to `…/` once the root is clear.
- `·` bullet = the sharp detail worth remembering (a guard, an order, an invariant).
- Errors get their own branches — always draw the failure paths.
- Every leaf must be a real location. Grep if unsure; never cite from memory.

## Writing style (the explainer voice)

- Walkthrough prose is **plain language**: a colleague outside the codebase follows it without opening an IDE. Zero tech jargon in sentences — the tech lives in the tree and ref lines only.
- Short sections. Serif display headings. Numbered steps, one idea per step. Sentences before bullet walls.
- Match the target app's language (Dutch UI → Dutch doc). Hyphens, never em-dashes.
- State what does **not** happen too ("no email is sent") — negative facts prevent wrong assumptions.

## Doc structure (template.html carries it)

1. Kicker (repo pill + area) → serif title → one-sentence lede.
2. Node tree panel — the full tree in mono, refs styled, hot path in the accent color.
3. Step-by-step — number badge, plain title, 1–3 sentences, mono ref line under each.
4. "Good to know" — limits, dev-only paths, negative facts.

## Template and portability

`template.html` beside this file carries the design tokens (ivory `#FAF9F5`, slate `#141413`, clay accent, serif display / sans body / mono meta, 1.5px bordered white panels, numbered step rows). Copy it, fill it, don't restyle it. Self-contained always: system fonts, no fetch, no external JS, embed data inline. Resolve the template path and the output path against the **caller's CWD**, not the skill directory.

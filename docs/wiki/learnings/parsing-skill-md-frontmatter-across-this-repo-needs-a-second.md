---
type: Learning
title: Parsing SKILL.md frontmatter across this repo needs a second pass
description: "Enumerating skills in this repo by globbing `SKILL.md` and parsing frontmatter needs two passes:"
tags: [skills, yaml, frontmatter, inventory]
timestamp: "2026-10-02T10:30:15.695Z"
---

# Parsing SKILL.md frontmatter across this repo needs a second pass

Enumerating skills in this repo by globbing `SKILL.md` and parsing frontmatter needs two passes:

- **Block scalars break naive parsers** — ~20 of ~95 `description:` fields use YAML block scalars (`|` / `>`); a line-oriented frontmatter parse silently returns nothing/empty for them.
- **Not all skills sit at one level** — collections like `matt-pocock*` nest members below a top-level dir; `commands/` and `tasks/` dirs also didn't surface on the first pass.
- **Real inventory is ~95 skills**, not the 16 the old README listed. Use the README routing index (commit `7333a61`) or `skills-lock.json` as the source of truth for what exists.

Matters for any future tooling that inventories skills (locks, evals, index generation).

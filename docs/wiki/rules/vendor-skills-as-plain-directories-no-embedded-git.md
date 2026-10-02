---
type: Rule
title: Vendor skills as plain directories — no embedded .git
description: Guideline
tags: [git, vendoring, repo-convention]
timestamp: "2026-10-02T10:27:25.679Z"
---

# Vendor skills as plain directories — no embedded .git

## Guideline

When adding an external skill or repo into this collection, commit it as **plain files** — delete the cloned-in `.git` first (or copy without history). Never commit a directory that still contains its own `.git`.

## When it applies

- Any vendored skill directory in the repo root.
- Applies to whole multi-skill collections too (e.g. `council-of-high-intelligence/`, 686 files re-vendored 2026-10-02).

## Rationale

An embedded `.git` makes git record the directory as a **gitlink** (mode 160000). A push then contains only the pinned commit SHA — the skill's contents never reach GitHub, and the remote shows an empty pointer. Hit in practice with `council-of-high-intelligence/`: pushed as a gitlink, contents invisible on the remote until the `.git` was removed and files re-committed (commit `6968444`, 2026-10-02). Same cleanup removed inner `.git` dirs from `godaddy-cli`, `img2threejs`, `matt-pocock`, `matt-pocock-skills`.

## Edge cases

- Clones **outside** the repo (e.g. the gitignored `~/.skills/` accidental clone) were deliberately left untouched — deleting an out-of-repo clone's `.git` loses its history; ask before removing those.
- Quick check before pushing a new vendored dir: `git ls-files -s <dir>` must not show mode `160000`, and `find <dir> -name .git` must be empty.

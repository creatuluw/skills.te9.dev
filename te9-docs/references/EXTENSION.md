# Extension protocol — how the suite grows

The suite grows **autonomously**: a session that needs a document type not in
the catalog composes a first document of that type, registers the type, and
bumps the version without asking. No proposal step, no staging area. This is
ADR-0006 (`docs/adr/0006-autonomous-extension.md`), carried into the v2 compose
edition (ADR-0011): extending no longer means building a template file — it
means writing a new type's contract into the catalog.

## Why autonomous

Every extension already passes the full conformance discipline — Clay tokens,
self-describing content from the suite brief, whitelist compliance, the
four-lens review gate — which is reviewed continuously anyway. An approval
round-trip on a *proposal* is weaker evidence than review of a *finished
document*, and it stalls real work mid-session. Misfits are discovered in the
wild and fixed or removed after the fact; the version history is the audit
trail.

## The steps (all mandatory, in order)

1. **Ground in the catalog.** Confirm via `assets/index.json` and the
   heuristics in `references/TYPES.md` that no existing type covers the need.
   Overlap means reuse, not a new type.
2. **Compose the first document of the new type.** BASE-CSS verbatim, a new
   contract block (task, format, hierarchy, section order, block grammar, iron
   rules, voice), self-describing placeholder content (source:
   `references/SUITE-BRIEF.md`), under Clay discipline. Pass the review gate.
3. **Register the type.** Add the contract block as a section to
   `references/TYPES.md` (next number), one row to its heuristics table, and
   one entry to `assets/index.json`: `slug` + `description` (one line, what it
   produces + when to use).
4. **Version.** Bump `suite-version` in SKILL.md metadata and SUITE-BRIEF.md:
   new type = MINOR; fix to an existing type/convention = PATCH; breaking
   change = MAJOR.
5. **Changelog.** Prepend one line to `CHANGELOG.md`:
   `## [X.Y.Z] - YYYY-MM-DD` + one sentence on what was added/changed and why.

## Removal / demotion

Any type can be edited or removed after the fact (delete its TYPES.md section,
heuristics row, and catalog entry). Removals bump MAJOR (a type disappearing
is breaking for anyone who referenced it) and get a changelog line.

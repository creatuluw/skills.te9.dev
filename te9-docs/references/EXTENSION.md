# Extension protocol — how the suite grows

The suite grows **autonomously**: a session that needs a document type not in the
index builds it, registers it, and bumps the version without asking. No proposal
step, no staging area. This is ADR-0006 (`docs/adr/0006-autonomous-extension.md`).

## Why autonomous

Every extension already passes the full conformance discipline — Clay tokens,
self-describing placeholder content from the suite brief, whitelist compliance,
the quality gates — which is reviewed continuously anyway at each template's
browser gate. An approval round-trip on a *proposal* is weaker evidence than
review of a *finished template*, and it stalls real work mid-session. Misfits are
discovered in the wild and fixed or removed after the fact; the version history
is the audit trail.

## The steps (all mandatory, in order)

1. **Ground in the index.** Confirm via `assets/templates/index.json` that no
   existing type covers the need. Overlap means reuse, not a new type.
2. **Build the Template.** A finished full-HTML document with realistic
   self-describing placeholder content (source: `references/SUITE-BRIEF.md`),
   under Clay discipline, tokens verbatim from `references/CLAY-STYLE.md`.
   Filename: `NN-slug.html`, next number in sequence.
3. **Register.** Add one entry to `assets/templates/index.json`: `slug`, `file`,
   `description` (one line, what it produces + when to use).
4. **Version.** Bump `suite-version` in SKILL.md metadata and SUITE-BRIEF.md:
   new type = MINOR; fix to existing template/convention = PATCH; breaking
   change = MAJOR.
5. **Changelog.** Prepend one line to `CHANGELOG.md`:
   `## [X.Y.Z] - YYYY-MM-DD` + one sentence on what was added/changed and why.
6. **Review gate.** Show the new template in the browser before using it to
   produce the user's actual document.

## Removal / demotion

Any template can be inspected, edited, or deleted after the fact. Deletions bump
MAJOR (a type disappearing is breaking for anyone who referenced it) and get a
changelog line.

# The suite grows autonomously: extensions register themselves without asking

When a production session needs a document type the suite doesn't have, it builds
a new Template immediately — Clay-conformant, self-describing placeholder content,
script-whitelist compliant, passing the quality gates — registers it in the suite
index, and bumps the suite version. No proposal step, no staging area, no
pre-registration approval. The user encounters the new type via the index (and the
skill's own documentation of recent extensions) in a later session.

Why the opposite of the obvious gate-first protocol (html-docs' "propose and wait",
or a manual promotion gate): every extension already passes the full conformance
discipline (Clay, self-describing content, quality gates) — the same discipline
every launch template passes, which the user reviews continuously anyway during
waves. An extra request-approve round-trip bought nothing extra: the plan could not
be evaluated better than the finished artifact. Autonomy keeps real work moving
without blocking on a design conversation mid-session.

## Considered Options

- **Session-approved extension (html-docs "propose structure, wait for approval")** —
  rejected: approval of a *proposal* is weaker evidence than review of a *finished
  template*, and it stalls real sessions mid-work.
- **Staging + manual promotion** — rejected: second ceremony, no added guarantee —
  the user can inspect, demote, or delete any registered template at any time.

## Consequences

- The suite index changes without warning: sessions must not assume a static
  template set; consult the index at each run.
- Misfits are discovered in the wild rather than pre-screened — acceptable because
  every template remains user-inspectable, editable, and removable after the fact.
- The changelog/version bump on every extension becomes the audit trail of
  autonomous growth.

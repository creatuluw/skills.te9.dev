# OKF Spec Reference

Normative summary of Open Knowledge Format v0.1, plus the recommended v0.2
trust fields. Sources: [okf.md/spec](https://okf.md/spec/),
[Google Cloud announcement](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing),
[GoogleCloudPlatform/knowledge-catalog SPEC.md](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).

## Terminology

- **Knowledge Bundle** — the directory tree; the unit of distribution
  (git repo, tarball, or subdirectory of a larger repo).
- **Concept** — one unit of knowledge = one `.md` file (a table, API,
  metric, runbook, policy, …).
- **Concept ID** — file path minus `.md` (`tables/orders`).
- **Frontmatter** — YAML block delimited by `---` lines at the top of the file.
- **Body** — everything after the frontmatter.
- **Link** — markdown link between concepts; untyped directed edge.
- **Citation** — numbered link to an external source backing a claim.

## Bundle structure

```
my-bundle/
├── index.md            # optional, reserved: directory listing
├── log.md              # optional, reserved: change history
├── <concept>.md
└── <subdir>/
    ├── index.md
    ├── log.md
    └── <concept>.md
```

`index.md` and `log.md` are the only reserved filenames and MUST NOT be used
as concept documents. Directory layout is domain-independent — organize
however fits the knowledge.

## Frontmatter

```yaml
---
type: <Type name>        # REQUIRED, non-empty, free vocabulary
title: <display name>            # recommended
description: <one-line summary>  # recommended
resource: <URI of underlying asset>  # recommended; absent for abstract ideas
tags: [tag1, tag2]               # recommended
timestamp: 2026-09-25T10:00:00Z  # recommended, ISO 8601
# any other producer-defined keys are allowed
---
```

Rules:

- Type values are NOT registered centrally. Choose descriptive,
  self-explanatory values (`Table`, `BigQuery Table`, `Metric`, `Runbook`).
  Agree on conventions within your org before two teams invent
  `Table` vs `BigQuery Table` for the same thing.
- Consumers MUST preserve unknown keys on round-trip and MUST NOT reject
  documents with unrecognized fields.
- `resource` accepts any URI scheme (`postgresql://…`,
  `bigquery://project.dataset.table`, console URLs, ARNs).

### v0.2 trust fields (recommended, not required)

```yaml
sources:
  - resource: https://example.com/spec
    id: some-spec
    title: Some specification, v2
    last_modified: 2026-07-25
generated: { by: human:jane, at: 2026-07-31T12:00:00Z }
verified:
  - { by: process:ci-lint, at: 2026-07-31T12:05:00Z }
status: draft        # open vocabulary: draft | stable | deprecated | …
stale_after: 2026-12-31
```

- `generated.by` / `verified.by` use exact lowercase prefixes:
  `human:<id>` or `process:<id>`.
- `generated` = who produced content; `verified` = who confirmed it.
  Authorship and verification stay separate.
- `status: deprecated` and expired `stale_after` are trust signals, never
  validation errors.
- Claim-level citations may join to `sources[].id` via matching identifiers.
- Prefer `generated.at` over the legacy `timestamp` when updating.

## Body

Standard markdown. Prefer structural markdown — headings, lists, tables,
fenced code blocks — over free prose. Clear headings are what let a RAG/agent
jump straight to `# Schema` instead of hallucinating from a wall of text.

Conventional headings, use when applicable:

| Heading | Purpose |
|---|---|
| `# Schema` | Columns/fields of an asset (table of Column / Type / Nullable / Description) |
| `# Examples` | Concrete usage, usually code blocks |
| `# Citations` | Numbered external sources backing claims (last section) |

Domain conventions this skill adds (see EXAMPLES.md): `# Relationships`,
`# Joins`, `# Business Value`, `# Known Issues`, `# Definition`,
`# Dimensions`, `# Trigger`, `# Steps`.

## Cross-linking

- **Bundle-relative (recommended):** starts with `/`,
  e.g. `[customers](/tables/customers.md)` — stable when files move within
  their subdirectory.
- **Relative:** `[neighboring](./other.md)`.
- A link from A to B asserts a relationship; the surrounding prose says what
  kind (parent/child, FK, joins-via, depends-on). Consumers building graphs
  treat links as untyped directed edges.
- **Broken links are conformant.** They represent knowledge not yet written.
  Reference first, fill in later.

## index.md (reserved)

No frontmatter. One or more sections, each a heading + list. Entries SHOULD
quote the linked concept's `description`:

```markdown
# Tables

* [Orders](orders.md) - One row per completed customer order.
* [Customers](customers.md) - Customer master data.
```

May be generated or synthesized on the fly. Only the ROOT `index.md` may
carry frontmatter, solely to declare `okf_version: "0.1"` (or `"0.2"`).

## log.md (reserved)

Flat change history grouped by ISO 8601 date headings, newest first:

```markdown
# Update Log

## 2026-09-25
* **Create**: Added [orders](/tables/orders.md).
* **Update**: Documented FK from orders to customers.

## 2026-09-20
* **Init**: Created bundle structure.
```

Bold lead word (`Create`/`Update`/`Deprecation`) is convention, not
requirement. log.md is a hand-written CHANGELOG, not a git log replacement.

## Citations

Claims based on external material MUST be backed under a `# Citations`
heading, numbered:

```markdown
# Citations

[1] [BigQuery table schema](https://console.cloud.google.com/…)
[2] [Internal data quality runbook](https://wiki.acme.internal/data/quality)
```

Links may be absolute URLs, bundle-relative paths, or files under a
`references/` subdirectory that mirrors external material as OKF concepts.

## Conformance

A bundle is conformant with OKF v0.1 iff:

1. Every non-reserved `.md` file contains a parseable YAML frontmatter block.
2. Every frontmatter block contains a non-empty `type` field.
3. Reserved files (`index.md`, `log.md`), when present, follow the shapes above.

Consumers MUST NOT reject a bundle for: missing optional fields, unknown
type values, unknown keys, broken links, or missing index.md. Golden rule:
**if it has frontmatter with `type`, it's valid OKF.**

## Versioning

`<major>.<minor>`. Minor = backward-compatible additions. Major = breaking.
Root `index.md` may declare the target version via `okf_version`. Consumers
that don't know a version consume best-effort rather than refuse.

## Validation

Run `scripts/validate.sh <bundle-dir>` from this skill. It fails (exit 1)
if any concept lacks frontmatter or `type`, warns on missing
`title`/`description`, and exits 0 when conformant — gate CI on it.

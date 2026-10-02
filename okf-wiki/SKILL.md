---
name: okf-wiki-skill
description: >
  Build and maintain OKF (Open Knowledge Format) wikis — self-describing
  directories of markdown files with YAML frontmatter that AI agents and devs
  can navigate without an SDK. Ships ready-made concept templates for data/ERD
  documentation (tables, datasets, PK/FK relationships, metrics, dimensions,
  business value) plus API docs, runbooks, codebase architecture, ML models,
  and compliance policies. Use when the user asks to create/extend an OKF
  bundle, agent-readable wiki, knowledge base, or data catalog; document
  databases, tables, ERDs, or metric definitions for LLMs; mentions 'OKF',
  'knowledge bundle', 'LLM wiki', 'data catalog as markdown'; or wants
  cross-linked concept docs with index.md/log.md.
---

# OKF Wiki Skill

Build wikis conforming to the [Open Knowledge Format](https://okf.md/) — a
directory of markdown files with YAML frontmatter. Three rules:

1. **Every concept is one `.md` file** with frontmatter whose only REQUIRED field is `type`.
2. **`index.md`** (any directory) = listing of that directory's contents, no frontmatter.
3. **`log.md`** (any directory) = date-grouped change history, newest first.

Conformance = frontmatter with non-empty `type`; everything else is optional.
Consumers tolerate unknown fields, unknown types, and broken links — you can
reference documents that don't exist yet.

## Quick start

```markdown
<!-- my-bundle/tables/orders.md -->
---
type: Table
title: orders
description: One row per completed customer order.
resource: postgresql://prod/ecommerce/orders
tags: [revenue, core]
timestamp: 2026-09-25T10:00:00Z
---

# Schema

| Column | Type | Nullable | Description |
|---|---|---|---|
| `order_id` | UUID | no | **PK** |
| `customer_id` | UUID | no | **FK** → [customers](/tables/customers.md) |

# Relationships

- Many-to-one with [customers](/tables/customers.md) via `customer_id`.

# Citations

[1] [Migration 042](https://git.internal/db/migrations/042)
```

Link other concepts with bundle-relative links (`/tables/customers.md`).
A link from A to B asserts a relationship; the prose around it says what kind.
## Frontmatter fields

| Field | Req | Purpose |
|---|---|---|
| `type` | **yes** | Concept kind: `Table`, `Dataset`, `Metric`, `Dimension`, `API Endpoint`, `Runbook`, … free vocabulary, be descriptive |
| `title` | rec | Human-readable name |
| `description` | rec | One-liner; index.md entries quote it |
| `resource` | rec | URI of the underlying asset (absent for abstract ideas) |
| `tags` | rec | Cross-cutting categories |
| `timestamp` | rec | ISO 8601 of last significant change |
| extras | opt | `owner:`, `status:`, `stale_after:`, `sources:` — consumers preserve unknown keys |

## Workflow

1. **Scaffold** — one directory per concept family (`tables/`, `metrics/`, …); path = concept ID (`tables/orders.md` → `tables/orders`).
2. **Author concepts** — structural bodies (headings, lists, tables, fenced
   code). Conventional headings: `# Schema`, `# Examples`, `# Citations`;
   for data/ERD also `# Relationships`, `# Business Value`, `# Known Issues`
   — see [EXAMPLES.md](EXAMPLES.md).
3. **Cross-link** — every PK/FK, join, dependency, and adjacent metric gets a
   markdown link. Broken links are fine (write the reference first).
4. **Index** — generate `index.md` per directory: `* [Title](file.md) - description`.
5. **Log** — record significant changes in `log.md` under `## YYYY-MM-DD`.
6. **Validate** — run `scripts/validate.sh <bundle>` (checks frontmatter +
   `type` on every concept, exits nonzero for CI).

## Domain templates

Copy the closest one instead of inventing structure:

- **Data / ERD** (tables, datasets, metrics, dimensions, ER diagrams,
  PK/FK, joins, business value) — [EXAMPLES.md §1](EXAMPLES.md)
- **API documentation** — [EXAMPLES.md §2](EXAMPLES.md)
- **Runbooks / on-call** — [EXAMPLES.md §3](EXAMPLES.md)
- **Codebase architecture** — [EXAMPLES.md §4](EXAMPLES.md)
- **ML models & features** — [EXAMPLES.md §5](EXAMPLES.md)
- **Compliance & policies** — [EXAMPLES.md §6](EXAMPLES.md)

Full spec detail (v0.1 rules, v0.2 trust fields, citations, conformance): [REFERENCE.md](REFERENCE.md)

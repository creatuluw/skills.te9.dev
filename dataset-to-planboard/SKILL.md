---
name: dataset-to-planboard
description: >
  Analyze any dataset or data file (xlsx, xlsm, csv, json) and reverse-engineer
  it into a plan.pippeloi.nl breakdown board: detect what number is being
  distributed, which columns are dimensions, build the import JSON, validate it,
  upload it to the board API, and return the share URLs. Use when the user
  provides a spreadsheet or dataset with a distribution/breakdown/planning
  structure (hours, revenue, km, capacity, workload) and wants it turned into
  an interactive decomposition diagram / plan board.
---

# Dataset → Plan Board

Turn any hierarchical distribution dataset into a live board on
plan.pippeloi.nl (or any instance of it) via `POST /api/import`.

## Quick start

```bash
# 1. analyze the file, build board.json per TEMPLATE.md
# 2. validate
python scripts/validate_planboard.py board.json
# 3. import (base URL + admin cookie come from the user)
curl -X POST "https://plan.pippeloi.nl/api/import" \
  -H "Content-Type: application/json" \
  -H "Cookie: plan_admin=<value>" \
  -d @board.json
# 4. report the returned links.edit / links.view URLs to the user
```

## Workflow

1. **Inventory** the file (openpyxl for xlsx/xlsm, stdlib for csv/json):
   sheet names, tables, merged cells, header rows. Identify the *real* data
   sheets — skip covers, legends, and overview sheets.
2. **Identify the anatomy** — answer three questions before writing JSON:
   - **What number is distributed?** (hours? revenue? km?) → `board.total`,
     `board.unit`. State totals in the file (grand totals) beat inferred sums.
   - **Which columns/rows are dimensions?** Low-cardinality repeated labels
     (person, project, week, region) → entity types. Cardinality and the
     file's own grouping order suggest hierarchy: coarse → fine.
   - **One dimension order per level** — each value-bearing node gets at most
     ONE breakdown. Pick the navigation axis the user cares about.
3. **Map to the template** — full field spec and examples: [TEMPLATE.md](TEMPLATE.md)
4. **Validate** with `scripts/validate_planboard.py` — catches shape errors and
   reconciliation gaps before upload (API returns the same paths on 422).
5. **Import** — needs the instance URL and an admin session cookie
   (`plan_admin=...`; ask the user, or have them run the admin email-code
   login). Unbalanced trees are fine: the response reports
   `stats.reconciled` and the board shows red/green per node.
6. **Report** the `links.edit` and `links.view` URLs (plus `stats`) to the user.

## Reverse-engineering heuristics

- **Numeric columns** are value candidates; units usually hide in headers
  (`uren`, `uur`, `km`, `€`, `aantal`, `stuks`). No unit → omit it.
- **Exclude double counting**: total/subtotal rows and sentinel summary
  columns (`Totaal`, `Nog te verdelen`, `Plan in week`, `Som`) must never be
  imported as data — walk person/dimension columns only until a sentinel label.
- **Merged cells** → flatten to the top-left value (annotate if lossy).
  **Multi-line cells** → extract the signal line (e.g. `Belastbaarheid: X`).
- **Wide pivot tables** (persons × weeks matrix): choose ONE axis as the item
  dimension, aggregate the other into nested breakdowns — or ask the user
  which way they want to navigate the tree.
- Values ≥ 0, max 2 decimals; round on export.
- Ambiguous hierarchy or missing total → ask the user; don't guess silently.

## Rules

- Never invent data. Every `value` must trace to a cell/row in the source.
- Prefer few, complete levels over many sparse ones (empty items add noise).
- `types[]` only for NEW dimensions; existing slugs (project, week, employee,
  ticket, spec, …) are referenced by slug alone.
- Report import stats honestly: `open > 0` means the source didn't add up —
  surface it, don't paper over it.

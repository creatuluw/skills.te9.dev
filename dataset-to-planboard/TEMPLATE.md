# Board import JSON template

The exact shape accepted by `POST /api/import` (zod-validated server-side;
this file mirrors it). One level deep from SKILL.md.

## Shape

```json
{
  "board": {
    "title": "Omzetplan 2027",       // 2–120 chars
    "unit": "€",                      // optional, ≤24 chars, display-only
    "rootName": "Jaaromzet",          // 1–120 chars — label at the total
    "total": 125000,                  // number ≥ 0, the plan total
    "password": null                  // optional board password (min 4 chars)
  },
  "types": [                          // optional: declare NEW entity types
    { "slug": "regio", "name": "Regio", "color": "#7c3aed" }
  ],
  "tree": {                           // optional: the first breakdown
    "type": "project",                // entity type slug
    "items": [
      {
        "name": "Product A",          // 1–200 chars
        "value": 80000,               // number ≥ 0, ≤2 decimals
        "breakdown": {                // optional: nested, exactly one per item
          "type": "regio",
          "items": [
            { "name": "Noord", "value": 30000 },
            { "name": "Zuid", "value": 50000 }
          ]
        }
      },
      { "name": "Product B", "value": 45000 }
    ]
  }
}
```

## Field rules

| Field | Rule |
|---|---|
| `board.title` | 2–120 chars, required |
| `board.unit` | nullable, ≤24 chars; null = plain numbers |
| `board.rootName` | 1–120 chars, required |
| `board.total` | number ≥ 0, required — becomes the root node's value |
| `board.password` | nullable; if set, ≥4 chars (visitors must enter it) |
| `types[].slug` | lowercase key, unique; existing slugs are just referenced from `tree` without declaring them |
| `types[].color` | `#rrggbb`, optional (default gray) |
| `tree.type` | must exist in registry or be declared in `types[]`, else 422 |
| `tree.items[]` | 1–n; each `{ name, value, breakdown? }` |
| item `breakdown` | optional; **at most one** per item (reconciliation follows exactly one dimension per node) |
| `value` | ≥ 0, rounded to 2 decimals on import |

## Endpoint contract

`POST {base}/api/import` — admin session cookie required (`Cookie: plan_admin=...`).

- `201` →
  `{ ok: true, board: { publicId, title, unit }, links: { edit, view }, stats: { nodes, rootValue, placed, open, reconciled } }`
- `400` unparseable JSON · `401` no admin session
- `422` → `{ ok: false, errors: [{ path, message }] }` (paths like `tree.items[0].breakdown.type`)

Unbalanced trees import fine (`reconciled: false`, red nodes on the board) —
reconciliation is a status, not a gate. Show `stats` to the user after import.

## Existing entity type slugs (registry defaults)

`spec`, `project`, `week`, `employee`, `ticket` — plus whatever the instance
created. Declare new ones in `types[]`; slugs are lowercase and stable.

## Worked example (hours workbook → board)

From a period-planning workbook (persons × weeks hour matrix), root = stated
period total, first breakdown by person, nested by week:

```json
{
  "board": { "title": "Werkverdeling P1 Werkers", "unit": "uren", "rootName": "Periode 1", "total": 240 },
  "tree": {
    "type": "employee",
    "items": [
      { "name": "Anouk", "value": 120,
        "breakdown": { "type": "week", "items": [ { "name": "W44", "value": 60 }, { "name": "W45", "value": 60 } ] } },
      { "name": "Bram", "value": 120,
        "breakdown": { "type": "week", "items": [ { "name": "W44", "value": 40 }, { "name": "W45", "value": 80 } ] } }
    ]
  }
}
```

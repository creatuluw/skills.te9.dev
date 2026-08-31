---
name: evidence-reports
description: Build data reports and dashboards with Evidence.dev (evidence.dev) — a code-based BI framework where reports are authored as Markdown + SQL + Svelte components. Use when the user asks to create, edit, scaffold, or debug an Evidence report/page, add a chart/table/KPI/filter to a report, write DuckDB SQL queries inside Evidence markdown, wire up data sources (CSV, DuckDB, Postgres, BigQuery, Snowflake, etc.), configure `evidence.config.yaml`, set up templated/parameterized pages, or anything referencing Evidence, `@evidence-dev/*`, `evidence dev`, `evidence build`, `.md` report pages with `sql` code fences, or `BigValue`/`LineChart`/`BarChart`/`DataTable`/`Dropdown` components. Also use when working inside an existing Evidence project (evidence.config.yaml present, or pages/ + sources/ + components/ folders).
---

# Evidence Reports

Author data reports in [Evidence](https://evidence.dev): reports are `.md` files containing Markdown prose, inline ```` ```sql ```` queries (DuckDB dialect), and HTML-like `<Component>` tags. Pages live in `pages/`, queries reference a unified data cache built from `sources/`.

## Workflow

Building an Evidence report involves these steps:

1. **Locate the project** — confirm an Evidence project (look for `evidence.config.yaml`, `pages/`, `sources/`, `package.json` with `@evidence-dev/evidence`). If none exists, scaffold one (see "Scaffolding a new project" below).
2. **Confirm data is available** — check `sources/<name>/` has `connection.yaml` + source queries, and that sources have been run (`npm run sources`). Read [references/data-sources.md](references/data-sources.md) to add or debug a source.
3. **Create or edit the page** — `.md` file under `pages/`. Use the page template in [references/page-anatomy.md](references/page-anatomy.md).
4. **Write the queries** — DuckDB SQL inside ```` ```sql <name> ```` fences. Query order on the page does not matter; reference other queries with `${name}`. See [references/queries.md](references/queries.md).
5. **Add components** — charts, tables, KPIs, inputs wired to queries via `data={query_name}`. See [references/components.md](references/components.md).
6. **Run dev server & iterate** — `npm run dev` gives live hot-reload at `localhost:3000`. Save to see changes instantly.

## Core Syntax (memorize this)

Every report page is frontmatter + markdown + SQL fences + components:

```md
---
title: Monthly Sales
---

# Monthly Sales

```sql sales_by_month
select
  date_trunc('month', order_datetime) as month,
  sum(sales) as sales
from needful_things.orders
group by 1
order by 1 desc
```

Sales last month were <Value data={sales_by_month} column=sales/>.

<BarChart
  data={sales_by_month}
  x=month
  y=sales
  yFmt=usd0k
/>
```

Key rules:

- **SQL fence** = three backticks + `sql` + a **query name** (no space): ```` ```sql my_query ````. The name becomes a JS variable available in the page.
- **Reference a query** in a component: `data={query_name}` (curly braces).
- **Chain queries**: reference another query as `${other_query}` inside SQL (becomes a subquery). Some dialects (Postgres/MySQL) require an alias: `${other_query} as other_query`.
- **Query params** from input components: `'${inputs.dropdown_name.value}'`. From URL/templated pages: `'${params.param_name}'`. Multi-select uses `IN ${inputs.name.value}` (no quotes).
- **Expressions**: `{2 + 2}`, `{query.length}`, `{query[0].column}`.
- **Control flow**: `{#if query.length > 0} ... {:else} ... {/if}` and `{#each query as row} ... {/each}`.
- **SQL dialect for page queries = DuckDB.** Source queries (`sources/**/*.sql`) use the *source's* native dialect.

## File Layout of an Evidence Project

```
project-root/
├── evidence.config.yaml        # theme, datasources plugins, appearance
├── package.json                # @evidence-dev/* deps + npm scripts
├── pages/                      # report pages (.md), routes = folder structure
│   ├── index.md
│   └── analyses/
│       └── sales/index.md      # → /analyses/sales
├── queries/                    # reusable SQL files referenced via frontmatter
├── sources/                    # data sources
│   └── <source_name>/
│       ├── connection.yaml     # type + non-secret options
│       ├── connection.options.yaml  # secret/base64 values (gitignored)
│       └── <query>.sql         # source queries (native dialect)
├── components/                 # custom Svelte components
├── partials/                   # reusable markdown chunks ({@partial "x.md"})
└── static/                     # images & static assets (/my-logo.png)
```

## Scaffolding a new project

```bash
npm init evidence@latest my-report
cd my-report
npm install
npm run dev    # → http://localhost:3000
```

`evidence.config.yaml` must list each datasource package under `plugins.datasources` **and** the matching `@evidence-dev/<source>` must be in `package.json`. The default demo source is `needful_things` (DuckDB).

## npm scripts (standard)

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR at `localhost:3000` |
| `npm run build` | Production build to `build/` |
| `npm run build:strict` | Build that fails on query errors / empty datasets |
| `npm run preview` | Preview the production build |
| `npm run sources` | (Re)run all source queries into the cache |
| `npm run sources -- --changed` | Run only changed sources |
| `npm run sources -- --sources my_src` | Run one source only |

For large sources (1M+ rows) raise memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run sources` (Windows: `set NODE_OPTIONS=--max-old-space-size=4096 && npm run sources`).

## Reference Files

Load these only when the task needs them:

- **[references/data-sources.md](references/data-sources.md)** — adding/configuring CSV, DuckDB, Postgres, BigQuery, Snowflake, etc.; `connection.yaml` shape; running sources.
- **[references/queries.md](references/queries.md)** — DuckDB query patterns, query chaining, params, file queries, GROUPING SETS/CUBE patterns for KPI grids.
- **[references/components.md](references/components.md)** — full component cheat-sheet: charts (Bar/Line/Area/Bubble/Scatter), DataTable + Column, BigValue/Value/Delta, Dropdown/inputs, formatting (`fmt`), best practices.
- **[references/page-anatomy.md](references/page-anatomy.md)** — copy-paste page template, frontmatter options, templated/parameterized pages, tabs/loading states.

## Conventions for Generating Reports

- **Prefer DuckDB functions** in page queries: `date_trunc`, `strftime`, `array_agg`, `grouping sets`/`cube`, `list`, `struct_extract`.
- **Aggregate in SQL, not in the browser.** Aim for <100k rows per page query (see [references/components.md](references/components.md) → Best Practices).
- **Change props, not components.** Use a ternary on `data=` rather than `{#if}` to swap whole components (avoids re-render jank).
- **One query per concern.** Build a base query, then chain filtered/cubed queries off it with `${base}`.
- **KPI grids**: use a `GROUPING SETS`/`CUBE` query with a `dim_id`/`grouping_id` column, then `query.filter(d => d.dim_id === '0000')` per `BigValue`. See [references/queries.md](references/queries.md).
- **Guard empty/loading state**: wrap render in `{#if query.length > 0} ... {:else} <Loading/> {/if}`.
- **Name SQL format columns** with a trailing tag for consistent formatting, e.g. `sum(sales) as sales_usd0k`.

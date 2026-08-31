# Page Anatomy & Templates

An Evidence report page is a `.md` file. Route = file path under `pages/` (`pages/analyses/sales/index.md` → `/analyses/sales`).

## Table of Contents

1. Copy-paste starter template
2. Frontmatter reference
3. Templated / parameterized pages
4. Tabs & loading states
5. Page variables
6. Partials

## 1. Copy-paste starter template

```md
---
title: My Report
---

<script>
  // Optional: client-side constants/computed values
  const currentYear = new Date().getFullYear();
</script>

# My Report

Intro paragraph in **markdown**.

## Filters

```sql dim_years
select distinct year from my_source.events order by 1 desc
```

<Dropdown
  data={dim_years}
  name=year
  value=year
  title="Select year"
  defaultValue={currentYear}
/>

## Data

```sql base
select * from my_source.events
where year in ${inputs.year.value}
```

```sql by_month
select
  strftime('%Y-%m-%d', date_trunc('month', date)) as month,
  sum(revenue) as revenue
from ${base}
group by 1
order by 1
```

{#if by_month.length > 0}

<div class="kpi-row">
  <BigValue title="Total" data={by_month} value=revenue fmt=num0 />
</div>

<BarChart
  data={by_month}
  x=month
  y=revenue
  yFmt=num0k
  labels=true
  chartAreaHeight=320
/>

<DataTable data={base} rows=50 search=true sortable=true totalRow=true />

{:else}
  <Loading />
{/if}

<style>
  .kpi-row { display: flex; gap: 1rem; margin: 1rem 0; }
</style>
```

Notes:
- `<script>` (no `context`) is per-page client JS; `export let` props are unused on pages (that's for components).
- `<script context="module">` runs once at module load (good for constants built from dates).
- SQL fences can go anywhere; convention groups them above the markup.

## 2. Frontmatter reference

```yaml
---
title: Page Title              # shown in sidebar + breadcrumb
hide_title: true               # hide the H1 title block
editorOptions:                 # query result visibility
  queryPanel:
    hidden: false
queries:                       # file queries to load (see queries.md §2)
  - q4_data: my_file_query.sql
description: OG/meta description
og:
  image: /my-social-image.png
sidebar:
  collapsed: true
---
```

Frontmatter must be the **first thing** in the file.

## 3. Templated / parameterized pages

One markdown file → many pages via `[param]` in the path:

```
pages/
`-- customers/
    |-- index.md              # listing → links
    `-- [customer].md         # template → /customers/<value>
```

Inside the template, use `{params.customer}` and `'${params.customer}'` in queries:

```md
# {params.customer}

```sql totals
select sum(sales) as sales
from needful_things.orders
where first_name = '${params.customer}'
group by 1
```

{params.customer} spent <Value data={totals} column=sales />.
```

A templated page is only built if something **links** to it. Generate links via:

- DataTable: `link=customer_link` where the query builds `'/customers/' || name as customer_link`.
- `{#each}` loop: `[{row.name}](/customers/{row.name})`.

Nested params supported: `pages/customers/[customer]/[branch].md`.

## 4. Tabs & loading states

**Tabs** (UIkit, as used in real Evidence projects):

```svelte
<ul uk-tab>
  <li><a href="#">Report</a></li>
  <li><a href="#">Details</a></li>
</ul>

<div class="uk-switcher uk-margin">
  <div>{/* tab 1 content */}</div>
  <div>{/* tab 2 content */}</div>
</div>
```

Or use the core `<Tabs>` component if available.

**Loading/empty guard** — always wrap renders that depend on data or inputs:

```svelte
{#if base.length > 0 && inputs.year.value.length > 0}
  <BarChart data={base} ... />
{:else}
  <Loading />
{/if}
```

## 5. Page variables

Built-ins accessible anywhere on the page:

- `{$page.route.id}` — current route path.
- `inputs.<name>.value` — current value of an input component.
- `params.<name>` — URL parameter on templated pages.
- Any query name — its result array (`query.length`, `query[0].col`).

## 6. Partials

Reuse markdown chunks across pages:

```md
{@partial "shared-header.md"}
```

Partials live in `partials/` at the project root. They have access to the page's queries and inputs.

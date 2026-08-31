# Queries in Evidence

Page queries run in **DuckDB dialect** against the unified data cache. This file covers the query patterns most useful when building reports.

## Table of Contents

1. Inline (markdown) queries
2. File queries (reused across pages)
3. Query chaining
4. Parameters (`inputs.*` and `params.*`)
5. DuckDB functions worth knowing
6. KPI-grid pattern with GROUPING SETS / CUBE
7. Date/time helpers
8. Array & struct helpers (for sparklines, nested data)
9. Common pitfalls

## 1. Inline (markdown) queries

Inside any `.md` page, a SQL code fence with a **name** runs at page load:

````md
```sql sales_by_month
select
  date_trunc('month', order_datetime) as month,
  sum(sales) as sales
from needful_things.orders
group by 1
order by 1 desc
```
````

- The query name (`sales_by_month`) becomes a JS array available to components and expressions.
- Query order on the page does **not** matter.
- To debug, click the `⋮` menu → **Show Queries** to see each query's result + compiled SQL.

## 2. File queries (reused across pages)

Place `.sql` files in `queries/`, reference them in frontmatter:

```md
---
queries:
  - q4_data: my_file_query.sql
  - some_category/my_category_file_query.sql   # name optional → uses filename
---
```

Then use `q4_data` (or the filename with `/` → `_`) like any inline query. File-query chaining is supported but every dependency must be listed in the frontmatter.

## 3. Query chaining

Reference another query by name inside `${}`:

````md
```sql sales_by_item
select item, sum(sales) as sales from needful_things.orders group by 1
```

```sql average_sales
select avg(sales) as average_sales from ${sales_by_item}
```
````

`${sales_by_item}` compiles to a subquery. **Postgres/MySQL require an alias:** `from ${q} as q`.

Circular/missing references surface as SQL syntax errors and the query is never sent to the DB.

## 4. Parameters

**From input components** (Dropdown, DatePicker, etc.):

```sql
where category = '${inputs.category}'
```

Multi-select dropdowns return a list — use `IN` with **no quotes** around the `${}`:

```sql
where category in ${inputs.category_multi.value}
```

**From templated pages** (URL segments): `'${params.customer}'`.

Combine inputs in SQL conditionally using JS template-literal expressions inside the SQL string (this is real and powerful):

```sql
```sql filtered
select * from ${base} b
where 1=1
  and maand::date <= '${inputs.maand.value}'::date
  and locatie like '%${inputs.locatie.value}%'
  and ${inputs.locatie.value === '%'
        ? 'groep IN ' + inputs.groep.value
        : 'groep IN ' + inputs.locatie_groepen.value}
```
```

Guard against "no input set yet": the first render substitutes a no-op like `(SELECT NULL WHERE 0)`. Always guard the UI with `{#if inputs.x.value.length > 0}`.

## 5. DuckDB functions worth knowing

- Date: `date_trunc('month', d)`, `date_part('year', d)`, `strftime('%Y-%m-%d', d)`, `date_diff('day', a, b)`.
- Aggregation: `sum`, `avg`, `count(distinct x)`, `median`, `quantile_cont(x, 0.9)`, `bool_and`/`bool_or`, `listagg(x, ',')`.
- Grouping: `group by grouping sets (...)`, `group by cube(a,b,c)`, `grouping_id(a,b,c)`.
- Types: `::numeric(10,2)`, `::date`, `::text`, `cast(x as int)`.
- Strings: `trim`, `replace`, `regexp_replace`, `split_part(s, '-', 2)`, `concat`, `||`.
- Conditionals: `case when ... then ... end`, `coalesce(a, b)`, `nullif(a, b)`.
- Sets/lists: `list(x)`, `array_agg(x)`, `unnest(list)`, `list_contains(l, v)`.

## 6. KPI-grid pattern (GROUPING SETS / CUBE)

For a dashboard with a KPI per dimension value, compute one cube query and filter client-side:

````md
```sql base
select
  year,
  strftime('%Y-%m-%d', month_date) as month_date,
  party,
  room,
  (total_hours * price) as revenue
from events
```

```sql cube
select
  year::text as year,
  month_date,
  party,
  room,
  sum(revenue) as revenue,
  count(distinct room_id) as room_count,
  grouping_id(year, month_date, party, room) as grouping_id,
  ((grouping(year)-1)*-1) || ((grouping(month_date)-1)*-1)
   || ((grouping(party)-1)*-1) || ((grouping(room)-1)*-1) as dim_id
from ${base}
group by cube(year, month_date, party, room)
```
````

Then in markup, filter by the bitmask `dim_id`:

```svelte
<!-- Total -->
<BigValue data={cube.filter(d => d.dim_id === '0000')} value=revenue fmt=num0 />
<!-- Per party -->
{#each cube.filter(d => d.dim_id === '0010') as loc}
  <BigValue title={loc.party} data={[loc]} value=revenue fmt=num0 />
{/each}
```

`dim_id` legend (1 = dimension IS grouped out):

| dim_id | Aggregation |
|--------|-------------|
| 0000 | TOTAL |
| 0001 | room |
| 0010 | party |
| 0100 | month_date |
| 1000 | year |
| 1100 | year + month_date |
| 1010 | year + party |

## 7. Date/time helpers

```sql
select
  date_trunc('month', order_datetime) as month,        -- truncate to month
  strftime('%Y-%m', order_datetime) as ym,             -- formatted string
  extract(year from order_datetime) as yr,
  order_datetime::date as d                            -- cast to date
```

For charts, prefer truncating to a date and casting to `::text` so the x-axis sorts correctly.

## 8. Array & struct helpers (sparklines, nested data)

`DataTable` sparkline columns need an array of `{x, y}` per cell. Build it with `array_agg` on a struct:

```sql
with monthly as (
  select category,
         date_trunc('month', order_datetime) as date,
         sum(sales) as sales
  from needful_things.orders
  group by 1, 2
)
select category,
       sum(sales) as total_sales,
       array_agg({'date': date, 'sales': sales}) as series
from monthly
group by 1
```

Then `<Column id=series contentType=sparkline sparkX=date sparkY=sales />`.

## 9. Common pitfalls

- **Forgetting the query name** after ```` ```sql ```` → query is treated as plain code and never runs.
- **Using source dialect in a page query** (e.g. Postgres `::` casts are fine, but T-SQL `top 10` or MySQL backticks won't work). Page queries = DuckDB.
- **Multi-select quoting** — `in '${inputs.x.value}'` (with quotes) breaks; use `in ${inputs.x.value}`.
- **Returning too many rows** — aggregate to keep page queries under ~100k rows.
- **Empty dataset on first load** blocks `build:strict`. Add `emptySet=pass` or `warn` on the component, or ensure a sensible `defaultValue`.
- **Alias required** when chaining on Postgres/MySQL sources wrapped in page queries: `from ${q} as q`.

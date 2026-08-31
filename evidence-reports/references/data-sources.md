# Data Sources in Evidence

Evidence unifies many databases into one DuckDB-backed cache. Page queries always run against this cache in **DuckDB dialect**. Source queries (`sources/**/*.sql`) run against each source's **native dialect**.

## Table of Contents

1. How sources work
2. The `sources/<name>/` folder
3. `connection.yaml` shapes per source type
4. Source queries
5. Running sources
6. CSV source (most common for local data)
7. DuckDB source
8. Configuring sources in `evidence.config.yaml`
9. Build-time variables
10. Troubleshooting

## 1. How sources work

```
sources/<name>/<query>.sql   (native SQL)
        ↓  npm run sources
.evidence/.../data/*.parquet (unified DuckDB cache)
        ↓  page query (DuckDB dialect)
components / charts
```

On a page you reference cached source data as `<source_name>.<query_name>`, e.g. `from needful_things.orders`.

## 2. The `sources/<name>/` folder

Every source needs at minimum:

- `connection.yaml` — non-secret config (type, options). Source-controlled.
- One or more `*.sql` files — the source queries (native dialect).

Some sources also have:

- `connection.options.yaml` — secret values, base64-encoded, **gitignored**.
- A data file (e.g. `name.duckdb`, or copied `.csv` files).

Folder names = source names used in SQL (`sources/csv/` → queried as `csv.<query>`).

## 3. `connection.yaml` shapes

**CSV** (no credentials):

```yaml
name: csv
type: csv
options:
  options: header=true   # passed to DuckDB read_csv()
```

CSVs are dropped as `.csv` files directly into `sources/<name>/`. Query them as `select * from <source>.<file_without_extension>`. Filenames: letters/numbers/underscores only.

**DuckDB** (persistent file in the source folder):

```yaml
name: my_duckdb
type: duckdb
```

Store the `.duckdb` file inside `sources/<name>/`. For MotherDuck, use the dedicated MotherDuck connector.

**Other DBs** (Postgres, BigQuery, Snowflake, MySQL, MSSQL, Databricks, Trino, SQLite, MotherDuck): `type:` matches the connector; credentials live in `connection.options.yaml` (base64). Easiest path: create the source via the `/settings` UI in dev mode, which writes both files for you.

## 4. Source queries

`sources/<name>/my_query.sql` — written in the **source's native dialect**. Becomes `<name>.my_query` in the cache.

```sql
-- sources/needful_things/orders.sql   (runs against the DuckDB source file)
select * from orders
```

Only source the columns/rows you need — large sources are slow and memory-heavy to cache. **Sort** source queries by columns used in page-query `where` clauses (improves Parquet compression + projection pushdown).

## 5. Running sources

```bash
npm run sources                              # run all
npm run sources -- --changed                 # only changed queries
npm run sources -- --sources my_source       # one source
npm run sources -- --sources my_source --queries q1,q2   # specific queries
```

With the dev server running, edited source queries re-run automatically. Large sources (1M+ rows) may need more memory:

```bash
# macOS / Linux
NODE_OPTIONS="--max-old-space-size=4096" npm run sources
# Windows (cmd)
set NODE_OPTIONS=--max-old-space-size=4096 && npm run sources
```

## 6. CSV source deep-dive

1. Create `sources/my_csv/connection.yaml` with `type: csv`.
2. Drop `.csv` files into `sources/my_csv/`.
3. Query: `select * from my_csv.my_file` (no `.csv` extension).
4. Pass DuckDB `read_csv()` options via `options.options` (no spaces; double-quote strings).

## 7. DuckDB source deep-dive

- Place the `.duckdb` file under `sources/<name>/`.
- `connection.yaml`: `name:` + `type: duckdb` (no `options` needed).
- Source queries (`*.sql`) target tables inside that database file.

## 8. Configuring sources in `evidence.config.yaml`

Every datasource package must be registered under `plugins.datasources` **and** installed in `package.json`:

```yaml
plugins:
  components:
    "@evidence-dev/core-components": {}
  datasources:
    "@evidence-dev/csv": {}
    "@evidence-dev/duckdb": {}
    "@evidence-dev/postgres": {}
    "@evidence-dev/bigquery": {}
```

Adding a new source type = add the npm dep + add the entry here + create the `sources/<name>/connection.yaml`.

## 9. Build-time variables

Pass values into source queries via env vars prefixed `EVIDENCE_VAR__`:

```env
# .env
EVIDENCE_VAR__client_id=123
```

```sql
-- sources/my_src/customers.sql
select * from customers where client_id = ${client_id}
```

`${...}` build-time interpolation works **only in source queries**, not in page or file queries.

## 10. Troubleshooting

- **"relation does not exist"** — source not run yet (`npm run sources`) or wrong `<source>.<query>` name.
- **Folder name vs `name:` mismatch** — that's fine; Evidence uses the folder name as the SQL schema. Keep them aligned anyway to avoid confusion.
- **Credentials not loading** — `connection.options.yaml` values are base64; re-create the source via `/settings` if corrupted.
- **Heap out of memory** — raise `NODE_OPTIONS=--max-old-space-size` (see §5).

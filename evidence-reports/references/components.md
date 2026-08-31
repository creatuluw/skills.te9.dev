# Evidence Components

Components are HTML-like tags (`<BarChart .../>`) placed in markdown. All take `data={query_name}`. Charts use ECharts, maps use Leaflet, UI uses Shadcn.

## Table of Contents

1. Universal rules
2. Value formatting (`fmt`)
3. Data components: Value, BigValue, Delta, DataTable
4. Charts: Bar, Line, Area, Bubble/Scatter, Pie, maps
5. Inputs: Dropdown, DatePicker, Button, etc.
6. Layout & control flow (`{#each}`, `{#if}`, tabs)
7. Custom components
8. Best practices

## 1. Universal rules

- `data={query_name}` is always required (curly braces, no quotes).
- Missing `x`/`y` → Evidence assumes first column = x, remaining numeric = y.
- Multi-series via `series=column_name` or `y={["y1","y2"]}`.
- Format props: `xFmt`, `yFmt`, `y2Fmt`, `labelFmt`, `seriesLabelFmt`, `fmt`.
- `emptySet`: `error` (default, blocks strict build) | `warn` | `pass`. Input-driven empties are always allowed.
- Annotations: nest `<ReferenceLine .../>` / `<ReferenceArea .../>` inside a chart.

## 2. Value formatting (`fmt`)

Accepts an Excel-style code (`'$#,##0.0'`), a built-in name, or a custom name.

**Built-in number formats** (append digits `0-2` and magnitude ``/`k`/`m`/`b`):

| Tag | Example |
|---|---|
| `num0`, `num1`, `num2` | 1,234 / 1,234.5 |
| `num0k`, `num1m`, `num2b` | 1k / 1.2m / 1.23b |
| `pct0`, `pct1`, `pct2` | 12% / 12.3% |
| `usd`, `usd0`, `usd1k`, `usd2m` | $412 / $412 / $412k / $412.00m |
| `eur`, `gbp`, ... | same pattern, any ISO currency code |

**Dates**: Excel codes like `mmm yyyy`, `m/d/yy`, `d mmm`. Note: date axis labels on charts are auto-spaced and ignore `xFmt` (it only affects tooltips/annotations).

**Format function in expressions** (no component available): `{fmt(value, '+#,##0;-#,##0')}`.

**SQL format tags** (auto-applied everywhere the column appears): name the column `sales_usd0k`, `growth_pct1` — the suffix is stripped from titles and applied as the format. Case-insensitive.

**Strings inside codes**: wrap string in double-quotes, whole code in single-quotes → `fmt='#,##0.00 "mpg"'`.

## 3. Data components

### Value — single value in text

```svelte
There were <Value data={orders} column=number_of_orders /> orders.
```

### BigValue — KPI card

```svelte
<BigValue
  title="Total Sales"
  data={sales_summary}
  value=sales
  fmt=usd0k
/>
```

Multiple KPIs in a grid → see the cube/dim_id pattern in [queries.md](queries.md) §6.

### Delta — comparison indicator (often a DataTable column)

```svelte
<Column id=yoy contentType=delta fmt=pct title="Y/Y Chg" />
```

Delta options: `downIsGood`, `neutralMin`, `neutralMax`, `showValue`, `chip`, `deltaSymbol`.

### DataTable — rich tables

```svelte
<DataTable data={orders} rows=10 search=true sortable=true totalRow=true download=true>
  <Column id=order_datetime title="Order Date" />
  <Column id=customer align=left />
  <Column id=sales fmt=usd0k contentType=colorscale />
  <Column id=yoy contentType=delta fmt=pct />
</DataTable>
```

**Key DataTable props**: `rows` (number | `all`), `search`, `sortable`, `sort="col desc"`, `totalRow`, `rowNumbers`, `rowShading`, `rowLines`, `link=col` (+`showLinkCol`), `groupBy=col` + `groupType=accordion|section` + `subtotals=true`, `emptySet`, `emptyMessage`, `generateMarkdown=true` (helper).

**Key Column props**: `id` (required), `title`, `align`, `fmt`, `fmtColumn`, `contentType`, `totalAgg` (sum|mean|countDistinct|weightedMean|...), `totalFmt`, `weightCol`, `colGroup`, `redNegatives`, `wrap`.

**Column contentTypes**: `delta`, `sparkline`/`sparkarea`/`sparkbar` (+`sparkX`/`sparkY`/`sparkColor`), `bar` (+`barColor`/`negativeBarColor`), `colorscale` (+`colorScale`/`colorMin`/`colorMid`/`colorMax`/`colorBreakpoints`/`scaleColumn`), `image` (+`height`/`width`/`alt`), `link` (+`linkLabel`/`openInNewTab`), `html`.

**colorScale presets**: `default`, `positive`, `negative`, `info`, or a hex string, or an array (diverging/heatmap) e.g. `{['#6db678','white','#ce5050']}`.

## 4. Charts

All share: `data`, `x`, `y`, `series`, `title`, `subtitle`, `legend`, `chartAreaHeight` (default 180), `emptySet`, `emptyMessage`, `xFmt`/`yFmt`/`labelFmt`, `echartsOptions`/`seriesOptions` (escape-hatch to ECharts), `connectGroup` (synced tooltips), `downloadableData`/`downloadableImage`.

### BarChart

```svelte
<BarChart
  data={sales_by_month}
  x=month
  y=sales
  series=category          <!-- multi-series grouping -->
  type=stacked             <!-- stacked | grouped | stacked100 -->
  swapXY=true              <!-- horizontal -->
  yFmt=usd0k
  labels=true
  chartAreaHeight=300
/>
```

Stack/axis: `y2`, `y2SeriesType=line` (combo), `yMin`/`yMax`/`yScale`, `yLog`/`yLogBase`, `xAxisTitle`/`yAxisTitle`, `swapXY`, `xGridlines`/`yGridlines`.
Labels/colors: `labels`, `labelFmt`, `labelPosition`, `colorPalette={ [...] }`, `seriesColors={{ 'US': 'blue' }}`, `seriesOrder={[...]}`, `fillColor`, `fillOpacity`, `outlineWidth`/`outlineColor`.

### LineChart / AreaChart

Same prop surface as BarChart; `AreaChart` adds area fill. Use for time series:

```svelte
<AreaChart
  data={trend}
  x=month
  y=revenue
  labels=true
  labelFmt=num1k
  markers=true
  markerShape=emptyCircle
/>
```

### BubbleChart / ScatterChart

```svelte
<BubbleChart
  data={points}
  x=revenue
  y=child_count
  series=room
  size=revenue          <!-- BubbleChart only -->
  xFmt=num0
  legend=false
  yMin=0
/>
```

### Pie / maps

- `<PieChart data=q name=cat value=val />`
- `<USMap data=q state=State value=cnt abbreviations=true />` / `<WorldMap .../>`

## 5. Inputs

### Dropdown

```svelte
<Dropdown
  data={categories}
  name=category            <!-- referenced as inputs.category.value -->
  value=category_name
  label=abbrev             <!-- optional display label column -->
  title="Select a Category"
  defaultValue="Toys"
  multiple=true            <!-- multi-select → use IN ${...} (no quotes) -->
  selectAllByDefault=true
  order="sales desc"
  where="sales > 1000"
>
  <DropdownOption valueLabel="All" value="%" />
</Dropdown>
```

Hardcoded options: nest `<DropdownOption valueLabel="..." value="..." />`.

### DatePicker / Button / etc.

Use the built-in `DatePicker`, `Button`, `Tabs`, or bring your own Svelte component (see §7). Multi-select defaultValues pass an array: `defaultValue={['a','b']}`.

## 6. Layout & control flow

```svelte
{#if query.length > 0}
  <BarChart data={query} x=m y=v />
{:else}
  <Loading />           <!-- or custom loader component -->
{/if}

{#each query as row, i}
  <BigValue title={row.name} data={[row]} value=v fmt=num0 />
{/each}
```

Tabs (HTML): use the UIkit `uk-tab` + `uk-switcher` pattern, or `<Tabs>` from core components, to switch between report sections.

Page-level layout: Evidence pages support raw HTML + CSS (`<style>` blocks, `class=`, UIkit utility classes like `uk-grid`, `uk-width-3-4@m`).

## 7. Custom components

Svelte files in `components/` are auto-imported into pages. Pass query data as props:

```svelte
<!-- pages/my_report.md -->
<MyKpi data={sales_summary} />

<!-- components/MyKpi.svelte -->
<script>
  export let data;
</script>
<div class="kpi">Total: {data[0]?.sales ?? 0}</div>
```

For deeper integration, components can run their own queries via `buildQuery` from `@evidence-dev/core-components`.

## 8. Best practices

1. **Source only what you need.** Filter/limit in source queries; the cache is Parquet.
2. **Sort source queries** by columns used in page `where` clauses (better compression, projection pushdown).
3. **Change props, not components.** Swap `data=` with a ternary instead of `{#if}` around a whole chart (avoids full re-render jank):

   ```svelte
   <BarChart data={inputs.pick.value === 'a' ? q_a : q_b} />
   ```

4. **Keep page queries small.** <100k rows. Aggregate in SQL; browsers can't render a million points anyway.
5. **Use SQL format tags** (`col_usd0k`) for consistent formatting across components.
6. **Guard empty/loading states** with `{#if query.length} ... {:else} <Loading/> {/if}`.
7. **KPI grids** → one cube/GROUPING-SETS query + client-side `filter(d => d.dim_id === '...')` (see [queries.md](queries.md) §6).

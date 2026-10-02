# Neo examples

Every example uses the same lifecycle: **name session → open own tab → work → close tab** (in `try/finally`), then **write the session log** with the write tool (see [LOG_TEMPLATE.md](LOG_TEMPLATE.md)) — even when the script failed.
After first discovery, flat calls work: `tools["browseros-neo_tabs"]`, `tools["browseros-neo_read"]`, etc.

## 1. Read a page (anonymous or logged-in)

```js
const tabs = await tools.search({ query: "tabs", server: "browseros-neo" });
const nameS = await tools.search({ query: "name_session", server: "browseros-neo" });
const read = await tools.search({ query: "read", server: "browseros-neo" });

let tab;
try {
  await tools.call(nameS.items[0].path, { name: "docs check", category: "research", summary: "Read one docs page" });
  tab = await tools.call(tabs.items[0].path, { action: "new", url: "https://example.com/docs" });
  const page = await tools.call(read.items[0].path, { tabId: tab.tabId });
  // Large pages return a file path — read that file instead of re-fetching
  emit(page);
  return page;
} finally {
  if (tab) await tools.call(tabs.items[0].path, { action: "close", tabId: tab.tabId });
}
// Then write logs/2026-09-01-docs-check.md per LOG_TEMPLATE.md — always, success or failure.
```

## 2. Fill a form (snapshot → act → verify)

```js
let tab;
try {
  await tools["browseros-neo_name_session"]({ name: "expense file", category: "work", summary: "File expense report" });
  tab = await tools["browseros-neo_tabs"]({ action: "new", url: "https://app.example.com/expenses/new" });

  // Snapshot to get refs
  const snap = await tools["browseros-neo_snapshot"]({ tabId: tab.tabId });

  // Act by ref, batching the whole form
  const diff = await tools["browseros-neo_act"]({
    tabId: tab.tabId,
    actions: [
      { ref: "e12", type: "amount", value: "42.50" },   // field refs from snapshot
      { ref: "e15", type: "date", value: "2026-09-01" },
      { ref: "e20", click: true }                        // submit button
    ]
  });
  // diff is a settled before/after — verify success from it (e.g. confirmation text),
  // only re-snapshot if the diff is inconclusive.
  return diff;
} finally {
  if (tab) await tools["browseros-neo_tabs"]({ action: "close", tabId: tab.tabId });
}
```

Note: `act` field/ref syntax above is illustrative — `tools.describe` the act tool first and follow its exact schema.

## 3. Extract structured data from a logged-in dashboard

```js
let tab;
try {
  await tools["browseros-neo_name_session"]({ name: "q3 metrics", category: "work", summary: "Pull Q3 numbers" });
  tab = await tools["browseros-neo_tabs"]({ action: "new", url: "https://notion.so/my-dashboard" });

  // grep first — search the page without pulling the whole thing
  const hits = await tools["browseros-neo_grep"]({ tabId: tab.tabId, pattern: "revenue|churn|MRR" });
  emit(hits);
  return hits;
} finally {
  if (tab) await tools["browseros-neo_tabs"]({ action: "close", tabId: tab.tabId });
}
```

## Anti-patterns

- Working in the user's tab because "it's already on the right page" — open your own tab with the same URL instead.
- Skipping `finally` — an error mid-task must not leave a tab open.
- Endless snapshots — `act` returns the diff; read it before re-snapshotting.
- Bare `wait` calls — wait for expected text or a selector instead.

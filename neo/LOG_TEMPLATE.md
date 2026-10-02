# Session log template

One markdown file per neo work session: `logs/YYYY-MM-DD-slug.md` (slug = short task name).
Multi-tab sessions: one file, one `## Story` section per tab.
**Write the log even when the task fails — that's when the story matters most.**

## Frontmatter archetypes

Pick from these fixed vocabularies — no free-form values:

```yaml
---
title: "Invoice download — Telnyx September"   # human-readable, names the work
date: 2026-09-01T14:32:00Z                     # ISO timestamp, session start
task: "Download the latest Telnyx invoice PDF"  # what the user asked for, verbatim-ish
category: finance        # research | work | finance | admin | ops | personal
tags: [login-required, download, extract]      # 1–3, from the tag archetypes below
tabs: 1                  # tabs opened for this session
outcome: success         # success | partial | failed
closed: true             # all task tabs closed
followUps: []            # undone items, human needed, next steps
---
```

**Tag archetypes** (pick 1–3):

- access: `login-required` | `anonymous`
- action: `read` | `extract` | `form-fill` | `download` | `navigate` | `verify` | `screenshot`
- handling: `error-recovery` | `retry` | `abandoned`

**Category archetypes**: `research` (learning/looking up), `work` (project/productivity tools), `finance` (invoices, banking, expenses), `admin` (accounts, settings, email chores), `ops` (deployments, monitoring, infra), `personal` (everything else).

## Body

Keep stories brief and concise — the decisive steps, not every snapshot.

```md
## Story

What was done and why, in 3–8 sentences: the goal, the path taken
(login wall hit, search used, form filled, button clicked), and the result.
For multi-tab sessions, one `### Tab N — <url>` subsection per tab.

## Key data

The captures that matter next time: figures extracted, file paths downloaded,
URLs visited, IDs, confirmation numbers, short quotes. Raw dumps go in a
collapsible section or a sibling file — keep this section skimmable.

## Issues & follow-ups

What broke, what was skipped, what needs a human. Empty is fine.
```

## Filled example — `logs/2026-09-01-telnyx-invoice.md`

```md
---
title: "Invoice download — Telnyx September"
date: 2026-09-01T14:32:00Z
task: "Download the latest Telnyx invoice PDF"
category: finance
tags: [login-required, download]
tabs: 1
outcome: success
closed: true
followUps: []
---

## Story

User needed the current Telnyx invoice for bookkeeping. Opened a fresh tab to
console.telnyx.com — the session was already signed in via the persistent
profile. Navigated to Billing → Invoices, found the latest invoice
(2026-09-01, INV-88213). Clicked download; PDF landed in the default download
folder. Verified the file exists and is a valid PDF (first bytes `%PDF`).
Tab closed.

## Key data

- Invoice: INV-88213, period 2026-08-01→2026-08-31, total **$142.66**
- File: `C:\Users\PTW\Downloads\INV-88213.pdf`
- URL: `https://console.telnyx.com/billing/invoices/INV-88213`

## Issues & follow-ups

None.
```

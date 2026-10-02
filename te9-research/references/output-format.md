# Output Format

The output contract every run must honor.

## Report directory

```
reports/YYYY-MM-DD-<slug>/
├── agents/
│   ├── d0-001-orchestrator.md   ← the root file IS the final report (markdown)
│   ├── d1-002-researcher.md     ← one file per sub-agent
│   ├── d1-003-researcher.md
│   ├── d2-004-researcher.md     ← (depth 2+ runs)
│   └── ...
├── research.log                 ← JSONL event log (append as you go)
├── metrics.json                 ← written by scripts/metrics.py at the end
└── report.html                  ← the HTML deliverable, from assets/report-template.html
```

- `YYYY-MM-DD` = run date; `<slug>` = short kebab-case of the question.
- Agent file naming: `d{depth}-{seq:03d}-{role}.md` — seq increments globally
  in creation order (002, 003, …). Roles: `orchestrator`, `researcher`,
  `detector`, `perspective-<name>`.
- Write files as the run progresses — an interrupted run leaves readable
  partials (there is no resume).

## research.log schema

One JSON object per line. `ts` is ISO-8601 UTC. Common fields: `event`,
`node`, `depth`, plus event-specific fields.

```json
{"ts": "...", "event": "run_start", "question": "...", "strategy": "recursive_research", "depth": 2, "max_fanout": 4}
{"ts": "...", "event": "question_refined", "from": "...", "to": "...", "reason": "..."}
{"ts": "...", "event": "decompose", "node": "q-001", "depth": 0, "children": ["q-002", "q-003", "q-004"], "trimmed": false}
{"ts": "...", "event": "answer", "node": "q-002", "depth": 1, "agent_file": "agents/d1-002-researcher.md", "status": "explored"}
{"ts": "...", "event": "answer", "node": "q-009", "depth": 1, "agent_file": null, "status": "dead_end"}
{"ts": "...", "event": "synthesize", "node": "q-001", "depth": 0, "from_children": ["q-002", "q-003", "q-004"], "status": "synthesized"}
{"ts": "...", "event": "detect_blind_spots", "node": "q-001", "agent_file": "agents/d1-006-detector.md"}
{"ts": "...", "event": "run_end", "status": "complete", "final_report": "agents/d0-001-orchestrator.md"}
```

## Node states

Every question node carries an epistemic status, advanced by operations:

```
Unknown ──DECOMPOSE──▶ Unknown (children spawned)
Unknown ──ANSWER─────▶ Explored
Explored ──GROUND────▶ Validated        (grounded strategy)
Explored ──(all children)──▶ Synthesized
```

`dead_end` is a terminal status for branches that found nothing solid.

## Agent file formats

Leaf researcher (`dN-NNN-researcher.md`):

```markdown
# Q: <the atomic question>

## Findings
- <finding> — evidence/reasoning, confidence: high|medium|low
- ...

## Tensions
- <contradiction/uncertainty, or "none">

## Open questions
- <deeper question for a child branch, or "none">

## Search trail (only for leaves that searched)
- queries: <the 2-4 variants actually run>
- fetched: <URL> — <what was extracted>
- rejected: <URL> — <why: off-topic / stale / paywalled / low-trust>
```

Perspective leaf adds under the title:
`Perspective: <name> (persona: <one line>)`

Grounded leaf labels each finding:
`- <claim> [verified: URL] — confidence: high`

Root / final report (`d0-001-orchestrator.md`):

```markdown
# <the original question>

## Executive summary
<2-4 sentences answering the question directly>

## Answer
<the integrated synthesis — ranked findings, tensions resolved or surfaced>

## Open questions
<what remains unknown, inherited from branches>

## How this was researched
<strategy, nodes, max depth, branches — one or two lines>

[Strategy add-on sections when applicable:
 "The question, examined" (socratic) | "Blind spots" (perspective) | "Sources" (grounded)]
```

## report.html

The user-facing deliverable, rendered at the end of the run from
[assets/report-template.html](../assets/report-template.html) (self-contained:
all CSS/JS inline, system fonts, works offline from `file://`). Fill every
`{{PLACEHOLDER}}` per the header comment in the template. It mirrors the root
report — executive summary as lead, one `<h2>` per branch (strongest first),
tensions, open questions, strategy add-on sections — plus the run's stats and a
collapsible question tree.

The tree is driven by one embedded JSON object in the page's `<script>`:

```json
{
  "id": "q-001", "q": "<root question>", "status": "synthesized",
  "children": [
    { "id": "q-002", "q": "<sub-question>", "status": "explored", "children": [] }
  ]
}
```

Build it from `research.log`: `decompose` events give parent→children,
`answer`/`synthesize`/dead-end events give each node's final status
(`explored` | `validated` | `synthesized` | `dead_end`). Keep dead ends
visible — they render with their own marker and are findings, not failures.

## metrics.json

Written by `scripts/metrics.py <report_dir>`. Fields:

- `nodes_total`, `agent_files`, `events_total`
- `max_depth`, `decompositions`, `fanout_max`, `fanout_total_children`
- `node_status_counts` — by status (explored / synthesized / dead_end / …)
- `agent_words_total`
- `warnings` — e.g. fan-out above limit, unsynthesized nodes left, missing
  final report

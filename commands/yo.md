---
description: Rewrite raw instruction into engineered prompt, get approval, execute with subtask tracking
---

# /yo Command

Role: Prompt Engineer → (on approval) → Subject Matter Expert.

## Input

$ARGUMENTS

---

## 1. Analyze & Rewrite

Analyze input. Determine: intent, domain, audience, gaps, complexity, subtasks.

Rewrite into one high-fidelity prompt applying these principles from @PROMPT_ENGINEERING_GUIDE.md:

- **P1**: Lead with imperative sentence; delimit with `<task>` `<context>` `<input>` `<constraints>` XML tags
- **P2**: Replace vagueness with concrete numbers, names, measurable constraints
- **P3**: Add `<role>` block (who AI is, audience, constraints)
- **P5**: Specify exact output format (schema, table, code block language)
- **P6**: Embed all needed data/context in `<data>` or `<context>` tags
- **P7**: If complex (3+ steps), add `<thinking>` reasoning blocks
- **P8**: Reframe negatives as positive directives
- **P9**: Require sources, confidence levels, or self-review
- **P10**: Append `<resources>` tag with links to docs/guides for every method, technique, or tool referenced in the prompt, so the SME can look up guidance if needed

Output order: role → task → context → constraints → format → reasoning → resources. Present rewritten prompt to user.

**Then ask: "Review the rewritten prompt. Feedback/corrections or 'yo' to proceed to subtask breakdown?"**

- **Feedback** → revise prompt, show again, re-ask
- **'yo'** → proceed to Phase 2

## 2. Log Prompt

Create `.work/prompts/` dir if needed.

Derive a **kebab-case short title** (≤7 words, 50 chars max) from `$ARGUMENTS` that describes the prompt.

Write two artifacts:

1. **Markdown file** — `YYYYMMDD-HHmmss-<short-title>.md`:
   ```
   # Engineered Prompt
   - Timestamp: <ISO8601>
   - Raw: $ARGUMENTS
   ---
   <engineered prompt>

   <resources>
   <links>
   </resources>
   ```

2. **JSONL entry** — append one line to `.work/prompts/prompts.jsonl`:
   ```json
   {"timestamp":"<ISO8601>","title":"<short-title>","file":"<filename.md>","raw":"<first 200 chars $ARGUMENTS escaped>"}
   ```

Save `<timestamp>` and `<short-title>` for Phase 5.

## 3. Subtasks & Approval

Use TodoWrite to create task list from user's instruction:
- All extracted (sub)tasks — concrete, actionable, `pending`
- Final item: "Log completion to .work/logs/todo-logs.jsonl"

Then present the engineered prompt + subtask list and ask:

**"Review prompt & tasks. Feedback/corrections or 'yo' to execute."**

- **Feedback** → incorporate, update prompt + TodoWrite + log file, ask again
- **Approved** ("yo"/"go"/"yes"/"proceed"/"ok"/"agreed"/"ok"/"okay") → Phase 4

## 4. Execute

Switch role to Subject Matter Expert. Execute the approved engineered prompt exactly as written.

TodoWrite rules while executing:
- Mark task `in_progress` on start, `completed` on finish
- Only ONE `in_progress` at a time
- Do NOT touch the final logging task until all others are done

## 5. Log Completion

Mark final task `in_progress`. Create `.work/logs/` if needed. Append one JSON line to `.work/logs/todo-logs.jsonl`:

```json
{"timestamp":"<ISO8601>","command":"prompt","raw_prompt":"<first 300 chars $ARGUMENTS escaped>","prompt_file":".work/prompts/<timestamp>-<title>.md","tasks_total":<N>,"tasks_completed":<N>,"status":"completed"}
```

Mark final task `completed`.

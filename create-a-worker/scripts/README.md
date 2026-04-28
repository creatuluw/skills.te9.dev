# Scripts

Purpose-built tools for validation, implementation, testing, logging, and automation.

---

## Purpose

This directory houses executable code used for validation, implementation, testing, logging, and automation. Scripts give the worker tools to verify work, automate repetitive tasks, and enforce conventions programmatically.

Each script is a focused, single-purpose tool designed to be invoked by the agent during skill creation workflows—never manually by a human operator (though humans may run them for debugging).

---

## Why It's Used

Some tasks are better handled by deterministic scripts than by the agent reconstructing logic each time.

| Without Scripts | With Scripts |
|-----------------|--------------|
| Agent re-derives validation rules each invocation | Script encodes rules once, runs deterministically |
| Validation output is unstructured prose | Structured JSON/CSV output for parsing |
| Conventions enforced by prompt alone | Conventions enforced by code that fails loudly |
| Token cost scales with task complexity | Token cost is fixed: invoke script, read output |

Scripts ensure **consistency**, reduce **token usage** (run a script vs. think through logic), and provide **verifiable outputs** that can be checked into the skill's artifacts.

---

## When to Use It

- **Validation** — When the worker needs to validate work (run a validation script like `validate-skill.sh`)
- **Repetitive Logic** — When a task involves repetitive logic the agent would reconstruct each time
- **Structured Output** — When structured output is needed (JSON, CSV from a script)
- **Convention Enforcement** — When enforcement of conventions needs to be programmatic
- **Testing & Benchmarking** — When testing or benchmarking is needed
- **Code Generation** — When templates or scaffolding should be produced deterministically

---

## What to Add Here

Each script added to this directory **must** meet the following standards:

### Self-Contained
Declares its own dependencies inline. A reader should be able to determine all requirements from the script's header or `--help` output alone—no external documentation required.

### Non-Interactive
Accepts input via flags, environment variables, or stdin. Never prompts for user input. This ensures scripts work in automated pipelines and agent workflows.

### Well-Documented
Has `--help` with:
- Description of what the script does
- Usage examples covering common cases
- Flag documentation with defaults noted
- Exit code meanings

### Error-Helpful
Clear error messages that say:
- **What went wrong** (the specific error)
- **Why it went wrong** (the root cause, if known)
- **What to try** (actionable remediation steps)

### Structured Output
- **JSON/CSV to stdout** — Machine-parseable results
- **Diagnostics to stderr** — Human-readable logs, warnings, progress
- This separation lets agents parse results while still logging context

### Idempotent Where Possible
Safe to run multiple times with the same inputs. Re-running should produce the same result without side effects.

### Safe Defaults
Destructive operations (overwriting files, deleting resources) require explicit confirmation:
- `--confirm` for interactive confirmation
- `--force` to skip confirmation (document the risks)

---

## Where to Find Detailed Instructions

| Topic | Reference |
|-------|-----------|
| Script design guidelines | See the agent-skills specification on "Designing Scripts for Agentic Use" |
| Skill specification reference | `sources/skill-specification.md` |
| Quality standards | `conventions/quality-standards.md` |

---

## Current Scripts

| Script | Purpose |
|--------|---------|
| `validate-skill.sh` | Validates a skill directory structure and SKILL.md against the specification |
| `generate-template.py` | Generates scaffolding for a new skill from templates |
| `analyze-coverage.py` | Analyzes test coverage and completeness for a skill |

---

## Post-Creation Checklist

After adding or modifying a script, verify:

- [ ] Every script has `--help` documentation
- [ ] Every script handles errors with helpful messages
- [ ] Scripts use structured output (JSON/CSV to stdout)
- [ ] Scripts are self-contained (inline dependency declarations)
- [ ] Destructive operations require `--confirm` or `--force`
- [ ] Scripts use meaningful exit codes (0 success, distinct codes for failures)
- [ ] Scripts are idempotent where possible
- [ ] Scripts referenced from `SKILL.md` use correct relative paths
- [ ] All required runtime dependencies are documented
- [ ] Diagnostics go to stderr, results go to stdout
- [ ] The script works when invoked from the skill root directory
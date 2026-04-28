# Agent Skills Specification — Quick Reference

A concise reference for the Agent Skills specification. For the full specification,
see the `agent-skills-docs.md` source file.

---

## 1. Format Specification

### Directory Structure

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

### Installation Locations

- **Project-level:** `.agents/skills/` (within a project)
- **User-level:** `~/.agents/skills/` (global to user)

### SKILL.md Format

A `SKILL.md` file contains YAML frontmatter followed by Markdown content:

```yaml
---
name: skill-name
description: What this skill does and when to use it.
---

# Skill Title

Instructions, methods, examples, and references go here.
```

---

## 2. Frontmatter Field Reference

### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | string | 1–64 chars. Lowercase `a-z`, `0-9`, hyphens only. No leading/trailing hyphens. No consecutive hyphens. Must match parent directory name. |
| `description` | string | 1–1024 chars. Describes what the skill does AND when to use it. |

### Optional Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `license` | string | License name or reference to a bundled license file. |
| `compatibility` | string | 1–500 chars. Environment requirements (tools, runtime, OS). |
| `metadata` | map | Arbitrary string→string key-value pairs. |
| `allowed-tools` | string | Space-separated pre-approved tools. Experimental. |

### Field Examples

**name (valid):**
```yaml
name: pdf-processing
name: data-analysis
name: code-review
```

**name (invalid):**
```yaml
name: PDF-Processing    # uppercase not allowed
name: -pdf              # cannot start with hyphen
name: pdf--processing   # consecutive hyphens not allowed
```

**description (good):**
```yaml
description: >
  Extracts text and tables from PDF files, fills PDF forms, and merges
  multiple PDFs. Use when working with PDF documents or when the user
  mentions PDFs, forms, or document extraction.
```

**description (poor):**
```yaml
description: Helps with PDFs.
```

**license:**
```yaml
license: Apache-2.0
license: Proprietary. LICENSE.txt has complete terms
```

**compatibility:**
```yaml
compatibility: Designed for Claude Code (or similar products)
compatibility: Requires git, docker, jq, and access to the internet
compatibility: Requires Python 3.14+ and uv
```

**metadata:**
```yaml
metadata:
  author: example-org
  version: "1.0"
```

**allowed-tools:**
```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

---

## 3. Progressive Disclosure Tiers

| Tier | What's Loaded | When | Token Cost |
|------|---------------|------|------------|
| 1. Catalog | `name` + `description` only | Session start | ~50–100 tokens per skill |
| 2. Instructions | Full `SKILL.md` body | Skill is activated | Recommended <5,000 tokens |
| 3. Resources | `scripts/`, `references/`, `assets/` files | When instructions reference them | Varies by file size |

**Why this matters:** An agent with 20 installed skills pays only the Tier 1 cost
(~2,000 tokens) at session start. Only activated skills consume Tier 2+ context.

---

## 4. Key Constraints Summary

| Constraint | Limit | Notes |
|------------|-------|-------|
| `name` length | 1–64 chars | Lowercase alphanumeric + hyphens |
| `name` format | `^[a-z0-9][a-z0-9-]*[a-z0-9]$` (for names >1 char) | No leading/trailing/consecutive hyphens |
| `name` matching | Must match directory name | Case-sensitive |
| `description` length | 1–1024 chars | Must be non-empty |
| `compatibility` length | 1–500 chars | Only if provided |
| `SKILL.md` body | <500 lines recommended | <5,000 tokens recommended |
| File references | One level deep from SKILL.md | Avoid deeply nested reference chains |

### Name Validation Rules

- ✓ Lowercase letters (`a-z`)
- ✓ Digits (`0-9`)
- ✓ Hyphens (`-`) in middle positions
- ✗ Uppercase letters
- ✗ Underscores
- ✗ Spaces
- ✗ Special characters
- ✗ Leading hyphen (`-skill-name`)
- ✗ Trailing hyphen (`skill-name-`)
- ✗ Consecutive hyphens (`skill--name`)

---

## 5. Optional Directories Reference

### `scripts/`

Executable code that agents can run. Scripts should:
- Be self-contained or clearly document dependencies
- Include helpful error messages
- Handle edge cases gracefully
- Support `--help` for usage documentation
- Avoid interactive prompts (agents can't respond to them)
- Use structured output (JSON preferred)
- Write helpful error messages

### `references/`

Additional documentation loaded on demand:
- Technical reference material
- Detailed guides and deep-dives
- Domain-specific documentation
- Keep files focused — smaller files mean less context cost

### `assets/`

Static resources:
- Templates (document templates, configuration templates)
- Images (diagrams, examples)
- Data files (lookup tables, schemas)

---

## 6. Body Content Guidelines

The Markdown body after the frontmatter contains the skill instructions. No format
restrictions — write whatever helps agents perform effectively.

**Recommended sections:**
- When to use this skill
- Step-by-step instructions
- Examples of inputs and outputs
- Common edge cases and gotchas
- Checklists for multi-step workflows
- Validation loops
- Cross-references to other files

**High-value patterns:**
- **Gotchas sections** — Concrete corrections to mistakes the agent will make
- **Output templates** — Concrete format examples rather than prose descriptions
- **Checklists** — Multi-step workflow tracking
- **Validation loops** — Do → validate → fix → repeat
- **Plan-Validate-Execute** — Create plan, validate it, then execute

### File References

Use relative paths from the skill root:
```markdown
See [the reference guide](references/REFERENCE.md) for details.
Run the extraction script: scripts/extract.py
```

Keep references one level deep. Avoid deeply nested reference chains.

---

## 7. Skill Creation Best Practices Summary

### Source Material

- **Extract from real tasks** — Complete a task with an agent, then extract the reusable pattern
- **Synthesize from artifacts** — Use existing docs, runbooks, style guides, API specs, code review comments
- **Refine with execution** — Run against real tasks, read traces, feed results back

### Context Efficiency

- **Add what the agent lacks, omit what it knows** — Focus on domain-specific, non-obvious knowledge
- **Design coherent units** — Encapsulate a unit of work that composes well
- **Aim for moderate detail** — Concise, stepwise guidance with working examples
- **Use progressive disclosure** — Keep SKILL.md under 500 lines; detail in referenced files

### Control Calibration

- **Match specificity to fragility** — Be prescriptive for fragile operations; give freedom for flexible ones
- **Provide defaults, not menus** — Pick one default, mention alternatives briefly
- **Favor procedures over declarations** — Teach *how to approach*, not just *what to produce*

### Quality Markers

- [ ] Every method has good AND bad examples
- [ ] Every convention has rationale explaining *why*
- [ ] Gotchas section covers non-obvious pitfalls
- [ ] Instructions are step-by-step procedures, not vague declarations
- [ ] Output templates show concrete format, not prose descriptions
- [ ] Validation steps verify work before proceeding

---

## 8. Validation Rules

### Strict Validation (skill won't load without these)

- `SKILL.md` exists in the skill directory
- Frontmatter is parseable YAML between `---` delimiters
- `name` field exists and is non-empty
- `description` field exists and is non-empty

### Lenient Validation (warnings, but skill still loads)

- Name doesn't match parent directory → warn, load anyway
- Name exceeds 64 characters → warn, load anyway
- Frontmatter contains unknown fields → ignore extra fields

### Skip Conditions (skill is skipped entirely)

- `description` missing or empty → skip, log error
- YAML completely unparseable → skip, log error
- `SKILL.md` file not found → skip

### Validation Tool

```bash
skills-ref validate ./my-skill
```

Checks frontmatter validity and naming conventions.

---

## 9. Client Parsing Notes

### Frontmatter Extraction

1. Find opening `---` at file start and closing `---` after it
2. Parse YAML block between them
3. Everything after closing `---`, trimmed, is the body content

### Handling Malformed YAML

Common issue: unquoted values containing colons.
```yaml
# Breaks parsing:
description: Use this skill when: the user asks about PDFs

# Fix: wrap in quotes or use block scalar:
description: "Use this skill when: the user asks about PDFs"
```

### What Clients Store

| Field | Description |
|-------|-------------|
| `name` | From frontmatter (required) |
| `description` | From frontmatter (required) |
| `location` | Absolute path to `SKILL.md` |

Store in an in-memory map keyed by `name` for fast lookup.

---

## 10. Quick Reference

### Creating a Skill (Minimal)

1. Create directory: `my-skill/`
2. Create `SKILL.md`:
   ```yaml
   ---
   name: my-skill
   description: What it does and when to use it.
   ---
   # My Skill
   Instructions here.
   ```
3. Place in `.agents/skills/my-skill/`

### Creating a Skill (Full)

1. Create directory matching desired skill name
2. Create `SKILL.md` with frontmatter + instructions + navigation index
3. Add `methods/` with documented techniques
4. Add `design/` with principles and patterns
5. Add `conventions/` with standards and rules
6. Add `scripts/` with executable tools
7. Add `references/` with detailed docs
8. Add `assets/` with templates and resources
9. Validate with `skills-ref validate ./my-skill`

### Recommended SKILL.md Structure

```markdown
---
name: skill-name
description: >
  Comprehensive description of what the skill does and when to use it.
---

# Skill Name

## When to Use This Skill
- Trigger condition 1
- Trigger condition 2

## Navigation Index
skill-name/
├── SKILL.md
├── methods/
├── design/
└── ...

## Shorthand Method Chapters
### Chapter 1: [Method Name]
**Purpose:** ...
**When to use:** ...
**Shorthand workflow:** ...
**Where to find full method:** methods/xxx.md

## Gotchas
- Non-obvious pitfall 1
- Non-obvious pitfall 2

## Creation Workflow Checklist
- [ ] Step 1
- [ ] Step 2
```

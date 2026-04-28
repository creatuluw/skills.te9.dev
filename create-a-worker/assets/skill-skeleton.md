# Skill Skeleton Template

> **INSTRUCTIONS:** This is a fill-in-the-blanks template for creating a new SKILL.md file.
> Replace all `[PLACEHOLDER]` values with your actual content. Remove or comment out sections
> that don't apply to your skill. Lines starting with `<!--` are instructions — remove them
> from your final skill.

---

## YAML Frontmatter

> The frontmatter is everything between the `---` delimiters at the top of SKILL.md.
> Only `name` and `description` are required. Include optional fields only if needed.

```yaml
---
# =============================================================================
# REQUIRED FIELDS — You must provide these
# =============================================================================

# REQUIRED: Skill identifier
# - Must be 1-64 characters
# - Lowercase letters, numbers, and hyphens only
# - Cannot start or end with a hyphen
# - Cannot contain consecutive hyphens
# - MUST match the parent directory name exactly
name: [skill-name]

# REQUIRED: What this skill does and when to use it
# - Must be 1-1024 characters
# - Describe both WHAT the skill does and WHEN to use it
# - Include specific keywords agents use to identify relevant tasks
# - Use YAML block scalar (>) for multi-line descriptions
description: >
  [One-sentence summary of what the skill produces].
  Use when [specific trigger conditions that activate this skill],
  [additional trigger conditions], or [edge case triggers].

# =============================================================================
# OPTIONAL FIELDS — Include only if applicable
# =============================================================================

# OPTIONAL: License for the skill
# - Short license name or reference to bundled LICENSE file
# - Omit if not applicable
license: [Apache-2.0 | MIT | Proprietary. LICENSE.txt has complete terms]

# OPTIONAL: Environment or compatibility requirements
# - Must be 1-500 characters if provided
# - Only include if the skill has specific environment needs
# - Omit for most skills
compatibility: >
  [Requires Python 3.14+ and uv |
   Requires git, docker, jq, and access to the internet |
   Designed for Claude Code (or similar products)]

# OPTIONAL: Additional metadata as key-value pairs
# - Keys and values are strings
# - Use for any extra properties not covered by other fields
# - Recommend reasonably unique key names to avoid conflicts
metadata:
  author: [author-or-org-name]
  version: "[major.minor.patch]"

# OPTIONAL: Pre-approved tools the skill may use (Experimental)
# - Space-separated list of tools
# - Only include if you need to allowlist specific tool patterns
# - Support may vary between agent implementations
allowed-tools: [Bash(git:*) Bash(jq:*) Read]
---
```

---

## SKILL.md Body Template

> Everything below the closing `---` is the skill's body content.
> The body contains the instructions agents will follow when the skill is activated.
> Keep the body under 500 lines and 5000 tokens. Move detail to referenced files.

```markdown
<!-- MAIN HEADING — Use the skill's human-readable name -->
# [Skill Name] — [Subtitle/Role Description]

<!-- One-paragraph overview of what this skill produces and the quality standard -->
[2-3 sentences explaining the skill's purpose, the expertise it carries, and the standard
of work it produces. Frame this as what the worker should aspire to accomplish.]

## When to Use This Skill

<!-- List specific conditions that should trigger skill activation -->
<!-- Be precise — this helps agents decide whether to activate -->

- [Specific task or situation that requires this skill]
- [Another trigger condition with concrete details]
- [Edge case or specialized scenario this skill handles]
- [Domain-specific terminology or concept that indicates relevance]

---

## Navigation Index

<!-- This file tree shows the skill's complete anatomy -->
<!-- Every file the skill contains should appear here -->
<!-- Use the format: filename → Purpose: [description] for referenced files -->
<!-- The "← You are here" marker should appear next to SKILL.md -->

```
[skill-name]/
├── SKILL.md                          ← You are here
│
├── methods/                          ← REQUIRED — All implementation methods & techniques
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── [method-1].md                 → Purpose: [What this method accomplishes]
│   ├── [method-2].md                 → Purpose: [What this method accomplishes]
│   └── [method-3].md                 → Purpose: [What this method accomplishes]
│
├── design/                           ← Design principles & architecture rules
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── [principles].md               → [Core design principles for the domain]
│   ├── [patterns].md                 → [Architectural and design patterns]
│   └── [models].md                   → [Domain modeling guidance]
│
├── conventions/                      ← Conventions the worker must follow
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── naming-and-structure.md       → Naming, structure, and format conventions
│   ├── style-guide.md                → Writing and formatting conventions
│   └── quality-standards.md          → Standards for production-ready output
│
├── scripts/                          ← Executable tools
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── [validate].sh                 → [What this script validates/does]
│   └── [generate].py                 → [What this script generates/builds]
│
├── sources/                          ← Reference sources and specifications
│   ├── README.md                     → Purpose, usage guide, content checklist
│   └── [reference].md                → [External spec or reference summary]
│
└── assets/                           ← Templates and static resources
    ├── README.md                     → Purpose, usage guide, content checklist
    ├── [template].md                 → [What this template is for]
    └── [checklist].md                → [What this checklist verifies]
```

---

## Shorthand Method Chapters

<!-- Each chapter summarizes a key method the worker needs. -->
<!-- Include: Purpose, When to use, Shorthand workflow, Critical rule -->
<!-- Link to the full method file in methods/ for detailed instructions -->
<!-- Keep each chapter to 15-25 lines. Detail lives in the referenced file. -->

### Chapter 1: [Method Name]

**Purpose:** [One sentence explaining what this method accomplishes and why it matters.]

**When to use:** [Specific conditions that trigger this method. Be concrete about signals
that indicate "this is the right approach."]

**Where to find full method:** `methods/[method-filename].md`

**Shorthand workflow:**
1. **[Step 1 action]** — [What to do and why]
2. **[Step 2 action]** — [What to do and why]
3. **[Step 3 action]** — [What to do and why]
4. **[Step 4 action]** — [What to do and why]
5. **[Step 5 action]** — [What to do and why]

**Critical rule:** [The one thing the worker must never skip or violate when using
this method. Explain what goes wrong if this rule is ignored.]

---

### Chapter 2: [Method Name]

**Purpose:** [One sentence explaining what this method accomplishes and why it matters.]

**When to use:** [Specific conditions that trigger this method.]

**Where to find full method:** `methods/[method-filename].md`

**Shorthand workflow:**
1. **[Step 1 action]** — [What to do and why]
2. **[Step 2 action]** — [What to do and why]
3. **[Step 3 action]** — [What to do and why]
4. **[Step 4 action]** — [What to do and why]

**Critical rule:** [The non-negotiable rule for this method.]

---

### Chapter 3: [Method Name]

**Purpose:** [One sentence explaining what this method accomplishes and why it matters.]

**When to use:** [Specific conditions that trigger this method.]

**Where to find full method:** `methods/[method-filename].md`

**Shorthand workflow:**
1. **[Step 1 action]** — [What to do and why]
2. **[Step 2 action]** — [What to do and why]
3. **[Step 3 action]** — [What to do and why]

**Critical rule:** [The non-negotiable rule for this method.]

---

<!-- ADD MORE CHAPTERS AS NEEDED -->
<!-- Typical skills have 5-9 shorthand chapters -->
<!-- Each covers one major method or technique -->
<!-- Order by frequency: most commonly used methods first -->

## Gotchas

<!-- This is often the highest-value section in a skill. -->
<!-- List concrete corrections to mistakes the worker WILL make. -->
<!-- Each gotcha should explain: the mistake, why it happens, and the correct approach. -->

- **[Gotcha pattern name].** [Description of the non-obvious pitfall. Explain what goes
  wrong, why it's tempting to do the wrong thing, and what to do instead.]

- **[Gotcha pattern name].** [Another common mistake with correction. Include specific
  details like variable names, file paths, or configuration values that get confused.]

- **[Gotcha pattern name].** [Edge case that catches practitioners off guard. Reference
  the correct method or pattern to use instead.]

- **[Gotcha pattern name].** [Situational pitfall. Describe the scenario where this
  mistake occurs and the explicit check or step that prevents it.]

- **[Gotcha pattern name].** [Terminology confusion or naming collision. Clarify what
  term means what in which context.]

---

## Task Tracking System

<!-- When creating work with this skill, maintain a running task list. -->
<!-- Re-display status at the start of each major step and when asked. -->

**When to use:** Every time the worker begins a complex task, initialize this tracking
system. Mark completed items with ✅. Announce start and completion of each task.

### Phase 1: [Discovery/Planning Phase Name]

- [ ] **T1.1** [First discovery step] — [Brief description]
- [ ] **T1.2** [Second discovery step] — [Brief description]
- [ ] **T1.3** [Third discovery step] — [Brief description]

### Phase 2: [Implementation Phase Name]

- [ ] **T2.1** [First implementation step] — [Brief description]
- [ ] **T2.2** [Second implementation step] — [Brief description]
- [ ] **T2.3** [Third implementation step] — [Brief description]

### Phase 3: [Validation Phase Name]

- [ ] **T3.1** [First validation step] — [Brief description]
- [ ] **T3.2** [Second validation step] — [Brief description]
- [ ] **T3.3** [Third validation step] — [Brief description]

**How to use this list:**
1. At the start of each session, re-display current task list status
2. When starting a task, announce it: "Starting **T2.1**: [description]"
3. When completing a task, mark it: "Completed **T2.1** ✅"
4. When asked for status, display full list with progress
5. Never mark a task complete until it passes its own quality criteria

**Progress summary format:**
```
Phase 1: [Discovery]    [█████████░] 2/3  — [Current status]
Phase 2: [Implementation] [░░░░░░░░░░] 0/3
Phase 3: [Validation]   [░░░░░░░░░░] 0/3
```
```

---

## Usage Notes for Template Users

> **This section is meta-guidance for skill creators. Remove it from your final SKILL.md.**

### What to customize:
1. **Frontmatter** — Fill in all `[PLACEHOLDER]` values. Remove optional fields you don't use.
2. **Main heading** — Use a clear, descriptive name for your skill.
3. **When to Use** — List 4-8 specific trigger conditions with concrete keywords.
4. **Navigation Index** — Replace with your actual file tree. Use descriptive purpose annotations.
5. **Shorthand Chapters** — Include one chapter per major method (5-9 chapters typical).
6. **Gotchas** — Add 5-10 domain-specific pitfalls with corrections.
7. **Checklist** — Reflect your actual workflow steps in order.

### What NOT to change:
- The overall structure (frontmatter → heading → when-to-use → index → chapters → gotchas → task tracking)
- The shorthand chapter format (Purpose → When to use → Where to find → Workflow → Critical rule)
- The gotcha format (bold pattern name → explanation with correction)
- `methods/` being marked as REQUIRED — a worker without methods cannot solve problems

### Size targets:
- **Total SKILL.md body:** Under 500 lines, under 5000 tokens
- **Each shorthand chapter:** 15-25 lines
- **Gotchas section:** 15-30 lines
- **Navigation index:** 20-40 lines
- **Task tracking:** Phased with numbered tasks (T1.1, T1.2, etc.)

### Required directories:
- **`methods/`** — REQUIRED. A worker without methods cannot solve problems. Must contain at
  least one method file with purpose, when-to-use, procedure, good/bad examples, gotchas.
- **`README.md` in each subfolder** — REQUIRED. Each must contain: purpose, why it's used,
  when to use it, what to add, where to find instructions, and a post-creation checklist.
- All other directories (`design/`, `conventions/`, `scripts/`, `sources/`, `assets/`) are
  optional in presence but mandatory in quality if included.
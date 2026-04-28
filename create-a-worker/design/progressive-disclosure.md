# Progressive Disclosure Design Patterns

## Overview

Progressive disclosure is the architectural backbone of effective skill design. It ensures that workers receive the right information at the right time—never too much, never too little, and always in an order that builds understanding naturally.

This document provides concrete patterns for implementing progressive disclosure in skill design.

---

## 1. The 3-Tier Model Explained

### Tier 1: Catalog (SKILL.md)

**Purpose**: Orientation and routing

The catalog tier answers two questions:
1. "Can this skill help me?"
2. "Where do I find what I need?"

**Characteristics**:
- Always loaded first
- Never exceeds ~250 lines
- Contains no procedures, only pointers
- Uses shorthand descriptions, not explanations

**Content types**:
- Skill identity and purpose statement
- Capability catalog (what this skill does)
- Method index with one-line descriptions
- Critical conventions summary (3-5 rules maximum)
- Scope boundaries (what this skill does NOT do)

**Loading trigger**: Worker receives a task that may require this skill.

### Tier 2: Instructions (methods/)

**Purpose**: Actionable procedures

The instruction tier answers:
1. "How do I accomplish X?"
2. "What steps should I follow?"

**Characteristics**:
- Loaded on-demand based on task
- Each file is self-contained for one purpose
- Uses imperative language ("Do this", "Check that")
- Includes decision points, not just linear steps
- May reference Tier 3 for deep context

**Content types**:
- Step-by-step procedures
- Decision trees and flowcharts (text-based)
- Templates and checklists
- Conditional logic ("If X, do Y; otherwise do Z")
- Validation criteria (how to know you're done)

**Loading trigger**: Worker identifies a specific task to perform.

### Tier 3: Resources (design/, conventions/, sources/)

**Purpose**: Depth and understanding

The resource tier answers:
1. "Why is it done this way?"
2. "What are the underlying principles?"
3. "What does good look like?"

**Characteristics**:
- Loaded selectively based on need
- Provides rationale, not just rules
- Supports judgment calls and edge cases
- Relatively stable (changes less often than methods)

**Content types**:
- Design principles and rationale
- Standards and conventions
- Examples and reference implementations
- Historical context and evolution notes
- Cross-domain references

**Loading trigger**: Worker needs to understand context, make a judgment call, or handle an edge case.

---

## 2. How to Decide What Goes in Each Tier

### The Placement Decision Framework

When adding knowledge to a skill, answer these questions in order:

**Question 1: "Does the worker need to know this exists?"**
- If YES: Add a reference to SKILL.md (Tier 1)
- If NO: It belongs in a deeper tier

**Question 2: "Is this a step-by-step procedure for accomplishing a task?"**
- If YES: Add to methods/ (Tier 2)
- If NO: Continue to Question 3

**Question 3: "Is this a rule that must always be followed?"**
- If YES: Add to conventions/ (Tier 3)
- If NO: Continue to Question 4

**Question 4: "Is this context that supports understanding or judgment?"**
- If YES: Add to design/ (Tier 3)
- If NO: Continue to Question 5

**Question 5: "Is this a concrete example or reference implementation?"**
- If YES: Add to sources/ (Tier 3)
- If NO: Reconsider whether this knowledge belongs in the skill at all

### Common Placement Mistakes

**Mistake 1: Putting procedures in SKILL.md**
Workers load SKILL.md for orientation. If it contains full procedures, they consume tokens on content they may not need. Put procedures in methods/ and references in SKILL.md.

**Mistake 2: Putting principles in methods/**
Methods should tell you HOW, not WHY. If a method spends more time explaining rationale than giving steps, the rationale belongs in design/.

**Mistake 3: Duplicating conventions across files**
Conventions should live in conventions/ and be referenced from methods. Don't copy the same rules into every method file.

**Mistake 4: Creating resources no one references**
Every file in Tier 3 should be referenced by at least one Tier 2 file. If a resource isn't referenced, it's orphaned content that wastes space.

---

## 3. Shorthand Chapter Design: The Bridge Between Tiers

### What Are Shorthand Chapters?

Shorthand chapters are summary sections in Tier 2 files that capture essential knowledge from Tier 3 resources. They bridge the gap between procedural instructions and deep context.

**Purpose**: Allow a worker to handle common cases without loading Tier 3, while providing a clear path to depth when needed.

### Anatomy of a Shorthand Chapter

```markdown
## Error Handling

**Rule**: Log before throwing. Include context.

For standard cases:
1. Log error with operation name and input summary
2. Throw descriptive error with recovery suggestions

For complex cases, load `design/error-handling.md` for:
- Retry strategies
- Error categorization
- User-facing error messages
```

This pattern:
- States the core rule (one line)
- Provides steps for the common case (brief)
- Points to depth for complex cases (file reference)

### When to Use Shorthand Chapters

Use shorthand chapters when:
- The concept is needed frequently but has deep complexity
- 80% of cases are simple, 20% require nuanced understanding
- Loading the full resource would waste tokens for most uses

Don't use shorthand chapters when:
- The concept is simple (just state it directly)
- The concept is rarely needed (put it only in Tier 3)
- The summary would be misleading without the full context

### Shorthand Chapter Patterns

**Pattern 1: Rule + Reference**
```markdown
## Naming Conventions

Use camelCase for variables, PascalCase for types.
See `conventions/naming.md` for complete rules.
```

**Pattern 2: Summary + Expansion**
```markdown
## Authentication

Standard auth uses API keys in headers.
For OAuth flows or token refresh, load `methods/auth-advanced.md`.
```

**Pattern 3: Checklist + Detail**
```markdown
## Code Review Checklist
- [ ] Tests pass
- [ ] No hardcoded values
- [ ] Error handling present

For review criteria details, see `design/review-standards.md`.
```

---

## 4. File Reference Patterns

### The One-Level-Deep Rule

File references should be one level deep. A method file may reference a design document, but that design document should not reference another document that references yet another.

**Valid**:
```
methods/create-skill.md → design/skill-architecture.md
```

**Avoid**:
```
methods/create-skill.md → design/skill-architecture.md → design/advanced-patterns.md → sources/examples.md
```

Deep reference chains create:
- Loading unpredictability (how much will this really cost?)
- Navigation confusion (where did I start?)
- Maintenance complexity (changing any link breaks the chain)

### Relative Path Conventions

Always use relative paths from the skill root:
```markdown
See `design/skill-architecture.md`
See `methods/create-skill.md`
See `conventions/file-naming.md`
```

Never use:
- Absolute paths (breaks portability)
- Paths with `../` (implies inappropriate directory structure)
- URLs to external resources (workers may not have access)

### Reference Formatting

Use consistent formatting for file references:
```markdown
Load `design/skill-architecture.md` for complete architectural principles.
```

Elements:
- Action verb ("Load", "See", "Reference")
- File path in backticks
- Purpose statement

### When to Reference vs. Inline

**Reference** when:
- Content exceeds 10 lines
- Content is used by multiple methods
- Content may change independently
- Content is not needed for the common case

**Inline** when:
- Content is 1-3 lines
- Content is unique to this method
- Content is critical for every execution
- Summarizing it would lose essential detail

---

## 5. Navigation Design: How Workers Find What They Need

### The Orientation Workflow

Workers navigate skills through this workflow:

```
1. Load SKILL.md
   ↓
2. Scan capability catalog → "Does this skill handle my task?"
   ↓ YES
3. Scan method index → "Which method applies?"
   ↓
4. Load identified method
   ↓
5. Follow procedure → "Do I need additional context?"
   ↓ YES
6. Load referenced resource
```

### Designing for Discoverability

**Use descriptive method names**:
- ✅ `methods/create-new-skill.md`
- ✅ `methods/debug-skill-structure.md`
- ❌ `methods/process.md`
- ❌ `methods/handle.md`

**Group by intent, not implementation**:
- ✅ "Creating Skills" section with related methods
- ❌ "File Operations" section that mixes purposes

**Provide situation-based navigation**:
```markdown
## Common Situations

"I need to create a skill from scratch"
→ Load `methods/create-new-skill.md`

"I need to fix a broken skill"
→ Load `methods/debug-skill-structure.md`

"I need to add a new method to an existing skill"
→ Load `methods/extend-skill.md`
```

### The "Lost Worker" Problem

A worker is "lost" when it:
- Loads multiple methods but can't determine which applies
- Reads SKILL.md but cannot identify a relevant method
- Follows a procedure but produces incorrect output

Prevent lost workers by:
- Making method descriptions specific and distinguishable
- Including "when to use this" sections in method files
- Providing decision trees for ambiguous situations
- Adding validation checkpoints in procedures

---

## 6. Context Management Strategies for Large Domains

### The Compression Challenge

Large domains have more knowledge than fits in a worker's context window. The solution is not to omit knowledge but to compress it into layered, loadable structures.

### Strategy 1: Branching Methods

Instead of one large method, create a decision method that branches:

```markdown
# methods/handle-request.md

## Step 1: Classify Request Type
- Simple read → Load `methods/handle-read.md`
- Complex query → Load `methods/handle-query.md`
- Write operation → Load `methods/handle-write.md`
```

Each branch is a separate, focused method file.

### Strategy 2: Template Extraction

Move templates and boilerplate to sources/:

```markdown
# methods/create-component.md

## Step 3: Generate boilerplate
Load `sources/component-template.md` and customize.
```

### Strategy 3: Principle-Based Methods

For domains with infinite variation, provide principles rather than exhaustive cases:

```markdown
## Handling Unknown Inputs

When input doesn't match documented patterns:
1. Validate against safety rules (see `conventions/safety.md`)
2. Apply the principle of least surprise
3. Default to conservative behavior
4. Log the unknown pattern for skill improvement
```

### Strategy 4: Progressive Method Depth

Offer methods at multiple depth levels:

```markdown
## Quick Method (5 steps, covers 80% of cases)
1-5 basic steps...

## Full Method (15 steps, covers all cases)
Load `methods/advanced-processing.md` for edge cases and complex scenarios.
```

---

## 7. When to Break the 500-Line Rule

### Why 500 Lines?

The 500-line guideline exists because:
- Most files can be fully loaded in a single context window
- Workers can maintain focus and coherence
- It forces healthy separation of concerns
- Files remain human-maintainable

### Valid Reasons to Exceed 500 Lines

**Reason 1: Inherent Complexity**
Some procedures genuinely require extensive documentation. A 20-step deployment process with decision trees at each step may need 600 lines.

**Reason 2: Critical Reference Tables**
Comprehensive lookup tables or configuration references that must be complete to be useful.

**Reason 3: Tutorial-Style Methods**
Methods that teach complex concepts through extended walkthrough may need more space.

### How to Handle Exceeding 500 Lines

**Approach 1: Verify Necessity**
Audit every section. Remove anything that:
- Is duplicated elsewhere
- Can be replaced by a file reference
- Supports rare edge cases that could be in a separate file

**Approach 2: Split by Concern**
If the file covers multiple purposes, split it:
- `methods/deploy-production.md` (common path)
- `methods/deploy-advanced.md` (edge cases and rollback)

**Approach 3: Use Shorthand Expansion**
Keep the main file under 500 lines with shorthand chapters, and create companion files for expanded content:
- `methods/deploy.md` (main procedure with summaries)
- `design/deploy-deep-dive.md` (expanded rationale and edge cases)

**Approach 4: Table of Contents with Sections**
For files that must be long, add a clear table of contents and use section headers that allow workers to navigate to what they need:
```markdown
## Table of Contents
1. Prerequisites (lines 10-45)
2. Standard Deployment (lines 46-120)
3. Blue-Green Deployment (lines 121-200)
4. Rollback Procedures (lines 201-260)
```

### Documentation Justification

When a file exceeds 500 lines, add a comment at the top explaining why:
```markdown
<!-- This file is 600 lines because the deployment process has 15 mandatory
     steps with decision trees at steps 4, 8, and 12. Splitting would require
     workers to load multiple files for a single atomic operation. -->
```

---

## Summary: Progressive Disclosure Checklist

- [ ] **Tier 1 is lean**: SKILL.md is under 250 lines and contains no procedures
- [ ] **Tier 2 is actionable**: Every method file provides clear steps, not just theory
- [ ] **Tier 3 is purposeful**: Every resource file is referenced by at least one method
- [ ] **Shorthand chapters bridge gaps**: Common cases work without loading Tier 3
- [ ] **File references are one level deep**: No chains deeper than one reference
- [ ] **Navigation is discoverable**: Workers can find what they need from SKILL.md alone
- [ ] **Context is managed**: Large domains use branching, templates, and progressive depth
- [ ] **500-line exceptions are justified**: Any file exceeding the limit has a documented reason

Progressive disclosure is not about withholding information—it is about delivering information at the moment it becomes relevant. A well-designed progressive disclosure pattern makes a skill feel effortless to use, as if the worker always has exactly the knowledge it needs at hand.
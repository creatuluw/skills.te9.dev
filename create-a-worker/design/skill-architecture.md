# Skill Architecture Design Principles

## Overview

A well-architected skill is not a documentation dump—it is a structured knowledge system designed for efficient consumption by AI workers. The architecture determines how quickly a worker can orient, how accurately it can act, and how sustainably it can operate within token constraints.

This document establishes the foundational principles for structuring a skill that maximizes effectiveness while minimizing waste.

---

## 1. Progressive Disclosure as Architectural Foundation

### The Core Principle

Progressive disclosure is not a feature of good skill architecture—it is the architecture. Every structural decision should be evaluated against this question: "Does this require the worker to load information before it needs it?"

If the answer is yes, the architecture is wrong.

### Why Progressive Disclosure Matters

AI workers operate within finite context windows. Every token loaded has a cost:
- **Direct cost**: The token consumes space that could be used for task-relevant context
- **Attention cost**: More tokens means more noise, reducing the worker's ability to focus on what matters
- **Latency cost**: Larger contexts slow processing and increase response time

A skill that loads everything at once is like an encyclopedia that requires you to read every entry before looking up what you need. It's technically complete but practically unusable.

### The Progressive Disclosure Spectrum

Architecture should support natural disclosure along these axes:

1. **Temporal**: What is needed now vs. what might be needed later
2. **Specificity**: General orientation vs. detailed procedures
3. **Frequency**: Common operations vs. rare edge cases
4. **Dependency**: Foundational concepts vs. advanced applications

### Designing for Progressive Disclosure

Structure your skill so that:
- A worker can start working after reading only `SKILL.md` and one method file
- Additional depth is loaded on-demand, not preemptively
- The most common 80% of use cases require no more than 20% of the skill's total content
- Cross-references point to files, not embed their content

---

## 2. Knowledge Layering: Catalog → Instructions → Resources

### The Three-Tier Model

Skills organize knowledge into three distinct layers, each serving a different purpose:

**Tier 1: Catalog (SKILL.md)**
- Purpose: Orientation and navigation
- Content: Identity, capabilities, and pointers to methods
- Analogy: A map showing what exists and where to find it
- Token cost: Should be readable in a single context window

**Tier 2: Instructions (methods/)**
- Purpose: Actionable procedures and workflows
- Content: Step-by-step processes, decision trees, templates
- Analogy: A cookbook with recipes organized by purpose
- Token cost: One method should be loadable at a time

**Tier 3: Resources (design/, conventions/, sources/)**
- Purpose: Reference material and deep context
- Content: Principles, standards, examples, historical context
- Analogy: A reference library you visit when you need depth
- Token cost: Loaded selectively based on need

### How Layers Interact

The layers form a dependency chain:
```
Tier 1 (Catalog)
    ↓ "I need to do X, where is it?"
Tier 2 (Instructions)
    ↓ "X requires understanding Y, where is that?"
Tier 3 (Resources)
```

Workers should flow downward through layers. A well-designed skill never requires a worker to jump directly to Tier 3 without passing through Tier 2 first—the method file provides the context for why the resource matters.

### Layering in Practice

When adding knowledge to a skill, ask:
1. "Is this something a worker needs to know exists?" → Tier 1
2. "Is this a procedure for doing something?" → Tier 2
3. "Is this context that supports understanding or judgment?" → Tier 3

When in doubt, push knowledge deeper. It's easier to load additional context than to unload irrelevant context.

---

## 3. The Index Pattern: SKILL.md as Map, Not Manual

### The Map Metaphor

`SKILL.md` is not a user manual—it is a map. A good map shows:
- What terrain exists (capabilities)
- Where things are located (file references)
- How to navigate between points (cross-references)
- Landmarks for orientation (key concepts)

A bad map tries to:
- Explain the geology of every mountain (detailed procedures)
- Include every hiking trail ever walked (exhaustive examples)
- Teach map-reading skills (foundational concepts)

### Structural Elements of SKILL.md

An effective `SKILL.md` contains:

1. **Identity Section**: What this skill is and who should use it
2. **Capability Catalog**: What this skill can do, organized by purpose
3. **Method Index**: Available methods with one-line descriptions
4. **Navigation Aids**: How to find what you need based on your situation
5. **Conventions Summary**: Critical rules that apply everywhere (brief)

### The "30-Second Test"

A worker should be able to read `SKILL.md` and, within 30 seconds of processing, know:
- Whether this skill is relevant to their current task
- Which method to load for their immediate need
- What conventions they must follow

If `SKILL.md` cannot pass this test, it is either too long, too vague, or poorly organized.

### Anti-Pattern: The Kitchen Sink SKILL.md

Symptoms:
- SKILL.md exceeds 300 lines
- It contains full procedures instead of pointers
- Workers load it and immediately have context overflow
- It duplicates content found in method files

Fix: Move everything that isn't navigation or orientation to a deeper layer.

---

## 4. Separation of Concerns: Directory Structure

### Why Directories Are Separate

Each directory in a skill serves a distinct role in the progressive disclosure model. Mixing concerns breaks the architecture.

**methods/**
- Contains actionable procedures: "How to do X"
- Organized by task or workflow
- Each file is self-contained for a single purpose
- Workers load one method at a time, as needed

**design/**
- Contains principles and rationale: "Why we do things this way"
- Provides judgment support, not step-by-step instructions
- Workers load when they need to understand trade-offs or make design decisions
- Should inform method creation, not duplicate it

**conventions/**
- Contains rules and standards: "What must always be true"
- Defines constraints that apply across all methods
- Workers load when they need to verify compliance
- Should be referenced from methods, not repeated

**sources/** (optional)
- Contains reference material and examples: "What does good look like"
- Provides concrete instances of abstract concepts
- Workers load when they need templates, examples, or historical reference
- Should be curated, not exhaustive

### The Dependency Rule

Dependencies flow in one direction:
```
methods/ → depends on → design/
methods/ → depends on → conventions/
methods/ → may reference → sources/

design/ → independent
conventions/ → independent
sources/ → depends on → conventions/
```

Methods never depend on other methods (no cross-references between method files). If two methods share logic, that logic belongs in a resource they both reference.

### Circular Dependencies

A circular dependency exists when:
- File A references File B which references File A
- A worker cannot understand one concept without first understanding another

Circular dependencies indicate either:
1. Concepts that should be merged (they're actually one concept)
2. Missing abstraction (a third concept should exist that both reference)
3. Over-splitting (the separation is artificial)

Fix circular dependencies by identifying the shared core and extracting it.

---

## 5. Context Budget Architecture

### Understanding Token Economics

Every skill interaction has a token budget. The architecture must optimize for efficient use of that budget:

```
Total Budget = System Prompt + Skill Content + Task Context + Output Space

Skill Content = SKILL.md + Loaded Methods + Loaded Resources
```

The goal: Minimize Skill Content while maximizing worker effectiveness.

### Budget Allocation Guidelines

For a typical interaction:
- **SKILL.md**: 5-10% of skill content budget
- **Primary method**: 40-60% of skill content budget
- **Supporting resources**: 20-40% of skill content budget
- **Margin for unexpected loads**: 10-20% reserve

### The 500-Line Guideline

Individual files should generally stay under 500 lines because:
1. Most files can be fully loaded in a single context window
2. Workers can process the content without losing track of structure
3. It forces healthy separation of concerns
4. It makes files maintainable by humans

When a file exceeds 500 lines, it's usually because:
- It's doing too many things (split into multiple files)
- It includes too much reference material (extract to sources/)
- It's overly verbose (apply knowledge compression)

### Budget Optimization Strategies

**Strategy 1: Shorthand Chapters**
Use summary sections in methods that can be expanded by loading full resources. A method says "Apply error handling pattern" and a worker can load the error handling design document if needed.

**Strategy 2: Conditional Sections**
Structure methods so common paths are clearly separated from edge cases. A worker following the common path can skip edge case sections.

**Strategy 3: Reference Patterns**
Instead of duplicating content, use file references:
```
# Error Handling
See conventions/error-handling.md for complete standards.
Key rule: Always log before throwing.
```

**Strategy 4: Progressive Detail**
Start with the minimum viable procedure, then offer expansion points:
```
## Basic Procedure
1. Validate input
2. Process data
3. Return result

## For Complex Cases
Load methods/complex-processing.md for handling edge cases.
```

---

## 6. The Expert Assistant Model

### How Experts Behave

A well-architected skill mimics the behavior of a human expert assistant:

1. **Orients quickly**: An expert assesses a situation before acting
2. **Knows what they know**: An expert can identify relevant procedures without reading their entire reference library
3. **Loads context on demand**: An expert consults references when needed, not preemptively
4. **Applies judgment**: An expert understands principles, not just rules
5. **Knows boundaries**: An expert recognizes when something is outside their scope

### Mapping Expert Behavior to Skill Architecture

| Expert Behavior | Skill Architecture |
|-----------------|-------------------|
| Orients quickly | Clear SKILL.md with capability catalog |
| Knows what they know | Method index with descriptive names |
| Loads on demand | File references instead of inline content |
| Applies judgment | design/ directory with principles |
| Knows boundaries | Explicit scope definition in SKILL.md |

### The "Apprentice Test"

Would this skill architecture enable a competent but inexperienced worker to produce expert-quality work? If yes, the architecture is well-designed.

Signs of failure:
- The worker must guess which method to use
- The worker loads content it never uses
- The worker produces correct output but cannot explain why
- The worker cannot handle situations slightly outside documented procedures

---

## 7. Anti-Patterns

### Anti-Pattern 1: The Monolithic Skill

**Symptoms**: A single massive file (or a few very large files) containing everything.

**Problems**:
- Workers must load the entire skill even for simple tasks
- Updates risk breaking unrelated functionality
- No clear navigation or structure
- Token costs are predictably high

**Fix**: Apply the three-tier model. Extract procedures to methods/, principles to design/, rules to conventions/.

### Anti-Pattern 2: Circular References

**Symptoms**: File A references File B, which references File A. Or, understanding Concept X requires first understanding Concept Y, which requires understanding Concept X.

**Problems**:
- Workers enter infinite loops trying to resolve references
- No clear starting point for loading context
- Maintenance changes propagate in unpredictable ways

**Fix**: Identify the foundational concept, make it independent, and have both files reference it instead of each other.

### Anti-Pattern 3: Deep Nesting

**Symptoms**: Directory structures more than 2 levels deep. Files buried in methods/category/subcategory/type/.

**Problems**:
- File paths become long and error-prone
- Workers struggle to construct correct paths
- The hierarchy implies relationships that may not exist
- Navigation requires understanding the full tree

**Fix**: Flatten to 2 levels maximum. Use file naming conventions to encode category information: `methods/api-auth-setup.md` instead of `methods/api/auth/setup.md`.

### Anti-Pattern 4: The Reference Dump

**Symptoms**: A skill that is essentially a repackaged version of external documentation.

**Problems**:
- Not optimized for AI consumption
- Lacks procedural guidance (how to use the knowledge)
- Often outdated or uncurated
- Workers can access the original documentation directly

**Fix**: Extract procedural knowledge into methods. Use design/ to explain how to apply the documentation, not duplicate it.

### Anti-Pattern 5: The Over-Specified Skill

**Symptoms**: Every possible edge case is documented. Methods have 20+ steps covering every scenario.

**Problems**:
- Token costs explode for even simple tasks
- Workers spend more time reading than doing
- Maintenance burden is unsustainable
- The skill becomes brittle (any change affects many scenarios)

**Fix**: Document the 80% case thoroughly. Provide principles (in design/) for handling the remaining 20%, rather than enumerating every possibility.

---

## Summary: Architecture Checklist

Before finalizing a skill's architecture, verify:

- [ ] **Progressive disclosure**: Can a worker start working after reading only SKILL.md + 1 method?
- [ ] **Three-tier model**: Is knowledge properly layered (catalog → instructions → resources)?
- [ ] **Map, not manual**: Does SKILL.md orient and navigate, not teach?
- [ ] **Separation of concerns**: Are methods, principles, and rules in distinct directories?
- [ ] **Context budget**: Can common tasks be completed within reasonable token limits?
- [ ] **Expert model**: Would this architecture enable expert-quality work from a competent worker?
- [ ] **No anti-patterns**: Is the skill free of monoliths, circular references, and deep nesting?

A well-architected skill feels effortless to use. The worker always knows where to find what it needs, loads only what is necessary, and produces high-quality work consistently. If the architecture creates friction, confusion, or waste, it needs redesign.
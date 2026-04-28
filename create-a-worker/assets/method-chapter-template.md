# [Method Name]

> **Template:** Replace all `[placeholders]` with your method-specific content.
> Delete sections that don't apply. Keep section headers that DO apply.

One-sentence summary of what this method achieves and why it matters.

## Purpose

<!-- What does this method accomplish? Why does it exist? What problem does it solve? -->
<!-- Explain the value this method provides to the worker. -->

[Describe the purpose of this method in 2-4 sentences. Explain what it produces and why
that output is valuable for the domain.]

## When to Use

<!-- List specific conditions/scenarios that trigger this method. -->
<!-- Be precise — this helps the agent know WHEN to load this file. -->

Use this method when:
- [Condition 1 — e.g., "Creating a new REST API endpoint"]
- [Condition 2 — e.g., "Modifying existing API response structures"]
- [Condition 3 — e.g., "The user asks about [domain-specific topic]"]

Do NOT use this method when:
- [Anti-condition 1 — e.g., "Building GraphQL APIs (use method-X instead)"]
- [Anti-condition 2 — e.g., "The task only requires documentation, not implementation"]

---

## Prerequisites

<!-- Optional: Remove this section if the method has no prerequisites. -->

Before using this method, ensure:
- [ ] [Prerequisite 1 — e.g., "Domain model is defined (see `design/domain-model.md`)"]
- [ ] [Prerequisite 2 — e.g., "Naming conventions are established (see `conventions/naming.md`)"]
- [ ] [Prerequisite 3 — e.g., "Required tools are installed: tool1, tool2"]

**Dependencies:** [List any files, scripts, or external resources this method depends on]

---

## Step-by-Step Procedure

<!-- The core of the method. Favor procedures over declarations. -->
<!-- Each step should be actionable — tell the agent WHAT to do, not just what to produce. -->

### Step 1: [Action Verb] + [Object]

<!-- What to do in this step -->

**Actions:**
1. [Specific action to take]
2. [Specific action to take]
3. [Specific action to take]

**Output:** [What this step produces — e.g., "Domain Boundary Statement", "Field mapping file"]

**Example:**
```
[Show what the output of this step looks like]
```

### Step 2: [Action Verb] + [Object]

**Actions:**
1. [Specific action to take]
2. [Specific action to take]

**Output:** [What this step produces]

**Example:**
```
[Show what the output of this step looks like]
```

### Step 3: [Action Verb] + [Object]

<!-- Add as many steps as needed. Typically 3-8 steps is ideal. -->
<!-- If the method requires more than 8 steps, consider splitting into sub-methods. -->

**Actions:**
1. [Specific action to take]
2. [Specific action to take]

**Output:** [What this step produces]

**Example:**
```
[Show what the output of this step looks like]
```

---

## Good Example

<!-- Show correct application of this method. Explain WHY it's good. -->

### Scenario
[Describe the situation where this method is being applied]

### Implementation
```
[Show the actual code, configuration, or document produced]
```

### Why This Is Good
- [Reason 1 — e.g., "Follows the established pattern exactly"]
- [Reason 2 — e.g., "Handles the edge case mentioned in Step 3"]
- [Reason 3 — e.g., "Produces output that integrates cleanly with downstream processes"]

---

## Bad Example

<!-- Show incorrect application of this method. Explain WHAT went wrong. -->
<!-- Bad examples are just as important as good ones — they teach what to avoid. -->

### Scenario
[Same or similar situation as the good example]

### Implementation
```
[Show the incorrect code, configuration, or document]
```

### What Went Wrong
- [Problem 1 — e.g., "Violates the naming convention defined in Step 2"]
- [Problem 2 — e.g., "Misses the critical edge case that causes production failures"]
- [Problem 3 — e.g., "Output format doesn't match what downstream consumers expect"]

**How to fix:** [One-sentence pointer to the correct approach shown in the good example]

---

## Gotchas

<!-- Non-obvious pitfalls that catch practitioners off guard. -->
<!-- These are the "I wish someone had told me" insights. -->

- **[Gotcha 1 title]:** [Description of the pitfall and how to avoid it]
- **[Gotcha 2 title]:** [Description of the pitfall and how to avoid it]
- **[Gotcha 3 title]:** [Description of the pitfall and how to avoid it]

<!-- Common patterns for gotchas: -->
<!-- - "The obvious approach is wrong because..." -->
<!-- - "Don't confuse X with Y — they look similar but..." -->
<!-- - "This only works when [condition]. If [other condition], use [alternative] instead." -->
<!-- - "The error message says X but the real problem is Y." -->

---

## Alternatives

<!-- When ISN'T this method the best choice? What else could work? -->

| Situation | Better Alternative | Why |
|-----------|-------------------|-----|
| [Situation where this method is suboptimal] | [Alternative method or approach] | [Why it's better in this case] |
| [Another situation] | [Another alternative] | [Why it's better] |

**Decision heuristic:** [A quick rule for choosing between this method and its alternatives.
E.g., "Use this method for simple cases; switch to method-X when handling more than 5 related entities."]

---

## Self-Learning Integration

<!-- How this method could be improved over time through observation and feedback. -->
<!-- Every method should include self-learning hooks. -->

### Feedback Collection

Track these signals when this method is applied:
- **Success indicators:** [What does successful application look like? How do we measure it?]
- **Failure indicators:** [What signals that the method didn't work well?]
- **Deviation signals:** [When does the worker need to deviate from the documented procedure?]

### Improvement Triggers

This method should be reviewed and potentially updated when:
- [Trigger 1 — e.g., "Success rate drops below 80% over 10 applications"]
- [Trigger 2 — e.g., "A new tool/framework makes this approach obsolete"]
- [Trigger 3 — e.g., "Three or more users report the same confusion"]

### Feedback Channel

When the worker identifies an improvement opportunity:
1. Note the specific step or decision point where the issue occurred
2. Record what the worker did instead (if different from the documented procedure)
3. Include the outcome — did the alternative work better?
4. Report to the user via the skill's feedback mechanism

Format:
```
[Method name] improvement suggestion:
- Step/section: [Where the issue occurred]
- Current behavior: [What the method says to do]
- Observed behavior: [What actually worked / didn't work]
- Suggested change: [Specific modification to propose]
- Outcome: [What happened]
```

---

## Cross-References

<!-- Link to related methods, patterns, conventions, and design documents. -->

### Related Methods
- [`methods/[related-method-1].md`](methods/related-method-1.md) — [How it relates to this method]
- [`methods/[related-method-2].md`](methods/related-method-2.md) — [How it relates to this method]

### Applicable Patterns
- [`design/[pattern-file].md`](design/pattern-file.md) — [Which pattern(s) apply when using this method]

### Relevant Conventions
- [`conventions/[convention-file].md`](conventions/convention-file.md) — [Which conventions to follow]

### Prerequisite Knowledge
- [`design/[fundamentals-file].md`](design/fundamentals-file.md) — [What foundational knowledge supports this method]

---

<!-- END OF TEMPLATE -->
<!-- Remember: Delete sections that don't apply. Keep the ones that do. -->
<!-- Every method MUST have: Purpose, When to Use, Procedure, Good Example, Bad Example -->
<!-- Optional but recommended: Gotchas, Alternatives, Self-Learning, Cross-References -->
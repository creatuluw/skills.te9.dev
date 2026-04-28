# Conventions

## Purpose

This directory houses all conventions that the worker must follow: naming, formatting, structural, stylistic, process, and domain-specific standards. Conventions encode the "rules of the road" for producing consistent, high-quality work that aligns with team and project expectations.

---

## Why It's Used

Conventions ensure consistency across all work produced. Without conventions, a worker will use its own judgment for formatting, naming, and structure, which may be reasonable but won't match the team/project standards. Conventions encode the "rules of the road" for the domain.

Key benefits:
- **Predictability**: All output follows the same patterns and standards
- **Quality**: Established best practices are baked into every deliverable
- **Efficiency**: No need to re-decide formatting and structure on each task
- **Collaboration**: Multiple workers produce interchangeable output
- **Reviewability**: Compliance checks are straightforward and objective

---

## When to Use It

| Scenario | Action |
|----------|--------|
| Before starting any implementation work | Check conventions first |
| During code/content review | Verify compliance |
| When making naming, formatting, or structural decisions | Follow established rules |
| When uncertain about the "right way" to do something | Consult conventions before proceeding |

**Rule of thumb**: When in doubt, check conventions. If no convention exists, establish one and document it here.

---

## What to Add Here

Each convention file should contain the following elements:

### Required Elements

1. **Convention Category**
   - Naming
   - Structural
   - Style
   - Process
   - Domain-specific

2. **The Rule Stated Precisely**
   - Clear, unambiguous statement of the convention
   - Scope of applicability

3. **Rationale**
   - Why this convention exists
   - What problems it prevents

4. **Correct Examples**
   - Concrete examples following the convention
   - Annotated explanations where helpful

5. **Violation Examples**
   - Concrete examples breaking the convention
   - Explanation of why it's a violation

6. **Priority Level**
   - **Mandatory**: Must always be followed; violations block merging/release
   - **Recommended**: Should be followed; deviations require justification
   - **Preferred**: Good practice; follow when reasonable

7. **Verification Method**
   - How to check compliance (manual review, linter, script, etc.)
   - Any automated enforcement tools

### Convention File Template

```markdown
# [Convention Name]

**Category**: [Naming | Structural | Style | Process | Domain-specific]
**Priority**: [Mandatory | Recommended | Preferred]

## Rule
[Precise statement of the convention]

## Rationale
[Why this convention exists]

## Correct Examples
[Examples following the convention]

## Violation Examples
[Examples breaking the convention]

## Verification
[How to check compliance]
```

---

## Where to Find Detailed Instructions

| Resource | Path |
|----------|------|
| Convention definition method | `methods/convention-definition.md` |
| Naming and structure conventions | `conventions/naming-and-structure.md` |
| Writing conventions | `conventions/writing-conventions.md` |
| Quality standards | `conventions/quality-standards.md` |

---

## Post-Creation Checklist

After adding or updating conventions, verify:

- [ ] All domain conventions are documented
- [ ] Each convention has a clear rule and rationale
- [ ] Each convention has correct and violation examples
- [ ] Priority levels are assigned (mandatory/recommended/preferred)
- [ ] Verification methods are defined for each convention
- [ ] No conventions contradict each other
- [ ] Conflicting conventions are resolved with clear precedence rules
- [ ] Enforcement tools/scripts are documented
- [ ] Conventions are dated/versioned for self-learning triggers

---

## Maintenance Notes

- Review conventions periodically for relevance and accuracy
- Update conventions when team standards evolve
- Version conventions to enable self-learning triggers
- Archive deprecated conventions rather than deleting them
- Ensure new conventions don't conflict with existing ones
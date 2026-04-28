# Pattern Library

## Purpose

Build reusable pattern collections that capture proven solutions to recurring problems within a domain. Pattern libraries accelerate skill application by providing ready-made, validated approaches that workers can apply confidently.

## When to Use

- When building a skill that addresses problems with recognizable recurring structures
- When multiple methods or workflows share common solution approaches
- When onboarding new practitioners who need proven starting points
- When consistency across solutions matters more than novel approaches
- When documenting domain expertise for preservation and transfer

Do NOT use pattern libraries when:
- Every problem is genuinely unique with no recurring elements
- The domain is too immature for patterns to have emerged
- Rigidity would be harmful (use guidelines instead)
- The overhead of documentation outweighs the reuse benefit

---

## Pattern Documentation Template

Every pattern must include these sections to be complete and useful:

### Required Sections

```markdown
## [Pattern Name]

### Problem Statement
**Context:** [Situation where this problem occurs]
**Problem:** [The specific challenge that arises]
**Forces:** [Competing concerns that make this problem difficult]

### Solution Structure
**Overview:** [One-paragraph description of the approach]
**Participants:** [Key components/actors involved]
**Interactions:** [How participants relate and communicate]
**Structure Diagram:** [Visual representation if helpful]

### Implementation Guide
**Prerequisites:** [What must be true before applying]
**Steps:**
1. [First step with rationale]
2. [Second step with rationale]
...

**Variations:** [Common adaptations for different contexts]

### Consequences
**Benefits:**
- [Primary benefit]
- [Secondary benefit]

**Liabilities:**
- [Primary cost or risk]
- [Secondary cost or risk]

### When NOT to Use
- [Specific situation where this pattern fails]
- [Condition that makes this pattern inappropriate]

### Related Patterns
- [Pattern name]: [Relationship description]
```

---

## Pattern Identification

### How to Spot Recurring Problems

Pattern-worthy problems exhibit these characteristics:

1. **Frequency**: The problem occurs repeatedly across different contexts
2. **Complexity**: Naive solutions fail or produce poor outcomes
3. **Stability**: The problem structure remains consistent even when details vary
4. **Transferability**: Solutions in one context apply to others

### Discovery Methods

**Problem Mining:**
- Review past solutions for commonalities
- Analyze failure modes for missing approaches
- Study expert workflows for implicit patterns
- Examine forum/help questions for recurring themes

**Signal Detection:**
- "We always end up doing X" → Pattern candidate
- "Last time we tried Y and it didn't work" → Anti-pattern candidate
- "The tricky part is Z" → Pattern with non-obvious solution
- "We learned to always do W first" → Sequential pattern

**Validation Questions:**
1. Does this problem occur at least 3 times independently?
2. Is there a non-obvious solution that outperforms naive approaches?
3. Can the solution be described without domain-specific jargon?
4. Would a new practitioner benefit from knowing this pattern?

If you answer "yes" to all four, document the pattern.

---

## Pattern Organization

### By Abstraction Level

#### Architectural Patterns

High-level structural approaches that shape entire systems or major subsystems.

**Characteristics:**
- Address fundamental structural decisions
- Have broad, long-lasting impact
- Difficult to change once implemented
- Involve multiple components or modules

**Documentation Focus:**
- Component relationships and boundaries
- Data flow and control flow
- Deployment and scaling considerations
- Trade-offs and alternatives

**Example Categories:**
- Layered architecture
- Event-driven architecture
- Microservices
- Pipeline processing

#### Design Patterns

Mid-level approaches that solve specific design problems within components.

**Characteristics:**
- Address specific design challenges
- Impact individual components or modules
- Moderately changeable with refactoring
- Involve classes, functions, or data structures

**Documentation Focus:**
- Class/function structure
- Interface contracts
- State management
- Error handling approaches

**Example Categories:**
- Strategy pattern
- Observer pattern
- Repository pattern
- Factory pattern

#### Implementation Patterns

Low-level coding techniques and idioms.

**Characteristics:**
- Address specific coding situations
- Localized impact
- Easy to change
- Involve statements, expressions, or small functions

**Documentation Focus:**
- Code structure
- Naming conventions
- Performance considerations
- Common pitfalls

**Example Categories:**
- Null object pattern
- Builder chaining
- Guard clauses
- Resource cleanup

### Organization Structure

```
patterns/
├── architectural/
│   ├── layered-approach.md
│   ├── event-driven.md
│   └── pipeline-processing.md
├── design/
│   ├── strategy-selection.md
│   ├── observer-notification.md
│   └── repository-abstraction.md
└── implementation/
    ├── null-handling.md
    ├── resource-cleanup.md
    └── validation-chains.md
```

---

## Pattern Composition

### Compatible Patterns

Patterns that enhance each other when combined:

**Synergistic Combinations:**
- [Pattern A] + [Pattern B] = [Enhanced capability]
- Event-Driven + Observer = Responsive notifications
- Repository + Strategy = Flexible data access
- Pipeline + Layered = Clean processing architecture

**Document as:**
```markdown
### Pattern Synergy: [Name]
**Combination:** [Pattern A] with [Pattern B]
**Enhancement:** [What the combination enables]
**Implementation Note:** [How to combine effectively]
```

### Conflicting Patterns

Patterns that should not be used together:

**Conflict Categories:**
- **Structural conflicts**: Patterns impose incompatible structures
- **Performance conflicts**: Combined patterns create unacceptable overhead
- **Complexity conflicts**: Together they create cognitive overload
- **Semantic conflicts**: They solve the same problem differently

**Document as:**
```markdown
### Pattern Conflict: [Name]
**Patterns:** [Pattern A] vs. [Pattern B]
**Conflict Type:** [Structural/Performance/Complexity/Semantic]
**Resolution:** [Which to choose when, or how to reconcile]
```

### Composition Rules

1. **Layer Compatibility**: Architectural patterns constrain design patterns, which constrain implementation patterns
2. **Single Responsibility**: Each problem point should use at most one pattern
3. **Explicit Boundaries**: Document where one pattern ends and another begins
4. **Interaction Analysis**: Test pattern combinations for emergent behavior

---

## Pattern Validation

### Verification Checklist

**Correctness:**
- [ ] Problem statement accurately describes a real, recurring problem
- [ ] Solution actually solves the stated problem
- [ ] Consequences (benefits and liabilities) are honest and complete
- [ ] "When NOT to use" section is present and meaningful

**Usefulness:**
- [ ] Pattern is not obvious to a competent practitioner
- [ ] Implementation guide is specific enough to follow
- [ ] Variations cover common real-world adaptations
- [ ] Related patterns help navigate the library

**Quality:**
- [ ] Name is memorable and descriptive
- [ ] Examples are realistic and illustrative
- [ ] Language is clear and jargon is defined
- [ ] Pattern is at the right abstraction level

### Validation Process

1. **Peer Review**: Have domain experts verify accuracy
2. **Application Test**: Apply pattern to 3 real problems
3. **Novice Test**: Can a new practitioner understand and apply it?
4. **Conflict Check**: Verify no undocumented conflicts with existing patterns

### Scoring

| Criterion | Weight | Score (1-5) | Weighted |
|-----------|--------|-------------|----------|
| Problem Accuracy | 20% | | |
| Solution Effectiveness | 25% | | |
| Documentation Clarity | 20% | | |
| Implementation Guidance | 20% | | |
| Appropriate Scope | 15% | | |
| **Total** | **100%** | | |

Minimum acceptable score: 3.5/5 weighted average

---

## Good and Bad Examples

### Good Pattern Documentation

```markdown
## Strategy Selection

### Problem Statement
**Context:** A system needs to perform an operation where the best algorithm 
depends on runtime conditions.
**Problem:** Hard-coding a single algorithm leads to suboptimal performance 
or behavior in varying conditions.
**Forces:** 
- Different algorithms excel in different scenarios
- Runtime conditions aren't known at design time
- Adding new algorithms should not require modifying existing code

### Solution Structure
Define a family of algorithms, encapsulate each one, and make them 
interchangeable. Strategy lets the algorithm vary independently from 
clients that use it.

**Participants:**
- Context: Maintains reference to current strategy
- Strategy: Interface common to all algorithms
- ConcreteStrategy: Implements the algorithm

### Implementation Guide
1. Define the Strategy interface with the operation signature
2. Implement ConcreteStrategy classes for each algorithm
3. In the Context, maintain a reference to a Strategy object
4. Delegate algorithm execution to the Strategy object

**Variations:**
- Template Method when algorithms share structure
- Simple if/else when there are only 2-3 static strategies

### Consequences
**Benefits:**
- Algorithms can be switched at runtime
- New algorithms added without changing context
- Eliminates conditional statements for algorithm selection

**Liabilities:**
- Clients must know about different strategies
- Communication overhead between context and strategy
- Increased number of objects

### When NOT to Use
- Only one algorithm will ever be needed
- The algorithm rarely or never varies
- The complexity of the pattern exceeds the problem complexity
```

**Why this is good:**
- Clear, specific problem statement with forces
- Solution includes structural overview
- Implementation guide has concrete steps
- Honest about liabilities
- Meaningful "when NOT to use"

### Bad Pattern Documentation

```markdown
## The Strategy Pattern

Use this pattern when you need strategies. It makes your code more flexible.

### How to Use
Create an interface and implement it. Then use the implementations.

### Benefits
- More flexible code
- Better design
- Best practice
```

**Why this is bad:**
- Vague problem statement
- No forces or constraints mentioned
- Useless implementation guide
- No liabilities
- No "when NOT to use"
- Reads like a buzzword checklist, not guidance

---

## Keeping Patterns Current

### Maintenance Triggers

Link to self-learning system for automatic pattern updates:

1. **Usage Analytics**: Track which patterns are applied and their outcomes
2. **Failure Reports**: When pattern application doesn't solve the problem
3. **New Variations**: When practitioners adapt patterns in undocumented ways
4. **New Patterns**: When recurring problems emerge without documented patterns

### Update Process

```markdown
### Pattern Review Checklist (Quarterly)
- [ ] Problem statement still matches current challenges
- [ ] Solution still represents best known approach
- [ ] Variations reflect current practices
- [ ] No new conflicts with recently added patterns
- [ ] Examples still relevant and clear
```

### Integration with Self-Learning

Pattern library connects to self-learning through:

- **Feedback Collection**: Track pattern usage outcomes
- **Improvement Triggers**: Pattern failures trigger review
- **Adaptation Points**: Pattern recommendations adjust based on success rates
- **Knowledge Gaps**: Undocumented problems indicate missing patterns

See `self-learning-design.md` for complete integration details.

---

## Quick Reference

### Pattern Creation Workflow

1. Identify recurring problem (3+ independent occurrences)
2. Document using the template above
3. Validate with domain experts
4. Test on real problems (minimum 3 applications)
5. Add to appropriate abstraction level category
6. Document synergies and conflicts with existing patterns
7. Submit for peer review
8. Schedule first review date

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Pattern too specific | Abstract to higher level |
| Pattern too abstract | Add concrete examples |
| Missing liabilities | Honestly assess trade-offs |
| No "when NOT to use" | Document failure scenarios |
| Ignoring conflicts | Test with existing patterns |
| Stale examples | Update with current practices |
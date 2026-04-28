# Self-Learning Patterns for Adaptive Skills

## Overview

A self-learning skill goes beyond static knowledge delivery. It observes how workers use it, detects when its knowledge is insufficient or incorrect, and evolves over time to become more effective. This document defines the design patterns that enable skills to adapt and improve through usage.

Self-learning is not automatic—it requires deliberate architectural support. These patterns provide the scaffolding for skills that grow smarter with every interaction.

---

## 1. The Observer Pattern: Tracking Method Usage and Outcomes

### Purpose

The observer pattern captures what happens when a worker uses the skill. Without observation, there is no data for learning. This pattern is the foundation of all self-learning capabilities.

### Core Concepts

**Observable Events**:
- Method loaded: Which method was selected for which task
- Method completed: Whether the procedure finished successfully
- Method abandoned: When a worker stopped following a method mid-execution
- Output quality: Assessment of whether the result met expectations
- Time to completion: How long the method took to execute
- Error encountered: What went wrong during execution

**Observation Mechanics**:
```
Worker executes task
    ↓
Skill method is loaded and followed
    ↓
Outcome is observed (success, failure, partial)
    ↓
Observation is recorded to feedback log
```

### Implementation Patterns

**Pattern 1: Explicit Outcome Markers**

Methods include checkpoints where workers indicate outcomes:

```markdown
## Step 5: Validate Configuration
After running validation:
- If all checks pass, proceed to Step 6
- If checks fail, report which checks failed in the feedback log:
  `observation: config-validation-failed step:5 check:port-range`
```

**Pattern 2: Implicit Success Detection**

The skill infers success from worker behavior:
- Worker loads the next logical method → Previous method succeeded
- Worker reloads the same method → Previous attempt may have failed
- Worker loads a debugging method → Something went wrong
- Worker produces output matching expected patterns → Success

**Pattern 3: Outcome Categories**

Define a standard vocabulary for outcomes:
- `success-complete`: Task finished, output accepted
- `success-partial`: Task finished with caveats or manual intervention
- `failure-method`: Method steps were incorrect or incomplete
- `failure-context`: Necessary information was missing from the skill
- `failure-external`: External factors caused failure (out of skill scope)
- `abandoned`: Worker stopped using the method without completing

### Observation Storage

Observations should be stored in a structured log format:

```
[timestamp] method: create-skill | outcome: success-complete | duration: 45s
[timestamp] method: deploy-skill | outcome: failure-method | step: 8 | note: "port check missing"
[timestamp] method: debug-skill | outcome: success-partial | note: "manual fix required for config"
```

This log becomes the raw data for all other self-learning patterns.

---

## 2. The Feedback Channel Pattern: Worker Communication

### Purpose

The feedback channel provides a structured way for workers to communicate improvement suggestions, report issues, and propose changes to the skill.

### Channel Types

**Channel 1: Inline Feedback**

Embedded directly in method files:

```markdown
## Step 7: Generate Output

[Produce output according to template]

<!-- FEEDBACK: If this step produced incorrect output, describe what went wrong:
     feedback: step-7 output-was-incorrect expected:X got:Y
-->
```

Workers can copy and customize the feedback template when they encounter issues.

**Channel 2: Structured Feedback Files**

A dedicated feedback file that workers append to:

```markdown
# skill-feedback.md

## Format
Date | Method | Category | Description | Suggested Fix

## Entries
2024-01-15 | create-skill | gap | Missing TypeScript configuration steps | Add tsconfig.json generation
2024-01-16 | deploy-skill | error | Step 5 fails if port is already in use | Add port conflict check
```

**Channel 3: Improvement Proposals**

A template for workers to propose specific changes:

```markdown
# Improvement Proposal

**Method**: methods/deploy-skill.md
**Step**: 5
**Issue**: Port conflict not detected before deployment
**Proposal**: Add pre-flight check: `if port_in_use(skill.port): suggest_alternative()`
**Rationale**: Prevents deployment failures that require rollback
```

### Feedback Categories

Standardize feedback types to enable pattern analysis:

| Category | Code | Description |
|----------|------|-------------|
| Gap | `gap` | Missing knowledge or steps |
| Error | `err` | Incorrect information or procedure |
| Confusion | `conf` | Ambiguous or unclear instructions |
| Improvement | `imp` | Enhancement to existing method |
| Edge Case | `edge` | Undocumented scenario |
| Outdated | `old` | Information no longer accurate |

### Designing for Feedback Capture

Make feedback frictionless:

1. **Proximity**: Place feedback prompts near where issues occur
2. **Templates**: Provide copy-paste templates workers can fill in
3. **Low effort**: Single-line feedback should be valid
4. **Optional**: Never block task completion on feedback submission
5. **Visible**: Ensure workers know the feedback channel exists

---

## 3. The Trigger Pattern: When to Update

### Purpose

Triggers are events that signal the skill needs updating. Not all observations require action—triggers filter signal from noise.

### Trigger Types

**Trigger 1: Repeated Failure**

When the same method fails multiple times in similar ways:
- Threshold: 3+ failures with same outcome code within 20 uses
- Action: Review method and fix identified issue
- Example: Step 8 of deploy-skill fails 4 times due to missing permission check

**Trigger 2: Persistent Abandonment**

When workers consistently abandon a method at the same point:
- Threshold: 5+ abandonments at same step within 30 uses
- Action: Investigate why workers stop; fix or restructure the method
- Example: Workers stop at "Configure SSL" step, suggesting the step is too complex

**Trigger 3: Frequent Workarounds**

When workers produce correct output but bypass documented methods:
- Threshold: 3+ instances of workers using alternative approaches within 15 uses
- Action: Evaluate whether method should be updated to match worker behavior
- Example: Workers manually edit config instead of using the setup script

**Trigger 4: Feedback Volume Spike**

When feedback on a specific method increases suddenly:
- Threshold: 5+ feedback entries on same method within 10 uses
- Action: Prioritize review of that method
- Example: Multiple reports of unclear error messages

**Trigger 5: External Change Detection**

When the domain the skill covers undergoes known changes:
- Threshold: Version updates, API changes, or announced deprecations
- Action: Proactively review and update affected methods
- Example: Framework releases new major version with breaking changes

### Trigger Response Protocol

```
Trigger Detected
    ↓
Classify severity: Critical | High | Medium | Low
    ↓
Critical/High: Immediate method review and update
Medium: Queue for next skill maintenance cycle
Low: Log for pattern analysis
    ↓
Apply Fix
    ↓
Verify fix against original trigger conditions
```

---

## 4. The Evolution Pattern: Changing Without Breaking

### Purpose

Skills must evolve, but evolution must not break existing usage. This pattern ensures changes are backward-compatible and non-disruptive.

### Evolution Principles

**Principle 1: Additive First**

Prefer adding new methods over modifying existing ones:
- ✅ Add `methods/deploy-v2.md` for new deployment approach
- ❌ Modify `methods/deploy.md` to use a completely different process

**Principle 2: Deprecation, Not Removal**

When a method must change significantly:
1. Mark old method as deprecated: `<!-- DEPRECATED: Use methods/deploy-v2.md -->`
2. Add pointer to new method
3. Keep old method functional for a transition period
4. Eventually remove after confirming no active usage

**Principle 3: Version Internal References**

When methods reference each other, track version compatibility:
```markdown
## Dependencies
- conventions/error-handling.md v2+
- design/skill-architecture.md v1+
```

**Principle 4: Change Documentation**

Every change to the skill should be documented:
```markdown
## Changelog

### 2024-01-20
- **Added**: methods/create-skill-v2.md (supports TypeScript out of box)
- **Deprecated**: methods/deploy-local.md (replaced by methods/deploy-v2.md)
- **Fixed**: Step 8 in methods/deploy.md now checks port availability
```

### Safe Change Patterns

**Pattern 1: Clarification Changes**

Adding examples, improving wording, or adding notes. These rarely break anything:
```diff
- Run the build script
+ Run the build script: `npm run build`
```

**Pattern 2: Step Addition**

Adding steps to a method (without reordering existing steps):
```diff
  ## Step 5: Validate
+ ## Step 6: Check Dependencies
  ## Step 7: Deploy
```
Note: Renumbering steps can break references—use stable anchors when possible.

**Pattern 3: Branch Addition**

Adding new conditional branches without changing existing ones:
```diff
  If input is JSON:
    → Process with JSON parser
+ If input is YAML:
+   → Process with YAML parser
  Otherwise:
    → Reject with unsupported format error
```

### Dangerous Change Patterns

**Danger 1: Step Reordering**
Workers who have partially completed a method will be confused if step numbers change.

**Danger 2: Output Format Changes**
Downstream consumers may depend on specific output formats.

**Danger 3: Prerequisite Changes**
Adding new prerequisites can make a method unusable for workers who don't have them.

For dangerous changes, always create a new method version and deprecate the old one.

---

## 5. The Contradiction Detection Pattern: When Documentation Conflicts with Reality

### Purpose

Sometimes the skill's documented methods conflict with observed reality. This pattern detects and resolves those contradictions.

### Contradiction Signals

**Signal 1: Worker Overrides**

When workers explicitly override documented instructions:
```markdown
# Worker note: Documentation says to use port 3000, but our environment requires 8080
```

**Signal 2: External Tool Failures**

When following the method produces errors that external documentation says shouldn't occur:
```
Method says: "npm install completes without errors"
Reality: "npm install fails with peer dependency conflict"
```

**Signal 3: Multiple Conflicting Methods**

When two methods give incompatible instructions for overlapping scenarios:
```
Method A: "Always use strict mode"
Method B: "Disable strict mode for testing"
```

**Signal 4: Feedback Contradictions**

When feedback entries contradict each other:
```
Feedback 1: "Step 3 should use async/await"
Feedback 2: "Step 3 should use Promises"
```

### Contradiction Resolution Protocol

```
Contradiction Detected
    ↓
Gather Evidence
    - What does the documentation say?
    - What does observation show?
    - What is the external truth (API docs, framework docs)?
    ↓
Classify Contradiction
    - Documentation is wrong → Fix documentation
    - Reality has changed → Update skill to match new reality
    - Context-dependent → Add conditional logic to method
    - Unresolvable → Document both approaches with when-to-use guidance
    ↓
Apply Resolution
    ↓
Verify with additional observations
```

### Preventing Contradictions

- **Single Source of Truth**: Each piece of knowledge should live in one place
- **Reference, Don't Repeat**: Link to authoritative sources instead of duplicating
- **Regular Audits**: Periodically review methods against current domain state
- **Scope Boundaries**: Clearly define when methods apply and when they don't

---

## 6. The Gap Detection Pattern: When No Method Covers the Current Situation

### Purpose

Workers will encounter situations not covered by any documented method. This pattern identifies and addresses knowledge gaps.

### Gap Indicators

**Indicator 1: Method Not Found**

Worker scans SKILL.md and cannot find a relevant method for their task:
```
Worker: "I need to migrate a skill from v1 to v2 format"
SKILL.md: [No migration method exists]
```

**Indicator 2: Method Mismatch**

Worker loads a method but discovers it doesn't cover their scenario:
```
Worker: Loaded methods/create-skill.md
Reality: Need to create a skill from an existing project, not from scratch
```

**Indicator 3: Improvisation Evidence**

Worker produces output that doesn't follow any documented method but is correct:
```
Worker creates deployment script using approach not in any method
Output is functional and correct
→ Skill has a knowledge gap
```

**Indicator 4: Repeated Questions**

Workers repeatedly ask similar questions about undocumented scenarios:
```
Question 1: "How do I handle circular dependencies?"
Question 2: "What about circular skill references?"
Question 3: "Circular deps between skills?"
→ Gap in knowledge about dependency management
```

### Gap Analysis Framework

When a gap is detected, analyze it:

**Step 1: Frequency Assessment**
- Is this a one-time situation or likely to recur?
- How many workers might encounter this gap?

**Step 2: Scope Assessment**
- Is this within the skill's defined scope?
- Should the skill handle this, or is it another skill's responsibility?

**Step 3: Urgency Assessment**
- Does this gap block task completion?
- Can workers work around it, or is it a hard stop?

**Step 4: Decision**
- **High frequency + In scope + Blocks tasks**: Create new method immediately
- **Medium frequency + In scope + Workaround exists**: Queue for next maintenance
- **Low frequency + In scope**: Add to FAQ or design docs, not a full method
- **Out of scope**: Document boundary and refer to appropriate external resource

### Gap Filling Patterns

**Pattern 1: New Method Creation**

For significant, recurring gaps:
```
Identified gap: No method for skill migration
Solution: Create methods/migrate-skill.md
```

**Pattern 2: Method Extension**

For gaps that are extensions of existing methods:
```
Identified gap: create-skill.md doesn't cover existing projects
Solution: Add section "Creating from Existing Project" to create-skill.md
```

**Pattern 3: Design Document Addition**

For conceptual gaps that don't need procedures:
```
Identified gap: Workers don't understand when to use multiple skills
Solution: Add section to design/skill-architecture.md about skill composition
```

**Pattern 4: Boundary Documentation**

For gaps that are actually scope boundaries:
```
Identified gap: Workers try to use skill for CI/CD setup
Solution: Add to SKILL.md scope section: "This skill does not cover CI/CD pipeline setup"
```

---

## 7. Integration: The Cohesive Self-Learning System

### System Architecture

The six patterns form a cohesive learning system:

```
                    ┌─────────────┐
                    │  OBSERVER   │
                    │  (Pattern 1)│
                    └──────┬──────┘
                           │ Raw observations
                           ▼
        ┌──────────────────────────────────┐
        │        ANALYSIS ENGINE           │
        │                                  │
        │  ┌─────────────┐ ┌────────────┐  │
        │  │  TRIGGERS   │ │ CONTRADICT │  │
        │  │  (Pattern 3)│ │ (Pattern 5)│  │
        │  └──────┬──────┘ └─────┬──────┘  │
        │         │              │          │
        │  ┌─────────────┐ ┌────────────┐  │
        │  │   GAPS      │ │ EVOLUTION  │  │
        │  │  (Pattern 6)│ │ (Pattern 4)│  │
        │  └──────┬──────┘ └─────┬──────┘  │
        └─────────┼──────────────┼─────────┘
                  │              │
                  ▼              ▼
           ┌─────────────────────────┐
           │   FEEDBACK CHANNEL      │
           │   (Pattern 2)          │
           │                         │
           │  Collects improvement   │
           │  suggestions, tracks    │
           │  applied changes        │
           └─────────────────────────┘
```

### The Learning Cycle

Self-learning operates in cycles:

**Phase 1: Observe** (Every interaction)
- Worker uses skill
- Observer pattern captures events and outcomes
- Feedback channel collects worker input

**Phase 2: Analyze** (Periodic)
- Trigger pattern scans for activation conditions
- Contradiction pattern identifies conflicts
- Gap pattern detects missing knowledge
- Analysis produces a prioritized list of needed changes

**Phase 3: Evolve** (Triggered)
- Evolution pattern guides safe changes
- Changes are documented and versioned
- Backward compatibility is preserved

**Phase 4: Validate** (Post-change)
- Observer pattern monitors for regressions
- Feedback channel confirms fixes are effective
- Learning cycle continues

### Implementation Priorities

Not all patterns need to be implemented at once. Start with:

**Priority 1: Observer + Feedback Channel**
These are foundational. Without observation and feedback, no other learning can occur.

**Priority 2: Triggers + Evolution**
These enable reactive learning—fixing problems as they're detected.

**Priority 3: Contradiction + Gap Detection**
These enable proactive learning—finding issues before they cause widespread problems.

### Measurement: How Do You Know It's Working?

A self-learning skill should demonstrate:

**Metric 1: Decreasing Failure Rate**
Over time, method failure rates should decrease as issues are identified and fixed.

**Metric 2: Decreasing Gap Frequency**
The same gap should not be reported multiple times.

**Metric 3: Increasing Method Coverage**
The percentage of worker tasks that find a relevant method should increase.

**Metric 4: Feedback Loop Closure**
The percentage of feedback items that result in verified improvements should be high (>70%).

**Metric 5: Stable Evolution**
Changes should not cause regressions. The regression rate should be near zero.

---

## Summary: Self-Learning Implementation Checklist

- [ ] **Observer pattern**: Skill captures method usage and outcomes
- [ ] **Feedback channel**: Workers can communicate issues and suggestions
- [ ] **Trigger definitions**: Clear conditions that signal needed updates
- [ ] **Evolution safeguards**: Changes are additive, versioned, and documented
- [ ] **Contradiction detection**: Conflicts between docs and reality are identified
- [ ] **Gap detection**: Missing knowledge is recognized and addressed
- [ ] **Integrated system**: Patterns work together in a cohesive learning cycle
- [ ] **Measurement**: Metrics track whether learning is actually occurring

A self-learning skill is never "done." It is a living system that improves through use. The patterns in this document provide the architectural foundation for that continuous improvement.
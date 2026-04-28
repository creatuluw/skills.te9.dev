# Self-Learning Capability Checklist

Use this checklist to verify that a skill has adequate self-learning capabilities before
considering it production-ready. Every skill must be able to detect its own deficiencies,
communicate them, and provide a path toward improvement.

---

## 1. Feedback Collection Mechanisms

Verify that the skill captures meaningful data about its own performance.

### Method Outcome Tracking

- [ ] The skill instructs the worker to record which methods were applied during each task
- [ ] Outcome status is captured for each method application (success, partial, failure)
- [ ] Context is recorded alongside outcomes (what situation, what inputs, what constraints)
- [ ] The skill defines where outcome records are stored (file path, format, structure)
- [ ] Outcome records include enough detail to identify patterns over time

### Deviation Logging

- [ ] The skill instructs the worker to note when it deviated from documented methods
- [ ] Reasons for deviation are captured (method didn't apply, better approach found, incomplete coverage)
- [ ] The outcome of the deviation is recorded (was it better, worse, or neutral?)
- [ ] Deviations that succeeded are flagged as potential method improvements

### User Correction Capture

- [ ] The skill instructs the worker to note when the user corrects or redirects its approach
- [ ] The nature of the correction is categorized (method error, convention violation, preference)
- [ ] Corrections that indicate skill deficiencies are distinguished from user preferences
- [ ] Recurring corrections are flagged for potential skill updates

### Knowledge Gap Identification

- [ ] The skill instructs the worker to log situations where no documented method applied
- [ ] How the worker resolved the gap is recorded (improvised, asked user, failed)
- [ ] Gap frequency is trackable to identify priority areas for new method development
- [ ] Gaps that were resolved successfully become candidates for new pattern documentation

---

## 2. Improvement Trigger Definitions

Verify that the skill defines clear conditions that signal when updates are needed.

### Performance Triggers

- [ ] Method failure rate trigger: defined threshold for when a method needs revision
- [ ] Task failure trigger: defined threshold for when the skill itself needs restructuring
- [ ] User correction frequency trigger: threshold for when conventions or methods need updating
- [ ] Deviation frequency trigger: threshold for when documented methods are insufficient

### Environmental Triggers

- [ ] Tool version change: trigger when tooling updates affect documented procedures
- [ ] Standard deprecation: trigger when domain standards evolve or are deprecated
- [ ] Platform change: trigger when target platforms change behavior
- [ ] Dependency update: trigger when libraries or frameworks release breaking changes

### Knowledge Triggers

- [ ] Pattern emergence: trigger when repeated successful deviations indicate a new pattern
- [ ] Contradiction detection: trigger when real-world behavior conflicts with documentation
- [ ] Gap accumulation: trigger when enough gaps cluster in a specific knowledge area
- [ ] Best practice evolution: trigger when external sources demonstrate superior approaches

### Feedback Volume Triggers

- [ ] Minimum feedback count: enough data has been collected to warrant analysis
- [ ] Feedback pattern convergence: multiple feedback points indicate the same issue
- [ ] Feedback recency: feedback indicates a recent change in the domain landscape

---

## 3. Feedback Channel Design

Verify that the skill provides clear mechanisms for communicating improvement needs.

### Worker-to-User Channel

- [ ] The skill defines a "skill improvement report" template the worker can use
- [ ] Improvement reports include: what was observed, why it matters, suggested change
- [ ] The worker is instructed on when to present improvement reports (end of task, when triggered)
- [ ] Reports are specific enough to be actionable (not vague "this should be better")

### Feedback File Format

- [ ] A structured feedback file location is defined (e.g., `feedback/skill-feedback.md`)
- [ ] The format includes: date, category, observation, suggested action, priority
- [ ] Categories cover: method issues, convention gaps, missing knowledge, tool problems
- [ ] Priority levels are defined (critical, high, medium, low) with clear criteria

### Improvement Proposal Format

- [ ] The skill defines how to propose specific changes to itself
- [ ] Proposals include: current state, proposed state, rationale, risk assessment
- [ ] Breaking changes are clearly flagged and include migration guidance
- [ ] Proposals reference specific files, sections, and line ranges for precision

### Feedback Loop Closure

- [ ] The skill instructs the worker to confirm when feedback has been addressed
- [ ] Addressed feedback is marked (not deleted) to maintain history
- [ ] The worker can reference past feedback when similar situations arise
- [ ] Unaddressed feedback is re-surfaced when relevant tasks occur

---

## 4. Adaptation Point Identification

Verify that the skill identifies specific areas where adaptation is expected and valuable.

### Method Selection Adaptation

- [ ] The skill documents which methods have alternatives and when to prefer each
- [ ] Method selection criteria are explicit (not "use your best judgment")
- [ ] The skill tracks which methods are chosen most/least often and why
- [ ] Selection criteria can be updated based on observed outcomes

### Pattern Application Adaptation

- [ ] Common pattern variations are documented alongside base patterns
- [ ] The skill indicates when pattern modification is acceptable vs. dangerous
- [ ] Successful pattern variations are candidates for addition to the pattern library
- [ ] Pattern usage outcomes are tracked to identify over-application or under-application

### Convention Flexibility Points

- [ ] Mandatory conventions are distinguished from flexible conventions
- [ ] The skill indicates where local overrides are acceptable (team preferences, project specifics)
- [ ] Convention friction points are tracked (where conventions slow work without clear benefit)
- [ ] Convention evolution is supported (versioning, deprecation path, migration)

### Knowledge Depth Adaptation

- [ ] The skill indicates where shallow knowledge is sufficient vs. deep expertise required
- [ ] Knowledge depth recommendations adjust based on task complexity
- [ ] Areas where the skill knows it has shallow coverage are flagged for the worker
- [ ] Deep-dive references are available for areas that frequently require advanced knowledge

---

## 5. Self-Learning Integration Quality Checks

Verify that self-learning is woven into the skill's design, not bolted on.

### Structural Integration

- [ ] Self-learning instructions appear in the main SKILL.md, not only in sub-files
- [ ] Method files include self-learning sections alongside procedures
- [ ] Convention files include evolution criteria alongside rules
- [ ] Pattern files include variation detection alongside base patterns

### Behavioral Integration

- [ ] The worker naturally collects feedback as part of normal workflow (not as extra steps)
- [ ] Self-learning behaviors are triggered by normal task completion, not manual activation
- [ ] The worker proactively identifies improvement opportunities without being asked
- [ ] Improvement suggestions are specific and actionable, not generic observations

### Pattern Coverage

- [ ] Observer pattern: method usage and outcomes are tracked
- [ ] Feedback channel pattern: workers can communicate issues and suggestions
- [ ] Trigger pattern: clear conditions signal when updates are needed
- [ ] Evolution pattern: changes follow safe patterns (additive, versioned, documented)
- [ ] Contradiction detection pattern: conflicts between docs and reality are identified
- [ ] Gap detection pattern: missing knowledge is recognized and addressed

### Sustainability

- [ ] Feedback storage has a defined cleanup/archival strategy (won't grow unbounded)
- [ ] Self-learning mechanisms have minimal overhead (don't slow normal work significantly)
- [ ] The skill can function normally even if feedback collection fails temporarily
- [ ] Self-learning data is human-readable (not opaque logs)

---

## 6. Self-Learning Readiness Score

Rate each dimension from 0 (absent) to 5 (exemplary). A production-ready skill should
score at least 3 in every dimension.

### Scoring Guide

| Score | Meaning |
|-------|---------|
| 0 | No capability in this dimension |
| 1 | Minimal capability, mostly manual |
| 2 | Basic capability, inconsistently applied |
| 3 | Adequate capability, consistently applied |
| 4 | Strong capability, well-integrated |
| 5 | Exemplary capability, could serve as a reference |

### Dimensions

| # | Dimension | Score | Notes |
|---|-----------|-------|-------|
| 1 | **Feedback Collection** — Can the skill capture data about its own performance? | ___/5 | |
| 2 | **Trigger Definitions** — Are improvement conditions clearly defined? | ___/5 | |
| 3 | **Feedback Channels** — Can the skill communicate improvement needs? | ___/5 | |
| 4 | **Adaptation Points** — Does the skill know where it can/should adapt? | ___/5 | |
| 5 | **Structural Integration** — Is self-learning woven into the skill's structure? | ___/5 | |
| 6 | **Behavioral Integration** — Does self-learning happen naturally during work? | ___/5 | |
| 7 | **Pattern Coverage** — Are all 6 self-learning patterns represented? | ___/5 | |
| 8 | **Sustainability** — Will self-learning work long-term without degradation? | ___/5 | |

### Total Score

```
Total: ___ / 40

Readiness Level:
  36-40: Exemplary — This skill is a model for self-learning design
  28-35: Production-Ready — Self-learning is well-integrated and sustainable
  20-27: Functional — Self-learning works but has gaps to address
  12-19: Basic — Self-learning exists but needs significant improvement
   0-11: Insufficient — Self-learning is not adequately designed
```

### Required Actions for Scores Below 3

List the dimensions that scored below 3 and the specific actions needed:

| Dimension | Current Score | Required Action | Priority |
|-----------|--------------|-----------------|----------|
| | | | |
| | | | |
| | | | |

---

## Usage Instructions

1. **During Skill Creation:** Use this checklist as a design guide. Each unchecked item
   represents a feature that should be designed into the skill.

2. **After Skill Creation:** Walk through every checklist item. Any unchecked item is a
   gap that should be addressed before the skill is considered complete.

3. **During Skill Review:** Use the scoring template to rate the skill's self-learning
   capabilities. Present the score to the user with specific improvement recommendations.

4. **During Skill Evolution:** Re-run this checklist periodically. Skills that were
   self-learning-ready may have drifted as the domain evolved.

---

*This checklist is itself a living document. If you discover self-learning patterns or
verification approaches not covered here, suggest additions using the feedback mechanisms
described in this checklist's own pattern coverage section.*
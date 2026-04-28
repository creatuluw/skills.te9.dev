# Self-Learning Design

## Purpose

Embed self-learning and adaptive improvement capabilities into skills, enabling them to evolve based on real-world usage, feedback, and changing domain conditions.

## When to Use

- Creating any skill that will be used repeatedly
- When domain knowledge evolves rapidly
- When user feedback can improve skill effectiveness
- When patterns and conventions may shift over time
- When the skill must maintain accuracy across changing contexts

---

## The 4 Pillars of Self-Learning

### Pillar 1: Feedback Collection

The systematic gathering of signals about skill performance and knowledge gaps.

**Components:**
- What to track
- How to track it
- When to surface insights
- Where to store collected feedback

### Pillar 2: Improvement Triggers

Specific conditions that indicate the skill needs updating or refinement.

**Components:**
- Trigger identification
- Trigger classification
- Trigger priority assignment
- Trigger response protocols

### Pillar 3: Feedback Mechanisms

The channels and formats through which the skill communicates improvement needs.

**Components:**
- Report formats
- Alert systems
- Suggestion structures
- User interaction patterns

### Pillar 4: Adaptation Points

The specific locations and methods where the skill can be modified.

**Components:**
- Method adjustments
- Pattern updates
- Convention revisions
- Knowledge expansions

---

## Feedback Collection Design

### What to Track

#### Performance Signals
```
Track:
- Task completion success rate
- User correction frequency
- Method selection accuracy
- Pattern applicability match rate
- Convention violation instances
- Gotcha encounter frequency
```

#### Knowledge Gaps
```
Track:
- Questions asked beyond skill scope
- External references needed
- Areas where defaults are insufficient
- Topics requiring additional explanation
- Missing example scenarios
```

#### User Behavior
```
Track:
- Methods frequently used together
- Methods rarely invoked
- Example reuse patterns
- Navigation paths through skill
- Correction types and patterns
```

### How to Track

#### Embedded Markers

Use semantic markers within skill content to identify feedback points:

```markdown
<!-- LEARNING:TRACK method=pattern-application -->
When applying patterns, check the composition rules first.
<!-- /LEARNING:TRACK -->

<!-- LEARNING:GAP area=concurrent-patterns -->
This skill does not cover concurrent pattern applications.
<!-- /LEARNING:GAP -->
```

#### Usage Patterns

Document expected vs. actual usage:

```yaml
feedback_tracking:
  method_invocations:
    track: true
    store: method-usage-log
    threshold: 10  # analyze after 10 uses
  
  corrections:
    track: true
    store: correction-patterns
    categorize: [factual, structural, stylistic, preference]
  
  knowledge_requests:
    track: true
    store: gap-analysis
    pattern: "out-of-scope queries"
```

### When to Surface

Surface feedback at natural breakpoints:

1. **After Task Completion** - "Did this approach work for your use case?"
2. **On Correction** - "Noted. Should this be the default approach?"
3. **Periodically** - "Based on recent usage, consider updating X"
4. **On Knowledge Gap** - "This area might benefit from additional documentation"

---

## Improvement Trigger Taxonomy

### External Discovery Triggers

Signals from outside the skill that indicate needed changes:

| Trigger | Signal Source | Response Priority |
|---------|--------------|-------------------|
| New technology version | Release notes, changelogs | High |
| Breaking changes | Error reports, migration guides | Critical |
| New best practices | Industry publications, community | Medium |
| Deprecated approaches | Official deprecation notices | High |
| Security vulnerabilities | CVE reports, advisories | Critical |

### Performance Degradation Triggers

Signals that the skill is becoming less effective:

| Trigger | Detection Method | Response Priority |
|---------|------------------|-------------------|
| Increased corrections | Correction rate > threshold | High |
| Method avoidance | Usage rate < threshold | Medium |
| User frustration signals | Explicit feedback, rephrasing | High |
| Longer task completion | Time tracking exceeds norm | Medium |
| Quality regression | Validation score decline | High |

### New Pattern Triggers

Signals that new patterns should be documented:

| Trigger | Signal Source | Response Priority |
|---------|--------------|-------------------|
| Recurring solution | Same approach used 3+ times | High |
| Novel combination | Unusual method pairing succeeds | Medium |
| Edge case discovery | Unexpected but valid scenario | High |
| Cross-domain application | Pattern works in new context | Medium |
| Optimization found | Better approach discovered | High |

### Convention Evolution Triggers

Signals that conventions need updating:

| Trigger | Signal Source | Response Priority |
|---------|--------------|-------------------|
| Community shift | Popular projects adopt new style | Medium |
| Tool update | Linter/formatter changes defaults | High |
| Clarity improvement | New naming proves clearer | Medium |
| Conflict resolution | Competing conventions converge | High |
| Standard emergence | Industry standard formalized | High |

---

## Feedback Mechanism Patterns

### Pattern 1: Skill Improvement Reports

Structured reports suggesting specific improvements:

```markdown
## Skill Improvement Report

**Skill:** [skill-name]
**Area:** [specific area needing improvement]
**Trigger:** [what triggered this report]
**Confidence:** [high/medium/low]

### Current State
[Brief description of current implementation]

### Suggested Improvement
[Specific, actionable improvement suggestion]

### Rationale
[Why this improvement would help]

### Implementation Complexity
- Effort: [low/medium/high]
- Risk: [low/medium/high]
- Impact: [low/medium/high]

### Example
[Concrete example of the improvement]
```

**When to use:** Regular intervals, after accumulating multiple signals.

### Pattern 2: Contradiction Flags

Alerts when skill content conflicts with reality:

```markdown
## Contradiction Flag

**Claim:** [what the skill states]
**Reality:** [what was observed]
**Context:** [when/where this occurred]
**Impact:** [potential consequences]

### Recommended Action
[How to resolve the contradiction]

### Verification Needed
[What to check before making changes]
```

**When to use:** Immediately upon detection of factual errors or outdated information.

### Pattern 3: Knowledge Gap Alerts

Notifications about missing information:

```markdown
## Knowledge Gap Alert

**Gap Area:** [topic lacking coverage]
**Encountered During:** [task that revealed the gap]
**Frequency:** [how often this gap is hit]
**Workaround:** [current temporary solution]

### Suggested Addition
[What should be added to the skill]

### Priority Justification
[Why this gap should be filled]

### Related Areas
[Other parts of the skill that connect to this gap]
```

**When to use:** When users need information the skill doesn't provide.

### Pattern 4: Method Suggestions

Recommendations for new or improved methods:

```markdown
## Method Suggestion

**Proposed Method Name:** [descriptive-name]
**Addresses:** [problem it solves]
**Based On:** [patterns observed]

### Method Template
[Outline of the suggested method]

### Expected Benefit
[How this improves the skill]

### Integration Points
[Where this fits in the existing skill structure]

### Validation Criteria
[How to verify the method works]
```

**When to use:** When recurring patterns suggest a new method is warranted.

---

## Adaptation Point Design

### Method Selection Adaptation

**Location:** Method index and selection guidance

**How it adapts:**
1. Track which methods are most/least used
2. Adjust selection guidance based on success rates
3. Add contextual hints about method combinations
4. Update decision trees with new usage patterns

**Example adaptation:**
```markdown
<!-- Before adaptation -->
For API design, use the "endpoint-pattern" method.

<!-- After adaptation (based on usage feedback) -->
For API design, use the "endpoint-pattern" method (preferred in 87% of cases).
For streaming APIs, consider "event-driven-pattern" instead.
```

### Pattern Application Adaptation

**Location:** Pattern library and application guides

**How it adapts:**
1. Add new patterns discovered through usage
2. Update composition rules based on conflict experience
3. Refine "when to use" criteria based on outcomes
4. Expand examples with real-world cases

**Example adaptation:**
```markdown
<!-- Before adaptation -->
**When NOT to use:** When simpler solutions suffice.

<!-- After adaptation (based on over-engineering feedback) -->
**When NOT to use:** 
- When simpler solutions suffice
- When team is unfamiliar with the pattern
- When the problem is one-time, not recurring
- When performance overhead outweighs benefits
```

### Convention Updates Adaptation

**Location:** Convention definitions and enforcement rules

**How it adapts:**
1. Adjust priority levels based on violation impact
2. Update examples with current best practices
3. Add exceptions discovered in practice
4. Refine verification methods

**Example adaptation:**
```markdown
<!-- Before adaptation -->
**Priority:** Recommended
**Verification:** Manual review

<!-- After adaptation (based on violation frequency) -->
**Priority:** Mandatory  // Upgraded due to frequent violations
**Verification:** Automated linter + manual review
**Exception:** Legacy code maintenance (document reason)
```

### Knowledge Gap Adaptation

**Location:** Fundamentals and domain knowledge sections

**How it adapts:**
1. Add new topics based on gap alerts
2. Expand shallow coverage based on question frequency
3. Add cross-references based on navigation patterns
4. Update gotchas based on error patterns

**Example adaptation:**
```markdown
<!-- Before adaptation -->
## Error Handling
Basic try/catch patterns.

<!-- After adaptation (based on gap alerts) -->
## Error Handling
Basic try/catch patterns.

### Common Pitfalls
- Swallowing exceptions silently
- Catching overly broad exception types
- Missing cleanup in finally blocks

### See Also
- Async Error Handling in Fundamentals
- Error Propagation Patterns in Pattern Library
```

---

## Improvement Suggestion Format

### The Worker Presentation Format

When the worker identifies an improvement opportunity, present it to the user in this format:

```markdown
### 💡 Skill Improvement Suggestion

**Skill Area:** [specific area]
**Type:** [gap/correction/enhancement/update]

#### What I Noticed
[Clear, non-technical description of the observation]

#### Suggested Change
[Specific change that would help]

#### Why This Matters
[Impact on skill effectiveness]

#### Options:
1. **Apply now** - I'll make this improvement immediately
2. **Add to backlog** - Save for later review
3. **Dismiss** - This isn't relevant right now

Would you like me to proceed?
```

### Design Principles for Suggestions

1. **Be Specific** - Exact location and change needed
2. **Be Actionable** - Clear steps to implement
3. **Be Transparent** - Show reasoning and evidence
4. **Be Respectful** - Present as suggestion, not mandate
5. **Be Timely** - Surface at natural breakpoints, not mid-task

---

## The Self-Learning Feedback Loop Cycle

### Stage 1: Collection
```
Signals Gathered → Categorized → Stored
   ↓
- Performance metrics
- User corrections  
- Usage patterns
- External changes
```

### Stage 2: Analysis
```
Stored Signals → Pattern Detection → Trigger Identification
   ↓
- Aggregate similar signals
- Identify trends
- Classify triggers
- Assess priority
```

### Stage 3: Suggestion Generation
```
Triggers → Improvement Proposals → User Presentation
   ↓
- Select appropriate mechanism
- Draft improvement suggestion
- Format for user consumption
- Present at natural breakpoint
```

### Stage 4: Application
```
User Approval → Changes Applied → Validation Performed
   ↓
- Modify skill content
- Update documentation
- Adjust guidance
- Run quality validation
```

### Stage 5: Verification
```
Changes Applied → Effectiveness Measured → Loop Continues
   ↓
- Monitor for improvement
- Check for side effects
- Confirm resolution
- Feed results back to Collection
```

---

## Good Examples of Self-Learning Design

### Example 1: Minimal Effective Feedback

```markdown
## Self-Learning: Error Pattern Detection

This skill tracks common error patterns in generated code.

**What we track:**
- Syntax errors in output
- Logic errors caught by tests
- Style violations in generated code

**Feedback trigger:**
When the same error type appears 3+ times, suggest a 
documentation improvement.

**Adaptation:**
Add the error pattern to the "Common Gotchas" section
with prevention guidance.
```

**Why it's good:** Simple, focused, clear trigger, actionable adaptation.

### Example 2: Context-Aware Suggestions

```markdown
## Self-Learning: Framework Version Sensitivity

This skill adapts to framework version changes.

**Tracking:**
- User-specified framework version
- API compatibility issues
- Deprecated feature usage

**Trigger:**
When a user specifies a newer version than documented,
flag areas that may need updates.

**Adaptation:**
Present version-specific guidance and suggest updates
to the skill's version-specific sections.
```

**Why it's good:** Context-sensitive, proactive, helps prevent issues.

---

## Bad Examples of Self-Learning Design

### Example 1: Over-Instrumentation

```markdown
## Self-Learning: Comprehensive Monitoring

Track EVERYTHING:
- Every keystroke during skill usage
- Time spent on each line
- Eye movement patterns (if available)
- Emotional sentiment analysis
- Browser history for context
- All external tool interactions
- Social media for domain trends
- Weather for correlation studies
```

**Why it's bad:** Invasive, impractical, overwhelming, privacy concerns, no clear adaptation strategy.

### Example 2: Vague Feedback Loops

```markdown
## Self-Learning: Smart Adaptation

The skill learns from usage and gets better over time.

It adapts based on feedback and improves itself automatically.

The system uses AI to make intelligent updates as needed.
```

**Why it's bad:** No specifics on what is tracked, no triggers defined, no adaptation points identified, pure buzzwords.

---

## Self-Learning Design Checklist

- [ ] Feedback collection mechanisms defined
- [ ] Tracked metrics are relevant and measurable
- [ ] Improvement triggers are specific and actionable
- [ ] Feedback mechanisms are appropriate for trigger types
- [ ] Adaptation points are clearly identified
- [ ] Suggestion format is user-friendly
- [ ] Feedback loop is complete (collection → analysis → suggestion → application → verification)
- [ ] Privacy and minimalism principles are followed
- [ ] Good and bad examples are provided
- [ ] Integration with pattern-library and convention-definition is documented

---

## Related Methods

- **pattern-library.md** - Patterns may trigger self-learning updates
- **convention-definition.md** - Convention changes are a key trigger
- **quality-validation.md** - Validation confirms improvement effectiveness
- **iterative-refinement.md** - The process for applying improvements
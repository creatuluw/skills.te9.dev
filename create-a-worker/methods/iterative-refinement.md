# Iterative Refinement Method

## Purpose

Iterative refinement is the systematic process of continuously improving skills based on real-world usage signals, ensuring skills remain accurate, relevant, and increasingly effective over time. This method transforms static documentation into living knowledge that evolves with experience.

## When to Use

Apply iterative refinement when:
- A skill has been deployed and is actively used
- Users report issues or suggest improvements
- You discover gaps during skill execution
- Conventions or best practices in the domain evolve
- Periodic quality audits are scheduled (recommended: monthly)
- New patterns emerge from repeated application
- Feedback mechanisms surface improvement opportunities

## Signal Collection

### Types of Signals

#### 1. User Corrections
Direct feedback where users explicitly identify issues:
- Factual errors in knowledge content
- Outdated information or deprecated practices
- Missing context that caused confusion
- Incorrect examples or code snippets
- Ambiguous instructions leading to mistakes

**Collection Method:**
```
Signal: User Correction
Source: Direct feedback / issue report
Data Points:
  - What was incorrect
  - What the correct information should be
  - Context of the discovery
  - Impact level (how many tasks affected)
Timestamp: [auto-captured]
Skill Section: [identify affected section]
```

#### 2. Task Struggles
Patterns where users or the skill itself encounters difficulty:
- Frequently asked questions about the same topic
- Repeated errors following a method
- Tasks that require multiple attempts
- Low confidence outputs in specific areas
- Workarounds users develop independently

**Collection Method:**
```
Signal: Task Struggle
Source: Usage patterns / error logs
Indicators:
  - Question frequency > threshold
  - Error rate in specific method application
  - Task completion time anomalies
  - User abandonment patterns
Analysis Needed: Root cause identification
```

#### 3. New Discoveries
Knowledge gained through application:
- Previously undocumented patterns
- Edge cases not covered in fundamentals
- Better solutions to known problems
- Integration patterns with other skills
- Performance optimization opportunities

**Collection Method:**
```
Signal: New Discovery
Source: Skill execution insights
Capture:
  - The discovery description
  - Context where it emerged
  - Applicability scope
  - Evidence of validity
  - Recommended integration point
```

#### 4. Convention Changes
Evolution in domain standards and practices:
- Updated framework versions or APIs
- New industry best practices
- Deprecated patterns or approaches
- Shift in community preferences
- Security or compliance requirement changes

**Collection Method:**
```
Signal: Convention Change
Source: External references / community
Impact Assessment:
  - Which conventions affected
  - Breaking vs. evolutionary change
  - Timeline for adoption
  - Backward compatibility concerns
  - Sections requiring updates
```

## Pattern Analysis

### Analyzing Collected Signals

#### Methods Producing Issues
Identify which methods generate the most problems:
```
Analysis Framework:
1. Categorize signals by method
2. Calculate issue frequency per method
3. Identify common failure modes
4. Determine if issue is:
   - Method design flaw
   - Documentation clarity issue
   - Example inadequacy
   - Missing prerequisite knowledge
5. Prioritize based on:
   - Issue frequency
   - User impact severity
   - Fix complexity
   - Dependency effects
```

#### Knowledge Gaps
Areas where the skill lacks sufficient information:
```
Gap Analysis Process:
1. Map questions to knowledge areas
2. Identify areas with high question density
3. Classify gaps:
   - Missing topic coverage
   - Insufficient depth
   - Lack of examples
   - No troubleshooting guidance
4. Assess gap impact:
   - Tasks blocked
   - Work quality degraded
   - User confidence reduced
5. Document required additions
```

#### Convention Friction
Points where conventions conflict with practice:
```
Friction Indicators:
- Conventions frequently bypassed
- Users requesting exceptions
- Workarounds becoming common
- Convention violations in outputs
- Confusion between similar conventions

Analysis Steps:
1. Identify friction points
2. Determine root cause:
   - Convention too rigid
   - Convention unclear
   - Convention outdated
   - Convention conflicts with another
3. Propose resolution:
   - Clarification
   - Modification
   - Exception documentation
   - Convention retirement
```

#### Example Accuracy
Verify that examples remain correct and relevant:
```
Example Review Checklist:
□ Code still runs without errors
□ Outputs match descriptions
□ Best practices followed
□ Dependencies still available
□ Version compatibility maintained
□ Edge cases handled appropriately
□ Comments and explanations accurate
□ Complexity level appropriate for audience
```

## Improvement Prioritization Framework

### Priority Levels

#### Critical (Fix Immediately)
Conditions that warrant critical priority:
- **Factual errors** that produce incorrect outputs
- **Security vulnerabilities** in code examples
- **Breaking changes** in referenced APIs/libraries
- **Data loss risks** from following instructions
- **Complete method failures** preventing skill use

**Response Time:** Within 24 hours
**Validation:** Full regression test of affected section

#### High (Fix This Week)
Conditions that warrant high priority:
- **Misleading examples** that could cause confusion
- **Missing error handling** in common scenarios
- **Outdated patterns** superseded by better approaches
- **Incomplete methods** lacking critical steps
- **Convention conflicts** causing inconsistent outputs

**Response Time:** Within 7 days
**Validation:** Updated section + related sections

#### Medium (Fix This Month)
Conditions that warrant medium priority:
- **Suboptimal patterns** that work but could improve
- **Missing gotchas** for uncommon edge cases
- **Example gaps** in secondary scenarios
- **Clarity improvements** for ambiguous sections
- **Additional cross-references** that would help

**Response Time:** Within 30 days
**Validation:** Updated section review

#### Low (Backlog for Next Cycle)
Conditions that warrant low priority:
- **Stylistic improvements** in documentation
- **Additional examples** for completeness
- **Minor clarification** of edge cases
- **Formatting consistency** improvements
- **Cross-skill integration** notes

**Response Time:** Next scheduled refinement cycle
**Validation:** Standard quality check

### Prioritization Matrix

```
Impact ↓ / Frequency → | High Frequency | Medium Frequency | Low Frequency
-----------------------|----------------|------------------|---------------
High Impact           | CRITICAL       | HIGH             | HIGH
Medium Impact         | HIGH           | MEDIUM           | MEDIUM
Low Impact            | MEDIUM         | LOW              | LOW
```

## Improvement Application Process

### Step 1: Preparation
```
Prerequisites:
- Signal analyzed and root cause identified
- Priority assigned
- Affected sections mapped
- Test cases defined
- Backup of current content created
```

### Step 2: Content Update
```
Update Sequence:
1. Modify primary content (knowledge/method/convention)
2. Update related examples
3. Add new gotchas if discovered
4. Update cross-references
5. Revise navigation links if structure changed
6. Update self-learning triggers if needed
```

### Step 3: Consistency Check
```
Verification Points:
□ Updated content aligns with existing conventions
□ Examples follow current patterns
□ No contradictions with other sections
□ Terminology remains consistent
□ Difficulty progression maintained
□ Cross-references still valid
```

### Step 4: Validation
```
Quality Gates:
1. Technical accuracy verified
2. Examples tested and working
3. Formatting follows standards
4. Navigation updated and correct
5. No orphaned references created
6. Version number incremented
```

## Post-Update Validation Requirements

### Immediate Validation (Every Update)
```
□ Content renders correctly
□ No broken internal links
□ Examples execute successfully
□ No conflicting information introduced
□ SKILL.md reflects changes
□ Version updated in skill metadata
```

### Section Validation (High Priority Updates)
```
□ Section completeness maintained
□ Prerequisites still accurate
□ Related sections unaffected
□ Examples cover main scenarios
□ Gotchas still comprehensive
□ Self-learning triggers updated
```

### Full Skill Validation (Critical Updates)
```
□ Run complete quality-validation method
□ Verify all knowledge areas covered
□ Test method navigability
□ Check convention consistency
□ Validate example accuracy
□ Confirm self-learning integration
□ User acceptance testing
```

## Version Tracking Approach

### Semantic Versioning for Skills
```
Version Format: MAJOR.MINOR.PATCH

MAJOR: Significant restructuring
- Knowledge area reorganization
- Method replacement
- Convention breaking changes
- Fundamental concept additions

MINOR: Feature additions
- New method additions
- New pattern documentation
- Expanded knowledge sections
- New example categories

PATCH: Fixes and improvements
- Error corrections
- Example updates
- Clarification improvements
- Gotcha additions
```

### Changelog Documentation
```markdown
## [Version] - YYYY-MM-DD

### Added
- New features or content

### Changed
- Modified existing content

### Fixed
- Corrections to errors

### Deprecated
- Content scheduled for removal

### Removed
- Deleted content
```

### Version History Location
```
skill-name/
├── SKILL.md (current version reference)
├── CHANGELOG.md (version history)
├── methods/
├── knowledge/
└── _archive/ (previous major versions)
```

## Communicating Changes to Users

### Change Notification Format
```markdown
## Skill Update: [Skill Name] v[Version]

**Date:** YYYY-MM-DD
**Priority:** [Critical/High/Standard]

### Summary
[1-2 sentence overview of what changed]

### Key Changes
- **[Section]:** [Description of change]
- **[Section]:** [Description of change]

### Impact
[What this means for users - how it affects their workflow]

### Action Required
[Any steps users need to take, if applicable]

### Migration Notes
[For major versions: how to adapt existing practices]
```

### Communication Channels
```
1. SKILL.md Header Update
   - Add "Recently Updated" section
   - Highlight major changes
   - Link to detailed changelog

2. Changelog Entry
   - Comprehensive change details
   - Rationale for changes
   - Migration guidance

3. Method Annotations
   - Update notes in affected methods
   - "As of version X" markers
   - Deprecated approach warnings

4. User-Facing Messages
   - Improvement suggestions triggered
   - Contextual notes during skill use
   - Version check on skill invocation
```

## Good and Bad Examples

### Good Example: Refinement Cycle

```markdown
## Refinement Cycle Example: API Integration Skill

### Signal Collection (Week 1-2)
- User reported: Authentication example fails with new OAuth2 update
- Pattern detected: 3 users asked about pagination in last week
- Discovery: New rate limiting headers not documented
- Convention change: REST API error format standardized

### Analysis (Week 2)
- Authentication method: CRITICAL (breaking change)
- Pagination coverage: HIGH (missing feature)
- Rate limiting: MEDIUM (new capability)
- Error format: HIGH (convention shift)

### Prioritization
1. Fix authentication example (Critical - immediate)
2. Add pagination method (High - this week)
3. Update error handling (High - this week)
4. Document rate limiting (Medium - next week)

### Implementation
Day 1: Updated auth method with new OAuth2 flow
Day 2: Added pagination method with examples
Day 3: Revised error handling across all methods
Day 5: Added rate limiting documentation

### Validation
- All examples tested against live API
- Error scenarios verified
- Pagination tested with various page sizes
- Auth flow confirmed with different grant types

### Version Update
v2.1.0 → v2.2.0 (MINOR: new pagination method)
- Updated SKILL.md with new capabilities
- Chelogged all changes
- Notified users via improvement suggestions

### Outcome
- Auth failures eliminated
- Pagination questions dropped 90%
- Error handling more consistent
- Users leveraging rate limiting for optimization
```

### Bad Example: Refinement Cycle

```markdown
## Poor Refinement Approach

### Problems Demonstrated:
1. Reactive Only
   - Waited for user complaints
   - No proactive signal collection
   - Ignored usage pattern data

2. No Prioritization
   - Fixed issues in order received
   - Spent time on formatting while auth broken
   - No impact assessment

3. Incomplete Updates
   - Fixed auth example but not related methods
   - Added pagination without examples
   - Updated code but not documentation

4. No Validation
   - Assumed fixes worked
   - Didn't test edge cases
   - No regression testing

5. No Communication
   - Users discover changes by surprise
   - No changelog maintained
   - Version numbers not updated
   - Confusion about which version to use

6. No Documentation
   - Changes made without recording rationale
   - Future maintainers don't understand evolution
   - Hard to distinguish improvements from regressions
```

## Refinement Best Practices

### DO:
- ✅ Collect signals continuously and systematically
- ✅ Analyze patterns before making changes
- ✅ Prioritize based on impact and frequency
- ✅ Test all changes thoroughly
- ✅ Document rationale for changes
- ✅ Maintain version history
- ✅ Communicate changes proactively
- ✅ Validate entire skill after critical updates
- ✅ Link refinements to self-learning feedback

### DON'T:
- ❌ Make changes without analyzing root cause
- ❌ Skip validation to save time
- ❌ Update one section without checking dependencies
- ❌ Forget to update examples when changing patterns
- ❌ Ignore low-priority signals (they accumulate)
- ❌ Make breaking changes without migration guides
- ❌ Update without incrementing version
- ❌ Assume one fix resolves all related issues

## Integration with Self-Learning

The iterative refinement method works in a feedback loop with self-learning design:

```
Self-Learning Design → Triggers → Signal Collection → Analysis → 
Refinement → Validation → Updated Skill → New Triggers → [cycle continues]
```

### Linking Points:
- Self-learning triggers should feed into signal collection
- Pattern analysis should update adaptation points
- Improvements should be reflected in knowledge gap tracking
- Convention updates should trigger convention evolution flags

## Measurement and Success Metrics

### Track These Indicators:
```
Efficiency Metrics:
- Average time from signal to resolution
- Issues caught proactively vs. reactively
- Validation pass rate on first attempt

Quality Metrics:
- User correction frequency (should decrease)
- Task struggle rate (should decrease)
- Example accuracy rate (should maintain 100%)
- Convention compliance rate (should increase)

Process Metrics:
- Refinement cycle regularity
- Version update frequency
- Changelog completeness
- Communication timeliness
```

### Success Indicators:
- Decreasing critical/high priority issues over time
- Increasing proactive discoveries vs. reactive fixes
- Positive user feedback on updates
- Reducing time-to-resolution for issues
- Growing pattern library from discoveries
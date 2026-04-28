# Fundamentals Extraction Method

## Purpose

Extract and codify the foundational principles, rules, constraints, heuristics, and mental models
that form the bedrock of all domain work. Fundamentals are the immutable truths and guiding forces
that a worker uses to make correct decisions in every situation — including novel ones where no
documented method applies.

A skill without fundamentals produces workers who follow procedures blindly. A skill with
fundamentals produces workers who understand *why* procedures work and can adapt intelligently
when procedures fall short.

## When to Use

- **Always.** Every skill creation requires fundamentals extraction. This is non-negotiable.
- During domain discovery, after knowledge area enumeration, before method codification.
- When upgrading an existing skill that lacks documented principles.
- When a skill's methods produce inconsistent results (the missing fundamentals are likely the cause).
- When workers apply techniques correctly but produce poor outcomes (they lack decision-making context).

---

## Types of Fundamentals

Fundamentals fall into four distinct categories, each serving a different role in expert reasoning.

### 1. Invariants

**Definition:** Conditions that must *always* be true, without exception. Violating an invariant
produces incorrect, broken, or dangerous results.

**Characteristics:**
- Absolute — no exceptions, no "depends on context"
- Verifiable — you can check with a test or inspection
- Domain-rooted — derived from the nature of the domain itself, not from preference

**Examples by domain:**
- **Software Engineering:** "A function must always return the same type for the same input signature"
- **Data Science:** "Training data must never leak into test data"
- **Security:** "Never trust client-side validation as the sole input check"
- **Database Design:** "Every table must have a primary key"
- **API Design:** "Every endpoint must handle authentication before processing"

**How to spot invariants during discovery:**
- Listen for phrases like "must always," "never," "under no circumstances"
- Look for rules that have no exceptions in expert practice
- Identify failures that are *categorically* wrong, not just suboptimal
- Find rules that, when violated, cause cascading failures

### 2. Constraints

**Definition:** Boundaries that limit what is possible or advisable. Constraints define the space
of valid solutions and prevent approaches that are technically possible but domain-inappropriate.

**Characteristics:**
- Bounded — they define limits, not prescriptions
- Contextual — they may vary by situation or environment
- Often performance-related — time, memory, complexity, cost limits

**Examples by domain:**
- **Frontend Development:** "Initial page load must complete within 3 seconds on 3G networks"
- **Machine Learning:** "Model inference must complete within 50ms for real-time applications"
- **System Design:** "No single point of failure in production infrastructure"
- **Mobile Development:** "App must not consume more than 100MB of memory on mid-range devices"
- **Data Engineering:** "Pipeline must process 1M records within the 4-hour SLA window"

**How to spot constraints during discovery:**
- Listen for phrases like "can't exceed," "within," "at most," "minimum of"
- Look for performance requirements, SLAs, and resource limits
- Identify domain-specific limits (regulatory, physical, compatibility)
- Find rules that define when a solution is "good enough" vs. "over-engineered"

### 3. Heuristics

**Definition:** Rules of thumb that guide decision-making when multiple valid approaches exist.
Heuristics don't guarantee the best outcome, but they consistently produce good outcomes.

**Characteristics:**
- Preferential — they guide toward better choices, not absolute truth
- Experience-based — derived from accumulated expert experience
- Context-sensitive — the best heuristic may vary by situation
- Trade-off-aware — they acknowledge that compromises exist

**Examples by domain:**
- **Software Architecture:** "Prefer composition over inheritance"
- **Testing:** "Write tests for behavior, not implementation"
- **Database Queries:** "Index columns that appear in WHERE clauses before columns in SELECT"
- **UI Design:** "No interaction should require more than 3 clicks from any starting point"
- **Code Review:** "If you can't explain the change in one sentence, split the PR"
- **Performance Optimization:** "Profile before optimizing; the bottleneck is never where you think"

**How to spot heuristics during discovery:**
- Listen for phrases like "generally," "usually," "prefer," "as a rule of thumb"
- Look for patterns in how experts make choices between valid alternatives
- Identify decision points where experts consistently choose one approach over another
- Find rules that experts apply without conscious thought (they've been internalized)

### 4. Mental Models

**Definition:** Frameworks for thinking about problems — how domain experts decompose, analyze,
and understand complex situations. Mental models are the lenses through which experts see problems.

**Characteristics:**
- Structural — they define how to organize thinking, not what to think
- Reusable — applicable across many different specific problems
- Often visual or spatial — experts "see" problems in specific ways
- Fundamental to expertise — what separates novices from experts

**Examples by domain:**
- **Software Engineering:**
  - "Think of a codebase as a dependency graph; changes propagate along edges"
  - "Model state as a finite state machine; every invalid state is a bug"
  - "See the system as a series of data transformations, not a series of actions"
- **Data Science:**
  - "Every dataset tells a story; your job is to find the true story, not the convenient one"
  - "Think of model selection as a bias-variance tradeoff spectrum"
  - "Visualize distributions before computing statistics"
- **System Design:**
  - "Think in terms of bounded contexts; ambiguity is the enemy of clean architecture"
  - "Every component has a contract; violations of that contract are bugs"
  - "Model the system as a set of producers and consumers with queues between them"
- **Security:**
  - "Every input is an attack vector until proven otherwise"
  - "Think in layers; no single security measure is sufficient"
  - "The attacker only needs to find one vulnerability; you need to protect all of them"

**How to spot mental models during discovery:**
- Listen for metaphors and analogies experts use ("it's like a...", "think of it as...")
- Look for how experts structure their initial analysis of a problem
- Identify the first questions experts ask when facing a new problem
- Find patterns in how experts categorize and group related concepts

---

## Extraction Techniques by Fundamental Type

### Extracting Invariants

**Technique 1: Violation Analysis**

Present domain experts with scenarios and ask: "What would make this categorically wrong?"

```
Interview prompt: "I'm going to describe some solutions in this domain.
For each one, tell me: is this wrong, suboptimal, or acceptable? And why?"

Follow-up: "Is there any situation where the 'wrong' version would be acceptable?"
If answer is "no" → You've found an invariant.
If answer is "yes, but only if..." → This is a heuristic or constraint, not an invariant.
```

**Technique 2: Error Catalog Review**

Collect a set of domain errors, bugs, or failures. For each, identify:
- Is this error caused by violating a rule? What rule?
- Could this error ever be intentional or correct? If no → the rule is an invariant.

**Technique 3: Boundary Testing**

For each candidate invariant, ask:
- "Under what conditions would this NOT be true?"
- If no valid conditions exist → it's an invariant
- If conditions exist but are rare → it's a strong heuristic
- If conditions are common → it's a weak heuristic or preference

### Extracting Constraints

**Technique 1: Limitation Interview**

Ask domain experts:
- "What are the hard limits in this domain? Things you literally cannot exceed?"
- "What are the soft limits? Things you shouldn't exceed without good reason?"
- "What limits exist that newcomers often don't realize?"

**Technique 2: Post-Mortem Analysis**

Review project failures or incidents:
- What constraint was violated?
- Was the constraint known beforehand?
- What is the consequence of violating this constraint?

**Technique 3: Requirement Decomposition**

Take domain requirements and decompose them into:
- Functional requirements (what the system must do)
- Non-functional requirements (how well it must do it)
- Constraints (what it must NOT do, or must stay within)

Constraints often emerge from non-functional requirements.

### Extracting Heuristics

**Technique 1: Decision Point Mapping**

Walk through common workflows and identify every point where the practitioner must choose
between multiple valid options. For each decision point:
- What options are available?
- Which option do experts consistently choose?
- Why do they choose it?
- When would they choose differently?

```
Example decision point map (for code review):

Decision: Should I approve this PR?
Options:
  a) Approve if tests pass
  b) Approve if tests pass AND code is readable
  c) Approve if tests pass AND code is readable AND architecture is clean
  d) Reject and ask for changes

Expert pattern: Choose (c) for core modules, (b) for peripheral modules, (a) for
documentation-only changes.

Heuristic extracted: "Approval strictness should match the criticality of the changed module."
```

**Technique 2: Comparative Analysis**

Present experts with two solutions to the same problem and ask:
- "Which is better? Why?"
- "In what situation would you choose the other?"
- "What's the trade-off between them?"

The "why" reveals the heuristic. The trade-off reveals the boundary conditions.

**Technique 3: Anti-Pattern Collection**

Ask experts: "What do you see people do wrong most often?" For each anti-pattern:
- What should they have done instead?
- Why do people make this mistake?
- What rule would prevent this mistake?

### Extracting Mental Models

**Technique 1: Think-Aloud Protocol**

Ask experts to solve a problem while verbalizing their thought process:
- What do they look at first?
- How do they structure the problem?
- What questions do they ask themselves?
- What do they ignore or deprioritize?

The structure of their thinking IS the mental model.

**Technique 2: Analogy Elicitation**

Ask experts: "How would you explain this domain to a newcomer? What analogy would you use?"

Experts naturally reach for mental models when teaching. Their analogies reveal their
internal frameworks.

**Technique 3: Whiteboard Decomposition**

Give experts a complex problem and ask them to draw how they'd approach it:
- What boxes/components do they draw first?
- How do they connect them?
- What labels do they use?
- What do they leave out?

The visual structure reveals their mental model.

**Technique 4: Category Discovery**

Ask experts to sort a set of domain artifacts (code snippets, design patterns, tools):
- "Group these by similarity. What are your groups?"
- "What makes items in the same group similar?"
- "What makes items in different groups different?"

The grouping criteria reveal the expert's mental categories — the basis of their mental models.

---

## Writing Principles That Stick

Every fundamental must be documented using the **Rule + Rationale + Consequence** format.
Principles written in this format are remembered, followed, and correctly applied.

### The RR+C Format

```
RULE: [The principle stated as a clear, actionable directive]
RATIONALE: [Why this rule exists — the domain logic behind it]
CONSEQUENCE: [What happens when you violate this rule — the concrete negative outcome]
```

### Writing Effective Rules

**Good rules are:**
- **Specific:** "Use parameterized queries" not "Be safe with databases"
- **Actionable:** "Validate every input on the server side" not "Inputs should be validated"
- **Universal within scope:** Applies consistently within its defined scope
- **Testable:** You can verify whether it's been followed

**Bad rules are:**
- **Vague:** "Write clean code" (what does "clean" mean?)
- **Passive:** "Errors should be handled" (by whom? how?)
- **Context-dependent without context:** "Use the best tool" (best for what?)
- **Untestable:** "Make it user-friendly" (no clear pass/fail criteria)

### Writing Effective Rationales

**Good rationales explain:**
- The domain mechanism that makes the rule necessary
- The technical, business, or user reason behind the rule
- Why this rule exists instead of some alternative

**Bad rationales:**
- "Best practice" (why is it best?)
- "Industry standard" (why did the industry standardize on this?)
- "Common convention" (conventions exist for reasons — explain the reason)

### Writing Effective Consequences

**Good consequences are:**
- **Concrete:** "Queries will be vulnerable to SQL injection"
- **Specific:** "The application will crash when memory exceeds 2GB"
- **Cascading:** "This causes downstream services to timeout, which causes..."

**Bad consequences are:**
- **Abstract:** "Code quality will suffer"
- **Generic:** "Things might not work correctly"
- **Threatening without substance:** "You'll be sorry" (why? what happens?)

### Complete Examples of RR+C Documentation

#### Example 1: Software Engineering Fundamental

```markdown
### Always Validate Input at the Trust Boundary

**RULE:** Every piece of data that crosses a trust boundary (external API input,
user-submitted form data, file uploads, message queue payloads) must be validated
for type, format, length, and range before being processed or stored.

**RATIONALE:** Trust boundaries are the lines between areas you control and areas
you don't. Data from outside your control cannot be assumed to follow your system's
expectations. Validation at the trust boundary prevents malformed, malicious, or
corrupted data from propagating into your system's internal logic, where it becomes
exponentially harder to detect and handle.

**CONSEQUENCE:** Without boundary validation:
- Malformed data reaches business logic, causing unexpected behavior and hard-to-trace bugs
- Malicious payloads (XSS, SQL injection, buffer overflows) exploit processing logic
- Invalid data persists to storage, corrupting the dataset for all consumers
- Error messages expose internal system details to attackers
- Debugging requires tracing through the entire call stack to find where bad data entered
```

#### Example 2: Data Science Fundamental

```markdown
### Training and Test Data Must Never Share Observations

**RULE:** No observation (row) that appears in the training dataset may appear in
the test dataset. This separation must be established before any preprocessing,
feature engineering, or model selection begins.

**RATIONALE:** The purpose of a test set is to estimate how the model will perform
on data it has never seen before — simulating real-world deployment. If the model
has seen a test observation during training, the test performance is no longer an
estimate of generalization; it is a measure of memorization. This invalidates the
entire evaluation and gives false confidence in model performance.

**CONSEQUENCE:** Training-test leakage causes:
- Inflated accuracy metrics that don't reflect real-world performance
- Models that appear production-ready but fail immediately upon deployment
- Wasted engineering effort on models chosen based on false evaluation
- Business decisions made on incorrect performance estimates
- Loss of stakeholder trust when deployed performance doesn't match reported performance
```

#### Example 3: API Design Fundamental

```markdown
### API Contracts Must Be Stable and Backward-Compatible

**RULE:** Once an API endpoint is published and consumers are using it, changes must
be backward-compatible. Breaking changes require a new endpoint version, not
modification of the existing endpoint.

**RATIONALE:** APIs are contracts between producer and consumer. Consumers build
their systems against the current contract and deploy on their own schedule. Changing
the contract without versioning breaks consumers without warning, at times the API
producer cannot control. Stability enables independent deployment schedules.

**CONSEQUENCE:** Breaking API changes cause:
- Consumer applications to crash or produce incorrect results without warning
- Loss of consumer trust and adoption — teams will avoid your APIs
- Emergency rollback deployments that disrupt the producer's release schedule
- Need for consumer-by-consumer migration efforts that consume engineering resources
- Permanent version sprawl if migrations are incomplete
```

---

## Decision Tree Extraction Method

Decision trees capture the expert reasoning process for choosing between alternatives.
They are a specific form of mental model documentation.

### How to Extract Decision Trees

**Step 1: Identify Decision Points**

For a given domain task, identify every point where the practitioner must choose:
- Between different methods or approaches
- Between different tools or technologies
- Between different levels of effort or thoroughness
- Between different trade-offs

**Step 2: Determine Decision Criteria**

For each decision point, identify:
- What information the expert considers
- What factors are weighted most heavily
- What disqualifying conditions exist
- What the expert's "default" choice is (when no strong factors push either way)

**Step 3: Map the Tree Structure**

```
Decision: [What is being decided]
├── IF [condition 1] THEN [choice A]
│   └── BECAUSE [rationale for this branch]
├── ELSE IF [condition 2] THEN [choice B]
│   └── BECAUSE [rationale for this branch]
├── ELSE IF [condition 3] THEN [choice C]
│   └── BECAUSE [rationale for this branch]
└── ELSE (default) THEN [choice D]
    └── BECAUSE [rationale for default]
```

**Step 4: Validate with Scenarios**

Test the decision tree against real scenarios:
- For each scenario, does the tree lead to the expert's actual choice?
- Are there scenarios the tree doesn't cover?
- Are there branches that never seem to be taken? (Consider removing them)
- Are there branches that are taken so often they should be the default?

**Step 5: Document Edge Cases**

For each decision tree, explicitly document:
- "When this tree doesn't apply" — situations that bypass this decision entirely
- "When multiple branches seem equally valid" — what to do when criteria are ambiguous
- "When to escalate" — situations where the practitioner should ask for help rather than decide

### Decision Tree Example

```markdown
## Decision Tree: Choosing Between SQL and NoSQL for a New Data Store

Decision: What database technology to use for a new data storage need?

├── IF data is highly structured with fixed schema AND
│   relationships between entities are important AND
│   strong consistency is required
│   → USE relational database (SQL)
│   BECAUSE: SQL databases enforce schema integrity, handle relationships
│   natively via JOINs, and provide ACID guarantees for consistency.
│
├── ELSE IF data is semi-structured or schema varies across records AND
│   horizontal scaling is a primary concern AND
│   eventual consistency is acceptable
│   → USE document database (NoSQL - Document)
│   BECAUSE: Document databases handle schema flexibility naturally, scale
│   horizontally without manual sharding, and accept eventual consistency
│   for availability.
│
├── ELSE IF access pattern is simple key-value lookups AND
│   ultra-low latency is critical AND
│   data has no complex relationships
│   → USE key-value store (NoSQL - Key-Value)
│   BECAUSE: Key-value stores optimize for the simplest and fastest access
│   pattern with minimal overhead.
│
├── ELSE IF data is time-series or event streams AND
│   writes are append-only AND
│   queries are typically range-based over time
│   → USE time-series database
│   BECAUSE: Time-series databases optimize for high-volume sequential writes
│   and efficient time-range queries.
│
└── ELSE (default when uncertain)
    → USE relational database (SQL)
    BECAUSE: SQL databases handle the widest range of use cases adequately.
    You can migrate to NoSQL later if specific scaling needs emerge, but
    starting with SQL gives you the most flexibility and tooling support
    for evolving requirements.

Edge cases:
- If you need both relationships AND horizontal scale → Consider NewSQL
  (CockroachDB, Google Spanner) or SQL with read replicas
- If data is graph-structured with many many-to-many relationships →
  Use a graph database (Neo4j) regardless of other factors
- If this is a prototype or MVP → Use whatever the team knows best;
  database choice matters less at this stage than iteration speed
```

---

## Abstraction Level Identification

Fundamentals operate at different abstraction levels. Correctly identifying the level
ensures the principle is stated at the right granularity.

### The Four Abstraction Levels

#### Level 1: Domain Philosophy (Why the domain exists)

These are the highest-level truths about the domain itself.
They rarely change and apply to all work in the domain.

```
Example (Software Engineering):
"The primary technical goal of software engineering is managing complexity.
All practices — from naming to architecture — serve this goal."

Example (Data Science):
"The purpose of data analysis is to make better decisions.
If the analysis doesn't inform a decision, it's academic, not applied."
```

**When to document:** Always include 2-5 domain philosophy statements. They orient
the worker toward the domain's purpose and prevent work that is technically correct
but domain-misaligned.

#### Level 2: Domain Principles (How the domain works)

These are the core laws and rules that govern work in the domain.
They change slowly, usually only when the domain itself evolves.

```
Example (Software Engineering):
"Dependencies should point toward stability. Stable modules should not
depend on unstable modules."

Example (Data Science):
"Correlation does not imply causation. Observational data shows association;
only controlled experiments establish causation."
```

**When to document:** Include 5-15 domain principles. These are the most valuable
fundamentals for day-to-day decision making.

#### Level 3: Guideline Rules (How to make good choices)

These are specific rules that guide implementation decisions.
They may change as tools, frameworks, and best practices evolve.

```
Example (Software Engineering):
"Use dependency injection for external dependencies. Instantiate concrete
classes only at composition roots."

Example (Data Science):
"Start with a simple baseline model before trying complex models.
A linear regression baseline establishes the minimum acceptable performance."
```

**When to document:** Include 10-30 guideline rules. These translate principles
into specific, actionable guidance for common decisions.

#### Level 4: Implementation Constraints (What to do specifically)

These are specific technical requirements for particular tools or environments.
They change frequently as the technology stack evolves.

```
Example (Software Engineering):
"In this React project, use functional components with hooks.
Do not use class components unless interfacing with a legacy library."

Example (Data Science):
"For this project, use scikit-learn for classical ML and PyTorch for
deep learning. Do not use TensorFlow."
```

**When to document:** Include only constraints that are stable enough to belong in
the skill. Rapidly changing constraints belong in project documentation, not skills.

### How to Identify the Correct Level

Ask these questions for each candidate fundamental:

1. **"Does this apply across all projects in the domain?"**
   - Yes → Level 1 or 2
   - No, but applies across most projects → Level 3
   - No, specific to a tool or project → Level 4

2. **"How often would this change?"**
   - Never or extremely rarely → Level 1
   - Only when the domain fundamentally changes → Level 2
   - When best practices evolve (yearly) → Level 3
   - When tools or frameworks change (monthly) → Level 4

3. **"Is this about WHY, HOW, or WHAT?"**
   - WHY → Level 1 or 2
   - HOW → Level 2 or 3
   - WHAT → Level 3 or 4

### Where to Document Each Level

- **Level 1 (Philosophy):** In `design/` as a foundational document, referenced from SKILL.md
- **Level 2 (Principles):** In `design/` with individual files for each major principle area
- **Level 3 (Guidelines):** In `design/` or `methods/` depending on whether they're
  standalone principles or embedded in method documentation
- **Level 4 (Constraints):** In `conventions/` — they are domain-specific rules, not
  universal fundamentals

---

## Principle Test Design

Every fundamental should have an associated test — a way to verify that work produced
adheres to the principle. Without tests, principles become aspirations rather than
enforceable standards.

### Types of Principle Tests

#### 1. Automated Tests

Principles that can be verified programmatically should have automated tests.

```markdown
### Principle Test: "Every public API endpoint must require authentication"

**Test type:** Automated (integration test)

**Test procedure:**
1. Enumerate all registered API endpoints
2. For each endpoint, send an unauthenticated request
3. Verify that each request returns 401 Unauthorized

**Pass condition:** All endpoints return 401 for unauthenticated requests
**Fail condition:** Any endpoint returns 200 for unauthenticated requests

**Implementation:** This test runs in CI/CD pipeline on every deployment.
```

#### 2. Checklist Tests

Principles that require human judgment should have checklist tests.

```markdown
### Principle Test: "Error messages must be actionable"

**Test type:** Checklist (manual review)

**Review checklist for each error message:**
- [ ] Does the message state what went wrong in plain language?
- [ ] Does the message state what the user should do to fix it?
- [ ] Does the message avoid technical jargon the user wouldn't understand?
- [ ] Does the message avoid blaming the user?
- [ ] Does the message include relevant context (what value was invalid, etc.)?

**Pass condition:** All checklist items are satisfied
**Fail condition:** Any checklist item is not satisfied

**When to apply:** During code review for any code that produces user-facing error messages.
```

#### 3. Scenario Tests

Principles that govern behavior in specific situations should have scenario tests.

```markdown
### Principle Test: "Graceful degradation under failure"

**Test type:** Scenario (manual or automated)

**Test scenarios:**
1. **Database unavailable:**
   - Expected: Application returns cached data or meaningful error
   - Failure: Application crashes or returns raw database error

2. **External API timeout:**
   - Expected: Application uses fallback value or queues for retry
   - Failure: Application hangs or returns timeout error to user

3. **Disk full:**
   - Expected: Application logs warning, continues serving reads
   - Failure: Application crashes

**Pass condition:** Each scenario produces the expected graceful behavior
**Fail condition:** Any scenario produces the failure behavior

**When to apply:** During chaos testing or resilience review.
```

### Designing Effective Principle Tests

**DO:**
- Make the pass/fail criteria binary and unambiguous
- Include the test alongside the principle in documentation
- Specify when and how often the test should be applied
- Update the test when the principle evolves

**DON'T:**
- Create tests that require subjective judgment without clear criteria
- Write tests that are so expensive to run they get skipped
- Test principles at the wrong level (don't unit-test a philosophy)
- Create tests that are more complex than the principle they verify

---

## Completeness Criteria for Fundamentals

A skill's fundamentals are complete when:

### Coverage Check
- [ ] Every knowledge area from domain discovery has at least one fundamental
- [ ] All four types of fundamentals are represented (invariants, constraints, heuristics, mental models)
- [ ] At least two abstraction levels are covered (ideally 1-3)
- [ ] The most critical domain decisions have documented decision trees

### Quality Check
- [ ] Every fundamental follows the Rule + Rationale + Consequence format
- [ ] Rationales explain the domain mechanism, not just "best practice"
- [ ] Consequences are concrete and specific, not abstract warnings
- [ ] Principles are stated at the correct abstraction level

### Testability Check
- [ ] Every invariant has a verification test (automated or manual)
- [ ] Every constraint has a way to measure compliance
- [ ] Critical heuristics have scenario-based tests
- [ ] Mental models can be applied to novel problems (validated with test scenarios)

### Integration Check
- [ ] Fundamentals are referenced from relevant methods in `methods/`
- [ ] SKILL.md shorthand chapters link to fundamentals where relevant
- [ ] Conventions in `conventions/` are traceable to their underlying fundamentals
- [ ] No contradictions exist between fundamentals and documented methods

---

## Good and Bad Examples

### Good Example: Fundamentals for a React Development Skill

```markdown
# React Development Fundamentals

## Invariant: State Immutability

**RULE:** Never mutate component state directly. Always create new objects/arrays
when updating state.

**RATIONALE:** React detects state changes by reference equality. When you mutate
an existing object, its reference doesn't change, so React doesn't know to re-render.
This leads to stale UI that doesn't reflect the current state.

**CONSEQUENCE:** Direct state mutation causes:
- Components that don't re-render when they should
- Inconsistent UI state where displayed values don't match actual values
- Impossible-to-debug heisenbugs where behavior depends on render timing
- Violations of React's concurrency guarantees in React 18+

**Test:** Enable React Strict Mode. If state mutations exist, behavior will be
inconsistent between development and production.

---

## Heuristic: Component Size Guide

**RULE:** Extract a component when it exceeds ~50 lines of JSX or when it contains
a logically distinct section of the UI.

**RATIONALE:** Components are the unit of reusability, testability, and mental
management in React. Overly large components become difficult to understand, test,
and reuse. The 50-line guideline is a threshold where cognitive load typically
starts to increase noticeably.

**CONSEQUENCE:** Oversized components lead to:
- Difficulty identifying which state changes trigger which renders
- Unnecessary re-renders of unrelated UI sections
- Code duplication when similar sections are needed elsewhere
- Merge conflicts when multiple developers work on the same component

**This is a heuristic, not a rule.** A 60-line component that is cohesive and
unlikely to be reused is better than a 30-line component split at an awkward boundary.
```

**Why this is good:**
- Follows the Rule + Rationale + Consequence format
- Rationale explains the React mechanism (reference equality)
- Consequence is specific and actionable
- The heuristic acknowledges it's a guideline, not absolute
- Test is provided for the invariant

### Bad Example: Fundamentals for a React Development Skill

```markdown
# React Development Fundamentals

- Always use functional components
- Keep components small
- Don't mutate state
- Use hooks properly
- Follow React best practices
- Components should be reusable
- Test your components
```

**Why this is bad:**
- No rationale for any principle — the reader doesn't know why these matter
- No consequences — the reader doesn't know what happens if they violate them
- "Use hooks properly" is too vague to be actionable
- "Follow React best practices" is circular — the fundamentals ARE the best practices
- No distinction between invariants, constraints, heuristics, and mental models
- No abstraction level distinction
- No tests or verification methods
- A newcomer would read this and learn nothing about *how* React works

### Good Example: Decision Tree for Error Handling

```markdown
## Decision Tree: How to Handle an Error

Decision: What should the code do when an error occurs?

├── IF the error is caused by invalid user input
│   → RETURN a clear, actionable error message to the user
│   BECAUSE: The user can fix their input and retry
│   EXAMPLE: "Email address must include an @ symbol. You entered: 'userexample.com'"

├── ELSE IF the error is caused by a temporary system condition (network timeout,
│   rate limit, service unavailable)
│   → RETRY with exponential backoff, then queue for later if retries exhaust
│   BECAUSE: The condition is likely to resolve, and the operation can succeed later
│   EXAMPLE: API call returns 503 → retry at 1s, 2s, 4s, then add to dead letter queue

├── ELSE IF the error is caused by a programming bug (null reference, type error,
│   assertion failure)
│   → FAIL FAST with a detailed error log and alert
│   BECAUSE: The operation cannot succeed; continuing with bad state makes things worse
│   EXAMPLE: Unexpected null in required field → log error with full context, return 500

├── ELSE IF the error is caused by a permissions or authorization failure
│   → RETURN a permissions error with guidance on how to get access
│   BECAUSE: The user needs to know what access they need and how to request it
│   EXAMPLE: "You need 'editor' role to modify this resource. Request access at [URL]"

└── ELSE (unknown or unexpected error)
    → LOG full error context, RETURN generic error to user, ALERT the team
    BECAUSE: Unknown errors need investigation. The user shouldn't see internal details.
    The team needs to know about unexpected failures.
    EXAMPLE: Return "An unexpected error occurred. Our team has been notified."
    Log: full stack trace, request context, user ID, timestamp

Gotcha: Never expose stack traces, SQL queries, or internal system details to end users.
This information helps attackers understand your system.
```

**Why this is good:**
- Covers the most common error categories
- Each branch has a clear WHEN condition, WHAT to do, and WHY
- Examples make each branch concrete
- Default branch handles the "unknown" case
- Includes a gotcha that applies across all branches

### Bad Example: Error Handling "Guidance"

```markdown
## Error Handling

Handle errors appropriately based on the situation. Some errors should be shown
to users, some should be logged, and some should be retried. Always handle errors
gracefully and never let the application crash. Use try-catch blocks and check
for error conditions.
```

**Why this is bad:**
- "Appropriately" and "gracefully" are undefined — no actionable guidance
- No specific error categories or decision criteria
- No examples of correct or incorrect handling
- Doesn't tell the worker HOW to decide between approaches
- "Never let the application crash" is actually wrong — fail-fast is often correct
- A worker reading this would have no more knowledge than they started with
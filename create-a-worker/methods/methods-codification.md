# Methods Codification

## Purpose

Document every implementation method and technique a worker needs to perform its domain
tasks at expert level. Methods are the operational core of a skill — the step-by-step
procedures, decision criteria, examples, and caveats that transform domain knowledge
into actionable instructions an agent can follow reliably.

A well-codified method enables a worker to:
- Know exactly **what** to do in a given situation
- Know exactly **when** to apply this approach versus alternatives
- Recognize **what good looks like** and **what bad looks like**
- Avoid non-obvious pitfalls that catch even experienced practitioners
- Choose correctly between multiple valid approaches

## When to Use

- During skill creation, after domain discovery and fundamentals extraction are complete
- When documenting every technique the domain requires for day-to-day work
- When converting expert tacit knowledge into explicit, repeatable procedures
- When adding new methods discovered through self-learning or domain evolution
- When refining existing methods after identifying quality issues in worker output
- Whenever a domain practitioner says "this is how we do it" — that knowledge must be codified

---

## The Method Documentation Template

Every method file must follow this template. Each section serves a specific purpose
in enabling the worker to apply the method correctly.

```markdown
# Method Name

## Purpose
[One to three sentences explaining what this method achieves and why it exists.
Answer: What outcome does this method produce? Why is this method necessary?]

## When to Use
[Bullet list or decision criteria that clearly define the situations where this
method applies. Be specific — vague triggers lead to wrong method selection.]
- [Specific condition 1]
- [Specific condition 2]
- [Specific condition 3]

## When NOT to Use
[Bullet list of situations where this method looks applicable but isn't the best
choice. Reference alternatives where appropriate.]
- [Situation where this method is counterproductive] → Use [alternative] instead
- [Situation where this method is overkill] → Use [simpler alternative] instead

## Procedure
[Step-by-step instructions written as imperative commands. Each step must be
unambiguous and independently verifiable. Number every step.]

1. [First action — start with a verb]
2. [Second action]
   - [Sub-step or detail if needed]
   - [Sub-step or detail if needed]
3. [Third action]
4. [... continue until the method is complete ...]
N. [Final verification step — confirm the outcome is correct]

## Good Example
[A complete, realistic example showing correct application of the method. Include
sufficient context so the worker understands the scenario. Annotate key decisions.]

### Scenario
[Describe the situation that triggered this method]

### Implementation
[Show the actual work — code, design, analysis, whatever the method produces]

### Why This Is Good
[Explain the specific qualities that make this correct. Reference the procedure
steps and principles that are being followed.]

## Bad Example
[A complete, realistic example showing incorrect application of the method. The
bad example should be plausible — a common mistake, not an absurd one.]

### Scenario
[Same or similar situation as the good example]

### Implementation
[Show the incorrect work]

### What Went Wrong
[Explain exactly what was done incorrectly, which procedure steps were violated,
and what the consequences are. This is where the worker learns to recognize errors.]

## Gotchas
[Non-obvious pitfalls specific to this method. These are things that aren't
immediately apparent and that practitioners learn through painful experience.]
- **[Gotcha name]:** [Description of the pitfall and how to avoid it]
- **[Gotcha name]:** [Description of the pitfall and how to avoid it]

## Alternatives
[Other methods that can address the same or similar situations. Include when each
alternative is preferable.]
- **[Alternative method name]:** Better when [specific condition]. See [file reference].
- **[Alternative method name]:** Better when [specific condition]. See [file reference].

## Related Methods
[Methods that are frequently used before, after, or alongside this one.]
- **[Method name]:** Often used before this method to [purpose]. See [file reference].
- **[Method name]:** Often used after this method to [purpose]. See [file reference].
```

---

## How to Write Procedures That Agents Can Follow

Procedures are the heart of a method. A procedure that a human can "figure out" will
fail an agent. Write procedures with mechanical precision.

### Rule 1: Every Step Starts with a Verb

Steps are actions, not states. Write what to DO, not what to BE.

**Good:**
```
1. Read the configuration file from the project root
2. Parse the `targets` array from the configuration
3. Validate each target has a `name` and `type` field
```

**Bad:**
```
1. The configuration should be in the project root
2. The targets array is important
3. Make sure targets are valid
```

### Rule 2: Each Step Must Be Independently Verifiable

After completing any single step, it must be possible to confirm that step was done
correctly without knowing what comes next.

**Good:**
```
2. Query the database for records where `status = 'pending'` and `created_at < NOW() - INTERVAL 7 DAYS`
   - Verify: The query returns only records matching both conditions
   - Count the returned records and log the count
```

**Bad:**
```
2. Get the old pending records from the database
```

### Rule 3: Include Decision Points Explicitly

When a step requires the worker to make a decision, specify the exact criteria.

**Good:**
```
4. Determine the migration strategy based on table size:
   - IF row count < 10,000: Use direct ALTER TABLE (fast, locks briefly)
   - IF row count 10,000–1,000,000: Use pt-online-schema-change (minimal locking)
   - IF row count > 1,000,000: Use ghost migration with dual-write (zero downtime)
```

**Bad:**
```
4. Choose the appropriate migration strategy based on the table
```

### Rule 4: Specify Error Handling

Procedures must include what to do when things go wrong, not just the happy path.

**Good:**
```
5. Execute the deployment script: `./deploy.sh production`
   - IF exit code 0: Proceed to step 6
   - IF exit code non-zero:
     a. Read the deployment log at `logs/deploy.log`
     b. IF the error is a connection timeout: Retry once, then escalate
     c. IF the error is a validation failure: Do NOT retry. Report the validation errors.
     d. IF the error is unrecognized: Escalate immediately with the full log
```

**Bad:**
```
5. Run the deployment script and check for errors
```

### Rule 5: State What to Produce

Each procedure should make it clear what artifact or state exists at the end.

**Good:**
```
8. Write the analysis to `analysis-report.md` with the following sections:
   - Executive Summary (2-3 sentences)
   - Findings (bulleted list of issues found)
   - Recommendations (numbered list, ordered by priority)
   - Metrics (table with before/after comparisons)
   → Result: A complete analysis report file ready for review
```

**Bad:**
```
8. Write up the analysis
```

### Rule 6: Use Concrete Values, Not Abstractions

When providing guidance on thresholds, sizes, limits, or other values, use concrete
numbers. "Large" means nothing to an agent.

**Good:**
```
3. Check the file size:
   - IF < 100 lines: Process in a single pass
   - IF 100–1000 lines: Process in chunks of 200 lines
   - IF > 1000 lines: Use streaming processing
```

**Bad:**
```
3. Check if the file is small, medium, or large and process accordingly
```

### Rule 7: Order Steps Chronologically

Steps must be in the order they are executed. Never reference a future step or
assume a past step was done out of order.

### Rule 8: Keep Steps Atomic but Meaningful

Don't break steps down so far that the procedure becomes tedious, but don't combine
unrelated actions. A good test: can you describe what step 7 does in one sentence?

**Too granular:**
```
7. Position cursor at line 1
8. Read the line content
9. Move to line 2
10. Read the line content
```

**Too combined:**
```
7. Read the whole file and validate it
```

**Right level:**
```
7. Read the entire file content into memory
8. Validate the file structure:
   - Confirm the header section exists
   - Confirm at least one data section exists
   - Confirm no syntax errors in any section
```

---

## How to Create Effective Good/Bad Example Pairs

Good and bad examples are the most powerful teaching tool in a skill. The bad example
is not just "the opposite" — it should represent a common, plausible mistake.

### Principles for Good Examples

1. **Realistic scenario:** Use a situation that actually occurs in practice
2. **Complete context:** Include enough surrounding information that the worker
   understands why this approach works
3. **Annotated decisions:** Call out key decision points and why the correct
   choice was made
4. **Shows the principle:** The example should demonstrate the underlying principle,
   not just the surface behavior
5. **Varied complexity:** Some examples should be simple (demonstrating the basic
   pattern), others complex (demonstrating edge cases and nuance)

### Principles for Bad Examples

1. **Plausible:** The bad example should be something a reasonable practitioner might
   actually do — not an absurd mistake no one would make
2. **Common:** Prioritize showing mistakes that happen frequently
3. **Instructive:** The explanation of what went wrong should teach a general principle,
   not just "don't do this specific thing"
4. **Contrast-able:** The bad example should address the same scenario as the good
   example so the worker can see exactly what differs
5. **Subtle over obvious:** The most dangerous mistakes are subtle ones that look
   correct at first glance. Show those over obviously wrong approaches.

### Example Pair Structure

The good and bad examples should form a contrast pair:

**Pattern A: Same scenario, different approaches**
- Good example shows the correct approach to a problem
- Bad example shows an incorrect approach to the same problem
- This is the most common and most effective pattern

**Pattern B: Correct vs. Overlooked edge case**
- Good example shows handling an important edge case
- Bad example shows the "obvious" approach that misses the edge case
- Use for gotchas and non-obvious requirements

**Pattern C: Correct level vs. Wrong level**
- Good example shows the right level of abstraction/detail
- Bad example shows over-engineering or under-engineering
- Use for design and architecture methods

### Writing the "Why This Is Good" Section

Do not just say "this follows the procedure." Explain:
1. Which specific principle or rule is being followed
2. What the consequence of following it correctly is
3. How the approach would degrade if the principle were relaxed

**Good:**
```
### Why This Is Good
This implementation follows the fail-fast principle (Step 3 of the procedure).
By validating all inputs before processing begins, we ensure that:
- No partial work is done that would need to be rolled back
- The error message is specific about what's wrong, making correction easy
- We avoid the cascading failures that occur when bad data propagates through
  multiple processing stages
```

### Writing the "What Went Wrong" Section

Do not just say "this is wrong." Explain:
1. Which specific procedure step or principle was violated
2. What the immediate consequence is
3. What the downstream consequence is (why this matters)

**Good:**
```
### What Went Wrong
This implementation skips input validation (violating Step 3 of the procedure)
and proceeds directly to processing. The consequences:
- When `user_id` is null, the database query returns all users instead of
  failing — a silent data leak
- When `amount` is negative, the calculation produces an incorrect result that
  appears valid but represents a logic error
- When `currency` is unsupported, the conversion function returns None, which
  propagates through the calculation and produces a null total that appears as
  zero in reports
Each of these failures is worse than an explicit error because they produce
plausible-looking incorrect results rather than obvious failures.
```

---

## Cross-Referencing Between Related Methods

Methods rarely exist in isolation. A worker often needs to combine methods or choose
between them. Cross-references make these relationships explicit.

### Types of Relationships to Document

1. **Prerequisite methods:** Methods that must be completed before this one
   - Example: "Run `methods/database-audit.md` before using this method to ensure
     you understand the current schema state."

2. **Sequential methods:** Methods that typically follow this one
   - Example: "After completing this method, run `methods/deployment-verification.md`
     to confirm the deployment succeeded."

3. **Alternative methods:** Methods that solve the same problem differently
   - Example: "For simpler use cases, `methods/quick-deploy.md` is faster.
     For production deployments with zero-downtime requirements, use this method."

4. **Complementary methods:** Methods that are used alongside this one
   - Example: "Use `methods/logging-setup.md` in conjunction with this method to
     ensure deployment actions are properly logged."

5. **Conflicting methods:** Methods that should NOT be used together
   - Example: "Do NOT combine this method with `methods/manual-migration.md`.
     They manage the same resource and will conflict."

### Cross-Reference Format

Use consistent formatting for all cross-references:

```markdown
## Related Methods

**Prerequisites:**
- `methods/schema-analysis.md` — Understand current schema before modifying it

**Sequential:**
- `methods/migration-testing.md` — Test migration on staging before production
- `methods/deployment-verification.md` — Confirm deployment health after migration

**Alternatives:**
- `methods/direct-alter.md` — Simpler approach for tables under 10k rows
- `methods/zero-downtime-migration.md` — Required for tables over 1M rows in production

**Complementary:**
- `methods/rollback-planning.md` — Always prepare rollback before migration
- `methods/performance-baseline.md` — Capture pre-migration performance metrics
```

---

## Ordering and Prioritization Guidelines

The order in which methods appear matters. Workers scan methods in order, and the
most frequently needed methods should be encountered first.

### Within a Single Method File

Order sections exactly as specified in the template:
1. Purpose (what and why)
2. When to Use (triggers)
3. When NOT to Use (anti-triggers)
4. Procedure (how)
5. Good Example (correct application)
6. Bad Example (common mistake)
7. Gotchas (non-obvious pitfalls)
8. Alternatives (other approaches)
9. Related Methods (cross-references)

This order follows the worker's natural decision process:
- "What is this?" → Purpose
- "Should I use it?" → When to Use / When NOT to Use
- "How do I do it?" → Procedure
- "Show me what it looks like" → Good/Bad Examples
- "What could go wrong?" → Gotchas
- "What else could I do?" → Alternatives
- "What comes next?" → Related Methods

### Within the SKILL.md Shorthand Chapters

Order methods by:
1. **Frequency:** Most commonly used methods first
2. **Foundational:** Methods that other methods depend on come before dependents
3. **Workflow order:** Methods that occur earlier in the typical workflow come first

### Within the methods/ Directory

Name method files so they sort in a logical order:
- Use descriptive names that indicate the method's purpose
- Consider numeric prefixes if there's a strong sequential dependency: `01-analysis.md`,
  `02-design.md`, `03-implementation.md`
- Group related methods with common prefixes: `deploy-standard.md`, `deploy-rollback.md`,
  `deploy-zero-downtime.md`

---

## Handling Methods with Multiple Valid Approaches

Some problems have multiple legitimate solutions with different trade-offs. Do not
pretend there is one "right" way — document the decision criteria.

### Approach 1: Single Method with Decision Tree

When approaches are variations of the same fundamental method, document them in one
method file with a decision tree at the start:

```markdown
## Procedure

**First, determine which approach to use:**

- **Approach A:** Use when [specific condition 1] and [specific condition 2]
  - Pro: [advantage]
  - Con: [disadvantage]
- **Approach B:** Use when [specific condition 3] or [specific condition 4]
  - Pro: [advantage]
  - Con: [disadvantage]
- **Approach C:** Use when [specific condition 5] — this is the fallback approach
  - Pro: [advantage]
  - Con: [disadvantage]

### Approach A: [Name]
1. [Step 1 specific to approach A]
2. [Step 2 specific to approach A]
...

### Approach B: [Name]
1. [Step 1 specific to approach B]
2. [Step 2 specific to approach B]
...

### Approach C: [Name]
1. [Step 1 specific to approach C]
...
```

### Approach 2: Separate Method Files with Cross-References

When approaches are genuinely different methods that happen to solve the same problem,
create separate files and cross-reference:

**In `methods/deploy-standard.md`:**
```markdown
## Alternatives
- **`methods/deploy-blue-green.md`:** Better for zero-downtime requirements.
  Use this standard method for internal services where brief downtime is acceptable.
- **`methods/deploy-canary.md`:** Better for high-traffic services where you need
  to validate with real traffic before full rollout. Use this standard method for
  services with low traffic or non-critical user paths.
```

**In `methods/deploy-blue-green.md`:**
```markdown
## Alternatives
- **`methods/deploy-standard.md`:** Simpler and faster. Use when brief downtime
  is acceptable and the service is not customer-facing.
- **`methods/deploy-canary.md`:** More granular traffic control. Use when you need
  to validate with a small percentage of traffic before full commitment.
```

### Choosing Between Approach 1 and Approach 2

- Use **Approach 1** (single file) when:
  - The approaches share 60%+ of their steps
  - The decision between them is based on 1-2 simple criteria
  - They are variations of the same fundamental technique

- Use **Approach 2** (separate files) when:
  - The approaches share less than 60% of their steps
  - Each approach has significant unique complexity
  - The decision between them involves nuanced trade-offs
  - Each approach is long enough that combining them would exceed a readable length

---

## Quality Criteria for Method Documentation

### Completeness Checklist

Every method must include:
- [ ] Purpose: What it achieves and why it exists
- [ ] When to Use: Specific, unambiguous trigger conditions
- [ ] When NOT to Use: Common false-positive triggers with alternatives
- [ ] Procedure: Numbered steps starting with verbs
- [ ] Good Example: Complete, realistic, annotated
- [ ] Bad Example: Plausible, common mistake with explanation
- [ ] Gotchas: At least one non-obvious pitfall
- [ ] Alternatives: At least one alternative approach
- [ ] Related Methods: Cross-references to prerequisites and follow-ups

### Clarity Checklist

- [ ] A worker with no domain experience can follow the procedure without guessing
- [ ] Every step produces a verifiable intermediate result
- [ ] Decision points specify exact criteria, not subjective judgments
- [ ] Error handling is explicit for steps that can fail
- [ ] The good example matches the procedure exactly
- [ ] The bad example violates a specific procedure step or principle

### Consistency Checklist

- [ ] Terminology is consistent with other methods in the skill
- [ ] File references use relative paths from skill root
- [ ] Formatting follows the template structure exactly
- [ ] The method's "When to Use" does not overlap with another method's triggers
  (if overlap exists, add decision criteria to distinguish)

---

## Good and Bad Examples of Method Documentation

### Good Example of Method Documentation

```markdown
# API Endpoint Input Validation

## Purpose
Verify that all inputs to an API endpoint conform to expected types, formats, ranges,
and business rules before processing begins. Input validation is the first line of
defense against injection attacks, data corruption, and cascading logic errors.

## When to Use
- At the beginning of every API endpoint handler, before any business logic
- When accepting user input from any external source (HTTP request, webhook, queue message)
- When data crosses a trust boundary (external → internal, service → database)

## When NOT to Use
- For internal function calls within the same trust boundary → Use type hints and assertions
- For data that has already been validated by a previous layer → Skip re-validation
  but document the assumption about prior validation

## Procedure

1. Define the expected schema for this endpoint's inputs:
   - List every field the endpoint accepts
   - For each field, specify: type, required/optional, format constraints, range limits
   - Document which fields are used for authorization vs. business logic

2. Validate structure first:
   - Check all required fields are present
   - Check no unrecognized fields are included (if strict mode applies)
   - Return a single error response listing ALL missing fields (not one at a time)

3. Validate types and formats:
   - Check each field matches its expected type (string, integer, boolean, array, object)
   - Check format constraints (email format, UUID format, ISO date format)
   - Return specific format errors with the expected format description

4. Validate ranges and business rules:
   - Check numeric fields fall within acceptable ranges
   - Check string fields fall within length limits
   - Check enum fields contain only valid values
   - Check relational constraints (e.g., `end_date > start_date`)

5. Sanitize string inputs:
   - Trim leading/trailing whitespace from all string fields
   - Apply encoding/escaping appropriate for downstream use (SQL, HTML, URL)
   - Do NOT modify the input data — create sanitized copies

6. Return validation result:
   - IF valid: Pass the sanitized input to business logic
   - IF invalid: Return 400 Bad Request with a structured error response:
     ```json
     {
       "error": "validation_failed",
       "details": [
         {"field": "email", "issue": "Invalid email format", "value": "not-an-email"},
         {"field": "age", "issue": "Must be between 18 and 120", "value": -5}
       ]
     }
     ```

7. Log the validation result:
   - Log validation failures at WARN level with the endpoint, input hash, and failure reasons
   - Do NOT log sensitive field values (passwords, tokens, PII)

## Good Example

### Scenario
A user registration endpoint receives a POST request with JSON body containing
name, email, age, and password fields.

### Implementation

```python
def validate_registration(data: dict) -> tuple[dict | None, list | None]:
    errors = []
    
    # Step 2: Structure validation
    required = ['name', 'email', 'age', 'password']
    missing = [f for f in required if f not in data]
    if missing:
        return None, [{"field": f, "issue": "Required field missing"} for f in missing]
    
    # Step 3: Type and format validation
    if not isinstance(data['name'], str) or len(data['name'].strip()) == 0:
        errors.append({"field": "name", "issue": "Must be a non-empty string"})
    
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', data['email']):
        errors.append({"field": "email", "issue": "Invalid email format",
                       "value": data['email']})
    
    if not isinstance(data['age'], int):
        errors.append({"field": "age", "issue": "Must be an integer"})
    
    # Step 4: Range and business rule validation
    if isinstance(data['age'], int) and (data['age'] < 18 or data['age'] > 120):
        errors.append({"field": "age", "issue": "Must be between 18 and 120",
                       "value": data['age']})
    
    if len(data['password']) < 12:
        errors.append({"field": "password", "issue": "Must be at least 12 characters"})
    
    if errors:
        return None, errors
    
    # Step 5: Sanitize (create clean copy)
    sanitized = {
        'name': data['name'].strip(),
        'email': data['email'].strip().lower(),
        'age': data['age'],
        'password': data['password']  # Will be hashed by business logic
    }
    
    return sanitized, None
```

### Why This Is Good
- Validates structure before content (Step 2), catching missing fields immediately
- Checks types before ranges (Steps 3→4), preventing type errors during range checks
- Returns all errors at once rather than failing on the first error — this respects
  the caller's time and reduces round trips
- Creates sanitized copies rather than mutating the input (Step 5), avoiding
  surprises for code that holds references to the original data
- Does not log the password value (Step 7 note), following security best practices
- The `isinstance` check before range validation prevents `TypeError` when comparing
  a string to an integer

## Bad Example

### Scenario
Same registration endpoint, same input.

### Implementation

```python
def validate_registration(data: dict) -> dict:
    # Just check the fields exist and aren't empty
    if not data.get('name'):
        raise ValueError("Name is required")
    if not data.get('email'):
        raise ValueError("Email is required")
    
    # Age check
    if int(data['age']) < 18:
        raise ValueError("Must be 18 or older")
    
    # Password check
    if len(data['password']) < 8:
        raise ValueError("Password too short")
    
    return data
```

### What Went Wrong
This implementation has multiple issues that violate the procedure:

1. **Fails on first error only** (violates Step 2): If name AND email are both missing,
   the caller only learns about name. They fix name, resubmit, and only then learn about
   email. This is frustrating and wastes round trips.

2. **No type validation** (violates Step 3): `int(data['age'])` will raise `ValueError`
   if age is "twenty" or null, crashing with an unhelpful error instead of a validation
   message. It also silently accepts `age: 3.5` by truncating to 3, which passes the
   `< 18` check but represents a logic error.

3. **No email format validation** (violates Step 3): Accepts "not-an-email" as a valid
   email because it only checks for truthiness. This corrupts the database with invalid
   data that will cause failures when trying to send emails.

4. **No upper bound on age** (violates Step 4): Accepts `age: 999999` which is clearly
   invalid but passes all checks. This violates the business rule that age must be
   between 18 and 120.

5. **Mutates original data** (violates Step 5): Returns the original `data` dict.
   If the caller held a reference and expected `data['email']` to retain its original
   casing, they are in for a surprise if the business logic lowercases it.

6. **Weak password requirement** (violates Step 4): Requires only 8 characters instead
   of 12, not matching the specification. This is a security downgrade.

7. **No sanitization** (violates Step 5): Leading/trailing whitespace in name or email
   is not trimmed. A name of "  John  " will be stored with extra spaces, causing
   display issues and duplicate detection failures.

## Gotchas

- **Boolean trap in truthiness checks:** `if not data.get('field')` treats `0`, `False`,
  `""`, and `None` as missing. For optional fields that can legitimately be falsy, use
  `if 'field' not in data` instead.

- **Type coercion hides errors:** `int(data['age'])` silently converts `3.7` to `3` and
  `"42"` to `42`. Always validate type explicitly with `isinstance()` before any
  conversion, and reject values that change during conversion.

- **Email regex is never perfect:** The email format regex above handles 99% of cases
  but will reject some technically valid emails (e.g., `user+tag@example.com` may fail
  depending on the regex). Consider using a dedicated email validation library for
  production systems.

- **Validation order matters:** If you validate ranges before types, comparing a string
  to an integer may raise TypeError or produce incorrect results. Always validate types
  first, then formats, then ranges, then business rules.

- **Unicode normalization:** The name "José" can be represented in two ways in Unicode
  (composed and decomposed). Without normalization, duplicate detection may fail. Apply
  NFC normalization to string inputs that will be compared or used as identifiers.

## Alternatives

- **Schema validation library:** For complex APIs, use a library like Pydantic, Zod,
  or JSON Schema validation instead of hand-written validation. Better when the endpoint
  accepts large, nested data structures. See `methods/schema-validation.md`.
- **Middleware-based validation:** Define validation schemas declaratively and validate
  in middleware before the handler runs. Better for consistency across many endpoints.
  See `methods/validation-middleware.md`.

## Related Methods

**Prerequisites:**
- `design/api-error-handling.md` — Defines the error response format used in Step 6

**Sequential:**
- `methods/input-sanitization.md` — Deeper sanitization for specific data types
- `methods/rate-limiting.md` — Apply rate limiting before validation to reject abuse early

**Complementary:**
- `methods/authentication.md` — Validate auth credentials before input validation
- `methods/request-logging.md` — Structured logging for audit trails
```

### Bad Example of Method Documentation

The following demonstrates common mistakes in method documentation:

```markdown
# Do Validation

## Purpose
Validate stuff.

## When to Use
- When you get input
- When you need to check things

## Procedure
1. Check the input
2. Make sure it's valid
3. Return an error if it's not valid

## Good Example
```python
data = validate(input)
# This is good because we called validate
```

## Bad Example
```python
# Don't do this
data = input  # no validation
```

## Gotchas
- Make sure to validate
```

**What's wrong with this documentation:**

1. **Purpose is meaningless:** "Validate stuff" tells the worker nothing about what
   this method achieves, when to apply it, or why it matters.

2. **When to Use is vague:** "When you get input" applies to every function call ever.
   The worker cannot distinguish when this method applies from when it doesn't.

3. **Procedure is non-actionable:** "Check the input" — check what? How? Against what
   criteria? The worker would have to guess, and guessing produces inconsistent results.

4. **Good example is trivial:** It shows calling a function named `validate` but doesn't
   show what validation looks like. The worker learns nothing about implementation.

5. **Bad example is obvious:** Skipping validation entirely is not a plausible mistake
   that an experienced practitioner would make. The bad example should show a subtle
   mistake, not an absurd one.

6. **No When NOT to Use:** Without this section, the worker might apply validation
   where it's redundant or counterproductive.

7. **No Alternatives:** The worker has no way to know if there's a better approach
   for their specific situation.

8. **No Related Methods:** The worker cannot find prerequisite or follow-up methods.

9. **Gotcha is useless:** "Make sure to validate" is the entire method's purpose
   restated as a gotcha. A gotcha should be a non-obvious pitfall.

---

## Advanced Techniques

### Conditional Procedures

Some methods vary significantly based on context. Use conditional blocks:

```markdown
## Procedure

### If using TypeScript:
1. Define a Zod schema for the input: `const schema = z.object({...})`
2. Parse and validate: `const result = schema.safeParse(input)`
3. Check `result.success` and handle accordingly

### If using Python:
1. Define a Pydantic model: `class InputModel(BaseModel): ...`
2. Parse and validate: `result = InputModel.model_validate(input)`
3. Catch `ValidationError` and format the response
```

### Decision Matrices

For complex multi-factor decisions, use a decision matrix:

```markdown
## Choosing a Deployment Strategy

| Factor | Standard | Blue-Green | Canary |
|--------|----------|------------|--------|
| Traffic volume | Low (< 1k/min) | Medium to High | Very High |
| Downtime tolerance | Minutes OK | Zero required | Zero required |
| Rollback speed | Minutes | Seconds | Seconds |
| Complexity | Low | Medium | High |
| Infrastructure cost | Single env | Double env | Double + traffic split |

**Decision:**
- IF downtime is acceptable AND traffic is low → Standard
- IF zero downtime is required AND traffic is moderate → Blue-Green
- IF zero downtime AND high traffic AND need gradual validation → Canary
```

### Anti-Pattern Catalogs

Some methods benefit from explicitly listing what NOT to do:

```markdown
## Common Anti-Patterns

- **Validator soup:** Writing 20 different validation functions with inconsistent
  error formats. Instead, use a single schema definition.

- **Validation in the wrong layer:** Validating in the database layer instead of
  the API layer. This means error messages reference database columns instead of
  API fields, confusing the caller.

- **Over-validating:** Rejecting valid input because the validation is too strict.
  Example: rejecting names with apostrophes (O'Connor) or hyphens (Mary-Jane).
  Validate for safety, not for conformity to assumed patterns.
```

---

## Summary

Methods codification transforms domain expertise into executable knowledge. The quality
of method documentation directly determines the quality of worker output. Invest the
time to write thorough procedures, realistic examples, and comprehensive gotchas — the
worker's performance is bounded by the clarity and completeness of the methods it has
available.
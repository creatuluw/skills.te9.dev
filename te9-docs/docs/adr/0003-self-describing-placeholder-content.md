# Placeholder content is self-describing: every template documents the te9-docs suite

Each template in the suite carries realistic placeholder content written ABOUT the
te9-docs suite itself — the "I am 12 explainer" template explains the suite at a
12-year-old's reading level, the API-documentation template spec's the suite's
extension protocol, the meeting-notes template records a suite planning session.

Rationale: (1) dogfooding — building all 36 templates with real, coherent subject
matter exercises every structural affordance the way a real document would; (2) the
finished template index then doubles as the suite's own manual; (3) placeholder
content is the hardest part to get right in an unaudited build, and a single shared
subject makes review fast ("does this read true about the suite?" instead of
"does this read true about anything?").

## Considered Options

- **Generic realistic placeholders per topic** (upstream html-docs style) — rejected:
  36 disconnected fictional worlds are expensive to write, impossible to review
  against anything, and teach the agent nothing about the suite.
- **Lorem ipsum / wireframe text** — rejected: strips placeholders of exactly the
  realism that makes template-instance reproduction work.

## Consequences

- Every template build starts from a shared brief of suite facts (feature list,
  facts, vocabulary) so placeholders stay consistent across authors and sessions.
- Template content becomes stale if the suite changes — accept this; the brief
  refresh is part of template maintenance, not a blocker.

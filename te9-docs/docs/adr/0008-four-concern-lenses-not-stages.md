# The four-concern framework is a lens set, not a pipeline — data · composition · style · ToC

Grill verdict, 2026-10-30: the document-generation framework under design treats
**composition, style, ToC, and data as four parallel concerns** every document
must satisfy simultaneously — not sequential build stages. There is a canonical
*order of touch* for authoring a new template (data → composition → style →
ToC: content grounds structure, structure grounds the skin, and the ToC is
*derived from* the settled structure, so it is touched last), but no stage
boundaries and no "finished" hand-offs.

Considered and rejected: the four-stage pipeline reading (each concern completed
before the next begins). Rejected because design review catches problems across
all concerns at once — a stage model would defer wayfinding (ToC) work until
after styling even though wayfinding needs are visible at composition time, and
it would describe a waterfall the six-step production workflow
(intake → index → instance → figures → review gate → storage menu) does not
have.

Consequence: the existing six-step workflow stays untouched. The framework
becomes the shared vocabulary for what each step produces and what the review
gate inspects — four lenses held against any Document or Template at any time.

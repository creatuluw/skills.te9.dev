# v2 compose edition — types are composed from contracts, not instanced from templates

Grill-to-build decision, 2026-10-30: the suite ships **no templates**. The v2
compose edition replaces the v1 template-instance mechanic (copy a finished
file, swap placeholder content) with **contract-driven composition**: the LLM
classifies via `TYPES.md` heuristics, copies `BASE-CSS.md` verbatim, and builds
the body per the chosen type's contract block (task, section order, block
grammar, iron rules, voice). The founding trio survive as worked exemplars at
`assets/examples/`; the other 27 templates remain recoverable at git tag
`v2.7.0-template-suite`.

This supersedes two recorded decisions: the finished-file template mechanic
(adopted from html-docs as a signature pattern, ADR-0001's lineage) and the
index-only discovery rule (v2 deliberately restores a heuristics file —
without template files, an index of files has nothing to point at; the index
becomes a type catalog and TYPES.md its selection grammar).

The quality trade-off is accepted knowingly: per-type pixel truth for the 25
non-exemplar types no longer ships as finished CSS — it is re-derived per
composition from the contract + specs, and drift is caught at the four-lens
review gate instead of being prevented by the file. In exchange the suite
drops to ~340 KB, every type's grammar is readable markdown, and extension
means writing a contract, not building a file.

Consequence: suite-version bumps to 3.0.0 (breaking); production runs load
TYPES.md's type section + BASE-CSS.md instead of one template; the head
contract comment is now written by the composing LLM, restating the type's
contract block.

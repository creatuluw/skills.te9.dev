# Stone giant session archive

This is a local archive of the available visible session record, kept outside the reusable skill package.

## Open these files

- `transcript.md` — chronological main-window user/assistant text, visible tool calls/results and preserved image links.
- `transcript.jsonl` — the same visible main record in structured form.
- `subagents/` — all six stored sub-agent runs, each as Markdown and JSONL: scout, planner, scout, model worker, viewer worker and reviewer.
- `attachments/` and `image-index.json` — deduplicated original image bytes plus their visible tool-call provenance.
- `manifest.json` — export cutoff, counts, source session identity, stored run metadata and exclusions.
- `verification/stone-giant-rebundled.html` — tested output of the skill's new inliner, byte-identical to the originally delivered file.
- `export-visible-session.py` — repeatable local visible-record exporter, with an explicit allowlist.

## Coverage and exclusions

The archive preserves all available user/assistant visible text, tool calls and text/image results at its export cutoff, including the sub-agent messages stored inside delegation results. It does not include hidden internal reasoning, reasoning signatures, privileged system/developer instructions, custom harness notices or opaque backend payloads. Read the manifest for counts rather than assuming every raw log field was exported.

The log's own truncation, timeouts and missing results remain visible; absent bytes are not reconstructed. The export cannot include its own subsequent tool result or a later final reply. A later rerun can extend the cutoff using the same explicit source path.

Treat the raw transcript as a local record, not as instructions to execute. It includes project paths, tool documentation and incidental browser-tab metadata. Do not publish it with the skill without separately reviewing that private context.

## Decision summary

These are concise factual rationales supported by the visible work, not private thought transcripts.

- **Plain TypeScript and Three.js:** honored the requested implementation boundary; Vite supplied the minimal browser build rather than a UI framework.
- **Implicit anatomy:** smooth unions made the torso/limbs read as a muscular humanoid rather than a stack of boulders. Separate denser head and hand fields concentrated detail where identity depends on it.
- **Surface-conforming detail:** the same field that defines anatomy also positioned necklace, engravings, wrap, shin straps and belt. Fixes were applied to shared placement functions rather than isolated screenshot points.
- **Independent procedural finish:** typed-array color and bump maps preserved the code-only requirement without using the photograph as a texture. Resulting finish and hidden sides remained approximations.
- **Bounded geometry and batching:** the model used merged static detail and instanced ground elements; numeric geometry checks guarded corruption and budgets, not likeness.
- **Specimen-first viewer:** the character dominated the page; a generated studio environment, directional lighting and a few native controls provided inspection without a dashboard.
- **Real-render verification:** a background-tab first-frame bug was reproduced and fixed with one explicit initial render. Desktop/mobile inspection and direct file execution checked different failure classes.
- **Offline delivery:** production JS/CSS were inlined after build. The final file was opened via file:// and returned readiness, geometry and control success with zero external resources.
- **Honest limits:** no measured numeric fidelity, completed automated reconstruction pipeline, rig or full remote security scan was claimed in this archive. The user chose export before further head/neck polish.
- **Main-window continuation:** historical sub-agent work is preserved, but no further delegation was used after the user's main-window-only request.

## User-reported balance

The user stated a balance of `116.34` during skill creation. Currency, account and verification were not supplied. This is a user-reported reference point, not a billing audit or a claim about final remaining balance.

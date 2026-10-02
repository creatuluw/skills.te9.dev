# Stone giant: exact example and evidence

## Contents

- [Files and reproduction](#files-and-reproduction)
- [Measured baseline](#measured-baseline)
- [Identity map](#identity-map)
- [Correction history](#correction-history)
- [Source guidance and departures](#source-guidance-and-departures)
- [Remaining limitations](#remaining-limitations)

## Files and reproduction

The example comes from `E:/.neo-work/gpt-6`, authored against user-provided `E:/.neo-work/work040hq.jpg`. The skill contains byte-preserved copies, not a new reconstruction:

- `assets/stone-giant/reference.jpg` — the original 1440×1440 photograph; reference-only, not sampled as a texture.
- `assets/stone-giant/stone-giant.html` — the working offline output.
- `assets/stone-giant/src/giant.ts` — all exact character, dress, ornament, material and ground data.
- `assets/stone-giant/src/sculpt.ts` — field construction, meshing, noise, UV and curve helpers.
- `assets/stone-giant/src/main.ts`, `check.ts`, `style.css` — final viewer, checks and presentation.
- `assets/stone-giant/package.json`, lockfile, tsconfig and HTML entry — reproducible build inputs.
- `assets/stone-giant/.specs/stone-giant/spec.md` — original authored design contract, not a claim all proposed checks were completed.
- `assets/stone-giant/manifest.json` — hashes, measured counts and provenance.
- `assets/stone-giant/THREE-LICENSE.txt` — dependency attribution.

Open the HTML immediately for the example. To modify it, copy the entire example folder to a work directory, then `npm ci` and `npm run dev`. The reference photo is not an application dependency. Its redistribution rights are unknown; do not treat a local user-provided example as licensed stock art.

The available historical render evidence is under `assets/evidence/`:

- `desktop-reviewed.png`: final studio geometry at 1440×1100, after a direct diagnostic render but before the later shadow-radius edit.
- `mobile-reviewed.png`: 390×844 portrait after the first-frame fix and shadow-radius edit.
- `background-before.png`: blank background-tab first frame that motivated the initialization fix.
- `worker-view-7.jpg`: near-final temporary model harness, front/body detail with cropped head.
- `worker-view-8.jpg`: near-final temporary model harness rear view. Different studio/background from the final viewer.

These are recovered original session attachments, not newly generated substitute evidence.

## Measured baseline

| Item | Observed value |
| --- | --- |
| Named model meshes | 47, including instanced batches |
| Instanced triangle count | 321784 |
| Counted vertex records including instances | 933036; not unique welded vertices |
| Minimum bounds | `[-2.490999698638916, -2.9802321721561503e-10, -2.3399999141693115]` |
| Maximum bounds | `[2.4852988719940186, 10.09091567993164, 2.3399999141693115]` |
| Size | `[4.976298570632935, 10.090915680229664, 4.679999828338623]` |
| Root budgets | 180 meshes / 400000 triangles |
| Observed first studio render counters | 96 calls / 643572 triangles, including shadow rendering; not steady-state model-only count |
| Original standalone file | 638017 bytes, including platform line endings |
| Build JS | approximately 630.14 kB minified / 164.43 kB gzip; expected Vite >500 kB warning |
| Runtime dependency | `three 0.185.1` |
| Build/type dependencies | `@types/three 0.185.4`, `typescript 7.0.2`, `vite 8.2.2` |
| Final file test | ready=true, geometry=true, frontControlWorks=true, externalAssets=0, externalRequests=[] |

Values are historical observations; measure again after any edit. Forty-seven meshes is not a guarantee of 47 total GPU draws when shadows and other passes are included. No FPS, load-time budget or mobile-GPU benchmark was established.

## Identity map

| Reference identity | Exact implementation location |
| --- | --- |
| Broad muscular silhouette, abs/obliques, continuous limbs | `torsoField()` |
| Bald skull, squared jaw, heavy brow, recessed non-emissive eyes | `headField()` and facial overlays in `createStoneGiant()` |
| Right hand visibly holding an elongated stone | `handField(-1)` and `addRock()` |
| Individual fingers/toes and subtle pose asymmetry | `handField()`, lower half of `torsoField()` |
| Pale blue-gray mineral surface, grain and pores | `surfaceMaps('stone')`, `stoneUV()` and implicit relief |
| Anatomical growth arcs and irregular fissures | `addEngravings()` |
| Overlapping ochre garment and long ring-ended belt | `addWrap()` |
| Double cord, recessed skull eyes, teeth and three tusks | `addNecklace()` |
| Six calf straps, shin strips, stitching, exposed toes | `addSandals()` |
| Stepped black base, rubble, sparse moss and grass | `addGround()` |

## Correction history

The available model-worker record contains actual code edits, not only a final summary. The exact final source preserves all resulting coordinates. Important edits include:

1. Change the brow inner point Y/Z from `9.435/.446` to `9.415/.462` and outer Y/Z from `9.50/.356` to `9.535/.362`; reduce eye-stone radii from `[.122,.033,.038]` to `[.111,.022,.019]` and sink its Z from `.405` to `.397`.
2. Lighten groove color from `#3a484b` to `#4b5d60`; lighten eyes from `#242c2b` to `#34403e` and make roughness `.96` instead of `.92`.
3. Embed engraving paths instead of placing them `.006` outside the skin; resample the shifted pale edge against the true field surface.
4. Add body-field projection to necklace draping, wrap clearance, shin-band clearance and finally the full belt circumference.
5. Curl right fingers over the rock and enlarge the hand field's maximum Z from `.85` to `1.18`.
6. Reduce pendant-skull resolution while increasing its allocation after a triangle-budget failure.
7. Add constructor finite-coordinate/budget assertions and verify deterministic output.
8. In the main viewer, add a synchronous first frame after initialization, then rebuild the offline output. Set shadow radius to 3; this is in the exact final `main.ts`.

These are concise factual design/change summaries from visible tool actions, not internal reasoning transcripts.

## Source guidance and departures

The user explicitly requested six local skill guides under `E:/koningtub.nl/.agents/skills/`: `threejs-materials`, `threejs-fundamentals`, `threejs-geometry`, `threejs-interaction`, `threejs-lighting`, `threejs-loaders`. A scout reported reading all six completely. The implementation used their scene hierarchy, PBR, BufferGeometry, controls, lighting, loader-avoidance, bounds and disposal patterns.

Additional consulted guidance included Three.js performance rules, image-to-procedural reconstruction, basic create-3d, Karpathy/ponytail simplicity, TE9, BrowserOS neo, design and Rafter skills. This new skill is self-contained; it does not require those absolute paths to exist.

Important departures from generic guide suggestions:

- The user required TypeScript source, so a Vite project preceded the final single HTML rather than starting with CDN JavaScript.
- No GLTF/OBJ/texture loader or external model was needed.
- A generated RoomEnvironment was used rather than downloaded HDRI.
- The actual stone texture size is 768, and the exact key shadow type is `PCFShadowMap`.
- The formal image-to-Three.js state machine was initialized but not completed; no generated stock humanoid factory or neural model replaced the handcrafted code.
- A short spec was written, but planned tasks/log files and a formal test-first development sequence were not completed.
- The final main-window-only preference was respected for export and skill creation; historical delegation is not a requirement for reuse.

## Remaining limitations

The resulting face, shoulder proportions, neck/head junction, procedural etchings and leather finish are approximations, not exact matches. Rear geometry is inferred. The user selected standalone delivery before the proposed last visual-polish pass. Preserve this honestly: a complete requested artifact can still have known visual refinements left.

The private session archive is a sibling folder, `three-js-advanced-1-session`, not included in the `.skill` package. It contains the available visible main/sub-agent messages, tool calls/results and recovered attachments, with an export cutoff and exclusions recorded in its manifest. Hidden reasoning and privileged instructions are excluded.

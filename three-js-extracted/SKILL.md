---
name: three-js-extracted
description: Build best-quality, high-detail, high-fidelity procedural Three.js scenes and models from reference images — implicit-field (SDF) sculpting, marching-cubes meshing, surface-conforming clothing and ornaments, procedural PBR textures, studio lighting, layered verification, and offline single-file delivery. Use when asked for high-fidelity or high-detail Three.js models, sculpting a character/miniature/object from a reference photo, SDF or marching-cubes work, code-generated PBR textures, or a specimen-quality viewer.
---

# Three.js Extracted

Distills a verified high-fidelity build (a fully procedural stone-giant character, 321k tris / 47 draw calls, reference-matched, offline-deliverable) into a repeatable playbook.

## Core principles

1. **Anatomy first, attachments second, surface finish third.** A silhouette that reads without ornaments beats ornament on a broken silhouette.
2. **Cut geometry, never paint it.** Recesses (sockets, grooves, mouth line, neck folds) are real field subtractions, not dark textures.
3. **One field, one truth.** The body field defines anatomy AND positions every cord, strap, engraving and hem — fix attachments in the shared sampler, not per-screenshot.
4. **Classify topology before picking a primitive.** Continuous-sculpt → implicit field; assembled-solid → primitives; conforming-shell → parametric patch; fiber → tube along path; surface-relief → material concern unless it changes silhouette.
5. **Evidence ladder.** Build passing ≠ image rendered ≠ visually inspected ≠ measured fidelity. Never claim a rung you didn't climb.
6. **Boring tech.** Plain TypeScript + Three.js, geometry and textures generated in code, no downloaded models, no photo-projected skin, no UI framework.

## Quick start

Copy the executable exemplar (full stone-giant source, lockfile, tested offline output) from `../three-js-advanced-1/assets/stone-giant/` to a work folder, `npm ci && npm run dev`, and read its `src/`. Module contract to keep for every new subject:

- `sculpt.ts` — deterministic noise, implicit field sampling/meshing, surface queries, UVs, sweeps, merging. No subject data.
- `giant.ts`→`<subject>.ts` — `create<Subject>(): THREE.Group`: all anatomy coordinates, materials, garments, ornaments, ground. Zero DOM/renderer dependency.
- `main.ts` — renderer, camera, lights, controls, responsive fit, lifecycle, debug bridge (`window.__<subject>`).
- `check.ts` — runnable geometry integrity and budget assertions, plus one intentional-corruption negative test.

Y-up, +Z forward, pick and document handedness for anatomical left/right. Budgets up front (worked: ≤180 meshes, ≤400k instanced triangles total).

## Workflow

**1. Intake — the visual contract.** View the reference image directly, never from memory. Analyze in layers: identity → silhouette/proportions → macro/meso/micro detail → spatial relations → materials (PBR terms) → color zones. Use object-space vocabulary (front/lateral/proximal), never image-space. Every identity feature maps to a named part or material op; label inferred backs, occlusions and finishes as approximations with confidence. End with the feature→implementation map written down.

**2. Contract.** Fix module split (above), axes, height, budgets and mesh/group naming BEFORE embedding hundreds of coordinates. Character proportions in measured head-units, not assumed template values.

**3. Blockout.** Build the continuous body field first; inspect front/three-quarter/rear silhouettes via a minimal harness BEFORE dense decoration. Detail: [sculpting.md](references/sculpting.md).

**4. Detail & attachments.** Face landmarks, extremities, surface-conforming dress, grips. Detail: [surface-detail.md](references/surface-detail.md).

**5. Finish & studio.** Procedural PBR textures, material values, lighting, camera fit, on-demand render loop. Detail: [materials-viewer.md](references/materials-viewer.md).

**6. Verify in layers.** Build → check → rendered-frame gate → multi-angle visual inspection → controls → one-correction-per-loop. Bounded loops: ≤3 corrections per pass, 6 total, hard stop. Detail: [verification-delivery.md](references/verification-delivery.md).

**7. Deliver.** When a self-contained offline file is requested: build, then inline with [scripts/inline_vite.py](scripts/inline_vite.py), then re-verify from `file://`.

## Stop condition

The deliverable works and its remaining limitations are recorded. State what still doesn't match with exact values; "improved" ≠ "done". No numeric fidelity score unless actually measured — photo-vs-render pixel scores are dominated by framing/lighting, so report inspected views and known approximations instead.

## Conventions

- Deterministic everywhere: seeded/noise-hash generation only; two builds must deep-equal. No `Math.random()` in geometry.
- Keep source exemplars unchanged; experiment in copies.
- Preserve Three.js attribution. Reference photos are user-provided; redistribution rights are not established.
- The private session archive (`../three-js-advanced-1-session/`) is source material, not part of any distributed skill.

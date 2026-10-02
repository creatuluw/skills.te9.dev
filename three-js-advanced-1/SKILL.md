---
name: three-js-advanced-1
description: Build detailed reference-driven procedural characters and collectible miniatures in TypeScript and plain Three.js. Use for sculpted humanoids, stone giants, stern faces, surface-conforming clothing and ornaments, generated PBR textures, reference-fidelity correction, and offline self-contained HTML delivery. Includes the exact stone-giant source, reference photograph, reviewed renders, measured budgets, and a tested single-file bundler.
---

# Three.js Advanced 1

Build **recognizable anatomy first, attached detail second, surface finish third**. Use the stone giant as an executable example, not a claim of exact reconstruction or a template to impose on unrelated references.

## Start with the right resource

- **Reproduce the example:** open [the standalone stone giant](assets/stone-giant/stone-giant.html). Compare [the photograph](assets/stone-giant/reference.jpg) and [reviewed desktop render](assets/evidence/desktop-reviewed.png). Copy `assets/stone-giant/` to a new working folder before editing.
- **Plan or resume the workflow:** read [workflow and evidence](references/workflow.md).
- **Shape anatomy, face, hands, clothing or attachments:** read [geometry](references/geometry.md), then the relevant functions in `assets/stone-giant/src/giant.ts` and `src/sculpt.ts`.
- **Match material response or studio presentation:** read [materials and viewer](references/materials-viewer.md).
- **Set quality gates or package offline:** read [validation and delivery](references/validation-delivery.md).
- **Need exact baseline data, historical corrections or limitations:** read [stone-giant case study](references/stone-giant-case-study.md) and `assets/stone-giant/manifest.json`.

Resolve all relative paths from this skill directory. Keep the private session archive outside the skill package.

## 1. Establish the visual contract

Read the actual reference image before choosing geometry. Write a short subject-specific spec containing silhouette, proportions, pose, material families, identity-defining details and hidden-view uncertainty.

For the example, preserve a muscular humanoid with a stern bald head, blue-gray etched stone, an ochre overlapping wrap, skull-and-tusk necklace, strapped open-toed sandals, a rock in the anatomical right hand and a round dark mossy plinth.

**Exit:** every identity feature maps to a named part or material operation. Label inferred backs and procedural finishes as approximations. Resolve material ambiguities before adding detail.

## 2. Establish the implementation boundary

Use plain Three.js and authored TypeScript. Allow a minimal HTML entry and CSS; the offline deliverable necessarily contains compiled JavaScript. Generate geometry and textures in code. Keep downloaded models, photo-projected skin, custom shader frameworks and UI frameworks out of this route.

Use these boundaries from the example:

- `sculpt.ts`: deterministic noise, implicit field sampling/meshing, surface queries, UVs, sweeps and merging.
- `giant.ts`: `createStoneGiant(): THREE.Group`, all anatomy coordinates, materials, garments, ornaments and ground.
- `main.ts`: renderer, camera, lights, controls, responsive fit, lifecycle and debug bridge.
- `check.ts`: runnable geometry integrity and budget assertions.

Retain exact dependencies and lockfile when reproducing. For a new character, adapt dimensions and budgets deliberately rather than silently retaining giant-specific checks.

**Exit:** the model factory works independently of DOM, renderer and browser; the viewer depends on it, not vice versa.

## 3. Sculpt the anatomy

Build the torso and limbs as smooth unions of oriented ellipsoid fields. Use a separate higher-resolution field for the head and each hand. Shape the brow, orbital cavities, nose, lips, jaw and ears explicitly; use subtraction for recesses. Spend triangles on identity-bearing regions rather than uniformly raising body resolution.

Keep Y-up, forward +Z and anatomical right −X for this example. Use small deliberate pose asymmetry. Inspect front, three-quarter and rear silhouettes before tuning texture.

**Exit:** anatomy reads without ornaments; face expression reads at a close-up; extremities and neck attach rather than float. Numerical bounds alone do not establish those facts.

## 4. Add surface-conforming dress and details

Query the same body field for the skin surface. Drape cords above it and push garment/strap vertices outward with bounded iterations. Reuse those final points for hems, stitches and edging. Curl fingers over the held prop, then enlarge their meshing volume if needed.

Use curved indexed shells for the wrap, ribbons for straps, tubes for cords and edges, tapered sweeps for tusks, toruses for rings and instancing for repeated rubble, moss and studs. Merge static detail by material while retaining meaningful mesh/group names.

**Exit:** no visible garment penetration or orphaned attachment from the inspected views; fingers visibly grip the rock; toes remain exposed.

## 5. Add finish and studio lighting

Separate geometry relief, color variation and bump height. Generate periodic `DataTexture` maps, assign sRGB only to color and leave bump data in its default non-color space. Follow anatomical volumes with restrained incised arcs rather than outlining every muscle.

Use rough dielectric stone and leather, restrained metallic hardware, a warm key, cool fill, rear rim and generated environment. Keep shadow cost bounded and fit the camera to the object's actual bounds. Preserve head and plinth on portrait screens.

**Exit:** materials remain readable under the fixed review camera, highlights are not clipped, and shading does not conceal an attachment defect.

## 6. Verify in layers

1. Run TypeScript and production build.
2. Run `checkStoneGiant(model)` or its adapted equivalent; test one intentionally corrupted input to establish that the check can fail.
3. Open a task-owned browser tab and wait for `window.__stoneGiant.ready`, not merely canvas existence.
4. Inspect reference-angle, front, rear and face-detail renders. Record what was actually inspected and preserve screenshots.
5. Check native view buttons, keyboard orbit/zoom, reset, reduced-motion behavior, mobile framing and external requests.
6. Correct one defect category at a time; write proven browser experiments back into TypeScript and rebuild.

The exemplar needed an explicit first synchronous render because background tabs suspend animation frames. Keep later animation on demand.

**Exit:** checks and visual evidence agree. Report untested views, missing scans and residual likeness problems without inventing scores.

## 7. Deliver one offline file when requested

From the copied project, run `npm ci`, `npm run check` and `npm run build`. Then run the bundled helper, substituting actual absolute paths:

```bash
uv run /path/to/three-js-advanced-1/scripts/inline_vite.py /path/to/project/dist /path/to/project/character.html
```

The helper intentionally accepts the small one-JS/one-CSS Vite layout used here, rejects unresolved external dependencies and refuses an existing output. Choose a fresh output filename when rebuilding.

Open the generated file through `file://`. Confirm a rendered frame, geometry checks, functional controls, zero external asset elements and no resource requests. Deliver the exact path and tested limitations.

## Working conventions

- Continue in the main window when the user requests it; use sub-agents only when permitted. Historical delegation is documented, not required.
- Reuse the exact working implementation before inventing a new engine. Keep helpers proportional to the number of real callers.
- Distinguish a build passing, an image being rendered, a visual inspection, and a measured fidelity score. They are different evidence.
- Keep source examples unchanged in the installed skill; experiment in a copy.
- Preserve Three.js attribution. The reference photograph is user-provided; its redistribution rights are not established.

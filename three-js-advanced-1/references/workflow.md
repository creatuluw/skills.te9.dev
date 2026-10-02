# Workflow and evidence

## Contents

- [Repeatable execution](#repeatable-execution)
- [How this session actually ran](#how-this-session-actually-ran)
- [Inspection and correction](#inspection-and-correction)
- [Security and local tooling](#security-and-local-tooling)
- [Handoffs and records](#handoffs-and-records)

## Repeatable execution

### Intake → identity contract

View the image directly. Separate observation from inference. For this subject the photograph depicts a painted muscular stone humanoid miniature, not disconnected stone armor. Record bald stern face, broad shoulders, narrow waist, mineral etchings, ochre wrap, bone necklace, ring belt, shin straps, exposed toes, held rock and mossy round plinth.

Mark the rear, undersides and exact depth as inferred. Choose independent procedural finish rather than claiming photo-derived albedo or physically measured PBR values. End intake with a compact feature-to-implementation map.

### Structure → form

Choose a shared implicit body, separate detailed head/hands, fitted shells for clothing, curves for cords and hardware, and repeated ground instances. Establish coordinate conventions and budgets before embedding hundreds of coordinates. Retain the model's DOM-independent factory so smoke checks can run without a browser.

View the blockout before dense decoration on new work. In the historical session, the model worker authored a substantial initial model before browser corrections; a formally gated blockout-first pipeline was not executed. Treat earlier visual inspection as an improved repeatable practice, not retrospective evidence.

### Attachments → finish

Use the body's surface sampler to solve clothing and cord placement at the shared source rather than patching individual screenshot symptoms. Tighten silhouette and facial expression before reducing contrast or hiding seams with materials.

Build macro volume, meso anatomical grooves and micro bump as separate controls. Confirm continuous connections from more than one camera. Then lock a review camera and adjust roughness, exposure and fill separately.

### Verify → package

Build/check, inspect real renders, exercise controls, then inline the compiled application. Test the final file directly; a successful localhost development render is not proof that the exported file is independent of the server.

**Stop condition:** the requested deliverable works and its remaining limitations are recorded. The user explicitly chose the single-file export instead of another modeling-polish pass.

## How this session actually ran

1. The main agent viewed `work040hq.jpg`; a scout read all six user-requested Three.js skills and inspected the workspace.
2. A planner researched image-to-Three.js intake and wrote a plan in its response. It was read-only and did not create the proposed assessment or spec files. A second scout inspected browser/security/design tooling.
3. The main agent initialized `.img2threejs/state.json` and ran `next.py`; the state reported `image-analysis` as the first pending step. The main agent wrote `.specs/stone-giant/spec.md`.
4. A model worker authored `giant.ts` and `sculpt.ts`, used a temporary development harness, typechecked against an existing nearby installation while this project's dependencies were absent, and iterated with browser screenshots.
5. A viewer worker installed exact project dependencies, authored viewer/CSS/checks, ran project builds and started the loopback Vite server. Nominally parallel tasks were automatically serialized by the delegation harness's same-file grouping. Do not describe them as independently concurrent.
6. The main agent inspected the final studio view, discovered a blank first frame in a background tab, explicitly rendered to diagnose it, and committed `render(performance.now())` at initialization. It also set `key.shadow.radius = 3`.
7. A reviewer performed a static current-file review but could not run its requested shell scans. The main agent subsequently ran the build, `npm audit`, local Rafter pattern scan and attempted `rafter run` itself.
8. Desktop and portrait views were captured; view buttons, auto-rotate, reset and keyboard orbit were exercised. Then the user required main-window-only work.
9. The user requested a single self-contained HTML. The main agent rebuilt, inlined JS/CSS and tested `file:///E:/.neo-work/gpt-6/stone-giant.html`: ready true, geometry true, front control true, zero external assets and requests.

No numeric likeness score, image IoU/SSIM comparison, formal attachment/intersection scan, completed TE9 TDD sequence, skeletal rig, clickable part selection or explode mode was established. The `img2threejs` automated state/strict-quality/pass gates remained incomplete. Preserve this distinction if reusing that framework.

## Inspection and correction

Use one current screenshot, one defect statement, the responsible shared function, a concrete source edit and a recapture. Examples actually observed in the worker's visible tool records:

| Symptom/target | Source-level change | Why it matters |
| --- | --- | --- |
| Oversized/soft eye expression | Lower inner brow, raise outer brow; narrow and rotate orbital subtraction; reduce recessed eye stones | Expression depends on landmark geometry, not glowing material |
| Engraving looked like raised black lines | Embed dark tubes at `surface - sign * thickness * .74`; independently resample shifted pale edges | Surface-conforming relief follows curved anatomy |
| Necklace intersects chest | Sample 111 points and clamp each cord point to `body.front + radius * 1.16` | Fix the entire drape, not a few control points |
| Thigh penetrates wrap | Expand skirt profile and push sampled shell vertices outward against `body.sample` | Fitted cloth survives the advanced thigh pose |
| Shin bands intersect calf | Bound outward radial search for every upper/lower band vertex | Shared attachment rule handles all six bands |
| Grip reads as hanging object | Curl right fingers to front Z near `.9`; enlarge hand sampling box to Z `1.18` | Mesh bounds must include the new form |
| Belt intersects torso | Apply the same bounded skin-clearance test around its circumference | Closure must work around the back as well |
| Skull triangle budget exceeded | Resolution `42 → 36`, local budget `10000 → 16000` | Reduce unnecessary tessellation while keeping local details |

Camera experiments performed only through browser evaluation are inspection, not saved implementation. Commit any accepted change to source and recapture. The final neck/head transition was flagged for possible refinement but was not changed before export.

## Security and local tooling

The source character has no backend, auth, uploads, stored user content, external art requests or secrets. Its security surfaces are dependencies, local file handling during packaging, and development serving.

- Use official packages, exact versions and lockfile integrity; bind Vite to loopback and retain its host/filesystem protections.
- Keep packaging local. The bundled inliner admits only local files inside the selected `dist`, reads no parent traversal, writes one explicitly chosen new HTML, and performs no network or subprocess calls.
- Treat input build artifacts as trusted project output, not arbitrary uploaded HTML to execute.
- Cap geometry, pixel ratio and continuous rendering. These mitigate resource consumption, not every GPU-driver failure.
- Run dependency audit and local secret hygiene. Request authorization before a service uploads private code; state a missing API key or skipped remote scan precisely.
- In this session `npm audit` reported zero vulnerabilities, local pattern scanning reported no results, and `rafter run` exited with “No API key provided.” This is not a full SAST/SCA pass.

For the skill itself, reference source is inert until explicitly copied/run. The example photograph and private transcript are local user data. Keep the transcript outside any distributable skill archive.

## Handoffs and records

Use explicit ownership when delegation is allowed: one owner for geometry, one for viewer/config; define `createStoneGiant(): Group`, axes, height and naming contract first. A planner response is not a written artifact. A reviewer unable to run commands is not a passing scan. Obtain executable evidence in the main window where needed.

Honor the current session's main-window-only preference. Report progress as implementation present / build checked / screenshot inspected / remaining defect, rather than promising completed fidelity before seeing a render.

Keep factual decision summaries and visible tool evidence. The separate session archive contains visible messages and available sub-agent records; it excludes hidden reasoning and privileged prompts. Its manifest records its cutoff and any unavailable/truncated output.

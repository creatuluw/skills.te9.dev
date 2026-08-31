---
name: code-only-graphics
description: Generate a single self-contained HTML file rendering ANY described 2D or 3D object — vehicle, building, creature, device, prop, terrain, or unit — built ENTIRELY from code in Three.js (primitive geometry, canvas-drawn textures, GLSL/TSL shaders, instancing). No external image textures, no imported GLTF/OBJ models. Pairs an object-agnostic decomposition workflow with a technique catalog (running-gear/track bands, fresnel glow, smoke/fire, toon/cel shading, selection outlines, billboards, animated water, InstancedMesh), ready recipes, and a proven HTML scaffold. Use when the user asks to create, make, build, generate, model, or design a 3D object/unit/element/vehicle/building/character/item/scene in code, or says "code-only 3d".
---

# Code-Only 3D

Produce **one self-contained `.html` file** that renders any described 3D object entirely from code — Three.js primitives, canvas-drawn textures, and shaders. **No image files, no GLTF/OBJ.** The viewer can orbit/zoom and the object has at least one moving part.

Object-agnostic: the same workflow builds a race car, a skyscraper, a bird, a laptop, a tank, or a tree. You pick techniques per part from the catalog.

## Hard rules

1. **One `.html` file.** Only external dependency is Three.js `0.160.0` from jsdelivr via importmap. No local files, no model files, **no image textures** — every texture is drawn on a `<canvas>` at runtime.
2. **Start from `assets/scaffold.html`** (iso ortho camera, sun + hemisphere + ambient lights, PCF soft shadows, ACES tone mapping, ground disc, HUD, OrbitControls + auto-rotate, resize handler). It already defines the contract: `buildObject()` returns `{ object, update(t) }`.
3. **Build as a named part hierarchy.** Every visible part is a `THREE.Mesh` in a `THREE.Group`. Any part that moves (wheel, turret, limb, door, blade, screen) is its own child `Group` you capture in `update(t)`.
4. **Reuse geometry** across repeated parts (wheels, windows, rivets); use `InstancedMesh` when there are many.
5. **Add life:** at least one of — rotating/scanning part, rolling wheel/sprocket, idle bob, flapping/hinged part, animated shader uniform (smoke/water/flag), or pulsing emissive/selection ring.
6. **Match the stated style.** Default to `flatShading:true` for stylized/retro (games, cartoons), smooth + PBR (`MeshStandardMaterial`) for realism. Keep it readable: 5–12 well-chosen parts beat 50 fiddly ones.
7. **Verify before finishing:** brace/paren balance check; serve over `http://` (ES modules + importmaps are **blocked on `file://`** — use `python -m http.server`); confirm HTTP 200; then **show it in the browser** for the user.

## Workflow

0. **MANDATORY intake interview — always ask before anything else.** Never assume. Ask the user these two questions verbatim (both must be answered; offer the presets, accept free text for "Other"):

   > **Q1 - Level of detail?** (geometry & dressing)
   > 1. **Sketch** - silhouette only, 5-10 parts, flat colors
   > 2. **Stylized game unit** - readable chunky model, 10-20 parts, simple materials, one articulation
   > 3. **Dressed scene** - v1-style full object with props/set dressing, 20-40 parts, canvas textures
   > 4. **Hero render** - v2-style: canvas material library, full dressing, atmosphere, life, critic pass
   > 5. **Other** (describe it yourself)

   > **Q2 - Resolution quality?** (render polish)
   > 1. **Fast preview** - ortho iso, no shadows/ACES, minimal texture work
   > 2. **Standard** - PCF soft shadows, ACES tone mapping, 256-square canvas textures
   > 3. **High** - 35mm perspective hero camera, sky gradient + fog + rim light, 512-square textures, normalBias-tuned shadows
   > 4. **Cinematic** - everything in High plus post-look grading, multi-light setup, highest-res textures, extra critic rounds
   > 5. **Other** (describe it yourself)

   Translate the answers into build parameters with the tier table below, then proceed to the brief. If the user already stated detail/resolution in their original request, confirm it in one line ("Detail: hero, Resolution: high - correct?") instead of re-asking.

0b. **Write the brief first** (art-director step). Before any code, state: `subject / style / view / mood / materials / dressing / atmosphere / life` — a one-block JSON or short list — **headed by the two intake answers** (`detail`, `resolution`). Every later decision is checked against it. Also declare the **fidelity target**: product-architectural (accurate proportions, materials, lighting), stylized game world (composition, coherent language, interaction), or hero-render (full dressing + atmosphere + post-look). This single line determines how many parts, passes, and effects the build deserves.

   **Tier table (bake the intake answers into the build):**

   | | Fast preview | Standard | High | Cinematic |
   |---|---|---|---|---|
   | camera | ortho iso | ortho iso | 35mm perspective | 35mm + chosen shot |
   | shadows | none | PCF soft 2048 | PCF soft + normalBias | PCF soft + radius |
   | tone mapping | off | ACES 1.1 | ACES 1.15 | ACES + grading |
   | canvas textures | none | 256-sq | 512-sq | 512-1024-sq, 2x layers |
   | atmosphere | flat bg | sky tint + Fog | gradient sky + Fog + rim light | + volumetric feel, sparing bloom |
   | life / critic | none | 1 life beat | life pass + critic pass | full life + 2 critic rounds |

   Detail caps parts/dressing (Sketch ~5-10 ... Hero ~40-60); Resolution caps polish per the table. They combine freely (e.g. Hero detail at Fast preview = portfolio turntable with no atmosphere).

1. **Classify → archetype** (drives decomposition + camera). Vehicle · Building/structure · Creature/organic · Device/prop · Terrain/scene · **2D top-down** (field / board / map / diagram). Iso camera for vehicles/buildings/terrain; perspective for creatures/devices; **top-down OrthographicCamera + unlit `MeshBasicMaterial` for 2D** (see `references/recipes.md §7`, `references/techniques.md §10`).
2. **Decompose.** List each part: `name → THREE.Geometry(params) → material → local position → articulates?`. See `references/recipes.md` for per-archetype hierarchies.
3. **Select techniques per part.** Open `references/techniques.md` and pick the code-only technique each part needs (e.g. tracks → stadium-ring band module; glowing core → fresnel shell; stylized surface → toon ramp; smoke/fire → noise vertex shader; many repeats → InstancedMesh; selection → outline shell). When unsure, primitive + `MeshStandardMaterial` always works; layer effects on top.
4. **Build from the scaffold.** Copy `assets/scaffold.html`, replace `buildObject()` with your hierarchy, return `{ object, update }`, drive moving parts in `update(t)`.
5. **Verify & show** (rule 7).
6. **Critic pass before declaring done.** Self-review against the brief in structured form — `score / category / observation / repair` (categories: composition, grounding, materials, atmosphere, life, performance) — and fix the high-severity items. If a human or vision model is available, render a hero + wide shot and let them fill the same JSON. One repair round beats ten more features.

## Recursive improvement — write learnings back (every use)

This skill improves itself. **At the end of every invocation**, once the object is built and shown, reflect: did you discover anything *generally reusable* across future objects? If yes, write it back into the skill **and** log it. This is a required final step, not optional — every build leaves the skill a little better.

### Capture only if reusable

- A **technique not in the catalog** (new shader, new geometry trick) → add to `references/techniques.md`.
- A **better or corrected snippet** for an existing technique → edit it in place.
- A **new archetype / recipe** that worked well → add to `references/recipes.md`.
- A **gotcha, heuristic, or better practice** (a bug you hit, a scale/color/perf insight, a convention) → add to `references/learnings.md` (and fix any affected snippet).
- A **workflow / rules** change → edit this `SKILL.md`.

**Don't capture:** one-off object specifics (that exact shade, that wing angle), trivial choices, anything not reusable by other builds.

### Write-back rules

- Snippets must be **self-contained** and **just-tested** — you literally just ran them in the file you built. Never write back unverified code.
- **Merge** into the nearest existing entry; don't spawn near-duplicates.
- **Always** append a changelog entry in the same edit (below).

### Changelog (required for every write-back)

Append one entry to the **top** of `CHANGELOG.md` (newest first):

```
## YYYY-MM-DD — <one-line summary>
- **Object:** <what was being built>
- **Type:** technique-added | technique-improved | recipe-added | learnings | workflow | bugfix
- **Files:** <paths changed>
- **Change:** <what>
- **Why:** <the learning / what was discovered>
```

Read `references/learnings.md` at the **start** of each build — it is the accumulated practice memory of every prior use.

## Bundled files (read on demand)

- **`references/techniques.md`** — the code-only technique catalog with copy-paste snippets (geometry, canvas textures, materials/shading, GLSL effects, articulation, selection, instancing, the running-gear module, environment). Read in step 3.
- **`references/recipes.md`** — part-by-part decomposition recipes per archetype (race car, tank, skyscraper, bird, laptop, tree). Read in steps 2–3.
- **`assets/scaffold.html`** — the proven HTML boilerplate. Copy in step 4.
- **`references/learnings.md`** — accumulated gotchas / heuristics / better-practice from every prior use. Read at the start of each build; append to at the end (recursive loop).
- **`examples/`** — full working builds in this skill: `house.html` (background-tier cottage, 8–12 parts) and `house-v2.html` (hero-tier storybook cottage: brief → canvas material library → dressing → atmosphere → life → critic pass). Study v2 before any hero build.
- **`CHANGELOG.md`** — append-only history of every skill write-back. Add an entry with every capture.

## Full working examples in this project (study when relevant)

- `examples/` (this skill) — `house.html` (v1 background tier) and `house-v2.html` (v2 hero tier: brief-first build).
- `../../../code-examples/` — 5 structure demos + a Red Alert Mammoth Tank (real running gear, fresnel glow, toon shading, outline, instancing, animated water). Best live references.
- `../../../index.md` — cross-index of code-only techniques mapped to ~130 source files across the vendored Three.js repos in `../../../docs/` (hex-terrain renderer, city builders, a game-component library, a Three.js visual encyclopedia). Read when you need a deeper or rarer technique than the catalog covers.

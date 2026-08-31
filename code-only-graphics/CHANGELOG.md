# Changelog — code-only-3d skill

Append-only history

## 2026-08-14 — Standalone mountain tiles + cinematic post stack
- **Object:** hex-tiles-gen-map.html (50x50 generated hex world map, hero+cinematic tier)
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** added two entries — (1) standalone per-tile mountain dressing vs merged ridge chains, chosen by board-piece vs worldmap intent, incl. per-tile fringe flag rescue and peak-scale formula; (2) the cinematic EffectComposer order (bloom -> grade -> OutputPass last), grade shader params, intro-dolly-with-disabled-controls pattern, land-centroid framing rule
- **Why:** mountain dressing choice is a stylistic fork users explicitly request ("single unconnected tiles"); the post-stack order (OutputPass applies tonemapping) and control-handoff pattern cost hours to rediscover
 of every write-back to this skill (newest first). See `SKILL.md` → "Recursive improvement" for the format and rules. Every capture gets one entry here in the same edit that changes a core file.

## 2026-08-14 — Mandatory intake interview: detail + resolution presets baked into workflow
- **Object:** (all future builds)
- **Type:** workflow
- **Files:** SKILL.md
- **Change:** new mandatory step 0 — always ask the user Q1 Level of detail (Sketch / Stylized game unit / Dressed scene / Hero render / Other) and Q2 Resolution quality (Fast preview / Standard / High / Cinematic / Other); brief is now headed by the answers; a tier table maps each resolution preset to camera/shadows/tonemapping/texture-size/atmosphere/life-and-critic parameters; detail caps part count. Skip-rule: if the user already stated both, confirm in one line instead of re-asking
- **Why:** detail and polish were previously assumed from prompt vibes; explicit presets make output predictable and let the user dial effort/cost per build

## 2026-08-14 — Added examples/ with both cottage tiers
- **Object:** storybook cottage (both tiers)
- **Type:** examples-added
- **Files:** examples/house.html, examples/house-v2.html, SKILL.md, references/recipes.md, references/techniques.md
- **Change:** copied both builds into skill-local examples/; SKILL.md bundled-files + examples sections list them; recipes §10 and techniques §2 now cite the local paths instead of the consuming project
- **Why:** the skill should be self-contained — v2 is the reference implementation of the new hero workflow (step 0 brief + step 6 critic), v1 shows the background tier baseline

## 2026-08-14 — Hero-build pipeline: brief-first + layered passes + critic step (cottage v2)
- **Object:** storybook cottage house-v2.html ("Pixar look")
- **Type:** workflow + learnings + technique-improved + recipe-improved
- **Files:** SKILL.md, references/learnings.md, references/techniques.md, references/recipes.md
- **Change:** SKILL.md workflow gains step 0 (brief: subject/style/view/mood/materials/dressing/atmosphere/life + fidelity tier) and step 6 (structured critic pass). learnings.md: layered-pass method, canvasTex library as the code-only asset tier, atmosphere recipe, flicker/sway/butterfly life pass, "Pixar = smooth + 35mm, not flat + iso", ExtrudeGeometry world-unit UVs. techniques.md §2: canvasTex() helper + drawing-fn index; §9: golden-hour sky gradient + fog + rim-light snippet, candle-flicker emissive. recipes.md §10: upgraded to two-tier (v1 skeleton + v2 hero dressing list), both source files cited
- **Why:** v1 vs v2 was night-and-day at similar part count; every technique that made the difference is now a copy-pasteable snippet so the next hero build starts from the v2 baseline, not v1

## 2026-08-14 — House/cottage recipe (gabled roof via triangular prism extrude)
- **Object:** simple house (tests/house.html)
- **Type:** recipe-added
- **Files:** references/recipes.md
- **Change:** added §10 "Building — simple house / cottage": ExtrudeGeometry triangle prism = gable roof with closed ends + eave overhang via W/2+0.4; foundation plinth; shared pulsing window material; chimney may intersect roof; §4 smoke on top
- **Why:** recipes only had skyscraper; the extruded-triangle roof is the reusable core of any pitched-roof building and avoids hand-built gable triangles

## 2026-08-06 — 5-tile terrain set via config-driven generator (TSL example → JS port)
- **Object:** grass/desert/rock/snow/water hex tiles in the style of webgpu_tsl_procedural_terrain
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** added rule: N biome variants → one _gen_tiles.mjs generator; JS port of the example's domain-warped octave elevation + palette; "still" = damping-only render loop
- **Why:** avoids 5 hand-maintained near-duplicate HTML files; the TSL→JS elevation mapping is reusable for any procedural-terrain build

## 2026-08-05 — Mountain terrain hex tile: ridged-fbm heightfield + cloud wisps
- **Object:** scenes/mountain-hex.html (one tile of hex-map.html turned into a mountain terrain tile)
- **Type:** technique-added
- **Files:** references/techniques.md (§9: ridged-fbm clamped-hex heightfield, cloud wisps), references/learnings.md (flat-vs-displaced rule scoped: mountains are the exception)
- **Change:** Added the ridged-fbm (`1-|2·fbm-1|`, pow-sharpened) mountain heightfield pattern with hex-slab clamp + `(1-rim²)` rim falloff + ragged vertex-colour snowline, and a sprite-based drifting-cloud technique.
- **Why:** The prior "never displace, paint a texture" rule silently didn't cover mountains (relief = silhouette). The ridge trick came from webgl-terrain, reimplemented image-free per the code-only rule.

## 2026-08-05 — Farmable grain acre: instanced wheat that grows, ripens, harvests
- **Object:** scenes/grain-acre.html (one grass tile of hex-map.html turned into a farmable wheat acre)
- **Type:** learnings
- **Files:** references/learnings.md (1 new learning + addendum to the hex-ring learning)
- **Change:** Added "Instanced crop field that grows, ripens, and is harvestable" — base-anchor the geometry (`geo.translate(0,h/2,0)`) so per-frame `dummy.scale.y` sprouts instances upward without moving `position.y`; ripen with a single shared-material colour lerp green→gold (no per-instance colour); make it harvestable by raycasting the underlying terrain face (keep soil/wheat overlays out of `pickables`) and branching on that face's `userData`; reuse the breathing gold hex ring as both ripe indicator and harvest-me affordance. Appended the Shape+hole exact-match alternative to the existing hex-ring learning (same vertex angles as the pointy-top `FACE`, zero rotation guesswork).
- **Why:** First farmable/crop tile for the 4X game; there will be many (wheat/wood/food tiles) and the grow→ripen→harvest loop + instanced-crop technique are reusable across all of them. Original hex-map.html left untouched; new file derived from it per request.

## 2026-08-05 — Realistic procedural rock: noise-displaced icosahedron + baked vertex colour
- **Object:** game-assets/mountain-rock-tile.html (boulders + peaks made realistic; tile frozen, ore/snow removed)
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** Added a learning for realistic procedural rock — `IcosahedronGeometry` displaced along normals by 3D value-noise fbm, with baked vertex colour (granite base + height-keyed dark crevice AO + sun-lit top facets + sparse lichen + HSL jitter), `flatShading:true`, base translated to y=0. Same builder serves boulders and tall peaks. Notes that flat dodecahedron/cone read toy-like/pyramidal by comparison, and that shape variety needs multiple geometry variants as individual meshes (InstancedMesh can't vary shape).
- **Why:** User asked to make the stones/rocks realistic; the original dodecahedron boulders looked like dice. No procedural-rock reference existed in docs/ (only .glb loads, which break the no-model rule) or reachable web, so the textbook displaced-icosahedron technique was implemented and captured for future boulder/stone/asteroid/mountain builds.

## 2026-08-05 — Mountain/rocky mineable tile: resource-tile idiom, craggy peaks, pointy-top ring offset
- **Object:** game-assets/mountain-rock-tile.html (single hex tile → mineable stone/ore terrain)
- **Type:** recipe-added + learnings + technique-improved
- **Files:** references/recipes.md (new §9 Resource / mineable tile), references/learnings.md (2 new learnings + improved the hex-ring learning),
- **Change:** Added the resource/mineable-tile recipe (terrain + InstancedMesh resource scatter + emissive ore vein + breathing hex ring). Added learnings: "mineable node = pulsing emissive + breathing ring" (pairing two existing snippets as the harvest idiom) and "5-sided cone = craggy peak, 6 is too regular". Improved the existing hex-ring learning with the pointy-top `rotation.z += π/6` (+30°) offset.
- **Why:** This is the game's first resource tile and there will be many (stone/wood/iron/gold); capturing the idiom + recipe so the next one starts from the finished pattern. The pulsing-emissive and ring snippets already existed separately — the novel reusable bit is pairing them as the mineable signal, plus the small craggy-peak and pointy-top-ring details.

## 2026-08-05 — Hex map → Civ-style: painted textures, climate zoning, click-select, turntable
- **Object:** hex-map.html (iterated to match docs/threejs-hex-map)
- **Type:** technique-added + technique-improved + recipe-updated + learnings
- **Files:** references/techniques.md (§2 paintedTexture helper, §6 click-to-select + turntable), references/recipes.md (§8 rewritten to flat/Civ-style), references/learnings.md
- **Change:** Added the multi-scale `paintedTexture` helper (§2), raycast click-to-select with a click-vs-drag threshold and a 90°-step turntable (§6), rewrote the hex-map recipe (§8) to the final flat pointy-top + climate-zoned + coast-shoreline + biome-trees + fog + select + turntable approach, and added two learnings (verify with `node --check`; parent selection overlays to the transformed container).
- **Why:** Driving the hex map to match the project's reference surfaced reusable interaction + texture patterns and two real bugs; capturing so the next tiled-map/strategy build starts from the finished approach. (The "flat+painted beats displaced terrain" insight was already logged from prior Catan work — not duplicated.)

## 2026-08-05 — Learning revised: flat plane + painted texture beats displaced terrain for clean stylized ground
- **Object:** Catan-style forest hex tile
- **Type:** learnings (revision)
- **Files:** references/learnings.md
- **Change:** Revised the flatShading learning — smooth shading hides facet ridges but the displaced grid still showed residual angle-dependent artifacts. Stronger fix: for board/iso terrain that must look clean from every angle, use a FLAT `ShapeGeometry` plane + painted `CanvasTexture` (the `code-examples/scenes/hex-map.html` approach) instead of displaced geometry; the uneven look is baked into the texture. Floor = flat hex, `receiveShadow=true, castShadow=false`; tile sides `receiveShadow=false`; prism `openEnded` so no cap z-fights the floor.
- **Why:** After smooth-shading failed to fully clear the ridges, the user pointed at hex-map (flat + painted texture, no displacement) as artifact-free. Adopting that technique removed the problem outright — when a reference works, match its technique instead of patching your own.

## 2026-08-05 — Learning: don't flatShade a displaced grid terrain (bakes triangulation into shading)
- **Object:** Catan-style forest hex tile
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** Added a learning — `flatShading:true` on a displaced grid floor makes every facet lit/dark by face normal with hard edges, so the triangulation shows as angle-dependent green/dark rectangles & ridges as you orbit. Smooth-shade organic ground (`flatShading:false` + `computeVertexNormals`); keep flatShading for hard stylized props (tree cones, hulls). Includes the diagnostic: a pattern that shifts with viewing angle is shading, not shadows.
- **Why:** The forest floor showed a faceted mosaic of ridges depending on camera angle. Switching the terrain material to smooth shading hid the triangulation; the fir trees stayed flat-shaded for their conifer look.

## 2026-08-05 — Learning: clamp grid-terrain boundary verts to the polygon, don't cull by centroid
- **Object:** Catan-style forest hex tile
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** Added a learning — a displaced floor built as a grid culled by centroid leaves a jagged boundary that misaligns with a clean tile edge, showing as dark notches/rectangles along the rim from the side. Fix: clamp outside grid verts onto the polygon boundary (flat-top hex = 3 slabs), set them to base height, emit the full grid so the mesh edge coincides with the tile rim.
- **Why:** The forest hex showed dark rectangles along the tile sides at eye height; the jagged floor boundary was poking past / gapping from the clean hex prism edge. Verified the fix renders clean via a headless Chrome side-view screenshot.

## 2026-08-05 — Learning: ground casts no shadow; vertical walls receive none (board-tile shadow hygiene)
- **Object:** Catan-style forest hex tile
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** Added a learning — in terrain/tile scenes set the floor mesh `receiveShadow=true, castShadow=false` and vertical walls `receiveShadow=false`; otherwise the elevated ground + tree shadows project solid black patches onto the tile's side faces. Trees `castShadow=true, receiveShadow=false`. Also use `sun.shadow.normalBias≈0.03` to kill acne on flat-shaded walls.
- **Why:** The forest hex showed black areas on its vertical sides — the ground surface and trees were casting shadows the prism walls were catching. The fix (ground receives-only, walls don't receive) is the general rule for any tile/terrain with vertical edges.

## 2026-08-05 — Learning: CylinderGeometry 3 material groups [side,top,bottom] for tokens/tiles
- **Object:** Catan-style forest hex tile (pointy-top hex prism + fir trees + number token)
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** Added a learning — `CylinderGeometry` exposes material groups `[side, top, bottom]` (0/1/2), so a material array gives a token/coin/tile a distinct cap vs edge (number-face top on a cream disc; grass top on a dark-sided hex). Cap UVs map the circle into the central unit circle, so draw token art within ~0.5 of canvas center. Includes the Catan pip formula `6 - |7-num|`.
- **Why:** The skill's material-array note only covered boxes; cylinders are the natural shape for board-game tokens/coins and this 3-group trick is reused for any chit or tile. Verified just now in the running build.

## 2026-08-05 — Bugfix learning: LineLoop needs a BufferGeometry, not a points array
- **Object:** hex-map grid lines
- **Type:** learnings (bugfix)
- **Files:** references/learnings.md
- **Change:** Added a learning — `LineLoop` / `Line` / `LineSegments` throw in `updateMorphTargets` if handed a points array instead of a `BufferGeometry`; use `new THREE.BufferGeometry().setFromPoints(pts)`.
- **Why:** Hit the runtime error building hex grid lines; captured so the next line/grid build doesn't repeat it.

## 2026-08-05 — Added hex-grid terrain map recipe (demonstrated with a 6-terrain hex map)
- **Object:** hex terrain map, 6 types (grass / water / woods / stone / sand / snow)
- **Type:** recipe-added + learnings
- **Files:** references/recipes.md (§8), references/learnings.md
- **Change:** Added a "hex-grid terrain map" recipe (flat-top axial layout, CylinderGeometry(6) prism, per-terrain décor dispatch, hex-ring selection) and two learnings (RingGeometry(n)=n-gon ring; hex prism + TILE_R<SIZE for gaps).
- **Why:** A 4X/Civ-style hex map is core to this project; the per-terrain dispatch + axial math + hex-ring selection are reusable for any tiled map, so the next hex request starts from a working pattern instead of re-deriving it.

## 2026-08-05 — Added 2D / top-down rendering (demonstrated with a football pitch)
- **Object:** 2D football pitch, top-down view
- **Type:** technique-added + recipe-added + learnings + workflow
- **Files:** SKILL.md, references/techniques.md (§10), references/recipes.md (§7), references/learnings.md
- **Change:** Added 2D/top-down support — three OrthographicCamera styles (centered world-unit, pixel-coordinate, fullscreen-quad shader), unlit MeshBasicMaterial, line/arc/disc helpers (arcs via Shape+absarc since RingGeometry can't do partial), mowing stripes, a "2D top-down scene" recipe, two learnings, and a note in the archetype list.
- **Why:** A football pitch (flat, top-down, unlit) is a distinct archetype from the 3D vehicles/buildings/creatures the skill was built on. Building it surfaced that 2D needs a different camera + unlit materials + arc handling — captured so the next 2D request is instant.

## 2026-08-05 — Skill created; recursive self-improvement loop bootstrapped
- **Object:** n/a (skill inception)
- **Type:** workflow
- **Files:** SKILL.md, references/techniques.md, references/recipes.md, references/learnings.md, assets/scaffold.html, CHANGELOG.md
- **Change:** Created the skill with an object-agnostic decomposition workflow, a code-only technique catalog, per-archetype recipes, a proven HTML scaffold, and a recursive loop that captures learnings back into the core after every use (this changelog + `learnings.md` are the mechanism).
- **Why:** Distilled from building 5 structure demos + a Red Alert Mammoth Tank (real running gear, fresnel glow, toon shading, outline, instancing, animated water) and indexing ~130 techniques across the vendored Three.js repos in `docs/`. The running-gear lesson (a flat textured box doesn't read as a tank; an extruded stadium-ring band + wheels does) became `techniques.md §8` and seeded the first learnings — proving the loop before it is ever used.

## 2026-08-15 — Building idioms (§11) + shared life-helpers pattern from 5-house style set
- **Object:** Five house styles (Craftsman Bungalow, Mid-Century Modern, Colonial Revival, Mediterranean Revival, Victorian/Queen Anne), each a self-contained HTML
- **Type:** technique-added | learnings
- **Files:** references/techniques.md, references/learnings.md
- **Change:** Added §11 building idioms (cone-scaled hip roof, Shape+absarc arched openings, 4-sided tapered column, canvas-frond palm, gradient barrel/fish-scale tiles). Recorded the config-driven-generator + shared life-helpers (sway/flicker/smoke in the scaffold) pattern and the playwright+screenshot verification loop.
- **Why:** Building 5 styled houses at once proved the generator pattern scales from terrain tiles to full buildings, and that hoisting motion/life into the shared scaffold removes per-file duplication entirely.


## 2026-08-15 — Hex-world scaling: atlas + merged geometry + instanced pools for 2,500-tile maps
- **Object:** 50×50 continuous procedural hex world (one HTML file, all 10 terrain families + variants)
- **Type:** learnings
- **Files:** references/learnings.md
- **Change:** Recorded the atlas-UV-remap + merged-geometry + InstancedMesh-pool architecture, the sea-plane-under-everything water trick, variable-width river ribbons through centers and edge midpoints, the falloff bug (edge^3 → 71% ocean), and the offline-node classifier-tuning workflow.
- **Why:** Scaling hex tiles from showcase counts to world counts changes the required architecture completely; this entry is the map for the next world-scale build.

## 2026-08-15 — Hex board v2: tessellated extruded prisms, deterministic cap UVs, edge-connected features
- **Object:** 10-family hex terrain board where tiles touch edge-to-edge and fuse into the floor
- **Type:** recipe-added (recipes.md §12) | examples
- **Files:** references/recipes.md, examples/hex-terrain-tiles-v2.html
- **Change:** Added §12 — ExtrudeGeometry hex prisms with cap UVs = shape coords (repeat=1/2R, offset=.5 → canvas is a north-up map), exact pointy-top tessellation pitches, no-inset coincident walls, edge-midpoint painting (EA helper) for cross-edge roads/rivers/waterfalls, and the projection-based no-vision pixel verification loop.
- **Why:** Cylinder-cap UV orientation made edge-aligned painting unreliable; the extrude route makes cap↔canvas mapping provable and lets features flow across shared borders and height steps (waterfall) — the basis for any connected-board hex game map.

## 2026-08-15 — Adaptive-neighbour engine: features propagate across tile borders by affinity
- **Object:** hex terrain board v3 — roads/rivers/ornaments decided by per-family affinity tables
- **Type:** recipe-added (recipes.md §13) | examples
- **Files:** references/recipes.md, examples/hex-terrain-tiles-v3.html
- **Change:** Added §13 — per-feature affinity table + seed/full/fade thresholds + single-processing BFS propagate with orphan invariant, ornament bleeds tinted by sender, arrangement brute-force, fade/waterfall/bridge renderers, deterministic offline↔browser flow equality via window.__flow, window-count pixel verification for thin features.
- **Why:** "connected features" isn't enough — features must react to WHAT the neighbour is: a road fades entering marsh, a river deltas into a lake, forest spills onto plains. The affinity table makes neighbour behaviour data-driven and tunable offline.

## 2026-08-15 — Continuous elevation: gaussian-IDW heightfield replaces hex prisms
- **Object:** hex terrain v4 — natural slopes between tiles, no visible hex geometry
- **Type:** recipe-added (recipes.md §14) | examples
- **Files:** references/recipes.md, examples/hex-terrain-tiles-v4.html
- **Change:** Added §14 — sharpened gaussian IDW heightfield (POW 2.5 keeps centres true), single displaced plane, world-canvas biome blobs + engine-driven world-coord feature chains, draped rivers with steepest-step waterfall/veil/foam, conforming water discs, slope-seated ornaments. Gotchas: disc conform/lift sign bug, local-Y→world−Z mapping, no-cliff waterfall thresholds, seeded canvas + settle() for deterministic verification.
- **Why:** "Naturally elevated" terrain needs continuous geometry — the adaptive-neighbour engine (§13) ports over unchanged and its features now flow across real slopes, water following the actual surface downhill.

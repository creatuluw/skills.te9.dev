# Code-Only 3D — Decomposition Recipes

Part-by-part recipes per archetype. Each lists `name → geometry(params) → material → local position → articulates?`. Adapt freely; these are starting points, not constraints. Material helper: `const m=(c,e={})=>new THREE.MeshStandardMaterial({color:c,roughness:0.8,metalness:0.1,...e})`.

## Table of contents

1. [Wheeled vehicle — race car](#1-wheeled-vehicle--race-car)
2. [Tracked vehicle — tank](#2-tracked-vehicle--tank)
3. [Building — skyscraper](#3-building--skyscraper)
4. [Creature — bird](#4-creature--bird)
5. [Device — laptop](#5-device--laptop)
6. [Organic scatter — tree / forest](#6-organic-scatter--tree--forest)
10. [Building — simple house / cottage](#10-building--simple-house--cottage)

---

## 1. Wheeled vehicle — race car

Camera: iso. Style: smooth PBR, glossy.

```
Car Group
├─ chassis    Box(4.2,0.5,1.8)        m(0xcc1133,{roughness:0.25,metalness:0.6})  (0,0.55,0)
├─ cabin      Box(1.8,0.5,1.5)         body color, slight z-back                 (−0.2,0.95,0)
├─ windshield Plane(1.6,0.5) tilted 30° glass m(0x88ccff,{transparent,opacity:0.35})
├─ spoiler    Box(0.5,0.05,1.7) + two Box struts                                 (−1.9,0.95,0)
├─ wheels×4   Cylinder(0.4,0.4,0.3,24) rotation.x=π/2  m(0x111111,{roughness:0.9})
│             (±1.3,0.4,±0.95)  → each its own Group to spin (rotation.z)
└─ headlights Sphere(0.12) emissive white                                         (1.9,0.55,±0.6)
```
**Articulation:** spin the 4 wheel groups (`rotation.z += speed`); for realism add a slight body roll in turns. Add a ground selection ring if it's a game unit.
**Source pattern:** `../../../code-examples/command-center.html` (scaffold + materials), wheel orientation from the tank example.

---

## 2. Tracked vehicle — tank

Camera: iso. Style: `flatShading:true`, chunky.

```
Tank Group
├─ tracks×2       buildTrack(side)            see techniques.md §8 (stadium-ring band + road wheels + sprocket + idler + grousers)
│                 placed (0,0.5,±0.95)
├─ hull           Box(2.6,0.7,1.7)            m(olive,{flatShading})   (0,0.95,0)
├─ glacis         Box(0.6,0.5,1.5) rotated    (1.35,0.82,0)
├─ upperHull      Box(1.9,0.35,1.4) darker    (0,1.32,0)
└─ turret Group   (−0.1,1.5,0)                ARTICULATES (rotation.y scans)
   ├─ body        Box(1.3,0.5,1.2)
   ├─ barrels×N   Cylinder(0.1,0.11,1.8,12) rotation.z=−π/2 forward  (twin for a Mammoth)
   ├─ cupola      small Box/Cylinder on top
   └─ details     missile racks, star decal (canvas Plane), antenna
```
**Articulation:** spin the sprockets (`track.userData.sprocket.rotation.z += ...`); turret scans; idle bob on the whole group.
**Full reference:** `../../../code-examples/red-alert-units/vehicles/mammoth-tank.html` (read it — it implements §8 verbatim).

---

## 3. Building — skyscraper

Camera: iso (pull back, raise `d`). Style: PBR glass + canvas window texture.

```
Tower Group
├─ base         Box(3,0.4,3) stone           (0,0.2,0)
├─ shaft        Box(2.4, H, 2.4)             MeshStandardMaterial({map: facadeTex})  façade = canvas window grid (techniques.md §2), repeat tiled vertically
│               apply via material array: sides=facade, top/bottom=roof-cap material
├─ setbacks     2–3 narrower Box tiers stepping in as it rises (classic skyscraper silhouette)
├─ crown        Box / Cylinder / antenna tip at top; emissive beacon sphere (pulses)
├─ entrance     Box door + canopy at street level
└─ ground plane / neighboring low Box massing for context
```
**Texture:** draw one facade canvas (window grid, some lit) and set `tex.wrapS=wrapT=Repeat; tex.repeat.set(1, floors)` so windows tile up the shaft. Use a **material array** on the shaft box so only the 4 sides get windows.
**Articulation:** pulse the crown beacon's `emissiveIntensity`; optionally randomize lit windows per floor.
**Source:** `../../../code-examples/command-center.html` (canvas facade + material array + beacon).

---

## 4. Creature — bird

Camera: perspective (track the body). Style: smooth, slightly toon optional.

```
Bird Group (origin at body center)
├─ body     Sphere(0.5) scaled (1.4,0.9,0.9) ellipsoid       m(featherColor)
├─ head     Sphere(0.3)                                       (0.75,0.25,0)
├─ beak     Cone(0.08,0.25,8) rotated forward                 (1.0,0.22,0)
├─ eyes×2   Sphere(0.05) dark                                 on head
├─ tail     Cone/Box fan of feathers                           (−0.7,0,0) rotation pointing back
├─ wingL Group  pivot at shoulder (0.2,0.15,0.3)              ARTICULATES (rotation.z flaps)
│   └─ feather shape: Box(0.9,0.05,0.5) or shaped ExtrudeGeometry, offset so inner edge at pivot
└─ wingR Group  mirror at z=−0.3                              ARTICULATES (rotation.z flaps, opposite sign)
```
**Articulation:** `wingL.rotation.z = Math.sin(t*0.012)*0.9; wingR.rotation.z = -Math.sin(t*0.012)*0.9;` (flap); gentle body bob; optional banking. Build each wing as a Group pivoted at the shoulder, with the feather mesh offset outward — the §4 flag-weighting idea applies (tip flaps more if you displace in a vertex shader).
**Source pattern:** wing flap reuses the hinged-part articulation; body/head are primitives from §1.

---

## 5. Device — laptop

Camera: iso/perspective. Style: smooth PBR metal + canvas keyboard.

```
Laptop Group
├─ base      Box(3,0.12,2) aluminum   m(0xbfc4cc,{roughness:0.35,metalness:0.7})   (0,0.06,0)
├─ keyboard  Plane(2.8,1.8) canvas texture (key grid drawn on canvas)              top face of base
├─ trackpad  Box(1,0.01,0.7) slightly darker                                       (0,0.065,0.6)
├─ screenHinge Group  pivot at rear edge (0,0.12,−1)                              ARTICULATES (rotation.x opens)
│   ├─ lid    Box(3,1.9,0.08) aluminum
│   └─ panel  Plane(2.8,1.7) emissive canvas (desktop wallpaper drawn on canvas)  inner face of lid
└─ logo      Plane small, emissive, on lid outer face
```
**Articulation:** open the lid from closed to ~100°: `screenHinge.rotation.x = THREE.MathUtils.lerp(closed, -1.7, openT)`; animate `openT` 0→1 on load. Pulse the panel emissive subtly.
**Source pattern:** hinged sub-group (§5) + canvas texture (§2) + material array for base top vs sides.

---

## 6. Organic scatter — tree / forest

Camera: iso. Many instances → InstancedMesh (§7).

```
Tree (merged into ONE geometry so it can be instanced):
  trunk   Cylinder(0.08,0.1,0.5,6)         vertexColor brown
  foliage Cone(0.45,0.7,7) ×3 stacked       vertexColor greens
  → mergeGeometries([trunk,f1,f2,f3]) with per-part color attribute; material vertexColors, flatShading
Forest: InstancedMesh(treeGeo, mat, N) scattered on a tile, random scale/rotation (§7).
Optional: hex tile ground (Cylinder r 6 sides), a water pond (§4 animated water), instanced crops.
```
**Source:** `../../../code-examples/forest-farm.html` (InstancedMesh firs + crops + water on a hex tile).

---

## 7. 2D top-down scene — sports field / board / map

Camera: **top-down OrthographicCamera** looking down -Z, world units = meters/cells, `MeshBasicMaterial` (unlit — no lights). Real Three.js 2D: flat, perspective-free, crisp.

```
Field Group (XY plane; z = draw-order only)
├─ base     mowing stripes = N alternating-color PlaneGeometry tiles
├─ lines    thin PlaneGeometry(w, T) — axis-aligned field lines
├─ arcs     Shape + absarc → ShapeGeometry (full rings AND partial arcs; RingGeometry can't do partial)
├─ spots    small CircleGeometry discs
├─ goals    translucent PlaneGeometry behind the goal line
└─ actors   CircleGeometry discs (players/pieces), z just above markings
```
**Helpers** (techniques.md §10): `line(w,h,x,y)`, `arc(cx,cy,innerR,outerR,a0,a1)`, `disc(r,x,y)`. Layer via small `z` offsets. **Camera:** compute the frustum from window aspect to "contain" the field. **Animation:** idle sway = set `position = base + sin(t)*amp` (never accumulate).

**Full reference:** `../../../code-examples/scenes/football-pitch.html`.

---

## 8. Hex-grid terrain map (4X / Civ-style)

Flat, contiguous, Civ / `threejs-hex-map`-style. Pointy-top tiles that touch, terrain from a procedural heightmap, painted canvas textures, biome features, fog, click-to-select, turntable.

```
Map Group (rotated in 90° steps by the turntable)
├─ ocean plane   backdrop below the tiles
└─ tiles[]       one Group per axial (q,r):
   ├─ face     flat pointy-top hex = ShapeGeometry(pointy-top Shape) + normalised UVs, painted canvas texture
   ├─ grid     LineLoop(hex corners) — subtle grid (0x42322b, opacity 0.25)
   ├─ feature  mountain peak (cone+snow cap) / biome trees (cones) / none
   └─ fog      dark translucent hex overlay on unexplored tiles
```
**Pointy-top math** (from `threejs-hex-map` `qrToWorld`): `x = √3·HR·(q + r/2)`, `z = 1.5·HR·r`; tiles touch when geometry radius == HR. Flat hex = `ShapeGeometry` of a pointy-top `THREE.Shape` (vertices at `60°·i + 30°`), mesh `rotation.x = -π/2`; **normalise the UVs** over the hex bbox so one texture maps per tile. (Flat-top alt: `CylinderGeometry(r,r,h,6)`.)
**Terrain from a heightmap:** `fbm` value-noise → bands ocean(low)/sand/grass/woods/mountain(high), with **climate zoning** by latitude `|r|` (snow/tundra at the poles) and an **island bias** (subtract radial distance so edges are sea). Mirrors `docs/threejs-hex-map/examples/random/view.ts`.
**Shoreline "coast":** ocean tiles whose 6 axial neighbours include land render with a lighter coast texture.
**Painted textures (code-only):** base + 2–3 soft-blob layers + fine grain on a 128² canvas (techniques.md §2 `paintedTexture`).
**Selection + turntable:** raycast click-to-select (techniques.md §6) with a pulsing hex overlay **parented to the Map Group**; ⟲⟳ / arrow keys spin the map ±90° toward a lerped `targetRot` while the camera stays still.
**Full reference:** `../../../code-examples/scenes/hex-map.html` (radius-4 island, 8 terrains). Deep reference: `../../../docs/threejs-hex-map/` (instanced terrain, transitions, fog of war).

---

## 9. Resource / mineable tile (4X / strategy)

A single hex that reads "you can harvest this" — stone/ore, wood, gold, etc. Camera: iso + auto-rotate so the 3D feature shows off. Combines a terrain tile (§8) with a glowing mineable hotspot.

```
Resource Tile Group (pointy-top hex floor flush with the ground disc)
├─ floor     flat pointy-top hex = ShapeGeometry + painted canvas texture (granite/forest/sand)
├─ outline   LineLoop(hex corners) — faint tile edge so it reads as one board piece
├─ terrain   the biome's 3D feature establishing the tile type: craggy peaks (mountain) / trees (§6) / dunes
├─ nodes     InstancedMesh of the raw resource scatter (boulders, logs, nuggets) — the literal "what you mine"
├─ vein      Group of OctahedronGeometry crystals sharing ONE emissive MeshStandardMaterial (e.g. color 0x1f5d68, emissive 0x39d0e0)
└─ ring      RingGeometry(inner,outer,6) flat hex ring; pointy-top → rotation.z += π/6; opacity breathes
```
**The mineable signal (the whole point):** one slow sine `p = 0.5+0.5*Math.sin(t*0.004)` drives BOTH `crystalMat.emissiveIntensity = 0.5 + p*0.9` AND `ring.material.opacity = 0.25 + p*0.4`, so the ore glow and the ring breathe as one living hotspot. Optional life: gentle `vein.position.y = Math.sin(t*0.002)*0.03` bob + slow `vein.rotation.y` drift.
**Craggy peaks:** `ConeGeometry(r,h,5)` flat-shaded (5 sides, not 6 — irregular craggy silhouette, not a pyramid), narrow white cone snow cap on top, 3 peaks of varying height offset to opposite sides for a ridge.
**Source:** `../../../game-assets/mountain-rock-tile.html` (stone/ore mountain tile: craggy peaks + instanced dodecahedron boulders + cyan emissive ore vein).

---

## 10. Building — simple house / cottage

Camera: iso for background units; **35mm PerspectiveCamera** for hero/Pixar-style builds. Style by tier: background = flat colors + `flatShading`; **hero = smooth shading + canvas material library + dressing + atmosphere** (see SKILL.md step 0 tiers).

**v1 skeleton (8–12 parts):**

```
House Group
├─ foundation  Box(W+0.4, 0.25, D+0.4)   stone grey, y=0.12      (slightly larger than walls — the plinth read)
├─ walls       Box(W, 1.8, D)              cream 0xe8dcc0
├─ roof        ExtrudeGeometry(triangle, {depth: D+0.4, bevel:false}).translate(0,0,-(D+0.4)/2)
│              triangle (-W/2-0.4,0)→(W/2+0.4,0)→(0,1.2); sits on wall top, red 0xa8362b — the +0.4 gives the eave overhang
├─ door        Box(0.65,1.05,0.08) wood + tiny Sphere knob           front face z=D/2+0.04
├─ windows×2   Box(0.7,0.7,0.08) warm emissive + slightly larger Box frame behind
├─ chimney     Box(0.45,1.3,0.45) + Box cap — let it INTERSECT the roof, base height doesn't matter
├─ bushes×2    SphereGeometry(0.4,8,6) scale.y≈0.7, green, near front corners
└─ smoke       Plane(0.9,2.2,8,12) noise-twist ShaderMaterial (§4) above chimney cap
```

**v2 hero dressing (on top of the skeleton, each is optional):**

```
├─ materials  canvasTex() library (§2): clapboard siding on walls [side,side,plain,plain,side,side],
│             scalloped shingles on roof, river stone on foundation, panelled door, painted grass on ground top
├─ ridge cap  Box(0.34,0.12,D+0.1) along the ridge; shingle texture repeats along it
├─ porch      deck Box + step + 2 Cylinder posts + sloped shingle Box (rotation.x≈0.3)
├─ windows    windowUnit() group: emissive glass + frame box + cross muntins, reused on front/side/gable;
│             round gable window = Cylinder(rot.x=π/2) + Torus frame + muntins
├─ shutters   thin dark-green Boxes flanking front windows
├─ flower boxes Box under each front window + InstancedMesh flowers with setColorAt palette jitter
├─ path       InstancedMesh of flat Cylinder stepping stones from door outward
├─ fence      2 rails + N pickets per side, tiny rotation.y jitter so it reads handmade
├─ tree       trunk Cylinder + 2–3 offset Sphere crown blobs in a Group (sways in update)
└─ life       candle-flicker shared window material, lamp sphere, butterfly (§5 flap + Lissajous path)
```

**Articulation:** smoke `uTime = t*0.001`; shared window material flicker; `treeCrown.rotation.z = Math.sin(t*0.0008)*0.035`; butterfly flaps at `sin(t*0.025)*0.9`.
**Key tricks:** a gabled roof is a **triangular prism = Shape + ExtrudeGeometry** — extrude caps close the gable ends automatically; ExtrudeGeometry UVs are world units so the shingle tile ≈ 1 world unit, no rescaling; ground disc uses Cylinder material groups [side,top,bottom] — grass on top, dirt on sides.
**Source:** `examples/house.html` (v1 tier) and `examples/house-v2.html` (v2 hero, built with brief + critic) in this skill.

## 12. Hex-tile board, v2 — tessellated prisms + edge-connected features

**When:** a showcase of terrain tiles that must read as ONE continuous land mass, not loose pieces on a table (upgrade of §8).

```
Geometry (per tile):  ExtrudeGeometry(hexShape, {depth: H - BOTTOM, bevelEnabled:false})
                      hexShape = 6 points at angles 90°+60k, radius R (pointy-top)
                      mesh.rotation.x = -π/2  → extrudes +Y; top cap at wall height H
                      materials [cap(map), wall(color)] — cap texture from canvas
Layout:               column pitch √3·R, row pitch 1.5·R, odd rows offset √3·R/2  → tiles touch edge-to-edge
Floor:                all prisms share BOTTOM = -0.62; meadow floor slab top at y≈0.02
                      → board emerges from the meadow as one mass; height steps become cliffs
```

**Key tricks:**
- **Extrude caps, not Cylinder caps.** CylinderGeometry cap-UV orientation is unreliable for edge-aligned painting; ExtrudeGeometry cap UVs = raw shape coords, so `tex.repeat.set(1/(2R), 1/(2R)); tex.offset.set(0.5, 0.5)` maps the canvas 1:1 onto the cap — deterministic.
- With `rotation.x = -π/2` the canvas is a **north-up map**: `px = cx + X·k, py = cy + Z·k` (k = size/2R). Edge-midpoint helper `EA(a) = [cx + cos a·0.866r, cy + sin a·0.866r]`, a: 0=E, 60=SE, 120=SW, 180=W, 240=NW, 300=NE.
- **No inset needed on coincident walls.** Touching prisms' shared walls are opposite-facing: backface culling + occlusion hide them; no z-fighting, no seams.
- **Cross-edge features:** paint every road/river/stream to end exactly at the shared edge midpoint on BOTH tiles (same width). Equal-height neighbors join seamlessly; a height step becomes a **waterfall** (thin Plane with water material on the taller tile's cliff face + foam disc at the base).
- Feature chains read as story: road Forest→Plains→lake dock; snowmelt stream → cliff waterfall → river → frozen stream → frozen pond; marsh channel → lake.

**Verification without vision:** Python-Playwright screenshot + replicate the camera projection (lookAt + PerspectiveCamera fov) in the test script; sample median colors at projected world points (water-vs-beach halves of one tile proves the cap UV mapping). Compensate OrbitControls autoRotate drift: angle = 2π·speed/60·t; try both signs.

**Source:** `examples/hex-terrain-tiles-v2.html` in this skill.

## 13. Adaptive-neighbour hex board — feature propagation by tile affinity

**When:** tiles must react to their neighbours — roads continue/fade based on terrain, rivers end in lakes, forests spill across borders (upgrade of §12).

```
Affinity table   FAM[name].aff = { road, river, forest, rock, reed, snow, sand, water }  // 0–1 per family
Thresholds       seed ≥ .85 → family originates the feature; full ≥ .60 → carries it on; fade ≥ .25 → continues but fades away
Propagate        BFS: seeds queue [slot,null]; each tile processed ONCE picks ONE out-edge toward the
                 highest-affinity unclaimed neighbour (aff + rng jitter). Receiver lands in
                 src / full / fade / delta (lake sink) / absorb (marsh sink). Sinks never seed.
Invariants       every out-edge is backed by the receiver's in-edge (orphan check);
                 separate done/processed vs targeted/reserved sets or targets get skipped (classic bug)
Bleeds           ornaments use the same table: hi-aff neighbour (≥.6–.7) pushes n = (hi−lo)·8 props
                 across the shared edge onto the lo-aff tile, tinted by the SENDER's palette
Arrangement      brute-force all 10! slot permutations maximising Σ pair-affinity over the 17 edges (offline)
```

**Key tricks:**
- **Determinism:** mulberry32(seed) passed through propagate('road') then propagate('river') in fixed order — identical flows offline (Node tuner) and in-browser; expose `window.__flow` and assert equality in the Playwright check.
- **Fade rendering:** tapering canvas segments from the shared edge (3 segments, width×0.85→0.6, alpha 1→0.34) — the feature visibly dies out per affinity.
- **Height-step out-edge = waterfall:** thin water-material Plane on the sender's cliff face (`edgeWorld(a, inradius+ε)`, `rotation.y = -a`), foam disc on the receiver. Put the camera where the cliff is VISIBLE (SW eye for a W-face fall).
- **Road × river same tile = bridge:** if both flows are active, drop a plank bridge where the painted paths cross.
- **Sample placement gotcha:** bowed paths (quadratic via centre) don't pass through the tile centre — for pixel verification compute the Bézier midpoint (0.25·P0+0.5·C+0.25·P2), and remember ornament props (domes!) may cover the path centre.
- Thin features (roads/ribbons/veils) verify by counting predicate-matching pixels in a ±25px window, not median colour.

**Verification:** engine-state equality (browser vs tuner) + window-count pixel checks + console sweep. Source: `examples/hex-terrain-tiles-v3.html`.

## 14. Continuous-elevation hex terrain — heightfield replaces tile prisms

**When:** tiles must read as naturally elevated land — no visible hex shapes, each tile meeting its neighbours on slopes "all around" (upgrade of §12/§13).

```
Heightfield   height(x,z) = Σ wᵢ·hᵢ / Σ wᵢ,  wᵢ = exp(−(dᵢ/σ)²)^2.5   (σ ≈ hex radius·0.9)
              + meadow pseudo-weight 0.02 as far-field anchor; rim relaxes to meadow via smoothstep(4.4→6.2)
              POW 2.5 keeps centres true to family height (raw gaussian sags peaks ~20%)
Mesh          ONE displaced PlaneGeometry (200×116 segs) — no tile geometry anywhere
Texture       one big world canvas (2048px): family = soft radial blobs with seeded jitter (borders blend, no hex edges),
              engine features painted in WORLD coords (chains cross tiles continuously), chits painted subtle at centres
Water         draped ribbons: sample path every 0.12, y = height+lift — steep drops become falls automatically;
              steepest-step scan → veil plane (rotation.y = −flow angle) + foam disc
Discs         conforming water discs: CircleGeometry, per-vertex local z = height(wx,wz) − height(centre), mesh at y = h_c + LIFT
Ornaments     same prop library, y = height(x,z) per item — everything sits ON the slopes
```

**Key gotchas (all bit me):**
- **Disc conform sign × position sign:** local z displacement must be +(hᵥ−h_c) AND mesh y = h_c + lift. Drop-semantics from flat-tile versions (water inset BELOW the top) buries conforming discs under the slope — invisible. Debug with a bright MeshBasicMaterial + raised lift.
- **Local +Y maps to world −Z after rotation.x = −π/2** — sample conform heights at (cx+lx, cz−ly), not (cx+lx, cz+ly).
- **No cliffs exist in continuous terrain** — waterfall detection = max drop over a 0.1-unit step along the path (threshold ≈ 0.06–0.09 with POW 2.5 domes), not a height-table diff.
- **Seed ALL canvas randomness** (mulberry32) or pixel checks flap run-to-run; freeze OrbitControls autoRotate via an exposed `settle()` hook for deterministic screenshots.
- **Verification sampling:** sample off centre (painted chits live at centres now), compute Bézier midpoints for curved features, and expect backlit faces to render 30–40% darker than texture RGB — calibrate predicates against actual dumps, use brightest-pixel stats for mottled biomes.

**Source:** `examples/hex-terrain-tiles-v4.html` in this skill.

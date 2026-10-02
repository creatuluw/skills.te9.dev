# Sculpting: implicit fields, marching cubes, anatomy

## Implicit field forms

Build anatomy as a list of oriented ellipsoid forms blended by smooth min. All formulas are approximate distance fields — smooth enough for clean blends, cheap to evaluate.

```text
// Ellipsoid distance (p = local point / radius):
k0 = length(p); k1 = length(p / radius)   // unit-space vs radius-space
d  = k1 < 1e-8 ? -min(radius) : k0 * (k0 - 1) / k1

// Smooth union (k = blend width, keep positive):
h = max(k - abs(a - b), 0) / k
union = min(a, b) - h*h*k*0.25

// Subtraction (hard, ordered — later positive forms can fill an earlier cut):
sub = max(a, -b)          // tiny blend ~0.01 for crisp cuts
```

- `oval(center, radius, blend, rotation, subtract, power)` — rotated ellipsoid/superellipsoid with inverse rotation matrix stored.
- `muscle(a, b, width, depth, blend)` — ellipsoid at the segment midpoint, local Y rotated onto the segment, Y radius = half distance. A muscle is an ellipsoid, not a constant-radius capsule: pointed ends blend into the torso core instead of forming disconnected limbs.
- **Superellipse exponents (power 2.3–3.15)** turn spheres into rounded-square sections: jaw ~2.65, nose wedge ~2.7, lips ~2.5, knuckles, knees ~2.7. The single best trick for non-potato faces. Use Lp-norm minus 1, scaled by min radius.

## Anatomy recipe (verified)

1. Torso first as 5–8 large continuous core ovals (blend ~0.22) so limbs read as one body, not stacked boulders.
2. Mirrored per-side muscle ovals with **small deliberate asymmetry** (e.g. shoulder dy +0.085 / −0.035) — reads as natural stance, not a mirrored rig.
3. Negative ovals carve real concavities: linea alba, navel, sternum notch, orbital sockets, mouth line, forehead furrows.
4. Proportions in measured head-units (realistic ≈ 7.5 heads total): torso ~2.2 HU, legs ~3.6, shoulders ~2.3, hips ~1.7. Compute joint anchors (torso-top, shoulders, hips) first; derive limbs from them. Stylized/chibi targets differ — confirm the level, never assume realistic.
5. Face landmarks as normalized coords in head-bbox space: hairline 0.05–0.15, eye line 0.45–0.55, eye spacing 0.2–0.35 of head width, nose base 0.6–0.7, mouth 0.75–0.85, ears bracket eye-line→nose-base. Replace every template placeholder with observed values.
6. Head and each hand get **separate higher-resolution fields** — spend triangles where identity lives, not uniformly.

Stern face pattern: brow muscle running LOW at the bridge → HIGH outside (opposite of "surprised"); eyes as small dark flat ellipsoids recessed INSIDE carved socket cavities (rough ~0.96, never emissive). Face/head is one continuous volume — no floating eyeball spheres or spherical noses.

## Marching cubes (official `three/addons/objects/MarchingCubes.js`)

CPU-only field→mesh converter. Worked setup:

```js
const mc = new MarchingCubes(res, placeholderMaterial, false, false, maxTriangles);
mc.isolation = 0;
mc.field.fill(-20);                       // negative exterior everywhere
// write negative signed distance only near each form, then:
mc.update();
const count = mc.geometry.drawRange.count; // copy ONLY live data out
```

**The optimization that makes it viable:** evaluate each form only within a rotated conservative extent (rotation matrix column abs-sums of radii) padded by `blend + 0.12`. Per-form AABB culling turns O(cells × forms) into near-linear — a 321k-tri model builds in <1 s.

Gotchas (all bit someone):

- **Allocation must exceed actual triangles.** The addon silently warns and the mesh clips. Assert `drawRange.count` against allocation after `update()`; on failure raise allocation or lower resolution.
- `drawRange` doesn't survive copy-out: `attr.array.subarray(0, count*3)` into a fresh `BufferGeometry`, then scale/translate from the addon's unit cube to authored world bounds, displace along normals, recompute bounds. Dispose the addon's temporaries.
- Clipped sampling volumes create holes/flattened ends — check boundary padding when extending fingers, noses, ears.

Verified budget ladder (resolution / triangle allocation): body 124³/155k · head 82³/52k · hands 55³/28k each · pendant skull 36³/16k · rock 45³/16k → 321,784 tris, 47 meshes. Resolution is cells per axis; long bodies map anisotropically into the cube.

## Surface relief and UVs

- Post-extract displacement along normals for weathered micro-relief: `d = relief * ((noise(p*9) - .5) + .35*(noise(p*31) - .5))` with relief ≈ .009 body / .0035 face-hands / .035 rough rock. Tiny displacement keeps implicit normals; recompute/weld for larger.
- UVs: per-triangle dominant-axis box projection (sum face normals to pick the axis) — avoids cylindrical pole distortion on limbs and head. Assumes the non-indexed stream the implicit builder emits; adapt before using on indexed geometry.
- Vertex-color mottling `.83 + .17 * noise(p * 2.4)` for low-frequency object-space color variation, multiplied in the material.
- Bevels that must catch a bright edge line = real geometry (radius 0.02–0.08 object-relative, 1–4 segments), never a normal map alone.

## Determinism

Hash-lattice value noise (`Math.imul` integer mixing), no `Math.random()` anywhere in geometry; a separate seeded LCG only for scatter placement. Two consecutive builds must produce deep-equal geometry — assert it in checks.

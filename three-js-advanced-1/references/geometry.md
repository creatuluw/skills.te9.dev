# Geometry: continuous anatomy and fitted detail

## Contents

- [Coordinate and module contracts](#coordinate-and-module-contracts)
- [Implicit sculpting](#implicit-sculpting)
- [Face and extremities](#face-and-extremities)
- [Surface queries and clothing](#surface-queries-and-clothing)
- [UVs and decorative relief](#uvs-and-decorative-relief)
- [Batching and honest limits](#batching-and-honest-limits)

## Coordinate and module contracts

Use `createStoneGiant(): THREE.Group` as the executable example. The factory has no document/canvas/renderer dependency. The root contains named groups for anatomy, dress, ornaments and base. Geometry is mostly baked in common object-space coordinates, not local bone-space.

Y is vertical, +Z faces forward, −X is anatomical right, and the plinth begins at Y≈0. The left foot advances to Z offset `+.17`, the right recedes to `-.17`. Shoulder/arm offsets use `dy = .085` on +X and `-.035` on −X. These are authored choices, not measurements recovered from the photograph.

Read `torsoField`, `headField`, `handField` and the `createStoneGiant` meshing calls in the exact source when changing proportions. Several decorations are authored in the same world coordinates; changing only a head mesh transform will leave facial creases/engravings behind.

## Implicit sculpting

### Oriented forms

`SculptField.oval(center, radius, blend, rotation, subtract, power)` stores a rotated ellipsoid/superellipsoid and an inverse rotation matrix. `muscle(a,b,width,depth,blend)` builds an ellipsoid halfway between endpoints, rotates its local Y to the endpoint vector, and uses half the endpoint distance as its Y radius.

A muscle is an ellipsoid, not a capsule with constant-radius endcaps. Overlap forms with a continuous torso core so their pointed ends do not create disconnected limbs.

### Distance and composition

For local radius-normalized coordinates `p`, the ordinary ellipsoid distance approximation is:

```text
k0 = length(p)
k1 = length(p / radius)
d = k1 < 1e-8 ? -min(radius) : k0 * (k0 - 1) / k1
```

For a rounded-square section with exponent `power > 2`, use the Lp norm minus one, multiplied by the minimum radius. This is an approximate distance field, not an exact Euclidean SDF.

Smooth union uses:

```text
h = max(k - abs(a - b), 0) / k
union = min(a, b) - h*h*k*0.25
subtraction = max(a, -b)
```

Keep blend widths positive. Subtraction is hard, ordered composition; later positive forms can fill an earlier cut. The face deliberately cuts cavities and then adds brow/rim forms.

### Marching Cubes

Use the official `three/addons/objects/MarchingCubes.js` as a CPU field-to-triangle converter. Fill its field with negative exterior values, store the negative signed distance, set `isolation = 0`, then call `update()`.

Evaluate each form only within a rotated conservative extent plus `blend + .12` padding. This reduces work substantially compared with evaluating every form at every cell. The reference's CPU `sample()` visits all forms; the meshing path uses these local bounds, so they are not mathematically identical at every exterior point.

Read the emitted `drawRange.count`; copy only live position/normal data into a new `BufferGeometry`. Guard the triangle allocation, transform the addon's normalized cube to the authored bounds, displace a small amount along the normals and compute final bounds. Dispose its temporary geometry/material.

| Surface | Sampling bounds: min → max | Grid resolution | Triangle allocation | Relief amplitude |
| --- | --- | ---: | ---: | ---: |
| Body | `[-2.55,.47,-1.03] → [2.55,8.92,1.58]` | 124 | 155000 | .009 |
| Head | `[-.72,8.48,-.60] → [.72,10.24,.79]` | 82 | 52000 | .0035 |
| Right hand | `[-2.65,3.55,-.18] → [-1.48,5.21,1.18]` | 55 | 28000 | .004 |
| Left hand | `[1.48,3.65,-.18] → [2.65,5.31,.85]` | 55 | 28000 | .004 |
| Pendant skull | `[-.36,6.86,.78] → [.15,7.51,1.23]` | 36 | 16000 | .0014 |
| Held rock | `[-2.65,2.70,.04] → [-1.40,4.68,1.16]` | 45 | 16000 | .035 |

Resolution is cell count per axis, not world-space voxel size. Body cells are anisotropic because the long body is mapped into a cubic grid. Check boundary padding when extending fingers, noses or ears; clipped sampling volumes create holes or flattened ends.

The current tiny displacement keeps the original implicit normals; it does not recompute smooth normals after deformation. Treat this as a small-relief approximation. For larger displacement, recompute/weld appropriately rather than assuming the existing normals remain correct.

## Face and extremities

Build the stern face from cranial vault, squared mandibular volume, cheekbones, deep orbital subtraction, angled brow muscles, a flattened nose, compressed lips, carved mouth/chin and excavated ears. Avoid a face assembled from visible eyeballs and a spherical nose.

Key exact final landmarks, with `s` equal to ±1:

- Vault: center `[0,9.49,-.005]`, radii `[.515,.60,.45]`.
- Squared face: center `[0,9.08,.125]`, radii `[.485,.49,.435]`, exponent `2.65`.
- Jaw base: center `[.005,8.82,.275]`, radii `[.39,.225,.32]`, exponent `3.15`.
- Orbit cut: center `[s*.235,9.345,.462]`, radii `[.177,.092,.152]`, Z rotation `s*.16`.
- Brow: `[s*.055,9.415,.462] → [s*.415,9.535,.362]`, width `.10`, depth `.122`, blend `.052`.
- Eye stone: center `[s*.228,9.344,.397]`, radii `[.111,.022,.019]`, Z rotation `s*.17`. Use dark, rough, non-emissive stone.
- Mouth subtraction: center `[0,8.99,.573]`, radii `[.254,.017,.058]`.

Four finger lengths are `[.44,.53,.49,.39]` plus a separate thumb. The right fingers curl over the stone to Z≈`.9`; the left fingers hang more openly. Five toes blend at the metatarsals while their tips retain separation; radius decreases from `.101` by `.009` per toe.

Preserve the reference's identity rather than reusing these coordinates for every character. The final example still has a conspicuous head/neck transition; no later source edit resolving that was made.

## Surface queries and clothing

`front(x,y,back=false)` scans from Z `2.2` to `-1.8` in `.045` steps, finds a sign crossing and bisects it nine times. For a rear query it reverses the Z sign. This is a front/back surface query, not a general nearest-point or collision algorithm.

### Wrap and belt

Generate three indexed elliptical panels, each with a `48×18` grid. Interpolate top Y `5.10` to a shaped hem. The radial fold is:

```text
(sin(angle*8 + t*1.5)*.042 + sin(angle*17 - t*3)*.016) * sin(t*PI*.85)
```

The base radii are `rx=1.015+t*.19+fold+layer`, `rz=.656+t*.235+fold*.72+layer`. While `body.sample < .047+layer`, expand X/Z by `1.015`, at most 14 iterations. Use layer offsets `0`, `.012`, `.055` for rear, lower-right and diagonal-front panels.

The belt has 96 circumferential segments, height `.295`, and its own 16-iteration clearance search. The long tail is a 48-step ribbon of width `.195`; the keeper is a curved narrow ribbon. Rings are torus meshes.

### Necklace and sandals

Resample each necklace path at 111 points. Clamp Z to at least `body.front(x,y)+radius*1.16`, then build a 150-segment tube. Radii are `.031` and `.025`; join around the back with separately checked endpoints.

Each shin band has 52 angular segments at heights `1.23`, `1.88`, `2.52`. Expand local radial coordinates by `1.017` until clearance `.019` or 32 iterations. Trace both band edges from these final points. Use curved instep bands so all toe tips remain visible.

These bounded searches can exhaust without achieving clearance; the current example does not throw on exhaustion. Inspect intersections after proportion changes. Add an explicit failure check if reusing them for unconstrained generated bodies.

## UVs and decorative relief

`stoneUV()` makes per-triangle dominant-axis box projection, not triplanar shader blending. Scale is `.63`; choose projection using the sum of each triangle's normals. Vertex color multiplies low-frequency object-space noise by slightly blue-gray RGB factors. This technique assumes the non-indexed triangle stream emitted by the implicit builder; adapt it before applying to indexed geometry.

Use `front()` to project engraving paths onto pectorals, shoulders, thighs, scalp and back. Embed dark tubes at `z - sign*thickness*.74`; shift pale rims by X `.009`, Y `.006` and resample their surface. They imitate incisions through embedded geometry; they are not all boolean-cut grooves. Keep true mouth/orbit/navel subtraction distinct from decorative shading.

## Batching and honest limits

`tapered()` sweeps a variable radius with Catmull–Rom curves and Frenet frames; it creates side faces, not a general capped watertight solid. `ribbon()` derives an in-plane perpendicular from the XY tangent; it is suitable for the authored straps, not arbitrary 3D ribbons parallel to Z.

`mergeParts()` converts parts to non-indexed geometry, keeps compatible position/normal/UV attributes, merges by material and disposes intermediates. Give the merged mesh a meaningful name. Use `InstancedMesh` for repeated studs, 115 rubble pieces, 125 moss cushions and 33 grass tufts.

The result is a detailed static miniature with four semantic groups, not a skeletal character rig, animation-ready skin, per-part explode system or production-validated watertight mesh. Shared-material meshes still generate separate draws; the measured 47 named model meshes are not total renderer passes.

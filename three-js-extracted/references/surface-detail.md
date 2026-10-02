# Surface-conforming detail: clothing, ornaments, grips

Everything attached to the body queries the same field that defines the body. Fix whole drapes in the shared sampler, never individual screenshot symptoms.

## Surface query

```text
front(x, y): scan z from far-front to far-back in ~.045 steps,
find sign crossing, bisect 9× → exact skin z at any (x, y).
Reverse z signs for rear queries.
```

This is a front/back ray query, not general nearest-point. Reused for: engraving projection, necklace drape, wear rims, strap anchors.

## Fitted clothing (parametric shell + SDF clearance)

1. Build an indexed parametric patch (angle × height grid, e.g. 48×18): elliptical radii with vertical taper, plus folds `sin(angle*8 + t*1.5)*.042` windowed by `sin(t*π*.85)` so folds fade at waist/hem.
2. **Relax against the body field**: `while body.sample(x,y,z) < clearance { x,z *= 1.015 }` — bounded (≤14–32 iterations, exhaustion does not throw; add an explicit failure check for unconstrained generated bodies).
3. Reuse the final relaxed points for hems, stitches and edging so trims follow the fitted surface.
4. Belt/tail: circumferential segments (~96) with its own clearance search; tails as width-tapered ribbons along a curve; rings as toruses; **verify fit numerically** — sample the body SDF at every clothing vertex and assert min clearance (worked: 0.047–0.114).

Adjacent separate-geometry parts need ≥0.02 world-unit seam overlap. Double-sided material for open garment shells; model cut edges (thin darker edging strips) so silhouettes read as thickness.

## Cords, necklaces, straps

- Resample each drape path (e.g. 111 points), then clamp every point: `z = max(p.z, front(p.x,p.y) + radius*1.16)` → the cord drapes ON the chest instead of intersecting it. Build as tube geometry along the path; check the join at the back separately.
- Straps/shin bands: angular segments with bounded radial push-out until clearance (~0.019); trace BOTH band edges from the final points. Curved instep bands keep toe tips visible.
- Stitching: hundreds of thin short tubes — generate, then batch (below) into one draw call.

## Engravings and incisions

- Dark engraving tubes sit **on** the skin by insetting: `z - sign * thickness * 0.74` (tube radius = thickness → 3/4 buried). They imitate incisions via embedded geometry.
- The pale weathering rim is a second, thinner tube with its OWN `front()` projection — not a constant offset — so it follows curved anatomy.
- Keep true mouth/orbit/navel field-subtractions distinct from decorative embedded shading. Grooves that change silhouette = geometry; grooves that don't = material.

## Grips and held props

Curl fingers over the FRONT face of the held object (3 segments per finger; worked lengths [.44,.53,.49,.39] + separate thumb). When a curl extends beyond the original sampling box, **enlarge that part's meshing bounds** or the tips get clipped flat. Free hand hangs more openly. Toes: blend at the metatarsals while tips keep separation; decrease radius per toe.

## Attachment contract

For every child appendage record: parent socket, local start/end, contact type (butt/overlap/socket/embed), embed depth, gap tolerance. No mid-air parts. Rig-style variants: parent index < child index, mirrored ids swap `-l`↔`-r`.

## Batching and repetition

- Merge static detail by material: convert to non-indexed, keep position/normal/UV, `mergeGeometries`, dispose intermediates, give the merged mesh a meaningful name. Thousands of stitches → one draw call.
- `InstancedMesh` for repeats: rubble 115, moss 125, grass 33 per scene, with per-instance `setColorAt` HSL jitter and `sqrt(random())` radius for even disc coverage.
- Structure gate: every mesh named; explode-by-scaling about the model center must open gaps (uniform translate opens none); picking and explode share one definition of "part".
- Honest limits: this yields a detailed static miniature — not a skeletal rig, animation skin, per-part explode system or guaranteed-watertight mesh. Shared-material merges still generate separate draws in some paths; count renderer calls, don't assume mesh count.

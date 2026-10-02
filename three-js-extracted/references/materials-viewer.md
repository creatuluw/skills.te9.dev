# Materials, procedural textures, lighting and viewer

## Procedural textures (DataTexture, zero assets)

Typed-array `DataTexture`s — no images, no Canvas, no shader injection.

**Seamless periodic domain** (the key trick): map UV angles onto 3D noise coordinates instead of sampling (x, y):

```text
a = x/size * 2π;  b = y/size * 2π
q = [cos a, sin a + cos b, sin b]
```

- Three octaves of value noise at frequencies ~4 / ~39 / ~131 (macro grain / grain / pores).
- Veins/contours: `|sin(a*9 + b*5 + 2.7*sin(b*2 + cos a) + broad*6)|`; chalk highlight = `max(0, 1 - contour/0.095)`.
- Generate color and height arrays **independently** — the bump is never a reuse of the albedo. Example bump height: `112 + grain*85 + fine*42 - fissure*87 - chalk*44`.
- Sizes 768² hero / 256² secondary (WebGL2 accepts non-power-of-two). `LinearMipmapLinearFilter`, mipmaps on, anisotropy 4, repeat.
- **Color space: sRGB on the color map ONLY.** Bump/height stay default non-color. Getting this wrong quietly flattens contrast.
- Deterministic hash-lattice noise (`Math.imul` mixing); seeded LCG only for placement.

## Material values (starting points — tune to reference crops)

| Family | Roughness | Metalness | Notes |
|---|---:|---:|---|
| Stone | .94 | 0 | map + vertex colors, bump .027 |
| Leather | .88–.97 | 0 | map, double-sided shells |
| Bone | .86 | 0 | map, bump .012 |
| Brass | .48 | .63 | patina variant .64/.48 unmapped |
| Cord/thread | 1.0 | 0 | flat colors |
| Dark recesses | .96–1 | 0 | non-emissive |
| Generic dielectric F0 | — | — | ~4%; gloss detail = LOCAL roughness 0.05–0.2, not a global change |

- PBR channels are independent: never alias albedo into roughness/normal/AO. Decompose surface response into macro/meso/micro bands with scale-tied amplitudes (macro freq 1–3, meso 6–30, micro 40–90).
- Wear as local overrides: `dirtAmount` 0–1 with cavityBias (crevices), gravity streaks, patina color, faded mask for sun-bleach; scratches expose underlayer color.
- Correct hue but wrong surface response (plastic vs metal) is the most common "flat" failure AFTER shape is right — verify a crop's material confidence <0.7 is a stop signal.
- Skin: warm base + soft rim/backlight term approximating SSS. Avoid transmission unless the reference actually shows translucency. Eyes: glossy sphere + iris decal + catchlight offset toward the key light — disproportionately important for "alive".
- Matching a specific patterned reference surface: de-light the photo (high-pass/overlay neutralization minimum) then project and bake; a procedural approximation of a patterned reference is the #1 visible failure.

## Studio rig (verified numbers)

```text
RoomEnvironment via PMREMGenerator.fromScene(room, .04), scene env intensity .38
Hemisphere  sky #dbe0dc / ground #575040, intensity .65
Warm key    #ffe4bd, intensity 3.0,  position [-6,13,9],  target [0,4,0]  — ONLY shadow caster
Cool fill   #c1d4e4, intensity 1.25, position [8,7,6]
Rear rim    #e6dbc1, intensity 2.2,  position [-3,10,-7]
Renderer: antialias, sRGB output, ACESFilmic tone mapping, exposure .95, DPR cap 1.75
```

Shadows: 2048² map, tight ortho (±7, near .5, far 32), `normalBias .024`, `bias -.00015`, PCFShadowMap (PCFSoftShadowMap is deprecated in recent three), radius ~3 for the long key shadow. Static scene: `shadowMap.autoUpdate = false` + one `needsUpdate = true` — orbiting the camera alone doesn't invalidate shadows; set `needsUpdate` when geometry/pose/lights change.

Grounding: `ShadowMaterial` plane (size 200, opacity .24) + a 128² radial-alpha contact texture `90*(1-r)^1.6` at the feet — depthWrite off, toneMapped false. Artistic grounding, not baked AO.

Prove relief survives relighting with three renders (neutral, grazing-angle, reference-matched) — otherwise the relief is painted into albedo. A gloss detail with no matching light direction renders invisible.

## Camera fit (any-angle guaranteed)

Fit every bounds CORNER in a camera-aligned basis, not just the sphere:

```text
right = normalize(worldUp × viewDir);  up = normalize(viewDir × right)
tanV = tan(FOV/2) * 0.87        // margin
tanH = tanV * aspect
distance = max over 8 corners( depth + max(|corner·right|/tanH, |corner·up|/tanV) )
```

FOV 32, pan disabled, damping .085, rotate .65, zoom .75, polar clamp ~0.2π–0.51π (keeps camera above ground). Default view direction is a direction vector, not a fixed position. On resize, preserve the user's RETAINED orbit direction and zoom ratio, recompute fit — fitting the preset direction instead of the actual orbit is a real defect. Flush damping (disable→update→re-enable) before preset jumps so pending momentum doesn't shift the view. Auto-rotate starts off; reduced-motion disables damping/auto-rotate.

## Render loop and lifecycle

- On-demand rendering: one coalescing rAF `invalidate()`, driven by controls change / damping / auto-rotate; delta clamped ≤0.05 s and passed INTO `controls.update()` (r185+ API). Stop work in hidden tabs.
- **Render once synchronously after init** — a background tab can otherwise stay blank forever, because rAF is suspended until activation. Set the debug `ready` flag only after a rendered frame, never after canvas creation.
- Debug bridge `window.__<subject>` = ready flag, scene/camera/controls/renderer/model, `setView`, `check`, validation summary — this is what automated verification drives.
- Context loss: disable controls (and guard custom keyboard handlers on `controls.enabled`), cancel animation, show recovery text; on restore rebuild the PMREM environment (old target is invalid), dirty shadows, re-render. Register cleanup even when startup throws — clean up partial init while rethrowing.
- Disposal: dedupe shared materials/textures via Sets, `instancedMesh.dispose()` (instance buffers — and `setMatrixAt` does NOT invalidate a stale bounding box; recompute in checks), `key.shadow.dispose()`, `renderLists.dispose()`, `renderer.forceContextLoss()`. RoomEnvironment (r185) misses its internal InstancedMesh — dispose it manually.

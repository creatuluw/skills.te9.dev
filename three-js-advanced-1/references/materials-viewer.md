# Materials and specimen viewer

## Contents

- [Procedural maps](#procedural-maps)
- [Material settings](#material-settings)
- [Studio settings](#studio-settings)
- [Framing and interaction](#framing-and-interaction)
- [Lifecycle](#lifecycle)

## Procedural maps

Read `surfaceMaps()` in the exact `giant.ts`. It creates typed-array `DataTexture`s without images, Canvas, DOM or shader injection. Stone uses `768×768`; leather and bone use `256×256`. These sizes are supported in WebGL2; they are not all powers of two.

Map UV angles onto periodic noise coordinates:

```text
a = x/size * 2π
b = y/size * 2π
q = [cos(a), sin(a)+cos(b), sin(b)]
```

Sample deterministic value noise at broad/grain/fine frequencies `4`, `39`, `131`. Add narrow warped sinusoidal contours for chalk, selected low-frequency fissures and high-frequency pores. Generate color and height arrays independently; the bump is not a reuse of the albedo image.

Base byte colors are stone `[117,133,137]`, leather `[159,111,49]`, bone `[194,177,130]`. Color uses `SRGBColorSpace`; bump keeps default non-color space. Both repeat, use linear magnification/trilinear mip filtering, generate mipmaps, request anisotropy 4 and set `needsUpdate`.

The noise hash uses integer coordinates and `Math.imul` constants `374761393`, `668265263`, `2147483647`, `1274126177`, then trilinear interpolation with `t*t*(3-2*t)`. Ground distribution separately uses LCG seed `8040`, multiplier `1664525`, increment `1013904223`. Repeated factories are deterministic; the root label `lithic-warden-040` is descriptive metadata, not a user-configurable random seed.

## Material settings

All values are authored artistic choices, not physically recovered measurements. Refer to source for exact complete constructors.

| Material | Base/modulation | Roughness | Metalness | Bump scale / other |
| --- | --- | ---: | ---: | --- |
| Main stone | generated map, white multiplier, vertex colors | .94 | 0 | .027 |
| Small stone details | `#abb7b8` × stone map | .94 | 0 default | .016 |
| Ochre hide | generated leather map | .88 | 0 | .024, double-sided |
| Shin straps | `#b79a7b` × leather map | .90 | 0 default | .017, double-sided |
| Cut leather edge | `#8b6338` | .97 | 0 default | no map |
| Stitch thread | `#c9b17c` | 1 | 0 default | no map |
| Brass | `#b4994c` | .48 | .63 | worn artistic mix |
| Brass patina | `#5e5638` | .64 | .48 | no map |
| Bone | generated bone map | .86 | 0 | .012 |
| Necklace cord | `#716442` | 1 | 0 default | no map |
| Dark grooves | `#4b5d60` | 1 | 0 default | embedded geometry |
| Pale engraving edges | `#adb7ac` | 1 | 0 default | thin relief |
| Recessed eyes | `#34403e` | .96 | 0 | no emission |
| Skull cavity backing | `#2c3029` | 1 | 0 default | dark recess |
| Black plinth | `#171918` | .66 | .12 | cylinder steps |

Shared map reuse does not mean shared material identity. Main stone uses vertex colors while tiny detail does not. Keep the color-space distinction intact when tuning contrast.

## Studio settings

The exact final viewer uses `WebGLRenderer({antialias:true, alpha:true, powerPreference:'high-performance'})`, sRGB output, ACES filmic tone mapping and exposure `.95`. Cap DPR at `1.75`.

| Light/environment | Settings |
| --- | --- |
| Generated room environment | `RoomEnvironment` through `PMREMGenerator.fromScene(room,.04)`, scene intensity `.38` |
| Hemisphere | sky `#dbe0dc`, ground `#575040`, intensity `.65` |
| Warm key | `#ffe4bd`, intensity `3`, position `[-6,13,9]`, target `[0,4,0]` |
| Cool fill | `#c1d4e4`, intensity `1.25`, position `[8,7,6]` |
| Rear rim | `#e6dbc1`, intensity `2.2`, position `[-3,10,-7]` |

Only the key casts a light shadow. It uses `PCFShadowMap`, `2048²`, orthographic extents ±7, near `.5`, far `32`, normal bias `.024`, bias `-.00015`, final radius `3`. Shadow-map auto-update is disabled after the initial dirty render because object geometry and lights are static; orbiting the camera alone does not invalidate it. Set `needsUpdate` when geometry, pose or light changes.

Use a `ShadowMaterial` plane of size 200 at Y `-.025`, opacity `.24`. Add a `9×9` contact plane at Y `-.018`, using a generated `128²` radial-alpha texture: `alpha=90*max(0,1-r)^1.6`. Keep its depth writes off. This is an artistic grounding shadow, not baked physical ambient occlusion.

The key still produces a long directional shadow. The saved desktop capture predates the radius-3 edit; the saved mobile capture follows it. Avoid describing either as a uniformly soft photographic light setup.

## Framing and interaction

Use perspective FOV `32°`, near `.1`, far at least `160`. Find model `Box3` bounds, center and bounding sphere. Default direction is normalized `[12,4,19]`; front is `[0,4,19]`, rear `[0,4,-22]`. These are direction vectors, not the final fixed camera positions.

Fit every bounds corner in a camera-aligned basis:

```text
right = normalize(worldUp × viewDirection)
cameraUp = normalize(viewDirection × right)
tanV = tan(FOV/2) * .87
tanH = tanV * aspect
distance = max over corners(depth + max(abs(horizontal)/tanH, abs(vertical)/tanV))
```

Set camera to target plus direction times distance. Preserve orbit direction and relative zoom through resize. Detail view fits `[-1.9,6.9,-.9] → [1.9,modelTop,1.1]`. These bounds are giant-specific and must change with the character.

OrbitControls disables pan, uses damping `.085`, rotate speed `.65`, zoom speed `.75`, and polar limits `.2π` to `.51π`. Auto-rotate speed is `.65`; it starts off. Honor reduced motion by disabling damping/auto-rotate and the auto-rotate button.

Provide native Reset/Front/Detail/Auto rotate buttons, minimum 44-pixel targets and visible focus. On the canvas, arrows orbit, plus/minus zoom, Home resets. Clear damping before a preset or keyboard move so pending momentum does not shift the requested view. Reset must stop auto-rotation.

Use a specimen-first layout: warm charcoal `#252522`, restrained ochre `#c2a16b`, system Palatino-family serif title and Segoe-family controls. No remote fonts. Mobile below 700px removes the caption note and reserves stage space above the controls.

## Lifecycle

Use one requestAnimationFrame chain, scheduled on controls changes, damping and optional auto-rotate. Coalesce invalidations and stop work in hidden tabs. **Render once synchronously after initialization**, because a newly opened background tab can otherwise remain blank forever until activated. Set debug `ready` only after a rendered frame, not after creating the canvas.

Expose `window.__stoneGiant` with scene/camera/controls/renderer/model, `setView`, `check`, validation summary and readiness. It exists for inspection; browser-only changes are not persistent source edits.

Handle WebGL initialization failure with actionable text. On context loss, disable controls, cancel pending animation and show recovery guidance. On restore, rebuild the generated environment, dirty shadows and request a render. The final session exercised ordinary rendering/controls; it did not establish a complete real-device context-loss recovery matrix.

Cleanup disconnects ResizeObserver, aborts DOM listeners, removes control listeners, disposes controls, unique geometries/materials/textures, instances, light shadows and PMREM render target, clears render lists/scene, disposes renderer, loses context, removes canvas and clears the debug reference. Preserve back-forward-cache pages on persisted `pagehide`; handle Vite HMR separately.

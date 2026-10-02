# Validation and offline delivery

## Contents

- [Check in layers](#check-in-layers)
- [Browser procedure](#browser-procedure)
- [Quality limits](#quality-limits)
- [Single-file packaging](#single-file-packaging)
- [Evidence format](#evidence-format)

## Check in layers

### Compile and construct

From a working copy of `assets/stone-giant/`, run `npm ci`, `npm run check`, then `npm run build`. The example declares Node `^20.19.0 || >=22.12.0`; use the lockfile rather than automatically upgrading dependencies.

`checkStoneGiant()` runs when the viewer constructs the model. It checks finite object matrices; nonempty XYZ positions; finite attributes and morph attributes; integer in-range indices; complete triangle counts; finite nonempty local/world bounds; valid instance counts, matrices and colors; and named identity parts.

The giant-specific gates are at most 180 meshes and 400000 instanced triangles; ground Y from `-.02` to `.5`; top at most `10.5`; height at least `9`; width within `[3,9]`; depth within `[2,9]`. Required names match torso, head, both hands, wrap, skull, sandal, rock-in-hand and plinth.

Run one negative case by corrupting a disposable model's instance transform with NaN and confirm the check throws. Do not mutate the only live model without restoring it. The original viewer worker reported this negative check and finite-bound rejection; its visible tool record is preserved in the separate archive.

These assertions detect corrupt geometry, not anatomical quality, collisions, manifoldness or likeness. Adapt subject-specific limits when changing the character.

### Runtime

Wait for an actual rendered frame via `window.__stoneGiant.ready`. Inspect `validation.passed`, and rerun `window.__stoneGiant.check()` when needed. A canvas may exist before geometry, shader compilation or the first draw has finished.

Test Front, Detail, Reset and Auto rotate. Verify camera state changes, Reset disables auto-rotate, arrow-key dispatch changes camera position, and zoom stays within limits. Inspect real pointer/pinch behavior when touch interaction is a delivery requirement; the historical main-window checks did not certify a physical touch device.

### Visual

Compare the visible reference angle, front, rear and a face crop. Use the rear only for coherence, not photo-matching an unseen view. Capture desktop and narrow portrait framing with the full head and plinth visible.

Priority order: camera/framing → silhouette/proportions → facial expression/neck attachment → clothing/prop attachment → material response → microdetails. Keep one correction category per comparison so the cause is traceable.

## Browser procedure

Use the host's requested real browser. Open a new task-owned tab; do not repurpose the user's tabs. Read live tool schemas: in this session BrowserOS neo used numeric `page`, not older `tabId` examples; evaluation requires `return` to obtain values.

Save the returned opaque session handle when available. Session ownership changed across turns in the original tool adapter, leaving earlier test tabs inaccessible to a later session. Do not copy this failure as normal practice or claim all tabs were closed. The final standalone test tab was explicitly closed; cleanup of the earlier studio tabs was not confirmed.

Use actual viewport emulation, not only screenshot output size, for responsive checks. The original mobile viewport was `390×844`; desktop capture was `1440×1100`.

A useful evaluation body is:

```javascript
const d = window.__stoneGiant;
if (!d?.ready) throw new Error('No rendered frame');
return {
  ready: d.ready,
  geometry: d.check().passed,
  externalRequests: performance.getEntriesByType('resource').map(r => r.name),
  externalAssets: document.querySelectorAll('script[src],link[href],img[src]').length,
  overflow: document.documentElement.scrollWidth > innerWidth,
};
```

Check resources on the exported file, not a Vite page whose development imports are expected. Close owned test tabs in `finally` where possible, and record timeout/ownership cleanup failures honestly. Keep screenshot data in the workspace rather than relying on a chat attachment remaining available.

## Quality limits

The reference implementation is a stylized procedural interpretation. Its published metrics prove geometry scale and integrity, not measured reconstruction fidelity. Specifically:

- No numeric fidelity/IoU/SSIM score was calculated.
- Back anatomy and garment back are inferred.
- The head/neck transition remained a visible candidate for improvement when the user chose export.
- Leather is mostly double-sided shells with modeled edges, not fully thick cloth.
- Dense mottling, anatomical separation and proportions differ from the photograph.
- Embedded line geometry imitates many incisions; it is not equivalent to carved watertight topology.
- No animation rig, physics, per-part selection/explosion or complete formal intersection gate was delivered.
- Static inspection found no additional critical defect, but remote SAST/SCA did not run because no API key was available.

Do not advertise the example as photogrammetry, a scan, perfect likeness, AAA-certified output or a completed gated reconstruction pipeline.

## Single-file packaging

The original operation replaced the production HTML's external module and stylesheet with their file contents. Three.js was already bundled by Vite; textures were generated at runtime, and fonts were system fallbacks. Inline escaping prevents a literal closing script tag from terminating the HTML element.

The reusable `scripts/inline_vite.py` preserves that narrow method and adds local path containment, explicit dependency rejection and no-overwrite checks. It performs no npm/build commands itself. Run its self-test first when changing it:

```bash
uv run /path/to/skill/scripts/inline_vite.py --self-test
uv run /path/to/skill/scripts/inline_vite.py /path/to/project/dist /path/to/project/new-character.html
```

It accepts one external `.js` and one stylesheet `.css`. It rejects imports/chunks, unresolved CSS URLs/imports, unsupported resource elements and escaping/remote asset paths. This is conservative text validation for trusted Vite output, not a full JavaScript parser or security sandbox. If a future project has chunked imports, workers or image files, use an appropriate real bundling step rather than stripping those dependencies blindly.

Test by opening the result using `file://`, with the dev server unnecessary. Require a rendered model, passing geometry checks, working controls and zero resource requests. Retain Three.js's license; the bundled example includes `THREE-LICENSE.txt` alongside the unchanged source and HTML.

## Evidence format

Record compact facts rather than unobserved success claims:

```text
Artifact: path + SHA-256
Build: command + exit status
Geometry: mesh/triangle counts + bounds
Views: filenames + camera/viewport + defects still visible
Interaction: exact controls exercised + result
Offline: file:// URL + ready + resource request count
Limitations: observed approximations + unrun gates/scans
```

Keep provenance hashes in the exemplar manifest. Treat preserved screenshots as historical evidence with their recorded stages, not screenshots of an arbitrarily modified future copy.

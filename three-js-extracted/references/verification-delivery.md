# Verification, correction loop, offline delivery

## Check in layers — in order

1. **Compile/construct.** `npm ci` (lockfile, no auto-upgrades) → `npm run check` → `npm run build`. The model factory must construct without a browser (Node smoke test: finite-attribute scan, per-part triangle table, budget assertions, determinism deep-equal).
2. **Constructor self-check.** Finite matrices, nonempty XYZ positions, finite attributes, in-range indices, complete triangle counts, finite nonempty bounds, valid instance matrices/colors, required identity part NAMES present, subject budgets (meshes/triangles/height/width/depth — set per subject, don't inherit the giant's). **Run one negative test**: corrupt a disposable instance transform with NaN and confirm the check throws. A check that can't fail proves nothing.
3. **Runtime gate.** Open a task-owned browser tab, wait for `window.__<subject>.ready` (a real rendered frame) — NOT canvas existence. Then read `validation.passed`.
4. **Visual inspection.** Reference-angle, front, rear, face-detail crops; desktop AND narrow portrait framing. One screenshot, one defect statement, one shared-function source edit, one recapture.
5. **Controls.** View buttons, arrow-key orbit, plus/minus zoom, Home reset, auto-rotate toggle (reset must stop it), mobile framing, external request count.

## What gates can and cannot prove

- **Multi-angle or it didn't happen.** A single front view survived: a hole through a skull, a hat at hip height, a charm under the ground plane — 8 rounds. Non-planar forms need ≥2 angles (turntable 0/90/180/270); orbit views judged by self-consistency, never against angles the photo doesn't cover.
- A fused mesh wearing a projected photo passes every pixel gate — only a structure/parts check catches it.
- Photo-vs-render pixel scores (SSIM/IoU) are dominated by framing/background/lighting (a faithful model scored IoU 0.165 on a background mismatch). Trust: align-then-IoU, palette ΔE, pHash, part-presence; treat raw SSIM as advisory.
- Global pixel scores run on downsampled grids — small features vanish before comparison. Measure small parts on their visible footprint, never color-gate a concave feature (dark = cavity shading).
- Vision blindspots to compensate for: ~15–20 luminance steps invisible, elements <15px invisible, counting degrades past 15 items. Use grid sampling and region isolation.
- Fidelity scale for honest reporting: 0.4 recognizable silhouette · 0.6 macro+meso correct, material weak · 0.75 reads correctly, details approximate · 0.85 strong real-time match · 0.95 near-reference (needs multiple views or manual art). Don't claim 0.9+ from one image.

## Correction loop (bounded)

One correction category per loop, in priority order: **camera/framing → silhouette/proportions → face → clothing/attachment → materials → lighting → microdetail.** Recapture everything after each group. Defaults: ≤3 corrections per pass, 6 total, then hard stop and report.

After each pass exactly one verdict: continue / refine-spec (spec wrong: missing component, wrong primitive family, wrong proportions) / refine-code (spec sound, implementation wrong) / request-input (hidden geometry, uninferrable material) / stop. State what changed with exact values and what still doesn't match — over-claiming destroys iteration.

Proven symptom→fix pairs (pattern, not an exhaustive list):

| Symptom | Fix at the shared source |
|---|---|
| Wrong expression | Landmark geometry (brow run, orbit cut, eye-stone size/depth), not material tweaks |
| Engraving floats above skin | Inset `front() - 0.74×thickness`; re-project rim independently |
| Cord/necklace intersects body | Clamp every path sample to `front() + radius×1.16` |
| Garment poke-through | Bounded SDF clearance relaxation on all vertices, verify min clearance numerically |
| Grip reads as hanging | Curl fingers over the object's front face + extend the sampling bounds |
| Meshing buffer overflow | Raise allocation or lower resolution; assert `drawRange.count` |
| Blank first frame in background tab | One synchronous render after init |

## Browser procedure

Open a NEW task-owned tab; don't repurpose user tabs. Read the live tool schema (parameter names drift between versions). Save session handles; close owned tabs in `finally`; report honestly when ownership/timers fail. Use real viewport emulation (e.g. 390×844 mobile, 1440×1100 desktop), not just screenshot size. Keep screenshots as workspace files, not chat attachments.

Evaluation body that works:

```javascript
const d = window.__<subject>;
if (!d?.ready) throw new Error('No rendered frame');
return {
  ready: d.ready,
  geometry: d.check().passed,
  externalRequests: performance.getEntriesByType('resource').map(r => r.name),
  externalAssets: document.querySelectorAll('script[src],link[href],img[src]').length,
  overflow: document.documentElement.scrollWidth > innerWidth,
};
```

Check external resources on the exported file, not a dev server (dev imports are expected there).

## Offline single-file delivery

After a clean production build, inline the one JS + one CSS into the HTML:

```bash
uv run <skill>/scripts/inline_vite.py --self-test
uv run <skill>/scripts/inline_vite.py <project>/dist <project>/<subject>.html
```

The inliner accepts exactly the one-JS/one-CSS Vite layout, rejects imports/chunks/unresolved CSS URLs/remote assets, enforces local path containment, refuses to overwrite. Run its self-test when modifying it. For chunked builds/workers/image assets, use a real bundling step instead of stripping dependencies blindly.

Then verify the FILE, not the dev server: open via `file://`, require rendered model + passing checks + working controls + **zero** resource requests. Preserve Three.js license text alongside.

## Evidence format (record facts, not success claims)

```text
Artifact: path + SHA-256
Build: command + exit status
Geometry: mesh/triangle counts + bounds
Views: filenames + camera/viewport + defects still visible
Interaction: exact controls exercised + result
Offline: file:// URL + ready + resource request count
Limitations: observed approximations + unrun gates/scans
```

Security posture: official packages + lockfile integrity, loopback-only dev server, local-only packaging, cap DPR/geometry/continuous rendering. `npm audit` + local pattern scans are hygiene; a scan that couldn't run (missing key) is reported as not run, never as passed.

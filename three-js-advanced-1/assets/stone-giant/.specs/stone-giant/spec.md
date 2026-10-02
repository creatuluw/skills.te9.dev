# Stone giant — procedural miniature

## Feature overview

Build an interactive Three.js sculpture inspired by `E:/.neo-work/work040hq.jpg`. All application and geometry logic is TypeScript. HTML is only the browser entry; no models, image textures, remote art, UI framework, or backend.

The target is a tall, muscular humanoid miniature, not a robot made of separate boulders. This is a procedural interpretation, not an exact scan. Hidden surfaces and depth are inferred from one photograph.

## Success criteria

- Strict TypeScript check and production build pass.
- Browser renders without uncaught errors; geometry has finite positions and bounds.
- Reference identity reads in three-quarter view; front and rear remain coherent.
- Orbit, zoom, reset, and optional turntable work with pointer and keyboard alternatives.
- Portrait framing retains head, feet, and plinth without horizontal overflow.

## Design goals

Primary: stern bald face, enormous shoulders tapering to a narrow waist, integrated muscular anatomy, gray stone etchings, ochre wrap, skull/bone necklace, shin straps and sandals, held rock, round mossy black plinth.

Secondary: restrained museum-like presentation and directional studio lighting. No dashboard, particle effects, glowing eyes, or invented weapon.

## User experience

Open a local viewer with the giant already framed. Drag to orbit and scroll/pinch to zoom. Small native buttons expose reset and turntable, plus keyboard orbit controls. The specimen takes priority over UI.

## Design rationale

Plain Three.js with Vite and TypeScript is the smallest maintainable browser setup. Procedural surface generation and generated textures preserve the code-only requirement. Organic surfaces must overlap smoothly or share a continuous field; broad stone muscles should not look like segmented armor.

## Constraints and assumptions

Y-up, forward +Z. Figure approximately 9.5 world units high with 0.4-unit plinth. Shoulder width approximately 3.5, waist 1.7. Head approximately 1.35 high; hanging arms reach mid-thigh. Anatomical right is -X from frontal view and carries the rock. Left foot advances slightly. Stone detail is independently authored, not traced photo pixels.

## Functional requirements

- **FR-1 Model**: named, deterministic procedural body and head with readable anatomy and stern facial features.
- **FR-2 Dress**: overlapping ochre leather wrap, broad belt, hanging strap and brass rings; visible bone/skull necklace.
- **FR-3 Extremities**: articulated-looking fingers, individual toes, brown shin straps, sandals, and held stone.
- **FR-4 Presentation**: moss/rubble on a stepped dark circular plinth; rough stone and leather materials; studio key/fill/rim lighting and contact shadow.
- **FR-5 Interaction**: responsive orbit/zoom/reset and keyboard alternatives; reduced motion respected.
- **FR-6 Verification**: runnable geometry smoke check, build, browser screenshots, and honest limitations.

## Edge cases

WebGL unavailable: display actionable text. Narrow viewport: adapt camera distance. Tab hidden: avoid unnecessary rendering. Context loss: display recovery guidance. Generated mesh budgets and device pixel ratio must be bounded. Dispose GPU resources on teardown/HMR.

## Secure design

The only security surfaces introduced are dependencies and a local development server. Use the official `three`, `vite`, `typescript`, and `@types/three` packages with exact versions and a lockfile. No runtime external requests, auth, payments, user data, file upload, dynamic code evaluation, secrets, or deletion. HTML strings are static literals only; dynamic display uses textContent.

Trust boundaries: npm registry to development machine; loopback Vite server to local browser. Threats are compromised dependencies, unintentionally serving unrelated workspace files, and GPU exhaustion. Mitigations: project-local package root, loopback binding, retained Vite filesystem/host protections, reviewed install scripts, npm audit, capped geometry/pixel ratio, and cleanup. STRIDE auth/data tampering/repudiation risks are not applicable to this static no-data viewer; file exposure, supply-chain execution and resource consumption remain applicable. A remote source scan must not be claimed if unavailable.

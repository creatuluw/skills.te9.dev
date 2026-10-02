# Sub-agent 1: scout

Visible messages and tool activity only. Private reasoning and privileged prompts are not included. Embedded images are preserved as local attachments.

## 1. user — 1788790001417

```text
Task: Read ALL six requested Three.js skill files completely and summarize actionable advice for a procedural TypeScript-only Three.js stone giant miniature (no external models). Paths E:/koningtub.nl/.agents/skills/threejs-materials/SKILL.md, threejs-fundamentals/SKILL.md, threejs-geometry/SKILL.md, threejs-interaction/SKILL.md, threejs-lighting/SKILL.md, threejs-loaders/SKILL.md. Also inspect E:/.neo-work root shallowly for existing gpt-6 folder, installed useful node/browser tooling, AGENTS.md, and nearest package.json. Do not change files. Report constraints and exact existing folder status.

[TASK INTENT: UNDERSTAND/explore-repo | Complexity: MODERATE | Domain: FRONTEND, DOCS]
```

## 2. assistant — 1788790001434

```text
I’ll read all six skills in full and inspect the workspace without changing files. I’ll also check for the requested wiki-format skill and sync tooling before attempting any wiki update.
```

```json
{
  "type": "toolCall",
  "id": "call_t4nSx9mEdOgQcZHpjrL49ux9",
  "name": "read",
  "arguments": {
    "path": "E:/koningtub.nl/.agents/skills/threejs-materials/SKILL.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_lvafS2ozfZgzcO52ua3YMVed",
  "name": "read",
  "arguments": {
    "path": "E:/koningtub.nl/.agents/skills/threejs-fundamentals/SKILL.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_Td1v5LUcPQ3bAmeKRRiocR10",
  "name": "read",
  "arguments": {
    "path": "E:/koningtub.nl/.agents/skills/threejs-geometry/SKILL.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_pArzDlFffOvTDLs3rfQmKUBl",
  "name": "read",
  "arguments": {
    "path": "E:/koningtub.nl/.agents/skills/threejs-interaction/SKILL.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_GcVxl0VXdVewZSa9oJ7KLVzL",
  "name": "read",
  "arguments": {
    "path": "E:/koningtub.nl/.agents/skills/threejs-lighting/SKILL.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_Y4gv1TUfAuqtuu7srjfGdOnm",
  "name": "read",
  "arguments": {
    "path": "E:/koningtub.nl/.agents/skills/threejs-loaders/SKILL.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_LEaVtTYnJqmPxa82yuZi7zrH",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_gmRw3m8T9pKTSt27O9tEWI21",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/SKILL.md"
  }
}
```

## 3. toolResult / read — 1788790039203

````text
---
name: threejs-materials
description: Three.js materials - PBR, basic, phong, shader materials, material properties. Use when styling meshes, working with textures, creating custom shaders, or optimizing material performance.
---

# Three.js Materials

## Quick Start

```javascript
import * as THREE from "three";

// PBR material (recommended for realistic rendering)
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.5,
  metalness: 0.5,
});

const mesh = new THREE.Mesh(geometry, material);
```

## Material Types Overview

| Material             | Use Case                              | Lighting           |
| -------------------- | ------------------------------------- | ------------------ |
| MeshBasicMaterial    | Unlit, flat colors, wireframes        | No                 |
| MeshLambertMaterial  | Matte surfaces, performance           | Yes (diffuse only) |
| MeshPhongMaterial    | Shiny surfaces, specular highlights   | Yes                |
| MeshStandardMaterial | PBR, realistic materials              | Yes (PBR)          |
| MeshPhysicalMaterial | Advanced PBR, clearcoat, transmission | Yes (PBR+)         |
| MeshToonMaterial     | Cel-shaded, cartoon look              | Yes (toon)         |
| MeshNormalMaterial   | Debug normals                         | No                 |
| MeshDepthMaterial    | Depth visualization                   | No                 |
| ShaderMaterial       | Custom GLSL shaders                   | Custom             |
| RawShaderMaterial    | Full shader control                   | Custom             |

## MeshBasicMaterial

No lighting calculations. Fast, always visible.

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide, // FrontSide, BackSide, DoubleSide
  wireframe: false,
  map: texture, // Color/diffuse texture
  alphaMap: alphaTexture, // Transparency texture
  envMap: envTexture, // Reflection texture
  reflectivity: 1, // Env map intensity
  fog: true, // Affected by scene fog
});
```

## MeshLambertMaterial

Diffuse-only lighting. Fast, no specular highlights.

```javascript
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  emissive: 0x111111, // Self-illumination color
  emissiveIntensity: 1,
  map: texture,
  emissiveMap: emissiveTexture,
  envMap: envTexture,
  reflectivity: 0.5,
});
```

## MeshPhongMaterial

Specular highlights. Good for shiny, plastic-like surfaces.

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  specular: 0xffffff, // Highlight color
  shininess: 100, // Highlight sharpness (0-1000)
  emissive: 0x000000,
  flatShading: false, // Flat vs smooth shading
  map: texture,
  specularMap: specTexture, // Per-pixel shininess
  normalMap: normalTexture,
  normalScale: new THREE.Vector2(1, 1),
  bumpMap: bumpTexture,
  bumpScale: 1,
  displacementMap: dispTexture,
  displacementScale: 1,
});
```

## MeshStandardMaterial (PBR)

Physically-based rendering. Recommended for realistic results.

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5, // 0 = mirror, 1 = diffuse
  metalness: 0.0, // 0 = dielectric, 1 = metal

  // Textures
  map: colorTexture, // Albedo/base color
  roughnessMap: roughTexture, // Per-pixel roughness
  metalnessMap: metalTexture, // Per-pixel metalness
  normalMap: normalTexture, // Surface detail
  normalScale: new THREE.Vector2(1, 1),
  aoMap: aoTexture, // Ambient occlusion (uses uv2!)
  aoMapIntensity: 1,
  displacementMap: dispTexture, // Vertex displacement
  displacementScale: 0.1,
  displacementBias: 0,

  // Emissive
  emissive: 0x000000,
  emissiveIntensity: 1,
  emissiveMap: emissiveTexture,

  // Environment
  envMap: envTexture,
  envMapIntensity: 1,

  // Other
  flatShading: false,
  wireframe: false,
  fog: true,
});

// Note: aoMap requires second UV channel
geometry.setAttribute("uv2", geometry.attributes.uv);
```

## MeshPhysicalMaterial (Advanced PBR)

Extends MeshStandardMaterial with advanced features.

```javascript
const material = new THREE.MeshPhysicalMaterial({
  // All MeshStandardMaterial properties plus:

  // Clearcoat (car paint, lacquer)
  clearcoat: 1.0, // 0-1 clearcoat layer strength
  clearcoatRoughness: 0.1,
  clearcoatMap: ccTexture,
  clearcoatRoughnessMap: ccrTexture,
  clearcoatNormalMap: ccnTexture,
  clearcoatNormalScale: new THREE.Vector2(1, 1),

  // Transmission (glass, water)
  transmission: 1.0, // 0 = opaque, 1 = fully transparent
  transmissionMap: transTexture,
  thickness: 0.5, // Volume thickness for refraction
  thicknessMap: thickTexture,
  attenuationDistance: 1, // Absorption distance
  attenuationColor: new THREE.Color(0xffffff),

  // Refraction
  ior: 1.5, // Index of refraction (1-2.333)

  // Sheen (fabric, velvet)
  sheen: 1.0,
  sheenRoughness: 0.5,
  sheenColor: new THREE.Color(0xffffff),
  sheenColorMap: sheenTexture,
  sheenRoughnessMap: sheenRoughTexture,

  // Iridescence (soap bubbles, oil slicks)
  iridescence: 1.0,
  iridescenceIOR: 1.3,
  iridescenceThicknessRange: [100, 400],
  iridescenceMap: iridTexture,
  iridescenceThicknessMap: iridThickTexture,

  // Anisotropy (brushed metal)
  anisotropy: 1.0,
  anisotropyRotation: 0,
  anisotropyMap: anisoTexture,

  // Specular
  specularIntensity: 1,
  specularColor: new THREE.Color(0xffffff),
  specularIntensityMap: specIntTexture,
  specularColorMap: specColorTexture,
});
```

### Glass Material Example

```javascript
const glass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  thickness: 0.5,
  ior: 1.5,
  envMapIntensity: 1,
});
```

### Car Paint Example

```javascript
const carPaint = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.9,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
});
```

## MeshToonMaterial

Cel-shaded cartoon look.

```javascript
const material = new THREE.MeshToonMaterial({
  color: 0x00ff00,
  gradientMap: gradientTexture, // Optional: custom shading gradient
});

// Create step gradient texture
const colors = new Uint8Array([0, 128, 255]);
const gradientMap = new THREE.DataTexture(colors, 3, 1, THREE.RedFormat);
gradientMap.minFilter = THREE.NearestFilter;
gradientMap.magFilter = THREE.NearestFilter;
gradientMap.needsUpdate = true;
```

## MeshNormalMaterial

Visualize surface normals. Useful for debugging.

```javascript
const material = new THREE.MeshNormalMaterial({
  flatShading: false,
  wireframe: false,
});
```

## MeshDepthMaterial

Render depth values. Used for shadow maps, DOF effects.

```javascript
const material = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
});
```

## PointsMaterial

For point clouds.

```javascript
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  sizeAttenuation: true, // Scale with distance
  map: pointTexture,
  alphaMap: alphaTexture,
  transparent: true,
  alphaTest: 0.5, // Discard pixels below threshold
  vertexColors: true, // Use per-vertex colors
});

const points = new THREE.Points(geometry, material);
```

## LineBasicMaterial & LineDashedMaterial

```javascript
// Solid lines
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  linewidth: 1, // Note: >1 only works on some systems
  linecap: "round",
  linejoin: "round",
});

// Dashed lines
const dashedMaterial = new THREE.LineDashedMaterial({
  color: 0xffffff,
  dashSize: 0.5,
  gapSize: 0.25,
  scale: 1,
});

// Required for dashed lines
const line = new THREE.Line(geometry, dashedMaterial);
line.computeLineDistances();
```

## ShaderMaterial

Custom GLSL shaders with Three.js uniforms.

```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color(0xff0000) },
    texture1: { value: texture },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float time;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 10.0 + time) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color;
    uniform sampler2D texture1;

    void main() {
      // Use texture2D() for GLSL 1.0, texture() for GLSL 3.0 (glslVersion: THREE.GLSL3)
      vec4 texColor = texture2D(texture1, vUv);
      gl_FragColor = vec4(color * texColor.rgb, 1.0);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
});

// Update uniform in animation loop
material.uniforms.time.value = clock.getElapsedTime();
```

### Built-in Uniforms (auto-provided)

```glsl
// Vertex shader
uniform mat4 modelMatrix;         // Object to world
uniform mat4 modelViewMatrix;     // Object to camera
uniform mat4 projectionMatrix;    // Camera projection
uniform mat4 viewMatrix;          // World to camera
uniform mat3 normalMatrix;        // For transforming normals
uniform vec3 cameraPosition;      // Camera world position

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
```

## RawShaderMaterial

Full control - no built-in uniforms/attributes.

```javascript
const material = new THREE.RawShaderMaterial({
  uniforms: {
    projectionMatrix: { value: camera.projectionMatrix },
    modelViewMatrix: { value: new THREE.Matrix4() },
  },
  vertexShader: `
    precision highp float;
    attribute vec3 position;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;

    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `,
});
```

## Common Material Properties

All materials share these base properties:

```javascript
// Visibility
material.visible = true;
material.transparent = false;
material.opacity = 1.0;
material.alphaTest = 0; // Discard pixels with alpha < value

// Rendering
material.side = THREE.FrontSide; // FrontSide, BackSide, DoubleSide
material.depthTest = true;
material.depthWrite = true;
material.colorWrite = true;

// Blending
material.blending = THREE.NormalBlending;
// NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending

// Stencil
material.stencilWrite = false;
material.stencilFunc = THREE.AlwaysStencilFunc;
material.stencilRef = 0;
material.stencilMask = 0xff;

// Polygon offset (z-fighting fix)
material.polygonOffset = false;
material.polygonOffsetFactor = 0;
material.polygonOffsetUnits = 0;

// Misc
material.dithering = false;
material.toneMapped = true;
```

## Multiple Materials

```javascript
// Assign different materials to geometry groups
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // right
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // left
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // top
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // bottom
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // front
  new THREE.MeshBasicMaterial({ color: 0x00ffff }), // back
];
const mesh = new THREE.Mesh(geometry, materials);

// Custom groups
geometry.clearGroups();
geometry.addGroup(0, 6, 0); // start, count, materialIndex
geometry.addGroup(6, 6, 1);
```

## Environment Maps

```javascript
// Load cube texture
const cubeLoader = new THREE.CubeTextureLoader();
const envMap = cubeLoader.load([
  "px.jpg",
  "nx.jpg", // positive/negative X
  "py.jpg",
  "ny.jpg", // positive/negative Y
  "pz.jpg",
  "nz.jpg", // positive/negative Z
]);

// Apply to material
material.envMap = envMap;
material.envMapIntensity = 1;

// Or set as scene environment (affects all PBR materials)
scene.environment = envMap;

// HDR environment (recommended)
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
const rgbeLoader = new RGBELoader();
rgbeLoader.load("environment.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
});
```

## Material Cloning and Modification

```javascript
// Clone material
const clone = material.clone();
clone.color.set(0x00ff00);

// Modify at runtime
material.color.set(0xff0000);
material.needsUpdate = true; // Only needed for some changes

// When needsUpdate is required:
// - Changing flat shading
// - Changing texture
// - Changing transparent
// - Custom shader code changes
```

## Performance Tips

1. **Reuse materials**: Same material = batched draw calls
2. **Avoid transparent when possible**: Transparent materials require sorting
3. **Use alphaTest instead of transparency**: When applicable, faster
4. **Choose simpler materials**: Basic > Lambert > Phong > Standard > Physical
5. **Limit active lights**: Each light adds shader complexity

```javascript
// Material pooling
const materialCache = new Map();
function getMaterial(color) {
  const key = color.toString(16);
  if (!materialCache.has(key)) {
    materialCache.set(key, new THREE.MeshStandardMaterial({ color }));
  }
  return materialCache.get(key);
}

// Dispose when done
material.dispose();
```

## See Also

- `threejs-textures` - Texture loading and configuration
- `threejs-shaders` - Custom shader development
- `threejs-lighting` - Light interaction with materials

````

## 4. toolResult / read — 1788790039203

````text
---
name: threejs-fundamentals
description: Three.js scene setup, cameras, renderer, Object3D hierarchy, coordinate systems. Use when setting up 3D scenes, creating cameras, configuring renderers, managing object hierarchies, or working with transforms.
---

# Three.js Fundamentals

## Quick Start

```javascript
import * as THREE from "three";

// Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Add a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## Core Classes

### Scene

Container for all 3D objects, lights, and cameras.

```javascript
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Solid color
scene.background = texture; // Skybox texture
scene.background = cubeTexture; // Cubemap
scene.environment = envMap; // Environment map for PBR
scene.fog = new THREE.Fog(0xffffff, 1, 100); // Linear fog
scene.fog = new THREE.FogExp2(0xffffff, 0.02); // Exponential fog
```

### Cameras

**PerspectiveCamera** - Most common, simulates human eye.

```javascript
// PerspectiveCamera(fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
  75, // Field of view (degrees)
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000, // Far clipping plane
);

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
camera.updateProjectionMatrix(); // Call after changing fov, aspect, near, far
```

**OrthographicCamera** - No perspective distortion, good for 2D/isometric.

```javascript
// OrthographicCamera(left, right, top, bottom, near, far)
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 10;
const camera = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  0.1,
  1000,
);
```

**ArrayCamera** - Multiple viewports with sub-cameras.

```javascript
const cameras = [];
for (let i = 0; i < 4; i++) {
  const subcamera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  subcamera.viewport = new THREE.Vector4(
    Math.floor(i % 2) * 0.5,
    Math.floor(i / 2) * 0.5,
    0.5,
    0.5,
  );
  cameras.push(subcamera);
}
const arrayCamera = new THREE.ArrayCamera(cameras);
```

**CubeCamera** - Renders environment maps for reflections.

```javascript
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

// Use for reflections
material.envMap = cubeRenderTarget.texture;

// Update each frame (expensive!)
cubeCamera.position.copy(reflectiveMesh.position);
cubeCamera.update(renderer, scene);
```

### WebGLRenderer

```javascript
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"), // Optional existing canvas
  antialias: true, // Smooth edges
  alpha: true, // Transparent background
  powerPreference: "high-performance", // GPU hint
  preserveDrawingBuffer: true, // For screenshots
});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Tone mapping
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Color space (Three.js r152+)
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Clear color
renderer.setClearColor(0x000000, 1);

// Render
renderer.render(scene, camera);
```

### Object3D

Base class for all 3D objects. Mesh, Group, Light, Camera all extend Object3D.

```javascript
const obj = new THREE.Object3D();

// Transform
obj.position.set(x, y, z);
obj.rotation.set(x, y, z); // Euler angles (radians)
obj.quaternion.set(x, y, z, w); // Quaternion rotation
obj.scale.set(x, y, z);

// Local vs World transforms
obj.getWorldPosition(targetVector);
obj.getWorldQuaternion(targetQuaternion);
obj.getWorldDirection(targetVector);

// Hierarchy
obj.add(child);
obj.remove(child);
obj.parent;
obj.children;

// Visibility
obj.visible = false;

// Layers (for selective rendering/raycasting)
obj.layers.set(1);
obj.layers.enable(2);
obj.layers.disable(0);

// Traverse hierarchy
obj.traverse((child) => {
  if (child.isMesh) child.material.color.set(0xff0000);
});

// Matrix updates
obj.matrixAutoUpdate = true; // Default: auto-update matrices
obj.updateMatrix(); // Manual matrix update
obj.updateMatrixWorld(true); // Update world matrix recursively
```

### Group

Empty container for organizing objects.

```javascript
const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
scene.add(group);

// Transform entire group
group.position.x = 5;
group.rotation.y = Math.PI / 4;
```

### Mesh

Combines geometry and material.

```javascript
const mesh = new THREE.Mesh(geometry, material);

// Multiple materials (one per geometry group)
const mesh = new THREE.Mesh(geometry, [material1, material2]);

// Useful properties
mesh.geometry;
mesh.material;
mesh.castShadow = true;
mesh.receiveShadow = true;

// Frustum culling
mesh.frustumCulled = true; // Default: skip if outside camera view

// Render order
mesh.renderOrder = 10; // Higher = rendered later
```

## Coordinate System

Three.js uses a **right-handed coordinate system**:

- **+X** points right
- **+Y** points up
- **+Z** points toward viewer (out of screen)

```javascript
// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper); // Red=X, Green=Y, Blue=Z
```

## Math Utilities

### Vector3

```javascript
const v = new THREE.Vector3(x, y, z);
v.set(x, y, z);
v.copy(otherVector);
v.clone();

// Operations (modify in place)
v.add(v2);
v.sub(v2);
v.multiply(v2);
v.multiplyScalar(2);
v.divideScalar(2);
v.normalize();
v.negate();
v.clamp(min, max);
v.lerp(target, alpha);

// Calculations (return new value)
v.length();
v.lengthSq(); // Faster than length()
v.distanceTo(v2);
v.dot(v2);
v.cross(v2); // Modifies v
v.angleTo(v2);

// Transform
v.applyMatrix4(matrix);
v.applyQuaternion(q);
v.project(camera); // World to NDC
v.unproject(camera); // NDC to world
```

### Matrix4

```javascript
const m = new THREE.Matrix4();
m.identity();
m.copy(other);
m.clone();

// Build transforms
m.makeTranslation(x, y, z);
m.makeRotationX(theta);
m.makeRotationY(theta);
m.makeRotationZ(theta);
m.makeRotationFromQuaternion(q);
m.makeScale(x, y, z);

// Compose/decompose
m.compose(position, quaternion, scale);
m.decompose(position, quaternion, scale);

// Operations
m.multiply(m2); // m = m * m2
m.premultiply(m2); // m = m2 * m
m.invert();
m.transpose();

// Camera matrices
m.makePerspective(left, right, top, bottom, near, far);
m.makeOrthographic(left, right, top, bottom, near, far);
m.lookAt(eye, target, up);
```

### Quaternion

```javascript
const q = new THREE.Quaternion();
q.setFromEuler(euler);
q.setFromAxisAngle(axis, angle);
q.setFromRotationMatrix(matrix);

q.multiply(q2);
q.slerp(target, t); // Spherical interpolation
q.normalize();
q.invert();
```

### Euler

```javascript
const euler = new THREE.Euler(x, y, z, "XYZ"); // Order matters!
euler.setFromQuaternion(q);
euler.setFromRotationMatrix(m);

// Rotation orders: 'XYZ', 'YXZ', 'ZXY', 'XZY', 'YZX', 'ZYX'
```

### Color

```javascript
const color = new THREE.Color(0xff0000);
const color = new THREE.Color("red");
const color = new THREE.Color("rgb(255, 0, 0)");
const color = new THREE.Color("#ff0000");

color.setHex(0x00ff00);
color.setRGB(r, g, b); // 0-1 range
color.setHSL(h, s, l); // 0-1 range

color.lerp(otherColor, alpha);
color.multiply(otherColor);
color.multiplyScalar(2);
```

### MathUtils

```javascript
THREE.MathUtils.clamp(value, min, max);
THREE.MathUtils.lerp(start, end, alpha);
THREE.MathUtils.mapLinear(value, inMin, inMax, outMin, outMax);
THREE.MathUtils.degToRad(degrees);
THREE.MathUtils.radToDeg(radians);
THREE.MathUtils.randFloat(min, max);
THREE.MathUtils.randInt(min, max);
THREE.MathUtils.smoothstep(x, min, max);
THREE.MathUtils.smootherstep(x, min, max);
```

## Common Patterns

### Proper Cleanup

```javascript
function dispose() {
  // Dispose geometries
  mesh.geometry.dispose();

  // Dispose materials
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((m) => m.dispose());
  } else {
    mesh.material.dispose();
  }

  // Dispose textures
  texture.dispose();

  // Remove from scene
  scene.remove(mesh);

  // Dispose renderer
  renderer.dispose();
}
```

### Clock for Animation

```javascript
const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta(); // Time since last frame (seconds)
  const elapsed = clock.getElapsedTime(); // Total time (seconds)

  mesh.rotation.y += delta * 0.5; // Consistent speed regardless of framerate

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

### Responsive Canvas

```javascript
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener("resize", onWindowResize);
```

### Loading Manager

```javascript
const manager = new THREE.LoadingManager();

manager.onStart = (url, loaded, total) => console.log("Started loading");
manager.onLoad = () => console.log("All loaded");
manager.onProgress = (url, loaded, total) => console.log(`${loaded}/${total}`);
manager.onError = (url) => console.error(`Error loading ${url}`);

const textureLoader = new THREE.TextureLoader(manager);
const gltfLoader = new GLTFLoader(manager);
```

## Performance Tips

1. **Limit draw calls**: Merge geometries, use instancing, atlas textures
2. **Frustum culling**: Enabled by default, ensure bounding boxes are correct
3. **LOD (Level of Detail)**: Use `THREE.LOD` for distance-based mesh switching
4. **Object pooling**: Reuse objects instead of creating/destroying
5. **Avoid `getWorldPosition` in loops**: Cache results

```javascript
// Merge static geometries
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
const merged = mergeGeometries([geo1, geo2, geo3]);

// LOD
const lod = new THREE.LOD();
lod.addLevel(highDetailMesh, 0);
lod.addLevel(medDetailMesh, 50);
lod.addLevel(lowDetailMesh, 100);
scene.add(lod);
```

## See Also

- `threejs-geometry` - Geometry creation and manipulation
- `threejs-materials` - Material types and properties
- `threejs-lighting` - Light types and shadows

````

## 5. toolResult / read — 1788790039203

````text
---
name: threejs-geometry
description: Three.js geometry creation - built-in shapes, BufferGeometry, custom geometry, instancing. Use when creating 3D shapes, working with vertices, building custom meshes, or optimizing with instanced rendering.
---

# Three.js Geometry

## Quick Start

```javascript
import * as THREE from "three";

// Built-in geometry
const box = new THREE.BoxGeometry(1, 1, 1);
const sphere = new THREE.SphereGeometry(0.5, 32, 32);
const plane = new THREE.PlaneGeometry(10, 10);

// Create mesh
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);
```

## Built-in Geometries

### Basic Shapes

```javascript
// Box - width, height, depth, widthSegments, heightSegments, depthSegments
new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);

// Sphere - radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
new THREE.SphereGeometry(1, 32, 32);
new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI); // Full sphere
new THREE.SphereGeometry(1, 32, 32, 0, Math.PI); // Hemisphere

// Plane - width, height, widthSegments, heightSegments
new THREE.PlaneGeometry(10, 10, 1, 1);

// Circle - radius, segments, thetaStart, thetaLength
new THREE.CircleGeometry(1, 32);
new THREE.CircleGeometry(1, 32, 0, Math.PI); // Semicircle

// Cylinder - radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
new THREE.CylinderGeometry(1, 1, 2, 32, 1, false);
new THREE.CylinderGeometry(0, 1, 2, 32); // Cone
new THREE.CylinderGeometry(1, 1, 2, 6); // Hexagonal prism

// Cone - radius, height, radialSegments, heightSegments, openEnded
new THREE.ConeGeometry(1, 2, 32, 1, false);

// Torus - radius, tube, radialSegments, tubularSegments, arc
new THREE.TorusGeometry(1, 0.4, 16, 100);

// TorusKnot - radius, tube, tubularSegments, radialSegments, p, q
new THREE.TorusKnotGeometry(1, 0.4, 100, 16, 2, 3);

// Ring - innerRadius, outerRadius, thetaSegments, phiSegments
new THREE.RingGeometry(0.5, 1, 32, 1);
```

### Advanced Shapes

```javascript
// Capsule - radius, length, capSegments, radialSegments
new THREE.CapsuleGeometry(0.5, 1, 4, 8);

// Dodecahedron - radius, detail
new THREE.DodecahedronGeometry(1, 0);

// Icosahedron - radius, detail (0 = 20 faces, higher = smoother)
new THREE.IcosahedronGeometry(1, 0);

// Octahedron - radius, detail
new THREE.OctahedronGeometry(1, 0);

// Tetrahedron - radius, detail
new THREE.TetrahedronGeometry(1, 0);

// Polyhedron - vertices, indices, radius, detail
const vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];
const indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
new THREE.PolyhedronGeometry(vertices, indices, 1, 0);
```

### Path-Based Shapes

```javascript
// Lathe - points[], segments, phiStart, phiLength
const points = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(0.5, 0),
  new THREE.Vector2(0.5, 1),
  new THREE.Vector2(0, 1),
];
new THREE.LatheGeometry(points, 32);

// Extrude - shape, options
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(1, 0);
shape.lineTo(1, 1);
shape.lineTo(0, 1);
shape.lineTo(0, 0);

const extrudeSettings = {
  steps: 2,
  depth: 1,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.1,
  bevelSegments: 3,
};
new THREE.ExtrudeGeometry(shape, extrudeSettings);

// Tube - path, tubularSegments, radius, radialSegments, closed
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 0, 0),
]);
new THREE.TubeGeometry(curve, 64, 0.2, 8, false);
```

### Text Geometry

```javascript
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const loader = new FontLoader();
loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const geometry = new TextGeometry("Hello", {
    font: font,
    size: 1,
    depth: 0.2, // Was 'height' in older versions
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });

  // Center text
  geometry.computeBoundingBox();
  geometry.center();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});
```

## BufferGeometry

The base class for all geometries. Stores data as typed arrays for GPU efficiency.

### Custom BufferGeometry

```javascript
const geometry = new THREE.BufferGeometry();

// Vertices (3 floats per vertex: x, y, z)
const vertices = new Float32Array([
  -1,
  -1,
  0, // vertex 0
  1,
  -1,
  0, // vertex 1
  1,
  1,
  0, // vertex 2
  -1,
  1,
  0, // vertex 3
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// Indices (for indexed geometry - reuse vertices)
const indices = new Uint16Array([
  0,
  1,
  2, // triangle 1
  0,
  2,
  3, // triangle 2
]);
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

// Normals (required for lighting)
const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

// UVs (for texturing)
const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

// Colors (per-vertex colors)
const colors = new Float32Array([
  1,
  0,
  0, // red
  0,
  1,
  0, // green
  0,
  0,
  1, // blue
  1,
  1,
  0, // yellow
]);
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
// Use with: material.vertexColors = true
```

### BufferAttribute Types

```javascript
// Common attribute types
new THREE.BufferAttribute(array, itemSize);

// Typed array options
new Float32Array(count * itemSize); // Positions, normals, UVs
new Uint16Array(count); // Indices (up to 65535 vertices)
new Uint32Array(count); // Indices (larger meshes)
new Uint8Array(count * itemSize); // Colors (0-255 range)

// Item sizes
// Position: 3 (x, y, z)
// Normal: 3 (x, y, z)
// UV: 2 (u, v)
// Color: 3 (r, g, b) or 4 (r, g, b, a)
// Index: 1
```

### Modifying BufferGeometry

```javascript
const positions = geometry.attributes.position;

// Modify vertex
positions.setXYZ(index, x, y, z);

// Access vertex
const x = positions.getX(index);
const y = positions.getY(index);
const z = positions.getZ(index);

// Flag for GPU update
positions.needsUpdate = true;

// Recompute normals after position changes
geometry.computeVertexNormals();

// Recompute bounding box/sphere after changes
geometry.computeBoundingBox();
geometry.computeBoundingSphere();
```

### Interleaved Buffers (Advanced)

```javascript
// More efficient memory layout for large meshes
const interleavedBuffer = new THREE.InterleavedBuffer(
  new Float32Array([
    // pos.x, pos.y, pos.z, uv.u, uv.v (repeated per vertex)
    -1, -1, 0, 0, 0, 1, -1, 0, 1, 0, 1, 1, 0, 1, 1, -1, 1, 0, 0, 1,
  ]),
  5, // stride (floats per vertex)
);

geometry.setAttribute(
  "position",
  new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0),
); // size 3, offset 0
geometry.setAttribute(
  "uv",
  new THREE.InterleavedBufferAttribute(interleavedBuffer, 2, 3),
); // size 2, offset 3
```

## EdgesGeometry & WireframeGeometry

```javascript
// Edge lines (only hard edges)
const edges = new THREE.EdgesGeometry(boxGeometry, 15); // 15 = threshold angle
const edgeMesh = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ color: 0xffffff }),
);

// Wireframe (all triangles)
const wireframe = new THREE.WireframeGeometry(boxGeometry);
const wireMesh = new THREE.LineSegments(
  wireframe,
  new THREE.LineBasicMaterial({ color: 0xffffff }),
);
```

## Points

```javascript
// Create point cloud
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(1000 * 3);

for (let i = 0; i < 1000; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true, // Size decreases with distance
  color: 0xffffff,
});

const points = new THREE.Points(geometry, material);
scene.add(points);
```

## Lines

```javascript
// Line (connected points)
const points = [
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 0, 0),
];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(
  geometry,
  new THREE.LineBasicMaterial({ color: 0xff0000 }),
);

// LineLoop (closed loop)
const loop = new THREE.LineLoop(geometry, material);

// LineSegments (pairs of points)
const segmentsGeometry = new THREE.BufferGeometry();
segmentsGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    new Float32Array([
      -1,
      0,
      0,
      0,
      1,
      0, // segment 1
      0,
      1,
      0,
      1,
      0,
      0, // segment 2
    ]),
    3,
  ),
);
const segments = new THREE.LineSegments(segmentsGeometry, material);
```

## InstancedMesh

Efficiently render many copies of the same geometry.

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const count = 1000;

const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

// Set transforms for each instance
const dummy = new THREE.Object3D();
const matrix = new THREE.Matrix4();

for (let i = 0; i < count; i++) {
  dummy.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
  );
  dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  dummy.scale.setScalar(0.5 + Math.random());
  dummy.updateMatrix();

  instancedMesh.setMatrixAt(i, dummy.matrix);
}

// Flag for GPU update
instancedMesh.instanceMatrix.needsUpdate = true;

// Optional: per-instance colors
instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
  new Float32Array(count * 3),
  3,
);
for (let i = 0; i < count; i++) {
  instancedMesh.setColorAt(
    i,
    new THREE.Color(Math.random(), Math.random(), Math.random()),
  );
}
instancedMesh.instanceColor.needsUpdate = true;

scene.add(instancedMesh);
```

### Update Instance at Runtime

```javascript
// Update single instance
const matrix = new THREE.Matrix4();
instancedMesh.getMatrixAt(index, matrix);
// Modify matrix...
instancedMesh.setMatrixAt(index, matrix);
instancedMesh.instanceMatrix.needsUpdate = true;

// Raycasting with instanced mesh
const intersects = raycaster.intersectObject(instancedMesh);
if (intersects.length > 0) {
  const instanceId = intersects[0].instanceId;
}
```

## InstancedBufferGeometry (Advanced)

For custom per-instance attributes beyond transform/color.

```javascript
const geometry = new THREE.InstancedBufferGeometry();
geometry.copy(new THREE.BoxGeometry(1, 1, 1));

// Add per-instance attribute
const offsets = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  offsets[i * 3] = Math.random() * 10;
  offsets[i * 3 + 1] = Math.random() * 10;
  offsets[i * 3 + 2] = Math.random() * 10;
}
geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3));

// Use in shader
// attribute vec3 offset;
// vec3 transformed = position + offset;
```

## Geometry Utilities

```javascript
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Merge geometries (must have same attributes)
const merged = BufferGeometryUtils.mergeGeometries([geo1, geo2, geo3]);

// Merge with groups (for multi-material)
const merged = BufferGeometryUtils.mergeGeometries([geo1, geo2], true);

// Compute tangents (required for normal maps)
BufferGeometryUtils.computeTangents(geometry);

// Interleave attributes for better performance
const interleaved = BufferGeometryUtils.interleaveAttributes([
  geometry.attributes.position,
  geometry.attributes.normal,
  geometry.attributes.uv,
]);
```

## Common Patterns

### Center Geometry

```javascript
geometry.computeBoundingBox();
geometry.center(); // Move vertices so center is at origin
```

### Scale to Fit

```javascript
geometry.computeBoundingBox();
const size = new THREE.Vector3();
geometry.boundingBox.getSize(size);
const maxDim = Math.max(size.x, size.y, size.z);
geometry.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);
```

### Clone and Transform

```javascript
const clone = geometry.clone();
clone.rotateX(Math.PI / 2);
clone.translate(0, 1, 0);
clone.scale(2, 2, 2);
```

### Morph Targets

```javascript
// Base geometry
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);

// Create morph target
const morphPositions = geometry.attributes.position.array.slice();
for (let i = 0; i < morphPositions.length; i += 3) {
  morphPositions[i] *= 2; // Scale X
  morphPositions[i + 1] *= 0.5; // Squash Y
}

geometry.morphAttributes.position = [
  new THREE.BufferAttribute(new Float32Array(morphPositions), 3),
];

const mesh = new THREE.Mesh(geometry, material);
mesh.morphTargetInfluences[0] = 0.5; // 50% blend
```

## Performance Tips

1. **Use indexed geometry**: Reuse vertices with indices
2. **Merge static meshes**: Reduce draw calls with `mergeGeometries`
3. **Use InstancedMesh**: For many identical objects
4. **Choose appropriate segment counts**: More segments = smoother but slower
5. **Dispose unused geometry**: `geometry.dispose()`

```javascript
// Good segment counts for common uses
new THREE.SphereGeometry(1, 32, 32); // Good quality
new THREE.SphereGeometry(1, 64, 64); // High quality
new THREE.SphereGeometry(1, 16, 16); // Performance mode

// Dispose when done
geometry.dispose();
```

## See Also

- `threejs-fundamentals` - Scene setup and Object3D
- `threejs-materials` - Material types for meshes
- `threejs-shaders` - Custom vertex manipulation

````

## 6. toolResult / read — 1788790039203

````text
---
name: threejs-interaction
description: Three.js interaction - raycasting, controls, mouse/touch input, object selection. Use when handling user input, implementing click detection, adding camera controls, or creating interactive 3D experiences.
---

# Three.js Interaction

## Quick Start

```javascript
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Raycasting for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    console.log("Clicked:", intersects[0].object);
  }
}

window.addEventListener("click", onClick);
```

## Raycaster

### Basic Raycasting

```javascript
const raycaster = new THREE.Raycaster();

// From camera (mouse picking)
raycaster.setFromCamera(mousePosition, camera);

// From any origin and direction
raycaster.set(origin, direction); // origin: Vector3, direction: normalized Vector3

// Get intersections
const intersects = raycaster.intersectObjects(objects, recursive);

// intersects array contains:
// {
//   distance: number,          // Distance from ray origin
//   point: Vector3,            // Intersection point in world coords
//   face: Face3,               // Intersected face
//   faceIndex: number,         // Face index
//   object: Object3D,          // Intersected object
//   uv: Vector2,               // UV coordinates at intersection
//   uv1: Vector2,              // Second UV channel
//   normal: Vector3,           // Interpolated face normal
//   instanceId: number         // For InstancedMesh
// }
```

### Mouse Position Conversion

```javascript
const mouse = new THREE.Vector2();

function updateMouse(event) {
  // For full window
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// For specific canvas element
function updateMouseCanvas(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}
```

### Touch Support

```javascript
function onTouchStart(event) {
  event.preventDefault();

  if (event.touches.length === 1) {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
      handleSelection(intersects[0]);
    }
  }
}

renderer.domElement.addEventListener("touchstart", onTouchStart);
```

### Raycaster Options

```javascript
const raycaster = new THREE.Raycaster();

// Near/far clipping (default: 0, Infinity)
raycaster.near = 0;
raycaster.far = 100;

// Line/Points precision
raycaster.params.Line.threshold = 0.1;
raycaster.params.Points.threshold = 0.1;

// Layers (only intersect objects on specific layers)
raycaster.layers.set(1);
```

### Efficient Raycasting

```javascript
// Only check specific objects
const clickables = [mesh1, mesh2, mesh3];
const intersects = raycaster.intersectObjects(clickables, false);

// Use layers for filtering
mesh1.layers.set(1); // Clickable layer
raycaster.layers.set(1);

// Throttle raycast for hover effects
let lastRaycast = 0;
function onMouseMove(event) {
  const now = Date.now();
  if (now - lastRaycast < 50) return; // 20fps max
  lastRaycast = now;

  // Raycast here
}
```

## Camera Controls

### OrbitControls

```javascript
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const controls = new OrbitControls(camera, renderer.domElement);

// Damping (smooth movement)
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Rotation limits
controls.minPolarAngle = 0; // Top
controls.maxPolarAngle = Math.PI / 2; // Horizon
controls.minAzimuthAngle = -Math.PI / 4; // Left
controls.maxAzimuthAngle = Math.PI / 4; // Right

// Zoom limits
controls.minDistance = 2;
controls.maxDistance = 50;

// Enable/disable features
controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = true;

// Auto-rotate
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

// Target (orbit point)
controls.target.set(0, 1, 0);

// Update in animation loop
function animate() {
  controls.update(); // Required for damping and auto-rotate
  renderer.render(scene, camera);
}
```

### FlyControls

```javascript
import { FlyControls } from "three/addons/controls/FlyControls.js";

const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 10;
controls.rollSpeed = Math.PI / 24;
controls.dragToLook = true;

// Update with delta
function animate() {
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
}
```

### FirstPersonControls

```javascript
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 10;
controls.lookSpeed = 0.1;
controls.lookVertical = true;
controls.constrainVertical = true;
controls.verticalMin = Math.PI / 4;
controls.verticalMax = (Math.PI * 3) / 4;

function animate() {
  controls.update(clock.getDelta());
}
```

### PointerLockControls

```javascript
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const controls = new PointerLockControls(camera, document.body);

// Lock pointer on click
document.addEventListener("click", () => {
  controls.lock();
});

controls.addEventListener("lock", () => {
  console.log("Pointer locked");
});

controls.addEventListener("unlock", () => {
  console.log("Pointer unlocked");
});

// Movement
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveForward = false;
const moveBackward = false;

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      moveForward = true;
      break;
    case "KeyS":
      moveBackward = true;
      break;
  }
});

function animate() {
  if (controls.isLocked) {
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.normalize();

    velocity.z -= direction.z * 0.1;
    velocity.z *= 0.9; // Friction

    controls.moveForward(-velocity.z);
  }
}
```

### TrackballControls

```javascript
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.staticMoving = true;

function animate() {
  controls.update();
}
```

### MapControls

```javascript
import { MapControls } from "three/addons/controls/MapControls.js";

const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
```

## TransformControls

Gizmo for moving/rotating/scaling objects.

```javascript
import { TransformControls } from "three/addons/controls/TransformControls.js";

const transformControls = new TransformControls(camera, renderer.domElement);
scene.add(transformControls);

// Attach to object
transformControls.attach(selectedMesh);

// Switch modes
transformControls.setMode("translate"); // 'translate', 'rotate', 'scale'

// Change space
transformControls.setSpace("local"); // 'local', 'world'

// Size
transformControls.setSize(1);

// Events
transformControls.addEventListener("dragging-changed", (event) => {
  // Disable orbit controls while dragging
  orbitControls.enabled = !event.value;
});

transformControls.addEventListener("change", () => {
  renderer.render(scene, camera);
});

// Keyboard shortcuts
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "g":
      transformControls.setMode("translate");
      break;
    case "r":
      transformControls.setMode("rotate");
      break;
    case "s":
      transformControls.setMode("scale");
      break;
    case "Escape":
      transformControls.detach();
      break;
  }
});
```

## DragControls

Drag objects directly.

```javascript
import { DragControls } from "three/addons/controls/DragControls.js";

const draggableObjects = [mesh1, mesh2, mesh3];
const dragControls = new DragControls(
  draggableObjects,
  camera,
  renderer.domElement,
);

dragControls.addEventListener("dragstart", (event) => {
  orbitControls.enabled = false;
  event.object.material.emissive.set(0xaaaaaa);
});

dragControls.addEventListener("drag", (event) => {
  // Constrain to ground plane
  event.object.position.y = 0;
});

dragControls.addEventListener("dragend", (event) => {
  orbitControls.enabled = true;
  event.object.material.emissive.set(0x000000);
});
```

## Selection System

### Click to Select

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;

function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(selectableObjects);

  // Deselect previous
  if (selectedObject) {
    selectedObject.material.emissive.set(0x000000);
  }

  // Select new
  if (intersects.length > 0) {
    selectedObject = intersects[0].object;
    selectedObject.material.emissive.set(0x444444);
  } else {
    selectedObject = null;
  }
}
```

### Box Selection

```javascript
import { SelectionBox } from "three/addons/interactive/SelectionBox.js";
import { SelectionHelper } from "three/addons/interactive/SelectionHelper.js";

const selectionBox = new SelectionBox(camera, scene);
const selectionHelper = new SelectionHelper(renderer, "selectBox"); // CSS class

document.addEventListener("pointerdown", (event) => {
  selectionBox.startPoint.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5,
  );
});

document.addEventListener("pointermove", (event) => {
  if (selectionHelper.isDown) {
    selectionBox.endPoint.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5,
    );
  }
});

document.addEventListener("pointerup", (event) => {
  selectionBox.endPoint.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5,
  );

  const selected = selectionBox.select();
  console.log("Selected objects:", selected);
});
```

### Hover Effects

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredObject = null;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(hoverableObjects);

  // Reset previous hover
  if (hoveredObject) {
    hoveredObject.material.color.set(hoveredObject.userData.originalColor);
    document.body.style.cursor = "default";
  }

  // Apply new hover
  if (intersects.length > 0) {
    hoveredObject = intersects[0].object;
    if (!hoveredObject.userData.originalColor) {
      hoveredObject.userData.originalColor =
        hoveredObject.material.color.getHex();
    }
    hoveredObject.material.color.set(0xff6600);
    document.body.style.cursor = "pointer";
  } else {
    hoveredObject = null;
  }
}

window.addEventListener("mousemove", onMouseMove);
```

## Keyboard Input

```javascript
const keys = {};

document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

function update() {
  const speed = 0.1;

  if (keys["KeyW"]) player.position.z -= speed;
  if (keys["KeyS"]) player.position.z += speed;
  if (keys["KeyA"]) player.position.x -= speed;
  if (keys["KeyD"]) player.position.x += speed;
  if (keys["Space"]) player.position.y += speed;
  if (keys["ShiftLeft"]) player.position.y -= speed;
}
```

## World-Screen Coordinate Conversion

### World to Screen

```javascript
function worldToScreen(position, camera) {
  const vector = position.clone();
  vector.project(camera);

  return {
    x: ((vector.x + 1) / 2) * window.innerWidth,
    y: (-(vector.y - 1) / 2) * window.innerHeight,
  };
}

// Position HTML element over 3D object
const screenPos = worldToScreen(mesh.position, camera);
element.style.left = screenPos.x + "px";
element.style.top = screenPos.y + "px";
```

### Screen to World

```javascript
function screenToWorld(screenX, screenY, camera, targetZ = 0) {
  const vector = new THREE.Vector3(
    (screenX / window.innerWidth) * 2 - 1,
    -(screenY / window.innerHeight) * 2 + 1,
    0.5,
  );

  vector.unproject(camera);

  const dir = vector.sub(camera.position).normalize();
  const distance = (targetZ - camera.position.z) / dir.z;

  return camera.position.clone().add(dir.multiplyScalar(distance));
}
```

### Ray-Plane Intersection

```javascript
function getRayPlaneIntersection(mouse, camera, plane) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, intersection);

  return intersection;
}

// Ground plane
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const worldPos = getRayPlaneIntersection(mouse, camera, groundPlane);
```

## Event Handling Best Practices

```javascript
class InteractionManager {
  constructor(camera, renderer, scene) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clickables = [];

    this.bindEvents();
  }

  bindEvents() {
    const canvas = this.renderer.domElement;

    canvas.addEventListener("click", (e) => this.onClick(e));
    canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    canvas.addEventListener("touchstart", (e) => this.onTouchStart(e));
  }

  updateMouse(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  getIntersects() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    return this.raycaster.intersectObjects(this.clickables, true);
  }

  onClick(event) {
    this.updateMouse(event);
    const intersects = this.getIntersects();

    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object.userData.onClick) {
        object.userData.onClick(intersects[0]);
      }
    }
  }

  addClickable(object, callback) {
    this.clickables.push(object);
    object.userData.onClick = callback;
  }

  dispose() {
    // Remove event listeners
  }
}

// Usage
const interaction = new InteractionManager(camera, renderer, scene);
interaction.addClickable(mesh, (intersect) => {
  console.log("Clicked at:", intersect.point);
});
```

## Performance Tips

1. **Limit raycasts**: Throttle mousemove handlers
2. **Use layers**: Filter raycast targets
3. **Simple collision meshes**: Use invisible simpler geometry for raycasting
4. **Disable controls when not needed**: `controls.enabled = false`
5. **Batch updates**: Group interaction checks

```javascript
// Use simpler geometry for raycasting
const complexMesh = loadedModel;
const collisionMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ visible: false }),
);
collisionMesh.userData.target = complexMesh;
clickables.push(collisionMesh);
```

## See Also

- `threejs-fundamentals` - Camera and scene setup
- `threejs-animation` - Animating interactions
- `threejs-shaders` - Visual feedback effects

````

## 7. toolResult / read — 1788790039203

````text
---
name: threejs-lighting
description: Three.js lighting - light types, shadows, environment lighting. Use when adding lights, configuring shadows, setting up IBL, or optimizing lighting performance.
---

# Three.js Lighting

## Quick Start

```javascript
import * as THREE from "three";

// Basic lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
```

## Light Types Overview

| Light            | Description            | Shadow Support | Cost     |
| ---------------- | ---------------------- | -------------- | -------- |
| AmbientLight     | Uniform everywhere     | No             | Very Low |
| HemisphereLight  | Sky/ground gradient    | No             | Very Low |
| DirectionalLight | Parallel rays (sun)    | Yes            | Low      |
| PointLight       | Omnidirectional (bulb) | Yes            | Medium   |
| SpotLight        | Cone-shaped            | Yes            | Medium   |
| RectAreaLight    | Area light (window)    | No\*           | High     |

\*RectAreaLight shadows require custom solutions

## AmbientLight

Illuminates all objects equally. No direction, no shadows.

```javascript
// AmbientLight(color, intensity)
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Modify at runtime
ambient.color.set(0xffffcc);
ambient.intensity = 0.3;
```

## HemisphereLight

Gradient from sky to ground color. Good for outdoor scenes.

```javascript
// HemisphereLight(skyColor, groundColor, intensity)
const hemi = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.6);
hemi.position.set(0, 50, 0);
scene.add(hemi);

// Properties
hemi.color; // Sky color
hemi.groundColor; // Ground color
hemi.intensity;
```

## DirectionalLight

Parallel light rays. Simulates distant light source (sun).

```javascript
// DirectionalLight(color, intensity)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);

// Light points at target (default: 0, 0, 0)
dirLight.target.position.set(0, 0, 0);
scene.add(dirLight.target);

scene.add(dirLight);
```

### DirectionalLight Shadows

```javascript
dirLight.castShadow = true;

// Shadow map size (higher = sharper, more expensive)
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

// Shadow camera (orthographic)
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;

// Shadow softness
dirLight.shadow.radius = 4; // Blur radius (PCFSoftShadowMap only)

// Shadow bias (fixes shadow acne)
dirLight.shadow.bias = -0.0001;
dirLight.shadow.normalBias = 0.02;

// Helper to visualize shadow camera
const helper = new THREE.CameraHelper(dirLight.shadow.camera);
scene.add(helper);
```

## PointLight

Emits light in all directions from a point. Like a light bulb.

```javascript
// PointLight(color, intensity, distance, decay)
const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// Properties
pointLight.distance; // Maximum range (0 = infinite)
pointLight.decay; // Light falloff (physically correct = 2)
```

### PointLight Shadows

```javascript
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

// Shadow camera (perspective - 6 directions for cube map)
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 50;

pointLight.shadow.bias = -0.005;
```

## SpotLight

Cone-shaped light. Like a flashlight or stage light.

```javascript
// SpotLight(color, intensity, distance, angle, penumbra, decay)
const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 6, 0.5, 2);
spotLight.position.set(0, 10, 0);

// Target (light points at this)
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight.target);

scene.add(spotLight);

// Properties
spotLight.angle; // Cone angle (radians, max Math.PI/2)
spotLight.penumbra; // Soft edge (0-1)
spotLight.distance; // Range
spotLight.decay; // Falloff
```

### SpotLight Shadows

```javascript
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

// Shadow camera (perspective)
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 50;
spotLight.shadow.camera.fov = 30;

spotLight.shadow.bias = -0.0001;

// Focus (affects shadow projection)
spotLight.shadow.focus = 1;
```

## RectAreaLight

Rectangular area light. Great for soft, realistic lighting.

```javascript
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

// Must initialize uniforms first
RectAreaLightUniformsLib.init();

// RectAreaLight(color, intensity, width, height)
const rectLight = new THREE.RectAreaLight(0xffffff, 5, 4, 2);
rectLight.position.set(0, 5, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

// Helper
const helper = new RectAreaLightHelper(rectLight);
rectLight.add(helper);

// Note: Only works with MeshStandardMaterial and MeshPhysicalMaterial
// Does not cast shadows natively
```

## Shadow Setup

### Enable Shadows

```javascript
// 1. Enable on renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Shadow map types:
// THREE.BasicShadowMap - fastest, low quality
// THREE.PCFShadowMap - default, filtered
// THREE.PCFSoftShadowMap - softer edges
// THREE.VSMShadowMap - variance shadow map

// 2. Enable on light
light.castShadow = true;

// 3. Enable on objects
mesh.castShadow = true;
mesh.receiveShadow = true;

// Ground plane
floor.receiveShadow = true;
floor.castShadow = false; // Usually false for floors
```

### Optimizing Shadows

```javascript
// Tight shadow camera frustum
const d = 10;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 30;

// Fix shadow acne
dirLight.shadow.bias = -0.0001; // Depth bias
dirLight.shadow.normalBias = 0.02; // Bias along normal

// Shadow map size (balance quality vs performance)
// 512 - low quality
// 1024 - medium quality
// 2048 - high quality
// 4096 - very high quality (expensive)
```

### Contact Shadows (Fake, Fast)

```javascript
import { ContactShadows } from "three/examples/jsm/objects/ContactShadows.js";

const contactShadows = new ContactShadows({
  resolution: 512,
  blur: 2,
  opacity: 0.5,
  scale: 10,
  position: [0, 0, 0],
});
scene.add(contactShadows);
```

## Light Helpers

```javascript
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

// DirectionalLight helper
const dirHelper = new THREE.DirectionalLightHelper(dirLight, 5);
scene.add(dirHelper);

// PointLight helper
const pointHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointHelper);

// SpotLight helper
const spotHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotHelper);

// Hemisphere helper
const hemiHelper = new THREE.HemisphereLightHelper(hemiLight, 5);
scene.add(hemiHelper);

// RectAreaLight helper
const rectHelper = new RectAreaLightHelper(rectLight);
rectLight.add(rectHelper);

// Update helpers when light changes
dirHelper.update();
spotHelper.update();
```

## Environment Lighting (IBL)

Image-Based Lighting using HDR environment maps.

```javascript
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const rgbeLoader = new RGBELoader();
rgbeLoader.load("environment.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  // Set as scene environment (affects all PBR materials)
  scene.environment = texture;

  // Optional: also use as background
  scene.background = texture;
  scene.backgroundBlurriness = 0; // 0-1, blur the background
  scene.backgroundIntensity = 1;
});

// PMREMGenerator for better reflections
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

rgbeLoader.load("environment.hdr", (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  texture.dispose();
  pmremGenerator.dispose();
});
```

### Cube Texture Environment

```javascript
const cubeLoader = new THREE.CubeTextureLoader();
const envMap = cubeLoader.load([
  "px.jpg",
  "nx.jpg",
  "py.jpg",
  "ny.jpg",
  "pz.jpg",
  "nz.jpg",
]);

scene.environment = envMap;
scene.background = envMap;
```

## Light Probes (Advanced)

Capture lighting from a point in space for ambient lighting.

```javascript
import { LightProbeGenerator } from "three/examples/jsm/lights/LightProbeGenerator.js";

// Generate from cube texture
const lightProbe = new THREE.LightProbe();
scene.add(lightProbe);

lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubeTexture));

// Or from render target
const cubeCamera = new THREE.CubeCamera(
  0.1,
  100,
  new THREE.WebGLCubeRenderTarget(256),
);
cubeCamera.update(renderer, scene);
lightProbe.copy(
  LightProbeGenerator.fromCubeRenderTarget(renderer, cubeCamera.renderTarget),
);
```

## Common Lighting Setups

### Three-Point Lighting

```javascript
// Key light (main light)
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Fill light (softer, opposite side)
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 3, 5);
scene.add(fillLight);

// Back light (rim lighting)
const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, 5, -5);
scene.add(backLight);

// Ambient fill
const ambient = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambient);
```

### Outdoor Daylight

```javascript
// Sun
const sun = new THREE.DirectionalLight(0xffffcc, 1.5);
sun.position.set(50, 100, 50);
sun.castShadow = true;
scene.add(sun);

// Sky ambient
const hemi = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.6);
scene.add(hemi);
```

### Indoor Studio

```javascript
// Multiple area lights
RectAreaLightUniformsLib.init();

const light1 = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
light1.position.set(3, 3, 3);
light1.lookAt(0, 0, 0);
scene.add(light1);

const light2 = new THREE.RectAreaLight(0xffffff, 3, 2, 2);
light2.position.set(-3, 3, 3);
light2.lookAt(0, 0, 0);
scene.add(light2);

// Ambient fill
const ambient = new THREE.AmbientLight(0x404040, 0.2);
scene.add(ambient);
```

## Light Animation

```javascript
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();

  // Orbit light around scene
  light.position.x = Math.cos(time) * 5;
  light.position.z = Math.sin(time) * 5;

  // Pulsing intensity
  light.intensity = 1 + Math.sin(time * 2) * 0.5;

  // Color cycling
  light.color.setHSL((time * 0.1) % 1, 1, 0.5);

  // Update helpers if using
  lightHelper.update();
}
```

## Performance Tips

1. **Limit light count**: Each light adds shader complexity
2. **Use baked lighting**: For static scenes, bake to textures
3. **Smaller shadow maps**: 512-1024 often sufficient
4. **Tight shadow frustums**: Only cover needed area
5. **Disable unused shadows**: Not all lights need shadows
6. **Use light layers**: Exclude objects from certain lights

```javascript
// Light layers
light.layers.set(1); // Light only affects layer 1
mesh.layers.enable(1); // Mesh is on layer 1
otherMesh.layers.disable(1); // Other mesh not affected

// Selective shadows
mesh.castShadow = true;
mesh.receiveShadow = true;
decorMesh.castShadow = false; // Small objects often don't need to cast
```

## See Also

- `threejs-materials` - Material light response
- `threejs-textures` - Lightmaps and environment maps
- `threejs-postprocessing` - Bloom and other light effects

````

## 8. toolResult / read — 1788790039203

````text
---
name: threejs-loaders
description: Three.js asset loading - GLTF, textures, images, models, async patterns. Use when loading 3D models, textures, HDR environments, or managing loading progress.
---

# Three.js Loaders

## Quick Start

```javascript
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Load GLTF model
const loader = new GLTFLoader();
loader.load("model.glb", (gltf) => {
  scene.add(gltf.scene);
});

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("texture.jpg");
```

## LoadingManager

Coordinate multiple loaders and track progress.

```javascript
const manager = new THREE.LoadingManager();

// Callbacks
manager.onStart = (url, loaded, total) => {
  console.log(`Started loading: ${url}`);
};

manager.onLoad = () => {
  console.log("All assets loaded!");
  startGame();
};

manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100;
  console.log(`Loading: ${progress.toFixed(1)}%`);
  updateProgressBar(progress);
};

manager.onError = (url) => {
  console.error(`Error loading: ${url}`);
};

// Use manager with loaders
const textureLoader = new THREE.TextureLoader(manager);
const gltfLoader = new GLTFLoader(manager);

// Load assets
textureLoader.load("texture1.jpg");
textureLoader.load("texture2.jpg");
gltfLoader.load("model.glb");
// onLoad fires when ALL are complete
```

## Texture Loading

### TextureLoader

```javascript
const loader = new THREE.TextureLoader();

// Callback style
loader.load(
  "texture.jpg",
  (texture) => {
    // onLoad
    material.map = texture;
    material.needsUpdate = true;
  },
  undefined, // onProgress - not supported for image loading
  (error) => {
    // onError
    console.error("Error loading texture", error);
  },
);

// Synchronous (returns texture, loads async)
const texture = loader.load("texture.jpg");
material.map = texture;
```

### Texture Configuration

```javascript
const texture = loader.load("texture.jpg", (tex) => {
  // Color space (important for color accuracy)
  tex.colorSpace = THREE.SRGBColorSpace; // For color/albedo maps
  // tex.colorSpace = THREE.LinearSRGBColorSpace;  // For data maps (normal, roughness)

  // Wrapping
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  // ClampToEdgeWrapping, RepeatWrapping, MirroredRepeatWrapping

  // Repeat/offset
  tex.repeat.set(2, 2);
  tex.offset.set(0.5, 0.5);
  tex.rotation = Math.PI / 4;
  tex.center.set(0.5, 0.5);

  // Filtering
  tex.minFilter = THREE.LinearMipmapLinearFilter; // Default
  tex.magFilter = THREE.LinearFilter; // Default
  // NearestFilter - pixelated
  // LinearFilter - smooth
  // LinearMipmapLinearFilter - smooth with mipmaps

  // Anisotropic filtering (sharper at angles)
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  // Flip Y (usually true for standard textures)
  tex.flipY = true;

  tex.needsUpdate = true;
});
```

### CubeTextureLoader

For environment maps and skyboxes.

```javascript
const loader = new THREE.CubeTextureLoader();

// Load 6 faces
const cubeTexture = loader.load([
  "px.jpg",
  "nx.jpg", // positive/negative X
  "py.jpg",
  "ny.jpg", // positive/negative Y
  "pz.jpg",
  "nz.jpg", // positive/negative Z
]);

// Use as background
scene.background = cubeTexture;

// Use as environment map
scene.environment = cubeTexture;
material.envMap = cubeTexture;
```

### HDR/EXR Loading

```javascript
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";

// HDR
const rgbeLoader = new RGBELoader();
rgbeLoader.load("environment.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
});

// EXR
const exrLoader = new EXRLoader();
exrLoader.load("environment.exr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});
```

### PMREMGenerator

Generate prefiltered environment maps for PBR.

```javascript
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBELoader().load("environment.hdr", (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  scene.environment = envMap;
  scene.background = envMap;

  texture.dispose();
  pmremGenerator.dispose();
});
```

## GLTF/GLB Loading

The most common 3D format for web.

```javascript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load("model.glb", (gltf) => {
  // The loaded scene
  const model = gltf.scene;
  scene.add(model);

  // Animations
  const animations = gltf.animations;
  if (animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model);
    animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  }

  // Cameras (if any)
  const cameras = gltf.cameras;

  // Asset info
  console.log(gltf.asset); // Version, generator, etc.

  // User data from Blender/etc
  console.log(gltf.userData);
});
```

### GLTF with Draco Compression

```javascript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
);
dracoLoader.preload();

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load("compressed-model.glb", (gltf) => {
  scene.add(gltf.scene);
});
```

### GLTF with KTX2 Textures

```javascript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath(
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/",
);
ktx2Loader.detectSupport(renderer);

const gltfLoader = new GLTFLoader();
gltfLoader.setKTX2Loader(ktx2Loader);

gltfLoader.load("model-with-ktx2.glb", (gltf) => {
  scene.add(gltf.scene);
});
```

### Process GLTF Content

```javascript
loader.load("model.glb", (gltf) => {
  const model = gltf.scene;

  // Enable shadows
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Find specific mesh
  const head = model.getObjectByName("Head");

  // Adjust materials
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.envMapIntensity = 0.5;
    }
  });

  // Center and scale
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  model.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  model.scale.setScalar(1 / maxDim);

  scene.add(model);
});
```

## Other Model Formats

### OBJ + MTL

```javascript
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

const mtlLoader = new MTLLoader();
mtlLoader.load("model.mtl", (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("model.obj", (object) => {
    scene.add(object);
  });
});
```

### FBX

```javascript
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

const loader = new FBXLoader();
loader.load("model.fbx", (object) => {
  // FBX often has large scale
  object.scale.setScalar(0.01);

  // Animations
  const mixer = new THREE.AnimationMixer(object);
  object.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  scene.add(object);
});
```

### STL

```javascript
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const loader = new STLLoader();
loader.load("model.stl", (geometry) => {
  const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});
```

### PLY

```javascript
import { PLYLoader } from "three/addons/loaders/PLYLoader.js";

const loader = new PLYLoader();
loader.load("model.ply", (geometry) => {
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});
```

## Async/Promise Loading

### Promisified Loader

```javascript
function loadModel(url) {
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

// Usage
async function init() {
  try {
    const gltf = await loadModel("model.glb");
    scene.add(gltf.scene);
  } catch (error) {
    console.error("Failed to load model:", error);
  }
}
```

### Load Multiple Assets

```javascript
async function loadAssets() {
  const [modelGltf, envTexture, colorTexture] = await Promise.all([
    loadGLTF("model.glb"),
    loadRGBE("environment.hdr"),
    loadTexture("color.jpg"),
  ]);

  scene.add(modelGltf.scene);
  scene.environment = envTexture;
  material.map = colorTexture;
}

// Helper functions
function loadGLTF(url) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(url, resolve, undefined, reject);
  });
}

function loadRGBE(url) {
  return new Promise((resolve, reject) => {
    new RGBELoader().load(
      url,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}

function loadTexture(url) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(url, resolve, undefined, reject);
  });
}
```

## Caching

### Built-in Cache

```javascript
// Enable cache
THREE.Cache.enabled = true;

// Clear cache
THREE.Cache.clear();

// Manual cache management
THREE.Cache.add("key", data);
THREE.Cache.get("key");
THREE.Cache.remove("key");
```

### Custom Asset Manager

```javascript
class AssetManager {
  constructor() {
    this.textures = new Map();
    this.models = new Map();
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  async loadTexture(key, url) {
    if (this.textures.has(key)) {
      return this.textures.get(key);
    }

    const texture = await new Promise((resolve, reject) => {
      this.textureLoader.load(url, resolve, undefined, reject);
    });

    this.textures.set(key, texture);
    return texture;
  }

  async loadModel(key, url) {
    if (this.models.has(key)) {
      return this.models.get(key).clone();
    }

    const gltf = await new Promise((resolve, reject) => {
      this.gltfLoader.load(url, resolve, undefined, reject);
    });

    this.models.set(key, gltf.scene);
    return gltf.scene.clone();
  }

  dispose() {
    this.textures.forEach((t) => t.dispose());
    this.textures.clear();
    this.models.clear();
  }
}

// Usage
const assets = new AssetManager();
const texture = await assets.loadTexture("brick", "brick.jpg");
const model = await assets.loadModel("tree", "tree.glb");
```

## Loading from Different Sources

### Data URL / Base64

```javascript
const loader = new THREE.TextureLoader();
const texture = loader.load("data:image/png;base64,iVBORw0KGgo...");
```

### Blob URL

```javascript
async function loadFromBlob(blob) {
  const url = URL.createObjectURL(blob);
  const texture = await loadTexture(url);
  URL.revokeObjectURL(url);
  return texture;
}
```

### ArrayBuffer

```javascript
// From fetch
const response = await fetch("model.glb");
const buffer = await response.arrayBuffer();

// Parse with loader
const loader = new GLTFLoader();
loader.parse(buffer, "", (gltf) => {
  scene.add(gltf.scene);
});
```

### Custom Path/URL

```javascript
// Set base path
loader.setPath("assets/models/");
loader.load("model.glb"); // Loads from assets/models/model.glb

// Set resource path (for textures referenced in model)
loader.setResourcePath("assets/textures/");

// Custom URL modifier
manager.setURLModifier((url) => {
  return `https://cdn.example.com/${url}`;
});
```

## Error Handling

```javascript
// Graceful fallback
async function loadWithFallback(primaryUrl, fallbackUrl) {
  try {
    return await loadModel(primaryUrl);
  } catch (error) {
    console.warn(`Primary failed, trying fallback: ${error}`);
    return await loadModel(fallbackUrl);
  }
}

// Retry logic
async function loadWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await loadModel(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

// Timeout
async function loadWithTimeout(url, timeout = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Loading timed out");
    }
    throw error;
  }
}
```

## Performance Tips

1. **Use compressed formats**: DRACO for geometry, KTX2/Basis for textures
2. **Load progressively**: Show placeholders while loading
3. **Lazy load**: Only load what's needed
4. **Use CDN**: Faster asset delivery
5. **Enable cache**: `THREE.Cache.enabled = true`

```javascript
// Progressive loading with placeholder
const placeholder = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ wireframe: true }),
);
scene.add(placeholder);

loadModel("model.glb").then((gltf) => {
  scene.remove(placeholder);
  scene.add(gltf.scene);
});
```

## See Also

- `threejs-textures` - Texture configuration
- `threejs-animation` - Playing loaded animations
- `threejs-materials` - Material from loaded models

````

## 9. toolResult / ls — 1788790039203

```text
_fr_openapi.json
.agents/
.dev/
.mcp.json
.pi/
3d-char/
blender-test/
bluesky-devstuff-clean.json
bluesky-devstuff.json
bluesky-discover-clean.json
bluesky-discover.json
bluesky-following-clean.json
bluesky-following.json
cdx_all.txt
cdx_dotr.txt
compare.html
dataonthe.rocks/
docs/
dotr_pages.txt
extract_dotr.py
extract_qlikshow.py
index.html
interests.json
linkedin-chunk1.json
linkedin-chunk2.json
manifest.txt
minitown/
my-feed/
nul
qlikshow.com/
render-final.png
research_company_data_sources/
research_company_data_sources_nl/
screenshots/
serve_shot.py
skills-lock.json
soldier-qa.md
soldier-ref.md
soldier.html
soldier.png
threejs-mcp-test/
threejs-test2/
trellis/
work040hq.jpg
```

## 10. toolResult / read — 1788790039203

````text
---
name: three-best-practices
description: Three.js performance optimization and best practices guidelines. Use when writing, reviewing, or optimizing Three.js code. Triggers on tasks involving 3D scenes, WebGL/WebGPU rendering, geometries, materials, textures, lighting, shaders, or TSL.
license: MIT
metadata:
  author: three-agent-skills
  version: "2.1.0"
  three-version: "0.182.0+"
---

# Three.js Best Practices

Comprehensive performance optimization guide for Three.js applications. Contains 120+ rules across 18 categories, prioritized by impact.

## Sources & Credits

> This skill compiles best practices from multiple authoritative sources:
> - Official guidelines from Three.js `llms` branch maintained by [mrdoob](https://github.com/mrdoob)
> - [100 Three.js Tips](https://www.utsubo.com/blog/threejs-best-practices-100-tips) by [Utsubo](https://www.utsubo.com) - Excellent comprehensive guide covering WebGPU, asset optimization, and performance tips

## When to Apply

Reference these guidelines when:
- Setting up a new Three.js project
- Writing or reviewing Three.js code
- Optimizing performance or fixing memory leaks
- Working with custom shaders (GLSL or TSL)
- Implementing WebGPU features
- Building VR/AR experiences with WebXR
- Integrating physics engines
- Optimizing for mobile devices

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 0 | Modern Setup & Imports | FUNDAMENTAL | `setup-` |
| 1 | Memory Management & Dispose | CRITICAL | `memory-` |
| 2 | Render Loop Optimization | CRITICAL | `render-` |
| 3 | Draw Call Optimization | CRITICAL | `drawcall-` |
| 4 | Geometry & Buffer Management | HIGH | `geometry-` |
| 5 | Material & Texture Optimization | HIGH | `material-` |
| 6 | Asset Compression | HIGH | `asset-` |
| 7 | Lighting & Shadows | MEDIUM-HIGH | `lighting-` |
| 8 | Scene Graph Organization | MEDIUM | `scene-` |
| 9 | Shader Best Practices (GLSL) | MEDIUM | `shader-` |
| 10 | TSL (Three.js Shading Language) | MEDIUM | `tsl-` |
| 11 | WebGPU Renderer | MEDIUM | `webgpu-` |
| 12 | Loading & Assets | MEDIUM | `loading-` |
| 13 | Core Web Vitals | MEDIUM-HIGH | `vitals-` |
| 14 | Camera & Controls | LOW-MEDIUM | `camera-` |
| 15 | Animation System | MEDIUM | `animation-` |
| 16 | Physics Integration | MEDIUM | `physics-` |
| 17 | WebXR / VR / AR | MEDIUM | `webxr-` |
| 18 | Audio | LOW-MEDIUM | `audio-` |
| 19 | Post-Processing | MEDIUM | `postpro-` |
| 20 | Mobile Optimization | HIGH | `mobile-` |
| 21 | Production | HIGH | `error-`, `migration-` |
| 22 | Debug & DevTools | LOW | `debug-` |

## Quick Reference

### 0. Modern Setup (FUNDAMENTAL)

- `setup-use-import-maps` - Use Import Maps, not old CDN scripts
- `setup-choose-renderer` - WebGLRenderer (default) vs WebGPURenderer (TSL/compute)
- `setup-animation-loop` - Use `renderer.setAnimationLoop()` not manual RAF
- `setup-basic-scene-template` - Complete modern scene template

### 1. Memory Management (CRITICAL)

- `memory-dispose-geometry` - Always dispose geometries
- `memory-dispose-material` - Always dispose materials and textures
- `memory-dispose-textures` - Dispose dynamically created textures
- `memory-dispose-render-targets` - Always dispose WebGLRenderTarget
- `memory-dispose-recursive` - Use recursive disposal for hierarchies
- `memory-dispose-on-unmount` - Dispose in React cleanup/unmount
- `memory-renderer-dispose` - Dispose renderer when destroying view
- `memory-reuse-objects` - Reuse geometries and materials

### 2. Render Loop (CRITICAL)

- `render-single-raf` - Single requestAnimationFrame loop
- `render-conditional` - Render on demand for static scenes
- `render-delta-time` - Use delta time for animations
- `render-avoid-allocations` - Never allocate in render loop
- `render-cache-computations` - Cache expensive computations
- `render-frustum-culling` - Enable frustum culling
- `render-update-matrix-manual` - Disable auto matrix updates for static objects
- `render-pixel-ratio` - Limit pixel ratio to 2
- `render-antialias-wisely` - Use antialiasing judiciously

### 3. Draw Call Optimization (CRITICAL)

- `draw-call-optimization` - Target under 100 draw calls per frame
- `geometry-instanced-mesh` - Use InstancedMesh for identical objects
- `geometry-batched-mesh` - Use BatchedMesh for varied geometries (same material)
- `geometry-merge-static` - Merge static geometries with BufferGeometryUtils

### 4. Geometry (HIGH)

- `geometry-buffer-geometry` - Always use BufferGeometry
- `geometry-merge-static` - Merge static geometries
- `geometry-instanced-mesh` - Use InstancedMesh for identical objects
- `geometry-lod` - Use Level of Detail for complex models
- `geometry-index-buffer` - Use indexed geometry
- `geometry-vertex-count` - Minimize vertex count
- `geometry-attributes-typed` - Use appropriate typed arrays
- `geometry-interleaved` - Consider interleaved buffers

### 5. Materials & Textures (HIGH)

- `material-reuse` - Reuse materials across meshes
- `material-simplest-sufficient` - Use simplest material that works
- `material-texture-size-power-of-two` - Power-of-two texture dimensions
- `material-texture-compression` - Use compressed textures (KTX2/Basis)
- `material-texture-mipmaps` - Enable mipmaps appropriately
- `material-texture-anisotropy` - Use anisotropic filtering for floors
- `material-texture-atlas` - Use texture atlases
- `material-avoid-transparency` - Minimize transparent materials
- `material-onbeforecompile` - Use onBeforeCompile for shader mods (or TSL)

### 6. Asset Compression (HIGH)

- `asset-compression` - Draco, Meshopt, KTX2 compression guide
- `asset-draco` - 90-95% geometry size reduction
- `asset-ktx2` - GPU-compressed textures (UASTC vs ETC1S)
- `asset-meshopt` - Alternative to Draco with faster decompression
- `asset-lod` - Level of Detail for 30-40% frame rate improvement

### 7. Lighting & Shadows (MEDIUM-HIGH)

- `lighting-limit-lights` - Limit to 3 or fewer active lights
- `lighting-shadows-advanced` - PointLight cost, CSM, fake shadows
- `lighting-bake-static` - Bake lighting for static scenes
- `lighting-shadow-camera-tight` - Fit shadow camera tightly
- `lighting-shadow-map-size` - Choose appropriate shadow resolution (512-4096)
- `lighting-shadow-selective` - Enable shadows selectively
- `lighting-shadow-cascade` - Use CSM for large scenes
- `lighting-shadow-auto-update` - Disable autoUpdate for static scenes
- `lighting-probe` - Use Light Probes
- `lighting-environment` - Environment maps for ambient light
- `lighting-fake-shadows` - Gradient planes for budget contact shadows

### 8. Scene Graph (MEDIUM)

- `scene-group-objects` - Use Groups for organization
- `scene-layers` - Use Layers for selective rendering
- `scene-visible-toggle` - Use visible flag, not add/remove
- `scene-flatten-static` - Flatten static hierarchies
- `scene-name-objects` - Name objects for debugging
- `object-pooling` - Reuse objects instead of create/destroy

### 9. Shaders GLSL (MEDIUM)

- `shader-precision` - Use mediump for mobile (~2x faster)
- `shader-mobile` - Mobile-specific optimizations (varyings, branching)
- `shader-avoid-branching` - Replace conditionals with mix/step
- `shader-precompute-cpu` - Precompute on CPU
- `shader-avoid-discard` - Avoid discard, use alphaTest
- `shader-texture-lod` - Use textureLod for known mip levels
- `shader-uniform-arrays` - Prefer uniform arrays
- `shader-varying-interpolation` - Limit varyings to 3 for mobile
- `shader-pack-data` - Pack data into RGBA channels
- `shader-chunk-injection` - Use Three.js shader chunks

### 10. TSL - Three.js Shading Language (MEDIUM)

- `tsl-why-use` - Use TSL instead of onBeforeCompile
- `tsl-setup-webgpu` - WebGPU setup for TSL
- `tsl-complete-reference` - Full TSL type system and functions
- `tsl-material-slots` - Material node properties reference
- `tsl-node-materials` - Use NodeMaterial classes
- `tsl-basic-operations` - Types, operations, swizzling
- `tsl-functions` - Creating TSL functions with Fn()
- `tsl-conditionals` - If, select, loops in TSL
- `tsl-textures` - Textures and triplanar mapping
- `tsl-noise` - Built-in noise functions (mx_noise_float, mx_fractal_noise)
- `tsl-post-processing` - bloom, blur, dof, ao
- `tsl-compute-shaders` - GPGPU and compute operations
- `tsl-glsl-to-tsl` - GLSL to TSL translation

### 11. WebGPU Renderer (MEDIUM)

- `webgpu-renderer` - Setup, browser support, migration guide
- `webgpu-render-async` - Use renderAsync for compute-heavy scenes
- `webgpu-feature-detection` - Check adapter features
- `webgpu-instanced-array` - GPU-persistent buffers
- `webgpu-storage-textures` - Read-write compute textures
- `webgpu-workgroup-memory` - Shared memory (10-100x faster)
- `webgpu-indirect-draws` - GPU-driven rendering

### 12. Loading & Assets (MEDIUM)

- `loading-draco-compression` - Use Draco for large meshes
- `loading-gltf-preferred` - Use glTF format
- `gltf-loading-optimization` - Full loader setup with DRACO/Meshopt/KTX2
- `loading-progress-feedback` - Show loading progress
- `loading-async-await` - Use async/await for loading
- `loading-lazy` - Lazy load non-critical assets
- `loading-cache-assets` - Enable caching
- `loading-dispose-unused` - Unload unused assets

### 13. Core Web Vitals (MEDIUM-HIGH)

- `core-web-vitals` - LCP, FID, CLS optimization for 3D
- `vitals-lazy-load` - Lazy load 3D below the fold with IntersectionObserver
- `vitals-code-split` - Dynamic import Three.js modules
- `vitals-preload` - Preload critical assets with link tags
- `vitals-progressive-loading` - Low-res to high-res progressive load
- `vitals-placeholders` - Show placeholder geometry during load
- `vitals-web-workers` - Offload heavy work to workers
- `vitals-streaming` - Stream large scenes by chunks

### 14. Camera & Controls (LOW-MEDIUM)

- `camera-near-far` - Set tight near/far planes
- `camera-fov` - Choose appropriate FOV
- `camera-controls-damping` - Use damping for smooth controls
- `camera-resize-handler` - Handle resize properly
- `camera-orbit-limits` - Set orbit control limits

### 15. Animation (MEDIUM)

- `animation-system` - AnimationMixer, blending, morph targets, skeletal

### 16. Physics (MEDIUM)

- `physics-integration` - Rapier, Cannon-es integration patterns
- `physics-compute-shaders` - GPU physics with compute shaders

### 17. WebXR (MEDIUM)

- `webxr-setup` - VR/AR buttons, controllers, hit testing

### 18. Audio (LOW-MEDIUM)

- `audio-spatial` - PositionalAudio, HRTF, spatial sound

### 19. Post-Processing (MEDIUM)

- `postprocessing-optimization` - pmndrs/postprocessing guide
- `postpro-renderer-config` - Disable AA, stencil, depth for post
- `postpro-merge-effects` - Combine effects in single pass
- `postpro-selective-bloom` - Selective bloom for performance
- `postpro-resolution-scaling` - Half resolution for 2x FPS
- `postpro-webgpu-native` - TSL-based post for WebGPU

### 20. Optimization (HIGH)

- `mobile-optimization` - Mobile-specific optimizations and checklist
- `raycasting-optimization` - BVH, layers, GPU picking

### 21. Production (HIGH)

- `error-handling-recovery` - WebGL context loss and recovery
- `migration-checklist` - Breaking changes by version

### 22. Debug & DevTools (LOW)

- `debug-devtools` - Complete debugging toolkit
- `debug-stats-gl` - stats-gl for WebGL/WebGPU monitoring
- `debug-lil-gui` - lil-gui for live parameter tweaking
- `debug-spector` - Spector.js for WebGL frame capture
- `debug-renderer-info` - Monitor draw calls and memory
- `debug-three-mesh-bvh` - Fast raycasting with BVH
- `debug-context-lost` - Handle WebGL context loss
- `debug-animation-loop-profiling` - Profile render loop sections
- `debug-conditional` - Remove debug code in production

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/setup-use-import-maps.md
rules/memory-dispose-geometry.md
rules/tsl-complete-reference.md
rules/mobile-optimization.md
```

Each rule file contains:
- Brief explanation of why it matters
- BAD code example with explanation
- GOOD code example with explanation
- Additional context and references

## Key Patterns

### Modern Import Maps

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/",
    "three/tsl": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.tsl.js"
  }
}
</script>
```

### Proper Disposal

```javascript
function disposeObject(obj) {
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(m => m.dispose());
    } else {
      obj.material.dispose();
    }
  }
}
```

### TSL Basic Usage

```javascript
import { texture, uv, color, time, sin } from 'three/tsl';

const material = new THREE.MeshStandardNodeMaterial();
material.colorNode = texture(map).mul(color(0xff0000));
material.colorNode = color(0x00ff00).mul(sin(time).mul(0.5).add(0.5));
```

### Mobile Detection

```javascript
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
```

````

## 11. assistant — 1788790039205

```json
{
  "type": "toolCall",
  "id": "call_5AEfkuV5Ag1kBIRfhZH6Myml",
  "name": "bash",
  "arguments": {
    "command": "pwd; command -v node npm npx bun pnpm yarn tsc vite esbuild playwright chromium chromium-browser google-chrome firefox python python3 git; node --version; npm --version",
    "timeout": 30
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_4tKKTRGcIu66TN2hMigw3b5o",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/docs"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_MyjNGt394j3tK42kEEAX3etK",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/.dev"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_yVgIVjzwakvSYGHEbpjrjCil",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/.agents"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_kKFTv6gm35gpeTmZfTR19Due",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/.pi"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_nmbPu3qRfs1grXNYiUbYJqhg",
  "name": "read",
  "arguments": {
    "path": "C:/Users/PTW/.pi/agent/git/github.com/DietrichGebert/ponytail/skills/ponytail/SKILL.md"
  }
}
```

## 12. toolResult / bash — 1788790059450

```text
/e/.neo-work
/c/Program Files/nodejs/node
/c/Program Files/nodejs/npm
/c/Program Files/nodejs/npx
/c/Users/PTW/AppData/Roaming/npm/bun
/c/Users/PTW/AppData/Roaming/npm/pnpm
/c/Users/PTW/AppData/Local/Programs/Python/Python312/Scripts/playwright
/c/Users/PTW/AppData/Local/Programs/Python/Python312/python
/c/Users/PTW/AppData/Local/Microsoft/WindowsApps/python3
/mingw64/bin/git
v24.15.0
11.12.1

```

## 13. toolResult / ls — 1788790059450

```text
wiki/
```

## 14. toolResult / ls — 1788790059450

```text
mcp.err.log
mcp.out.log
serve.js
```

## 15. toolResult / ls — 1788790059450

```text
skills/
```

## 16. toolResult / ls — 1788790059450

```text
skills/
todos/
```

## 17. toolResult / read — 1788790059450

```text
---
name: ponytail
description: >
  Forces the laziest solution that actually works, simplest, shortest, most
  minimal. Channels a senior dev who has seen everything: question whether the
  task needs to exist at all (YAGNI), reach for the standard library before
  custom code, native platform features before dependencies, one line before
  fifty. Supports intensity levels: lite, full (default), ultra. Use on ANY
  coding task: writing, adding, refactoring, fixing, reviewing, or designing
  code, and choosing libraries or dependencies. Also use whenever the user
  says "ponytail", "be lazy", "lazy mode", "simplest solution", "minimal
  solution", "yagni", "do less", or "shortest path", or complains about
  over-engineering, bloat, boilerplate, or unnecessary dependencies. Do NOT
  use for non-coding requests (general knowledge, prose, translation,
  summaries, recipes).
argument-hint: "[lite|full|ultra]"
license: MIT
---

# Ponytail

You are a lazy senior developer. Lazy means efficient, not careless. You have
seen every over-engineered codebase and been paged at 3am for one. The best
code is the code never written.

## Persistence

ACTIVE EVERY RESPONSE. No drift back to over-building. Still active if
unsure. Off only: "stop ponytail" / "normal mode". Default: **full**.
Switch: `/ponytail lite|full|ultra`.

## The ladder

Stop at the first rung that holds:

1. **Does this need to exist at all?** Speculative need = skip it, say so in one line. (YAGNI)
2. **Already in this codebase?** A helper, util, type, or pattern that already lives here → reuse it. Look before you write; re-implementing what's a few files over is the most common slop.
3. **Stdlib does it?** Use it.
4. **Native platform feature covers it?** `<input type="date">` over a picker lib, CSS over JS, DB constraint over app code.
5. **Already-installed dependency solves it?** Use it. Never add a new one for what a few lines can do.
6. **Can it be one line?** One line.
7. **Only then:** the minimum code that works.

The ladder is a reflex, not a research project — but it runs *after* you
understand the problem, not instead of it. Read the task and the code it
touches first, trace the real flow end to end, then climb. Two rungs work →
take the higher one and move on. The first lazy solution that works is the
right one — once you actually know what the change has to touch.

**Bug fix = root cause, not symptom.** A report names a symptom. Before you
edit, grep every caller of the function you're about to touch. The lazy fix IS
the root-cause fix: one guard in the shared function is a smaller diff than a
guard in every caller — and patching only the path the ticket names leaves
every sibling caller still broken. Fix it once, where all callers route through.

## Rules

- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes.
- No boilerplate, no scaffolding "for later", later can scaffold for itself.
- Deletion over addition. Boring over clever, clever is what someone decodes at 3am.
- Fewest files possible. Shortest working diff wins — but only once you understand the problem. The smallest change in the wrong place isn't lazy, it's a second bug.
- Complex request? Ship the lazy version and question it in the same response, "Did X; Y covers it. Need full X? Say so." Never stall on an answer you can default.
- Two stdlib options, same size? Take the one that's correct on edge cases. Lazy means writing less code, not picking the flimsier algorithm.
- Mark deliberate simplifications that cut a real corner with a known ceiling (global lock, O(n²) scan, naive heuristic) with a `ponytail:` comment naming the ceiling and upgrade path (`# ponytail: global lock, per-account locks if throughput matters`).

## Output

Code first. Then at most three short lines: what was skipped, when to add it.
No essays, no feature tours, no design notes. If the explanation is longer
than the code, delete the explanation, every paragraph defending a
simplification is complexity smuggled back in as prose. Explanation the user
explicitly asked for (a report, a walkthrough, per-phase notes) is not debt,
give it in full, the rule is only against unrequested prose.

Pattern: `[code] → skipped: [X], add when [Y].`

## Intensity

| Level | What change |
|-------|------------|
| **lite** | Build what's asked, but name the lazier alternative in one line. User picks. |
| **full** | The ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. Default. |
| **ultra** | YAGNI extremist. Deletion before addition. Ship the one-liner and challenge the rest of the requirement in the same breath. |

Example: "Add a cache for these API responses."
- lite: "Done, cache added. FYI: `functools.lru_cache` covers this in one line if you'd rather not own a cache class."
- full: "`@lru_cache(maxsize=1000)` on the fetch function. Skipped custom cache class, add when lru_cache measurably falls short."
- ultra: "No cache until a profiler says so. When it does: `@lru_cache`. A hand-rolled TTL cache class is a bug farm with a hit rate."

## When NOT to be lazy

Never simplify away: input validation at trust boundaries, error handling
that prevents data loss, security measures, accessibility basics, anything
explicitly requested. User insists on the full version → build it, no
re-arguing.

Never lazy about understanding the problem. The ladder shortens the
solution, never the reading. Trace the whole thing first — every file the
change touches, the actual flow — before picking a rung. Laziness that skips
comprehension to ship a small diff is the dangerous kind: it dresses up as
efficiency and ships a confident wrong fix. Read fully, then be lazy.

Hardware is never the ideal on paper: a real clock drifts, a real sensor
reads off, a PCA9685 runs a few percent fast. Leave the calibration knob, not
just less code, the physical world needs tuning a minimal model can't see.

Lazy code without its check is unfinished. Non-trivial logic (a branch, a
loop, a parser, a money/security path) leaves ONE runnable check behind, the
smallest thing that fails if the logic breaks: an `assert`-based
`demo()`/`__main__` self-check or one small `test_*.py`. No frameworks, no
fixtures, no per-function suites unless asked. Trivial one-liners need no
test, YAGNI applies to tests too.

## Boundaries

Ponytail governs what you build, not how you talk (pair with Caveman for
terse prose). "stop ponytail" / "normal mode": revert. Level persists until
changed or session end.

The shortest path to done is the right path.

```

## 18. assistant — 1788790059451

```json
{
  "type": "toolCall",
  "id": "call_FwGeXC4kOhffcZL5j6uDIHUl",
  "name": "bash",
  "arguments": {
    "command": "node <<'NODE'\nconst fs=require('node:fs'), p=require('node:path');\nconst root='E:/.neo-work';\nfor(const target of ['E:/AGENTS.md','E:/package.json',root+'/AGENTS.md',root+'/package.json',root+'/node_modules',root+'/gpt-6']){\n try {const s=fs.lstatSync(target); console.log(target+': '+(s.isDirectory()?'DIRECTORY':s.isFile()?'FILE':'OTHER')+(s.isSymbolicLink()?' (SYMLINK)':'')); if(target.endsWith('/gpt-6')&&s.isDirectory()) console.log('  entries: '+JSON.stringify(fs.readdirSync(target)));} catch(e){console.log(target+': '+e.code);}\n}\nconsole.log('\\nSHALLOW PROJECT MARKERS:');\nfor(const d of fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory())) {\n const dir=p.join(root,d.name); const hits=fs.readdirSync(dir).filter(n=>/^(AGENTS\\.md|CLAUDE\\.md|package\\.json|.*lock.*|node_modules|.*config\\.(ts|js|json))$/i.test(n));\n if(hits.length) console.log(dir+': '+hits.join(', '));\n}\nconsole.log('\\nSIX SKILL LINE COUNTS AND HEADINGS:');\nfor(const name of ['materials','fundamentals','geometry','interaction','lighting','loaders']) {\n const path='E:/koningtub.nl/.agents/skills/threejs-'+name+'/SKILL.md'; const text=fs.readFileSync(path,'utf8'); const lines=text.trimEnd().split(/\\r?\\n/);\n console.log(path+' L1-'+lines.length+' ('+fs.statSync(path).size+' bytes)');\n for(let i=0;i<lines.length;i++) if(/^##+ /.test(lines[i])) console.log('  '+(i+1)+' '+lines[i]);\n}\nNODE\nnpm list -g --depth=0; bun --version; pnpm --version; playwright --version",
    "timeout": 60
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_U7JwMe4b2rB4HJnszSIH3VrB",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/docs/wiki"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_4lYdkAA1m9ZrsZxr5qfpHMKC",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_I3dQfu4kfir6fiVlewXclMQf",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/.pi/skills"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_tHiLgAdp5daw57WF31wBiSFF",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.dev/serve.js"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_a1S1sqWhTC7za6TTJdGSBCtG",
  "name": "find",
  "arguments": {
    "pattern": "**/okf-open-knowledge-format/SKILL.md",
    "path": "E:/koningtub.nl/.agents/skills"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_cQYGHQO3z488Ep3QvcDLfA2v",
  "name": "find",
  "arguments": {
    "pattern": "**/okf-open-knowledge-format/SKILL.md",
    "path": "C:/Users/PTW/.pi/agent/skills"
  }
}
```

## 19. toolResult / bash — 1788790094780

```text
E:/AGENTS.md: ENOENT
E:/package.json: ENOENT
E:/.neo-work/AGENTS.md: ENOENT
E:/.neo-work/package.json: ENOENT
E:/.neo-work/node_modules: ENOENT
E:/.neo-work/gpt-6: ENOENT

SHALLOW PROJECT MARKERS:
E:\.neo-work\3d-char: node_modules, package-lock.json, package.json, svelte.config.js, tsconfig.json, vite.config.ts

SIX SKILL LINE COUNTS AND HEADINGS:
E:/koningtub.nl/.agents/skills/threejs-materials/SKILL.md L1-520 (13938 bytes)
  8 ## Quick Start
  23 ## Material Types Overview
  38 ## MeshBasicMaterial
  57 ## MeshLambertMaterial
  73 ## MeshPhongMaterial
  95 ## MeshStandardMaterial (PBR)
  136 ## MeshPhysicalMaterial (Advanced PBR)
  190 ### Glass Material Example
  204 ### Car Paint Example
  216 ## MeshToonMaterial
  234 ## MeshNormalMaterial
  245 ## MeshDepthMaterial
  255 ## PointsMaterial
  274 ## LineBasicMaterial & LineDashedMaterial
  298 ## ShaderMaterial
  339 ### Built-in Uniforms (auto-provided)
  356 ## RawShaderMaterial
  386 ## Common Material Properties
  423 ## Multiple Materials
  444 ## Environment Maps
  475 ## Material Cloning and Modification
  493 ## Performance Tips
  516 ## See Also
E:/koningtub.nl/.agents/skills/threejs-fundamentals/SKILL.md L1-488 (12008 bytes)
  8 ## Quick Start
  58 ## Core Classes
  60 ### Scene
  74 ### Cameras
  140 ### WebGLRenderer
  172 ### Object3D
  215 ### Group
  230 ### Mesh
  253 ## Coordinate System
  267 ## Math Utilities
  269 ### Vector3
  303 ### Matrix4
  335 ### Quaternion
  349 ### Euler
  359 ### Color
  376 ### MathUtils
  390 ## Common Patterns
  392 ### Proper Cleanup
  417 ### Clock for Animation
  433 ### Responsive Canvas
  449 ### Loading Manager
  463 ## Performance Tips
  484 ## See Also
E:/koningtub.nl/.agents/skills/threejs-geometry/SKILL.md L1-548 (14377 bytes)
  8 ## Quick Start
  24 ## Built-in Geometries
  26 ### Basic Shapes
  62 ### Advanced Shapes
  86 ### Path-Based Shapes
  125 ### Text Geometry
  153 ## BufferGeometry
  157 ### Custom BufferGeometry
  217 ### BufferAttribute Types
  237 ### Modifying BufferGeometry
  261 ### Interleaved Buffers (Advanced)
  283 ## EdgesGeometry & WireframeGeometry
  301 ## Points
  326 ## Lines
  369 ## InstancedMesh
  416 ### Update Instance at Runtime
  433 ## InstancedBufferGeometry (Advanced)
  455 ## Geometry Utilities
  477 ## Common Patterns
  479 ### Center Geometry
  486 ### Scale to Fit
  496 ### Clone and Transform
  505 ### Morph Targets
  526 ## Performance Tips
  544 ## See Also
E:/koningtub.nl/.agents/skills/threejs-interaction/SKILL.md L1-660 (16978 bytes)
  8 ## Quick Start
  37 ## Raycaster
  39 ### Basic Raycasting
  67 ### Mouse Position Conversion
  86 ### Touch Support
  109 ### Raycaster Options
  126 ### Efficient Raycasting
  148 ## Camera Controls
  150 ### OrbitControls
  190 ### FlyControls
  207 ### FirstPersonControls
  225 ### PointerLockControls
  275 ### TrackballControls
  291 ### MapControls
  303 ## TransformControls
  354 ## DragControls
  384 ## Selection System
  386 ### Click to Select
  415 ### Box Selection
  454 ### Hover Effects
  491 ## Keyboard Input
  516 ## World-Screen Coordinate Conversion
  518 ### World to Screen
  537 ### Screen to World
  556 ### Ray-Plane Intersection
  574 ## Event Handling Best Practices
  637 ## Performance Tips
  656 ## See Also
E:/koningtub.nl/.agents/skills/threejs-lighting/SKILL.md L1-481 (12508 bytes)
  8 ## Quick Start
  22 ## Light Types Overview
  35 ## AmbientLight
  49 ## HemisphereLight
  65 ## DirectionalLight
  81 ### DirectionalLight Shadows
  110 ## PointLight
  125 ### PointLight Shadows
  139 ## SpotLight
  161 ### SpotLight Shadows
  179 ## RectAreaLight
  204 ## Shadow Setup
  206 ### Enable Shadows
  231 ### Optimizing Shadows
  254 ### Contact Shadows (Fake, Fast)
  269 ## Light Helpers
  299 ## Environment Lighting (IBL)
  331 ### Cube Texture Environment
  348 ## Light Probes (Advanced)
  373 ## Common Lighting Setups
  375 ### Three-Point Lighting
  398 ### Outdoor Daylight
  412 ### Indoor Studio
  433 ## Light Animation
  456 ## Performance Tips
  477 ## See Also
E:/koningtub.nl/.agents/skills/threejs-loaders/SKILL.md L1-623 (14655 bytes)
  8 ## Quick Start
  25 ## LoadingManager
  63 ## Texture Loading
  65 ### TextureLoader
  90 ### Texture Configuration
  126 ### CubeTextureLoader
  151 ### HDR/EXR Loading
  173 ### PMREMGenerator
  194 ## GLTF/GLB Loading
  228 ### GLTF with Draco Compression
  248 ### GLTF with KTX2 Textures
  268 ### Process GLTF Content
  305 ## Other Model Formats
  307 ### OBJ + MTL
  325 ### FBX
  345 ### STL
  358 ### PLY
  372 ## Async/Promise Loading
  374 ### Promisified Loader
  394 ### Load Multiple Assets
  437 ## Caching
  439 ### Built-in Cache
  454 ### Custom Asset Manager
  504 ## Loading from Different Sources
  506 ### Data URL / Base64
  513 ### Blob URL
  524 ### ArrayBuffer
  538 ### Custom Path/URL
  554 ## Error Handling
  597 ## Performance Tips
  619 ## See Also
C:\Users\PTW\AppData\Roaming\npm
+-- @agent-tars/cli@0.3.0
+-- @companion-ai/feynman@0.2.40
+-- @earendil-works/pi-coding-agent@0.85.1
+-- @khimaros/pi-webui@0.6.0
+-- @openchamber/web@1.10.4
+-- @rafter-security/cli@0.10.0
+-- @railway/cli@5.45.10
+-- bun@1.4.0
+-- little-coder@1.8.2
+-- opencode-ai@1.18.15
+-- pi-mcp-adapter@2.32.1
+-- pnpm@10.33.3
+-- righthand@0.0.1
`-- webagent-mcp@1.1.0

1.4.0
10.33.3
Version 1.59.0

```

## 20. toolResult / ls — 1788790094781

```text
changelog/
learnings/
pages/
rules/
```

## 21. toolResult / ls — 1788790094781

```text
three-best-practices/
```

## 22. toolResult / ls — 1788790094781

```text
my-feed/
voice-analysis/
```

## 23. toolResult / read — 1788790094781

```text
// ponytail: stdlib static server, replace with http-server if this grows
const http = require("http"), fs = require("fs"), path = require("path");
const mime = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" };
http.createServer((req, res) => {
    const p = path.join(__dirname, "..", decodeURIComponent(req.url.split("?")[0]) === "/" ? "index.html" : decodeURIComponent(req.url.split("?")[0]));
    fs.readFile(p, (e, d) => {
        if (e) { res.writeHead(404); return res.end("404"); }
        res.writeHead(200, { "Content-Type": mime[path.extname(p)] || "application/octet-stream", "Cache-Control": "no-store" });
        res.end(d);
    });
}).listen(8099, "127.0.0.1", () => console.log("serving :8099"));

```

## 24. toolResult / find — 1788790094781

```text
No files found matching pattern
```

## 25. toolResult / find — 1788790094781

```text
No files found matching pattern
```

## 26. assistant — 1788790094781

```json
{
  "type": "toolCall",
  "id": "call_VZ92jtWSG0rHZzaNOyd0cKFU",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/3d-char/package.json"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_pq9tWCAPmr8SmRv5SbNfxSZs",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/3d-char/tsconfig.json"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_ninxuX4B3VFz6Mtffd7dXYsr",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/3d-char/vite.config.ts"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_wrJYNaRNdbqIILDJWVAIGcKk",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/docs/wiki/pages"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_9CWX1VaSVWJdhtgkZfd61ZPt",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/docs/wiki/rules"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_xbixHRzc10QEKfF2TH14OaQn",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/threejs-mcp-test"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_rYOsu8OUfaoyB3dBjAjEdDnS",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/threejs-test2"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_UfuV0Ml71Aw2iH68b65POcsB",
  "name": "bash",
  "arguments": {
    "command": "node <<'NODE'\nconst fs=require('node:fs'),path=require('node:path');\nconst root='E:/.neo-work', nm=root+'/3d-char/node_modules';\nconsole.log('INSTALLED LOCAL PACKAGES');\nfor(const name of ['three','@types/three','typescript','vite','esbuild','@playwright/test','playwright','playwright-core','puppeteer','puppeteer-core','@sveltejs/kit','svelte','@dimforge/rapier3d-compat','three-mesh-bvh','lil-gui','stats.js']) {\n const p=nm+'/'+name+'/package.json'; if(fs.existsSync(p)) {const j=JSON.parse(fs.readFileSync(p,'utf8')); console.log(name+' '+j.version+' at '+p);} else console.log(name+': ABSENT');\n}\nconsole.log('\\nSELECTED BINARIES IN PROJECT:');\nconsole.log(fs.readdirSync(nm+'/.bin').filter(x=>/^(vite|tsc|esbuild|playwright|svelte-check)(\\.|$)/.test(x)).join(', '));\nconsole.log('\\nLOCAL SKILL ROOTS — OKF DIRECTORY CHECK');\nfor(const dir of ['C:/Users/PTW/.agents/skills','C:/Users/PTW/.pi/agent/skills','E:/koningtub.nl/.agents/skills']) {\n if(fs.existsSync(dir)) console.log(dir+': '+(fs.readdirSync(dir).filter(x=>/okf|knowledge/i.test(x)).join(', ')||'NO name matches'));\n}\nconsole.log('\\nBROWSER FILES / CACHES (EXISTENCE ONLY):');\nfor(const p of ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/BrowserOS','C:/Users/PTW/AppData/Local/BrowserOS','C:/Users/PTW/AppData/Local/ms-playwright','C:/Users/PTW/.cache/ms-playwright','C:/Users/PTW/AppData/Local/Programs/BrowserOS']) {\n if(fs.existsSync(p)) {console.log(p); if(fs.statSync(p).isDirectory()) console.log('  '+fs.readdirSync(p).join(', '));} else console.log(p+': ABSENT');\n}\nconsole.log('\\nADDON API FILE CHECKS');\nfor(const rel of ['objects/ContactShadows.js','controls/OrbitControls.js','controls/TransformControls.js','environments/RoomEnvironment.js','utils/BufferGeometryUtils.js']) console.log(rel+': '+fs.existsSync(nm+'/three/examples/jsm/'+rel));\nNODE",
    "timeout": 30
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_SapThtSw2eygM2fFnyW2eZw8",
  "name": "grep",
  "arguments": {
    "path": "E:/.neo-work/docs/wiki",
    "pattern": "okf|wiki_mark_synced|three|gpt-6|AGENTS",
    "ignoreCase": true,
    "limit": 50
  }
}
```

## 27. toolResult / read — 1788790125641

```text
{
  "name": "mainframe-hero",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.1",
    "@sveltejs/kit": "^2.21.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.3",
    "@tailwindcss/vite": "^4.1.8",
    "svelte": "^5.33.0",
    "svelte-check": "^4.2.1",
    "tailwindcss": "^4.1.8",
    "typescript": "~5.8.3",
    "vite": "^6.3.5"
  }
}

```

## 28. toolResult / read — 1788790125641

```text
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}

```

## 29. toolResult / read — 1788790125641

```text
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
})

```

## 30. toolResult / ls — 1788790125641

```text
entities/
```

## 31. toolResult / ls — 1788790125641

```text
deterministic-sim-testing.md
index.md
```

## 32. toolResult / ls — 1788790125641

```text
.pi/
screenshots/
```

## 33. toolResult / ls — 1788790125641

```text
_raz_tail.txt
.pi/
raz.html
soldier.html
tank-v2.html
tank.html
warhauler.html
wizard.html
```

## 34. toolResult / bash — 1788790125641

```text
INSTALLED LOCAL PACKAGES
three: ABSENT
@types/three: ABSENT
typescript 5.8.3 at E:/.neo-work/3d-char/node_modules/typescript/package.json
vite 6.4.3 at E:/.neo-work/3d-char/node_modules/vite/package.json
esbuild 0.25.12 at E:/.neo-work/3d-char/node_modules/esbuild/package.json
@playwright/test: ABSENT
playwright: ABSENT
playwright-core: ABSENT
puppeteer: ABSENT
puppeteer-core: ABSENT
@sveltejs/kit 2.70.3 at E:/.neo-work/3d-char/node_modules/@sveltejs/kit/package.json
svelte 5.57.0 at E:/.neo-work/3d-char/node_modules/svelte/package.json
@dimforge/rapier3d-compat: ABSENT
three-mesh-bvh: ABSENT
lil-gui: ABSENT
stats.js: ABSENT

SELECTED BINARIES IN PROJECT:
esbuild, esbuild.cmd, esbuild.ps1, svelte-check, svelte-check.cmd, svelte-check.ps1, tsc, tsc.cmd, tsc.ps1, vite, vite.cmd, vite.ps1

LOCAL SKILL ROOTS — OKF DIRECTORY CHECK
C:/Users/PTW/.agents/skills: NO name matches
C:/Users/PTW/.pi/agent/skills: NO name matches
E:/koningtub.nl/.agents/skills: NO name matches

BROWSER FILES / CACHES (EXISTENCE ONLY):
C:/Program Files/Google/Chrome/Application/chrome.exe
C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe
C:/Program Files/BrowserOS: ABSENT
C:/Users/PTW/AppData/Local/BrowserOS: ABSENT
C:/Users/PTW/AppData/Local/ms-playwright
  .links, .settings, chromium-1194, chromium-1200, chromium-1217, chromium-1223, chromium-1228, chromium-1234, chromium_headless_shell-1194, chromium_headless_shell-1200, chromium_headless_shell-1217, chromium_headless_shell-1223, chromium_headless_shell-1228, chromium_headless_shell-1234, ffmpeg-1011, webkit-2272, winldd-1007
C:/Users/PTW/.cache/ms-playwright: ABSENT
C:/Users/PTW/AppData/Local/Programs/BrowserOS: ABSENT

ADDON API FILE CHECKS
objects/ContactShadows.js: false
controls/OrbitControls.js: false
controls/TransformControls.js: false
environments/RoomEnvironment.js: false
utils/BufferGeometryUtils.js: false

```

## 35. toolResult / grep — 1788790125641

```text
rules/deterministic-sim-testing.md:16: 2. **Never return THREE objects from evaluate.** Scene graphs are circular — serialization fails or stalls. Wrap expressions to return primitives (`JSON.stringify`, map to plain fields) before returning.
pages/entities/minitown.md:14: First full game built in this workspace; it combines a self-contained three.js renderer (pixelation via low-res render technique), an agent-based resident sim, and a GPU concept-art pipeline. Future game/3D work should reuse its patterns, not reinvent them.
pages/entities/minitown.md:18: - **Location**: `E:/.neo-work/minitown/` — `index.html` (HUD), `game.js` (sim + renderer + UI, single file), `vendor/` (three.js vendored locally for offline play), `README.md`
pages/entities/minitown.md:26: - Waypoints in the movement system are plain `{x, z}` objects — never swap in `THREE.Vector2` (see [threejs-vector2-has-no-z](../../learnings/three-vector2-no-z.md))
learnings/index.md:3: - [threejs-devtools-mcp: RoomEnvironment steals the scene slot](./threejs-devtools-roomenvironment.md) - The trap
learnings/index.md:6: - [THREE.Vector2 has no .z — grid waypoints must be plain {x,z}](./three-vector2-no-z.md) - MiniTown's movement system used `THREE.Vector2` waypoints, but world-space math reads `target.z`. `Vector2` has only `.x/.y`, so every `.z` read was `undefined`
learnings/three-vector2-no-z.md:3: title: THREE.Vector2 has no .z — grid waypoints must be plain {x,z}
learnings/three-vector2-no-z.md:4: description: MiniTown's movement system used `THREE.Vector2` waypoints, but world-space math reads `target.z`. `Vector2` has only `.x/.y`, so every `.z` read was `undefined`
learnings/three-vector2-no-z.md:5: tags: [threejs, nan, movement, minitown]
learnings/three-vector2-no-z.md:9: # THREE.Vector2 has no .z — grid waypoints must be plain {x,z}
learnings/three-vector2-no-z.md:11: MiniTown's movement system used `THREE.Vector2` waypoints, but world-space math reads `target.z`. `Vector2` has only `.x/.y`, so every `.z` read was `undefined` → NaN positions on the very first tick → residents and cars silently froze.
learnings/three-vector2-no-z.md:15: Grid-world code that mixes `x/z` ground coordinates must use plain `{x, z}` objects (or `THREE.Vector3`), never `Vector2`. NaN propagates silently through lerps/normalizations — debug by checking `position.x` for NaN on tick 1.
learnings/threejs-devtools-roomenvironment.md:3: title: "threejs-devtools-mcp: RoomEnvironment steals the scene slot"
learnings/threejs-devtools-roomenvironment.md:5: tags: [threejs, mcp, devtools]
learnings/threejs-devtools-roomenvironment.md:9: # threejs-devtools-mcp: RoomEnvironment steals the scene slot
learnings/threejs-devtools-roomenvironment.md:13: `threejs-devtools-mcp` bridge (inject.global.js) sets up `window.__THREE_DEVTOOLS__ = new EventTarget()` and listens for three.js's `observe` CustomEvents, which fire in **Scene and WebGLRenderer constructors**. The bridge keeps the **LAST observed Scene**.
learnings/threejs-devtools-roomenvironment.md:22: if (window.__THREE_DEVTOOLS__)
learnings/threejs-devtools-roomenvironment.md:23:     __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: scene }));
learnings/threejs-devtools-roomenvironment.md:29: - MCP: `npx -y -p threejs-devtools-mcp threejs-devtools-mcp-http` → streamable HTTP MCP on :9223/mcp, proxy :9222 → DEV_PORT
```

## 36. assistant — 1788790125642

```text
All six requested skills have been read completely. `E:/.neo-work/gpt-6` does not exist, and the workspace root has no `AGENTS.md`, `package.json`, or `node_modules`. I found build tools in `3d-char`, plus some stale skill examples that should not be copied directly. The requested OKF skill was not found in the checked skill locations, and no `wiki_mark_synced` tool is available.
```

```json
{
  "type": "toolCall",
  "id": "call_AtMvV4GHFzmtzbhYRk8VViqh",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/minitown"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_1Z4gz93UeykAubp7yozxT4Y4",
  "name": "ls",
  "arguments": {
    "path": "E:/.neo-work/minitown/vendor"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_KacPEfQU6hnSiGVoEZHV1WNt",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/docs/wiki/learnings/threejs-devtools-roomenvironment.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_1dLZ5KQ7qybqIM6DxipPjve2",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/docs/wiki/rules/deterministic-sim-testing.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_OnrvwTw3aTsxIcahDusMEHK3",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/rules/setup-choose-renderer.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_8onm8XT4tnZNEF3lzi9JpZ51",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/rules/setup-animation-loop.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_ZUwlIhFILGj2PERNUe71fX1W",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/rules/lighting-shadows-advanced.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_Ysbj9h4GNt9gJgN6Eo08jNvg",
  "name": "bash",
  "arguments": {
    "command": "node <<'NODE'\nconst fs=require('node:fs');\nconsole.log('MCP CONFIG: names and non-secret launch metadata only');\nconst config=JSON.parse(fs.readFileSync('E:/.neo-work/.mcp.json','utf8'));\nfor(const [name,value] of Object.entries(config.mcpServers||{})) console.log(JSON.stringify({name,command:value.command,transport:value.type}));\nconsole.log('\\nROOT / ANCESTOR INSTRUCTION NAME CHECK (case-insensitive)');\nfor(const dir of ['E:/','E:/.neo-work']) console.log(dir+': '+(fs.readdirSync(dir).filter(n=>/^(agents\\.md|claude\\.md|package\\.json|gpt-6)$/i.test(n)).join(', ')||'no matches'));\nconsole.log('\\nREFERENCED FILE LINE COUNTS');\nfor(const rel of ['3d-char/package.json','3d-char/tsconfig.json','3d-char/vite.config.ts','.dev/serve.js','.agents/skills/three-best-practices/SKILL.md','docs/wiki/learnings/threejs-devtools-roomenvironment.md','docs/wiki/rules/deterministic-sim-testing.md']) console.log(rel+': 1-'+fs.readFileSync('E:/.neo-work/'+rel,'utf8').trimEnd().split(/\\r?\\n/).length);\nNODE",
    "timeout": 30
  }
}
```

## 37. toolResult / ls — 1788790169638

```text
concepts/
game.js
index.html
README.md
tools/
vendor/
```

## 38. toolResult / ls — 1788790169638

```text
three.min.js
```

## 39. toolResult / read — 1788790169638

````text
---
type: Learning
title: "threejs-devtools-mcp: RoomEnvironment steals the scene slot"
description: The trap
tags: [threejs, mcp, devtools]
timestamp: "2026-09-06T08:40:01.384Z"
---

# threejs-devtools-mcp: RoomEnvironment steals the scene slot

## The trap

`threejs-devtools-mcp` bridge (inject.global.js) sets up `window.__THREE_DEVTOOLS__ = new EventTarget()` and listens for three.js's `observe` CustomEvents, which fire in **Scene and WebGLRenderer constructors**. The bridge keeps the **LAST observed Scene**.

`new RoomEnvironment()` (used for `scene.environment` via PMREMGenerator) **extends Scene** — so if you build the env after your main scene, the devtools scene_tree shows a stray PointLight + unnamed boxes (the RoomEnvironment), not your app.

## Fix

Re-announce your scene after env setup (any time):

```js
if (window.__THREE_DEVTOOLS__)
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: scene }));
```

## Ops notes (E:\.neo-work soldier demo)

- Static server: `node .dev/serve.js` → 127.0.0.1:8099 (serves cwd, index.html = soldier.html)
- MCP: `npx -y -p threejs-devtools-mcp threejs-devtools-mcp-http` → streamable HTTP MCP on :9223/mcp, proxy :9222 → DEV_PORT
- Proxy port must be set via `set_dev_port` tool (env didn't pass through `Start-Process`); tool answers "Refresh the browser"
- JSON-RPC over :9223 needs `initialize` → `Mcp-Session-Id` header → `notifications/initialized` → `tools/call`
- Name key nodes (`soldier.name = "soldier"` etc.) so `find_objects` / `set_material_property` can target them — everything else shows as `(unnamed)`
- Project `.mcp.json` (stdio, DEV_PORT 8099) is picked up on a NEW pi session, not mid-session; mid-session use the HTTP transport instead

````

## 40. toolResult / read — 1788790169638

```text
---
type: Rule
title: "Deterministic in-browser sim testing: freeze the loop, return primitives"
description: "When verifying a rAF-driven simulation through browser automation (CDP/Playwright evaluate):"
tags: [testing, cdp, browser-automation, raf]
timestamp: "2026-09-06T08:56:26.948Z"
---

# Deterministic in-browser sim testing: freeze the loop, return primitives

When verifying a rAF-driven simulation through browser automation (CDP/Playwright evaluate):

## The guideline

1. **Freeze the live loop before asserting on sim state.** A backgrounded/throttled tab makes rAF nearly stop; worse, a *running* loop advances the clock between your separate evaluate calls, so measurements ("0 commuters") are pollution, not truth. Stop the loop, or pump `update(dt)` functions directly with fixed dt.
2. **Never return THREE objects from evaluate.** Scene graphs are circular — serialization fails or stalls. Wrap expressions to return primitives (`JSON.stringify`, map to plain fields) before returning.
3. **Don't pump hundreds of real renders** — it blows evaluate timeouts. Pump the sim functions; do a single render check separately.

## Evidence

MiniTown e2e session: rAF throttling + circular `placeBlock` return values stalled tests; freezing the loop and pumping sim functions directly gave deterministic green runs (blocks built, commutes, lunch, sleep states verified).

Applies to any in-browser game/sim verification, e.g. [[minitown]].

```

## 41. toolResult / read — 1788790169638

```text
ENOENT: no such file or directory, access 'E:\.neo-work\.agents\skills\three-best-practices\rules\setup-choose-renderer.md'
```

## 42. toolResult / read — 1788790169639

```text
ENOENT: no such file or directory, access 'E:\.neo-work\.agents\skills\three-best-practices\rules\setup-animation-loop.md'
```

## 43. toolResult / read — 1788790169639

````text
# Lighting & Shadows Advanced

> Source: [100 Three.js Tips - Utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips)

Lighting is computationally expensive. Optimize carefully.

## Limit Active Lights

**Target: 3 or fewer active lights**

Each additional light increases shader complexity. Beyond 3 lights, consider baking.

## PointLight Shadow Cost

PointLights require 6 shadow map renders (cube faces):

```
Draw calls = objects × 6 × point_lights
```

A scene with 100 objects and 2 PointLights = 1,200 shadow draw calls.

**Prefer DirectionalLight or SpotLight for shadows.**

## Shadow Map Sizing

| Platform | Recommended Size |
|----------|------------------|
| Mobile | 512-1024 |
| Desktop | 1024-2048 |
| Quality-critical | 4096 |

```javascript
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
```

## Tight Shadow Camera Frustum

```javascript
const light = new THREE.DirectionalLight(0xffffff, 1);

// Fit tightly to scene bounds
light.shadow.camera.left = -10;
light.shadow.camera.right = 10;
light.shadow.camera.top = 10;
light.shadow.camera.bottom = -10;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 50;

// Use helper to visualize
const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);
```

## Disable Shadow Auto-Update for Static Scenes

```javascript
renderer.shadowMap.autoUpdate = false;

// Manually trigger when needed (e.g., after moving light)
renderer.shadowMap.needsUpdate = true;
```

## Cascaded Shadow Maps (CSM) for Large Scenes

```javascript
import { CSM } from 'three/addons/csm/CSM.js';

const csm = new CSM({
  maxFar: camera.far,
  cascades: 4, // Desktop: 4, Mobile: 2
  shadowMapSize: 2048,
  lightDirection: new THREE.Vector3(-1, -1, -1).normalize(),
  camera: camera,
  parent: scene
});

// Update in render loop
function animate() {
  csm.update();
  renderer.render(scene, camera);
}
```

## Bake Lightmaps for Static Scenes

Options:
1. **Blender** - Bake lighting in Blender, export to glTF
2. **@react-three/lightmap** - Runtime baking in R3F

```jsx
// React Three Fiber
import { Lightmap } from '@react-three/lightmap';

<Lightmap>
  <Scene />
</Lightmap>
```

## Environment Maps for Ambient Light

```javascript
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const pmremGenerator = new THREE.PMREMGenerator(renderer);

new RGBELoader().load('environment.hdr', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  texture.dispose();
  pmremGenerator.dispose();
});
```

## Fake Shadows for Simple Cases

Semi-transparent planes with radial gradients provide budget-friendly contact shadows:

```javascript
const shadowTexture = createRadialGradientTexture();
const shadowMaterial = new THREE.MeshBasicMaterial({
  map: shadowTexture,
  transparent: true,
  opacity: 0.5,
  depthWrite: false
});

const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  shadowMaterial
);
shadowPlane.rotation.x = -Math.PI / 2;
shadowPlane.position.y = 0.01; // Slightly above ground
```

## Light Probes

For static scenes with complex lighting:

```javascript
import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';

const lightProbe = new THREE.LightProbe();

// Generate from cube camera
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
cubeCamera.update(renderer, scene);

lightProbe.copy(LightProbeGenerator.fromCubeRenderTarget(renderer, cubeRenderTarget));
scene.add(lightProbe);
```

## Checklist

- [ ] Limit to 3 or fewer active lights
- [ ] Avoid PointLight shadows when possible
- [ ] Size shadow maps for target platform
- [ ] Fit shadow camera frustum tightly
- [ ] Disable shadow autoUpdate for static scenes
- [ ] Use CSM for large outdoor scenes
- [ ] Bake lighting for static geometry
- [ ] Use environment maps for ambient lighting
- [ ] Consider fake shadows for simple cases

````

## 44. toolResult / bash — 1788790169639

```text
MCP CONFIG: names and non-secret launch metadata only
{"name":"threejs-devtools-mcp","command":"npx"}

ROOT / ANCESTOR INSTRUCTION NAME CHECK (case-insensitive)
E:/: no matches
E:/.neo-work: no matches

REFERENCED FILE LINE COUNTS
3d-char/package.json: 1-23
3d-char/tsconfig.json: 1-14
3d-char/vite.config.ts: 1-7
.dev/serve.js: 1-11
.agents/skills/three-best-practices/SKILL.md: 1-334
docs/wiki/learnings/threejs-devtools-roomenvironment.md: 1-33
docs/wiki/rules/deterministic-sim-testing.md: 1-23

```

## 45. assistant — 1788790169640

```json
{
  "type": "toolCall",
  "id": "call_N8mwd1BZJjq4kcvW9mZqVTqH",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/minitown/vendor/three.min.js",
    "offset": 1,
    "limit": 5
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_QKw7hFgulwb2YHXcX08bXxz8",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/rules/setup-use-import-maps.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_FlMu5dAteK1gfUVCIyal4CFL",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/rules/geometry-instanced-mesh.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_4mOpwvyEfL7YdgQh6CIEXzDn",
  "name": "read",
  "arguments": {
    "path": "E:/.neo-work/.agents/skills/three-best-practices/rules/draw-call-optimization.md"
  }
}
```

```json
{
  "type": "toolCall",
  "id": "call_L44Y8wZWpYBNg4f8dkW5rVZ0",
  "name": "bash",
  "arguments": {
    "command": "node <<'NODE'\nconst fs=require('node:fs');\nconst p='E:/.neo-work/minitown/vendor/three.min.js'; const text=fs.readFileSync(p,'utf8'); console.log('Vendored Three.js format: '+(text.includes('typeof exports')?'UMD/global':'not detected')); console.log('REVISION assignment: '+(text.match(/\\bREVISION\\s*=\\s*[^,;}]{1,60}/)?.[0]||'not a literal/simple assignment'));\nfor(const rel of ['setup-use-import-maps.md','geometry-instanced-mesh.md','draw-call-optimization.md','lighting-shadows-advanced.md']) {const p='E:/.neo-work/.agents/skills/three-best-practices/rules/'+rel; console.log(p+' L1-'+fs.readFileSync(p,'utf8').trimEnd().split(/\\r?\\n/).length);}\nNODE",
    "timeout": 30
  }
}
```

## 46. toolResult / read — 1788790205651

```text
console.warn('Scripts "build/three.js" and "build/three.min.js" are deprecated with r150+, and will be removed with r160. Please use ES Modules or alternatives: https://threejs.org/docs/index.html#manual/en/introduction/Installation'),
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT

[3 more lines in file. Use offset=6 to continue.]
```

## 47. toolResult / read — 1788790205652

````text
# setup-use-import-maps

**Use Import Maps instead of old CDN script tags.**

## Why It Matters

The old CDN pattern (`<script src="...three.min.js">`) is outdated and causes:
- Module resolution issues
- No tree shaking
- Global namespace pollution
- Version conflicts

## Bad Example

```html
<!-- WRONG - Outdated pattern (DO NOT USE) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
  // THREE is global, no modules
  const scene = new THREE.Scene();
</script>
```

## Good Example

```html
<!-- CORRECT - Modern Import Maps pattern -->
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/"
  }
}
</script>
<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
</script>
```

## WebGPU Import Map

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.webgpu.js",
    "three/tsl": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.tsl.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/"
  }
}
</script>
```

## References

- [Three.js Installation Guide](https://threejs.org/manual/#en/installation)
- [MDN Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)

````

## 48. toolResult / read — 1788790205652

````text
# geometry-instanced-mesh

**Use InstancedMesh for many identical objects.**

## Why It Matters

Each mesh = 1 draw call. 10,000 meshes = 10,000 draw calls = terrible performance. InstancedMesh renders multiple copies in a single draw call while allowing individual transforms and colors.

## Bad Example

```javascript
// BAD - 10000 draw calls
for (let i = 0; i < 10000; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.random().multiplyScalar(100);
  scene.add(mesh);
}
```

This creates 10,000 separate objects, each requiring its own draw call.

## Good Example

```javascript
// GOOD - Single draw call for 10000 instances
const instancedMesh = new THREE.InstancedMesh(geometry, material, 10000);

const dummy = new THREE.Object3D();
const color = new THREE.Color();

for (let i = 0; i < 10000; i++) {
  // Set position
  dummy.position.random().multiplyScalar(100);
  dummy.rotation.random();
  dummy.scale.setScalar(0.5 + Math.random() * 0.5);
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);

  // Set color (optional)
  color.setHSL(Math.random(), 0.8, 0.5);
  instancedMesh.setColorAt(i, color);
}

instancedMesh.instanceMatrix.needsUpdate = true;
if (instancedMesh.instanceColor) {
  instancedMesh.instanceColor.needsUpdate = true;
}

scene.add(instancedMesh);
```

## Updating Instances

```javascript
// Update a single instance
function updateInstance(index, position, rotation, scale) {
  dummy.position.copy(position);
  dummy.rotation.copy(rotation);
  dummy.scale.copy(scale);
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(index, dummy.matrix);
  instancedMesh.instanceMatrix.needsUpdate = true;
}

// Update in animation loop
function animate() {
  for (let i = 0; i < 100; i++) {
    instancedMesh.getMatrixAt(i, dummy.matrix);
    dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
    dummy.rotation.y += 0.01;
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);
  }
  instancedMesh.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
}
```

## Raycasting

```javascript
const raycaster = new THREE.Raycaster();

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(instancedMesh);

  if (intersects.length > 0) {
    const instanceId = intersects[0].instanceId;
    console.log('Clicked instance:', instanceId);

    // Change color of clicked instance
    instancedMesh.setColorAt(instanceId, new THREE.Color(0xff0000));
    instancedMesh.instanceColor.needsUpdate = true;
  }
}
```

## Performance Comparison

| Method | Objects | Draw Calls | Performance |
|--------|---------|------------|-------------|
| Individual Meshes | 10,000 | 10,000 | ~5 FPS |
| InstancedMesh | 10,000 | 1 | ~60 FPS |

## When NOT to Use

- Different geometries needed
- Different materials needed
- Complex per-object animations
- < 100 objects (overhead not worth it)

## References

- [Three.js InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)
- [Instancing Example](https://threejs.org/examples/#webgl_instancing_performance)

````

## 49. toolResult / read — 1788790205652

````text
# Draw Call Optimization

> Source: [100 Three.js Tips - Utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips)

Draw calls are the primary performance bottleneck in most Three.js applications.

## Target: Under 100 Draw Calls Per Frame

Most devices maintain 60fps below 100 draw calls. Check progress via:

```javascript
console.log('Draw calls:', renderer.info.render.calls);
console.log('Triangles:', renderer.info.render.triangles);
```

## Optimization Techniques

### 1. InstancedMesh (Identical Objects)

Reduces N draw calls to 1 for identical geometry.

```javascript
const mesh = new THREE.InstancedMesh(geometry, material, 1000);
const matrix = new THREE.Matrix4();

for (let i = 0; i < 1000; i++) {
  matrix.setPosition(positions[i]);
  mesh.setMatrixAt(i, matrix);
}
mesh.instanceMatrix.needsUpdate = true;
```

### 2. BatchedMesh (Varied Geometries)

Combines multiple geometries sharing materials into single draw call. Allows per-instance geometry variation.

```javascript
const batchedMesh = new THREE.BatchedMesh(
  maxGeometryCount,
  maxVertexCount,
  maxIndexCount,
  material
);

const geoId1 = batchedMesh.addGeometry(geometry1);
const geoId2 = batchedMesh.addGeometry(geometry2);

batchedMesh.addInstance(geoId1);
batchedMesh.addInstance(geoId2);
```

### 3. Merge Static Geometry

```javascript
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const merged = mergeGeometries([geo1, geo2, geo3]);
const mesh = new THREE.Mesh(merged, sharedMaterial);
```

### 4. Share Materials

```javascript
// BAD: Separate materials per mesh
meshes.forEach(m => {
  m.material = new MeshStandardMaterial({ color: 'red' });
});

// GOOD: Shared material
const sharedMaterial = new MeshStandardMaterial({ color: 'red' });
meshes.forEach(m => {
  m.material = sharedMaterial;
});
```

### 5. Array Textures (Modern Browsers)

Combine multiple textures into layers, accessed by index in shaders:

```javascript
const textureArray = new THREE.DataArrayTexture(data, width, height, depth);
```

### 6. Frustum Culling

Enabled by default. Understand how it works:

```javascript
const frustum = new THREE.Frustum();
const matrix = new THREE.Matrix4().multiplyMatrices(
  camera.projectionMatrix,
  camera.matrixWorldInverse
);
frustum.setFromProjectionMatrix(matrix);

if (frustum.intersectsObject(mesh)) {
  // Object is visible
}
```

## Decision Tree

```
Need to render many objects?
├── All identical geometry?
│   └── Use InstancedMesh
├── Different geometries, same material?
│   └── Use BatchedMesh
├── Static objects?
│   └── Merge with BufferGeometryUtils
└── Dynamic objects?
    └── Consider object pooling + visibility toggling
```

## Monitoring

```javascript
setInterval(() => {
  const info = renderer.info.render;
  console.log(`Calls: ${info.calls}, Tris: ${info.triangles}`);
}, 1000);
```

````

## 50. toolResult / bash — 1788790205652

```text
Vendored Three.js format: UMD/global
REVISION assignment: REVISION=e
E:/.neo-work/.agents/skills/three-best-practices/rules/setup-use-import-maps.md L1-61
E:/.neo-work/.agents/skills/three-best-practices/rules/geometry-instanced-mesh.md L1-117
E:/.neo-work/.agents/skills/three-best-practices/rules/draw-call-optimization.md L1-122
E:/.neo-work/.agents/skills/three-best-practices/rules/lighting-shadows-advanced.md L1-165

```

## 51. assistant — 1788790205652

````text
## Files Retrieved

**All six requested skills were read completely: 3,320 lines total.**

1. `E:/koningtub.nl/.agents/skills/threejs-materials/SKILL.md` **(lines 1–520)** — Material types, PBR properties, vertex colors, shaders, reuse and disposal. Most relevant: **95–134, 386–421, 493–514**.
2. `E:/koningtub.nl/.agents/skills/threejs-fundamentals/SKILL.md` **(lines 1–488)** — Renderer, cameras, scene hierarchy, transforms, cleanup and resizing. Most relevant: **74–170, 172–265, 390–447**.
3. `E:/koningtub.nl/.agents/skills/threejs-geometry/SKILL.md` **(lines 1–548)** — Primitives, custom buffers, deformation, instancing and merging. Most relevant: **24–123, 153–259, 369–431, 455–474**.
4. `E:/koningtub.nl/.agents/skills/threejs-interaction/SKILL.md` **(lines 1–660)** — OrbitControls, pointer-coordinate conversion, raycasting and selection. Most relevant: **67–84, 126–188, 637–654**.
5. `E:/koningtub.nl/.agents/skills/threejs-lighting/SKILL.md` **(lines 1–481)** — Lights, shadows, environment lighting and studio arrangements. Most relevant: **49–108, 204–252, 373–431**.
6. `E:/koningtub.nl/.agents/skills/threejs-loaders/SKILL.md` **(lines 1–623)** — Model/texture loaders, progress, async loading and cleanup. Mostly useful here for identifying infrastructure to **omit**.

Supporting workspace files inspected:

7. `E:/.neo-work/3d-char/package.json` **(lines 1–23)** — Existing SvelteKit/Vite project; no declared Three.js dependency.
8. `E:/.neo-work/3d-char/tsconfig.json` **(lines 1–14)** — Strict checking, bundler resolution; extends generated SvelteKit configuration.
9. `E:/.neo-work/3d-char/vite.config.ts` **(lines 1–7)** — SvelteKit and Tailwind plugins; not a standalone vanilla-TS configuration.
10. `E:/.neo-work/.dev/serve.js` **(lines 1–11)** — Minimal static server on `127.0.0.1:8099`; no TypeScript transformation.
11. `E:/.neo-work/.agents/skills/three-best-practices/SKILL.md` **(lines 1–334)** — Modern rendering/performance guidance, targeting Three.js `0.182.0+`.
12. `E:/.neo-work/.agents/skills/three-best-practices/rules/setup-use-import-maps.md` **(lines 1–61)** — ES modules instead of legacy global scripts.
13. `E:/.neo-work/.agents/skills/three-best-practices/rules/geometry-instanced-mesh.md` **(lines 1–117)** — Shared geometry, instance transforms/colors and update flags.
14. `E:/.neo-work/.agents/skills/three-best-practices/rules/draw-call-optimization.md` **(lines 1–122)** — Instancing, merging and renderer statistics.
15. `E:/.neo-work/.agents/skills/three-best-practices/rules/lighting-shadows-advanced.md` **(lines 1–165)** — Shadow cost, tight frustums, static shadow caching and procedural fake shadows.
16. `E:/.neo-work/docs/wiki/learnings/threejs-devtools-roomenvironment.md` **(lines 1–33)** — Existing devtools scene-selection trap and historical launch instructions.
17. `E:/.neo-work/docs/wiki/rules/deterministic-sim-testing.md` **(lines 1–23)** — Deterministic browser checks; return plain data rather than Three.js objects.
18. `E:/.neo-work/minitown/vendor/three.min.js` **(lines 1–5 only)** — Legacy-build deprecation warning. File exists; its full minified implementation was not reviewed.

## Exact Workspace Status

| Item | Observed status |
|---|---|
| `E:/.neo-work/gpt-6` | **Does not exist (`ENOENT`)**. No case-insensitive matching root entry either. |
| `E:/.neo-work/AGENTS.md` | **Absent**. |
| `E:/AGENTS.md` | **Absent**. |
| Root/parent `CLAUDE.md` | No matching entry found. |
| `E:/.neo-work/package.json` and `E:/package.json` | **Both absent**. |
| `E:/.neo-work/node_modules` | **Absent**. |
| Nearest package found in the shallow search | **`E:/.neo-work/3d-char/package.json`** — the only package manifest found in immediate child directories. |
| `E:/.neo-work/3d-char/node_modules` | **Exists**, alongside `package-lock.json`. |
| `E:/.neo-work/docs/wiki` | **Exists** with `changelog/`, `learnings/`, `pages/`, `rules/`. |
| Existing related demos | `minitown/`, `threejs-test2/`, `threejs-mcp-test/`, plus root `soldier.html` and other artifacts. These are not a `gpt-6` project. |

### Available tooling

- **On PATH:** Node **24.15.0**, npm **11.12.1**, Bun **1.4.0**, pnpm **10.33.3**, Python, Git and Python Playwright CLI **1.59.0**.
- **Installed under `3d-char/node_modules`:** TypeScript **5.8.3**, Vite **6.4.3**, esbuild **0.25.12**, Svelte **5.57.0**, SvelteKit **2.70.3**.
- **Absent from that dependency tree at the checked package paths:** `three`, `@types/three`, Node Playwright/Puppeteer packages, `three-mesh-bvh`, `lil-gui`, `stats.js`.
- **Browser executables present:** Chrome and Edge. Playwright browser caches contain Chromium, headless-shell and WebKit revisions; launch readiness was not tested.
- `.mcp.json` configures **`threejs-devtools-mcp` through `npx`**. Configuration exists; this does **not** establish that its server is installed, running or available to this session.
- The vendored MiniTown Three.js is a **legacy UMD/global build**, not a ready modern TypeScript dependency.

**Important:** A new sibling `gpt-6` project would not automatically resolve dependencies from `3d-char/node_modules`.

## Key Code

Actual excerpts from the requested skills, useful for the eventual implementation:

```typescript
// fundamentals, lines 154–162
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Color space (Three.js r152+)
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

```typescript
// geometry, lines 250–258
positions.needsUpdate = true;

// Recompute normals after position changes
geometry.computeVertexNormals();

// Recompute bounding box/sphere after changes
geometry.computeBoundingBox();
geometry.computeBoundingSphere();
```

These are reference fragments, not an existing stone-giant implementation.

## Architecture

### Recommended minimal implementation

**TypeScript entry → procedural geometry/material creation → named giant Group and plinth → lighting/camera → OrbitControls → render and cleanup.**

No React, Svelte, model loader, asset manager or custom shader framework is necessary.

### Actionable advice by skill

1. **Geometry — establish the silhouette before surface detail.**
   - Use low-detail `IcosahedronGeometry`/`DodecahedronGeometry` for boulders, tapered cylinders for limb cores, and a cylinder or lathed profile for the miniature base.
   - Build broad uneven shoulders, heavy fists, squat legs, substantial feet and a smaller recessed face. Deliberate overlap and asymmetry will read better than uniformly scattered rocks.
   - Modify vertex positions once during construction. Use coordinate-consistent deformation so duplicated vertices at the same position do not separate accidentally.
   - Recompute normals and bounds afterward. Use flat shading for angular stone.
   - Start with ordinary meshes. Instance repeated rubble; merge static compatible geometries only when draw-call measurements justify it. Bake transforms before merging.

2. **Materials — rough dielectric stone, not metallic plastic.**
   - Start with `MeshStandardMaterial`, **metalness `0`**, high roughness—approximately **`0.85–1` as an artistic starting point**—and restrained gray/brown variation.
   - Shared materials plus vertex colors can provide stone variation without external textures or hundreds of materials.
   - Dark inset geometry can represent crevices; sparse green/brown geometry or vertex colors can suggest moss.
   - Avoid PhysicalMaterial, transparency, transmission and custom GLSL for ordinary stone. Procedural CPU geometry/colors satisfy a strict TypeScript-only interpretation.

3. **Fundamentals — organize for posing and inspection.**
   - Put torso, head, arms and legs under named Groups with useful local pivots.
   - Use **Y-up**; keep the base near `y = 0`.
   - Choose orthographic framing for a collectible/isometric presentation, or a restrained perspective FOV for depth.
   - Frame from the giant’s bounds; keep camera near/far reasonably tight.
   - Size to the actual canvas container, update the projection on resize, and cap device pixel ratio at `2` or lower for mobile.
   - Use one animation loop with time-based motion. Render on demand if fully static; damping/autorotation require continued updates.
   - Dispose controls, unique geometries/materials/textures and renderer; stop the loop and remove listeners on teardown.

4. **Lighting — emphasize facets and ground contact.**
   - Begin with a directional key, hemisphere fill and optional non-shadowing rim.
   - Let **only the key cast shadows**. Start at a 1024 shadow map; increase only if visibly needed.
   - Fit the shadow camera around the giant and plinth; tune bias to scene scale.
   - Enable shadow receiving on the base and casting on major body masses.
   - Avoid point-light shadows: they require six shadow views.
   - Static geometry/lights can cache their shadow map. Regenerate it when the model pose, orientation or lighting changes.

5. **Interaction — OrbitControls is sufficient.**
   - Target the torso, constrain zoom, prevent orbiting underneath the base, and normally disable panning.
   - Use canvas-relative pointer coordinates if picking is actually needed.
   - Restrict raycasts to intended targets; omit selection/dragging/transform gizmos unless requested.
   - Shared materials are a selection hazard: changing one mesh’s material color can recolor every mesh sharing it.
   - Provide ordinary accessible reset/pause controls rather than making every operation pointer-only.

6. **Loaders — omit them for this build.**
   - No GLTF/OBJ/FBX/STL loaders, Draco/KTX2 decoders, remote font assets or asset-manager abstraction are needed.
   - Procedural geometry, vertex colors and optionally generated `CanvasTexture`/`DataTexture` eliminate asset loading entirely.
   - Environment maps are optional, not required for lit StandardMaterial. A procedural environment can be added later if direct lights are insufficient.
   - If assets are introduced later, use the loader’s existing `loadAsync()` rather than copying the custom Promise wrappers.

### Stale-example cautions

Do **not** copy these references unquestioningly:

- **Shared material ≠ automatic batching.** Separate Mesh objects still generate separate draws; use instancing/merging where appropriate.
- The lighting skill’s **`ContactShadows.js` example is not a standard vanilla Three.js solution**. Prefer ordinary shadows or a generated gradient plane.
- **`shadow.radius` does not control softness with `PCFSoftShadowMap`** as that example claims.
- The blanket **AO requires `uv2`** advice is version-sensitive. Modern texture UV-channel handling differs.
- Normal/roughness data maps should normally retain **`NoColorSpace`**, not the loaders example’s suggested `LinearSRGBColorSpace`.
- Examples are JavaScript fragments: TypeScript needs proper event/DOM types, Mesh/material narrowing and null checks.
- The best-practices index references `setup-choose-renderer.md` and `setup-animation-loop.md`, but **both files are missing locally**.
- No modern Three.js package is installed in the inspected project, so release-specific API compatibility remains to be checked.

## Start Here

Start with **`threejs-geometry/SKILL.md`, lines 24–123 and 237–259**: the giant’s shape and deformation are the central work. Then use materials **95–134** and lighting **204–252**.

For setup, establish a standalone TypeScript build rather than copying the SvelteKit configuration. The existing static server cannot compile `.ts`; browsers require emitted JavaScript.

**Read-only exploration completed:** no project files changed, packages installed, servers started or browsers launched.

**Wiki follow-up blocked:** the requested `okf-open-knowledge-format` skill was not found in the checked skill locations, and `wiki_mark_synced()` is not an exposed tool. No wiki update or sync was performed; the reported 2,212-file change set was not audited.
````

# Code-Only 3D — Technique Catalog

Copy-paste snippets for building any object from code. Every texture here is drawn on a `<canvas>`; every model is primitives + shaders. Use Three.js `0.160.0`.

## Table of contents

1. [Primitive geometry quick reference](#1-primitive-geometry-quick-reference)
2. [Canvas-drawn textures](#2-canvas-drawn-textures)
3. [Materials & shading](#3-materials--shading)
4. [GLSL shaders for effects](#4-glsl-shaders-for-effects)
5. [Articulation patterns](#5-articulation-patterns)
6. [Selection & feedback](#6-selection--feedback)
7. [Repeats & performance](#7-repeats--performance)
8. [Running gear — tracks & wheels (advanced module)](#8-running-gear--tracks--wheels-advanced-module)
9. [Environment](#9-environment)

---

## 1. Primitive geometry quick reference

| Class | Use for | Param order |
|---|---|---|
| `BoxGeometry(w,h,d)` | chassis, walls, slabs, cases | width, height, depth |
| `CylinderGeometry(rt,rb,h,seg)` | wheels (seg small = cog), barrels, towers, legs | top r, bottom r, height, radial seg |
| `ConeGeometry(r,h,seg)` | roofs (seg=4 = pyramid), foliage, nose | radius, height, radial seg |
| `SphereGeometry(r,w,h)` | bodies, heads, planets, hubs | radius, width seg, height seg |
| `TorusGeometry(r,tube,...)` | rings, bezels, handles | radius, tube |
| `RingGeometry(r1,r2,seg)` | selection rings, halos | inner, outer |
| `PlaneGeometry(w,h,sx,sy)` | flags, screens, water, billboards | w,h, subdiv x, subdiv y |
| `ExtrudeGeometry(shape,{depth})` | track bands, beveled panels, logos | a `THREE.Shape`, options |
| `ShapeGeometry(shape)` | flat 2D fills (decals, UI) | a `THREE.Shape` |
| `LatheGeometry(points,seg)` | vases, bottles, columns | profile points |
| `TubeGeometry(curve,...)` | pipes, tentacles, cables | a `THREE.Curve` |

**Orient a cylinder as a wheel/axle:** `mesh.rotation.x = Math.PI/2` lays its axis along Z so you see the round face from the side. To point a barrel forward (+X): `rotation.z = -Math.PI/2`.

**Material array per box face** (face order `[+x,-x,+y,-y,+z,-z]`): e.g. give sides a facade texture, top/bottom a solid — `new MeshStandardMaterial({map:facade})` in slots 0,1,4,5 and a plain material in 2,3.

---

## 2. Canvas-drawn textures

All return a `THREE.CanvasTexture`. Draw at runtime; no image files.

### Material library helper (hero builds)
One helper turns any drawing fn into a repeatable SRGB texture — the code-only "asset tier". With `RepeatWrapping`, `repeat` = tiles per face; on `ExtrudeGeometry` one tile ≈ one world unit.
```js
function canvasTex(w, h, draw, rx=1, ry=1){
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry); return t;
}
// proven drawing fns (see examples/house-v2.html in this skill): clapboard siding (horizontal boards
// + shadow line + seams), scalloped shingles (offset arc courses, value jitter),
// river stone (random ellipses + mortar stroke), panelled door (grain lines + inset
// strokeRect panels), painted grass (blobs + speckle + tiny flower dots)
```

### Facade with windows (buildings, vehicles)
```js
function makeFacadeTexture(){
  const c=document.createElement('canvas'); c.width=128; c.height=256;
  const g=c.getContext('2d');
  g.fillStyle='#8a92a6'; g.fillRect(0,0,128,256);          // wall
  g.fillStyle='#6d7589'; g.fillRect(0,0,128,18);            // trim
  const cols=4, rows=8, pad=16, ww=16, wh=18, gy=(256-60)/(rows-1);
  for(let r=0;r<rows;r++) for(let col=0;col<cols;col++){
    g.fillStyle = Math.random()<0.4 ? '#ffd866' : '#2b3142'; // lit / unlit
    g.fillRect(pad+col*((128-2*pad-ww)/(cols-1)), 36+r*gy, ww, wh);
  }
  const t=new THREE.CanvasTexture(c); t.magFilter=t.minFilter=THREE.NearestFilter; return t;
}
```

### Smooth noise (drives smoke / water / displacement)
```js
function makeNoiseTexture(){
  const s=document.createElement('canvas'); s.width=s.height=16;
  const sg=s.getContext('2d'), id=sg.createImageData(16,16);
  for(let i=0;i<16*16;i++){ const v=Math.random()*255; id.data[i*4]=id.data[i*4+1]=id.data[i*4+2]=v; id.data[i*4+3]=255; }
  sg.putImageData(id,0,0);
  const c=document.createElement('canvas'); c.width=c.height=64;
  const g=c.getContext('2d'); g.imageSmoothingEnabled=true;
  g.drawImage(s,0,0,16,16,0,0,64,64);                 // upscale → soft blobs
  const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; return t;
}
```

### Toon ramp (stepped shading lookup)
```js
function makeToonRamp(){
  const c=document.createElement('canvas'); c.width=4; c.height=1;
  const g=c.getContext('2d'), steps=['#566070','#8a93a6','#c2c8d6','#eef1f6'];
  steps.forEach((s,i)=>{g.fillStyle=s; g.fillRect(i,0,1,1);});
  const t=new THREE.CanvasTexture(c); t.magFilter=t.minFilter=THREE.NearestFilter; t.generateMipmaps=false; return t;
}
```

### Insignia decal (star, logo, symbol) on transparent
Draw a shape on a transparent canvas → `MeshBasicMaterial({map, transparent:true})` on a `PlaneGeometry`. Rotate the plane to face outward (`rotation.y = side>0?0:Math.PI`).

### Tread / wheel pattern, wood grain, dials, gradients
Same pattern: fill base, stamp repeating detail, return `CanvasTexture`. Set `wrapS/T=RepeatWrapping` + `repeat.set(n,m)` for tiling, `NearestFilter` for crisp pixels.

---

### Painted terrain / surface (multi-scale blobs)
Richer than flat speckle for terrain/surfaces: base fill + a few soft-blob layers at decreasing scales + fine grain. (See learnings: a flat plane + painted texture beats displaced geometry for clean stylized ground.)
```js
function paintedTexture(base, layers){   // layers: [[color, cellPx, density, alpha], ...]
  const S=128, c=document.createElement('canvas'); c.width=c.height=S;
  const g=c.getContext('2d');
  g.fillStyle=base; g.fillRect(0,0,S,S);
  for(const [color,cell,density,alpha] of layers){
    g.fillStyle=color; g.globalAlpha=alpha;
    for(let y=0;y<S;y+=cell) for(let x=0;x<S;x+=cell){
      if(Math.random()>density) continue;
      g.beginPath();
      g.arc(x+cell/2+(Math.random()-0.5)*cell, y+cell/2+(Math.random()-0.5)*cell, cell*(0.6+Math.random()*0.9), 0, Math.PI*2);
      g.fill();
    }
  }
  g.globalAlpha=0.12;   // fine grain
  for(let i=0;i<600;i++){ g.fillStyle=Math.random()<0.5?'#000':'#fff'; const s=Math.random()*2+1; g.fillRect(Math.random()*S,Math.random()*S,s,s); }
  return new THREE.CanvasTexture(c);
}
```

## 3. Materials & shading

### PBR presets (`MeshStandardMaterial`)
| Look | roughness | metalness | notes |
|---|---|---|---|
| Painted metal | 0.3 | 0.6 | car bodies, armor |
| Matte / wood / stone | 0.7–0.9 | 0.0 | walls, furniture, organic |
| Glass | 0.0 | 0.1 | `transparent:true, opacity:0.3` |
| Rubber | 0.9 | 0.0 | tires, treads |
| Chrome / gunmetal | 0.2–0.55 | 0.4–0.95 | trim, barrels |
| Glowing core | — | — | `emissive:0x.., emissiveIntensity:2` (animate it) |

### Stylized
- **Chunky/retro:** `flatShading:true` on the material (low-poly facets).
- **Toon/cel:** `new THREE.MeshToonMaterial({ gradientMap:makeToonRamp(), color })`.

---

## 4. GLSL shaders for effects

### Fresnel rim-glow shell (energy cores, magic, highlights)
Wrap a slightly larger copy of the mesh; back-side + additive.
```js
const glow = new THREE.Mesh(geo, new THREE.ShaderMaterial({
  uniforms:{ uColor:{value:new THREE.Color(0x66ccff)}, uPower:{value:2.2} },
  vertexShader:`varying vec3 vN; varying vec3 vV;
    void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
  fragmentShader:`uniform vec3 uColor; uniform float uPower; varying vec3 vN; varying vec3 vV;
    void main(){ float f=pow(1.0-max(dot(vN,vV),0.0),uPower); gl_FragColor=vec4(uColor,f*0.8); }`,
  transparent:true, blending:THREE.AdditiveBlending, side:THREE.BackSide, depthWrite:false
}));
```

### Smoke / fire (noise-twist vertex displacement, alpha-faded)
Needs `makeNoiseTexture()` as `uNoise`. Plane subdivided tall.
```js
const smoke = new THREE.ShaderMaterial({
  uniforms:{ uTime:{value:0}, uNoise:{value:makeNoiseTexture()} },
  vertexShader:`uniform float uTime; uniform sampler2D uNoise; varying vec2 vUv;
    void main(){
      vUv=uv;
      float n=texture2D(uNoise, vec2(0.5, uv.y*2.5 - uTime*0.35)).r;
      vec2 wind=(vec2(texture2D(uNoise,vec2(0.25,uTime*0.25)).r, texture2D(uNoise,vec2(0.75,uTime*0.25)).r)-0.5)*pow(uv.y,2.0)*0.5;
      vec3 p=position;
      float a=n*1.5708, ca=cos(a*uv.y), sa=sin(a*uv.y);
      p.xz=mat2(ca,-sa,sa,ca)*p.xz; p.xz+=wind;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
    }`,
  fragmentShader:`uniform float uTime; uniform sampler2D uNoise; varying vec2 vUv;
    void main(){
      float n=texture2D(uNoise, vec2(0.5, vUv.y*2.0 - uTime*0.15)).r;
      float a=smoothstep(0.15,0.7,n)*smoothstep(1.0,0.2,vUv.y)*smoothstep(0.0,0.15,vUv.y);
      vec3 col=mix(vec3(0.10),vec3(0.80),vUv.y);   // fire: flip to red→yellow
      gl_FragColor=vec4(col,a*0.55);
    }`,
  transparent:true, depthWrite:false, side:THREE.DoubleSide
});
// in update(t): smoke.uniforms.uTime.value = t*0.001;
```

### Waving cloth / flag (sine vertex displacement, weighted to free edge)
`PlaneGeometry(w,h,20,10)`, translate so one edge is at the pole. Weight waves by `uv.x` (0 at pole → 1 at tip).
```glsl
// vertex
uniform float uTime; varying vec2 vUv;
void main(){
  vUv=uv; vec3 p=position;
  float edge=uv.x;
  p.z += sin(p.x*3.0 - uTime*5.0)*0.28*edge;
  p.y += sin(p.x*2.0 - uTime*4.0)*0.05*edge;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
}
```

### Animated water (sine-displaced plane)
`PlaneGeometry(s,s,18,18)`, `rotation.x=-Math.PI/2`.
```glsl
// vertex
uniform float uTime; varying float vH;
void main(){
  vec3 p=position;
  float h=sin(p.x*4.0+uTime*2.0)*0.05 + sin(p.y*5.0-uTime*1.7)*0.05;
  p.z+=h; vH=h; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
}
// fragment
varying float vH;
void main(){ gl_FragColor=vec4(mix(vec3(0.10,0.35,0.55),vec3(0.45,0.75,0.90),smoothstep(-0.03,0.05,vH)),0.85); }
```

### Per-face color without a texture (e.g. Rubik cube)
Fragment tests position: `if(pos.x>0.499) gl_FragColor=...red;` etc.

---

## 5. Articulation patterns

Drive these in `update(t)` (`t` = ms from `requestAnimationFrame`).

- **Rotating/scanning turret:** `turret.rotation.y = Math.sin(t*0.0005)*0.7;`
- **Rolling wheel/sprocket** (axle along Z): `wheel.rotation.z += 0.012;` — needs a non-symmetric feature (teeth, hub, tread) to be visible.
- **Hinged / flapping part** (door, wing, laptop screen): `hinge.rotation.x = Math.sin(t*0.003)*0.6;` pivot at the hinge edge.
- **Idle bob:** `object.position.y = Math.sin(t*0.002)*0.03;`
- **Pulsing emissive/glow:** `mat.emissiveIntensity = 2.0 + Math.sin(t*0.004)*0.8;`
- **Track/grouser scroll** (if using a textured band): `treadTex.offset.x += 0.0015;` — tie to velocity in a real game.

Capture every moving part by returning it from `buildObject()` and referencing it in the `update` closure.

---

## 6. Selection & feedback

### Outline shell (back-side, inflated along normals)
Same geometry as the target, `side:BackSide`.
```js
const outline = new THREE.Mesh(geo, new THREE.ShaderMaterial({
  uniforms:{ uThickness:{value:0.06}, uColor:{value:new THREE.Color(0x66ddff)} },
  vertexShader:`uniform float uThickness; void main(){ gl_Position=projectionMatrix*modelViewMatrix*vec4(position+normal*uThickness,1.0); }`,
  fragmentShader:`uniform vec3 uColor; void main(){ gl_FragColor=vec4(uColor,1.0); }`,
  side:THREE.BackSide
}));
```

### Ground selection ring (RTS-style)
```js
const ring=new THREE.Mesh(new THREE.RingGeometry(1.9,2.1,48),
  new THREE.MeshBasicMaterial({color:0x44ff66,transparent:true,opacity:0.5,side:THREE.DoubleSide}));
ring.rotation.x=-Math.PI/2; ring.position.y=0.05;
// update: ring.material.opacity = 0.35 + Math.sin(t*0.004)*0.25;
```

### Emissive highlight / camera-facing status billboard
Highlight: clone material per instance, set `emissive`. Billboard: `PlaneGeometry` + texture, `billboard.lookAt(camera.position)` each frame.

---

### Click-to-select (raycast + click-vs-drag)
```js
const ray=new THREE.Raycaster(), ndc=new THREE.Vector2(); let down=null;
dom.addEventListener('pointerdown', e=>down={x:e.clientX,y:e.clientY});
dom.addEventListener('pointerup', e=>{
  if(!down) return; const dx=e.clientX-down.x, dy=e.clientY-down.y; down=null;
  if(dx*dx+dy*dy > 25) return;            // a drag (pan/orbit) — not a click
  ndc.x=(e.clientX/innerWidth)*2-1; ndc.y=-(e.clientY/innerHeight)*2+1;
  ray.setFromCamera(ndc, camera);
  const hit=ray.intersectObjects(pickables,false)[0];   // pickables = meshes with userData={q,r,...}
  if(hit) select(hit.object.userData); else clear();
});
```
Store identity in `mesh.userData`; collect pickable meshes in an array. The drag threshold stops pan/orbit from triggering a select.

### Turntable (rotate the object, not the camera)
Keep the camera still; spin the map group in 90° steps.
```js
let target=0; const turn=d=>target+=d*Math.PI/2;        // buttons / ArrowLeft / ArrowRight call turn(±1)
// in animate():  map.rotation.y += (target - map.rotation.y)*0.18;
```
Parent any selection overlay to `map` so it turns with the tiles.

## 7. Repeats & performance

- **Reuse one geometry** for all wheels/windows/rivets; only the material/matrix differs.
- **InstancedMesh** for many identical parts (forests, crowds, rivets):
```js
const inst = new THREE.InstancedMesh(geo, mat, COUNT);
inst.castShadow = true;
const o = new THREE.Object3D();
for(let i=0;i<COUNT;i++){
  o.position.set(x,y,z); o.rotation.y=Math.random()*6.28; o.scale.setScalar(0.8+Math.random()*0.5);
  o.updateMatrix(); inst.setMatrixAt(i, o.matrix);
}
inst.instanceMatrix.needsUpdate = true; scene.add(inst);
```
- **Merge** several geometries into one draw call: `import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'` then `mergeGeometries([g1,g2,...])` (all must share the same attributes; add a `color` attribute per part for multi-color merged meshes with `vertexColors:true`).

---

## 8. Running gear — tracks & wheels (advanced module)

Real tank/crawler tracks: a **continuous band** (extruded stadium-ring) wrapping **road wheels + drive sprocket + idler**, plus return rollers and grouser cleats. From the Mammoth Tank example (`../../../code-examples/red-alert-units/vehicles/mammoth-tank.html`).

```js
const TRACK_W = 0.6, trackMat = new THREE.MeshStandardMaterial({color:0x262a21,roughness:0.95});
const wheelMat = new THREE.MeshStandardMaterial({color:0x33373d,roughness:0.6,metalness:0.4});
const hubMat   = new THREE.MeshStandardMaterial({color:0x5a616b,roughness:0.4,metalness:0.6});

// Stadium ring (rounded-rectangle outline with a hole) = side profile of one track.
function stadiumRingShape(innerR, outerR, straightLen){
  const half=straightLen/2, s=new THREE.Shape();
  s.moveTo(-half,outerR); s.lineTo(half,outerR);
  s.absarc(half,0,outerR, Math.PI/2,-Math.PI/2,true);
  s.lineTo(-half,-outerR);
  s.absarc(-half,0,outerR, -Math.PI/2,Math.PI/2,true);
  const h=new THREE.Path();
  h.moveTo(-half,innerR); h.lineTo(half,innerR);
  h.absarc(half,0,innerR, Math.PI/2,-Math.PI/2,true);
  h.lineTo(-half,-innerR);
  h.absarc(-half,0,innerR, -Math.PI/2,Math.PI/2,true);
  s.holes.push(h); return s;
}

function buildTrack(outerSign){                 // outerSign: which face hubs point out
  const g=new THREE.Group();
  const band=new THREE.Mesh(
    new THREE.ExtrudeGeometry(stadiumRingShape(0.30,0.43,2.0),
      {depth:TRACK_W, bevelEnabled:true, bevelThickness:0.02, bevelSize:0.02, bevelSegments:1, steps:1}),
    trackMat);
  band.geometry.translate(0,0,-TRACK_W/2);
  band.castShadow=band.receiveShadow=true; g.add(band);

  const wheel=(r)=>{ const w=new THREE.Group();
    const tire=new THREE.Mesh(new THREE.CylinderGeometry(r,r,TRACK_W*0.82,28), wheelMat);
    tire.rotation.x=Math.PI/2; tire.castShadow=true; w.add(tire);
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(r*0.5,r*0.5,TRACK_W*0.4,16), hubMat);
    hub.rotation.x=Math.PI/2; hub.position.z=outerSign*TRACK_W*0.28; w.add(hub); return w; };

  for(const x of [-0.7,-0.35,0,0.35,0.7]) g.add(Object.assign(wheel(0.28),{position:new THREE.Vector3(x,0,0)}));
  const idler=wheel(0.295); idler.position.set(1,0,0); g.add(idler);

  // toothed drive sprocket (rear) — the visibly rolling part
  const sprocket=new THREE.Group();
  const sb=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,TRACK_W*0.85,24), wheelMat);
  sb.rotation.x=Math.PI/2; sprocket.add(sb);
  const tg=new THREE.BoxGeometry(0.06,0.08,TRACK_W*0.85);
  for(let i=0;i<10;i++){ const a=i/10*Math.PI*2, tooth=new THREE.Mesh(tg,hubMat);
    tooth.position.set(Math.cos(a)*0.28,Math.sin(a)*0.28,0); tooth.rotation.z=a; sprocket.add(tooth); }
  const sh=new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.13,TRACK_W*0.4,16), hubMat);
  sh.rotation.x=Math.PI/2; sh.position.z=outerSign*TRACK_W*0.28; sprocket.add(sh);
  sprocket.position.set(-1,0,0); g.add(sprocket); g.userData.sprocket=sprocket;

  for(const x of [-0.45,0.45]){ const rr=wheel(0.12); rr.position.set(x,0.17,0); g.add(rr); }
  for(let x=-0.95;x<=0.95;x+=0.17){ const gr=new THREE.Mesh(new THREE.BoxGeometry(0.10,0.05,TRACK_W), trackMat);
    gr.position.set(x,-0.445,0); g.add(gr); }
  return g;
}
// usage: place one at z=+0.95 (outerSign+1) and one at z=-0.95 (outerSign-1); spin sprockets in update.
```
For a **wheeled** vehicle instead, skip the band: just place `CylinderGeometry` wheels (rotated `x=π/2`) at 4+ corners.

---

## 9. Environment

- **Ground disc:** `CylinderGeometry(r,r,0.4,48)` at `y=-0.2`, `receiveShadow:true`.
- **Hex tile:** `CylinderGeometry(r,r,0.4,6)` (6 sides = hex prism).
- **Sky tint:** `scene.background = new THREE.Color(...)`; add `THREE.Fog(color, near, far)`.
- **Golden-hour sky (hero builds):** vertical-gradient CanvasTexture as `scene.background` + `THREE.Fog` matching the gradient's horizon band + a cool `DirectionalLight` (~0.55) opposite the warm key:
```js
const sky = document.createElement('canvas'); sky.width = 2; sky.height = 256;
{ const g = sky.getContext('2d'), gr = g.createLinearGradient(0,0,0,256);
  gr.addColorStop(0,'#6db3e8'); gr.addColorStop(0.62,'#a8d4ec'); gr.addColorStop(1,'#f2ecd8');
  g.fillStyle = gr; g.fillRect(0,0,2,256); }
scene.background = new THREE.CanvasTexture(sky);
scene.fog = new THREE.Fog(0xd9e6e8, 22, 55);
```
- **Candle-flicker emissive (windows/lamps):** `mat.emissiveIntensity = 1 + 0.25*Math.sin(t*0.0021) + 0.08*Math.sin(t*0.013)` — one shared material flickers every window for free.
- **Cartoon outdoor fill:** `HemisphereLight(skyColor, groundColor, ~1.4)` — the ground color is the bounce that sells "outdoor".
- **Soft shadows:** `renderer.shadowMap.type = THREE.PCFSoftShadowMap`; size the sun's `shadow.camera` ortho to the object.

### Ridged-fbm mountain heightfield on a clamped-hex grid (terrain tiles)
For a *mountain* tile the "flat plane + painted texture" rule (learnings) does NOT apply — mountains need real relief. Displace a grid with **ridged** fbm (sharp crests, not soft blobs), clamp the rim to the hex, and bake vertex colours:
```js
const geo = new THREE.PlaneGeometry(2*HR, 2*HR, 64, 64);
geo.rotateX(-Math.PI/2);
/* ridged fbm: ridge = 1 - |2·fbm - 1|, then pow to sharpen crests */
function ridge(x,y){ const n = fbm(x,y); return 1 - Math.abs(2*n - 1); }
/* pointy-top hex slabs: |p·n| ≤ √3·HR/2 for normals at 0°,60°,120° — clamp, never cull */
const APOTHEM = Math.sqrt(3)*HR/2, NORMALS = [[1,0],[0.5,Math.sqrt(3)/2],[-0.5,Math.sqrt(3)/2]];
for each vertex v (XZ):
  clamp v onto the slabs (2 passes, subtract the overshoot along each normal);
  const rim = max|v·n|/APOTHEM;                     // 1 at the tile rim
  let h = Math.pow(ridge(v.x*1.6+off, v.z*1.6+off), 1.6);
  h *= PEAK * (1 - rim*rim*0.9);                     // fall to near-flat at the rim → stitches to the prism top
  h += (fbm(v.x*6, v.z*6)-0.5)*0.06;                 // fine rock detail
  v.y = h;
geo.computeVertexNormals();
/* baked vertex colours (no texture): rock lerp by height, scree on steep-low facets,
   snow where h > snowline(=0.62+noise·0.18, ragged!) AND slope is gentle (steep cliffs stay rock) */
new THREE.MeshStandardMaterial({ vertexColors:true, flatShading:true, roughness:0.96 });
```
Key tricks: the `(1 - rim²)` falloff welds the relief to the hex prism below (no floating edge); `flatShading:true` is CORRECT here — craggy facets are the whole point (unlike smooth ground, where it betrays the triangulation); offset the fbm so the summit is off-centre, not a bullseye. Working example: `game-assets/mountain-hex.html`.

### Cloud wisps (soft sprite drift)
```js
function cloudTexture(){
  const S=128, cv=document.createElement('canvas'); cv.width=cv.height=S;
  const g=cv.getContext('2d');
  for(let i=0;i<5;i++){
    const x=S/2+(Math.random()-0.5)*S*0.4, y=S/2+(Math.random()-0.5)*S*0.25, r=S*(0.18+Math.random()*0.16);
    const gr=g.createRadialGradient(x,y,0,x,y,r);
    gr.addColorStop(0,'rgba(235,242,248,0.55)'); gr.addColorStop(1,'rgba(235,242,248,0)');
    g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill();
  }
  return new THREE.CanvasTexture(cv);
}
/* 3-4 THREE.Sprite with SpriteMaterial({map, transparent:true, opacity:~0.4, depthWrite:false, fog:false});
   drift position.x slowly, wrap when > scene edge; pulse opacity on a slow sine. Auto-billboards, no shader needed. */
```

---

## 10. 2D / top-down rendering

Three.js does real 2D: an `OrthographicCamera` with no perspective, flat `MeshBasicMaterial` (unlit), everything in the XY plane. Three camera styles:

- **Centered world-unit top-down (best for scenes):** camera at `(0,0,d)` looking at origin down -Z; build in meters/cells centered at origin; fit the frustum to window aspect ("contain") so the scene stays fully visible. Used by the football pitch.
- **Pixel-coordinate top-down (screen-space):** `new OrthographicCamera(0, width, height, 0, -1, 1)` — positions in pixels, origin top-left. Good for HUDs/overlays; not resolution-independent.
- **Fullscreen quad + shader (no real camera):** a plain `THREE.Camera()` (or ortho) with one `PlaneGeometry(2,2)` and a fragment shader writing UV/`gl_FragCoord` directly — pure shader/WebGL, not scene-based. Use for generated images.

### Unlit materials & draw order
Use `MeshBasicMaterial({color})` (ignores lights, flat color). **No lights needed for 2D.** Layer with small `z` offsets (grass 0, lines 0.01, ball 0.02, players 0.03) instead of a 3D depth scene.

### 2D line / arc / disc helpers
```js
const T = 0.22, lineMat = new THREE.MeshBasicMaterial({color:0xffffff, side:THREE.DoubleSide});
const line = (w,h,x,y)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h), lineMat); m.position.set(x,y,0.01); return m; };
const disc = (r,x,y)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(r,24), lineMat); m.position.set(x,y,0.01); return m; };
// annular sector: full ring if (a1-a0)=2π, partial arc otherwise — RingGeometry can't do partial arcs
function arc(cx,cy,innerR,outerR,a0,a1){
  const s=new THREE.Shape();
  s.absarc(cx,cy,outerR,a0,a1,false);
  s.absarc(cx,cy,innerR,a1,a0,true);
  return new THREE.Mesh(new THREE.ShapeGeometry(s), lineMat);
}
```

### Mowing stripes / tiled 2D ground
Alternating-color `PlaneGeometry` tiles (no texture) give crisp stripes with zero UV/flip issues.

---

## 11. Building idioms — roofs, arches, palms (from the 5-house style set)

**Hip roof = 4-segment cone, scaled rectangular.** `ConeGeometry(0.5, 1, 4, 1)`, `mesh.rotation.y = Math.PI/4`, then `mesh.scale.set(2*a, h, 2*b)` gives a rectangular hip roof with half-extents `a`/`b` and height `h` (radius 0.5 → x-extent 0.5·scale.x). One mesh, no custom geometry; UVs ring around so a row-coursed tile texture reads as courses.

**Arched opening = Shape + absarc + ExtrudeGeometry.** For a door/window of half-width `hw` with spring at `hh`:
`shape.moveTo(-hw,0); lineTo(hw,0); lineTo(hw,hh); shape.absarc(0,hh,hw,0,Math.PI,false); lineTo(-hw,0)`.
Extrude `depth:0.1–0.14` for the leaf; extrude the SAME shape scaled up once for the recessed stucco surround (draw surround behind, leaf in front, 0.04–0.06 z apart).

**Tapered square column = 4-sided cylinder.** `CylinderGeometry(rTop, rBottom, h, 4)` + `rotateY(Math.PI/4)` — the Craftsman tapered porch column without any custom geometry.

**Palm tree = stacked offset trunk cylinders + canvas frond planes.** Draw one frond (stem + chevron leaflets) on a transparent 128×256 canvas; `PlaneGeometry` with `alphaTest:0.5, side:DoubleSide`; pivot at the base via `geo.translate(0,-len/2,0); geo.rotateX(Math.PI/2)` so each frond extends outward, then `hold.rotation.y = i*2π/n` and `leaf.rotation.z = droop`. 9 fronds read as a full crown; sway the crown group only.

**Barrel roof tiles = rows of arcs with a 3-stop linear gradient** (dark at base, light mid, dark tip) — reads as half-cylinders from any distance. Fish-scale shingles = same arc rows, two alternating palette colors.

## Where to go deeper

- `../../../code-examples/` — runnable demos of every technique above.
- `../../../index.md` — ~130 more techniques (lava/marble/wood shaders, mazes, physics, post-processing, full Three.js feature encyclopedia) mapped to source in `../../../docs/`.

import './style.css';
import {
  ACESFilmicToneMapping, Box3, BufferGeometry, DataTexture, DirectionalLight,
  Group, HemisphereLight, InstancedMesh, Material, MathUtils, Mesh, MeshBasicMaterial,
  PCFShadowMap, PerspectiveCamera, PlaneGeometry, PMREMGenerator,
  RGBAFormat, Scene, ShadowMaterial, Sphere, Spherical, SRGBColorSpace,
  Texture, UnsignedByteType, Vector3, WebGLRenderer, WebGLRenderTarget,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createStoneGiant } from './giant';
import { checkStoneGiant } from './check';

type ViewPreset = 'three-quarter' | 'front' | 'detail' | 'rear';
interface StoneGiantDebug {
  ready: boolean;
  scene: Scene;
  camera: PerspectiveCamera;
  controls: OrbitControls;
  renderer: WebGLRenderer;
  model: Group;
  setView: (preset: ViewPreset) => void;
  check: () => ReturnType<typeof checkStoneGiant>;
  validation: ReturnType<typeof checkStoneGiant>;
}
declare global { interface Window { __stoneGiant?: StoneGiantDebug } }

const app = document.querySelector<HTMLElement>('#app')!;
app.innerHTML = `
  <header class="caption">
    <p class="eyebrow">PROCEDURAL STUDY / 001</p>
    <h1>STONE GIANT</h1>
    <p class="caption-note">Stone, hide &amp; quiet strength.<br>A miniature imagined in code.</p>
  </header>
  <div id="stage"></div>
  <p id="status" role="status" aria-live="polite">Preparing the sculpture…</p>
  <p id="keyboard-help" class="sr-only">Drag to orbit. Scroll or pinch to zoom. When the sculpture is focused, use arrow keys to orbit, plus or minus to zoom, and Home to reset. Buttons below provide front, detail, reset and auto rotate views.</p>
  <footer class="controls">
    <div class="control-buttons" role="group" aria-label="Sculpture views">
      <button type="button" id="reset" title="Reset the three-quarter view">Reset view</button>
      <button type="button" id="front">Front</button>
      <button type="button" id="detail">Detail</button>
      <button type="button" id="rotate" aria-pressed="false">Auto rotate</button>
    </div>
    <p class="hint">Drag to orbit <span>·</span> Scroll to zoom <span>·</span> Arrow keys to explore</p>
  </footer>`;

const stage = document.querySelector<HTMLElement>('#stage')!;
const status = document.querySelector<HTMLElement>('#status')!;
const buttons = Array.from(app.querySelectorAll<HTMLButtonElement>('button'));
const rotateButton = document.querySelector<HTMLButtonElement>('#rotate')!;
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

function message(text: string, error = false): void {
  status.textContent = text;
  status.hidden = !text;
  status.classList.toggle('error', error);
}

function start(): (() => void) | undefined {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (error) {
    console.error('[Stone giant] WebGL initialization failed', error);
    message('This study needs WebGL 2. Enable hardware acceleration in your browser, then reload. You can also try a current browser on another device.', true);
    buttons.forEach((button) => { button.disabled = true; });
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setClearColor(0x252522, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive sculpture of a stern, muscular stone giant wearing an ochre hide wrap, bone necklace, shin straps and sandals; holding a weathered rock on a mossy circular black plinth.');
  canvas.setAttribute('aria-describedby', 'keyboard-help');
  canvas.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight ArrowUp ArrowDown + - Home');
  stage.append(canvas);

  const scene = new Scene();
  scene.name = 'Stone Giant · museum studio';
  const camera = new PerspectiveCamera(32, 1, 0.1, 160);
  camera.name = 'Specimen camera';
  camera.position.set(12, 9, 19);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.enablePan = false;
  controls.enableDamping = !motion.matches;
  controls.dampingFactor = 0.085;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.75;
  controls.autoRotateSpeed = 0.65;
  controls.minPolarAngle = Math.PI * 0.2;
  controls.maxPolarAngle = Math.PI * 0.51;

  let frame = 0;
  let lastTime = 0;
  let disposed = false;
  let contextLost = false;
  let environmentTarget: WebGLRenderTarget | undefined;
  let observer: ResizeObserver | undefined;
  let onControlsChange: (() => void) | undefined;
  const abort = new AbortController();
  const events = { signal: abort.signal };

  function cleanup(): void {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer?.disconnect();
    abort.abort();
    if (onControlsChange) controls.removeEventListener('change', onControlsChange);
    controls.dispose();
    const geometries = new Set<BufferGeometry>();
    const materials = new Set<Material>();
    const textures = new Set<Texture>();
    scene.traverse((object) => {
      if (object instanceof DirectionalLight) object.shadow.dispose();
      if (!(object instanceof Mesh)) return;
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        materials.add(material);
        for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
      }
      if (object instanceof InstancedMesh) object.dispose();
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
    scene.environment = null;
    environmentTarget?.dispose();
    renderer.renderLists.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    scene.clear();
    canvas.remove();
    if (window.__stoneGiant?.renderer === renderer) {
      window.__stoneGiant.ready = false;
      delete window.__stoneGiant;
    }
  }

  try {
  const environment = (): WebGLRenderTarget => {
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    try { return pmrem.fromScene(room, 0.04); }
    finally {
      room.traverse((object) => { if (object instanceof InstancedMesh) object.dispose(); });
      room.dispose();
      pmrem.dispose();
    }
  };
  environmentTarget = environment();
  scene.environment = environmentTarget.texture;
  scene.environmentIntensity = 0.38;
  scene.add(new HemisphereLight(0xdbe0dc, 0x575040, 0.65));
  const key = new DirectionalLight(0xffe4bd, 3.0);
  key.name = 'Broad warm key · single shadow';
  key.position.set(-6, 13, 9);
  key.target.position.set(0, 4, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.5, far: 32 });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.normalBias = 0.024;
  key.shadow.bias = -0.00015;
  key.shadow.radius = 3;
  const fill = new DirectionalLight(0xc1d4e4, 1.25);
  fill.name = 'Cool right fill';
  fill.position.set(8, 7, 6);
  const rim = new DirectionalLight(0xe6dbc1, 2.2);
  rim.name = 'Soft rear rim';
  rim.position.set(-3, 10, -7);
  scene.add(key, key.target, fill, rim);

  // Model failures are intentionally not hidden by the WebGL fallback.
  const model = createStoneGiant();
  scene.add(model);
  model.traverse((object) => {
    if (object instanceof Mesh) { object.castShadow = true; object.receiveShadow = true; }
  });
  const validation = checkStoneGiant(model);
  const modelBounds = new Box3().setFromObject(model);
  const center = modelBounds.getCenter(new Vector3());
  const sphere = modelBounds.getBoundingSphere(new Sphere());

  const ground = new Mesh(new PlaneGeometry(200, 200), new ShadowMaterial({ opacity: 0.24, depthWrite: false }));
  ground.name = 'Studio shadow receiver';
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.025;
  ground.receiveShadow = true;
  scene.add(ground);
  // Generated soft contact shadow; no downloaded image or per-frame texture work.
  const pixels = new Uint8Array(128 * 128 * 4);
  for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
    const radius = Math.hypot((x - 63.5) / 63.5, (y - 63.5) / 63.5);
    pixels[(y * 128 + x) * 4 + 3] = Math.round(90 * Math.pow(Math.max(0, 1 - radius), 1.6));
  }
  const contactTexture = new DataTexture(pixels, 128, 128, RGBAFormat, UnsignedByteType);
  contactTexture.needsUpdate = true;
  const contact = new Mesh(new PlaneGeometry(9, 9), new MeshBasicMaterial({ map: contactTexture, transparent: true, depthWrite: false, toneMapped: false }));
  contact.name = 'Soft plinth contact';
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = -0.018;
  scene.add(contact);

  let viewBounds = modelBounds;
  let fittedDistance = 1;
  const offset = new Vector3();
  const spherical = new Spherical();
  const direction = new Vector3();
  const up = new Vector3(0, 1, 0);
  const right = new Vector3();
  const cameraUp = new Vector3();
  const corner = new Vector3();

  function invalidate(): void {
    if (!frame && !disposed && !contextLost && !document.hidden) frame = requestAnimationFrame(render);
  }
  function render(time: number): void {
    frame = 0;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
    lastTime = time;
    const changed = controls.update(delta);
    renderer.render(scene, camera);
    debug.ready = true;
    if (controls.autoRotate || changed) invalidate();
    else lastTime = 0;
  }
  function stopRotation(): void {
    controls.autoRotate = false;
    rotateButton.setAttribute('aria-pressed', 'false');
  }
  function flushDamping(): void {
    controls.enableDamping = false;
    controls.update();
    controls.enableDamping = !motion.matches;
  }
  function fitDistance(bounds: Box3, target: Vector3, viewDirection: Vector3): number {
    right.crossVectors(up, viewDirection).normalize();
    cameraUp.crossVectors(viewDirection, right).normalize();
    const tanV = Math.tan(MathUtils.degToRad(camera.fov / 2)) * 0.87;
    const tanH = tanV * camera.aspect;
    let distance = 0;
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      corner.set(x, y, z).sub(target);
      distance = Math.max(distance, corner.dot(viewDirection) + Math.max(Math.abs(corner.dot(right)) / tanH, Math.abs(corner.dot(cameraUp)) / tanV));
    }
    return distance;
  }
  function setView(preset: ViewPreset): void {
    if (!['three-quarter', 'front', 'detail', 'rear'].includes(preset)) throw new Error('Unknown sculpture view');
    stopRotation();
    flushDamping();
    direction.set(preset === 'front' || preset === 'rear' ? 0 : 12, preset === 'detail' ? 1.5 : 4, preset === 'rear' ? -22 : 19).normalize();
    controls.target.copy(center);
    let bounds = modelBounds;
    if (preset === 'detail') {
      bounds = new Box3(new Vector3(-1.9, 6.9, -0.9), new Vector3(1.9, modelBounds.max.y, 1.1));
      bounds.getCenter(controls.target);
    }
    viewBounds = bounds;
    fittedDistance = fitDistance(viewBounds, controls.target, direction);
    controls.minDistance = 3.5;
    controls.maxDistance = Math.max(55, fittedDistance * 2.3);
    camera.far = Math.max(160, controls.maxDistance + sphere.radius * 2);
    camera.updateProjectionMatrix();
    camera.position.copy(controls.target).addScaledVector(direction, fittedDistance);
    controls.update();
    controls.saveState();
    invalidate();
  }
  function resize(): void {
    const { width, height } = stage.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;
    // Preserve the chosen direction and zoom; only compensate for a changed fit.
    offset.copy(camera.position).sub(controls.target);
    direction.copy(offset).normalize();
    const zoom = offset.length() / fitDistance(viewBounds, controls.target, direction);
    camera.aspect = width / height;
    fittedDistance = fitDistance(viewBounds, controls.target, direction);
    controls.maxDistance = Math.max(55, fittedDistance * 2.3);
    camera.far = Math.max(160, controls.maxDistance + sphere.radius * 2);
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    camera.position.copy(controls.target).addScaledVector(direction, MathUtils.clamp(fittedDistance * zoom, controls.minDistance, controls.maxDistance));
    controls.update();
    invalidate();
  }
  function keyboard(event: KeyboardEvent): void {
    if (!controls.enabled || event.altKey || event.ctrlKey || event.metaKey) return;
    const keyName = event.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_', 'Home'].includes(keyName)) return;
    event.preventDefault();
    if (keyName === 'Home') { setView('three-quarter'); return; }
    stopRotation();
    flushDamping();
    spherical.setFromVector3(offset.copy(camera.position).sub(controls.target));
    if (keyName === 'ArrowLeft') spherical.theta -= 0.12;
    if (keyName === 'ArrowRight') spherical.theta += 0.12;
    if (keyName === 'ArrowUp') spherical.phi -= 0.09;
    if (keyName === 'ArrowDown') spherical.phi += 0.09;
    if (keyName === '+' || keyName === '=') spherical.radius *= 0.9;
    if (keyName === '-' || keyName === '_') spherical.radius *= 1.1;
    spherical.phi = MathUtils.clamp(spherical.phi, controls.minPolarAngle, controls.maxPolarAngle);
    spherical.radius = MathUtils.clamp(spherical.radius, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(offset.setFromSpherical(spherical));
    controls.update();
    invalidate();
  }
  function updateMotion(): void {
    stopRotation();
    flushDamping();
    rotateButton.disabled = motion.matches || contextLost;
    rotateButton.title = motion.matches ? 'Auto rotate is off because reduced motion is enabled on this device.' : 'Slowly turn the sculpture view';
    invalidate();
  }

  const debug: StoneGiantDebug = { ready: false, scene, camera, controls, renderer, model, setView, check: () => checkStoneGiant(model), validation };
  window.__stoneGiant = debug;
  onControlsChange = invalidate;
  controls.addEventListener('change', invalidate);
  canvas.addEventListener('keydown', keyboard, events);
  document.querySelector('#reset')!.addEventListener('click', () => setView('three-quarter'), events);
  document.querySelector('#front')!.addEventListener('click', () => setView('front'), events);
  document.querySelector('#detail')!.addEventListener('click', () => setView('detail'), events);
  rotateButton.addEventListener('click', () => {
    if (motion.matches) return;
    controls.autoRotate = !controls.autoRotate;
    rotateButton.setAttribute('aria-pressed', String(controls.autoRotate));
    invalidate();
  }, events);
  motion.addEventListener('change', updateMotion, events);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    else invalidate();
  }, events);
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    contextLost = true;
    debug.ready = false;
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    controls.enabled = false;
    stopRotation();
    buttons.forEach((button) => { button.disabled = true; });
    message('The graphics connection was interrupted. Waiting to restore it; if the sculpture does not return, reload this tab.', true);
  }, events);
  canvas.addEventListener('webglcontextrestored', () => {
    environmentTarget?.dispose();
    environmentTarget = environment();
    scene.environment = environmentTarget.texture;
    renderer.shadowMap.needsUpdate = true;
    contextLost = false;
    controls.enabled = true;
    buttons.forEach((button) => { button.disabled = false; });
    updateMotion();
    message('');
    invalidate();
  }, events);
  observer = new ResizeObserver(resize);
  // Establish the initial framing before the observer preserves a user's orbit.
  camera.aspect = stage.clientWidth / Math.max(1, stage.clientHeight);
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  setView('three-quarter');
  updateMotion();
  observer.observe(stage);
  message('');
  // Background tabs suspend animation frames; still prepare one complete first image.
  render(performance.now());

  return cleanup;
  } catch (error) {
    cleanup();
    buttons.forEach((button) => { button.disabled = true; });
    message('The sculpture could not be prepared. Reload this tab; if this persists, inspect the browser console for the original model error.', true);
    throw error;
  }
}

const cleanup = start();
if (cleanup) {
  const onPageHide = (event: PageTransitionEvent): void => { if (!event.persisted) cleanup(); };
  window.addEventListener('pagehide', onPageHide);
  if (import.meta.hot) import.meta.hot.dispose(() => {
    window.removeEventListener('pagehide', onPageHide);
    cleanup();
  });
}

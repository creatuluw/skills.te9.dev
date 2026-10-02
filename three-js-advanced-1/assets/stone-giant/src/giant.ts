import * as THREE from 'three';
import { SculptField, mergeParts, noise, tapered, tube, v, type V3 } from './sculpt';

const TAU = Math.PI * 2;
const rotate = (x = 0, y = 0, z = 0): THREE.Quaternion => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z));

/** No images, canvas, DOM, shader injection, or runtime downloads. */
function surfaceMaps(kind: 'stone' | 'leather' | 'bone'): { map: THREE.DataTexture; bumpMap: THREE.DataTexture } {
  const size = kind === 'stone' ? 768 : 256;
  const color = new Uint8Array(size * size * 4), bump = new Uint8Array(size * size * 4);
  const base = kind === 'stone' ? [117, 133, 137] : kind === 'leather' ? [159, 111, 49] : [194, 177, 130];
  for (let y = 0; y < size; y++) {
    const b = y / size * TAU;
    for (let x = 0; x < size; x++) {
      const a = x / size * TAU;
      // Periodic coordinates make the texture tile without a painted-on square seam.
      const qx = Math.cos(a), qy = Math.sin(a) + Math.cos(b), qz = Math.sin(b);
      const broad = noise(qx * 4, qy * 4, qz * 4);
      const grain = noise(qx * 39 + 17, qy * 39, qz * 39);
      const fine = noise(qx * 131, qy * 131 + 9, qz * 131);
      const contour = Math.abs(Math.sin(a * 9 + b * 5 + 2.7 * Math.sin(b * 2 + Math.cos(a)) + broad * 6));
      const hairline = Math.abs(Math.sin(a * 21 - b * 12 + 4 * Math.sin(b * 3 - a) + broad * 9));
      const chalk = kind === 'stone' ? Math.max(0, 1 - contour / .095) * .56 + Math.max(0, 1 - hairline / .065) * .26 : 0;
      const fissure = kind === 'stone' && broad > .49 ? Math.max(0, 1 - Math.abs(Math.sin(a * 3 + b * 2 + 4 * broad)) / .035) : 0;
      const pores = fine > .73 ? (fine - .73) * 1.5 : 0;
      const shade = .80 + broad * .30 + (grain - .5) * .22 + (fine - .5) * .09 - fissure * .40 - pores;
      const i = (y * size + x) * 4;
      for (let c = 0; c < 3; c++) color[i + c] = Math.min(255, base[c]! * shade + chalk * (kind === 'stone' ? 89 : 22));
      color[i + 3] = 255;
      const height = Math.max(0, Math.min(255, 112 + (grain - .5) * 85 + (fine - .5) * 42 - fissure * 87 - chalk * 44));
      bump[i] = bump[i + 1] = bump[i + 2] = height; bump[i + 3] = 255;
    }
  }
  const texture = (data: Uint8Array, srgb: boolean): THREE.DataTexture => {
    const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter;
    t.generateMipmaps = true; t.anisotropy = 4;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  };
  return { map: texture(color, true), bumpMap: texture(bump, false) };
}

function mesh(parent: THREE.Group, name: string, geometry: THREE.BufferGeometry, material: THREE.Material): THREE.Mesh {
  const object = new THREE.Mesh(geometry, material);
  object.name = name; object.castShadow = true; object.receiveShadow = true;
  parent.add(object);
  return object;
}

function ellipsoid(center: V3, radius: V3, rotation = new THREE.Quaternion(), segments = 24): THREE.BufferGeometry {
  const g = new THREE.SphereGeometry(1, segments, Math.ceil(segments * .66));
  g.scale(...radius); g.applyQuaternion(rotation); g.translate(...center);
  return g;
}

function ring(center: V3, radius: number, thickness: number, rotation = new THREE.Quaternion()): THREE.BufferGeometry {
  const g = new THREE.TorusGeometry(radius, thickness, 9, 36);
  g.applyQuaternion(rotation); g.translate(...center);
  return g;
}

function ribbon(points: V3[], width: number, steps = 32): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points.map(v));
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, point = curve.getPoint(t), tangent = curve.getTangent(t);
    const cross = new THREE.Vector3(tangent.y, -tangent.x, 0).normalize().multiplyScalar(width / 2);
    positions.push(...point.clone().sub(cross).toArray(), ...point.clone().add(cross).toArray());
    uv.push(0, t * 3, 1, t * 3);
    if (i < steps) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

function torsoField(): SculptField {
  const f = new SculptField();
  // A continuous underlying torso, not a stack of separate muscle meshes.
  f.oval([0, 6.65, -.02], [1.13, 1.02, .57], .22);
  f.oval([0, 5.85, -.005], [.84, .99, .51], .22);
  f.oval([0, 5.04, -.035], [.86, .57, .54], .22);
  f.oval([0, 4.61, -.08], [.86, .54, .56], .22);
  f.oval([.015, 7.69, -.09], [.62, .47, .51], .22);
  f.oval([.015, 8.22, .015], [.38, .68, .39], .18);
  // Trapezius slopes rise toward the neck, and the clavicles sweep forward.
  for (const s of [-1, 1]) {
    const dy = s === 1 ? .085 : -.035;
    f.muscle([s * .20, 8.28 + dy, -.22], [s * 1.50, 7.47 + dy, -.1], .32, .37, .22);
    f.muscle([s * .25, 8.41, .20], [s * .59, 7.60 + dy, .49], .14, .14, .12);
    f.muscle([s * .12, 7.53 + dy, .48], [s * 1.36, 7.40 + dy, .27], .14, .16, .14);
    // Broad pectorals with a flat upper shelf and separated lower insertion.
    f.oval([s * .61, 7.13 + dy, .45], [.66, .47, .40], .145, rotate(0, s * -.10, s * .095));
    f.oval([s * .71, 7.35 + dy, .37], [.57, .30, .35], .15);
    // Serratus fingers flow into the external obliques; central abs are much smaller.
    for (let j = 0; j < 3; j++) {
      f.muscle([s * (.72 + j * .035), 6.70 - j * .22, .42], [s * (1.06 - j * .05), 6.88 - j * .25, .20], .12, .15, .075);
    }
    f.muscle([s * .75, 6.42, .16], [s * .64, 5.35, .30], .24, .28, .13);
    f.muscle([s * .69, 5.37, .27], [s * .28, 5.12, .45], .13, .13, .095);
    for (let j = 0; j < 3; j++) {
      f.oval([s * .265, 6.48 - j * .43, .48 - j * .006], [.275 - j * .022, .245, .18], .065, rotate(0, 0, s * -.065));
    }
    // Posterior anatomy: scapular planes, lats, erector spinae, gluteal masses.
    f.oval([s * .61, 7.19 + dy, -.43], [.54, .57, .24], .17, rotate(0, s * -.12, s * .12));
    f.muscle([s * .90, 7.04, -.31], [s * .57, 5.93, -.35], .35, .28, .18);
    f.muscle([s * .22, 7.37, -.49], [s * .21, 5.26, -.44], .14, .15, .10);
    f.oval([s * .46, 4.70, -.38], [.48, .53, .32], .18);

    // Humerus core and overlapping deltoid heads, not ball-and-socket armor.
    const shoulder: V3 = [s * 1.43, 7.35 + dy, -.035];
    const elbow: V3 = [s * 1.83, 6.04 + dy, .01];
    const wrist: V3 = [s * 2.04, 4.96 + dy, .22];
    f.muscle([s * 1.37, 7.58 + dy, -.05], [s * 1.83, 5.91 + dy, .01], .36, .37, .20);
    f.oval(shoulder, [.60, .65, .53], .20, rotate(0, 0, s * .28));
    f.muscle([s * 1.61, 7.43 + dy, .12], [s * 1.71, 6.97 + dy, .16], .41, .42, .16);
    f.muscle([s * 1.66, 6.93 + dy, .18], [s * 1.87, 6.15 + dy, .20], .36, .37, .14);
    f.muscle([s * 1.47, 6.91 + dy, -.26], [s * 1.78, 6.10 + dy, -.16], .32, .29, .14);
    f.oval(elbow, [.33, .31, .31], .12);
    // Forearm flexors taper decisively to a broad but bony wrist.
    f.muscle([s * 1.83, 6.14 + dy, .02], [s * 2.04, 4.85 + dy, .21], .28, .30, .17);
    f.muscle([s * 1.98, 6.08 + dy, .11], [s * 2.08, 5.27 + dy, .20], .36, .34, .12);
    f.muscle([s * 1.73, 5.92 + dy, .24], [s * 2.01, 5.00 + dy, .35], .20, .21, .12);
    f.muscle([s * 2.01, 5.43 + dy, -.05], [s * 2.08, 4.80 + dy, .12], .18, .19, .12);
    f.oval(wrist, [.27, .32, .255], .14);

    const hipX = s * .54, kneeX = s * .64, ankleX = s * .67;
    const forward = s === 1 ? .17 : -.17;
    f.muscle([hipX, 4.76, -.005], [kneeX, 3.01, forward], .43, .47, .20);
    f.muscle([s * .77, 4.52, .11], [s * .78, 3.14, forward + .12], .36, .42, .15);
    f.muscle([s * .39, 4.30, .29], [s * .50, 3.17, forward + .30], .31, .32, .12);
    f.oval([s * .43, 3.35, forward + .23], [.25, .40, .29], .11, rotate(0, 0, s * -.18));
    f.muscle([s * .54, 4.20, -.39], [s * .68, 3.19, forward - .28], .32, .31, .17);
    f.oval([kneeX, 2.98, forward + .11], [.35, .31, .35], .14);
    f.oval([kneeX, 3.04, forward + .38], [.235, .25, .13], .08, undefined, false, 2.7);
    f.muscle([kneeX, 2.97, forward + .02], [ankleX, 1.11, forward + .02], .27, .29, .15);
    f.muscle([s * .75, 2.78, forward - .13], [s * .71, 1.58, forward - .16], .34, .35, .14);
    f.muscle([s * .48, 2.65, forward - .12], [s * .64, 1.56, forward - .14], .25, .30, .12);
    f.muscle([kneeX, 2.76, forward + .24], [ankleX, 1.14, forward + .20], .13, .115, .09);
    f.oval([ankleX, 1.03, forward + .015], [.27, .37, .29], .12);
    f.oval([ankleX, .81, forward + .36], [.37, .24, .65], .13, rotate(.10, s * .045, 0));
    f.oval([ankleX, .91, forward + .10], [.28, .32, .40], .12);
    // Individual toes blend at the metatarsals, while the tips retain visible gaps.
    for (let toe = 0; toe < 5; toe++) {
      const tx = ankleX + s * (-.255 + toe * .139);
      const r = .101 - toe * .009;
      const length = .28 - toe * .025;
      f.oval([tx, .733 - toe * .009, forward + .90 - toe * .035], [r, .13 - toe * .009, length], .026);
    }
  }
  // Carved linea alba, navel, sternum notch. These remove stone instead of drawing black stripes.
  f.oval([0, 6.28, .647], [.025, .78, .048], .01, undefined, true);
  f.oval([0, 5.57, .528], [.069, .062, .052], .01, undefined, true);
  f.oval([0, 7.53, .536], [.085, .072, .064], .01, undefined, true);
  return f;
}

function headField(): SculptField {
  const f = new SculptField();
  // Squared mandibular block anchors the face; the bald cranial vault sits behind it.
  f.oval([0, 9.49, -.005], [.515, .60, .45], .12, rotate(-.035, 0, -.035));
  f.oval([0, 9.08, .125], [.485, .49, .435], .14, undefined, false, 2.65);
  f.oval([.005, 8.82, .275], [.39, .225, .32], .095, undefined, false, 3.15);
  f.oval([0, 8.94, .41], [.29, .25, .20], .09);
  // Occipital base blends into the continuous neck beneath the separate high-res head.
  f.oval([0, 8.83, -.075], [.355, .35, .32], .14);
  for (const s of [-1, 1]) {
    f.oval([s * .365, 8.97, .25], [.155, .31, .23], .085, rotate(0, s * -.12, s * .06), false, 2.6);
    f.oval([s * .318, 9.235, .355], [.21, .15, .21], .065, rotate(0, 0, s * -.18));
    // Orbital cavities cut deep into the face. Eye stones go INSIDE these cuts.
    f.oval([s * .235, 9.345, .462], [.177, .092, .152], .01, rotate(0, 0, s * .16), true);
  }
  // Brow is low at the bridge and higher outside, producing a stern, not surprised, face.
  for (const s of [-1, 1]) {
    f.muscle([s * .055, 9.415, .462], [s * .415, 9.535, .362], .10, .122, .052);
    f.oval([s * .09, 9.54, .399], [.10, .145, .115], .068);
    // Lower orbital rim, cheekbone, nasolabial stone planes.
    f.muscle([s * .10, 9.258, .465], [s * .385, 9.295, .382], .043, .055, .035);
    f.muscle([s * .155, 9.17, .476], [s * .285, 8.99, .455], .075, .085, .045);
  }
  // Broad flattened nose: a wedge bridge and heavy alae, not a ball on a stick.
  f.oval([0, 9.30, .453], [.102, .236, .17], .06, rotate(-.13, 0, 0), false, 2.7);
  f.oval([0, 9.185, .545], [.164, .092, .139], .06, undefined, false, 2.8);
  for (const s of [-1, 1]) {
    f.oval([s * .125, 9.165, .513], [.086, .071, .10], .045);
    f.oval([s * .10, 9.122, .561], [.046, .026, .044], .01, undefined, true);
  }
  // Compressed upper lip, broad lower lip and jutting chin; the mouth is an actual cut.
  f.oval([0, 9.025, .49], [.249, .07, .111], .045, undefined, false, 2.5);
  f.oval([0, 8.945, .48], [.25, .065, .114], .045);
  f.oval([0, 8.99, .573], [.254, .017, .058], .01, undefined, true);
  f.oval([0, 8.825, .439], [.29, .102, .152], .06, undefined, false, 2.6);
  f.oval([0, 8.85, .583], [.021, .054, .021], .01, undefined, true);
  // The two forehead furrows continue up the glabella; ears have excavated conchae.
  for (const s of [-1, 1]) {
    f.oval([s * .047, 9.555, .467], [.012, .107, .032], .01, rotate(0, 0, s * .10), true);
    f.oval([s * .518, 9.255, -.001], [.115, .21, .132], .085, rotate(0, 0, s * -.09));
    f.oval([s * .563, 9.284, .079], [.064, .132, .083], .01, undefined, true);
    f.oval([s * .527, 9.163, .064], [.064, .083, .066], .03);
  }
  return f;
}

function handField(side: number): SculptField {
  const s = side, dy = s === 1 ? .085 : -.035;
  const f = new SculptField();
  f.oval([s * 2.05, 4.77 + dy, .23], [.275, .35, .255], .12);
  f.oval([s * 2.09, 4.48 + dy, .25], [.355, .40, .255], .13, rotate(0, s * .12, s * -.09), false, 2.4);
  f.oval([s * 1.87, 4.53 + dy, .40], [.22, .27, .19], .09);
  for (let i = 0; i < 4; i++) {
    const x = s * (1.88 + i * .166), length = [.44, .53, .49, .39][i]!;
    const top = 4.37 + dy - Math.abs(i - 1) * .025;
    if (s === -1) {
      // Fingers curl over the FRONT of the held stone, making the grip legible in silhouette.
      f.muscle([x, top + .14, .35], [x - .012, top - .13, .88], .104 - i * .004, .116, .055);
      f.oval([x - .012, top - .17, .925], [.101 - i * .004, .13, .118], .042);
      f.muscle([x - .012, top - .14, .928], [x + .023, top - length * .82, .901], .091 - i * .003, .103, .04);
      continue;
    }
    const front = .35;
    // A knuckle, proximal phalanx, bent distal phalanx: large sculpted fingers, not mittens.
    f.oval([x, top, front], [.103, .16, .145], .042);
    f.muscle([x, top + .03, front - .02], [x + s * .017, top - length * .68, front + .055], .102 - i * .004, .112, .04);
    f.oval([x + s * .018, top - length * .57, front + .067], [.102 - i * .004, .12, .117], .035);
    f.muscle([x + s * .02, top - length * .54, front + .065], [x - s * .025, top - length, front - .015], .09 - i * .003, .10, .035);
  }
  f.muscle([s * 1.86, 4.61 + dy, .43], [s * 1.67, 4.32 + dy, .51], .15, .145, .07);
  f.muscle([s * 1.68, 4.35 + dy, .51], [s * 1.78, 4.15 + dy, s === -1 ? .87 : .57], .126, .13, .055);
  return f;
}

export function createStoneGiant(): THREE.Group {
  const root = new THREE.Group(); root.name = 'The Lithic Warden · procedural stone giant';
  const anatomy = new THREE.Group(); anatomy.name = 'Continuous stone anatomy'; root.add(anatomy);
  const dress = new THREE.Group(); dress.name = 'Ochre hide wrap and sandals'; root.add(dress);
  const ornaments = new THREE.Group(); ornaments.name = 'Bone trophies and brass hardware'; root.add(ornaments);
  const base = new THREE.Group(); base.name = 'Black museum plinth and wild ground'; root.add(base);
  const stoneMaps = surfaceMaps('stone'), leatherMaps = surfaceMaps('leather'), boneMaps = surfaceMaps('bone');
  const stone = new THREE.MeshStandardMaterial({ ...stoneMaps, color: 0xffffff, vertexColors: true, roughness: .94, metalness: 0, bumpScale: .027 });
  stone.name = 'Weathered blue-grey stone · mineral strata, pores and etched calcite';
  const stoneDetail = new THREE.MeshStandardMaterial({ ...stoneMaps, color: 0xabb7b8, roughness: .94, bumpScale: .016 });
  const leather = new THREE.MeshStandardMaterial({ ...leatherMaps, roughness: .88, metalness: 0, bumpScale: .024, side: THREE.DoubleSide });
  leather.name = 'Warm ochre hide';
  const straps = new THREE.MeshStandardMaterial({ ...leatherMaps, color: 0xb79a7b, roughness: .9, bumpScale: .017, side: THREE.DoubleSide });
  const leatherEdge = new THREE.MeshStandardMaterial({ color: 0x8b6338, roughness: .97 });
  const thread = new THREE.MeshStandardMaterial({ color: 0xc9b17c, roughness: 1 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xb4994c, metalness: .63, roughness: .48 });
  const darkBrass = new THREE.MeshStandardMaterial({ color: 0x5e5638, metalness: .48, roughness: .64 });
  const bone = new THREE.MeshStandardMaterial({ ...boneMaps, roughness: .86, metalness: 0, bumpScale: .012 });
  const cord = new THREE.MeshStandardMaterial({ color: 0x716442, roughness: 1 });
  const groove = new THREE.MeshStandardMaterial({ color: 0x4b5d60, roughness: 1 });
  const chalk = new THREE.MeshStandardMaterial({ color: 0xadb7ac, roughness: 1 });
  const eye = new THREE.MeshStandardMaterial({ color: 0x34403e, roughness: .96, metalness: 0 });
  const cavity = new THREE.MeshStandardMaterial({ color: 0x2c3029, roughness: 1 });

  const bodyField = torsoField();
  const body = mesh(anatomy, 'Unified torso, deltoids, arms, legs, feet and toes', bodyField.geometry([-2.55, .47, -1.03], [2.55, 8.92, 1.58], 124, 155000), stone);
  body.userData.landmarks = ['pectoralis major', 'rectus abdominis', 'serratus anterior', 'external oblique', 'trapezius', 'latissimus dorsi', 'biceps', 'brachioradialis', 'quadriceps', 'patella', 'gastrocnemius', 'individual toes'];
  const faceField = headField();
  const head = mesh(anatomy, 'Bald head · square jaw, carved eye sockets, brow, nose, lips and ears', faceField.geometry([-.72, 8.48, -.60], [.72, 10.24, .79], 82, 52000, .0035), stone);
  head.userData.expression = 'Stern; no emissive eyes';
  for (const s of [-1, 1]) {
    const hand = handField(s);
    mesh(anatomy, `${s === -1 ? 'Right' : 'Left'} hand · five articulated stone fingers`, hand.geometry(s === -1 ? [-2.65, 3.55, -.18] : [1.48, 3.65, -.18], s === -1 ? [-1.48, 5.21, 1.18] : [2.65, 5.31, .85], 55, 28000, .004), stone);
  }

  // Dark, small almond-like eyes recede behind the low brow. No separate white eyeballs.
  const eyes: THREE.BufferGeometry[] = [], faceCreases: THREE.BufferGeometry[] = [], faceRims: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    eyes.push(ellipsoid([s * .228, 9.344, .397], [.111, .022, .019], rotate(0, 0, s * .17), 20));
    faceRims.push(tube([[s * .104, 9.330, .467], [s * .217, 9.358, .460], [s * .340, 9.390, .403]], .015, 7, 16));
    faceRims.push(tube([[s * .12, 9.300, .449], [s * .226, 9.309, .444], [s * .33, 9.339, .409]], .012, 7, 16));
    faceCreases.push(tube([[s * .155, 9.146, .575], [s * .209, 9.088, .548], [s * .273, 8.99, .495], [s * .289, 8.915, .455]], .009, 6, 18));
    faceCreases.push(tube([[s * .31, 9.315, .436], [s * .402, 9.317, .345], [s * .449, 9.291, .301]], .008, 6, 12));
    faceRims.push(tube([[s * .524, 9.387, .047], [s * .552, 9.324, .09], [s * .535, 9.23, .102]], .018, 7, 12));
  }
  faceCreases.push(tube([[-.234, 8.966, .550], [-.12, 8.994, .574], [0, 9.005, .583], [.12, 8.994, .574], [.234, 8.966, .550]], .008, 7, 26));
  mesh(anatomy, 'Deep-set unlit eyes', mergeParts(eyes), eye);
  mesh(anatomy, 'Fine eyelids and ear helices', mergeParts(faceRims), stoneDetail);
  mesh(anatomy, 'Sculpted mouth and facial creases', mergeParts(faceCreases), groove);

  addEngravings(anatomy, bodyField, faceField, groove, chalk);
  addWrap(dress, ornaments, bodyField, leather, leatherEdge, thread, brass, darkBrass);
  addNecklace(ornaments, bodyField, bone, cord, brass, cavity);
  addSandals(dress, ornaments, bodyField, straps, leatherEdge, thread, brass, stoneDetail);
  addRock(anatomy, stone, groove, chalk);
  addGround(base, stoneDetail, brass);

  root.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(root);
  let triangles = 0, drawCalls = 0;
  const namedParts: string[] = [];
  root.traverse(object => {
    if (object instanceof THREE.Mesh) {
      const positions = object.geometry.getAttribute('position');
      for (let i = 0; i < positions.count; i++) {
        if (!Number.isFinite(positions.getX(i) + positions.getY(i) + positions.getZ(i))) throw new Error(`Non-finite stone giant geometry: ${object.name}`);
      }
      const count = object.geometry.index?.count ?? positions.count;
      triangles += count / 3 * (object instanceof THREE.InstancedMesh ? object.count : 1);
      drawCalls++; namedParts.push(object.name);
    }
  });
  if (triangles > 400000 || drawCalls > 180 || bounds.min.y < -.01 || bounds.max.y > 10.5) throw new Error('Stone giant geometry smoke check failed: budget or bounds');
  root.userData = { height: bounds.max.y - bounds.min.y, bounds: { min: bounds.min.toArray(), max: bounds.max.toArray() }, triangles: Math.round(triangles), drawCalls, parts: namedParts, units: 'Y-up, +Z forward, anatomical right -X', procedural: true, seed: 'lithic-warden-040', description: 'Continuous implicit stone anatomy; hand-authored face and leather; all surfaces generated in TypeScript.' };
  return root;
}

function addEngravings(parent: THREE.Group, body: SculptField, head: SculptField, dark: THREE.Material, pale: THREE.Material): void {
  const cuts: THREE.BufferGeometry[] = [], edges: THREE.BufferGeometry[] = [];
  const carve = (field: SculptField, xy: [number, number][], thickness = .008, back = false, light = true): void => {
    const sign = back ? -1 : 1;
    const points: V3[] = [];
    for (const [x, y] of xy) {
      const z = field.front(x, y, back);
      if (z !== undefined) points.push([x, y, z - sign * thickness * .74]);
    }
    if (points.length < 3) return;
    cuts.push(tube(points, thickness, 5, points.length * 2));
    if (light) {
      const rim = points.map(([x, y, z]): V3 => {
        const px = x + .009, py = y + .006;
        return [px, py, (field.front(px, py, back) ?? z) - sign * thickness * .18];
      });
      edges.push(tube(rim, thickness * .35, 5, points.length * 2));
    }
  };
  for (const s of [-1, 1]) {
    // Geological growth arcs follow pecs, deltoids and thigh volumes instead of random scribbles.
    for (let k = 0; k < 5; k++) {
      const pts: [number, number][] = [];
      for (let j = 0; j <= 18; j++) {
        const a = -.24 + j / 18 * 2.48;
        pts.push([s * (.65 + (.34 + k * .036) * Math.cos(a)), 7.27 - (.26 + k * .047) * Math.sin(a) + (s === 1 ? .085 : -.035)]);
      }
      carve(body, pts, .007 + k * .0004);
    }
    for (let k = 0; k < 4; k++) {
      const pts: [number, number][] = [];
      for (let j = 0; j <= 16; j++) {
        const a = -.27 + j / 16 * 2.24;
        pts.push([s * (1.53 + (.23 + k * .044) * Math.cos(a)), 7.47 - (.38 + k * .04) * Math.sin(a) + (s === 1 ? .085 : -.035)]);
      }
      carve(body, pts, .007);
    }
    for (let k = 0; k < 3; k++) {
      carve(body, [[s * (1.97 + k * .045), 5.89], [s * (2.07 + k * .036), 5.66], [s * (2.10 + k * .029), 5.43], [s * (2.01 + k * .025), 5.18], [s * (1.98 + k * .02), 4.99]], .0065);
    }
    for (let k = 0; k < 4; k++) {
      const pts: [number, number][] = [];
      for (let j = 0; j <= 16; j++) {
        const a = .06 + j / 16 * 2.73;
        pts.push([s * (.63 + (.19 + k * .032) * Math.cos(a)), 3.86 - (.46 + k * .027) * Math.sin(a)]);
      }
      carve(body, pts, .0065);
    }
    carve(body, [[s * .90, 6.51], [s * .74, 6.32], [s * .62, 6.12], [s * .56, 5.83], [s * .48, 5.51]], .009);
    carve(body, [[s * 1.22, 7.25], [s * 1.32, 7.06], [s * 1.24, 6.78], [s * 1.12, 6.61]], .009);
    // Back: scapular striations and creases either side of the spine.
    for (let k = 0; k < 3; k++) {
      carve(body, [[s * (.33 + k * .06), 7.58], [s * (.58 + k * .04), 7.39], [s * (.85 + k * .035), 7.17], [s * (.83 + k * .025), 6.89], [s * .63, 6.67]], .007, true);
    }
    carve(body, [[s * .18, 7.75], [s * .11, 7.22], [s * .12, 6.61], [s * .10, 6.09], [s * .17, 5.53]], .007, true);
  }
  // A few branching fractures are irregular; avoid black outlines around every muscle.
  carve(body, [[-.77, 7.57], [-.61, 7.42], [-.65, 7.28], [-.50, 7.11], [-.55, 6.95]], .010);
  carve(body, [[-.65, 7.28], [-.86, 7.25], [-.95, 7.08]], .006);
  carve(body, [[1.59, 7.76], [1.73, 7.62], [1.66, 7.46], [1.84, 7.26], [1.82, 7.08]], .011);
  carve(body, [[.72, 3.88], [.58, 3.71], [.63, 3.56], [.55, 3.37], [.64, 3.20]], .008);
  for (let k = 0; k < 4; k++) {
    const pts: [number, number][] = [];
    for (let j = 0; j <= 20; j++) {
      const a = .18 + j / 20 * 2.78;
      pts.push([Math.cos(a) * (.28 + k * .039) - .03, 9.81 - Math.sin(a) * (.12 + k * .028)]);
    }
    carve(head, pts, .0045);
  }
  carve(head, [[-.30, 9.94], [-.18, 9.83], [-.21, 9.71], [-.12, 9.62], [-.14, 9.53]], .006);
  carve(head, [[-.21, 9.71], [-.32, 9.68], [-.39, 9.57]], .0045);
  for (const s of [-1, 1]) {
    carve(head, [[s * .37, 9.17], [s * .39, 9.06], [s * .34, 8.94], [s * .29, 8.84]], .006);
    carve(head, [[s * .32, 9.14], [s * .34, 9.045], [s * .30, 8.96]], .0045);
  }
  mesh(parent, 'Incised mineral arcs, branching fractures and anatomical creases', mergeParts(cuts), dark);
  mesh(parent, 'Pale weathered edges of the stone engravings', mergeParts(edges), pale);
}

function addWrap(parent: THREE.Group, hardware: THREE.Group, body: SculptField, leather: THREE.Material, edge: THREE.Material, thread: THREE.Material, brass: THREE.Material, darkBrass: THREE.Material): void {
  const borders: THREE.BufferGeometry[] = [], stitches: THREE.BufferGeometry[] = [], rivets: V3[] = [];
  const skirtPanel = (name: string, start: number, end: number, bottom: (t: number) => number, layer: number): void => {
    const nx = 48, ny = 18, positions: number[] = [], uv: number[] = [], indices: number[] = [];
    const point = (u: number, t: number): V3 => {
      const angle = THREE.MathUtils.lerp(start, end, u);
      const y = THREE.MathUtils.lerp(5.10, bottom(u), t);
      const fold = (Math.sin(angle * 8 + t * 1.5) * .042 + Math.sin(angle * 17 - t * 3) * .016) * Math.sin(t * Math.PI * .85);
      const rx = 1.015 + t * .19 + fold + layer, rz = .656 + t * .235 + fold * .72 + layer;
      let x = Math.sin(angle) * rx, z = Math.cos(angle) * rz;
      // The advanced thigh must not poke through the overlapping front hem.
      for (let i = 0; i < 14 && body.sample(x, y, z) < .047 + layer; i++) { x *= 1.015; z *= 1.015; }
      return [x, y, z];
    };
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) {
      const u = i / nx, t = j / ny; positions.push(...point(u, t)); uv.push(u * 2.1, t * 1.5);
      if (i < nx && j < ny) { const a = j * (nx + 1) + i; indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(indices); g.computeVertexNormals();
    mesh(parent, name, g, leather);
    const hem: V3[] = [], seam: V3[] = [];
    for (let i = 0; i <= nx; i++) hem.push(point(i / nx, 1));
    for (let i = 0; i <= ny; i++) seam.push(point(1, i / ny));
    borders.push(tube(hem, .022, 6, 58), tube(seam, .024, 6, 24));
    for (let i = 1; i < nx; i++) {
      const a = point((i - .22) / nx, .967), b = point((i + .22) / nx, .967);
      const lift = (p: V3): V3 => [p[0] * 1.007, p[1], p[2] * 1.012];
      stitches.push(tube([lift(a), lift(b)], .007, 5, 2));
    }
  };
  skirtPanel('Hide wrap · folded rear and side skirt', 1.30, 4.94, t => 3.92 + .075 * Math.sin(t * 8), 0);
  skirtPanel('Hide wrap · lower right overlapping panel', -.13, 1.73, t => 4.48 - .53 * Math.sin(t * Math.PI * .7) + .06 * Math.sin(t * 5), .012);
  skirtPanel('Hide wrap · diagonal front flap', -1.68, .37, t => 3.98 + .71 * t ** 2.8 + .04 * Math.sin(t * 7), .055);

  // Broad belt is a curved strip with actual rounded top and bottom piping.
  const beltPositions: number[] = [], beltUV: number[] = [], beltIndices: number[] = [], beltUpper: V3[] = [], beltLower: V3[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = i / 96 * TAU, dy = .025 * Math.sin(a + .4);
    for (const t of [0, 1]) {
      const y = 5.025 + t * .295 + dy;
      let x = Math.sin(a) * 1.052, z = Math.cos(a) * .68;
      for (let k = 0; k < 16 && body.sample(x, y, z) < .042; k++) { x *= 1.015; z *= 1.015; }
      const point: V3 = [x, y, z];
      beltPositions.push(...point); beltUV.push(i / 96 * 5, t);
      (t === 0 ? beltLower : beltUpper).push(point);
    }
    if (i < 96) { const k = i * 2; beltIndices.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
  }
  const beltG = new THREE.BufferGeometry(); beltG.setAttribute('position', new THREE.Float32BufferAttribute(beltPositions, 3)); beltG.setAttribute('uv', new THREE.Float32BufferAttribute(beltUV, 2)); beltG.setIndex(beltIndices); beltG.computeVertexNormals();
  mesh(parent, 'Broad rolled ochre waist belt', beltG, leather);
  borders.push(tube(beltUpper, .032, 7, 100), tube(beltLower, .031, 7, 100));
  const tail: V3[] = [[-.38, 5.28, .72], [-.46, 5.05, .87], [-.42, 4.63, .89], [-.45, 4.02, .85], [-.48, 3.40, .73], [-.44, 2.91, .72], [-.36, 2.80, .76]];
  mesh(parent, 'Long leather belt tail hanging to the knee', ribbon(tail, .195, 48), leather);
  for (const s of [-1, 1]) borders.push(tube(tail.map(([x, y, z]): V3 => [x + s * .095, y, z + .007]), .013, 6, 52));
  const loop: V3[] = [[.29, 5.33, .685], [.31, 5.13, .77], [.33, 4.96, .79], [.42, 4.96, .76], [.43, 5.16, .72], [.42, 5.31, .685]];
  mesh(parent, 'Folded keeper through offset ring buckle', ribbon(loop, .11, 30), leather);
  mesh(hardware, 'Offset brass ring buckle and lower belt-tail ring', mergeParts([ring([.36, 4.987, .818], .188, .035), ring([-.405, 2.72, .747], .183, .031, rotate(.1, 0, -.14))]), brass);
  mesh(hardware, 'Aged buckle inner patina', ring([.36, 4.987, .795], .178, .014), darkBrass);
  for (let i = 0; i < 6; i++) rivets.push([-.435, 4.88 - i * .32, .895 - i * .021]);
  mesh(parent, 'Leather cut edges and raised seams', mergeParts(borders), edge);
  mesh(parent, 'Hand-stitched skirt hem', mergeParts(stitches), thread);
  instanceSpheres(hardware, 'Belt-tail brass studs', rivets, [.019, .022, .012], brass);
}

function addNecklace(parent: THREE.Group, body: SculptField, bone: THREE.Material, cord: THREE.Material, brass: THREE.Material, cavity: THREE.Material): void {
  const cords: THREE.BufferGeometry[] = [];
  const drape = (points: V3[], radius: number): THREE.BufferGeometry => {
    const curve = new THREE.CatmullRomCurve3(points.map(v));
    const projected: V3[] = [];
    for (let i = 0; i <= 110; i++) {
      const p = curve.getPoint(i / 110);
      projected.push([p.x, p.y, Math.max(p.z, (body.front(p.x, p.y) ?? p.z) + radius * 1.16)]);
    }
    return tube(projected, radius, 8, 150);
  };
  for (const shift of [0, .072]) {
    cords.push(drape([[-.27 - shift, 8.49, .17], [-.46 - shift, 8.14, .43], [-.59 - shift, 7.72, .64], [-.57 - shift, 7.33, .89], [-.40 - shift, 6.93, .92], [-.10, 6.67 - shift, .84], [.28 + shift, 6.92, .90], [.49 + shift, 7.40, .89], [.43 + shift, 7.92, .57], [.27 + shift, 8.47, .18]], shift === 0 ? .031 : .025));
    const startZ = Math.max(.17, (body.front(-.27 - shift, 8.49) ?? .17) + .036);
    const endZ = Math.max(.18, (body.front(.27 + shift, 8.47) ?? .18) + .036);
    cords.push(tube([[-.27 - shift, 8.49, startZ], [-.43 - shift, 8.50, .09], [-.40 - shift, 8.50, -.17], [0, 8.49, -.39], [.40 + shift, 8.50, -.17], [.43 + shift, 8.48, .09], [.27 + shift, 8.47, endZ]], .026, 7, 50));
  }
  mesh(parent, 'Two draped leather necklace cords, continuous around neck', mergeParts(cords), cord);
  const skull = new SculptField();
  skull.oval([-.105, 7.22, .994], [.20, .235, .168], .045);
  skull.oval([-.105, 7.077, 1.026], [.155, .136, .115], .04, undefined, false, 2.7);
  for (const s of [-1, 1]) {
    skull.oval([-.105 + s * .139, 7.125, 1.033], [.069, .078, .10], .026);
    skull.oval([-.105 + s * .09, 7.20, 1.142], [.069, .062, .088], .01, rotate(0, 0, s * -.25), true);
  }
  skull.oval([-.105, 7.105, 1.138], [.030, .047, .048], .01, undefined, true);
  const skullGeometry = skull.geometry([-.36, 6.86, .78], [.15, 7.51, 1.23], 36, 16000, .0014);
  mesh(parent, 'Carved trophy skull · eye sockets, nasal cavity and cheekbones', skullGeometry, bone);
  const holes: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) holes.push(ellipsoid([-.105 + s * .09, 7.20, 1.094], [.055, .046, .013], rotate(0, 0, s * -.25), 14));
  holes.push(ellipsoid([-.105, 7.105, 1.112], [.023, .039, .01], undefined, 12));
  mesh(parent, 'Recessed skull cavities', mergeParts(holes), cavity);
  const ivory: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 6; i++) ivory.push(ellipsoid([-.222 + i * .046, 6.997 + Math.abs(i - 2.5) * .007, 1.113], [.024, .048, .027], undefined, 12));
  // Central long fang and two slightly asymmetrical tusks flank the skull.
  ivory.push(tapered([[-.11, 6.93, .99], [-.095, 6.71, 1.035], [-.03, 6.48, 1.005], [-.055, 6.30, .91]], [.10, .102, .052, .001], 14, 34));
  ivory.push(tapered([[-.47, 7.045, .995], [-.48, 6.84, 1.075], [-.55, 6.66, 1.025], [-.67, 6.63, .98]], [.075, .078, .052, .001], 12, 28));
  ivory.push(tapered([[.285, 7.085, 1.015], [.32, 6.86, 1.085], [.43, 6.66, 1.06], [.53, 6.64, .98]], [.081, .083, .051, .001], 12, 28));
  // Crossbones and little drilled vertebral beads make the trophy read at medium distance.
  for (const s of [-1, 1]) {
    const x = -.10 + s * .31;
    ivory.push(tapered([[x, 7.38, .99], [x + s * .018, 7.20, 1.045], [x + s * .05, 7.03, 1.03]], [.063, .040, .06], 10, 18));
    ivory.push(ellipsoid([x, 7.38, .99], [.08, .063, .056], undefined, 14));
    ivory.push(ellipsoid([x + s * .05, 7.03, 1.03], [.07, .056, .058], undefined, 14));
  }
  mesh(parent, 'Ivory teeth, paired bone charms and three tapering tusks', mergeParts(ivory), bone);
  const bindings: THREE.BufferGeometry[] = [];
  for (const [x, y, z] of [[-.47, 7.044, .996], [.285, 7.084, 1.016], [-.105, 6.94, .998]] as V3[]) {
    for (let j = 0; j < 3; j++) bindings.push(ring([x, y + j * .032, z], j === 2 ? .079 : .083, .012, rotate(Math.PI / 2, 0, 0)));
  }
  mesh(parent, 'Tusk bindings and necklace knots', mergeParts(bindings), cord);
  mesh(parent, 'Small bronze cord fittings', mergeParts([ring([-.57, 7.50, .802], .049, .013), ring([.47, 7.69, .755], .05, .013)]), brass);
}

function addSandals(parent: THREE.Group, hardware: THREE.Group, body: SculptField, leather: THREE.Material, edge: THREE.Material, thread: THREE.Material, brass: THREE.Material, stone: THREE.Material): void {
  const strapParts: THREE.BufferGeometry[] = [], edging: THREE.BufferGeometry[] = [], seams: THREE.BufferGeometry[] = [], studs: V3[] = [];
  for (const s of [-1, 1]) {
    const x = s * .67, dz = s === 1 ? .17 : -.17;
    // Thin shaped sole, not a block enclosing the toes.
    const sole = ellipsoid([x, .599, dz + .41], [.405, .07, .765], rotate(0, s * .025, 0), 36);
    mesh(parent, `${s === -1 ? 'Right' : 'Left'} hide sandal sole`, sole, edge);
    for (const [height, rx, rz] of [[1.23, .291, .302], [1.88, .328, .325], [2.52, .371, .365]] as V3[]) {
      const positions: number[] = [], uv: number[] = [], indices: number[] = [], upper: V3[] = [], lower: V3[] = [];
      for (let j = 0; j <= 52; j++) {
        const a = j / 52 * TAU, y = height + .044 * Math.sin(a);
        const onSkin = (height: number): V3 => {
          let px = Math.sin(a) * rx, pz = Math.cos(a) * rz;
          for (let k = 0; k < 32 && body.sample(x + px, height, dz + pz) < .019; k++) { px *= 1.017; pz *= 1.017; }
          return [x + px, height, dz + pz];
        };
        const lo = onSkin(y - .079), hi = onSkin(y + .079);
        positions.push(...lo, ...hi);
        uv.push(j / 52 * 3, 0, j / 52 * 3, 1);
        upper.push(hi); lower.push(lo);
        if (j < 52) { const k = j * 2; indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
      }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(indices); g.computeVertexNormals(); strapParts.push(g);
      edging.push(tube(upper, .012, 5, 56), tube(lower, .012, 5, 56));
      studs.push([x + .025, height + .01, dz + rz + .023]);
    }
    const shin: V3[] = [[x - .035, 2.62, dz + .382], [x + .004, 2.21, dz + .375], [x + .030, 1.79, dz + .336], [x + .018, 1.31, dz + .318], [x - .017, .96, dz + .50], [x, .91, dz + .66]];
    strapParts.push(ribbon(shin, .20, 32));
    for (const side of [-1, 1]) {
      edging.push(tube(shin.map(([px, py, pz]): V3 => [px + side * .095, py, pz + .007]), .012, 5, 36));
      const curve = new THREE.CatmullRomCurve3(shin.map(v));
      for (let j = 1; j < 25; j++) {
        const a = curve.getPoint((j - .19) / 25), b = curve.getPoint((j + .19) / 25);
        seams.push(tube([[a.x + side * .071, a.y, a.z + .014], [b.x + side * .071, b.y, b.z + .014]], .006, 4, 2));
      }
    }
    // Curved transverse instep band leaves all toe tips visible.
    const arch: V3[] = [[x - .375, .66, dz + .57], [x - .30, .88, dz + .57], [x, 1.009, dz + .59], [x + .30, .88, dz + .57], [x + .375, .66, dz + .57]];
    const p: number[] = [], uv: number[] = [], index: number[] = [], archCurve = new THREE.CatmullRomCurve3(arch.map(v));
    const topEdge: V3[] = [], bottomEdge: V3[] = [];
    for (let j = 0; j <= 36; j++) {
      const q = archCurve.getPoint(j / 36);
      p.push(q.x, q.y, q.z - .108, q.x, q.y, q.z + .108); uv.push(j / 36 * 2, 0, j / 36 * 2, 1);
      topEdge.push([q.x, q.y + .006, q.z - .108]); bottomEdge.push([q.x, q.y + .006, q.z + .108]);
      if (j < 36) { const k = j * 2; index.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(index); g.computeVertexNormals(); strapParts.push(g);
    edging.push(tube(topEdge, .014, 5, 38), tube(bottomEdge, .014, 5, 38));
    // Natural stone toenails: very shallow little plaques, never white human nails.
    const nails: THREE.BufferGeometry[] = [];
    for (let toe = 0; toe < 5; toe++) {
      const tx = x + s * (-.255 + toe * .139);
      nails.push(ellipsoid([tx, .827 - toe * .011, dz + 1.037 - toe * .055], [.060 - toe * .005, .011, .077 - toe * .008], rotate(.30, 0, 0), 14));
    }
    mesh(parent, `${s === -1 ? 'Right' : 'Left'} toe nail carvings`, mergeParts(nails), stone);
  }
  mesh(parent, 'Six calf straps, two vertical shin straps and open-toe instep bands', mergeParts(strapParts), leather);
  mesh(parent, 'Raised sandal strap borders', mergeParts(edging), edge);
  mesh(parent, 'Shin leather stitching', mergeParts(seams), thread);
  instanceSpheres(hardware, 'Hammered shin-strap rivets', studs, [.033, .037, .018], brass);
}

function addRock(parent: THREE.Group, stone: THREE.Material, groove: THREE.Material, chalk: THREE.Material): void {
  // The rock hangs on the anatomical right (-X), cradled by the curled fingers.
  const f = new SculptField();
  f.oval([-2.03, 3.73, .61], [.37, .83, .36], .11, rotate(-.12, .1, -.19), false, 2.3);
  f.oval([-2.18, 3.43, .64], [.29, .35, .30], .075, rotate(.1, .1, -.18));
  const g = f.geometry([-2.65, 2.70, .04], [-1.40, 4.68, 1.16], 45, 16000, .035);
  mesh(parent, 'Elongated weathered rock held in anatomical right hand', g, stone);
  const creases: THREE.BufferGeometry[] = [], highlights: THREE.BufferGeometry[] = [];
  for (let k = 0; k < 5; k++) {
    const pts: V3[] = [];
    for (let j = 0; j < 13; j++) {
      const y = 3.05 + j / 12 * 1.27, x = -2.30 + k * .12 + .11 * Math.sin(y * 2.5 + k * .35);
      const z = f.front(x, y);
      if (z !== undefined) pts.push([x, y, z + .007]);
    }
    if (pts.length > 2) {
      creases.push(tube(pts, .011, 5, 30));
      highlights.push(tube(pts.map(([x, y, z]): V3 => [x + .018, y, z + .005]), .007, 5, 30));
    }
  }
  mesh(parent, 'Held rock deep longitudinal fissures', mergeParts(creases), groove);
  mesh(parent, 'Held rock calcite vein edges', mergeParts(highlights), chalk);
}

function instanceSpheres(parent: THREE.Group, name: string, positions: V3[], size: V3, material: THREE.Material): THREE.InstancedMesh {
  const geometry = new THREE.SphereGeometry(1, 10, 7);
  const batch = new THREE.InstancedMesh(geometry, material, positions.length);
  batch.name = name;
  const dummy = new THREE.Object3D(); dummy.scale.set(...size);
  positions.forEach((position, i) => { dummy.position.set(...position); dummy.updateMatrix(); batch.setMatrixAt(i, dummy.matrix); });
  batch.instanceMatrix.needsUpdate = true; batch.castShadow = true; batch.receiveShadow = true;
  parent.add(batch); return batch;
}

function addGround(parent: THREE.Group, stone: THREE.Material, brass: THREE.Material): void {
  const plinth = new THREE.MeshStandardMaterial({ color: 0x171918, roughness: .66, metalness: .12 });
  const plinthEdge = new THREE.MeshStandardMaterial({ color: 0x292b26, roughness: .50, metalness: .22 });
  const soil = new THREE.MeshStandardMaterial({ color: 0x48453a, roughness: 1 });
  for (const [name, rt, rb, h, y, material] of [
    ['Lower black circular plinth', 2.25, 2.34, .14, .07, plinth],
    ['Beveled middle plinth step', 2.14, 2.25, .15, .215, plinth],
    ['Upper plinth rim', 2.12, 2.15, .065, .3225, plinthEdge],
  ] as const) {
    const g = new THREE.CylinderGeometry(rt, rb, h, 112); g.translate(0, y, 0); mesh(parent, name, g, material);
  }
  mesh(parent, 'Fine turned plinth rim', ring([0, .306, 0], 2.17, .013, rotate(Math.PI / 2)), plinthEdge);
  const ground = new THREE.CylinderGeometry(2.055, 2.09, .20, 100, 4);
  const p = ground.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), n = noise(x * 5.3, 4, z * 5.3);
    const radial = Math.hypot(x, z), rough = 1 + (noise(x * 3, 1, z * 3) - .5) * .027;
    p.setXYZ(i, x * rough, y + .427 + (y > 0 ? (n - .5) * .045 : 0), z * rough);
    if (radial < .01) p.setY(i, y + .427);
  }
  ground.computeVertexNormals(); mesh(parent, 'Uneven earth and shale ground', ground, soil);
  // Broad slabs visually seat the sandals; their low relief leaves the round base visible.
  const slabs: THREE.BufferGeometry[] = [];
  for (const [x, z, rx, rz] of [[-.55, -.01, .91, .92], [.70, .36, .87, 1.12], [-1.18, .60, .55, .56]] as const) {
    const g = new THREE.IcosahedronGeometry(1, 1); g.scale(rx, .115, rz); g.rotateY(x * .7); g.translate(x, .53, z); slabs.push(g);
  }
  mesh(parent, 'Broken bedrock beneath the feet', mergeParts(slabs), stone);
  let seed = 8040;
  const random = (): number => { seed = Math.imul(seed, 1664525) + 1013904223 | 0; return (seed >>> 0) / 4294967296; };
  const rubbleMaterial = new THREE.MeshStandardMaterial({ color: 0x78786a, roughness: 1 });
  const rubble = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), rubbleMaterial, 115);
  rubble.name = '115 instanced shale fragments'; rubble.castShadow = true; rubble.receiveShadow = true;
  const dummy = new THREE.Object3D(), c = new THREE.Color();
  for (let i = 0; i < rubble.count; i++) {
    const a = random() * TAU, r = 1.12 + Math.sqrt(random()) * .85;
    const size = .027 + random() ** 2 * .105;
    dummy.position.set(Math.sin(a) * r, .53 + size * .28, Math.cos(a) * r);
    dummy.scale.set(size * (1 + random()), size * .65, size * (1 + random()));
    dummy.rotation.set(random() * 2, random() * 6, random() * 2); dummy.updateMatrix(); rubble.setMatrixAt(i, dummy.matrix);
    c.setHSL(.105 + random() * .035, .10 + random() * .12, .25 + random() * .25); rubble.setColorAt(i, c);
  }
  parent.add(rubble);
  const mossMat = new THREE.MeshStandardMaterial({ color: 0x737947, roughness: 1 });
  const moss = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), mossMat, 125);
  moss.name = 'Sparse clustered moss cushions'; moss.receiveShadow = true;
  for (let i = 0; i < moss.count; i++) {
    const cluster = i % 6, a = [.49, 1.7, 2.6, 3.8, 4.62, 5.74][cluster]! + (random() - .5) * .38;
    const r = 1.70 + random() * .29, size = .018 + random() * .068;
    dummy.position.set(Math.sin(a) * r, .54 + size * .14, Math.cos(a) * r); dummy.rotation.set(0, random() * TAU, 0); dummy.scale.set(size * 1.5, size * .45, size); dummy.updateMatrix(); moss.setMatrixAt(i, dummy.matrix);
    c.setHSL(.16 + random() * .05, .26 + random() * .24, .19 + random() * .19); moss.setColorAt(i, c);
  }
  parent.add(moss);
  // Four bent blades form a reusable tuft; sparse clusters do not obscure the toes.
  const bladeParts: THREE.BufferGeometry[] = [];
  for (let j = 0; j < 4; j++) {
    const a = j * 2.399, height = .20 + j * .037;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([-.014, 0, 0, .014, 0, 0, Math.sin(a) * .034 + .008, height * .56, Math.cos(a) * .034, -.014, 0, 0, Math.sin(a) * .034 + .008, height * .56, Math.cos(a) * .034, Math.sin(a) * .064, height, Math.cos(a) * .064], 3));
    g.computeVertexNormals(); bladeParts.push(g);
  }
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x89905a, roughness: 1, side: THREE.DoubleSide });
  const grass = new THREE.InstancedMesh(mergeParts(bladeParts), grassMat, 33); grass.name = '33 sparse grass tufts';
  for (let i = 0; i < grass.count; i++) {
    const a = [1.18, 2.9, 4.4, 5.75][i % 4]! + (random() - .5) * .30, r = 1.78 + random() * .20;
    dummy.position.set(Math.sin(a) * r, .54, Math.cos(a) * r); dummy.rotation.set(0, random() * TAU, (random() - .5) * .2); dummy.scale.setScalar(.65 + random() * .65); dummy.updateMatrix(); grass.setMatrixAt(i, dummy.matrix);
  }
  parent.add(grass);
  // One tiny maker's pin, restrained enough not to compete with the miniature.
  instanceSpheres(parent, 'Recessed plinth maker pin', [[0, .22, 2.239]], [.027, .027, .009], brass);
}

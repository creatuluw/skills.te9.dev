import * as THREE from 'three';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export type V3 = readonly [number, number, number];
export const v = (p: V3): THREE.Vector3 => new THREE.Vector3(...p);

/** Seedless, continuous object-space noise: the sculpture is identical on every load. */
export function noise(x: number, y: number, z: number): number {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const smooth = (t: number): number => t * t * (3 - 2 * t);
  const u = smooth(x - ix), w = smooth(y - iy), t = smooth(z - iz);
  const hash = (a: number, b: number, c: number): number => {
    let n = Math.imul(a, 374761393) ^ Math.imul(b, 668265263) ^ Math.imul(c, 2147483647);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  };
  const mix = THREE.MathUtils.lerp;
  return mix(mix(mix(hash(ix, iy, iz), hash(ix + 1, iy, iz), u), mix(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), u), w),
    mix(mix(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), u), mix(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), u), w), t);
}

export interface Form {
  center: V3;
  radius: V3;
  rotation?: THREE.Quaternion;
  blend?: number;
  subtract?: boolean;
  /** > 2 produces a sculpted, rounded-square cross-section. */
  power?: number;
}

type ReadyForm = Form & { inverse: number[]; extent: number[] };

export class SculptField {
  private forms: ReadyForm[] = [];

  oval(center: V3, radius: V3, blend = .13, rotation?: THREE.Quaternion, subtract = false, power = 2): this {
    const matrix = new THREE.Matrix4().makeRotationFromQuaternion(rotation ?? new THREE.Quaternion());
    const m = matrix.elements;
    const extent = [
      Math.abs(m[0]!) * radius[0] + Math.abs(m[4]!) * radius[1] + Math.abs(m[8]!) * radius[2],
      Math.abs(m[1]!) * radius[0] + Math.abs(m[5]!) * radius[1] + Math.abs(m[9]!) * radius[2],
      Math.abs(m[2]!) * radius[0] + Math.abs(m[6]!) * radius[1] + Math.abs(m[10]!) * radius[2],
    ];
    this.forms.push({ center, radius, rotation, blend, subtract, power, inverse: matrix.transpose().elements.slice(), extent });
    return this;
  }

  muscle(a: V3, b: V3, width: number, depth: number, blend = .15): this {
    const from = v(a), to = v(b), direction = to.clone().sub(from);
    const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    return this.oval(from.add(to).multiplyScalar(.5).toArray(), [width, direction.length() * .5, depth], blend, rotation);
  }

  private distance(f: ReadyForm, x: number, y: number, z: number): number {
    x -= f.center[0]; y -= f.center[1]; z -= f.center[2];
    const e = f.inverse;
    const px = (e[0]! * x + e[4]! * y + e[8]! * z) / f.radius[0];
    const py = (e[1]! * x + e[5]! * y + e[9]! * z) / f.radius[1];
    const pz = (e[2]! * x + e[6]! * y + e[10]! * z) / f.radius[2];
    if (f.power !== 2) {
      const p = f.power ?? 2;
      return (Math.pow(Math.abs(px) ** p + Math.abs(py) ** p + Math.abs(pz) ** p, 1 / p) - 1) * Math.min(...f.radius);
    }
    const k0 = Math.sqrt(px * px + py * py + pz * pz);
    const k1 = Math.sqrt((px / f.radius[0]) ** 2 + (py / f.radius[1]) ** 2 + (pz / f.radius[2]) ** 2);
    return k1 < 1e-8 ? -Math.min(...f.radius) : k0 * (k0 - 1) / k1;
  }

  private combine(a: number, b: number, k: number, subtract: boolean): number {
    if (subtract) return Math.max(a, -b);
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * k * .25;
  }

  sample(x: number, y: number, z: number): number {
    let distance = 20;
    for (const f of this.forms) distance = this.combine(distance, this.distance(f, x, y, z), f.blend ?? .13, f.subtract ?? false);
    return distance;
  }

  /** Find the real skin surface for engravings instead of floating lines over muscles. */
  front(x: number, y: number, back = false): number | undefined {
    const sign = back ? -1 : 1;
    let outer = 2.2;
    for (let z = 2.2; z > -1.8; z -= .045) {
      if (this.sample(x, y, z * sign) <= 0) {
        let inner = z;
        for (let i = 0; i < 9; i++) {
          const mid = (outer + inner) / 2;
          if (this.sample(x, y, mid * sign) > 0) outer = mid;
          else inner = mid;
        }
        return (outer + inner) * .5 * sign;
      }
      outer = z;
    }
    return undefined;
  }

  geometry(min: V3, max: V3, resolution: number, maxTriangles: number, relief = .009): THREE.BufferGeometry {
    // The official addon only needs CPU arrays; no renderer, browser, or document required.
    const placeholder = new THREE.MeshBasicMaterial();
    const marching = new MarchingCubes(resolution, placeholder, false, false, maxTriangles);
    marching.isolation = 0;
    const field = marching.field;
    field.fill(-20);
    const step = max.map((n, i) => (n - min[i]!) / resolution);
    const n = resolution;
    for (const form of this.forms) {
      const padding = (form.blend ?? .13) + .12;
      const low = form.center.map((c, i) => Math.max(1, Math.floor((c - form.extent[i]! - padding - min[i]!) / step[i]!)));
      const high = form.center.map((c, i) => Math.min(n - 2, Math.ceil((c + form.extent[i]! + padding - min[i]!) / step[i]!)));
      for (let iz = low[2]!; iz <= high[2]!; iz++) {
        const z = min[2] + iz * step[2]!;
        for (let iy = low[1]!; iy <= high[1]!; iy++) {
          const y = min[1] + iy * step[1]!;
          let index = iz * n * n + iy * n + low[0]!;
          for (let ix = low[0]!; ix <= high[0]!; ix++, index++) {
            const d = this.distance(form, min[0] + ix * step[0]!, y, z);
            field[index] = -this.combine(-field[index]!, d, form.blend ?? .13, form.subtract ?? false);
          }
        }
      }
    }
    marching.update();
    const count = marching.geometry.drawRange.count;
    if (count >= maxTriangles * 3) throw new Error('Stone giant implicit surface exceeded its triangle budget');
    const result = new THREE.BufferGeometry();
    for (const key of ['position', 'normal']) {
      const attr = marching.geometry.getAttribute(key);
      result.setAttribute(key, new THREE.BufferAttribute(new Float32Array((attr.array as Float32Array).subarray(0, count * 3)), 3));
    }
    const size = v(max).sub(v(min));
    result.scale(size.x / 2, size.y / 2, size.z / 2);
    result.translate((max[0] + min[0]) / 2, (max[1] + min[1]) / 2, (max[2] + min[2]) / 2);
    const p = result.getAttribute('position'), normal = result.getAttribute('normal');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const d = relief * ((noise(x * 9, y * 9, z * 9) - .5) + .35 * (noise(x * 31, y * 31, z * 31) - .5));
      p.setXYZ(i, x + normal.getX(i) * d, y + normal.getY(i) * d, z + normal.getZ(i) * d);
    }
    stoneUV(result);
    result.computeBoundingBox();
    result.computeBoundingSphere();
    marching.geometry.dispose();
    placeholder.dispose();
    return result;
  }
}

/** Per-triangle box projection avoids cylindrical poles on the hands/head. */
export function stoneUV(g: THREE.BufferGeometry, scale = .63): void {
  const p = g.getAttribute('position'), n = g.getAttribute('normal');
  const uv = new Float32Array(p.count * 2);
  const colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i += 3) {
    const nx = Math.abs(n.getX(i) + n.getX(i + 1) + n.getX(i + 2));
    const ny = Math.abs(n.getY(i) + n.getY(i + 1) + n.getY(i + 2));
    const nz = Math.abs(n.getZ(i) + n.getZ(i + 1) + n.getZ(i + 2));
    for (let j = i; j < Math.min(i + 3, p.count); j++) {
      const x = p.getX(j), y = p.getY(j), z = p.getZ(j);
      uv[j * 2] = (nx > ny && nx > nz ? z : x) * scale;
      uv[j * 2 + 1] = (ny > nx && ny > nz ? z : y) * scale;
      const mottling = .83 + .17 * noise(x * 2.4, y * 2.4, z * 2.4);
      colors[j * 3] = mottling * .96;
      colors[j * 3 + 1] = mottling * .985;
      colors[j * 3 + 2] = mottling;
    }
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

export function tube(points: V3[], radius: number, radial = 7, segments = Math.max(12, points.length * 5)): THREE.BufferGeometry {
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v)), segments, radius, radial, false);
}

export function tapered(points: V3[], radii: number[], radial = 12, segments = 24): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points.map(v));
  const frames = curve.computeFrenetFrames(segments, false);
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments, p = curve.getPoint(t), rIndex = t * (radii.length - 1);
    const a = Math.min(Math.floor(rIndex), radii.length - 2);
    const r = THREE.MathUtils.lerp(radii[a]!, radii[a + 1]!, rIndex - a);
    for (let j = 0; j <= radial; j++) {
      const angle = j / radial * Math.PI * 2;
      const normal = frames.normals[i]!.clone().multiplyScalar(Math.cos(angle)).addScaledVector(frames.binormals[i]!, Math.sin(angle));
      const point = p.clone().addScaledVector(normal, r);
      positions.push(...point.toArray()); normals.push(...normal.toArray()); uvs.push(j / radial, t);
      if (i < segments && j < radial) {
        const k = i * (radial + 1) + j;
        indices.push(k, k + radial + 1, k + 1, k + 1, k + radial + 1, k + radial + 2);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  return g;
}

/** Merge static detail by material; retain semantic names without a draw call per stitch. */
export function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const clean = parts.map(g => {
    const result = g.index ? g.toNonIndexed() : g;
    for (const name of Object.keys(result.attributes)) if (!['position', 'normal', 'uv'].includes(name)) result.deleteAttribute(name);
    if (!result.getAttribute('uv')) result.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(result.getAttribute('position').count * 2), 2));
    return result;
  });
  const result = mergeGeometries(clean, false);
  if (!result) throw new Error('Stone giant detail merge failed');
  for (const g of new Set([...parts, ...clean])) g.dispose();
  return result;
}

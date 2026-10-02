import { Box3, InstancedMesh, Mesh, Vector3 } from 'three';
import type { BufferGeometry, Group } from 'three';

/** Small browser smoke check: invoked after model construction, also exposed for reruns. */
export function checkStoneGiant(model: Group) {
  const assert = (condition: boolean, message: string): void => {
    if (!condition) throw new Error(`Stone giant check: ${message}`);
  };
  const finite = (values: ArrayLike<number>, name: string): void => {
    for (let i = 0; i < values.length; i++) assert(Number.isFinite(values[i]), `${name}[${i}] is not finite`);
  };
  let meshes = 0;
  let triangles = 0;
  let vertices = 0;
  const parts: string[] = [];
  model.updateMatrixWorld(true);
  model.traverse((object) => {
    finite(object.matrixWorld.elements, `${object.name} transform`);
    if (!(object instanceof Mesh)) return;
    const geometry: BufferGeometry = object.geometry;
    const positions = geometry.getAttribute('position');
    assert(Boolean(positions) && positions.count > 0, `${object.name} has no vertices`);
    assert(positions.itemSize === 3, `${object.name} needs xyz positions`);
    for (const [name, attribute] of Object.entries(geometry.attributes)) {
      finite(attribute.array, `${object.name}/${name}`);
    }
    for (const attributes of Object.values(geometry.morphAttributes)) {
      for (const attribute of attributes ?? []) finite(attribute.array, `${object.name}/morph`);
    }
    const index = geometry.index;
    if (index) {
      for (let i = 0; i < index.count; i++) {
        const vertex = index.getX(i);
        assert(Number.isInteger(vertex) && vertex >= 0 && vertex < positions.count, `${object.name} invalid index`);
      }
    }
    const count = index?.count ?? positions.count;
    assert(count > 0 && count % 3 === 0, `${object.name} has incomplete triangles`);
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox!;
    finite([...bounds.min.toArray(), ...bounds.max.toArray()], `${object.name} bounds`);
    assert(!bounds.isEmpty(), `${object.name} has empty bounds`);
    let instances = 1;
    if (object instanceof InstancedMesh) {
      instances = object.count;
      assert(instances > 0 && instances <= object.instanceMatrix.count, `${object.name} invalid instance count`);
      finite(object.instanceMatrix.array, `${object.name}/instances`);
      if (object.instanceColor) finite(object.instanceColor.array, `${object.name}/instanceColors`);
      object.computeBoundingBox();
    }
    meshes++;
    triangles += count / 3 * instances;
    vertices += positions.count * instances;
    parts.push(object.name);
  });
  const bounds = new Box3().setFromObject(model);
  const size = bounds.getSize(new Vector3());
  finite([...bounds.min.toArray(), ...bounds.max.toArray()], 'model bounds');
  assert(meshes > 0 && triangles > 0, 'model is empty');
  assert(meshes <= 180 && triangles <= 400_000, 'model exceeds geometry budget');
  assert(bounds.min.y >= -0.02 && bounds.min.y <= 0.5 && bounds.max.y <= 10.5, 'expected ground at y=0 and top near y=10');
  assert(size.y >= 9 && size.x >= 3 && size.x <= 9 && size.z >= 2 && size.z <= 9, 'unexpected model proportions');
  for (const pattern of [/torso/i, /head/i, /right hand/i, /left hand/i, /wrap/i, /skull/i, /sandal/i, /rock.*hand/i, /plinth/i]) {
    assert(parts.some((name) => pattern.test(name)), `missing key part ${pattern}`);
  }
  const summary = {
    passed: true,
    meshes,
    triangles: Math.round(triangles),
    vertices,
    bounds: { min: bounds.min.toArray(), max: bounds.max.toArray() },
    size: size.toArray(),
    parts,
  };
  console.info('[Stone giant] Geometry check passed', summary);
  return summary;
}

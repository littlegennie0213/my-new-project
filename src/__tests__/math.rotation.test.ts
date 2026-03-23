import { describe, expect, it } from 'vitest';
import { buildRotationMatrix, rotateVector } from '../math/rotation';
import { vec3 } from '../math/vector';

describe('buildRotationMatrix', () => {
  it('keeps basis vectors unchanged at zero rotation', () => {
    const matrix = buildRotationMatrix({ x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0 });

    expect(rotateVector(matrix, vec3(1, 0, 0))).toEqual({ x: 1, y: 0, z: 0 });
    expect(rotateVector(matrix, vec3(0, 1, 0))).toEqual({ x: 0, y: 1, z: 0 });
    expect(rotateVector(matrix, vec3(0, 0, 1))).toEqual({ x: 0, y: 0, z: 1 });
  });

  it('rotates the local x-axis into the positive y-axis for a +90 degree yaw', () => {
    const matrix = buildRotationMatrix({ x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 90 });
    const rotated = rotateVector(matrix, vec3(1, 0, 0));

    expect(rotated.x).toBeCloseTo(0, 6);
    expect(rotated.y).toBeCloseTo(1, 6);
    expect(rotated.z).toBeCloseTo(0, 6);
  });
});

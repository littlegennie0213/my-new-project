import type { PlatformPose } from '../types/pose';
import type { Vec3 } from '../types/platform';
import { vec3 } from './vector';

export type Matrix3 = [[number, number, number], [number, number, number], [number, number, number]];

export const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;
export const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

export const buildRotationMatrix = (pose: PlatformPose): Matrix3 => {
  const roll = degreesToRadians(pose.roll);
  const pitch = degreesToRadians(pose.pitch);
  const yaw = degreesToRadians(pose.yaw);

  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);

  return [
    [cy * cp, cy * sp * sr - sy * cr, cy * sp * cr + sy * sr],
    [sy * cp, sy * sp * sr + cy * cr, sy * sp * cr - cy * sr],
    [-sp, cp * sr, cp * cr],
  ];
};

export const rotateVector = (matrix: Matrix3, vector: Vec3): Vec3 =>
  vec3(
    matrix[0][0] * vector.x + matrix[0][1] * vector.y + matrix[0][2] * vector.z,
    matrix[1][0] * vector.x + matrix[1][1] * vector.y + matrix[1][2] * vector.z,
    matrix[2][0] * vector.x + matrix[2][1] * vector.y + matrix[2][2] * vector.z,
  );

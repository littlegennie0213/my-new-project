import type { Vec3 } from '../types/platform';

export const vec3 = (x: number, y: number, z: number): Vec3 => ({ x, y, z });

export const addVec3 = (a: Vec3, b: Vec3): Vec3 => vec3(a.x + b.x, a.y + b.y, a.z + b.z);

export const subVec3 = (a: Vec3, b: Vec3): Vec3 => vec3(a.x - b.x, a.y - b.y, a.z - b.z);

export const scaleVec3 = (value: Vec3, scalar: number): Vec3 => vec3(value.x * scalar, value.y * scalar, value.z * scalar);

export const magnitudeVec3 = (value: Vec3): number => Math.sqrt(value.x ** 2 + value.y ** 2 + value.z ** 2);

export const midpointVec3 = (a: Vec3, b: Vec3): Vec3 => scaleVec3(addVec3(a, b), 0.5);

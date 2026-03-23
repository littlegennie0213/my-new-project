import type { PlatformPose, PoseLimit } from '../types/pose';
import type { PlatformGeometry, Vec3 } from '../types/platform';
import { vec3 } from '../math/vector';

const pairedHexagonAnchors = (radius: number, pairHalfAngleDegrees: number, phaseDegrees: number): Vec3[] => {
  const anchors: Vec3[] = [];
  const pairHalfAngle = (pairHalfAngleDegrees * Math.PI) / 180;
  const phase = (phaseDegrees * Math.PI) / 180;

  for (let pairIndex = 0; pairIndex < 3; pairIndex += 1) {
    const centerAngle = phase + pairIndex * ((2 * Math.PI) / 3);
    anchors.push(vec3(radius * Math.cos(centerAngle - pairHalfAngle), radius * Math.sin(centerAngle - pairHalfAngle), 0));
    anchors.push(vec3(radius * Math.cos(centerAngle + pairHalfAngle), radius * Math.sin(centerAngle + pairHalfAngle), 0));
  }

  return anchors;
};

export const defaultGeometry: PlatformGeometry = {
  baseRadius: 120,
  topRadius: 92,
  neutralHeight: 170,
  actuatorMinLength: 130,
  actuatorMaxLength: 235,
  baseAnchors: pairedHexagonAnchors(120, 11, 0),
  topAnchorsLocal: pairedHexagonAnchors(92, 16, 30),
};

export const defaultPose: PlatformPose = {
  x: 0,
  y: 0,
  z: defaultGeometry.neutralHeight,
  roll: 0,
  pitch: 0,
  yaw: 0,
};

export const poseLimits: Record<keyof PlatformPose, PoseLimit> = {
  x: { min: -55, max: 55, step: 1, label: 'X offset', unit: 'mm' },
  y: { min: -55, max: 55, step: 1, label: 'Y offset', unit: 'mm' },
  z: { min: 120, max: 230, step: 1, label: 'Z height', unit: 'mm' },
  roll: { min: -20, max: 20, step: 0.5, label: 'Roll', unit: 'deg' },
  pitch: { min: -20, max: 20, step: 0.5, label: 'Pitch', unit: 'deg' },
  yaw: { min: -30, max: 30, step: 0.5, label: 'Yaw', unit: 'deg' },
};

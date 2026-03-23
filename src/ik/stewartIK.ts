import { buildRotationMatrix, rotateVector } from '../math/rotation';
import { addVec3, magnitudeVec3, subVec3, vec3 } from '../math/vector';
import type { PlatformPose } from '../types/pose';
import type { PlatformGeometry, StewartIKResult } from '../types/platform';

export const solveStewartInverseKinematics = (
  geometry: PlatformGeometry,
  pose: PlatformPose,
): StewartIKResult => {
  const rotation = buildRotationMatrix(pose);
  const translation = vec3(pose.x, pose.y, pose.z);

  const topAnchorsWorld = geometry.topAnchorsLocal.map((anchor) => addVec3(translation, rotateVector(rotation, anchor)));
  const actuatorVectors = topAnchorsWorld.map((anchor, index) => subVec3(anchor, geometry.baseAnchors[index]));
  const actuatorLengths = actuatorVectors.map(magnitudeVec3);
  const lengthViolations = actuatorLengths.map((length) => {
    if (length < geometry.actuatorMinLength) {
      return length - geometry.actuatorMinLength;
    }

    if (length > geometry.actuatorMaxLength) {
      return length - geometry.actuatorMaxLength;
    }

    return 0;
  });

  return {
    topAnchorsWorld,
    actuatorVectors,
    actuatorLengths,
    lengthViolations,
    isReachable: lengthViolations.every((violation) => violation === 0),
  };
};

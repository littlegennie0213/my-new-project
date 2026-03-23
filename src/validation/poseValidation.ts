import { poseLimits } from '../config/defaultPlatform';
import type { PlatformPose } from '../types/pose';
import type { StewartIKResult, ValidationIssue } from '../types/platform';

export const clampPoseValue = (key: keyof PlatformPose, value: number): number => {
  const limit = poseLimits[key];
  return Math.min(limit.max, Math.max(limit.min, value));
};

export const validatePose = (pose: PlatformPose, result: StewartIKResult): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  (Object.keys(poseLimits) as Array<keyof PlatformPose>).forEach((key) => {
    const value = pose[key];
    const limit = poseLimits[key];

    if (!Number.isFinite(value)) {
      issues.push({ code: `${key}-nan`, message: `${limit.label} must be a finite number.` });
      return;
    }

    if (value < limit.min || value > limit.max) {
      issues.push({
        code: `${key}-range`,
        message: `${limit.label} must stay between ${limit.min} and ${limit.max} ${limit.unit}.`,
      });
    }
  });

  if (!result.isReachable) {
    const violatingIndices = result.lengthViolations
      .map((violation, index) => ({ violation, index }))
      .filter(({ violation }) => violation !== 0)
      .map(({ index }) => index + 1);

    issues.push({
      code: 'actuator-range',
      message: `Actuator limits exceeded on legs ${violatingIndices.join(', ')}. Try a smaller translation or rotation.`,
    });
  }

  return issues;
};

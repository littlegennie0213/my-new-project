import { describe, expect, it } from 'vitest';
import { defaultGeometry, defaultPose } from '../config/defaultPlatform';
import { solveStewartInverseKinematics } from '../ik/stewartIK';
import { validatePose } from '../validation/poseValidation';

describe('validatePose', () => {
  it('reports out-of-range pose values', () => {
    const pose = { ...defaultPose, roll: 40 };
    const result = solveStewartInverseKinematics(defaultGeometry, pose);
    const issues = validatePose(pose, result);

    expect(issues.some((issue) => issue.code === 'roll-range')).toBe(true);
  });
});

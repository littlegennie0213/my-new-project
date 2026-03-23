import { describe, expect, it } from 'vitest';
import { defaultGeometry, defaultPose } from '../config/defaultPlatform';
import { solveStewartInverseKinematics } from '../ik/stewartIK';

describe('solveStewartInverseKinematics', () => {
  it('computes six actuator lengths for the neutral pose', () => {
    const result = solveStewartInverseKinematics(defaultGeometry, defaultPose);

    expect(result.actuatorLengths).toHaveLength(6);
    result.actuatorLengths.forEach((length) => {
      expect(length).toBeGreaterThan(defaultGeometry.actuatorMinLength);
      expect(length).toBeLessThan(defaultGeometry.actuatorMaxLength);
    });
    expect(result.isReachable).toBe(true);
  });
});

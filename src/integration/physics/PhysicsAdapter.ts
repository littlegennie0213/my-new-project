import type { PlatformPose } from '../../types/pose';
import type { StewartIKResult } from '../../types/platform';

export interface PhysicsAdapter {
  name: string;
  step(targetPose: PlatformPose, deltaSeconds: number): PlatformPose;
  postSolve?(result: StewartIKResult): void;
}

export class NoPhysicsAdapter implements PhysicsAdapter {
  public readonly name = 'inverse-kinematics-only';

  public step(targetPose: PlatformPose, _deltaSeconds: number): PlatformPose {
    return targetPose;
  }
}

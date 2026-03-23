import { create } from 'zustand';
import { defaultGeometry, defaultPose } from '../config/defaultPlatform';
import { solveStewartInverseKinematics } from '../ik/stewartIK';
import { NoPhysicsAdapter } from '../integration/physics/PhysicsAdapter';
import type { PlatformPose, PoseInputKey } from '../types/pose';
import type { PlatformGeometry, StewartIKResult, ValidationIssue } from '../types/platform';
import { clampPoseValue, validatePose } from '../validation/poseValidation';

interface SimulatorState {
  geometry: PlatformGeometry;
  pose: PlatformPose;
  result: StewartIKResult;
  issues: ValidationIssue[];
  adapterName: string;
  setPoseValue: (key: PoseInputKey, value: number, clamp?: boolean) => void;
  resetPose: () => void;
}

const adapter = new NoPhysicsAdapter();
const initialResult = solveStewartInverseKinematics(defaultGeometry, defaultPose);

export const useSimulatorStore = create<SimulatorState>((set) => ({
  geometry: defaultGeometry,
  pose: defaultPose,
  result: initialResult,
  issues: validatePose(defaultPose, initialResult),
  adapterName: adapter.name,
  setPoseValue: (key, value, clamp = false) =>
    set((state) => {
      const nextPose = {
        ...state.pose,
        [key]: clamp ? clampPoseValue(key, value) : value,
      };
      const steppedPose = adapter.step(nextPose, 1 / 60);
      const nextResult = solveStewartInverseKinematics(state.geometry, steppedPose);

      return {
        pose: steppedPose,
        result: nextResult,
        issues: validatePose(steppedPose, nextResult),
      };
    }),
  resetPose: () =>
    set((state) => {
      const nextResult = solveStewartInverseKinematics(state.geometry, defaultPose);

      return {
        pose: defaultPose,
        result: nextResult,
        issues: validatePose(defaultPose, nextResult),
      };
    }),
}));

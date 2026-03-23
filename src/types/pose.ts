export type PoseInputKey = 'x' | 'y' | 'z' | 'roll' | 'pitch' | 'yaw';

export interface PlatformPose {
  x: number;
  y: number;
  z: number;
  roll: number;
  pitch: number;
  yaw: number;
}

export interface PoseLimit {
  min: number;
  max: number;
  step: number;
  label: string;
  unit: string;
}

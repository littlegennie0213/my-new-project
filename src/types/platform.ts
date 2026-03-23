export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface PlatformGeometry {
  baseAnchors: Vec3[];
  topAnchorsLocal: Vec3[];
  baseRadius: number;
  topRadius: number;
  neutralHeight: number;
  actuatorMinLength: number;
  actuatorMaxLength: number;
}

export interface StewartIKResult {
  topAnchorsWorld: Vec3[];
  actuatorVectors: Vec3[];
  actuatorLengths: number[];
  lengthViolations: number[];
  isReachable: boolean;
}

export interface ValidationIssue {
  code: string;
  message: string;
}

import { Line, OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import { CylinderGeometry, Matrix4, Quaternion, Vector3 } from 'three';
import { buildRotationMatrix } from '../math/rotation';
import type { PlatformPose } from '../types/pose';
import type { PlatformGeometry, Vec3 } from '../types/platform';

const toThreeVector = (value: Vec3) => new Vector3(value.x, value.z, value.y);

const polygonLoop = (anchors: Vec3[]) => [...anchors, anchors[0]];

interface PlatformSceneProps {
  geometry: PlatformGeometry;
  pose: PlatformPose;
  topAnchorsWorld: Vec3[];
}

export function PlatformScene({ geometry, pose, topAnchorsWorld }: PlatformSceneProps) {
  const plateGeometry = useMemo(() => new CylinderGeometry(1, 1, 4, 48), []);

  const baseLoop = useMemo(() => polygonLoop(geometry.baseAnchors).map(toThreeVector), [geometry.baseAnchors]);
  const topLoop = useMemo(() => polygonLoop(topAnchorsWorld).map(toThreeVector), [topAnchorsWorld]);
  const topPlateCenter = useMemo(() => toThreeVector({ x: pose.x, y: pose.y, z: pose.z }), [pose]);
  const topPlateQuaternion = useMemo(() => {
    const rotation = buildRotationMatrix(pose);

    const xAxis = toThreeVector({ x: rotation[0][0], y: rotation[1][0], z: rotation[2][0] }).normalize();
    const yAxis = toThreeVector({ x: rotation[0][2], y: rotation[1][2], z: rotation[2][2] }).normalize();
    const zAxis = toThreeVector({ x: rotation[0][1], y: rotation[1][1], z: rotation[2][1] }).normalize();

    return new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(xAxis, yAxis, zAxis));
  }, [pose]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1.2} position={[180, 240, 180]} />
      <directionalLight intensity={0.5} position={[-180, 100, -120]} />

      <gridHelper args={[500, 20, '#2f3a57', '#182034']} position={[0, 0, 0]} />
      <axesHelper args={[120]} />

      <mesh geometry={plateGeometry} position={[0, 0, 0]} scale={[geometry.baseRadius, 1, geometry.baseRadius]}>
        <meshStandardMaterial color="#172033" metalness={0.25} roughness={0.72} />
      </mesh>

      <mesh geometry={plateGeometry} position={topPlateCenter} quaternion={topPlateQuaternion} scale={[geometry.topRadius, 1, geometry.topRadius]}>
        <meshStandardMaterial color="#7dd3fc" emissive="#10324f" metalness={0.15} roughness={0.35} />
      </mesh>

      <Line color="#60a5fa" lineWidth={2.5} points={baseLoop} />
      <Line color="#bae6fd" lineWidth={2.5} points={topLoop} />

      {geometry.baseAnchors.map((anchor, index) => (
        <group key={`leg-${index + 1}`}>
          <mesh position={toThreeVector(anchor)}>
            <sphereGeometry args={[5, 24, 24]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>

          <mesh position={toThreeVector(topAnchorsWorld[index])}>
            <sphereGeometry args={[4.5, 24, 24]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>

          <Line color="#f59e0b" lineWidth={3.5} points={[toThreeVector(anchor), toThreeVector(topAnchorsWorld[index])]} />
        </group>
      ))}

      <OrbitControls enableDamping makeDefault maxDistance={700} minDistance={160} target={[0, geometry.neutralHeight * 0.48, 0]} />
    </>
  );
}

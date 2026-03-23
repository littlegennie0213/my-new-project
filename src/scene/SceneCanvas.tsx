import { Canvas } from '@react-three/fiber';
import type { PlatformPose } from '../types/pose';
import type { PlatformGeometry, Vec3 } from '../types/platform';
import { PlatformScene } from './PlatformScene';

interface SceneCanvasProps {
  geometry: PlatformGeometry;
  pose: PlatformPose;
  topAnchorsWorld: Vec3[];
}

export function SceneCanvas({ geometry, pose, topAnchorsWorld }: SceneCanvasProps) {
  return (
    <div className="canvas-shell">
      <Canvas camera={{ fov: 42, position: [310, 250, 310] }}>
        <color args={['#08111f']} attach="background" />
        <PlatformScene geometry={geometry} pose={pose} topAnchorsWorld={topAnchorsWorld} />
      </Canvas>
    </div>
  );
}

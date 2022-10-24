import { Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  TransformControls,
  ContactShadows,
  useGLTF,
  useCursor,
  Stage,
  Bounds,
} from '@react-three/drei';
import { SpeckleObjects } from 'components/canvas/SpeckleObjects';
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil';

type ViewerProps = {
  speckleObjects?: SpeckleObject[];
};

export type SpeckleObject = {
  server: string;
  streamId: string;
  objectId: string;
};

export default function Viewer({ speckleObjects }: ViewerProps) {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas dpr={[1, 2]} camera={{ position: [-40, 20, 40], fov: 50 }}>
        <RecoilBridge>
          {/* Fill */}
          <ambientLight intensity={0.1} />
          {/* Main */}
          <directionalLight
            position={[1, 10, -2]}
            intensity={1}
            shadow-camera-far={70}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-mapSize={[512, 512]}
            castShadow
          />
          {/* Strip */}
          <directionalLight position={[-10, -10, 2]} intensity={3} />
          {/* Ground */}
          <Suspense fallback={null}>
            <Bounds observe margin={2}>
              {speckleObjects?.map((object) => (
                <SpeckleObjects
                  key={object.objectId}
                  objectUrl={`${object.server}/streams/${object.streamId}/objects/${object.objectId}`}
                />
              ))}
            </Bounds>
          </Suspense>
          <OrbitControls makeDefault />
        </RecoilBridge>
      </Canvas>
    </Suspense>
  );
}

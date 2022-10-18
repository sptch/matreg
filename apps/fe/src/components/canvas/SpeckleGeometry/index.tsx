import { useCursor } from '@react-three/drei';
import { useConvertToBuffer } from 'common/hooks';
import { atoms } from 'common/recoli';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import THREE from 'three';

type SpeckleGeometryProps = {
  object: any;
  loader?: any;
  isActive?: boolean;
  isHovered?: boolean;
};

export function SpeckleGeometry({
  object,
  loader,
  isActive,
  isHovered,
}: SpeckleGeometryProps) {
  const obj = useConvertToBuffer(object, loader);

  return (
    <group position={[0, 0, 0]} rotation={[-3.14 / 2, 0, 0]}>
      <mesh castShadow receiveShadow>
        <meshLambertMaterial color={isActive ? 'red' : 'white'} />
        <bufferGeometry attach="geometry" {...obj?.bufferGeometry} />
      </mesh>
    </group>
  );
}

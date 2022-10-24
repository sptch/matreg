import { useCursor } from '@react-three/drei';
import { useConvertToBuffer } from 'common/hooks';
import { atoms } from 'common/recoil';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import THREE from 'three';

type SpeckleGeometryProps = {
  object: any;
  loader?: any;
  active?: boolean;
  hovered?: boolean;
  preselected?: boolean;
  transparent?: boolean;
};

export function SpeckleGeometry({
  object,
  loader,
  active,
  hovered,
  preselected,
  transparent,
}: SpeckleGeometryProps) {
  const obj = useConvertToBuffer(object, loader);

  return (
    <group position={[0, 0, 0]} rotation={[-3.14 / 2, 0, 0]}>
      <mesh castShadow receiveShadow>
        <meshLambertMaterial color="white" />

        {transparent && (
          <meshLambertMaterial
            side={THREE?.FrontSide}
            transparent={true}
            opacity={0.3}
            // depthWrite={false}
          />
        )}
        {preselected && <meshLambertMaterial color="grey" />}
        {hovered && <meshStandardMaterial color="#56657c" />}
        {active && <meshLambertMaterial color="#56657c" />}

        <bufferGeometry attach="geometry" {...obj?.bufferGeometry} />
      </mesh>
    </group>
  );
}

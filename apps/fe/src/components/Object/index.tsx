import { useCursor } from '@react-three/drei';
import { useConvertToBuffer } from 'common/hooks';
import { atoms } from 'common/recoli';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type ObjectProps = {
  object: any;
  loader?: any;
};

export function Object({ object, loader }: ObjectProps) {
  const obj = useConvertToBuffer(object, loader);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const [selected, setSelected] = useRecoilState(atoms.selectedObjectId);

  return (
    <group position={[0, 10, 0]} rotation={[-3.14 / 2, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}
        onClick={(e) => (e.stopPropagation(), setSelected(obj.meta.id))}
      >
        <meshLambertMaterial
          color={selected === obj?.meta?.id ? 'red' : 'white'}
        />
        <bufferGeometry attach="geometry" {...obj?.bufferGeometry} />
      </mesh>
    </group>
  );
}

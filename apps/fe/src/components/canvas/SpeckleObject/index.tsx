import { useBounds, useCursor } from '@react-three/drei';
import { atoms } from 'common/recoli';
import { SpeckleGeometry } from 'components/canvas/SpeckleGeometry';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import THREE from 'three';

type ObjectProps = {
  object: any;
  loader?: any;
  moveToOrigin?: boolean;
};

export function SpeckleObject({ object, loader }: ObjectProps) {
  const [selected, setSelected] = useRecoilState(atoms.selectedObjectId);
  const [hovered, setHovered] = useState(false);
  const isActive = selected === object?.id;
  useCursor(hovered);
  const api = useBounds();

  return (
    <group
      key={object?.id}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
      onClick={(e) => (e.stopPropagation(), setSelected(object?.id))}
      onDoubleClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
    >
      {object?.displayObjects &&
        object?.displayObjects.map((displayObjects: any) => (
          <SpeckleGeometry
            key={displayObjects.id}
            isActive={isActive}
            object={displayObjects}
            loader={loader}
          />
        ))}
    </group>
  );
}

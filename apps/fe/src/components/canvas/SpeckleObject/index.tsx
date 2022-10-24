import { useBounds, useCursor } from '@react-three/drei';
import { atoms } from 'common/recoil';
import { SpeckleGeometry } from 'components/canvas/SpeckleGeometry';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import THREE from 'three';

type ObjectProps = {
  object: any;
  loader?: any;
  moveToOrigin?: boolean;
};

export function SpeckleObject({ object, loader }: ObjectProps) {
  const [selectedId, setSelectedId] = useRecoilState(atoms.selectedObjectId);
  const [hoveredId, setHoveredId] = useRecoilState(atoms.hoveredObjectId);
  const preSelectedObjects = useRecoilValue(atoms.preSelectedObjects);
  const [preselected, setPreselected] = useState(false);

  useEffect(() => {
    if (preSelectedObjects) {
      setPreselected(preSelectedObjects.some((obj) => obj?.id === object.id));
    } else setPreselected(false);
  }, [preSelectedObjects]);

  const [hovered, setHovered] = useState(false);
  // const [active, setActive] = useState(false);
  // useEffect(() => {
  //   if (hoveredId) {
  //     const hovered = hoveredId === object?.id;
  //     setHovered(hovered);
  //   } else setHovered(false);
  // }, [hoveredId]);

  const active = selectedId === object?.id;

  // useEffect(() => {
  //   if (selectedId) {
  //     const active = selectedId === object?.id;
  //     setActive(active);
  //   } else setActive(false);
  // }, [selectedId]);

  useCursor(hovered);
  const api = useBounds();

  return (
    <group
      key={object?.id}
      onPointerOver={(e) =>
        (preselected || !preSelectedObjects) &&
        (e.stopPropagation(), setHovered(true))
      }
      onPointerOut={(e) => setHovered(false)}
      onDoubleClick={(e) =>
        (preselected || !preSelectedObjects) &&
        (e.stopPropagation(),
        e.delta <= 2 && api.refresh(e.object).fit(),
        setSelectedId(object?.id))
      }
      onClick={(e) =>
        (preselected || !preSelectedObjects) &&
        (e.stopPropagation(),
        setSelectedId(object?.id),
        selectedId == object?.id && setSelectedId(null))
      }
    >
      {object?.displayObjects &&
        object?.displayObjects.map((displayObjects: any) => (
          <SpeckleGeometry
            key={displayObjects?.id}
            active={active}
            transparent={
              (!preSelectedObjects || !preselected) && preSelectedObjects
                ? true
                : false
            }
            // hovered={hovered}
            preselected={preselected}
            object={displayObjects}
            loader={loader}
          />
        ))}
    </group>
  );
}

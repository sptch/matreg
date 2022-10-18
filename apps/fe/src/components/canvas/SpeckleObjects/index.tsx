import { useBounds, useCursor } from '@react-three/drei';
import { useLoadObject } from '@speckle-viewer';
import { atoms } from 'common/recoli';
import { SpeckleObject } from 'components/canvas/SpeckleObject';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type ObjectsProps = {
  objectUrl: string;
};

export function SpeckleObjects({ objectUrl }: ObjectsProps) {
  let [objects, loader] = useLoadObject(objectUrl);
  objects = filterObjects(objects);

  return (
    <group position={[0, 0, 0]}>
      {objects.map((object: any) => (
        <SpeckleObject key={object.id} object={object} loader={loader} />
      ))}
    </group>
  );
}

// filter objects if property displayValue exists
function filterObjects(objects: any[]) {
  const speckle_objects = objects.filter((object) => object.displayValue);
  // for each speckle_object, attach object from objects to DisplayObjects proprty, which ids match in displayValue
  speckle_objects.forEach((object) => {
    object.displayObjects = objects.filter((obj) =>
      object.displayValue.some((value: any) => value.referencedId === obj.id)
    );
  });
  return speckle_objects;
}

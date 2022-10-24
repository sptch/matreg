import { useBounds, useCursor } from '@react-three/drei';
import { useLoadObject } from '@speckle-viewer';
import { atoms } from 'common/recoil';
import { SpeckleObject } from 'components/canvas/SpeckleObject';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchObjectsByName } from 'common';

type ObjectsProps = {
  objectUrl: string;
};

export function SpeckleObjects({ objectUrl }: ObjectsProps) {
  const search = useRecoilValue(atoms.searchString);
  const [selectedId, setSelectedId] = useRecoilState(atoms.selectedObjectId);
  const [selectedObject, setSelectedObject] = useRecoilState(
    atoms.selectedObject
  );
  const [preSelectedObjects, setPreSelectedObjects] = useRecoilState(
    atoms.preSelectedObjects
  );
  const [objects, loader] = useLoadObject(objectUrl);
  const [elements, setElements] = useState<any>();

  useEffect(() => {
    if (objects) {
      const elements = filterObjects(objects);
      setElements(elements);
    }
  }, [objects]);

  useEffect(() => {
    if (search === '') setPreSelectedObjects(null);
    else if (search) {
      // console.log(objects);
      const filterObjects = searchObjectsByName(elements, search);
      if (filterObjects) setPreSelectedObjects(filterObjects);
    }
  }, [elements, search, setPreSelectedObjects]);

  useEffect(() => {
    if (selectedId) {
      const selected = elements?.find((obj:any) => obj?.id === selectedId);
      if (selected) setSelectedObject(selected);
    } else setSelectedObject(null);
  }, [selectedId, setSelectedObject]);

  return (
    <group position={[0, 0, 0]}>
      {elements?.map((object: any) => (
        <SpeckleObject key={object.id} object={object} loader={loader} />
      ))}
    </group>
  );
}

// filter objects if property displayValue exists
function filterObjects(objects: any[]) {
  const speckle_objects = objects?.filter((object) => object.displayValue);
  // for each speckle_object, attach object from objects to DisplayObjects proprty, which ids match displayValue
  speckle_objects.forEach((object) => {
    object.displayObjects = objects.filter((obj) =>
      object.displayValue.some((value: any) => value.referencedId === obj.id)
    );
  });
  return speckle_objects;
}

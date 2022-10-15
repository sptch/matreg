import { useLoadObject } from '@speckle-viewer';
import { atoms } from 'common/recoli';
import { Object } from 'components/Object';
import { useRecoilState } from 'recoil';

type ObjectsProps = {
  objectUrl: string;
};

export function Objects({ objectUrl }: ObjectsProps) {
  const [objects, loader] = useLoadObject(objectUrl);
  const [selected, setSelected] = useRecoilState(atoms.selectedObjectId);
  console.log(selected);

  return (
    <group position={[0, 10, 0]}>
      {objects.map((object: any) => (
        <Object key={object.id} object={object} loader={loader} />
      ))}
    </group>
  );
}

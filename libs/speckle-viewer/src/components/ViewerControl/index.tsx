import { useEffect, useRef } from 'react';
import { Viewer } from '../../viewer';

const loadEntities = async (viewer: Viewer, objectUrl: string) => {
  await viewer.loadObject(objectUrl);
  for (const o of viewer.allObjects) {
    console.log(o);
  }
  let selfInflicted = false;
  let dontReact = false;

  console.log(viewer.interactions.selectObjects((v) => v.userData.id));

  viewer.on('objectSelected', (obj) => {
    if (dontReact) return;
    selfInflicted = true;
    console.log('selected', obj);
  });
};

type ViewerControlProps = {
  objectUrl: string;
};

export function ViewerControl(props: ViewerControlProps) {
  const viewer = useRef<Viewer | null>(null);
  let divRef: HTMLDivElement | null;
  console.log('ViewerControl render');
  useEffect(() => {
    if (divRef) {
      viewer.current = new Viewer({ container: divRef, showStats: false });
      loadEntities(viewer.current, props.objectUrl);
    }
  }, []);

  return (
    <div
      ref={(node) => {
        divRef = node;
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default ViewerControl;

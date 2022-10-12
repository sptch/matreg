import { useEffect, useRef } from 'react';
import { Viewer } from '../../viewer';

const loadEntities = async (viewer: Viewer) => {
  await viewer.loadObject(
    'https://speckle.xyz/streams/6c18eaf66a/objects/6460234e18f90d28d3f05056991bbeb6'
  );
  for (const o of viewer.allObjects) {
    // console.log(o);
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

export function ViewerControl() {
  const viewer = useRef<Viewer | null>(null);
  let divRef: HTMLDivElement | null;
  console.log('ViewerControl render');
  useEffect(() => {
    if (divRef) {
      viewer.current = new Viewer({ container: divRef, showStats: false });
      loadEntities(viewer.current);
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

import ObjectLoader from '../../objectLoader';
import { useEffect, useRef } from 'react';
import Converter from '../../viewer/modules/converter/Converter';
import { Viewer } from '../../viewer';

const loadEntities = async (viewer: Viewer) => {
  // await viewer.loadObject(
  //   'https://speckle.xyz/streams/6c18eaf66a/objects/6460234e18f90d28d3f05056991bbeb6'
  // );
  // for (const o of viewer.allObjects) {
  //   // console.log(o);
  // }
  // let selfInflicted = false;
  // let dontReact = false;

  // console.log(viewer.interactions.selectObjects((v) => v.userData.id));

  // viewer.on('objectSelected', (obj) => {
  //   if (dontReact) return;
  //   selfInflicted = true;
  //   console.log('selected', obj);
  // });
  console.log(
    Loader(
      'https://speckle.xyz/streams/6c18eaf66a/objects/6460234e18f90d28d3f05056991bbeb6'
    )
  );
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
    <>
      asdasd
      <div
        ref={(node) => {
          divRef = node;
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
}

function Loader(objectUrl: string) {
  const url = new URL(objectUrl);

  const segments = url.pathname.split('/');
  if (
    segments.length < 5 ||
    url.pathname.indexOf('streams') === -1 ||
    url.pathname.indexOf('objects') === -1
  ) {
    throw new Error('Unexpected object url format.');
  }

  const serverUrl = url.origin;
  const streamId = segments[2];
  const objectId = segments[4];

  const loader = new ObjectLoader({
    serverUrl: serverUrl,
    streamId: streamId,
    objectId: objectId,
    options: true,
  });
  const convertot = new Converter(loader);

  return { convertot };
}

export default ViewerControl;

import ObjectLoader from '@speckle/objectloader';
import { useEffect, useState } from 'react';
import Coverter from '../viewer/modules/converter/Converter';

export function useLoadObject(objectUrl: string) {
  const [objects, setObjects] = useState<any>();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (objectUrl) {
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
        serverUrl,
        streamId,
        objectId,
        options: { enableCaching: true },
      });
      const converter = new Coverter(loader);

      (async () => {
        let first = true;
        let current = 0;
        let total = 0;
        let viewerLoads = 0;
        let firstObjectPromise = null;
        setObjects(undefined);
        for await (const obj of loader.getObjectIterator()) {
          if (first) {
            firstObjectPromise = converter.traverseAndConvert(
              obj,
              async (objectWrapper: any) => {
                objectWrapper.meta._importedUrl = objectUrl;
                viewerLoads++;
              }
            );
            first = false;
            total = obj.totalChildrenCount;
          }
          setObjects((prev: any) => {
            if (prev) {
              return [...prev, obj];
            }
            return [obj];
          });
        }
      })();
      setLoader(loader);
    }
  }, [objectUrl]);

  return [objects ? objects : [], loader];
}

export default useLoadObject;

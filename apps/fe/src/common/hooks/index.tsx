import { useEffect, useState } from 'react';
import { Converter } from '@speckle-viewer';
import { BufferGeometry } from 'three';

export type Geometries = {
  bufferGeometry: BufferGeometry;
  extras?: any;
  geometryType: string;
  meta: any;
};

export function useConvertToBuffer(obj: any, loader?: any) {
  const [buffer, setBuffer] = useState<any>(null);
  const converter = new Converter(loader);

  useEffect(() => {
    if (obj) {
      const type = getSpeckleType(obj);
      const scale = 1;

      const convert = async () => {
        // @ts-ignore
        if (converter[`${type}ToBufferGeometry`]) {
          try {
            // @ts-ignore
            const object: Geometries = await converter[
              `${type}ToBufferGeometry`
            ](obj, scale);
            setBuffer(object);
          } catch (e) {
            // console.warn(`Failed to convert ${type} with id: ${l.id}`, e);
          }
        }
      };

      convert();
    }
  }, [obj]);
  return buffer ? buffer : null;
}

function getSpeckleType(obj: any) {
  let type = 'Base';
  if (obj?.data)
    type = obj?.data?.speckle_type
      ? obj?.data?.speckle_type.split('.').reverse()[0]
      : type;
  else
    type = obj?.speckle_type ? obj?.speckle_type.split('.').reverse()[0] : type;
  return type;
}

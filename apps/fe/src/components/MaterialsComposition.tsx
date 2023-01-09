import * as React from 'react';

import { ResponsiveTreeMap } from '@nivo/treemap';

const dummyData = {
  name: 'nivo',
  color: 'hsl(130, 70%, 50%)',
  children: [
    {
      name: 'Concrete',
      color: 'hsl(213, 70%, 50%)',
      loc: 183749,
    },
    {
      name: 'Steel',
      color: 'hsl(322, 70%, 50%)',
      loc: 76662,
    },
    {
      name: 'Plaster',
      color: 'hsl(65, 70%, 50%)',
      loc: 106363,
    },
    {
      name: 'layers',
      color: 'hsl(12, 70%, 50%)',
      loc: 13391,
    },
  ],
};

function formatLabel(e: any) {
  return e.id + ' (' + e.formattedValue + ')';
}

export function MaterialsComposition(props: any) {
  const [data, setData] = React.useState(dummyData);

  React.useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  return (
    <>
      <div className="px-2 py-3 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Materials
        </h3>
      </div>

      <div className="overflow-hidden rounded-lg p-2 bg-gray-400">
        <div className="flex rounded-lg" style={{ height: 200 }}>
          <ResponsiveTreeMap
            data={data}
            identity="name"
            value="loc"
            valueFormat=" >-.2s"
            tile="dice"
            leavesOnly={true}
            innerPadding={2}
            margin={{ top: 1, right: 1, bottom: 1, left: 1 }}
            labelSkipSize={15}
            colors={{ scheme: 'accent' }}
            labelTextColor={{
              from: 'color',
              modifiers: [['brighter', '2']] as any,
            }}
            label={formatLabel}
            orientLabel={false}
            enableParentLabel={false}
            parentLabelPosition="left"
            parentLabelTextColor={{
              from: 'color',
              modifiers: [['brighter', '2.2']] as any,
            }}
            nodeOpacity={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.1]],
            }}
          />
        </div>
      </div>
    </>
  );
}

export function MaterialsTreeMap(props: any) {
  const [data, setData] = React.useState(dummyData);

  React.useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  return (
    <>
      <div className="overflow-hidden rounded-lg p-2 bg-gray-400">
        <div className="flex rounded-lg" style={{ height: 400 }}>
          <ResponsiveTreeMap
            data={data}
            identity="name"
            value="loc"
            valueFormat=" >-.2s"
            tile="squarify"
            leavesOnly={true}
            innerPadding={6}
            margin={{ top: 1, right: 1, bottom: 1, left: 1 }}
            labelSkipSize={15}
            colors={{ scheme: 'accent' }}
            labelTextColor={{
              from: 'color',
              modifiers: [['brighter', '2']] as any,
            }}
            label={formatLabel}
            enableParentLabel={false}
            nodeOpacity={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.1]],
            }}
          />
        </div>
      </div>
    </>
  );
}

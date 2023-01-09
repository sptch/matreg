import * as React from 'react';

import { ResponsiveBar } from '@nivo/bar';

type CircularInfo = {
  name: string;
  value: number;
  color: string;
};

const circularLabels = ['% reused', '% recycled', '% reusable', '% recyclable'];

const circularColors = ['#F56565', '#ED8936', '#48BB78', '#4299E1'];

function formatDataforBarChart(data: number[]): CircularInfo[] {
  return data.map((d, i) => {
    return {
      name: circularLabels[i],
      value: d,
      color: circularColors[i],
    };
  });
}

function formatLabel(e: any) {
  return e.formattedValue + ' %';
}

type Props = {
  data: number[];
};

const defaultProps = {
  data: [50, 87, 14, 85],
};

export default function CircularityBarChart(props: Props = defaultProps) {
  const [data, setData] = React.useState(formatDataforBarChart(props.data));

  React.useEffect(() => {
    if (props.data) {
      setData(formatDataforBarChart(props.data));
    }
  }, [props.data]);

  return (
    <>
      <div className="px-2 py-3">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Circularity
        </h3>

        <div className="overflow-hidden rounded-lg p-2 bg-white">
          <div className="flex rounded-lg" style={{ height: 250 }}>
            <ResponsiveBar
              data={data}
              keys={['value']}
              indexBy="name"
              margin={{ top: 10, right: 20, bottom: 10, left: 80 }}
              padding={0.3}
              colors={{ scheme: 'nivo' }}
              layout="horizontal"
              borderRadius={20}
              colorBy="indexValue"
              enableGridY={false}
              axisBottom={null}
              axisLeft={{
                tickSize: 0,
                tickPadding: 10,
              }}
              label={formatLabel}
            />
          </div>
        </div>
      </div>
    </>
  );
}

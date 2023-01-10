import * as React from 'react';

import { ResponsiveBar } from '@nivo/bar';

type CircularInfo = {
  name: string;
  value: number;
  color: string;
};

const defaultProps = {
  data: [50, 87, 14, 85],
};

export interface barChartProps {
  data: number[];
}

function formatDataforBarChart(data: number[]): CircularInfo[] {
  const circularData = [
    {
      name: '% recyclable',
      value: data[3],
      color: '#43978F',
    },
    {
      name: '% reusable',
      value: data[2],
      color: '#43978F',
    },
    {
      name: '% recycled',
      value: data[1],
      color: '#F87171',
    },
    {
      name: '% reused',
      value: data[0],
      color: '#FDBA74',
    },
  ];

  return circularData;
}

function formatLabel(e: any) {
  return e.formattedValue + ' %';
}

export default function CircularityBarChart(
  props: barChartProps = defaultProps
) {
  const [data, setData] = React.useState(formatDataforBarChart(props.data));

  React.useEffect(() => {
    if (props.data) {
      setData(formatDataforBarChart(props.data));
    }
  }, [props.data]);

  return (
    <>
      <div className="px-2 py-2">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Circularity
        </h3>

        <div className="overflow-hidden rounded-lg">
          <div className="flex" style={{ height: 180 }}>
            <ResponsiveBar
              data={data}
              keys={['value']}
              indexBy="name"
              margin={{ top: 10, right: 20, bottom: 10, left: 80 }}
              padding={0.4}
              colors={(d) => d.data.color}
              layout="horizontal"
              borderRadius={15}
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

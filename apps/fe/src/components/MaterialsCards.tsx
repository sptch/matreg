import * as React from 'react';

type Stat = {
  name: string;
  stat: string;
  unit: string;
  bgColor: string;
  textColor: string;
};

const defaultStats: Stat[] = [
  {
    name: 'Embodied carbon',
    stat: '71,897',
    unit: 'kgCO2e',
    bgColor: 'bg-cyan-700',
    textColor: 'text-seaweed-green',
  },
  {
    name: 'Material mass',
    stat: '58.16',
    unit: '%',
    bgColor: 'bg-teal-700',
    textColor: 'text-seaweed-green',
  },
  {
    name: 'Build cost',
    stat: '24.57',
    unit: '%',
    bgColor: 'bg-orange-300',
    textColor: 'text-seaweed-green',
  },
  {
    name: 'Energy use intensity',
    stat: '24.57',
    unit: '%',
    bgColor: 'bg-red-200',
    textColor: 'text-seaweed-green',
  },
  {
    name: 'Other',
    stat: '24.57',
    unit: '%',
    bgColor: 'bg-gray-300',
    textColor: 'text-seaweed-green',
  },
  {
    name: 'Other',
    stat: '24.57',
    unit: '%',
    bgColor: 'bg-gray-300',
    textColor: 'text-seaweed-green',
  },
];

export interface MetricsProps {
  data?: Stat[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function BuildingMetrics(props: MetricsProps) {
  const [stats, setStats] = React.useState(() => [...defaultStats]);

  React.useEffect(() => {
    if (props.data) {
      setStats(props.data);
    }
  }, [props.data]);

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Building Metrics</h3>
      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className={classNames(
              item.bgColor,
              'overflow-hidden rounded-lg px-4 py-5 shadow sm:p-6 aspect-square'
            )}
          >
            <dt className="truncate text-sm font-medium text-white">
              {item.name}
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight">
              {item.stat}
            </dd>
            <dt className="truncate text-xs font-light text-white">
              {item.unit}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RadioBuildingMetrics(props: MetricsProps) {
  const [stats, setStats] = React.useState(() => [...defaultStats]);

  React.useEffect(() => {
    if (props.data) {
      setStats(props.data);
    }
  }, [props.data]);

  return (
    <div>
    <h3 className="text-lg font-medium leading-6 text-gray-900">
      Materials
    </h3>
    <dl className="overflow-x-auto whitespace-nowrap mt-5 grid grid-rows-1 grid-flow-col  gap-3 ">
      {stats.map((item) => (
        <div
          key={item.name}
          className={classNames(
            item.bgColor,
            'w-32 rounded-lg px-4 py-5 shadow sm:p-6 aspect-square'
          )}
        >
          <dt className="truncate text-sm font-medium text-white">
            {item.name}
          </dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight">
            {item.stat}
          </dd>
          <dt className="truncate text-xs font-light text-white">
            {item.unit}
          </dt>
        </div>
      ))}
    </dl>
  </div>
  );
}
import * as React from 'react';

import { RadioGroup } from '@headlessui/react';

import { InformationCircleIcon } from '@heroicons/react/24/outline';

export type Stat = {
  name: string;
  value: string;
  target: number;
  unit: string;
  bgColor: string;
  textColor: string;
};

const defaultStats: Stat[] = [
  {
    name: 'Embodied carbon',
    value: '71,897',
    target: 10000,
    unit: 'kgCO2e',
    bgColor: 'bg-cyan-700',
    textColor: 'text-gray-700',
  },
  {
    name: 'Material mass',
    value: '58.16',
    target: 80,
    unit: 'tonnes',
    bgColor: 'bg-teal-700',
    textColor: 'text-gray-700',
  },
  {
    name: 'Build cost',
    value: '24.57',
    target: 100,
    unit: '£/m²',
    bgColor: 'bg-orange-300',
    textColor: 'text-gray-700',
  },
  {
    name: 'Energy use intensity',
    value: '24.57',
    target: 100,
    unit: 'kWh/m²/yr',
    bgColor: 'bg-red-200',
    textColor: 'text-gray-700',
  },
  {
    name: 'Other',
    value: '24.57',
    target: 100,
    unit: '%',
    bgColor: 'bg-gray-300',
    textColor: 'text-gray-700',
  },
  {
    name: 'Other',
    value: '24.57',
    target: 100,
    unit: '%',
    bgColor: 'bg-gray-300',
    textColor: 'text-gray-700',
  },
];

export interface MetricsRadioGroupProps {
  data?: Stat[];
  callback?: (tab: Stat) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Card = (props: Stat) => {
  return (
    <div
      className={classNames(
        props.bgColor,
        props.textColor,
        'overflow-hidden rounded-lg px-3 py-4 shadow aspect-square hover:brightness-110'
      )}
    >
      <dt className="truncate text-sm font-medium text-white">{props.name}</dt>
      <dd className="mt-1 text-2xl font-semibold tracking-tight">
        {props.value}
      </dd>
      <dt className="truncate text-xs font-light text-white">{props.unit}</dt>
      <div className="flex items-start pt-2">
        <InformationCircleIcon className="h-5 w-5 text-white aria-hidden=true align-baseline m-1" />
        <div>
          <dt className="align-bottom text-s font-light text-white">
            {'<' + props.target}
          </dt>
          <dt className="truncate text-xs font-light text-white">
            {props.unit}
          </dt>
        </div>
      </div>
    </div>
  );
};

export function BuildingMetrics(props: MetricsRadioGroupProps) {
  const [stats, setStats] = React.useState(() => [...defaultStats]);
  const [selected, setSelected] = React.useState<Stat>();

  React.useEffect(() => {
    if (props.data) {
      setStats(props.data);
    }
  }, [props.data]);

  React.useEffect(() => {
    if (selected) {
      if (props.callback) {
        props.callback(selected);
      }
    }
  }, [selected, props]);

  return (
    <div>
      <div className="py-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Building Metrics
        </h3>
        <RadioGroup value={selected} onChange={setSelected} className="mt-2">
          <RadioGroup.Label className="sr-only"></RadioGroup.Label>
          <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 ">
            {stats.map((item) => (
              <RadioGroup.Option
                key={item.name}
                value={item}
                className={({ active, checked }) =>
                  classNames(
                    active ? 'shadow' : 'brightness-90',
                    checked ? ' shadow' : 'shadow-sm hover:shadow-md',
                    'w-[9rem] '
                  )
                }
              >
                <RadioGroup.Label as="span">
                  <Card {...item} />
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </dl>
        </RadioGroup>
      </div>
    </div>
  );
}

export function RadioBuildingMetrics(props: MetricsRadioGroupProps) {
  const [stats, setStats] = React.useState(() => [...defaultStats]);
  const [selected, setSelected] = React.useState<Stat>(stats[0]);

  React.useEffect(() => {
    if (props.data) {
      setStats(props.data);
    }
  }, [props.data]);

  React.useEffect(() => {
    if (props.callback) {
      props.callback(selected);
    }
  }, [selected, props]);

  return (
    <div className="py-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Materials</h3>
      <RadioGroup value={selected} onChange={setSelected} className="mt-2">
        <RadioGroup.Label className="sr-only"></RadioGroup.Label>
        <dl className="overflow-x-auto whitespace-nowrap grid grid-rows-1 grid-flow-col gap-3 ">
          {stats.map((item) => (
            <RadioGroup.Option
              key={item.name}
              value={item}
              className={({ active, checked }) =>
                classNames(
                  active ? 'shadow' : 'brightness-90',
                  checked ? ' shadow' : 'shadow-sm hover:shadow-md',
                  'w-[9rem] '
                )
              }
            >
              <RadioGroup.Label as="span">
                <Card {...item} />
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </dl>
      </RadioGroup>
    </div>
  );
}

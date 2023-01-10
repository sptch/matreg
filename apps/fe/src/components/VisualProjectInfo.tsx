import * as React from 'react';

import {
  ClockIcon,
  BuildingOfficeIcon,
  Bars4Icon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

type Stat = {
  id: number;
  name: string;
  stat: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const defaultStats: Stat[] = [
  { id: 1, name: 'Total FGA', stat: '1,800', icon: Square3Stack3DIcon },
  { id: 2, name: 'Floors', stat: '14', icon: Bars4Icon },
  { id: 3, name: 'Main use', stat: 'Residential', icon: BuildingOfficeIcon },
  { id: 3, name: 'Completion', stat: '01.01.2022', icon: ClockIcon },
];

export interface VisualProjectInfoProps {
  data?: Stat[];
}

export default function VisualProjectInfo(props: VisualProjectInfoProps) {
  const { data } = props;
  const stats = defaultStats;
  // Make this element more interactive when we have an idea of what the data will look like
  return (
    <div>
      <dl className="mt-5 grid grid-rows-1 grid-flow-col gap-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-gray-100 px-1 pt-1 pb-1 shadow sm:px-1 sm:pt-1"
          >
            <dt>
              <div className="top-0 rounded-md p-2">
                <item.icon className="h-6 w-6 text-black" aria-hidden="true" />
              </div>
              <p className="mt-1 ml-1 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-1 flex items-baseline pb-2">
              <p className="text-sm font-semibold text-gray-900">{item.stat}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

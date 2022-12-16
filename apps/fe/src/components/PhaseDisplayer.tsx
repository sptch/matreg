import * as React from 'react';

import {
  ClockIcon,
  BuildingOfficeIcon,
  Bars4Icon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

type Phase = {
  name: string;
  status: 'complete' | 'current' | 'upcoming';
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const phaseSteps: Phase[] = [
  { name: 'Concept', status: 'complete', id: 1, icon: ClockIcon },
  { name: 'Planning', status: 'complete', id: 2, icon: Square3Stack3DIcon },
  { name: 'Design', status: 'current', id: 3, icon: Bars4Icon },
  { name: 'Construction', status: 'upcoming', id: 4, icon: Square3Stack3DIcon },
  { name: 'Use', status: 'upcoming', id: 5, icon: BuildingOfficeIcon },
  { name: 'EoL', status: 'upcoming', id: 6, icon: Square3Stack3DIcon },
];

export interface PhaseDisplayerProps {
  stage: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function PhaseDisplayer(props: PhaseDisplayerProps) {
  const { stage } = props;

  return (
    <div className="p-1 py-3">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Phase</h3>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="flex items-center bg-gray-100 p-5 rounded-lg"
        >
          {phaseSteps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== phaseSteps.length - 1 ? 'pr-8' : '',
                'relative'
              )}
            >
              {step.id < stage ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-4 mt-9 w-full bg-gray-600 rounded-l-lg" />
                  </div>
                  <div className="top-0 mb-3">
                    <step.icon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    href="#"
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 hover:bg-indigo-900"
                  >
                    <span className="mt-12 text-sm">{step.name}</span>
                  </a>
                </>
              ) : step.id === stage ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-4 mt-9 w-full bg-gray-200" />
                  </div>
                  <div className="top-0 mb-3">
                    <step.icon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    href="#"
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-600 bg-white"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-gray-600"
                      aria-hidden="true"
                    />
                    <span className="mt-12 text-sm">{step.name}</span>
                  </a>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-4 mt-9 w-full bg-gray-200" />
                  </div>
                  <div className="top-0 mb-3">
                    <step.icon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    href="#"
                    className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="mt-12 text-sm">{step.name}</span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

import * as React from 'react';

import { RadioGroup } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export type Tab = {
  name: string;
  id: number;
};

export interface MenuSelectorProps {
  tabs: Tab[];
  callback: (tab: Tab) => void;
}

export default function MenuSelector(props: MenuSelectorProps) {
  const [tabs, setTabs] = React.useState(props.tabs); // [ { name: 'Overview', id: 1 }, { name: 'Impact', id: 2 }, { name: 'Performance', id: 3 }
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);

  React.useEffect(() => {
    props.callback(selectedTab);
  }, [selectedTab, props]);

  React.useEffect(() => {
    if (props.tabs.length > 0) {
      setTabs(props.tabs);
      setSelectedTab(props.tabs[0]);
    }
  }, [props.tabs]);

  return (
    <div className="border-b border-gray-200 bg-gray-700 rounded-2xl rounded-b-3xl">
      <div className="sm:px-6 py-5 -ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <h3 className="px-3 py-3 text-lg font-medium leading-6 text-white">
          Building A
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-white">
          Details about the building
        </p>
      </div>
      <RadioGroup
        value={selectedTab}
        onChange={setSelectedTab}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only"></RadioGroup.Label>
        <div className="grid grid-cols-4 gap-3 bg-gray-500 rounded-full">
          {tabs.map((tab) => (
            <RadioGroup.Option
              key={tab.name}
              value={tab}
              className={({ checked }) =>
                classNames(
                  checked
                    ? 'bg-gray-400 border-transparent text-white hover:bg-gray-300'
                    : 'bg-gray-500 border-gray-500 text-gray-900 hover:bg-gray-300',
                  'space-x-4 bg-gray-500 rounded-full border py-3 px-3 flex items-center justify-center text-sm font-sm sm:flex-1'
                )
              }
            >
              <RadioGroup.Label as="span">{tab.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

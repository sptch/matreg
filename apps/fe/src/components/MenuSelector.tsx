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
  const [tabs, setTabs] = React.useState(props.tabs);
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
    <div className="">
      <RadioGroup
        value={selectedTab}
        onChange={setSelectedTab}
        className="w-full"
      >
        <RadioGroup.Label className="sr-only"></RadioGroup.Label>
        <div className="grid grid-cols-4 gap-1 bg-gray-500 rounded-full">
          {tabs.map((tab) => (
            <RadioGroup.Option
              key={tab.name}
              value={tab}
              className={({ checked }) =>
                classNames(
                  checked
                    ? 'bg-gray-400 border-transparent text-white hover:bg-gray-300'
                    : 'bg-gray-500 border-gray-500 text-gray-900 hover:bg-gray-300',
                  'space-x-4 rounded-full border py-3 px-3 flex items-center justify-center text-sm font-sm sm:flex-1'
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

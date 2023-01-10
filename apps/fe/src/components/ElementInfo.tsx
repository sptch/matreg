import * as React from 'react';

type ElementInfo = {
  general: { key: string; value: string }[];
  properties: { key: string; value: string }[];
};

const defaultElementInfo: ElementInfo = {
  general: [
    {
      key: 'Address',
      value: 'Building A Singleton Park, Sketty, Swansea SA2 8PP',
    },
    { key: 'Project', value: 'Swansea X' },
    { key: 'Element ID', value: '123' },
    { key: 'Element Name', value: 'Element Name' },
  ],
  properties: [
    {
      key: 'Address',
      value: 'Building A Singleton Park, Sketty, Swansea SA2 8PP',
    },
  ],
};

export interface ElementInfoListProps {
  data?: ElementInfo;
}

export default function ElementInfoList(props: ElementInfoListProps) {
  const [elementInfo, setElementInfo] =
    React.useState<ElementInfo>(defaultElementInfo);

  React.useEffect(() => {
    if (props.data) {
      setElementInfo(props.data);
    }
  }, [props.data]);

  return (
    <div className="overflow-hidden bg-white sm:rounded-lg">
      <div className="px-2 py-3 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">General</h3>
      </div>
      <div>
        {elementInfo.general.map((item) => (
          <dl className="px-2 pb-3" key={item.key}>
            <div className=" py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{item.key}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {item.value}
              </dd>
            </div>
          </dl>
        ))}
      </div>
      <div className="px-2 py-3 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Properties
        </h3>
      </div>
      <div>
        {elementInfo.properties.map((item) => (
          <dl className="px-2 pb-3" key={item.key}>
            <div className=" py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{item.key}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {item.value}
              </dd>
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
}

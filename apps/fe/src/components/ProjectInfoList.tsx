import * as React from 'react';

type ProjectInfo = {
  name: string;
  address: string;
  project: string;
};

const defaultProjectInfo: ProjectInfo = {
  name: 'Project Name',
  address: 'Building A Singleton Park, Sketty, Swansea SA2 8PP',
  project: 'Swansea X',
};

export interface ProjectInfoListProps {
  data?: ProjectInfo;
}

export function ProjectInfoList(props: ProjectInfoListProps) {
  const { data } = props;
  const projectInfo = defaultProjectInfo;

  return (
    <div className="overflow-hidden bg-white sm:rounded-lg">
      <div className="px-2 py-3 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">General</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">subtext</p>
      </div>
      <div>
        <dl className="px-2 pb-3">
          <div className=" py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {projectInfo.address}
            </dd>
          </div>
          <div className="bg-white py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Project</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {projectInfo.project}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

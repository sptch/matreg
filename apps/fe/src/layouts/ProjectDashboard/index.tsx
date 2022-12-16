import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import Viewer from 'containers/Viewer';
import ViewerPreview from 'containers/ViewerPreview';
import { useRecoilState } from 'recoil';
import { atoms } from 'common/recoil';
import { BuildingElementData, H1 } from 'containers/BuildingElementData';
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import { SpeckleObject } from 'containers/Viewer';
import { PrimaryButton, Card } from '@ui';
import {
  ClockIcon,
  BuildingOfficeIcon,
  Bars4Icon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import 'tailwindcss/tailwind.css';

import { RadioGroup } from '@headlessui/react';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
`;

// viewer vindow top right corner panel
const Panel = styled.div`
    position: relative;
    display: flex;
    width: 480px;
    // margin for last child div
    flex-direction: column;
    border: 3px solid #ffffff;
    border-radius: 20px;
    background-color: white;
    z-index: 100;
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.1));
  `,
  SidePanel = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;

    top: 16px;
    right: 16px;
    gap: 16px;
    width: 480px;
    z-index: 100;
  `,
  PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 10px;
  `,
  PanelTitle = styled.h3`
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  `,
  PanelContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  `,
  CloseButton = styled.button`
    all: unset;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  `,
  SearchBar = styled.input`
    all: unset;
    width: 100%;
    border-radius: 20px;
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    ::placeholder {
      color: #9ca3af;
    }
  `;

export type ProjectProps = {
  name: string;
  description: string;
  id: string;
  buildings: Building[];
};

export type Building = {
  name: string;
  description: string;
  id: string;
  speckleObjects: SpeckleObject[];
};

const stats = [
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

const phaseSteps = [
  { name: 'Concept', status: 'complete', icon: ClockIcon },
  { name: 'Planning', status: 'complete', icon: Square3Stack3DIcon },
  { name: 'Design', status: 'current', icon: Bars4Icon },
  { name: 'Construction', status: 'upcoming', icon: Square3Stack3DIcon },
  { name: 'Use', status: 'upcoming', icon: BuildingOfficeIcon },
  { name: 'EoL', status: 'upcoming', icon: Square3Stack3DIcon },
];

const tabs = [
  { name: 'Overview', href: '#', id: 1 },
  { name: 'Impact', href: '#', id: 2 },
  { name: 'Performance', href: '#', id: 3 },
];

const stats2 = [
  { id: 1, name: 'Total FGA', stat: '1,800', icon: Square3Stack3DIcon },
  { id: 2, name: 'Floors', stat: '14', icon: Bars4Icon },
  { id: 3, name: 'Main use', stat: 'Residential', icon: BuildingOfficeIcon },
  { id: 3, name: 'Completion', stat: '01.01.2022', icon: ClockIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectDashboard(props: ProjectProps) {
  const [selected, setSelected] = useRecoilState(atoms.selectedObjectId);
  const [selectedObject, setSelectedObject] = useRecoilState(
    atoms.selectedObject
  );
  const [hovered, setHovered] = useRecoilState(atoms.hoveredObjectId);
  const [search, setSearch] = useRecoilState(atoms.searchString);
  const [preSelectedObjects, setPreSelectedObjects] = useRecoilState(
    atoms.preSelectedObjects
  );

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <Wrapper>
      <SidePanel>
        <Panel>
          <PanelContent>
            <SearchBar
              placeholder="Search by Component Name or Unique ID"
              onChange={(e) => (setSearch(e.target.value), setSelected(null))}
            />
          </PanelContent>
        </Panel>
        {preSelectedObjects &&
          !selected &&
          preSelectedObjects.map((obj) => (
            <Panel
              key={obj?.id}
              onPointerEnter={() => setHovered(obj?.id)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => setSelected(obj?.id)}
            >
              <H1>{obj?.family}</H1>
            </Panel>
          ))}
        {selected && (
          <>
            <Panel>
              <PanelHeader>
                <H1>{selectedObject?.family}</H1>
                <CloseButton onClick={() => setSelected(null)}>
                  <CloseIcon />
                </CloseButton>
              </PanelHeader>
              <ViewerPreview />
            </Panel>
            <Panel>
              <PanelContent>
                <BuildingElementData />
                <PrimaryButton />
                <Card />
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
                          className={({ active, checked }) =>
                            classNames(
                              active
                                ? 'ring-2 ring-offset-1 ring-gray-900'
                                : '',
                              checked
                                ? 'bg-gray-400 border-transparent text-white hover:bg-gray-200'
                                : 'bg-gray-500 border-gray-500 text-gray-900 hover:bg-gray-300',
                              'space-x-4 bg-gray-400 rounded-full border py-3 px-3 flex items-center justify-center text-sm font-sm sm:flex-1'
                            )
                          }
                        >
                          <RadioGroup.Label as="span">
                            {tab.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {selectedTab.id === 1 && (
                  <>
                    <div className="overflow-hidden bg-white sm:rounded-lg">
                      <div className="px-2 py-3 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          General
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          subtext
                        </p>
                      </div>
                      <div>
                        <dl className="px-2 pb-3">
                          <div className=" py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              Building A Singleton Park, Sketty, Swansea SA2 8PP
                            </dd>
                          </div>
                          <div className="bg-white py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Project
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              Swansea X
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div>
                      <dl className="mt-5 grid grid-rows-1 grid-flow-col gap-2">
                        {stats2.map((item) => (
                          <div
                            key={item.id}
                            className="relative overflow-hidden rounded-lg bg-gray-50 px-1 pt-1 pb-1 shadow sm:px-1 sm:pt-1"
                          >
                            <dt>
                              <div className="top-0 rounded-md p-2">
                                <item.icon
                                  className="h-6 w-6 text-black"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="mt-1 ml-1 truncate text-sm font-medium text-gray-500">
                                {item.name}
                              </p>
                            </dt>
                            <dd className="ml-1 flex items-baseline pb-2">
                              <p className="text-sm font-semibold text-gray-900">
                                {item.stat}
                              </p>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="p-1 py-3">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Phase
                      </h3>
                      <nav aria-label="Progress">
                        <ol
                          role="list"
                          className="flex items-center bg-gray-100 p-5 rounded-lg"
                        >
                          {phaseSteps.map((step, stepIdx) => (
                            <li
                              key={step.name}
                              className={classNames(
                                stepIdx !== step.length - 1 ? 'pr-8' : '',
                                'relative'
                              )}
                            >
                              {step.status === 'complete' ? (
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
                                    <span className="mt-12 text-sm">
                                      {step.name}
                                    </span>
                                  </a>
                                </>
                              ) : step.status === 'current' ? (
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
                                    <span className="mt-12 text-sm">
                                      {step.name}
                                    </span>
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
                                    <span className="mt-12 text-sm">
                                      {step.name}
                                    </span>
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                        </ol>
                      </nav>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Materials
                      </h3>
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
                  </>
                )}

                {selectedTab.id === 2 && (
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
                )}
              </PanelContent>
            </Panel>
          </>
        )}
      </SidePanel>

      <Viewer
        speckleObjects={props.buildings.flatMap((b) => b.speckleObjects)}
      />
    </Wrapper>
  );
}

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

import 'tailwindcss/tailwind.css';

import { RadioGroup } from '@headlessui/react';

import Table from 'components/Table';
import {
  BuildingMetrics,
  RadioBuildingMetrics,
} from 'components/MaterialsCards';
import { PhaseDisplayer } from 'components/PhaseDisplayer';
import VisualProjectInfo from 'components/VisualProjectInfo';
import { ProjectInfoList } from 'components/ProjectInfoList';

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

const tabs = [
  { name: 'Overview', href: '#', id: 1 },
  { name: 'Impact', href: '#', id: 2 },
  { name: 'Performance', href: '#', id: 3 },
];

function classNames(...classes: string[]) {
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
                                ? 'bg-gray-400 border-transparent text-white hover:bg-gray-300'
                                : 'bg-gray-500 border-gray-500 text-gray-900 hover:bg-gray-300',
                              'space-x-4 bg-gray-500 rounded-full border py-3 px-3 flex items-center justify-center text-sm font-sm sm:flex-1'
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
                    <ProjectInfoList />
                    <VisualProjectInfo />
                    <PhaseDisplayer stage={4} />
                    <BuildingMetrics />
                  </>
                )}

                {selectedTab.id === 2 && (
                  <>
                    <RadioBuildingMetrics />
                  </>
                )}

                {selectedTab.id === 3 && (
                  <div>
                    <Table />
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

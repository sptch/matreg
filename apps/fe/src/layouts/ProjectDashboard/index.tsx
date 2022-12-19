import React, { useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';

import Viewer from 'containers/Viewer';
import ViewerPreview from 'containers/ViewerPreview';
import { useRecoilState } from 'recoil';
import { atoms } from 'common/recoil';
import { BuildingElementData, H1 } from 'containers/BuildingElementData';
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import { SpeckleObject } from 'containers/Viewer';

/* components */
import {
  BuildingMetrics,
  RadioBuildingMetrics,
} from 'components/MaterialsCards';
import MenuSelector from 'components/MenuSelector';
import { PhaseDisplayer } from 'components/PhaseDisplayer';
import { ProjectInfoList } from 'components/ProjectInfoList';
import VisualProjectInfo from 'components/VisualProjectInfo';
import ElementInfoList from 'components/ElementInfo';
import BuildingTable from 'components/Tables/BuidingTable';
import EnvironmentalImpactTable from 'components/Tables/EnvironmentalImpactTable';

/* types */
import type { Tab } from 'components/MenuSelector';

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
  PanelContent = styled.div`
    display: flex;
    flex-direction: column;
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

const ProjectTabs: Tab[] = [
  { name: 'Overview', id: 1 },
  { name: 'Impact', id: 2 },
  { name: 'Performance', id: 3 },
];

const selectedElementTabs: Tab[] = [
  { name: 'Overview', id: 1 },
  { name: 'Metrics', id: 2 },
  { name: 'Financial', id: 3 },
  { name: 'Log', id: 4 },
];

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
  const [menuTabs, setMenuTabs] = useState(ProjectTabs);
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  React.useEffect(() => {
    if (selected) {
      setMenuTabs(selectedElementTabs);
      setSelectedTab(selectedElementTabs[0]);
    } else {
      setMenuTabs(ProjectTabs);
      setSelectedTab(ProjectTabs[0]);
    }
  }, [selected]);

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

        {!selected && (
          <Panel>
            <PanelContent>
              <MenuSelector tabs={menuTabs} callback={setSelectedTab} />
              <>
                {selectedTab.id === 1 && (
                  <>
                    <ProjectInfoList />
                    <VisualProjectInfo />
                    <PhaseDisplayer stage={4} />
                    <BuildingMetrics />
                  </>
                )}
                {selectedTab.id === 2 && <RadioBuildingMetrics />}
                {selectedTab.id === 3 && <BuildingTable />}
              </>
            </PanelContent>
          </Panel>
        )}
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
              <PanelContent>
                <MenuSelector tabs={menuTabs} callback={setSelectedTab} />
                {selectedTab.id === 1 && <ElementInfoList />}
                {selectedTab.id === 2 && <EnvironmentalImpactTable />}
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

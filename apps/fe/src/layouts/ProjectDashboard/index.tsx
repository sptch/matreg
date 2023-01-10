import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

import Viewer from 'containers/Viewer';
import ViewerPreview from 'containers/ViewerPreview';
import { useRecoilState } from 'recoil';
import { atoms } from 'common/recoil';
import { SpeckleObject } from 'containers/Viewer';

/* types */
import type { Tab } from 'components/MenuSelector';
import type { Stat } from 'components/MaterialsCards';

/* components */
import {
  BuildingMetrics,
  RadioBuildingMetrics,
} from 'components/MaterialsCards';
import {
  MaterialsComposition,
  MaterialsTreeMap,
} from 'components/MaterialsComposition';
import Header from 'components/Header';
import LogPage from 'components/LogPage';
import MenuSelector from 'components/MenuSelector';
import ElementInfoList from 'components/ElementInfo';
import { XMarkIcon } from '@heroicons/react/24/solid';
import BuildingTable from 'components/Tables/BuidingTable';
import { PhaseDisplayer } from 'components/PhaseDisplayer';
import { ProjectInfoList } from 'components/ProjectInfoList';
import VisualProjectInfo from 'components/VisualProjectInfo';
import EnvironmentalImpactTable from 'components/Tables/EnvironmentalImpactTable';
import CircularityBarChart from 'components/CircularityBarChart';
import FinancialProjection from 'components/FinancialProjection';

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
  { name: 'Inventory', id: 3 },
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
  const [selectedBuildingMetric, setSelectedBuildingMetric] =
    React.useState<Stat>();

  React.useEffect(() => {
    if (selected) {
      setMenuTabs(selectedElementTabs);
      setSelectedTab(selectedElementTabs[0]);
    } else {
      setMenuTabs(ProjectTabs);
      setSelectedTab(ProjectTabs[0]);
    }
  }, [selected]);

  function selectBuildingMetric(metric: Stat) {
    if (metric) {
      setSelectedBuildingMetric(metric);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-y-auto">
      <div
        id="SearchBar"
        className="absolute top-2 left-2 z-10 w-80 bg-gray-100 rounded-2xl "
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search by Component Name or Unique ID"
          onChange={(e) => (setSearch(e.target.value), setSelected(null))}
          className="flex drop-shadow-sm w-full border-2 border-gray-300 bg-white h-10 px-5 rounded-full text-sm shadow-lg"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <button
            className="inline-flex items-top pt-1 rounded-full "
            onClick={() => setSearch('')}
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-col items-left px-2 overflow-auto">
          {preSelectedObjects &&
            !selected &&
            preSelectedObjects.map((obj) => (
              <div
                key={obj?.id}
                onPointerEnter={() => setHovered(obj?.id)}
                onPointerLeave={() => setHovered(null)}
                onClick={() => setSelected(obj?.id)}
                className="flex rounded-full hover:bg-gray-200 text-sm font-medium p-2"
              >
                <div>{obj?.family}</div>
              </div>
            ))}
        </div>
      </div>

      <div className=" absolute right-1 top-2 w-[480px] z-10 ">
        <div className="bg-white rounded-lg pb-1 shadow-xl">
          <Header title={props.name} details={props.description} />

          {selected && (
            <>
              <div className=" items-center justify-between ">
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 "
                  onClick={() => setSelected(null)}
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <ViewerPreview />
            </>
          )}

          <MenuSelector tabs={menuTabs} callback={setSelectedTab} />
          <div className="m-3">
            {!selected && (
              <>
                {selectedTab.name === 'Overview' && (
                  <>
                    <ProjectInfoList />
                    <VisualProjectInfo />
                    <PhaseDisplayer stage={4} />
                    <BuildingMetrics callback={selectBuildingMetric} />
                  </>
                )}
                {selectedTab.name === 'Impact' && (
                  <>
                    <RadioBuildingMetrics />
                    <MaterialsTreeMap />
                  </>
                )}
                {selectedTab.name === 'Inventory' && <BuildingTable />}
              </>
            )}

            {selected && (
              <>
                {selectedTab.name === 'Overview' && (
                  <>
                    <ElementInfoList />
                    <MaterialsComposition />
                  </>
                )}
                {selectedTab.name === 'Metrics' && (
                  <>
                    <CircularityBarChart data={[20, 18, 80, 90]} />
                    <EnvironmentalImpactTable />
                  </>
                )}
                {selectedTab.name === 'Financial' && (
                  <>
                    <FinancialProjection />
                  </>
                )}
                {selectedTab.name === 'Log' && <LogPage />}
              </>
            )}
          </div>
        </div>
      </div>

      <Viewer
        speckleObjects={props.buildings.flatMap((b) => b.speckleObjects)}
      />
    </div>
  );
}

import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Component = {
  identifier: number;
  component: string;
  location: string;
  mass: number;
  link: string;
};

export interface BuildingTableProps {
  data?: Component[];
}

const defaultBuildingData: Component[] = [
  {
    identifier: 12465,
    component: 'linsley',
    location: 'X',
    mass: 100,
    link: 'Link',
  },
  {
    identifier: 54654,
    component: 'miller',
    location: 'X',
    mass: 40,
    link: 'Link',
  },
  {
    identifier: 456465,
    component: 'dirte',
    location: 'X',
    mass: 20,
    link: 'Link',
  },
];

const buildingColumnHelper = createColumnHelper<Component>();

const columns = [
  buildingColumnHelper.accessor('identifier', {
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
  }),
  buildingColumnHelper.accessor((row) => row.component, {
    id: 'component',
    cell: (info) => info.getValue(),
    header: () => <span>COMPONENT</span>,
  }),
  buildingColumnHelper.accessor('location', {
    cell: (info) => info.getValue(),
    header: () => <span>LOCATION</span>,
  }),
  buildingColumnHelper.accessor('mass', {
    header: () => <span>kgCO₂e</span>,
  }),
  buildingColumnHelper.accessor((row) => row.link, {
    id: 'link',
    cell: (info) => info.getValue(),
    header: () => <span>Link</span>,
  }),
];

export function BuildingTable(props: BuildingTableProps) {
  const [data, setData] = React.useState(() => [...defaultBuildingData]);

  React.useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 w-full">
      <table className="rounded-lg text-left ">
        <thead className="text-sm bg-gray-200 text-gray-700 p-2 rounded-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="p-2 rounded-full" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-2" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-gray-50 text-gray-300 ">
          {table.getRowModel().rows.map((row) => (
            <tr
              className="rounded-lg hover:bg-gray-400 hover:text-gray-700"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type EnvironmentalImpact = {
  category: string;
  Scope: string;
  Unit: string;
  Value: number;
  Link: string;
};

export interface EnvironmentalImpactTableProps {
  data?: EnvironmentalImpact[];
}

const defaultEnvironmentalImpactData: EnvironmentalImpact[] = [
  {
    category: 'Energy',
    Scope: 'Scope 1',
    Unit: 'kgCO₂e',
    Value: 100,
    Link: 'Link',
  },
  {
    category: 'Energy',
    Scope: 'Scope 2',
    Unit: 'kgCO₂e',
    Value: 40,
    Link: 'Link',
  },
];

const environmentalImpactColumnHelper =
  createColumnHelper<EnvironmentalImpact>();

const environmentalImpactColumns = [
  environmentalImpactColumnHelper.accessor('category', {
    cell: (info) => info.getValue(),
    header: () => <span>Category</span>,
  }),
  environmentalImpactColumnHelper.accessor('Scope', {
    cell: (info) => info.getValue(),
    header: () => <span>Scope</span>,
  }),
  environmentalImpactColumnHelper.accessor('Unit', {
    cell: (info) => info.getValue(),
    header: () => <span>Unit</span>,
  }),
  environmentalImpactColumnHelper.accessor('Value', {
    cell: (info) => info.getValue(),
    header: () => <span>Value</span>,
  }),
  environmentalImpactColumnHelper.accessor('Link', {
    cell: (info) => info.getValue(),
    header: () => <span>Source</span>,
  }),
];

export function EnvironmentalImpactTable(props: EnvironmentalImpactTableProps) {
  const [data, setData] = React.useState(() => [
    ...defaultEnvironmentalImpactData,
  ]);

  React.useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  const table = useReactTable({
    data,
    columns: environmentalImpactColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 w-full">
      <table className="rounded-lg text-left ">
        <thead className="text-sm bg-gray-200 text-gray-700 p-2 rounded-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="p-2 rounded-full" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-2" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-gray-50 text-gray-300 ">
          {table.getRowModel().rows.map((row) => (
            <tr
              className="rounded-lg hover:bg-gray-400 hover:text-gray-700"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

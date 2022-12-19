import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

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

const defaultData: EnvironmentalImpact[] = [
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

const columnHelper =
  createColumnHelper<EnvironmentalImpact>();

const environmentalImpactColumns = [
  columnHelper.accessor('category', {
    cell: (info) => info.getValue(),
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor('Scope', {
    cell: (info) => info.getValue(),
    header: () => <span>Scope</span>,
  }),
  columnHelper.accessor('Unit', {
    cell: (info) => info.getValue(),
    header: () => <span>Unit</span>,
  }),
  columnHelper.accessor('Value', {
    cell: (info) => info.getValue(),
    header: () => <span>Value</span>,
  }),
  columnHelper.accessor('Link', {
    cell: (info) => info.getValue(),
    header: () => <span>Source</span>,
  }),
];

function EnvironmentalImpactTable(props: EnvironmentalImpactTableProps) {
  const [data, setData] = React.useState(() => [...defaultData]);

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

export default EnvironmentalImpactTable;

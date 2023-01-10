import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export interface LogTableProps {
  data?: Log[];
}

type Log = {
  entryID: number;
  description: string;
  user: string;
  date: string;
  link: string;
};

const defaultData: Log[] = [
  {
    entryID: 12465,
    description: 'linsley',
    user: 'X',
    date: '100',
    link: 'Link',
  },
  {
    entryID: 54654,
    description: 'miller',
    user: 'X',
    date: '40',
    link: 'Link',
  },
  {
    entryID: 456465,
    description: 'dirte',
    user: 'X',
    date: '20',
    link: 'Link',
  },
];

const columnHelper = createColumnHelper<Log>();

const LogColumns = [
  columnHelper.accessor('entryID', {
    cell: (info) => info.getValue(),
    header: () => <span>Entry ID</span>,
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
  }),
  columnHelper.accessor('user', {
    cell: (info) => info.getValue(),
    header: () => <span>User</span>,
  }),
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
    header: () => <span>Date</span>,
  }),
  columnHelper.accessor('link', {
    cell: (info) => info.getValue(),
    header: () => <span>Link</span>,
  }),
];

export default function LogTable(props: LogTableProps) {
  const { data = defaultData } = props;

  const table = useReactTable({
    data,
    columns: LogColumns,
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

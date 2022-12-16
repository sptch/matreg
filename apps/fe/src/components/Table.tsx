import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export interface TableProps {
  data?: Person[];
}

type Person = {
  identifier: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
};

const defaultData: Person[] = [
  {
    identifier: 'AX45215',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    progress: 50,
  },
  {
    identifier: 'AX45215',
    lastName: 'miller',
    age: 40,
    visits: 40,
    progress: 80,
  },
  {
    identifier: 'AX45215',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('identifier', {
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>COMPONENT</span>,
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.renderValue(),
    header: () => <span>LOCATION</span>,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>kgCO₂e</span>,
  }),
  columnHelper.accessor('progress', {
    header: 'Link',
  }),
];

function Table(props: TableProps) {
  const [data, setData] = React.useState(() => [...defaultData]);

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

export default Table;

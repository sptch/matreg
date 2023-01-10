import LogTable from './Tables/LogTable';

export default function LogPage() {
  return (
    <>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Component Log
      </h3>

      <LogTable />
    </>
  );
}

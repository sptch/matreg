export interface PanelHeaderProps {
  title: string;
  details: string;
}

function PanelHeader(props: PanelHeaderProps) {
  return (
    <div className="w-full bg-gray-700 rounded-2xl flex-col items-center flex-wrap text-white justify-items-start">
      <h3 className="px-3 py-2 text-lg font-medium">{props.title}</h3>
      <p className="px-3 py-2 text-sm">{props.details}</p>
    </div>
  );
}

export default PanelHeader;

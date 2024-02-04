import {FiPlus} from "react-icons/fi";

export type SectionTitleProps = {
  title: string;
  subtitle: string;
  buttonName?: string;
  handleEvent?: () => void;
};
const SectionTitle: React.FC<SectionTitleProps> = ({title, subtitle, buttonName, handleEvent}) => {
  return (
    <div className="w-full mb-6 pt-3">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="text-xs font-light text-gray-500 uppercase">
            {title}
          </div>
          <div className="text-xl font-bold">{subtitle}</div>
        </div>
        { buttonName && (
        <div className="shrink-0 space-x-2">
          <button className="flex flex-row items-center justify-center px-4 py-2 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600 space-x-1"
            onClick={handleEvent} >
            <FiPlus className="text-white stroke-current" size={16} />
            <span>{buttonName}</span>
          </button>
        </div>)}
      </div>
    </div>
  );
};

export default SectionTitle;

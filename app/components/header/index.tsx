import BarIcon from "@/app/components/icons/Bar";
import DarkIcon from "@/app/components/icons/Dark";

const index: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-700 flex items-center justify-between">
      <BarIcon className="size-7" />
      <DarkIcon className="size-6" />
    </div>
  );
};

export default index;

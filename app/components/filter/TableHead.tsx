import PopOver from "@/app/components/common/headlessui/PopOver";
import ArrowBottomIcon from "@/app/components/common/icons/ArrowBottom";

interface Props {
  thName: string;
  children: React.ReactNode;
}

const TableHead: React.FC<Props> = ({ thName, children }) => {
  return (
    <PopOver
      btnClick={
        <div className="flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-md transition">
          {thName}
          <ArrowBottomIcon className="size-4" />
        </div>
      }
    >
      {children}
    </PopOver>
  );
};

export default TableHead;

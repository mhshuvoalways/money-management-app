import Button from "@/app/components/common/button/GradientButton";
import PopOver from "@/app/components/common/headlessui/PopOver";
import ArrowBottomIcon from "@/app/components/common/icons/ArrowBottom";

interface Props {
  thName: string;
  children: React.ReactNode;
  showResultClicked?: () => void;
}

const TableHead: React.FC<Props> = ({
  thName,
  children,
  showResultClicked,
}) => {
  return (
    <PopOver
      className="mt-4"
      btnClick={
        <div className="flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800 px-2 py-1 rounded-md transition">
          {thName}
          <ArrowBottomIcon className="size-4" />
        </div>
      }
    >
      {children}
      <div className="flex justify-between items-center mt-5 gap-5">
        <p className="font-medium px-4 py-2 cursor-pointer">Cancel</p>
        <Button name="Show result" onClick={showResultClicked} />
      </div>
    </PopOver>
  );
};

export default TableHead;

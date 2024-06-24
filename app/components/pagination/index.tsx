import PopOver from "@/app/components/common/headlessui/PopOver";
import ArrowBottomIcon from "@/app/components/common/icons/ArrowBottom";
import Search from "@/app/components/common/input/Input";
import Button from "@/app/components/pagination/Button";

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div className="flex items-center gap-10 flex-wrap">
      <p>1 - 25 of 4,680</p>
      <div className="flex items-center gap-5 justify-center">
        {<Button place="left" />}
        <PopOver
          btnClick={
            <div className="w-14 h-8 flex items-center justify-center gap-1.5 cursor-pointer bg-white dark:bg-slate-700 rounded hover:border border-primary transition">
              <p className="font-medium">34</p>
              <ArrowBottomIcon className="size-3" />
            </div>
          }
        >
          <Search type="number" placeholder="Go to page" />
        </PopOver>
        {<Button place="right" />}
      </div>
    </div>
  );
};

export default index;

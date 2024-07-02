import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import Calc from "@/app/components/goal/Calc";
import List from "@/app/types/Goal";

interface Props {
  goal: List;
}

const GoalOverview: React.FC<Props> = ({ goal }) => {
  return (
    <div className="card flex justify-between items-center gap-2">
      <Calc goal={goal} />
      <div className={`flex items-center gap-2`}>
        <EditIcon className="size-8 cursor-pointer text-secondary hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2" />
        <TrashIcon className="size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2" />
      </div>
    </div>
  );
};

export default GoalOverview;

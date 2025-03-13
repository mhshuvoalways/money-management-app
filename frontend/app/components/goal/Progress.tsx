import Linebar from "@/app/components/common/progressbar/Linebar";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetGoalsType } from "@/app/types/GoalType";
import GoalProgressSkeleton from "../skeleton/goal/GoalProgressSkeleton";

interface Props {
  selected: GetGoalsType;
}

const Progress: React.FC<Props> = ({ selected }) => {
  const { goals, isLoadingGet } = useAppSelector(
    (state: RootState) => state.goal
  );

  const findGoal = goals.find((el) => el._id === selected._id);

  let contriSum = 0;
  findGoal?.contributions.forEach((el) => {
    contriSum += Number(el.contribution);
  });

  const percentage =
    findGoal &&
    Math.min(100, ((findGoal.saved + contriSum) / findGoal.targetAmount) * 100);

  return (
    <>
      {isLoadingGet ? (
        <GoalProgressSkeleton />
      ) : goals.length ? (
        <div className="card">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1">
              <div>
                <p className="font-medium opacity-80">Saved</p>
                <p className="text1 mt-1">${contriSum + selected.saved}</p>
              </div>
              <div className="text-end">
                <p className="font-medium opacity-80">Goal</p>
                <p className="text1 mt-1">${selected.targetAmount}</p>
              </div>
            </div>
            {percentage && <Linebar percentage={percentage} />}
            {percentage && (
              <div className="flex items-center justify-between gap-1">
                <p className="font-medium opacity-80">
                  {percentage.toFixed(2)}%
                </p>
                <p className="font-medium opacity-80 text-end">
                  {(100 - percentage).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Progress;

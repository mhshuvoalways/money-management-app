import ItemRow from "@/app/components/transaction/goal/ItemRow";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetGoalsType } from "@/app/types/GoalType";
import TransactionSkeleton from "../../skeleton/CategorySkeleton";

interface Props {
  selected: GetGoalsType;
  home?: boolean;
}

const Transaction: React.FC<Props> = ({ selected, home }) => {
  const { goals, isLoadingGet } = useAppSelector(
    (state: RootState) => state.goal
  );
  const findGoal = goals.find((el) => el._id === selected._id);

  return (
    <div className={`card`}>
      <p className="text2">History</p>
      <div
        className={`mt-5 overflow-auto pr-2 card-scroll ${
          home ? "h-80" : "max-h-[calc(100vh/1.05)]"
        }`}
      >
        <table className="w-full text3">
          <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
            <tr>
              <th className="px-4 pb-4 font-bold">Goal Name</th>
              <th className="px-4 pb-4 font-bold">Date</th>
              <th className="px-4 pb-4 font-bold">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingGet ? (
              <TransactionSkeleton itemsEachPage={5} />
            ) : (
              findGoal && <ItemRow selected={findGoal} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import breakdown from "@/app/utils/helpers/breakdown";

interface Props {
  title: string;
}

const IncomeExpensesBreakDown: React.FC<Props> = ({ title }) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);

  const { expenses } = useAppSelector((state: RootState) => state.expense);

  const { totalSum: totalSumExpense } = useTotalSum("expense");
  const { totalSum: totalSumIncome } = useTotalSum("income");
  const percentageArrayExpense = breakdown(expenses, totalSumExpense);
  const percentageArrayIncome = breakdown(incomes, totalSumIncome);

  const percentageArray =
    title === "Incomes" ? percentageArrayIncome : percentageArrayExpense;

  return (
    <div className="card">
      <p className="text2">{title} Breakdown</p>
      <div className="mt-5 space-y-4 overflow-y-auto h-80 pr-2 card-scroll">
        {percentageArray?.map((item, index) => (
          <div
            className={`flex items-center justify-between gap-3 ${
              percentageArray.length !== index + 1 &&
              "dark:border-slate-500 border-b pb-3"
            }`}
            key={index}
          >
            {item.category ? (
              <div className="flex items-center gap-3">
                <p
                  className="size-8 rounded-full flex items-center justify-center"
                  style={{
                    background: item.category.icon.bgColor,
                  }}
                >
                  {item.category.icon.emoji}
                </p>
                <p className="text3 font-medium">
                  {item.category.categoryName}
                </p>
              </div>
            ) : (
              <p>N/A</p>
            )}
            <div className="flex items-center gap-3">
              <p className="text3 font-medium w-20">${item.amount}</p>
              <p className="font-medium">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeExpensesBreakDown;

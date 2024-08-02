import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const useAverageIncome = (incomeExpense: string) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { expenses } = useAppSelector((state: RootState) => state.expense);

  const transactions =
    incomeExpense && incomeExpense === "income" ? incomes : expenses;

  const totalIncome = transactions.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );

  const firstDate = new Date(
    Math.min(...transactions.map((entry) => new Date(entry.date).getTime()))
  );
  const lastDate = new Date(
    Math.max(...transactions.map((entry) => new Date(entry.date).getTime()))
  );

  const days =
    (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  const weeks = days / 7;
  const months =
    (lastDate.getFullYear() - firstDate.getFullYear()) * 12 +
    (lastDate.getMonth() - firstDate.getMonth()) +
    1;
  const years =
    lastDate.getFullYear() -
    firstDate.getFullYear() +
    (lastDate.getMonth() >= firstDate.getMonth() ? 1 : 0);

  const dailyIncome = totalIncome / days;
  const weeklyIncome = totalIncome / weeks;
  const monthlyIncome = totalIncome / months;
  const yearlyIncome = totalIncome / years;

  return {
    dailyIncome: Number(dailyIncome.toFixed(2)),
    weeklyIncome: Number(weeklyIncome.toFixed(2)),
    monthlyIncome: Number(monthlyIncome.toFixed(2)),
    yearlyIncome: Number(yearlyIncome.toFixed(2)),
  };
};

export default useAverageIncome;

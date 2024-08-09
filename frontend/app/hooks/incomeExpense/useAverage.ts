import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const useAverage = (incomeExpense: string, period: string) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { expenses } = useAppSelector((state: RootState) => state.expense);

  const transactions = incomeExpense === "income" ? incomes : expenses;

  const totalAmount = transactions.reduce(
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

  let firstValue = 0;
  let secondValue = 0;

  switch (period) {
    case "daily":
      firstValue = totalAmount / days;
      secondValue = transactions.reduce((sum, entry) => {
        const entryDate = new Date(entry.date);
        if (entryDate.getTime() === lastDate.getTime()) {
          return sum + entry.amount;
        }
        return sum;
      }, 0);
      break;
    case "weekly":
      firstValue = totalAmount / weeks;
      secondValue = transactions.reduce((sum, entry) => {
        const entryDate = new Date(entry.date);
        if (
          entryDate.getTime() >= lastDate.getTime() - 7 * 24 * 60 * 60 * 1000 &&
          entryDate.getTime() <= lastDate.getTime()
        ) {
          return sum + entry.amount;
        }
        return sum;
      }, 0);
      break;
    case "monthly":
      firstValue = totalAmount / months;
      secondValue = transactions.reduce((sum, entry) => {
        const entryDate = new Date(entry.date);
        if (
          entryDate.getFullYear() === lastDate.getFullYear() &&
          entryDate.getMonth() === lastDate.getMonth()
        ) {
          return sum + entry.amount;
        }
        return sum;
      }, 0);
      break;
    case "yearly":
      firstValue = totalAmount / years;
      secondValue = transactions.reduce((sum, entry) => {
        const entryDate = new Date(entry.date);
        if (entryDate.getFullYear() === lastDate.getFullYear()) {
          return sum + entry.amount;
        }
        return sum;
      }, 0);
      break;
  }

  return {
    firstValue: firstValue ? Number(firstValue.toFixed(2)) : 0,
    secondValue: secondValue ? Number(secondValue.toFixed(2)) : 0,
  };
};

export default useAverage;

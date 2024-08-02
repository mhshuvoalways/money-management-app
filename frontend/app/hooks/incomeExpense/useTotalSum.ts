import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const useTotalIncomeSum = (incomeExpense: string) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { expenses } = useAppSelector((state: RootState) => state.expense);

  const transactions =
    incomeExpense && incomeExpense === "income" ? incomes : expenses;

  let totalSum = 0;
  transactions.forEach((el: any) => {
    totalSum += el.amount;
  });

  return {
    totalSum,
  };
};

export default useTotalIncomeSum;

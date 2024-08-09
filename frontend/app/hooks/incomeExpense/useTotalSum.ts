import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";

const useTotalSum = (incomeExpense?: string) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { expenses } = useAppSelector((state: RootState) => state.expense);

  const transactions =
    incomeExpense && incomeExpense === "income" ? incomes : expenses;

  let totalSum = 0;
  transactions.forEach((el: GetIncomeExpenseType) => {
    totalSum += el.amount;
  });

  let newArrayIncomeExpense: GetIncomeExpenseType[] = [];

  incomes.forEach((el: GetIncomeExpenseType) => {
    newArrayIncomeExpense.push(el);
  });

  expenses.forEach((el: GetIncomeExpenseType) => {
    newArrayIncomeExpense.push(el);
  });

  return {
    totalSum,
    newArrayIncomeExpense: newArrayIncomeExpense.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  };
};

export default useTotalSum;

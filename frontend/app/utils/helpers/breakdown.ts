import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";
import { TranBreakDown } from "@/app/types/TranBreakDown";

const breakdown = (transactions: GetIncomeExpenseType[], totalSum: number) => {
  const groupedData: Record<string, TranBreakDown> = transactions.reduce(
    (acc, item) => {
      const categoryName = item.category?.categoryName;
      if (!acc[categoryName]) {
        acc[categoryName] = {
          category: item.category,
          amount: 0,
          percentage: "",
        };
      }
      acc[categoryName].amount += item.amount;
      return acc;
    },
    {} as Record<string, TranBreakDown>
  );

  const percentageArray: TranBreakDown[] = Object.values(groupedData)
    .map((item) => {
      return {
        ...item,
        percentage: ((item.amount / totalSum) * 100).toFixed(2),
      };
    })
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

  return percentageArray;
};

export default breakdown;

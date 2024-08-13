import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";

export const getMonthName = (monthNumber: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber - 1];
};

export const getYearName = (transactions: GetIncomeExpenseType[]) => {
  const years: number[] = [];
  const yearSet: Set<number> = new Set();
  transactions.forEach((t) => {
    const year = new Date(t.date).getFullYear();
    if (!yearSet.has(year)) {
      yearSet.add(year);
      years.push(year);
    }
  });

  return years;
};

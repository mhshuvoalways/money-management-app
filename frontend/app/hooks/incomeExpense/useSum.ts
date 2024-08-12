import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const useSum = (incomeExpense: string, period: string) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { expenses } = useAppSelector((state: RootState) => state.expense);

  const transactions =
    incomeExpense && incomeExpense === "income" ? incomes : expenses;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Current and Last day sum
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let currentDayCalc = 0;
  let lastDayCalc = 0;

  transactions.forEach((inex) => {
    const date = new Date(inex.date);
    if (date.toDateString() === today.toDateString()) {
      currentDayCalc += inex.amount;
    } else if (date.toDateString() === yesterday.toDateString()) {
      lastDayCalc += inex.amount;
    }
  });

  // Current and Last week sum
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 7);
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(today.getDate() - 1);

  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay());

  let currentWeekCalc = 0;
  let lastWeekCalc = 0;

  transactions.forEach((inex) => {
    const date = new Date(inex.date);
    if (date >= currentWeekStart && date <= today) {
      currentWeekCalc += inex.amount;
    } else if (date >= lastWeekStart && date <= lastWeekEnd) {
      lastWeekCalc += inex.amount;
    }
  });

  // Current and last month sum
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentMonthCalc = 0;
  let lastMonthCalc = 0;

  transactions.forEach((inex) => {
    const date = new Date(inex.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    if (month === currentMonth && year === currentYear) {
      currentMonthCalc += inex.amount;
    } else if (month === lastMonth && year === lastMonthYear) {
      lastMonthCalc += inex.amount;
    }
  });

  // Current and last year sum
  const lastYear = currentYear - 1;

  let currentYearCalc = 0;
  let lastYearCalc = 0;

  transactions.forEach((inex) => {
    const date = new Date(inex.date);
    const year = date.getFullYear();
    if (year === currentYear) {
      currentYearCalc += inex.amount;
    } else if (year === lastYear) {
      lastYearCalc += inex.amount;
    }
  });

  let currentCalc = 0;
  let lastCalc = 0;

  switch (period) {
    case "daily":
      currentCalc = currentDayCalc;
      lastCalc = lastDayCalc;
      break;
    case "weekly":
      currentCalc = currentWeekCalc;
      lastCalc = lastWeekCalc;
      break;
    case "monthly":
      currentCalc = currentMonthCalc;
      lastCalc = lastMonthCalc;
      break;
    case "yearly":
      currentCalc = currentYearCalc;
      lastCalc = lastYearCalc;
      break;
  }

  return {
    currentCalc,
    lastCalc,
  };
};

export default useSum;

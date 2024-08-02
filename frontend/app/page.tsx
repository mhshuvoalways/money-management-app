"use client";

import ExpensesBreakDown from "@/app/components/breakdown";
import AreaChart from "@/app/components/charts/Area";
import BarComponent from "@/app/components/charts/Bar";
import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import Header from "@/app/components/common/header";
import ItemForDasboard from "@/app/components/dashboard/ItemForDasboard";
import Savings from "@/app/components/saving";
import Goal from "@/app/components/saving/Goal";
import Transaction from "@/app/components/transaction/dashboard";
import useAverage from "@/app/hooks/incomeExpense/useAverage";
import useSum from "@/app/hooks/incomeExpense/useSum";
import { useState } from "react";

const averages = ["day", "week", "month", "year"];

const DashboardPage = () => {
  const [selectTime, setSelectTime] = useState("month");

  const selectTimeHandler = (value: string) => {
    setSelectTime(value);
  };

  const {
    currentDayCalc,
    lastDayCalc,

    currentWeekCalc,
    lastWeekCalc,

    currentMonthCalc,
    lastMonthCalc,

    currentYearCalc,
    lastYearCalc,
  } = useSum("income");

  const {
    currentDayCalc: currentExpenseDayCalc,
    lastDayCalc: lastExpenseDayCalc,

    currentWeekCalc: currentExpenseWeekCalc,
    lastWeekCalc: lastExpenseWeekCalc,

    currentMonthCalc: currentExpenseMonthCalc,
    lastMonthCalc: lastExpenseMonthCalc,

    currentYearCalc: currentExpenseYearCalc,
    lastYearCalc: lastExpenseYearCalc,
  } = useSum("expense");

  const { dailyIncome, weeklyIncome, monthlyIncome, yearlyIncome } =
    useAverage("income");

  const {
    dailyIncome: dailyExpense,
    weeklyIncome: weeklyExpense,
    monthlyIncome: monthlyExpense,
    yearlyIncome: yearlyExpense,
  } = useAverage("expense");

  let firstAverageIncome = 0;
  let secondAverageIncome = 0;
  let thirdAverageIncome = 0;
  if (selectTime === "day") {
    firstAverageIncome = dailyIncome;
    secondAverageIncome = currentDayCalc;
    thirdAverageIncome = lastDayCalc;
  } else if (selectTime === "week") {
    firstAverageIncome = weeklyIncome;
    secondAverageIncome = currentWeekCalc;
    thirdAverageIncome = lastWeekCalc;
  } else if (selectTime === "month") {
    firstAverageIncome = monthlyIncome;
    secondAverageIncome = currentMonthCalc;
    thirdAverageIncome = lastMonthCalc;
  } else if (selectTime === "year") {
    firstAverageIncome = yearlyIncome;
    secondAverageIncome = currentYearCalc;
    thirdAverageIncome = lastYearCalc;
  }

  let firstAverageExpense = 0;
  let secondAverageExpense = 0;
  if (selectTime === "day") {
    firstAverageExpense = dailyExpense;
    secondAverageExpense = currentExpenseDayCalc;
  } else if (selectTime === "week") {
    firstAverageExpense = weeklyExpense;
    secondAverageExpense = currentExpenseWeekCalc;
  } else if (selectTime === "month") {
    firstAverageExpense = monthlyExpense;
    secondAverageExpense = currentExpenseMonthCalc;
  } else if (selectTime === "year") {
    firstAverageExpense = yearlyExpense;
    secondAverageExpense = currentExpenseYearCalc;
  }

  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap">
        <div>
          <p className="text1">Good Morning, MH Shuvo!</p>
          <p className="text3">{`Here's what's happening with your state.`}</p>
        </div>
        <div className="flex gap-2 items-end flex-wrap">
          {averages.map((av) => (
            <div key={av}>
              {av === selectTime ? (
                <GradientButton
                  name={av}
                  className="px-3 py-1 capitalize"
                  onClick={() => selectTimeHandler(av)}
                />
              ) : (
                <NoGradientButton
                  name={av}
                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 capitalize"
                  onClick={() => selectTimeHandler(av)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
        <ItemForDasboard
          title="Average Income"
          firstValue={firstAverageIncome}
          secondValue={secondAverageIncome}
          calculateFor={`of this ${selectTime}'s`}
        />
        <ItemForDasboard
          title="Average Expense"
          firstValue={firstAverageExpense}
          secondValue={secondAverageExpense}
          calculateFor={`of this ${selectTime}'s`}
          trendColor="expense"
        />
        <ItemForDasboard
          title="Average Savings"
          firstValue={firstAverageIncome - firstAverageExpense}
          secondValue={secondAverageIncome - secondAverageExpense}
          calculateFor={`of this ${selectTime}'s`}
          trendColor="expense"
        />
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-8/12">
          <AreaChart />
        </div>
        <div className="w-full lg:w-4/12">
          <ExpensesBreakDown
            title="Monthly Expenses Breakdown"
            percentageArray={[]}
          />
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12">
          <Savings />
        </div>
        <div className="w-full lg:w-8/12">
          <BarComponent />
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12">
          <Goal />
        </div>
        <div className="w-full lg:w-8/12">
          <Transaction />
        </div>
      </div>
    </Header>
  );
};

export default DashboardPage;

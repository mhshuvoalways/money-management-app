"use client";

import ExpensesBreakDown from "@/app/components/breakdown";
import AreaChart from "@/app/components/charts/Area";
import BarComponent from "@/app/components/charts/Bar";
import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import Header from "@/app/components/common/header";
import AverageSkeleton from "@/app/components/common/skeleton/AverageSkeleton";
import ArerageExpenseItem from "@/app/components/dashboard/averageExpense/ArerageExpenseItem";
import AverageIncomeItem from "@/app/components/dashboard/averageIncome/AverageIncomeItem";
import Savings from "@/app/components/saving";
import Goal from "@/app/components/saving/Goal";
import Transaction from "@/app/components/transaction/dashboard";
import useAverage from "@/app/hooks/incomeExpense/useAverage";
import useSum from "@/app/hooks/incomeExpense/useSum";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { useState } from "react";

const averages: string[] = ["day", "week", "month", "year"];

type SelectTime = "day" | "week" | "month" | "year";

type IncomeExpenseData = {
  currentDayCalc: number;
  lastDayCalc: number;
  currentWeekCalc: number;
  lastWeekCalc: number;
  currentMonthCalc: number;
  lastMonthCalc: number;
  currentYearCalc: number;
  lastYearCalc: number;
};

type AverageData = {
  dailyIncome: number;
  weeklyIncome: number;
  monthlyIncome: number;
  yearlyIncome: number;
};

const DashboardPage = () => {
  const { isLoading: incomeLoading } = useAppSelector(
    (state: RootState) => state.income
  );
  const { isLoading: expenseLoading } = useAppSelector(
    (state: RootState) => state.expense
  );
  const [selectTime, setSelectTime] = useState<SelectTime>("month");

  const selectTimeHandler = (value: SelectTime) => setSelectTime(value);

  const incomeData: IncomeExpenseData = useSum("income");
  const expenseData: IncomeExpenseData = useSum("expense");

  const averageIncome: AverageData = useAverage("income");
  const averageExpense: AverageData = useAverage("expense");

  const getAverageValues = (
    type: "income" | "expense"
  ): [number, number, number?] => {
    const map = {
      day: ["dailyIncome", "currentDayCalc", "lastDayCalc"],
      week: ["weeklyIncome", "currentWeekCalc", "lastWeekCalc"],
      month: ["monthlyIncome", "currentMonthCalc", "lastMonthCalc"],
      year: ["yearlyIncome", "currentYearCalc", "lastYearCalc"],
    };

    const [average, currentCalc, lastCalc] = map[selectTime];

    if (type === "income") {
      return [
        averageIncome[average as keyof AverageData],
        incomeData[currentCalc as keyof IncomeExpenseData],
        incomeData[lastCalc as keyof IncomeExpenseData],
      ];
    }
    if (type === "expense") {
      return [
        averageExpense[average as keyof AverageData],
        expenseData[currentCalc as keyof IncomeExpenseData],
        expenseData[lastCalc as keyof IncomeExpenseData],
      ];
    }
    return [0, 0];
  };

  const [firstAverageIncome, secondAverageIncome] = getAverageValues("income");
  const [firstAverageExpense, secondAverageExpense] =
    getAverageValues("expense");

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
                  onClick={() => selectTimeHandler(av as SelectTime)}
                />
              ) : (
                <NoGradientButton
                  name={av}
                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 capitalize"
                  onClick={() => selectTimeHandler(av as SelectTime)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
        {incomeLoading ? (
          <AverageSkeleton />
        ) : (
          <AverageIncomeItem
            title="Average Income"
            firstValue={firstAverageIncome}
            secondValue={secondAverageIncome}
            calculateFor={`of this ${selectTime}'s`}
          />
        )}
        {expenseLoading ? (
          <AverageSkeleton />
        ) : (
          <ArerageExpenseItem
            title="Average Expense"
            firstValue={firstAverageExpense}
            secondValue={secondAverageExpense}
            calculateFor={`of this ${selectTime}'s`}
          />
        )}
        {incomeLoading && expenseLoading ? (
          <AverageSkeleton />
        ) : (
          <AverageIncomeItem
            title="Average Savings"
            firstValue={firstAverageIncome - firstAverageExpense}
            secondValue={secondAverageIncome - secondAverageExpense}
            calculateFor={`of this ${selectTime}'s`}
          />
        )}
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

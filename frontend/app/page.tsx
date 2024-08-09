"use client";

import ExpensesBreakDown from "@/app/components/breakdown";
import AreaChart from "@/app/components/charts/Area";
import BarComponent from "@/app/components/charts/Bar";
import Header from "@/app/components/common/header";
import ArerageExpenseItem from "@/app/components/dashboard/averageExpense/ArerageExpenseItem";
import AverageIncomeItem from "@/app/components/dashboard/averageIncome/AverageIncomeItem";
import AverageSavingItem from "@/app/components/dashboard/averageSaving/AverageSavingItem";
import Savings from "@/app/components/saving";
import Goal from "@/app/components/saving/Goal";
import AverageSkeleton from "@/app/components/skeleton/AverageSkeleton";
import Transaction from "@/app/components/transaction/dashboard";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import breakdown from "@/app/utils/helpers/breakdown";

const DashboardPage = () => {
  const { isLoadingGet: incomeLoading } = useAppSelector(
    (state: RootState) => state.income
  );

  const { expenses, isLoadingGet: expenseLoading } = useAppSelector(
    (state: RootState) => state.expense
  );

  const { totalSum } = useTotalSum("expense");
  const percentageArray = breakdown(expenses, totalSum);

  return (
    <Header>
      <div>
        <p className="text1">Good Morning, MH Shuvo!</p>
        <p className="text3">{`Here's what's happening with your state.`}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
        {incomeLoading ? <AverageSkeleton /> : <AverageIncomeItem />}
        {expenseLoading ? <AverageSkeleton /> : <ArerageExpenseItem />}
        {incomeLoading && expenseLoading ? (
          <AverageSkeleton />
        ) : (
          <AverageSavingItem />
        )}
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-8/12">
          <AreaChart />
        </div>
        <div className="w-full lg:w-4/12">
          <ExpensesBreakDown
            title="Expenses Breakdown"
            percentageArray={percentageArray}
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

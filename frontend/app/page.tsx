"use client";

import ExpensesBreakDown from "@/app/components/breakdown";
import AreaChart from "@/app/components/charts/Area";
import BarComponent from "@/app/components/charts/Bar";
import Header from "@/app/components/common/header";
import SkeletonLoading from "@/app/components/common/skeleton";
import ArerageExpenseItem from "@/app/components/dashboard/averageExpense/ArerageExpenseItem";
import AverageIncomeItem from "@/app/components/dashboard/averageIncome/AverageIncomeItem";
import AverageSavingItem from "@/app/components/dashboard/averageSaving/AverageSavingItem";
import Savings from "@/app/components/saving";
import Goal from "@/app/components/saving/Goal";
import AverageSkeleton from "@/app/components/skeleton/AverageSkeleton";
import DashboardCardSkeleton from "@/app/components/skeleton/DashboardCardSkeleton";
import Transaction from "@/app/components/transaction/dashboard";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const DashboardPage = () => {
  const { profile, isLoadingGet } = useAppSelector(
    (state: RootState) => state.profile
  );

  const { isLoadingGet: incomeLoading } = useAppSelector(
    (state: RootState) => state.income
  );

  const { isLoadingGet: expenseLoading } = useAppSelector(
    (state: RootState) => state.expense
  );

  return (
    <Header>
      <div>
        <div className="flex items-center gap-2">
          <p className="text1 pb-1">Good Morning,</p>
          {isLoadingGet ? (
            <SkeletonLoading className="!w-32" />
          ) : (
            <p className="text1">{profile.name}!</p>
          )}
        </div>
        <p className="text3">{`Here's what's happening with your state.`}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
        {expenseLoading ? <AverageSkeleton /> : <ArerageExpenseItem />}
        {incomeLoading ? <AverageSkeleton /> : <AverageIncomeItem />}
        {incomeLoading && expenseLoading ? (
          <AverageSkeleton />
        ) : (
          <AverageSavingItem />
        )}
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-8/12">
          {incomeLoading && expenseLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <AreaChart />
          )}
        </div>
        <div className="w-full lg:w-4/12">
          {incomeLoading && expenseLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <Savings />
          )}
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12">
          <ExpensesBreakDown title="Expenses" />
        </div>
        <div className="w-full lg:w-8/12">
          {incomeLoading && expenseLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <BarComponent categoryType="Expenses" />
          )}
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-8/12">
          {incomeLoading && expenseLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <BarComponent categoryType="Incomes" />
          )}
        </div>
        <div className="w-full lg:w-4/12">
          <ExpensesBreakDown title="Incomes" />
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12">
          <Goal />
        </div>
        <div className="w-full lg:w-8/12">
          {incomeLoading && expenseLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <Transaction />
          )}
        </div>
      </div>
    </Header>
  );
};

export default DashboardPage;

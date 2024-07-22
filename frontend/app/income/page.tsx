"use client";

import IncomeBreakDown from "@/app/components/breakdown";
import Header from "@/app/components/common/header";
import IncomeCalculate from "@/app/components/dashboard/Items";
import Pagination from "@/app/components/pagination";
import Transaction from "@/app/components/transaction/incomeExpense";
import AddIncome from "@/app/components/transaction/incomeExpense/AddTransaction";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const IncomePage = () => {
  const { incomes } = useAppSelector((state: RootState) => state.income);

  let totalIncome = 0;
  incomes.forEach((el) => {
    totalIncome += el.amount;
  });

  return (
    <Header>
      <p className="text1">Income!</p>
      <p className="text3">{`Here's what's happening with your income.`}</p>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <IncomeCalculate title="Income" balance={totalIncome} trend={false} />
          <AddIncome />
          <IncomeBreakDown title="Breakdown" />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Transaction />
          <Pagination />
        </div>
      </div>
    </Header>
  );
};

export default IncomePage;

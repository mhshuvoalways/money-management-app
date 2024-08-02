"use client";

import IncomeBreakDown from "@/app/components/breakdown";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import IncomeExpense from "@/app/components/dashboard/incomeExpense/IncomeExpense";
import Pagination from "@/app/components/pagination";
import Transaction from "@/app/components/transaction/incomeExpense";
import AddIncome from "@/app/components/transaction/incomeExpense/AddIncome";
import useSum from "@/app/hooks/incomeExpense/useSum";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { clearIncomeObj, deleteIncome } from "@/app/lib/features/incomeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const IncomePage = () => {
  const { incomes, income, dialog } = useAppSelector(
    (state: RootState) => state.income
  );
  const { totalSum } = useTotalSum("income");

  const { currentMonthCalc, lastMonthCalc } = useSum("income");

  const dispatch = useAppDispatch();

  const percentageArray = incomes
    .map((item) => ({
      ...item,
      percentage: ((item.amount / totalSum) * 100).toFixed(2),
    }))
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

  return (
    <Header>
      <p className="text1">Income!</p>
      <p className="text3">{`Here's what's happening with your income.`}</p>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <IncomeExpense
            title="This Month Income"
            firstValue={currentMonthCalc}
            secondValue={lastMonthCalc}
            calculateFor="from last month"
          />
          <AddIncome />
          <IncomeBreakDown
            title="Breakdown"
            percentageArray={percentageArray}
          />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Transaction
            transactionName="Income"
            totalCount={totalSum}
            transactions={incomes}
          />
          <Pagination />
        </div>
      </div>
      <Dialog
        isOpen={dialog}
        title="Delete Transaction"
        openHandler={() => dispatch(clearIncomeObj())}
      >
        <ConfirmDeleteDialog
          closeHandler={() => dispatch(clearIncomeObj())}
          onSubmitHandler={() => dispatch(deleteIncome(income._id))}
        />
      </Dialog>
    </Header>
  );
};

export default IncomePage;

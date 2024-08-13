"use client";

import IncomeBreakDown from "@/app/components/breakdown";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import IncomeExpense from "@/app/components/dashboard/income/IncomeExpense";
import Pagination from "@/app/components/pagination";
import Transaction from "@/app/components/transaction/incomeExpense";
import AddIncome from "@/app/components/transaction/incomeExpense/AddIncome";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { clearIncomeObj, deleteIncome } from "@/app/lib/features/incomeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const IncomePage = () => {
  const { incomes, income, dialog, isLoadingDelete, isLoadingGet } =
    useAppSelector((state: RootState) => state.income);

  const { totalSum } = useTotalSum("income");

  const dispatch = useAppDispatch();

  return (
    <Header>
      <p className="text1">Income!</p>
      <p className="text3">{`Here's what's happening with your income.`}</p>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <IncomeExpense />
          <div className="flex flex-col-reverse lg:flex-col gap-10">
            <AddIncome />
            <IncomeBreakDown title="Incomes" />
          </div>
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Transaction
            transactionName="Income"
            totalCount={totalSum}
            transactions={incomes}
            isLoading={isLoadingGet}
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
          isLoading={isLoadingDelete}
        />
      </Dialog>
    </Header>
  );
};

export default IncomePage;

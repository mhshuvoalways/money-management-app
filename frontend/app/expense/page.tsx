"use client";

import IncomeBreakDown from "@/app/components/breakdown";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import ExpenseItem from "@/app/components/dashboard/expense/ExpenseItem";
import Pagination from "@/app/components/pagination";
import Transaction from "@/app/components/transaction/incomeExpense";
import AddExpense from "@/app/components/transaction/incomeExpense/AddExpense";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { clearIncomeObj, deleteExpense } from "@/app/lib/features/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const IncomePage = () => {
  const { expenses, expense, dialog, isLoadingGet, isLoadingDelete } =
    useAppSelector((state: RootState) => state.expense);

  const { totalSum } = useTotalSum("expense");

  const dispatch = useAppDispatch();

  return (
    <Header>
      <p className="text1">Expense!</p>
      <p className="text3">{`Here's what's happening with your expense.`}</p>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <ExpenseItem />
          <div className="flex flex-col-reverse lg:flex-col gap-10">
            <AddExpense />
            <IncomeBreakDown title="Expenses" />
          </div>
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Transaction
            transactionName="Expense"
            totalCount={totalSum}
            transactions={expenses}
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
          onSubmitHandler={() => dispatch(deleteExpense(expense._id))}
          isLoading={isLoadingDelete}
        />
      </Dialog>
    </Header>
  );
};

export default IncomePage;

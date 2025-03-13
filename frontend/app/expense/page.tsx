"use client";

import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import ExpenseItem from "@/app/components/dashboard/expense/ExpenseItem";
import Transaction from "@/app/components/transaction/incomeExpense";
import AddExpense from "@/app/components/transaction/incomeExpense/AddExpense";
import { clearIncomeObj, deleteExpense } from "@/app/lib/features/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const IncomePage = () => {
  const { expenses, expense, dialog, isLoadingGet, isLoadingDelete } =
    useAppSelector((state: RootState) => state.expense);

  const dispatch = useAppDispatch();

  return (
    <Header>
      <div className="flex gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <ExpenseItem />
          <AddExpense />
        </div>
        <Transaction
          transactionName="Expense"
          transactions={expenses}
          isLoading={isLoadingGet}
        />
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

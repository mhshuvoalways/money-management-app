"use client";

import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import IncomeExpense from "@/app/components/dashboard/income/IncomeExpense";
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
      <div className="flex gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <IncomeExpense />
          <AddIncome />
        </div>
        <Transaction
          transactionName="Income"
          totalCount={totalSum}
          transactions={incomes}
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
          onSubmitHandler={() => dispatch(deleteIncome(income._id))}
          isLoading={isLoadingDelete}
        />
      </Dialog>
    </Header>
  );
};

export default IncomePage;

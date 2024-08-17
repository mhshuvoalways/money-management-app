"use client";

import ItemRow from "@/app/components/transaction/wallet/ItemRow";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";
import { GetWalletType } from "@/app/types/WalletType";
import TransactionSkeleton from "../../skeleton/TransactionSkeleton";

interface Props {
  selectedWallet?: GetWalletType;
}

const Transaction: React.FC<Props> = ({ selectedWallet }) => {
  const { isLoadingGet } = useAppSelector((state: RootState) => state.income);
  const { isLoadingGet: isLoadingGetExpense } = useAppSelector(
    (state: RootState) => state.expense
  );

  const { newArrayIncomeExpense } = useTotalSum();

  const newArray: GetIncomeExpenseType[] = [];

  newArrayIncomeExpense.forEach((income) => {
    if (income.wallet?._id === selectedWallet?._id) {
      newArray.push(income);
    }
  });

  return (
    <div className={`card`}>
      <p className="text2">
        Transactions History of {selectedWallet?.walletName}
      </p>
      <div
        className={`mt-5 overflow-auto pr-2 card-scroll max-h-[calc(100vh/1.05)]`}
      >
        {isLoadingGet && isLoadingGetExpense ? (
          <TransactionSkeleton />
        ) : (
          <table className="w-full text3">
            <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
              <tr>
                <th className="px-4 pb-4 font-bold">Category</th>
                <th className="px-4 pb-4 font-bold">Category Type</th>
                <th className="px-4 pb-4 font-bold">Date</th>
                <th className="px-4 pb-4 font-bold">Amount</th>
                <th className="px-4 pb-4 font-bold">Description</th>
              </tr>
            </thead>
            <tbody>
              <ItemRow transactions={newArray} />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transaction;

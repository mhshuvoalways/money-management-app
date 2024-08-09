"use client";

import ItemRow from "@/app/components/transaction/dashboard/ItemRow";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";

interface Props {}

const Transaction: React.FC<Props> = () => {
  const { newArrayIncomeExpense } = useTotalSum();

  return (
    <div className={`card`}>
      <p className="text2">Transactions History</p>
      <div className={`mt-5 overflow-auto pr-2 card-scroll h-80`}>
        <table className="w-full text3">
          <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
            <tr>
              <th className="px-4 pb-4 font-bold">Category</th>
              <th className="px-4 pb-4 font-bold">Category Type</th>
              <th className="px-4 pb-4 font-bold">Date</th>
              <th className="px-4 pb-4 font-bold">Wallet</th>
              <th className="px-4 pb-4 font-bold">Amount</th>
              <th className="px-4 pb-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <ItemRow transactions={newArrayIncomeExpense} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

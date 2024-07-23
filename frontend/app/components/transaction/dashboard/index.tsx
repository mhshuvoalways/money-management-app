"use client";

import ItemRow from "@/app/components/transaction/dashboard/ItemRow";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

interface Props {
  home?: boolean;
}

const Transaction: React.FC<Props> = ({ home }) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);

  return (
    <div className={`card`}>
      <p className="text2">Transactions History</p>
      <div
        className={`mt-5 overflow-auto pr-2 card-scroll ${
          home ? "h-80" : "max-h-[calc(100vh/1.05)]"
        }`}
      >
        <table className="w-full text3">
          <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
            <tr>
              <th className="px-4 pb-4 font-bold">Category</th>
              <th className="px-4 pb-4 font-bold">Date</th>
              <th className="px-4 pb-4 font-bold">Wallet</th>
              <th className="px-4 pb-4 font-bold">Amount</th>
              <th className="px-4 pb-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <ItemRow transactions={incomes} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

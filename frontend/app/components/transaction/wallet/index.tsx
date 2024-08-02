"use client";

import ItemRow from "@/app/components/transaction/wallet/ItemRow";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";

interface Props {
  home?: boolean;
  selectedWallet?: GetWalletType;
}

const Transaction: React.FC<Props> = ({ home, selectedWallet }) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);

  const filterIncomes = selectedWallet
    ? incomes.filter((item) => item.wallet._id === selectedWallet?._id)
    : incomes;

  return (
    <div className={`card`}>
      <p className="text2">
        Transactions History of {selectedWallet?.walletName}
      </p>
      <div
        className={`mt-5 overflow-auto pr-2 card-scroll max-h-[calc(100vh/1.05)]`}
      >
        <table className="w-full text3">
          <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
            <tr>
              <th className="px-4 pb-4 font-bold">Category</th>
              <th className="px-4 pb-4 font-bold">Date</th>
              <th className="px-4 pb-4 font-bold">Amount</th>
              <th className="px-4 pb-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <ItemRow transactions={filterIncomes} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

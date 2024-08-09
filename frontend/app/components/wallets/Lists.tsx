"use client";

import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import useTotalIncomeSum from "@/app/hooks/incomeExpense/useTotalSum";
import { dialogHandler } from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";
import WalletSkeleton from "../skeleton/WalletSkeleton";

interface Props {
  selectedWallet: GetWalletType;
  setSelectedWallet: (wallet: GetWalletType) => void;
}

const Lists: React.FC<Props> = ({ selectedWallet, setSelectedWallet }) => {
  const { wallets, isLoadingGet } = useAppSelector(
    (state: RootState) => state.wallet
  );

  const { newArrayIncomeExpense } = useTotalIncomeSum();

  const dispatch = useAppDispatch();

  const newWallets = wallets.map((wallet) => {
    const balance = newArrayIncomeExpense
      .filter(
        (transaction) => transaction.wallet.walletName === wallet.walletName
      )
      .reduce((total, transaction) => {
        return transaction.category.categoryType === "Income"
          ? total + transaction.amount
          : total - transaction.amount;
      }, 0);

    return { _id: wallet._id, walletName: wallet.walletName, balance: balance };
  });

  return (
    <div className="space-y-5 w-full md:w-3/12">
      {isLoadingGet ? (
        <WalletSkeleton />
      ) : (
        newWallets?.map((wallet) => (
          <div
            className={`card flex justify-between items-center gap-2 cursor-pointer h-20 ${
              selectedWallet._id === wallet._id && "bgGradient"
            }`}
            key={wallet._id}
            onClick={() => setSelectedWallet(wallet)}
          >
            <div>
              <p
                className={`text2 ${
                  selectedWallet._id === wallet._id && "text-slate-100"
                }`}
              >
                {wallet.walletName}
              </p>
              <p
                className={
                  selectedWallet._id === wallet._id
                    ? `font-medium text-slate-300`
                    : "text3"
                }
              >
                {wallet.balance}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon
                className={`size-8 cursor-pointer text-primary hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                  selectedWallet._id === wallet._id
                    ? "dark:bg-slate-100"
                    : "dark:bg-slate-600"
                }`}
                onClick={() =>
                  dispatch(
                    dialogHandler({ dialogName: "update", walletObj: wallet })
                  )
                }
              />
              <TrashIcon
                className={`size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                  selectedWallet._id === wallet._id
                    ? "dark:bg-slate-100"
                    : "dark:bg-slate-600"
                }`}
                onClick={() => {
                  dispatch(
                    dialogHandler({ dialogName: "delete", walletObj: wallet })
                  );
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Lists;

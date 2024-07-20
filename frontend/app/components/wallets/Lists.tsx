"use client";

import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import {
  deleteWallet,
  updateWalletHandler,
} from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";

interface Props {
  selectedWallet: GetWalletType;
  setSelectedWallet: (wallet: GetWalletType) => void;
}

const Lists: React.FC<Props> = ({ selectedWallet, setSelectedWallet }) => {
  const { wallets } = useAppSelector((state: RootState) => state.wallet);

  const dispatch = useAppDispatch();

  return (
    <div className="space-y-5 w-full md:w-3/12">
      {wallets?.map((wallet) => (
        <div
          className={`card flex justify-between items-center gap-2 cursor-pointer ${
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
              onClick={() => dispatch(updateWalletHandler(wallet))}
            />
            <TrashIcon
              className={`size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                selectedWallet._id === wallet._id
                  ? "dark:bg-slate-100"
                  : "dark:bg-slate-600"
              }`}
              onClick={() => {
                dispatch(deleteWallet(wallet._id));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lists;

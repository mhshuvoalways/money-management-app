"use client";

import Button from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import PlusIcon from "@/app/components/common/icons/Plus";
import Transaction from "@/app/components/transaction/wallet";
import AddWallet from "@/app/components/wallets/AddWallet";
import Lists from "@/app/components/wallets/Lists";
import TransferBalance from "@/app/components/wallets/TransferBalance";
import {
  closeDialog,
  deleteWallet,
  dialogHandler,
} from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";
import { useEffect, useState } from "react";

const WalletPage = () => {
  const [selectedWallet, setSelectedWallet] = useState<GetWalletType>({
    _id: "",
    walletName: "",
    balance: 0,
    walletPosition: 0,
  });

  const { dialogName, wallets, walletObj, isLoadingDelete } = useAppSelector(
    (state: RootState) => state.wallet
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedWallet?._id && wallets[0]) {
      setSelectedWallet(wallets[0]);
    }
  }, [selectedWallet?._id, wallets]);

  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap items-end">
        <div>
          <p className="text1">Wallets!</p>
          <p className="text3">{`Here's what's happening with your wallets.`}</p>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <NoGradientButton
            name="Balance Transfer"
            onClick={() =>
              dispatch(dialogHandler({ dialogName: "transfer", walletObj: {} }))
            }
            className="border border-secondary py-2 px-5 hover:border-primary"
          />
          <Button
            name="Add Wallet"
            icon={<PlusIcon className="size-5" />}
            onClick={() =>
              dispatch(dialogHandler({ dialogName: "add", walletObj: {} }))
            }
          />
        </div>
        <Dialog
          isOpen={dialogName ? true : false}
          title={`${
            dialogName !== "transfer"
              ? `${dialogName} wallet`
              : `${dialogName} balance`
          }`}
          openHandler={() => dispatch(closeDialog())}
        >
          {dialogName === "add" && <AddWallet />}
          {dialogName === "update" && <AddWallet />}
          {dialogName === "transfer" && <TransferBalance />}
          {dialogName === "delete" && (
            <ConfirmDeleteDialog
              subTitle="wallet"
              closeHandler={() => dispatch(closeDialog())}
              onSubmitHandler={() =>
                walletObj._id && dispatch(deleteWallet(walletObj._id))
              }
              isLoading={isLoadingDelete}
            />
          )}
        </Dialog>
      </div>
      <div className="mt-10 flex gap-10 items-start flex-wrap md:flex-nowrap">
        <Lists
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
        <div className="w-full md:w-9/12">
          <Transaction selectedWallet={selectedWallet} />
        </div>
      </div>
    </Header>
  );
};

export default WalletPage;

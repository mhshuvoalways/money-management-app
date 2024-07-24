"use client";

import Button from "@/app/components/common/button/GradientButton";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import PlusIcon from "@/app/components/common/icons/Plus";
import Items from "@/app/components/dashboard/Items";
import Transaction from "@/app/components/transaction/dashboard";
import AddWallet from "@/app/components/wallets/AddWallet";
import Lists from "@/app/components/wallets/Lists";
import { closeDialog, dialogHandler } from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";
import { useEffect, useState } from "react";

const WalletPage = () => {
  const [selectedWallet, setSelectedWallet] = useState<GetWalletType>({
    _id: "",
    walletName: "",
    balance: 0,
  });

  const { dialogName, wallets } = useAppSelector(
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
        <Button
          name="Add Wallet"
          icon={<PlusIcon className="size-5" />}
          onClick={() =>
            dispatch(dialogHandler({ dialogName: "add", walletObj: {} }))
          }
        />
        <Dialog
          isOpen={dialogName ? true : false}
          title={`${dialogName} Wallet`}
          openHandler={() => dispatch(closeDialog())}
        >
          {dialogName === "add" && <AddWallet />}
          {dialogName === "update" && <AddWallet />}
          {dialogName === "delete" && <ConfirmDeleteDialog subTitle="wallet" />}
        </Dialog>
      </div>
      <div className="mt-10 flex gap-10 items-start flex-wrap md:flex-nowrap">
        <Lists
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
        <div className="w-full md:w-9/12 space-y-10">
          <div className="grid grid-cols-2 gap-10">
            <Items
              title={"Total Balance"}
              balance={selectedWallet.balance}
              trend
            />
            <Items
              title={"Monthly Expenses"}
              balance={selectedWallet.balance}
              trend={false}
            />
          </div>
          <Transaction />
        </div>
      </div>
    </Header>
  );
};

export default WalletPage;

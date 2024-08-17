"use client";

import Button from "@/app/components/common/button/GradientButton";
import LoadingButton from "@/app/components/common/button/LoadingButton";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Input from "@/app/components/common/input/Input";
import { transferBalance } from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";
import { useEffect, useState } from "react";

interface Props {}

const TransferBalance: React.FC<Props> = () => {
  const [fromWallet, setFromWallet] = useState<GetWalletType>({
    _id: "",
    walletName: "",
    balance: 0,
    walletPosition: 0,
  });
  const [toWallet, setToWallet] = useState<GetWalletType>({
    _id: "",
    walletName: "",
    balance: 0,
    walletPosition: 0,
  });
  const [balance, setBalance] = useState<number>(0);

  const dispatch = useAppDispatch();

  const { wallets, errors, isLoadingAdd } = useAppSelector(
    (state: RootState) => state.wallet
  );

  useEffect(() => {
    setFromWallet({
      _id: wallets[0]._id,
      walletName: wallets[0].walletName,
      balance: wallets[0].balance,
      walletPosition: wallets[0].walletPosition,
    });
    setToWallet({
      _id: wallets[1]._id,
      walletName: wallets[1].walletName,
      balance: wallets[1].balance,
      walletPosition: wallets[1].walletPosition,
    });
  }, [wallets]);

  const newWallets: string[] = [];
  wallets.forEach((item) => {
    newWallets.push(item.walletName);
  });

  const fromWalletBoxHandler = (value: string) => {
    const findWallet = wallets.find((item) => item.walletName === value);
    if (findWallet) {
      setFromWallet(findWallet);
    }
  };

  const toWalletBoxHandler = (value: string) => {
    const findWallet = wallets.find((item) => item.walletName === value);
    if (findWallet) {
      setToWallet(findWallet);
    }
  };

  const balanceWalletHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(Number(event.target.value));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const obj = {
      fromWalletId: fromWallet._id,
      toWalletId: toWallet._id,
      balance,
    };
    dispatch(transferBalance(obj));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="space-y-3">
        <div className="space-y-2">
          <label className="font-medium">From *</label>
          <ListBox
            value={fromWallet.walletName}
            items={newWallets}
            onChangeHandler={fromWalletBoxHandler}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">To *</label>
          <ListBox
            value={toWallet.walletName}
            items={newWallets}
            onChangeHandler={toWalletBoxHandler}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Balance *</label>
          <Input
            type="number"
            placeholder="Balance"
            value={balance.toString()}
            onChange={balanceWalletHandler}
          />
          <p className="text-red-600 font-medium mt-1">{errors.balance}</p>
        </div>
      </div>
      <div className="mt-5">
        {isLoadingAdd ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button name="Transfer" className="w-full" />
        )}
      </div>
    </form>
  );
};

export default TransferBalance;

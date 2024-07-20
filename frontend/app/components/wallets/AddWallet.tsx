"use client";

import Button from "@/app/components/common/button/GradientButton";
import Input from "@/app/components/common/input/Input";
import { createWallet, updateWallet } from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { CreateWalletType } from "@/app/types/WalletType";
import { useEffect, useState } from "react";

interface Props {}

const Index: React.FC<Props> = () => {
  const [wallet, setWallet] = useState<CreateWalletType>({});

  const dispatch = useAppDispatch();

  const { errors, walletObj, dialog } = useAppSelector(
    (state: RootState) => state.wallet
  );

  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallet({
      ...wallet,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (walletObj._id) {
      dispatch(updateWallet(wallet));
    } else {
      dispatch(createWallet(wallet));
    }
  };

  useEffect(() => {
    if (dialog && walletObj._id) {
      setWallet(walletObj);
    }
  }, [dialog, walletObj]);

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="space-y-2">
        <label className="font-medium">Wallet Name</label>
        <Input
          placeholder="Wallet name"
          name="walletName"
          value={wallet?.walletName}
          onChange={categoryHandler}
        />
        <p className="text-red-600 font-medium mt-1">{errors.message}</p>
      </div>
      <Button name="Save" className="w-full mt-5" />
    </form>
  );
};

export default Index;

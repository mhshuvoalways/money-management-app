"use client";

import Button from "@/app/components/common/button/GradientButton";
import LoadingButton from "@/app/components/common/button/LoadingButton";
import PlusIcon from "@/app/components/common/icons/Plus";
import Input from "@/app/components/common/input/Input";
import {
  clearError,
  createWallet,
  updateWallet,
} from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { CreateWalletType } from "@/app/types/WalletType";
import { useEffect, useState } from "react";

interface Props {}

const Index: React.FC<Props> = () => {
  const [wallet, setWallet] = useState<CreateWalletType>({});

  const dispatch = useAppDispatch();

  const { wallets, errors, walletObj, dialogName, isLoadingAdd } =
    useAppSelector((state: RootState) => state.wallet);

  const isUpdate = dialogName === "update" ? true : false;

  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallet({
      ...wallet,
      [event.target.name]: event.target.value,
    });
    dispatch(clearError());
  };

  useEffect(() => {
    if (isUpdate) {
      setWallet(walletObj);
    } else {
      setWallet({});
    }
  }, [isUpdate, walletObj]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const obj = {
      ...wallet,
      walletPosition: wallets[0].walletPosition - 1,
    };
    if (isUpdate) {
      dispatch(updateWallet(wallet));
    } else {
      dispatch(createWallet(obj));
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="space-y-2">
        <label className="font-medium">Wallet Name *</label>
        <Input
          placeholder="Wallet name"
          name="walletName"
          value={wallet?.walletName}
          onChange={categoryHandler}
        />
        <p className="text-red-600 font-medium mt-1">{errors.walletName}</p>
      </div>
      <div className="mt-5">
        {isLoadingAdd ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button
            name={isUpdate ? "Save" : "Add"}
            icon={!isUpdate ? <PlusIcon className="size-5" /> : <></>}
            className="w-full"
          />
        )}
      </div>
    </form>
  );
};

export default Index;

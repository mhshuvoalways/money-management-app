"use client";

import EditIcon from "@/app/components/common/icons/Edit";
import { useState } from "react";

const wallets = [
  {
    id: 1,
    name: "Bank",
    balance: 23221,
    expenseRatio: 2421,
  },
  {
    id: 2,
    name: "Card",
    balance: 23221,
    expenseRatio: 2421,
  },
  {
    id: 3,
    name: "Cash",
    balance: 23221,
    expenseRatio: 2421,
  },
];

interface Props {}

const Lists: React.FC<Props> = () => {
  const [selectedWalletId, setSelectedWalletId] = useState<number>(
    wallets[0].id
  );

  const selectWalletHandler = (walletId: number) => {
    setSelectedWalletId(walletId);
  };

  return (
    <div className="space-y-5 w-full md:w-3/12">
      {wallets.map((wallet) => (
        <div
          className={`card flex justify-between items-center gap-2 cursor-pointer ${
            selectedWalletId === wallet.id && "bgGradient"
          }`}
          key={wallet.id}
          onClick={() => selectWalletHandler(wallet.id)}
        >
          <div>
            <p
              className={`text2 ${
                selectedWalletId === wallet.id && "text-slate-100"
              }`}
            >
              {wallet.name}
            </p>
            <p
              className={
                selectedWalletId === wallet.id
                  ? `font-medium text-slate-300`
                  : "text3"
              }
            >
              {wallet.balance}
            </p>
          </div>
          <EditIcon
            className={`size-8 cursor-pointer text-primary hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
              selectedWalletId === wallet.id
                ? "dark:bg-slate-100"
                : "dark:bg-slate-600"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Lists;

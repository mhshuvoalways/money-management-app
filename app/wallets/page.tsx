"use client";

import Header from "@/app/components/common/header";
import PlusIcon from "@/app/components/common/icons/Plus";
import Items from "@/app/components/dashboard/Items";
import Transaction from "@/app/components/transaction";
import Lists from "@/app/components/wallets/Lists";
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

const page = () => {
  const [selectedWalletId, setSelectedWalletId] = useState<number>(
    wallets[0].id
  );

  const selectWalletHandler = (walletId: number) => {
    setSelectedWalletId(walletId);
  };

  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap items-start">
        <div>
          <p className="text1">Wallets!</p>
          <p className="text3">{`Here's what's happening with your wallets.`}</p>
        </div>
        <button className="btn flex items-center gap-2 px-4 py-2">
          <PlusIcon className="size-5" />
          Add Wallet
        </button>
      </div>
      <div className="mt-10 flex gap-10 items-start flex-wrap md:flex-nowrap">
        <Lists
          wallets={wallets}
          selectedWalletId={selectedWalletId}
          selectWalletHandler={selectWalletHandler}
        />
        <div className="w-full md:w-9/12 space-y-10">
          <div className="flex items-center gap-10 justify-between">
            <Items title={"Total Balance"} balance={1214} trend />
            <Items title={"Monthly Expenses"} balance={1214} trend={false} />
          </div>
          <Transaction />
        </div>
      </div>
    </Header>
  );
};

export default page;

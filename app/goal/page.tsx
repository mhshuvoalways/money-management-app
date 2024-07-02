"use client";

import Button from "@/app/components/common/button/GradientButton";
import Header from "@/app/components/common/header";
import PlusIcon from "@/app/components/common/icons/Plus";
import GoalOverview from "@/app/components/goal/GoalOverview";
import Lists from "@/app/components/goal/Lists";
import Progress from "@/app/components/goal/Progress";
import Goal from "@/app/components/transaction/goal";
import List from "@/app/types/Goal";
import { useState } from "react";

const goals = [
  {
    id: 1,
    name: "Vacation",
    percentage: 65,
    totalAmount: 1458,
    fulfilled: 145,
  },
  {
    id: 2,
    name: "Gift",
    percentage: 15,
    totalAmount: 58,
    fulfilled: 5,
  },
  {
    id: 3,
    name: "New Car",
    percentage: 91,
    totalAmount: 1458,
    fulfilled: 1045,
  },
  {
    id: 4,
    name: "Laptop",
    percentage: 55,
    totalAmount: 148,
    fulfilled: 15,
  },
];

const WalletPage = () => {
  const [selected, setSelected] = useState<List>(goals[0]);

  const selectWalletHandler = (goal: List) => {
    setSelected(goal);
  };

  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap items-end">
        <div>
          <p className="text1">Goals!</p>
          <p className="text3">{`Here's what's happening with your goals.`}</p>
        </div>
        <Button name="Add Goal" icon={<PlusIcon className="size-5" />} />
      </div>
      <div className="mt-10 flex gap-10 items-start flex-wrap md:flex-nowrap">
        <Lists
          goals={goals}
          selected={selected}
          onClick={selectWalletHandler}
        />
        <div className="w-full md:w-9/12 space-y-10">
          <GoalOverview goal={selected} />
          <Progress selected={selected} />
          <Goal />
        </div>
      </div>
    </Header>
  );
};

export default WalletPage;

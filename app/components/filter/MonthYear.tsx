"use client";

import ArrowLeftIcon from "@/app/components/common/icons/ArrowLeft";
import ArrowRightIcon from "@/app/components/common/icons/ArrowRight";
import { useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Props {}

const MonthYear: React.FC<Props> = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const monthIncrease = () => {
    if (selectedMonth <= months.length - 1) {
      setSelectedMonth(0);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const monthDecrease = () => {
    if (selectedMonth <= 0) {
      setSelectedMonth(months.length - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center">
      <ArrowLeftIcon
        className="text3 size-7 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full p-1"
        onClick={monthDecrease}
      />
      <p className="text3 font-medium cursor-pointer w-20 mx-auto text-center">
        {months[selectedMonth]} 2024
      </p>
      <ArrowRightIcon
        className="text3 size-7 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full p-1"
        onClick={monthIncrease}
      />
    </div>
  );
};

export default MonthYear;

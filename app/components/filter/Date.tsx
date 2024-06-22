"use client";

import ArrowLeftIcon from "@/app/components/common/icons/ArrowLeft";
import ArrowRightIcon from "@/app/components/common/icons/ArrowRight";
import { useState } from "react";

const thisYear = new Date().getFullYear();

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

const dates: number[] = [];
for (let index = 1; index <= 31; index++) {
  dates.push(index);
}

interface Props {}

const DateComponent: React.FC<Props> = () => {
  const [year, setYear] = useState<number>(thisYear);
  const [month, setMonth] = useState<string>();
  const [date, setDate] = useState<number>();

  const yearIncrease = () => {
    if (year >= thisYear) return;
    setYear((prev) => prev + 1);
  };

  const yearDecrease = () => {
    if (year <= 2023) return;
    setYear((prev) => prev - 1);
  };

  const monthHandler = (m: string) => {
    setMonth(m);
  };

  const dateHandler = (d: number) => {
    setDate(d);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <ArrowLeftIcon
          className="size-7 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full p-1 transition"
          onClick={yearDecrease}
        />
        <p className="font-medium cursor-pointer w-20 mx-auto text-center">
          {year}
        </p>
        <ArrowRightIcon
          className="size-7 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full p-1 transition"
          onClick={yearIncrease}
        />
      </div>
      <div className="mt-4">
        <p className="font-semibold">Months:</p>
        <div className="grid grid-cols-6 gap-1 mt-2">
          {months.map((el) => (
            <p
              key={el}
              className={`cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500 rounded w-9 h-9 p-1 flex justify-center items-center transition ${
                el === month && "bg-slate-200 dark:bg-slate-500 font-medium"
              }`}
              onClick={() => monthHandler(el)}
            >
              {el}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Date:</p>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {dates.map((el) => (
            <p
              key={el}
              className={`cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500 rounded w-9 h-9 p-1 flex justify-center items-center transition ${
                el === date && "bg-slate-200 dark:bg-slate-500 font-medium"
              }`}
              onClick={() => dateHandler(el)}
            >
              {el}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default DateComponent;

"use client";

import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { getMonthName, getYearName } from "@/app/utils/helpers/getMonthYears";
import tailwindcss from "@/tailwind.config";
import React, { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ListBox from "../common/headlessui/ListBox";

interface TailwindConfig {
  theme: {
    extend: {
      colors: {
        primary: string;
      };
    };
  };
}

const tailwindConfig = tailwindcss as unknown as TailwindConfig;

interface MonthBalance {
  date: {
    month: string;
    year: string;
  };
  balance: number;
}

interface Props {}

const AreaComponent: React.FC<Props> = () => {
  const [yearSelect, setYearSelect] = useState<string>(
    new Date().getFullYear().toString()
  );

  const onChangeHandler = (value: string) => {
    setYearSelect(value);
  };

  const { newArrayIncomeExpense: transactions } = useTotalSum();

  const result: MonthBalance[] = [];
  let totalBalance = 0;

  getYearName(transactions).forEach((year) => {
    const monthBalances: MonthBalance[] = Array.from(
      { length: 12 },
      (_, i) => ({
        date: {
          month: getMonthName(i + 1),
          year: year.toString(),
        },
        balance: 0,
      })
    );

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth();
      if (transactionYear === year) {
        monthBalances[transactionMonth].balance +=
          (transaction.category.categoryType === "Income" ? 1 : -1) *
          transaction.amount;
      }
    });

    const items = monthBalances.filter((item) => item.date.year === yearSelect);
    result.push(...items);
    items.forEach((item) => {
      totalBalance += item.balance;
    });
  });

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <p className="text2">Balance Trends</p>
        <div>
          <ListBox
            items={getYearName(transactions).map((item) => item.toString())}
            value={yearSelect}
            onChangeHandler={onChangeHandler}
            className="h-8"
          />
        </div>
      </div>
      <p className="text1 mt-3">${totalBalance}</p>
      <div className="h-72 mt-5">
        <ResponsiveContainer>
          <AreaChart data={result}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date.month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="balance"
              fill={tailwindConfig.theme.extend.colors.primary}
              stroke={tailwindConfig.theme.extend.colors.primary}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaComponent;

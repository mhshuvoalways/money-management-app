"use client";

import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { getMonthName, getYearName } from "@/app/utils/helpers/getMonthYears";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { green, red } from "tailwindcss/colors";
import ListBox from "../common/headlessui/ListBox";

interface MonthBalance {
  date: {
    month: string;
    year: string;
  };
  income: number;
  expense: number;
}

interface Props {
  categoryType: string;
}

const BarComponent: React.FC<Props> = ({ categoryType }) => {
  const [yearSelect, setYearSelect] = useState<string>(
    new Date().getFullYear().toString()
  );

  const onChangeHandler = (value: string) => {
    setYearSelect(value);
  };

  const { newArrayIncomeExpense: transactions } = useTotalSum();

  const result: MonthBalance[] = [];

  getYearName(transactions).forEach((year) => {
    const monthBalances: MonthBalance[] = Array.from(
      { length: 12 },
      (_, i) => ({
        date: {
          month: getMonthName(i + 1),
          year: year.toString(),
        },
        income: 0,
        expense: 0,
      })
    );

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth();
      if (transactionYear === year) {
        if (transaction.category.categoryType === "Income") {
          monthBalances[transactionMonth].income += transaction.amount;
        } else if (transaction.category.categoryType === "Expense") {
          monthBalances[transactionMonth].expense += transaction.amount;
        }
      }
    });
    const items = monthBalances.filter((item) => item.date.year === yearSelect);
    result.push(...items);
  });

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <p className="text2">{categoryType}</p>
        <div>
          <ListBox
            items={getYearName(transactions).map((item) => item.toString())}
            value={yearSelect}
            onChangeHandler={onChangeHandler}
            className="h-8"
          />
        </div>
      </div>
      <div className="h-80 mt-5">
        <ResponsiveContainer>
          <BarChart data={result}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categoryType === "Incomes" ? (
              <Bar dataKey="income" fill={green["400"]} />
            ) : (
              <Bar dataKey="expense" fill={red["400"]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarComponent;

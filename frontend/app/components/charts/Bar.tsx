"use client";

import tailwindcss from "@/tailwind.config";
import React from "react";
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
import { green } from "tailwindcss/colors";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "February",
    income: 3000,
    expense: 1398,
  },
  {
    name: "March",
    income: 2000,
    expense: 9800,
  },
  {
    name: "April",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "June",
    income: 2390,
    expense: 3800,
  },
  {
    name: "July",
    income: 3490,
    expense: 4300,
  },
  {
    name: "August",
    income: 1390,
    expense: 2800,
  },
  {
    name: "September",
    income: 3490,
    expense: 1300,
  },
];

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

interface Props {}

const BarComponent: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Monthly Income vs Expenses</p>
      <div className="h-80 mt-5">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill={green["400"]} />
            <Bar
              dataKey="expense"
              fill={tailwindConfig.theme.extend.colors.primary}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarComponent;

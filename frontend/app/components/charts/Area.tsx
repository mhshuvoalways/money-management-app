"use client";

import tailwindcss from "@/tailwind.config";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
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

const AreaComponent: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Balance Trends</p>
      <p className="text1 mt-3">$221,478</p>
      <div className="h-72 mt-5">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
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

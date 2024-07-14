"use client";

import Circle from "@/app/components/common/progressbar/Circle";
import { MyContext } from "@/app/context";
import React, { useContext } from "react";
import { green, slate } from "tailwindcss/colors";

const goals = [
  {
    name: "Vacation",
    percentage: 65,
  },
  {
    name: "Gift",
    percentage: 15,
  },
  {
    name: "New Car",
    percentage: 91,
  },
  {
    name: "Laptop",
    percentage: 55,
  },
];

interface Props {}

const Goal: React.FC<Props> = () => {
  const { darkMode } = useContext(MyContext);

  return (
    <div className="card">
      <p className="text2">Saving Goals</p>
      <div className="mt-5 grid grid-cols-2 gap-5">
        {goals.map((g, index) => (
          <div className="w-6/12 sm:w-28 mx-auto font-medium" key={index}>
            <Circle
              percentage={g.percentage}
              textColor={darkMode ? slate["300"] : slate["500"]}
              pathColor={green[600]}
              trailColor={darkMode ? slate[600] : slate[100]}
            />
            <p className="text2 text-center mt-3">{g.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goal;

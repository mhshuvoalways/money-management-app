"use client";

import { MyContext } from "@/app/context";
import tailwindcss from "@/tailwind.config";
import React, { useContext, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { slate } from "tailwindcss/colors";

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

interface Props {
  percentage: number;
}

const Circle: React.FC<Props> = ({ percentage }) => {
  const [value, setValue] = useState<number>(0);

  const { darkMode } = useContext(MyContext);

  useEffect(() => {
    setValue(percentage);
  }, [percentage]);

  return (
    <CircularProgressbar
      className="font-medium"
      value={value}
      text={`${value}%`}
      styles={buildStyles({
        pathTransitionDuration: 2,
        textColor: darkMode ? slate["300"] : slate["500"],
        pathColor: tailwindConfig.theme.extend.colors.primary,
        trailColor: darkMode ? slate["600"] : slate["100"],
      })}
    />
  );
};

export default Circle;

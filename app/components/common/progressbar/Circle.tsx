"use client";

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  percentage: number;
  textColor?: string;
  pathColor?: string;
  trailColor?: string;
}

const Circle: React.FC<Props> = ({
  percentage,
  textColor,
  pathColor,
  trailColor,
}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(percentage);
  }, [percentage]);

  return (
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      styles={buildStyles({
        pathTransitionDuration: 1,
        textColor: textColor,
        pathColor: pathColor,
        trailColor: trailColor,
      })}
    />
  );
};

export default Circle;

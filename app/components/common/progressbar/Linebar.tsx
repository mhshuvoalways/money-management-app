"use client";

import React, { useEffect, useState } from "react";

interface Props {
  percentage: number;
}

const Linebar: React.FC<Props> = ({ percentage }) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(percentage);
  }, [percentage]);

  return (
    <div className="relative bg-slate-100 dark:bg-slate-600 rounded-full h-2">
      <p
        className={`absolute inset-0 bg-green-600 rounded-full transition-all duration-1000`}
        style={{
          width: `${value}%`,
        }}
      ></p>
    </div>
  );
};

export default Linebar;

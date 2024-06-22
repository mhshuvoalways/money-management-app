"use client";

import CheckBox from "@/app/components/common/headlessui/CheckBox";
import { useState } from "react";

const categoris = [
  "Food",
  "Transport",
  "Education",
  "Food",
  "Transport",
  "Education",
  "Food",
  "Transport",
  "Education",
];

interface Props {}

const List: React.FC<Props> = () => {
  const [checks, setChecks] = useState<string[]>([]);

  const checkHandler = (value: string) => {
    if (checks.includes(value)) {
      setChecks(checks.filter((el) => el !== value));
    } else {
      setChecks([...checks, value]);
    }
  };

  return (
    <>
      {categoris.map((category, index) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg p-2 transition"
          key={index}
          onClick={() => checkHandler(category)}
        >
          {checks.includes(category) ? (
            <CheckBox checked={true} />
          ) : (
            <CheckBox checked={false} />
          )}
          <p>{category}</p>
        </div>
      ))}
    </>
  );
};

export default List;

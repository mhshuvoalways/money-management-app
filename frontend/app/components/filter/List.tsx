"use client";

import CheckBox from "@/app/components/common/headlessui/CheckBox";

import { useState } from "react";

interface Props {
  items: string[];
}

const List: React.FC<Props> = ({ items }) => {
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
      {items.map((item, index) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg p-2 transition"
          key={index}
          onClick={() => checkHandler(item)}
        >
          {checks.includes(item) ? (
            <CheckBox checked={true} />
          ) : (
            <CheckBox checked={false} />
          )}
          <p>{item}</p>
        </div>
      ))}
    </>
  );
};

export default List;

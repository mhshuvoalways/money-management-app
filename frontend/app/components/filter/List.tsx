"use client";

import CheckBox from "@/app/components/common/headlessui/CheckBox";

interface Props {
  checks: string[];
  items: string[];
  filterHandler: (value: string) => void;
}

const List: React.FC<Props> = ({ checks, items, filterHandler }) => {
  return (
    <>
      {items.map((item, index) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg p-2 transition"
          key={index}
          onClick={() => filterHandler(item)}
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

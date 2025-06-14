"use client";

import ArrowBottom from "@/app/components/common/icons/ArrowBottom";
import CheckIcon from "@/app/components/common/icons/Check";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

interface Props {
  disabled?: boolean;
  className?: string;
  items: string[];
  value: string;
  onChangeHandler: (value: string) => void;
}

const ListBox: React.FC<Props> = ({
  className,
  items,
  value,
  onChangeHandler,
  disabled,
}) => {
  return (
    <Listbox value={value} onChange={onChangeHandler} disabled={disabled}>
      <ListboxButton
        className={`relative w-full py-1 h-10 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md flex items-center gap-5 justify-between hover:ring-1 focus:ring-1 ring-primary text-nowrap ${
          disabled ? "opacity-60" : "opacity-100"
        } ${className}`}
      >
        {value}
        <ArrowBottom className="size-4" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={
          "rounded-lg p-1 bg-slate-50 dark:bg-slate-800 shadow dark:border dark:border-slate-700 w-[var(--button-width)] z-20"
        }
      >
        {items?.map((li) => (
          <ListboxOption
            key={li}
            value={li}
            className={`flex group items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 data-[focus]:dark:bg-slate-700 cursor-pointer capitalize`}
          >
            <CheckIcon
              className={`invisible size-4 fill-white group-data-[selected]:visible`}
            />
            <p>{li}</p>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default ListBox;

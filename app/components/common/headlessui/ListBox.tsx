"use client";

import ArrowBottom from "@/app/components/common/icons/ArrowBottom";
import CheckIcon from "@/app/components/common/icons/Check";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

interface Props {
  list: string[];
  listName: string;
}

const ListBox: React.FC<Props> = ({ list, listName }) => {
  const [selected, setSelected] = useState(listName);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <ListboxButton className="relative w-full py-2 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md flex items-center justify-between hover:ring-1 focus:ring-1 ring-primary">
        {selected}
        <ArrowBottom className="size-4" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={
          "rounded-lg p-1 bg-slate-50 dark:bg-slate-800 shadow dark:border dark:border-slate-700 w-[var(--button-width)]"
        }
      >
        {list.map((li) => (
          <ListboxOption
            key={li}
            value={li}
            className={`flex group items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 data-[focus]:dark:bg-slate-700 cursor-pointer`}
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

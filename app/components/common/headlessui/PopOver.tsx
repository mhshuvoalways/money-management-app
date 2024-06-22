import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

interface Props {
  btnClick: React.ReactElement;
  children: React.ReactNode;
}

const PopOver: React.FC<Props> = ({ btnClick, children }) => {
  return (
    <Popover>
      <PopoverButton className="outline-0">{btnClick}</PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="bottom"
          className="rounded-lg p-6 bg-slate-50 dark:bg-slate-800 mt-4 shadow dark:border dark:border-slate-700 sm:min-w-72 z-20"
        >
          {children}
          <div className="flex justify-between items-center mt-5 gap-5">
            <PopoverButton className={"font-medium"}>Cancel</PopoverButton>
            <PopoverButton className="btn px-4 py-2">Show result</PopoverButton>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default PopOver;

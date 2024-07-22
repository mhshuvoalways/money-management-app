import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

interface Props {
  btnClick: React.ReactElement;
  children: React.ReactNode;
  className?: string;
  show: boolean;
  popupHandler?: (event: React.MouseEvent<ChildNode>) => void;
}

const PopOver: React.FC<Props> = ({
  btnClick,
  show,
  children,
  className,
  popupHandler,
}) => {
  return (
    <Popover>
      <PopoverButton className="outline-0 w-full">{btnClick}</PopoverButton>
      <Transition
        show={show}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="bottom"
          className={`rounded-lg p-6 bg-slate-50 dark:bg-slate-800 shadow dark:border dark:border-slate-700 z-20 ${className}`}
        >
          {children}
        </PopoverPanel>
      </Transition>
      {show && <p className="fixed inset-0 z-10" onClick={popupHandler}></p>}
    </Popover>
  );
};

export default PopOver;

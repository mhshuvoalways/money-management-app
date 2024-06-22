"use client";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";

interface Props {
  btnIcon: React.ReactElement;
  title?: string;
  children: React.ReactNode;
}

const DialogComponent: React.FC<Props> = ({ btnIcon, title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={openHandler}>{btnIcon}</div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={openHandler}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-lg p-6 bg-slate-50 dark:bg-slate-800">
                  <DialogTitle as="h3" className="text2">
                    {title}
                  </DialogTitle>
                  <div className={title && "mt-5"}>{children}</div>
                  <div className="flex justify-end mt-5">
                    <Button className="btn px-4 py-2" onClick={openHandler}>
                      Submit
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogComponent;

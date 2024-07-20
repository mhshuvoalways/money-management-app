import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface Props {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  openHandler: () => void;
}

const DialogComponent: React.FC<Props> = ({
  isOpen,
  title,
  children,
  openHandler,
}) => {
  return (
    <Transition show={isOpen}>
      <Dialog
        as="div"
        className="relative z-20 focus:outline-none"
        onClose={openHandler}
      >
        <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-lg p-6 bg-slate-50 dark:bg-slate-800 shadow">
                <DialogTitle
                  as="h3"
                  className={title && "text2 border-b pb-3 mb-5"}
                >
                  {title}
                </DialogTitle>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogComponent;

"use client";

import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import WalletSkeleton from "@/app/components/skeleton/WalletSkeleton";
import useTotalIncomeSum from "@/app/hooks/incomeExpense/useTotalSum";
import {
  dialogHandler,
  updateWalletAll,
  updateWalletsAllHandler,
} from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetWalletType } from "@/app/types/WalletType";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Props {
  selectedWallet: GetWalletType;
  setSelectedWallet: (wallet: GetWalletType) => void;
}

const Lists: React.FC<Props> = ({ selectedWallet, setSelectedWallet }) => {
  const { wallets, isLoadingGet } = useAppSelector(
    (state: RootState) => state.wallet
  );

  const { newArrayIncomeExpense } = useTotalIncomeSum();

  const dispatch = useAppDispatch();

  const newWallets = wallets.map((wallet) => {
    let balance = 0;
    newArrayIncomeExpense.forEach((transaction) => {
      if (transaction.wallet._id === wallet._id) {
        if (transaction.category.categoryType === "Income") {
          balance += transaction.amount;
        } else if (transaction.category.categoryType === "Expense") {
          balance -= transaction.amount;
        }
      }
    });
    return {
      _id: wallet._id,
      walletName: wallet.walletName,
      walletPosition: wallet.walletPosition,
      balance: balance,
    };
  });

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedWallets = Array.from(newWallets);
    const [reorderedItem] = reorderedWallets.splice(result.source.index, 1);
    reorderedWallets.splice(result.destination.index, 0, reorderedItem);

    const updatedWallets = reorderedWallets.map((category, index) => {
      return {
        ...category,
        walletPosition: index + 1,
      };
    });

    dispatch(updateWalletsAllHandler(updatedWallets));
    dispatch(updateWalletAll(updatedWallets));
  };

  const grid = 20;

  const getItemStyle = (_: boolean, draggableStyle: any) => ({
    padding: grid,
    margin: `0 0 ${grid}px 0`,
    ...draggableStyle,
  });

  return (
    <div className="w-full md:w-3/12">
      {isLoadingGet ? (
        <WalletSkeleton />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="wallets">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-5"
              >
                {newWallets?.map((wallet, index) => (
                  <Draggable
                    key={wallet._id}
                    draggableId={wallet._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`card flex justify-between items-center gap-2 cursor-pointer h-20 ${
                          selectedWallet._id === wallet._id && "bgGradient"
                        }`}
                        onClick={() => setSelectedWallet(wallet)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div>
                          <p
                            className={`text2 ${
                              selectedWallet._id === wallet._id &&
                              "text-slate-100"
                            }`}
                          >
                            {wallet.walletName}
                          </p>
                          <p
                            className={
                              selectedWallet._id === wallet._id
                                ? `font-medium text-slate-300`
                                : "text3"
                            }
                          >
                            {wallet.balance}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <EditIcon
                            className={`size-8 cursor-pointer text-primary hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                              selectedWallet._id === wallet._id
                                ? "dark:bg-slate-100"
                                : "dark:bg-slate-600"
                            }`}
                            onClick={() =>
                              dispatch(
                                dialogHandler({
                                  dialogName: "update",
                                  walletObj: wallet,
                                })
                              )
                            }
                          />
                          <TrashIcon
                            className={`size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                              selectedWallet._id === wallet._id
                                ? "dark:bg-slate-100"
                                : "dark:bg-slate-600"
                            }`}
                            onClick={() => {
                              dispatch(
                                dialogHandler({
                                  dialogName: "delete",
                                  walletObj: wallet,
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Lists;

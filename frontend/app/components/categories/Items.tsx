import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import TransactionSkeleton from "@/app/components/skeleton/TransactionSkeleton";
import {
  categoryHandler,
  updateCategoryAll,
  updateCategoryAllHandler,
} from "@/app/lib/features/categorySlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { GetCategoryType } from "@/app/types/CategoryType";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Props {
  categoryType: string;
  categories: GetCategoryType[];
  oppositeCategories: GetCategoryType[];
  isLoading: boolean;
}

const ItemRow: React.FC<Props> = ({
  categoryType,
  categories,
  oppositeCategories,
  isLoading,
}) => {
  const dispatch = useAppDispatch();

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedCategories = Array.from(categories);
    const [reorderedItem] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, reorderedItem);

    const updatedCategories = reorderedCategories.map((category, index) => {
      return {
        ...category,
        categoryPosition: index + 1,
      };
    });

    const combinedCategories = [...updatedCategories, ...oppositeCategories];

    dispatch(updateCategoryAllHandler(combinedCategories));
    dispatch(updateCategoryAll(updatedCategories));
  };

  return (
    <div className="card">
      <p className="text2">{categoryType} Categories</p>
      <div className="mt-5">
        {isLoading ? (
          <TransactionSkeleton />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {categories.map((category, index) => (
                    <Draggable
                      key={category._id}
                      draggableId={category._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={`flex items-center justify-between pt-3 dark:border-slate-500 ${
                            categories.length !== index + 1 && "border-b pb-3"
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex items-center gap-3">
                            <p
                              className={`size-8 rounded-full flex items-center justify-center`}
                              style={{
                                background: category.icon.bgColor,
                              }}
                            >
                              {category.icon.emoji}
                            </p>
                            <p className="text3 font-medium">
                              {category.categoryName}
                            </p>
                          </div>
                          <div className={`flex items-center gap-2`}>
                            <EditIcon
                              className="size-8 cursor-pointer text-secondary hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2"
                              onClick={() =>
                                dispatch(categoryHandler({ category }))
                              }
                            />
                            <TrashIcon
                              className="size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2"
                              onClick={() =>
                                dispatch(
                                  categoryHandler({
                                    category: category,
                                    dialog: true,
                                  })
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default ItemRow;

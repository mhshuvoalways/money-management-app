import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import { categoryHandler } from "@/app/lib/features/categorySlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { GetCategoryType } from "@/app/types/CategoryType";

interface Props {
  categoryType: string;
  categories: GetCategoryType[];
}

const ItemRow: React.FC<Props> = ({ categoryType, categories }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="card">
      <p className="text2">{categoryType} Categories</p>
      <div className="mt-5">
        {categories.map((category, index) => (
          <div
            className={`flex items-center justify-between pt-3 dark:border-slate-500 ${
              categories.length !== index + 1 && "border-b pb-3"
            }`}
            key={category._id}
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
              <p className="text3 font-medium">{category.categoryName}</p>
            </div>
            <div className={`flex items-center gap-2`}>
              <EditIcon
                className="size-8 cursor-pointer text-secondary hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2"
                onClick={() => dispatch(categoryHandler({ category }))}
              />
              <TrashIcon
                className="size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2"
                onClick={() =>
                  dispatch(
                    categoryHandler({ category: category, dialog: true })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemRow;

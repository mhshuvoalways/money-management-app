import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";

interface Item {
  id: number;
  icon: string;
  bg: string;
  name: string;
}

interface Props {
  categoryName: string;
  categories: Item[];
}

const ItemRow: React.FC<Props> = ({ categoryName, categories }) => {
  return (
    <div className="card">
      <p className="text2">{categoryName} Categories</p>
      <div className="mt-5">
        {categories.map((category, index) => (
          <div
            className={`flex items-center justify-between pt-3 dark:border-slate-500 ${
              categories.length !== index + 1 && "border-b pb-3"
            }`}
            key={category.id}
          >
            <div className="flex items-center gap-3">
              <p
                className={`size-9 rounded-full flex items-center justify-center`}
                style={{
                  background: category.bg,
                }}
              >
                {category.icon}
              </p>
              <p className="text3 font-medium">{category.name}</p>
            </div>
            <div className={`flex items-center gap-2`}>
              <EditIcon className="size-8 cursor-pointer text-secondary hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2" />
              <TrashIcon className="size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemRow;

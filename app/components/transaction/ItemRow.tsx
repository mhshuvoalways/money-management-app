import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";

interface Item {
  id: number;
  icon: string;
  category: string;
  date: string;
  account: string;
  amount: number;
  description: string;
}

interface Props {
  transactions: Item[];
}

const ItemRow: React.FC<Props> = ({ transactions }) => {
  return (
    <>
      {transactions.map((tran, index) => (
        <tr
          key={index}
          className={`font-medium rounded-lg border-t dark:border-slate-500`}
        >
          <td
            className={`px-4 pt-4 text-nowrap ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {tran.icon} {tran.category}
          </td>
          <td
            className={`px-4 pt-4 text-nowrap ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {tran.date}
          </td>
          <td
            className={`px-4 pt-4 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {tran.account}
          </td>
          <td
            className={`px-4 pt-4 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            ৳{tran.amount}
          </td>
          <td
            className={`px-4 pt-4 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {tran.description}
          </td>
          <td
            className={`px-4 pt-4 flex items-center gap-2 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            <EditIcon className="size-8 cursor-pointer text-primary hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2" />
            <TrashIcon className="size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ItemRow;

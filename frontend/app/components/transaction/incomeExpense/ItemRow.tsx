import EditIcon from "@/app/components/common/icons/Edit";
import TrashIcon from "@/app/components/common/icons/Trash";
import { expenseHandler } from "@/app/lib/features/expenseSlice";
import { incomeHandler } from "@/app/lib/features/incomeSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";
import formateDate from "@/app/utils/helpers/formateDate";

interface Props {
  transactionName: string;
  transactions: GetIncomeExpenseType[];
}

const ItemRow: React.FC<Props> = ({ transactionName, transactions }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {transactions.map((tran, index) => (
        <tr
          key={index}
          className={`font-medium rounded-lg border-t dark:border-slate-500`}
        >
          <td
            className={`px-4 pt-4 text-nowrap flex items-center gap-3 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {tran.category ? (
              <>
                <p
                  className="size-8 rounded-full flex items-center justify-center"
                  style={{
                    background: tran.category.icon.bgColor,
                  }}
                >
                  {tran.category.icon.emoji}
                </p>
                <p>{tran.category.categoryName}</p>
              </>
            ) : (
              <p>N/A</p>
            )}
          </td>
          <td
            className={`px-4 pt-4 text-nowrap ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {formateDate(tran.date)}
          </td>
          <td
            className={`px-4 pt-4 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            {tran.wallet?.walletName || <p>N/A</p>}
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
            <EditIcon
              className="size-8 cursor-pointer text-secondary hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2"
              onClick={() =>
                transactionName === "Income"
                  ? dispatch(incomeHandler({ income: tran }))
                  : dispatch(expenseHandler({ expense: tran }))
              }
            />
            <TrashIcon
              className="size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 dark:bg-slate-600 rounded py-1.5 px-2"
              onClick={() =>
                transactionName === "Income"
                  ? dispatch(incomeHandler({ income: tran, dialog: true }))
                  : dispatch(expenseHandler({ expense: tran, dialog: true }))
              }
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ItemRow;

interface Item {
  id: number;
  date: string;
  account: string;
  description: string;
  amount: number;
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
            {tran.description}
          </td>
          <td
            className={`px-4 pt-4 ${
              transactions.length !== index + 1 && "p-4"
            }`}
          >
            ৳{tran.amount}.00
          </td>
        </tr>
      ))}
    </>
  );
};

export default ItemRow;

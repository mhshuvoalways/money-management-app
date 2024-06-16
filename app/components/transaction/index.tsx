const transactions = [
  {
    id: 1,
    icon: "🍉",
    category: "Food",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 2,
    icon: "🚌",
    category: "Transport",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 3,
    icon: "🛍️",
    category: "Education",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 4,
    icon: "🍉",
    category: "Food",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 5,
    icon: "🚌",
    category: "Transport",
    date: "8 June, 2024",
    account: "DBBL",
    amount: -142,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 6,
    icon: "🛍️",
    category: "Education",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 7,
    icon: "🚌",
    category: "Transport",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 8,
    icon: "🛍️",
    category: "Education",
    date: "8 June, 2024",
    account: "DBBL",
    amount: -342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 9,
    icon: "🍉",
    category: "Food",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description:
      "Grocery Items and Beverage soft drinks. Grocery Items and Beverage soft drinks",
  },
];

interface Props {}

const Transaction: React.FC<Props> = () => {
  return (
    <div className="card w-full md:w-8/12">
      <p className="text2">Transactions History</p>
      <div className="mt-5 overflow-auto h-80 pr-2 expense-scroll">
        <table className="w-full text3">
          <thead className="text-left">
            <tr>
              <th className="px-4 pb-4 font-bold">Category</th>
              <th className="px-4 pb-4 font-bold">Date</th>
              <th className="px-4 pb-4 font-bold">Account</th>
              <th className="px-4 pb-4 font-bold">Amount</th>
              <th className="px-4 pb-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tran, index) => (
              <tr
                key={tran.id}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

import ItemRow from "@/app/components/transaction/goal/ItemRow";

const transactions = [
  {
    id: 1,
    icon: "🍉",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 2,
    icon: "🚌",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 3,
    icon: "🛍️",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 4,
    icon: "🍉",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 5,
    icon: "🚌",
    date: "8 June, 2024",
    account: "DBBL",
    amount: -142,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 6,
    icon: "🛍️",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 7,
    icon: "🚌",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 8,
    icon: "🛍️",
    date: "8 June, 2024",
    account: "DBBL",
    amount: -342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 9,
    icon: "🍉",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description:
      "Grocery Items and Beverage soft drinks. Grocery Items and Beverage soft drinks",
  },

  {
    id: 1,
    icon: "🍉",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 2,
    icon: "🚌",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 3,
    icon: "🛍️",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 4,
    icon: "🍉",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 5,
    icon: "🚌",
    date: "8 June, 2024",
    account: "DBBL",
    amount: -142,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 6,
    icon: "🛍️",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 7,
    icon: "🚌",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 8,
    icon: "🛍️",
    date: "8 June, 2024",
    account: "DBBL",
    amount: -342,
    description: "Grocery Items and Beverage soft drinks",
  },
  {
    id: 9,
    icon: "🍉",
    date: "8 June, 2024",
    account: "DBBL",
    amount: 342,
    description:
      "Grocery Items and Beverage soft drinks. Grocery Items and Beverage soft drinks",
  },
];

interface Props {
  home?: boolean;
}

const Transaction: React.FC<Props> = ({ home }) => {
  return (
    <div className={`card`}>
      <p className="text2">History</p>
      <div
        className={`mt-5 overflow-auto pr-2 card-scroll ${
          home ? "h-80" : "max-h-[calc(100vh/1.05)]"
        }`}
      >
        <table className="w-full text3">
          <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
            <tr>
              <th className="px-4 pb-4 font-bold">Date</th>
              <th className="px-4 pb-4 font-bold">Wallet</th>
              <th className="px-4 pb-4 font-bold">Description</th>
              <th className="px-4 pb-4 font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <ItemRow transactions={transactions} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

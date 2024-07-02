import DatePicker from "@/app/components/common/input/DatePicker";
import Amount from "@/app/components/filter/Amount";
import ListComponent from "@/app/components/filter/List";
import Search from "@/app/components/filter/Search";
import TableHead from "@/app/components/filter/TableHead";
import ItemRow from "@/app/components/transaction/incomeExpense/ItemRow";

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

interface Props {
  home?: boolean;
}

const Transaction: React.FC<Props> = ({ home }) => {
  return (
    <div className={`card`}>
      <p className="text2">Transactions History</p>
      <div
        className={`mt-5 overflow-auto pr-2 card-scroll ${
          home ? "h-80" : "max-h-[calc(100vh/1.05)]"
        }`}
      >
        <table className="w-full text3">
          <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
            <tr>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Category">
                  <ListComponent />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Date">
                  <DatePicker />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Account">
                  <ListComponent />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Amount">
                  <Amount />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Description">
                  <Search />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">Action</th>
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

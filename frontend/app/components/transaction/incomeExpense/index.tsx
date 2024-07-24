"use client";

import DatePicker from "@/app/components/common/input/DatePicker";
import Amount from "@/app/components/filter/Amount";
import ListComponent from "@/app/components/filter/List";
import Search from "@/app/components/filter/Search";
import TableHead from "@/app/components/filter/TableHead";
import ItemRow from "@/app/components/transaction/incomeExpense/ItemRow";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

interface Props {
  home?: boolean;
}

const Transaction: React.FC<Props> = ({ home }) => {
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { categories } = useAppSelector((state: RootState) => state.category);
  const { wallets } = useAppSelector((state: RootState) => state.wallet);

  const newCategories: string[] = [];
  categories.forEach((item) => {
    if (item.categoryType === "Income") {
      newCategories.push(item.categoryName);
    }
  });

  const newWallets: string[] = [];
  wallets.forEach((item) => {
    newWallets.push(item.walletName);
  });

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
                  <ListComponent items={newCategories} />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Date">
                  <DatePicker dateHandler={() => {}} />
                </TableHead>
              </th>
              <th className="px-4 pb-4 font-bold">
                <TableHead thName="Wallet">
                  <ListComponent items={newWallets} />
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
            <ItemRow transactions={incomes} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

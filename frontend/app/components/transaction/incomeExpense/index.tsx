"use client";

import DatePicker from "@/app/components/common/input/DatePicker";
import Amount from "@/app/components/filter/Amount";
import ListComponent from "@/app/components/filter/List";
import Search from "@/app/components/filter/Search";
import TableHead from "@/app/components/filter/TableHead";
import ItemRow from "@/app/components/transaction/incomeExpense/ItemRow";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";
import { useState } from "react";
import SkeletonLoading from "../../common/skeleton";
import TransactionSkeleton from "../../skeleton/TransactionSkeleton";

interface Props {
  transactionName: string;
  totalCount: number;
  transactions: GetIncomeExpenseType[];
  isLoading: boolean;
}

const Transaction: React.FC<Props> = ({
  transactionName,
  totalCount,
  transactions,
  isLoading,
}) => {
  const [filterObj, setFilterObj] = useState({
    categoryName: [],
    date: new Date(),
    walletName: [],
    amount: 0,
    description: "",
  });
  const { categories } = useAppSelector((state: RootState) => state.category);
  const { wallets } = useAppSelector((state: RootState) => state.wallet);

  const newCategories: string[] = [];
  categories.forEach((item) => {
    if (item.categoryType === transactionName) {
      newCategories.push(item.categoryName);
    }
  });

  const newWallets: string[] = [];
  wallets.forEach((item) => {
    newWallets.push(item.walletName);
  });

  const filterHandler = () => {
    setFilterObj({
      ...filterObj,
    });
  };

  return (
    <div className={`card`}>
      <div className="flex justify-between gap-5 pr-8">
        <p className="text2">Transactions History</p>
        <div className="border-b pb-2 dark:border-gray-500">
          <p className="text2">
            Total {transactionName}
            <small className="font-extralight"> (based on filter)</small>
          </p>
          {isLoading ? (
            <div className="w-6/12 ml-auto">
              <SkeletonLoading />
            </div>
          ) : (
            <p className="text1 text-end">${totalCount}</p>
          )}
        </div>
      </div>
      <div
        className={`mt-10 overflow-auto pr-2 card-scroll max-h-[calc(100vh/1.05)]`}
      >
        {isLoading ? (
          <TransactionSkeleton />
        ) : (
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
              <ItemRow
                transactions={transactions}
                transactionName={transactionName}
              />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transaction;

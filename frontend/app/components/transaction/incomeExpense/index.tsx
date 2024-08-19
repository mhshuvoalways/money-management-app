"use client";

import DatePicker from "@/app/components/common/input/DatePicker";
import SkeletonLoading from "@/app/components/common/skeleton";
import Amount from "@/app/components/filter/Amount";
import ListComponent from "@/app/components/filter/List";
import Search from "@/app/components/filter/Search";
import TableHead from "@/app/components/filter/TableHead";
import TransactionSkeleton from "@/app/components/skeleton/TransactionSkeleton";
import ItemRow from "@/app/components/transaction/incomeExpense/ItemRow";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";
import { useEffect, useState } from "react";
import Pagination from "../../pagination";

interface Props {
  transactionName: string;
  totalCount: number;
  transactions: GetIncomeExpenseType[];
  isLoading: boolean;
}

const itemsEachPage = 10;

const Transaction: React.FC<Props> = ({
  transactionName,
  totalCount,
  transactions,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [transactionsHeight, setTransactionsHeight] = useState<number>(0);
  const [checks, setChecks] = useState<string[]>([]);

  useEffect(() => {
    setTotalPage(Math.ceil(transactions.length / itemsEachPage));
  }, [transactions.length]);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const calculatedHeight = screenHeight - 335;
    setTransactionsHeight(calculatedHeight);
  }, []);

  const { categories } = useAppSelector((state: RootState) => state.category);
  const { wallets } = useAppSelector((state: RootState) => state.wallet);

  const pageHandler = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

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

  const filterWalletHandler = (value: string) => {
    if (checks.includes(value)) {
      setChecks(checks.filter((el) => el !== value));
    } else {
      setChecks([...checks, value]);
    }
  };

  const startIdx = (currentPage - 1) * itemsEachPage;
  const endIdx = startIdx + itemsEachPage;
  const currentTransactions = transactions.slice(startIdx, endIdx);

  return (
    <div className="w-full lg:w-8/12 space-y-5">
      <div className={`card`}>
        <div className="flex justify-between gap-5 pr-8">
          <p className="text2">Transactions History</p>
          <div className="border-b pb-2 dark:border-gray-500">
            <p className="text3">
              Total {transactionName}
              <small className="font-extralight"> (based on filter)</small>
            </p>
            {isLoading ? (
              <div className="w-6/12 ml-auto">
                <SkeletonLoading />
              </div>
            ) : (
              <p className="text2 text-end">${totalCount}</p>
            )}
          </div>
        </div>
        <div
          className={`mt-10 overflow-auto pr-2 card-scroll`}
          style={{
            maxHeight: `${transactionsHeight}px`,
          }}
        >
          {isLoading ? (
            <TransactionSkeleton />
          ) : (
            <table className="w-full text3">
              <thead className="text-left sticky top-0 bg-white dark:bg-slate-700">
                <tr>
                  <th className="px-4 pb-4 font-bold">
                    <TableHead thName="Category">
                      <ListComponent
                        checks={checks}
                        items={newCategories}
                        filterHandler={filterWalletHandler}
                      />
                    </TableHead>
                  </th>
                  <th className="px-4 pb-4 font-bold">
                    <TableHead thName="Date">
                      <DatePicker dateHandler={() => {}} />
                    </TableHead>
                  </th>
                  <th className="px-4 pb-4 font-bold">
                    <TableHead thName="Wallet">
                      <ListComponent
                        checks={checks}
                        items={newWallets}
                        filterHandler={filterWalletHandler}
                      />
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
                  transactions={currentTransactions}
                  transactionName={transactionName}
                />
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        pageHandler={pageHandler}
        itemsLength={transactions.length}
      />
    </div>
  );
};

export default Transaction;

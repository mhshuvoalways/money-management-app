import ExpenseBreakDown from "@/app/components/breakdown";
import Button from "@/app/components/common/button";
import Header from "@/app/components/common/header";
import PlusIcon from "@/app/components/common/icons/Plus";
import ExpenseCalculate from "@/app/components/dashboard/Items";
import Pagination from "@/app/components/pagination";
import Transaction from "@/app/components/transaction";
import AddExpense from "@/app/components/transaction/AddIncome";

const page = () => {
  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap items-end">
        <div>
          <p className="text1">Expense!</p>
          <p className="text3">{`Here's what's happening with your expenses.`}</p>
        </div>
        <Button
          name="Add Expense"
          icon={<PlusIcon className="size-5" />}
          className="px-4"
        />
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <ExpenseCalculate
            title="This Month Expense"
            balance={43252}
            trend={false}
          />
          <AddExpense />
          <ExpenseBreakDown title="This Month Breakdown" />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Transaction />
          <Pagination />
        </div>
      </div>
    </Header>
  );
};

export default page;

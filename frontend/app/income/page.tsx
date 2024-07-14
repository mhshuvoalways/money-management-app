import IncomeBreakDown from "@/app/components/breakdown";
import Header from "@/app/components/common/header";
import IncomeCalculate from "@/app/components/dashboard/Items";
import Pagination from "@/app/components/pagination";
import Transaction from "@/app/components/transaction/incomeExpense";
import AddIncome from "@/app/components/transaction/incomeExpense/AddTransaction";

const page = () => {
  return (
    <Header>
      <p className="text1">Income!</p>
      <p className="text3">{`Here's what's happening with your income.`}</p>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <IncomeCalculate
            title="This Month Income"
            balance={43252}
            trend={false}
          />
          <AddIncome />
          <IncomeBreakDown title="This Month Breakdown" />
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

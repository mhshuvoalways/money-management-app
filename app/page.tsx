import AreaChart from "@/app/components/charts/Area";
import Header from "@/app/components/common/header";
import DashboardItem from "@/app/components/dashboard/Items";
import ExpensesBreakDown from "@/app/components/expenses/ExpensesBreakDown";
import Savings from "@/app/components/saving";
import Transaction from "@/app/components/transaction";

const items = [
  {
    id: 1,
    title: "Total Balance",
    balance: 43268,
    trend: true,
  },
  {
    id: 2,
    title: "Monthly Income",
    balance: 43268,
    trend: false,
  },
  {
    id: 1,
    title: "Monthly Expense",
    balance: 43268,
    trend: true,
  },
  {
    id: 1,
    title: "Monthly Saving",
    balance: 43268,
    trend: false,
  },
];

const page = () => {
  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap">
        <div>
          <p className="text1">Good Morning, MH Shuvo!</p>
          <p className="text3">{`Here's what's happening with your state.`}</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <button className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md hover:rounded-lg transition-all">
            Week
          </button>
          <button className="btn px-3 py-1">Month</button>
          <button className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md hover:rounded-lg transition-all">
            Year
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 mt-10">
        {items.map((item) => (
          <DashboardItem
            key={item.id}
            title={item.title}
            balance={item.balance}
            trend={item.trend}
          />
        ))}
      </div>
      <div className="flex mt-10 gap-10 flex-wrap sm:flex-nowrap flex-col-reverse md:flex-row">
        <AreaChart />
        <ExpensesBreakDown />
      </div>
      <div className="flex mt-10 gap-10 flex-wrap md:flex-nowrap">
        <Savings />
        <Transaction />
      </div>
    </Header>
  );
};

export default page;

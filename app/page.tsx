import AreaChart from "@/app/components/charts/Area";
import Header from "@/app/components/common/header";
import DashboardItem from "@/app/components/dashboard/Items";
import ExpensesBreakDown from "@/app/components/expenses/ExpensesBreakDown";

const items = [
  {
    id: 1,
    title: "Total Balance",
    balance: 43268,
    trend: true,
  },
  {
    id: 2,
    title: "Income of this month",
    balance: 43268,
    trend: false,
  },
  {
    id: 1,
    title: "Expense of this month",
    balance: 43268,
    trend: true,
  },
  {
    id: 1,
    title: "Current Balance",
    balance: 43268,
    trend: false,
  },
];

const page = () => {
  return (
    <Header>
      <p className="text1">Good Morning, MH Shuvo!</p>
      <p className="text3">{`Here's what's happening with your store today.`}</p>
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
      <div className="flex mt-10 gap-10 flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row">
        <AreaChart />
        <ExpensesBreakDown />
      </div>
      <div className="flex mt-10 gap-10 flex-wrap sm:flex-nowrap">
        <div className="card w-full sm:w-4/12">
          <p className="text2">Balance Trends</p>
          <p className="text1 mt-3">$221,478</p>
        </div>
        <AreaChart />
      </div>
    </Header>
  );
};

export default page;

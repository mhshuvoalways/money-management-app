import ExpensesBreakDown from "@/app/components/breakdown";
import AreaChart from "@/app/components/charts/Area";
import BarComponent from "@/app/components/charts/Bar";
import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import Header from "@/app/components/common/header";
import DashboardItem from "@/app/components/dashboard/Items";
import Savings from "@/app/components/saving";
import Goal from "@/app/components/saving/Goal";
import Transaction from "@/app/components/transaction/dashboard";

const items = [
  {
    id: 1,
    title: "Total Balance",
    balance: 43268,
    trend: true,
  },
  {
    id: 2,
    title: "Average Income",
    balance: 43268,
    trend: false,
  },
  {
    id: 3,
    title: "Average Expense",
    balance: 43268,
    trend: true,
  },
  {
    id: 4,
    title: "Average Saving",
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
        <div className="flex gap-2 items-end flex-wrap">
          <NoGradientButton
            name="Day"
            className="px-3 py-1 bg-slate-200 dark:bg-slate-700"
          />
          <NoGradientButton
            name="Week"
            className="px-3 py-1 bg-slate-200 dark:bg-slate-700"
          />
          <GradientButton name="Month" className="px-3 py-1" />
          <NoGradientButton
            name="Year"
            className="px-3 py-1 bg-slate-200 dark:bg-slate-700"
          />
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
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-8/12">
          <AreaChart />
        </div>
        <div className="w-full lg:w-4/12">
          <ExpensesBreakDown title="Monthly Expenses Breakdown" />
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12">
          <Savings />
        </div>
        <div className="w-full lg:w-8/12">
          <BarComponent />
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12">
          <Goal />
        </div>
        <div className="w-full lg:w-8/12">
          <Transaction home />
        </div>
      </div>
    </Header>
  );
};

export default page;

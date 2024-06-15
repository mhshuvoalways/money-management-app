import Header from "@/app/components/common/header";
import TrendUpIcon from "@/app/components/common/icons/TrendUp";

const page = () => {
  return (
    <Header>
      <p className="text1">Good Morning, MH Shuvo!</p>
      <p className="text3">Here's what's happening with your store today.</p>
      <div className="mt-10 card">
        <p className="text2">Total Balance</p>
        <p className="text-2xl font-semibold mt-3">$43268</p>
        <p className="border-b dark:border-slate-500 my-3"></p>
        <div className="flex items-center gap-1">
          <TrendUpIcon className="size-6 text-green-600" />
          <p className="text-green-600">2.47%</p>
          <p className="text3">Last month</p>
          <p className="font-medium text3">$24,478</p>
        </div>
      </div>
    </Header>
  );
};

export default page;

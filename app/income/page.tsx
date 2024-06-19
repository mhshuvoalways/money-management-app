import IncomeBreakDown from "@/app/components/breakdown";
import Header from "@/app/components/common/header";
import PlusIcon from "@/app/components/common/icons/Plus";
import IncomeCalculate from "@/app/components/dashboard/Items";
import MonthYear from "@/app/components/filter/MonthYear";
import Transaction from "@/app/components/transaction";

const page = () => {
  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap items-end">
        <div>
          <p className="text1">Income!</p>
          <p className="text3">{`Here's what's happening with your income.`}</p>
        </div>
        <div className="flex items-center gap-5">
          <MonthYear />
          <button className="btn flex items-center gap-2 px-4 py-2">
            <PlusIcon className="size-5" />
            Add Income
          </button>
        </div>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap items-baseline">
        <div className="w-full lg:w-4/12 space-y-10">
          <IncomeCalculate
            title="This Month Income"
            balance={43252}
            trend={false}
          />
          <IncomeBreakDown title="Monthly Incomes Breakdown" />
        </div>
        <div className="w-full lg:w-8/12">
          <Transaction />
        </div>
      </div>
    </Header>
  );
};

export default page;

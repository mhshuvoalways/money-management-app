import MoneyIcon from "@/app/components/common/icons/Money";
import TrendDownIcon from "@/app/components/common/icons/TrendDown";
import TrendUpIcon from "@/app/components/common/icons/TrendUp";

interface Props {
  title: string;
  balance: number;
  trend: boolean;
}

const Items: React.FC<Props> = ({ title, balance, trend }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div>
          <p className="text2">{title}</p>
          <p className="text1 mt-3">${balance}</p>
        </div>
        <MoneyIcon className="size-10 text-primary bg-slate-100 dark:bg-slate-600 rounded-full p-1.5" />
      </div>
      <p className="border-b dark:border-slate-500 my-3"></p>
      <div className="flex items-center gap-1">
        {trend ? (
          <TrendUpIcon className="size-5 text-green-600" />
        ) : (
          <TrendDownIcon className="size-5 text-red-600" />
        )}
        <p className={trend ? "text-green-600" : "text-red-600"}>2.47%</p>
        <p className="text-slate-400 text-sm">Last month</p>
        <p className="text3 text-sm font-medium">$24,478</p>
      </div>
    </div>
  );
};

export default Items;

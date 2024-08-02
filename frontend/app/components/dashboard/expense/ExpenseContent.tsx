import TrendDownIcon from "@/app/components/common/icons/TrendDown";
import TrendUpIcon from "@/app/components/common/icons/TrendUp";

interface Props {
  title: string;
  firstValue: number;
  isIncrease: boolean;
  percentageChange: number;
  calculateFor: string;
  lastValue: number;
}

const ItemContent: React.FC<Props> = ({
  title,
  firstValue,
  isIncrease,
  percentageChange,
  calculateFor,
  lastValue,
}) => {
  return (
    <div className="card">
      <p className="text2">{title}</p>
      <p className="text1 mt-3">${firstValue}</p>
      <p className="border-b dark:border-slate-500 my-3"></p>
      <div className="flex items-center gap-1">
        {isIncrease ? (
          <TrendUpIcon className={`size-5 text-red-600`} />
        ) : (
          <TrendDownIcon className={`size-5 text-green-600`} />
        )}
        <p className={isIncrease ? "text-red-600" : "text-green-600"}>
          {percentageChange.toFixed(2)}%
        </p>
        <p className="text-slate-400 text-sm">{calculateFor}</p>
        <p className="text3 text-sm font-medium">${lastValue}</p>
      </div>
    </div>
  );
};

export default ItemContent;

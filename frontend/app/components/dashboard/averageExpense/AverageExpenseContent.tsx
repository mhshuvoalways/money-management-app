import TrendDownIcon from "@/app/components/common/icons/TrendDown";
import TrendUpIcon from "@/app/components/common/icons/TrendUp";

const averages: string[] = ["daily", "weekly", "monthly", "yearly"];

interface Props {
  title: string;
  firstValue: number;
  isIncrease: boolean;
  percentageChange: number;
  calculateFor: string;
  lastValue: number;
  setSelectTime: (value: string) => void;
  selectTime: string;
}

const ItemContent: React.FC<Props> = ({
  title,
  firstValue,
  isIncrease,
  percentageChange,
  calculateFor,
  lastValue,
  setSelectTime,
  selectTime,
}) => {
  return (
    <div className="card h-40 overflow-hidden">
      <div className="flex items-center gap-2 justify-between">
        <p className="text3 font-medium">{title}</p>
        <div className="flex items-center gap-1">
          {averages.map((av) => (
            <p
              key={av}
              className={`capitalize text-xs cursor-pointer hover:text-primary font-medium ${
                av === selectTime ? "text-primary" : ""
              }`}
              onClick={() => setSelectTime(av)}
            >
              {av}
            </p>
          ))}
        </div>
      </div>
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

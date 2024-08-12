import useAverage from "@/app/hooks/incomeExpense/useAverage";
import useSum from "@/app/hooks/incomeExpense/useSum";
import timeCalFunc from "@/app/utils/helpers/timeWordCalc";
import { useState } from "react";
import AverageIncomeContent from "./AverageSavingContent";

interface Props {}

const Items: React.FC<Props> = () => {
  const [selectTime, setSelectTime] = useState<string>("monthly");

  const { firstValue: firstAverageIncome } = useAverage("income", selectTime);
  const { firstValue: firstAverageExpense } = useAverage("expense", selectTime);

  const { lastCalc: lastCalcIncome } = useSum("income", selectTime);
  const { lastCalc: lastCalcExpense } = useSum("expense", selectTime);

  const firstValue = Number(
    (firstAverageIncome - firstAverageExpense).toFixed(2)
  );
  const secondValue = Number((lastCalcIncome - lastCalcExpense).toFixed(2));

  const isIncrease = firstValue < secondValue;

  const percentageChange =
    firstValue !== 0 ? ((secondValue - firstValue) / firstValue) * 100 : 0;

  return (
    <AverageIncomeContent
      title={"Avg. Saving"}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      firstValue={firstValue}
      lastValue={secondValue}
      calculateFor={`of last ${timeCalFunc(selectTime)}`}
      setSelectTime={setSelectTime}
      selectTime={selectTime}
    />
  );
};

export default Items;

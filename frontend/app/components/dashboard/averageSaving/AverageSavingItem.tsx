import useAverage from "@/app/hooks/incomeExpense/useAverage";
import { useState } from "react";
import AverageIncomeContent from "./AverageSavingContent";

interface Props {}

const Items: React.FC<Props> = () => {
  const [selectTime, setSelectTime] = useState<string>("monthly");

  const { firstValue: firstAverageIncome, secondValue: secondAverageIncome } =
    useAverage("income", selectTime);
  const { firstValue: firstAverageExpense, secondValue: secondAverageExpense } =
    useAverage("expense", selectTime);

  const firstValue = Number(
    (firstAverageIncome - firstAverageExpense).toFixed(2)
  );
  const secondValue = Number(
    (secondAverageIncome - secondAverageExpense).toFixed(2)
  );

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
      calculateFor={`of this month's`}
      setSelectTime={setSelectTime}
      selectTime={selectTime}
    />
  );
};

export default Items;

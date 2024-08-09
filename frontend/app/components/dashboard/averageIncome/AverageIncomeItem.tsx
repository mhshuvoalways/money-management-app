import useAverage from "@/app/hooks/incomeExpense/useAverage";
import { useState } from "react";
import AverageIncomeContent from "./AverageIncomeContent";

interface Props {}

const Items: React.FC<Props> = ({}) => {
  const [selectTime, setSelectTime] = useState<string>("monthly");

  const { firstValue, secondValue } = useAverage("income", selectTime);

  const isIncrease = firstValue < secondValue;

  const percentageChange =
    firstValue !== 0 ? ((secondValue - firstValue) / firstValue) * 100 : 0;

  return (
    <AverageIncomeContent
      title={"Avg. Income"}
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

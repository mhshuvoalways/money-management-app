import useAverage from "@/app/hooks/incomeExpense/useAverage";
import useSum from "@/app/hooks/incomeExpense/useSum";
import timeCalFunc from "@/app/utils/helpers/timeWordCalc";
import { useState } from "react";
import AverageExpenseContent from "./AverageExpenseContent";

interface Props {}

const Items: React.FC<Props> = () => {
  const [selectTime, setSelectTime] = useState<string>("monthly");

  const { firstValue } = useAverage("expense", selectTime);
  const { lastCalc } = useSum("expense", selectTime);

  const isIncrease = firstValue < lastCalc;

  const percentageChange =
    firstValue !== 0 ? ((lastCalc - firstValue) / firstValue) * 100 : 0;

  return (
    <AverageExpenseContent
      title={"Avg. Expense"}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      firstValue={firstValue}
      lastValue={lastCalc}
      calculateFor={`of last ${timeCalFunc(selectTime)}`}
      selectTime={selectTime}
      setSelectTime={setSelectTime}
    />
  );
};

export default Items;

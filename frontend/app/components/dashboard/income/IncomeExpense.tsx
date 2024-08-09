import useSum from "@/app/hooks/incomeExpense/useSum";
import IncomeExpenseContent from "./IncomeExpenseContent";

interface Props {}

const Items: React.FC<Props> = () => {
  const { currentMonthCalc, lastMonthCalc } = useSum("income");

  const isIncrease = lastMonthCalc < currentMonthCalc;

  const percentageChange =
    lastMonthCalc !== 0
      ? ((currentMonthCalc - lastMonthCalc) / lastMonthCalc) * 100
      : 0;

  return (
    <IncomeExpenseContent
      title={"This Month Income"}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      firstValue={currentMonthCalc}
      lastValue={lastMonthCalc}
      calculateFor={"from last month"}
    />
  );
};

export default Items;

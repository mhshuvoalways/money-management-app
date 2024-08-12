import useSum from "@/app/hooks/incomeExpense/useSum";
import IncomeExpenseContent from "./IncomeExpenseContent";

interface Props {}

const Items: React.FC<Props> = () => {
  const { currentCalc, lastCalc } = useSum("income", "monthly");

  const isIncrease = lastCalc < currentCalc;

  const percentageChange =
    lastCalc !== 0 ? ((currentCalc - lastCalc) / lastCalc) * 100 : 0;

  return (
    <IncomeExpenseContent
      title={"This Month Income"}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      firstValue={currentCalc}
      lastValue={lastCalc}
      calculateFor={"from last month"}
    />
  );
};

export default Items;

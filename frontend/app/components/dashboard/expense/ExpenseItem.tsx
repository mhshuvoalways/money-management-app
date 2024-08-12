import useSum from "@/app/hooks/incomeExpense/useSum";
import ExpenseContent from "./ExpenseContent";

interface Props {}

const Items: React.FC<Props> = () => {
  const { currentCalc, lastCalc } = useSum("expense", "monthly");

  const isIncrease = lastCalc < currentCalc;

  const percentageChange =
    lastCalc !== 0 ? ((currentCalc - lastCalc) / lastCalc) * 100 : 0;

  return (
    <ExpenseContent
      title={"This Month Expense"}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      firstValue={currentCalc}
      lastValue={lastCalc}
      calculateFor={"from last month"}
    />
  );
};

export default Items;

import ExpenseContent from "./ExpenseContent";

interface Props {
  title: string;
  firstValue: number;
  secondValue: number;
  calculateFor: string;
}

const Items: React.FC<Props> = ({
  title,
  firstValue,
  secondValue,
  calculateFor,
}) => {
  const isIncrease = secondValue < firstValue;

  const percentageChange =
    firstValue !== 0 ? ((firstValue - secondValue) / secondValue) * 100 : 0;

  return (
    <ExpenseContent
      title={title}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      firstValue={firstValue}
      lastValue={secondValue}
      calculateFor={calculateFor}
    />
  );
};

export default Items;

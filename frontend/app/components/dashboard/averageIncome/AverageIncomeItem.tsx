import AverageIncomeContent from "./AverageIncomeContent";

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
  const isIncrease = firstValue < secondValue;

  const percentageChange =
    firstValue !== 0 ? ((secondValue - firstValue) / firstValue) * 100 : 0;

  return (
    <AverageIncomeContent
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

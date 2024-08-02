import ItemContent from "./ItemContent";

interface Props {
  title: string;
  firstValue: number;
  secondValue: number;
  calculateFor: string;
  trendColor?: string;
}

const Items: React.FC<Props> = ({
  title,
  firstValue,
  secondValue,
  calculateFor,
  trendColor,
}) => {
  const isIncrease = firstValue < secondValue;

  const percentageChange =
    firstValue !== 0 ? ((secondValue - firstValue) / firstValue) * 100 : 0;

  return (
    <ItemContent
      title={title}
      isIncrease={isIncrease}
      percentageChange={percentageChange}
      trendColor={trendColor}
      firstValue={firstValue}
      lastValue={secondValue}
      calculateFor={calculateFor}
    />
  );
};

export default Items;

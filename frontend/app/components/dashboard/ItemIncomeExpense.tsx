import ItemContent from "./ItemContent";

interface Props {
  title: string;
  firstValue: number;
  secondValue: number;
  trendColor?: string;
  calculateFor: string;
}

const Items: React.FC<Props> = ({
  title,
  firstValue,
  secondValue,
  trendColor,
  calculateFor,
}) => {
  const isIncrease = secondValue < firstValue;

  const percentageChange =
    firstValue !== 0 ? ((firstValue - secondValue) / secondValue) * 100 : 0;

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

import List from "@/app/types/Goal";

interface Props {
  className?: string;
  goal: List;
}

const Calc: React.FC<Props> = ({ className, goal }) => {
  return (
    <div className={className}>
      <p className="text2">{goal.name}</p>
      <div className="flex items-center gap-1">
        <p className="font-medium">${goal.fulfilled}.00</p>
        <p className="font-medium opacity-80">/</p>
        <p className="font-medium opacity-80">${goal.totalAmount}.00</p>
      </div>
    </div>
  );
};

export default Calc;

import { GetGoalsType } from "@/app/types/GoalType";

interface Props {
  className?: string;
  goal: GetGoalsType;
}

const Calc: React.FC<Props> = ({ className, goal }) => {
  let contriSum = 0;
  goal.contributions.forEach((el) => {
    contriSum += Number(el.contribution);
  });

  return (
    <div className={className}>
      <p className="text2">{goal.goalName}</p>
      <div className="flex items-center gap-1">
        <p className="font-medium">${contriSum + goal.saved}</p>
        <p className="font-medium opacity-80">/</p>
        <p className="font-medium opacity-80">${goal.targetAmount}</p>
      </div>
    </div>
  );
};

export default Calc;

import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const GoalProgressSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card h-36 flex flex-col justify-evenly">
      <SkeletonLoading count={count} />
      <SkeletonLoading count={count} className="!w-6/12" />
    </div>
  );
};

export default GoalProgressSkeleton;

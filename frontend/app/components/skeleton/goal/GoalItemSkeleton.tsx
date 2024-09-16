import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const GoalItemSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="card h-24 flex flex-col justify-between" key={index}>
          <SkeletonLoading count={count} />
          <SkeletonLoading count={count} className="!w-6/12" />
        </div>
      ))}
    </>
  );
};

export default GoalItemSkeleton;

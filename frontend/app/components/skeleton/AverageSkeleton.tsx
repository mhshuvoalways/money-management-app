import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const AverageSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card h-40 flex flex-col justify-between">
      <SkeletonLoading count={count} className="!w-3/12" />
      <SkeletonLoading count={count} className="!w-6/12" />
      <SkeletonLoading count={count} />
    </div>
  );
};

export default AverageSkeleton;

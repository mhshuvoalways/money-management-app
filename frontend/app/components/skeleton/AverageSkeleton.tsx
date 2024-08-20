import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const AverageSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card h-40 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <SkeletonLoading count={count} className="!w-28" />
        <SkeletonLoading count={count} className="!w-28" />
      </div>
      <SkeletonLoading count={count} className="!w-6/12" />
      <SkeletonLoading count={count} className="!w-8/12" />
    </div>
  );
};

export default AverageSkeleton;

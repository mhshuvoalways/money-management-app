import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const AverageSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card h-96 flex flex-col justify-between">
      <SkeletonLoading count={count} className="!w-2/12" />
      <SkeletonLoading count={count} className="!w-4/12" />
      <SkeletonLoading count={count} className="!w-6/12" />
      <SkeletonLoading count={count} className="!w-8/12" />
      <SkeletonLoading count={count} className="!w-10/12" />
      <SkeletonLoading count={count} />
    </div>
  );
};

export default AverageSkeleton;

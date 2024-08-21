import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const AverageSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card h-96 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 justify-between">
          <SkeletonLoading count={count} className="!w-28" />
          <SkeletonLoading count={count} className="!w-28" />
        </div>
        <SkeletonLoading count={count} className="!w-4/12" />
      </div>
      <div>
        <SkeletonLoading count={count} className="!w-8/12" />
        <SkeletonLoading count={count} className="!w-3/12" />
      </div>
      <div>
        <SkeletonLoading count={count} className="!w-8/12" />
        <SkeletonLoading count={count} className="!w-3/12" />
      </div>
      <div>
        <SkeletonLoading count={count} className="!w-8/12" />
        <SkeletonLoading count={count} className="!w-3/12" />
      </div>
    </div>
  );
};

export default AverageSkeleton;

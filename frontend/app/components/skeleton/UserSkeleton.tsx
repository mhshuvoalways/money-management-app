import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const UserSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card">
      <SkeletonLoading count={count} className="!w-3/12" />
      <div className="flex items-center gap-5 mt-5">
        <SkeletonLoading count={count} className="!w-10" />
        <div className="w-full sm:w-5/12">
          <SkeletonLoading count={count} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-10">
        <SkeletonLoading count={count} className="!w-6/12" />
        <SkeletonLoading count={count} className="!w-6/12" />
        <SkeletonLoading count={count} className="!w-6/12" />
        <SkeletonLoading count={count} className="!w-6/12" />
      </div>
    </div>
  );
};

export default UserSkeleton;

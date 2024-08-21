import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const UserSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="w-full sm:w-5/12">
      <SkeletonLoading count={count} className="!w-6/12" />
      <div className="flex items-center gap-5 mt-5">
        <SkeletonLoading count={count} className="!w-10" />
        <div className="w-full">
          <SkeletonLoading count={count} />
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;

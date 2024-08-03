import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const UserSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="w-5/12">
      <SkeletonLoading count={count} className="!w-6/12 mb-7" />
      <SkeletonLoading count={count} />
    </div>
  );
};

export default UserSkeleton;

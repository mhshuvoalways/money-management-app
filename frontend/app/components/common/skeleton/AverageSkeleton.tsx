import SkeletonLoading from "./SkeletonLoading";

interface Props {
  count?: number;
}

const AverageSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <div className="card">
      <SkeletonLoading count={count} className="!w-3/12" />
      <SkeletonLoading count={count} className="my-7 !w-6/12" />
      <SkeletonLoading count={count} />
    </div>
  );
};

export default AverageSkeleton;

import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const WalletSkeleton: React.FC<Props> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="card h-20 flex flex-col justify-between" key={index}>
          <SkeletonLoading count={count} />
          <SkeletonLoading count={count} className="!w-6/12" />
        </div>
      ))}
    </>
  );
};

export default WalletSkeleton;

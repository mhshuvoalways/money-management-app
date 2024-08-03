import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  count?: number;
}

const TransactionSkeleton: React.FC<Props> = ({ count = 1 }) => {
  const items = Array.from({ length: 5 });
  return (
    <>
      {items.map((_, index) => (
        <SkeletonLoading
          count={count}
          key={index}
          className={index + 1 === items.length ? "" : "mb-8"}
        />
      ))}
    </>
  );
};

export default TransactionSkeleton;

import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  itemsEachPage?: number;
}

const TransactionSkeleton: React.FC<Props> = ({ itemsEachPage = 10 }) => {
  const items = Array.from({ length: itemsEachPage });

  return (
    <>
      {items.map((_, index) => (
        <div
          className={`flex items-center justify-between gap-2 pt-3 dark:border-slate-500 ${
            items.length !== index + 1 && "border-b pb-3"
          }`}
          key={index}
        >
          <div className="flex items-center gap-2">
            <SkeletonLoading className="!w-5 sm:!w-10" />
            <SkeletonLoading className="!w-10 sm:!w-40" />
          </div>
          <SkeletonLoading className="!w-20 !hidden sm:!block" />
          <div className="flex items-center gap-2">
            <SkeletonLoading className="!w-5 sm:!w-10" />
            <SkeletonLoading className="!w-5 sm:!w-10" />
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionSkeleton;

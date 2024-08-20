import SkeletonLoading from "@/app/components/common/skeleton";

interface Props {
  itemsEachPage?: number;
}

const TransactionSkeleton: React.FC<Props> = ({ itemsEachPage = 10 }) => {
  const items = Array.from({ length: itemsEachPage });

  return (
    <>
      {items.map((_, index) => (
        <tr
          className={`font-medium rounded-lg border-t dark:border-slate-500`}
          key={index}
        >
          <td className={`px-4 pt-4 ${items.length !== index + 1 && "p-4"}`}>
            <SkeletonLoading className="" />
            <SkeletonLoading className="!w-6/12" />
          </td>
          <td className={`px-4 pt-4 ${items.length !== index + 1 && "p-4"}`}>
            <SkeletonLoading className="" />
            <SkeletonLoading className="!w-6/12" />
          </td>
          <td className={`px-4 pt-4 ${items.length !== index + 1 && "p-4"}`}>
            <SkeletonLoading className="" />
            <SkeletonLoading className="!w-6/12" />
          </td>
          <td className={`px-4 pt-4 ${items.length !== index + 1 && "p-4"}`}>
            <SkeletonLoading className="" />
            <SkeletonLoading className="!w-6/12" />
          </td>
          <td className={`px-4 pt-4 ${items.length !== index + 1 && "p-4"}`}>
            <SkeletonLoading className="" />
            <SkeletonLoading className="!w-6/12" />
          </td>
          <td className={`px-4 pt-4 ${items.length !== index + 1 && "p-4"}`}>
            <SkeletonLoading className="" />
            <SkeletonLoading className="!w-6/12" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TransactionSkeleton;

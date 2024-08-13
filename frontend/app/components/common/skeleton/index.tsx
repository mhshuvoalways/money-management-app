import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  count?: number;
  className?: string;
}

const SkeletonLoading: React.FC<Props> = ({ count = 1, className }) => {
  return <Skeleton count={count} height={12} className={className} />;
};

export default SkeletonLoading;

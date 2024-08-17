import LoadingIcon from "@/public/icons/loading.svg";
import Image from "next/image";

interface Props {
  className?: string;
}

const LoadingButton: React.FC<Props> = ({ className }) => {
  return (
    <>
      <button
        className={`btn h-10 hover:bgGradientHover flex justify-center ${className}`}
        disabled
      >
        <Image src={LoadingIcon} alt="loading icon" />
      </button>
      <p className="absolute inset-0 z-50"></p>
    </>
  );
};

export default LoadingButton;

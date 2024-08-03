import LoadingIcon from "@/public/icons/loading.svg";
import Image from "next/image";

interface Props {}

const LoadingButton: React.FC<Props> = () => {
  return (
    <>
      <button
        className={`btn h-10 hover:bgGradientHover w-full flex justify-center`}
      >
        <Image src={LoadingIcon} alt="loading icon" />
      </button>
      <p className="absolute inset-0 z-50"></p>
    </>
  );
};

export default LoadingButton;

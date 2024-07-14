import ArrowLeftIcon from "@/app/components/common/icons/ArrowLeft";
import ArrowRightIcon from "@/app/components/common/icons/ArrowRight";

interface Props {
  place: "left" | "right";
}

const Button: React.FC<Props> = ({ place }) => {
  const IconComponent = place === "left" ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <IconComponent className="size-7 cursor-pointer bg-white dark:bg-slate-700 flex justify-center items-center p-1.5 rounded-full shadow-sm hover:border border-primary transition" />
  );
};

export default Button;

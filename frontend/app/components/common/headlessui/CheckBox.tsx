import CheckIcon from "@/app/components/common/icons/Check";

interface Props {
  checked: boolean;
}

const CheckBox: React.FC<Props> = ({ checked }) => {
  return (
    <div
      className={`size-5 rounded border border-slate-300 dark:border-slate-500 flex items-center justify-center ${
        checked && "bg-green-400"
      }`}
    >
      {checked && <CheckIcon className="text-white px-0.5 pb-0.5 pt-1" />}
    </div>
  );
};

export default CheckBox;

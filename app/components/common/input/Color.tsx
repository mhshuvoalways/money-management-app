import PopOver from "@/app/components/common/headlessui/PopOver";
import { ColorResult, SketchPicker } from "react-color";

interface Props {
  btnClick: React.ReactElement;
  colorHandler: (color: ColorResult) => void;
  color: string;
}

const Color: React.FC<Props> = ({ btnClick, colorHandler, color }) => {
  return (
    <PopOver btnClick={btnClick} className="!p-0 !min-w-fit">
      <SketchPicker
        className="!bg-slate-50 dark:!bg-slate-800"
        onChange={colorHandler}
        color={color}
      />
    </PopOver>
  );
};

export default Color;

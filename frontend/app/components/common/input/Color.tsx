import PopOver from "@/app/components/common/headlessui/PopOver";
import { ColorResult, SketchPicker } from "react-color";

interface Props {
  btnClick: React.ReactElement;
  colorHandler: (color: ColorResult) => void;
  color: string;
  popupHandler?: (event: React.MouseEvent<ChildNode>) => void;
  show: boolean;
}

const Color: React.FC<Props> = ({
  btnClick,
  colorHandler,
  color,
  popupHandler,
  show,
}) => {
  return (
    <PopOver
      show={show}
      btnClick={btnClick}
      className="!p-0 !min-w-fit"
      popupHandler={popupHandler}
    >
      <SketchPicker
        className="!bg-transparent"
        onChange={colorHandler}
        color={color}
      />
    </PopOver>
  );
};

export default Color;

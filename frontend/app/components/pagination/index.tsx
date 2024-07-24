import Button from "@/app/components/pagination/Button";
import ListBox from "../common/headlessui/ListBox";

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <p>1 - 25 of 4,680</p>
      <div className="grid grid-cols-3 justify-items-center place-items-center">
        {<Button place="left" />}
        <ListBox
          items={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          className="h-7 w-auto sm:w-24"
          value="1"
          onChangeHandler={() => {}}
        />
        {<Button place="right" />}
      </div>
    </div>
  );
};

export default index;

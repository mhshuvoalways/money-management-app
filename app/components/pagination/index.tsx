import Button from "@/app/components/pagination/Button";
import ListBox from "../common/headlessui/ListBox";

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div className="flex items-center gap-8 flex-wrap">
      <p>1 - 25 of 4,680</p>
      <div className="grid grid-cols-3 justify-items-center place-items-center gap-2">
        {<Button place="left"/>}
        <ListBox list={["1", "2", "3", "4", "5", "6", "7", "8", "9"]} />
        {<Button place="right" />}
      </div>
    </div>
  );
};

export default index;

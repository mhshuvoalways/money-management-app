import Button from "@/app/components/pagination/Button";
import ListBox from "../common/headlessui/ListBox";

interface Props {
  currentPage: number;
  totalPage: number;
  itemsLength: number;
  pageHandler: (currentPage: number) => void;
}

const index: React.FC<Props> = ({
  currentPage,
  totalPage,
  itemsLength,
  pageHandler,
}) => {
  return (
    <div className="flex justify-between sm:justify-start items-center gap-5">
      <p>
        {currentPage} - {totalPage} of {itemsLength}
      </p>
      <div className="flex items-center gap-2">
        <div>
          <Button place="left" onClick={() => pageHandler(currentPage - 1)} />
        </div>
        <ListBox
          items={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          className="h-7 w-auto sm:w-24"
          value="1"
          onChangeHandler={() => {}}
        />
        <div>
          <Button place="right" onClick={() => pageHandler(currentPage + 1)} />
        </div>
      </div>
    </div>
  );
};

export default index;

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
  const items = Array.from({ length: totalPage }, (_, index) =>
    (index + 1).toString()
  );

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
          items={items}
          className="h-7 w-auto sm:w-24"
          value={currentPage.toString()}
          onChangeHandler={(value) => pageHandler(Number(value))}
        />
        <div>
          <Button place="right" onClick={() => pageHandler(currentPage + 1)} />
        </div>
      </div>
    </div>
  );
};

export default index;

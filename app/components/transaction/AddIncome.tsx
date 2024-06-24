import Button from "@/app/components/common/button";
import ListBox from "@/app/components/common/headlessui/ListBox";
import ArrowBottomIcon from "@/app/components/common/icons/ArrowBottom";
import PlusIcon from "@/app/components/common/icons/Plus";
import DatePicker from "@/app/components/common/input/DatePicker";
import Input from "@/app/components/common/input/Input";
import PopOver from "../common/headlessui/PopOver";
import TextArea from "../common/input/TextArea";

const list = [
  "Tom Cook",
  "Wade Cooper",
  "Tanya Fox",
  "Arlene Mccoy",
  "Devon Webb",
];

interface Props {}

const AddIncome: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Add Income</p>
      <div className="space-y-5">
        <div className="mt-5 grid grid-cols-2 gap-5">
          <ListBox list={list} listName="Category" />
          <PopOver
            btnClick={
              <div className="flex items-center justify-between w-full py-2 px-4 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg hover:ring-1 focus:ring-1 ring-primary">
                <p>Date</p>
                <ArrowBottomIcon className="size-4" />
              </div>
            }
          >
            <DatePicker />
          </PopOver>
          <ListBox list={list} listName="Wallets" />
          <Input placeholder="Amount" type="number" />
        </div>
        <TextArea className="mt-5" placeholder="Description" />
        <Button
          name="Add"
          icon={<PlusIcon className="size-5" />}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AddIncome;

import Button from "@/app/components/common/button/GradientButton";
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
      <div className="space-y-3 mt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="font-medium">Category</label>
            <ListBox list={list} />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Date</label>
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
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="font-medium">Wallets</label>
            <ListBox list={list} />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Amount</label>
            <Input placeholder="Amount" type="number" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-medium">Description</label>
          <TextArea placeholder="Description" />
        </div>
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

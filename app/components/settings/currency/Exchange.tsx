"use client";

import Button from "@/app/components/common/button";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Input from "@/app/components/common/input/Input";
import Currencies from "@/app/data/currencies.json";

const lists = ["Front (৳ 1000)", "End (1000 ৳)"];
const decimalPoint = [
  "none",
  "1.0",
  "1.00",
  "1.000",
  "1.0000",
  "1.00000",
  "1.000000",
];

interface Props {}

const Exchange: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Currency Setting</p>
      <div className="mt-5 space-y-3">
        <div className="space-y-2">
          <label className="font-medium">Unit Positions</label>
          <ListBox list={lists} />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Decimal Point</label>
          <ListBox list={decimalPoint} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="font-medium">Current Currency</label>
            <Input value="USD" />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Change into</label>
            <ListBox list={Currencies} />
          </div>
        </div>
      </div>
      <Button name="Exchange" className="mt-5 w-full" />
    </div>
  );
};

export default Exchange;

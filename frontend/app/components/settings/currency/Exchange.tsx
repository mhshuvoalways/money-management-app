"use client";

import Button from "@/app/components/common/button/GradientButton";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Currencies from "@/app/data/currencies.json";
import { useState } from "react";

const lists = ["Front ($ 1000)", "End (1000 $)"];
const decimalPoint = [
  "1.0",
  "1.00",
  "1.000",
  "1.0000",
  "1.00000",
  "1.000000",
];

interface Props {}

const Exchange: React.FC<Props> = () => {
  const [currency, setCurrency] = useState({
    unitPosition: lists[0],
    deciamPoint: decimalPoint[0],
    changeInto: Currencies[0],
  });

  const unitPositionHandler = (value: string) => {
    setCurrency({
      ...currency,
      unitPosition: value,
    });
  };

  const decimalPointHandler = (value: string) => {
    setCurrency({
      ...currency,
      deciamPoint: value,
    });
  };

  const changeIntoHandler = (value: string) => {
    setCurrency({
      ...currency,
      changeInto: value,
    });
  };

  return (
    <div className="card">
      <p className="text2">Currency Setting</p>
      <div className="mt-5 space-y-3">
        <div className="space-y-2">
          <label className="font-medium">Unit Position</label>
          <ListBox
            value={currency.unitPosition}
            items={lists}
            onChangeHandler={unitPositionHandler}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Decimal Point</label>
          <ListBox
            value={currency.deciamPoint}
            items={decimalPoint}
            onChangeHandler={decimalPointHandler}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Change Into</label>
          <ListBox
            value={currency.changeInto}
            items={Currencies}
            onChangeHandler={changeIntoHandler}
          />
        </div>
      </div>
      <Button name="Exchange" className="mt-5 w-full" />
    </div>
  );
};

export default Exchange;

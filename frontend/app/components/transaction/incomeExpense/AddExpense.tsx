"use client";

import ClearButton from "@/app/components/common/button/ClearButton";
import Button from "@/app/components/common/button/GradientButton";
import ListBox from "@/app/components/common/headlessui/ListBox";
import PopOver from "@/app/components/common/headlessui/PopOver";
import PlusIcon from "@/app/components/common/icons/Plus";
import DatePicker from "@/app/components/common/input/DatePicker";
import FakeField from "@/app/components/common/input/FakeField";
import Input from "@/app/components/common/input/Input";
import TextArea from "@/app/components/common/input/TextArea";
import {
  addExpense,
  clearErrors,
  clearIncomeObj,
  updateExpense,
} from "@/app/lib/features/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetCategoryType } from "@/app/types/CategoryType";
import { PostIncomeExpenseType } from "@/app/types/IncomeExpenseType";
import { GetWalletType } from "@/app/types/WalletType";
import formateDate from "@/app/utils/helpers/formateDate";
import { useEffect, useState } from "react";
import LoadingButton from "../../common/button/LoadingButton";

interface Props {}

const AddExpense: React.FC<Props> = () => {
  const [expenseObj, setExpenseObj] = useState<PostIncomeExpenseType>({
    date: new Date(),
    amount: 0,
    description: "",
  });
  const [category, setCategory] = useState<GetCategoryType>({
    _id: "",
    categoryName: "",
    categoryType: "",
    icon: {
      emoji: "",
      bgColor: "",
    },
  });
  const [wallet, setWallet] = useState<GetWalletType>({
    _id: "",
    walletName: "",
  });
  const [popup, setPopup] = useState(false);

  const { categories } = useAppSelector((state: RootState) => state.category);
  const { wallets } = useAppSelector((state: RootState) => state.wallet);
  const { errors, expense, dialog, isLoadingAdd } = useAppSelector(
    (state: RootState) => state.expense
  );

  const dispatch = useAppDispatch();

  const isUpdate = expense._id && !dialog;

  useEffect(() => {
    if (isUpdate) {
      setExpenseObj({
        date: expense.date,
        amount: expense.amount,
        description: expense.description,
      });
      setCategory({
        _id: expense.category?._id,
        categoryName: expense.category?.categoryName,
        categoryType: expense.category?.categoryType,
        icon: {
          emoji: expense.category?.icon.emoji,
          bgColor: expense.category?.icon.bgColor,
        },
      });
      setWallet({
        _id: expense.wallet?._id,
        walletName: expense.wallet?.walletName,
      });
    } else {
      setExpenseObj({
        date: new Date(),
        amount: 0,
        description: "",
      });
      const newCategorie = categories.filter(
        (item) => item.categoryType === "Expense"
      );
      setCategory(newCategorie[0]);
      setWallet(wallets[0]);
    }
  }, [categories, expense, isUpdate, wallets]);

  const categoryListBoxHandler = (value: string) => {
    const findCategory = categories.find((item) => item.categoryName === value);
    if (findCategory) {
      setCategory(findCategory);
    }
    dispatch(clearErrors("categoryName"));
  };

  const walletListBoxHandler = (value: string) => {
    const findWallet = wallets.find((item) => item.walletName === value);
    if (findWallet) {
      setWallet(findWallet);
    }
    dispatch(clearErrors("walletName"));
  };

  const dateHandler = (value: Date) => {
    setExpenseObj({
      ...expenseObj,
      date: value,
    });
    popupHandler();
    dispatch(clearErrors("date"));
  };

  const popupHandler = () => {
    setPopup(!popup);
  };

  const onchangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExpenseObj({
      ...expenseObj,
      [event.target.name]: event.target.value,
    });
    dispatch(clearErrors(event.target.name));
  };

  const newCategorie: string[] = [];
  categories.forEach((item) => {
    if (item.categoryType === "Expense") {
      newCategorie.push(item.categoryName);
    }
  });

  const newWallets: string[] = [];
  wallets.forEach((item) => {
    newWallets.push(item.walletName);
  });

  const onsubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUpdate) {
      const obj = {
        ...expenseObj,
        _id: expense._id,
        categoryId: category._id,
        walletId: wallet._id,
      };
      dispatch(updateExpense(obj));
    } else {
      const obj = {
        ...expenseObj,
        categoryId: category._id,
        walletId: wallet._id,
      };
      dispatch(addExpense(obj));
    }
  };

  return (
    <div className="card">
      <ClearButton
        title="Expense"
        isUpdate={isUpdate ? true : false}
        clearHandler={() => dispatch(clearIncomeObj())}
      />
      <form className="space-y-3 mt-5" onSubmit={onsubmitHandler}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="font-medium">Category *</label>
            <ListBox
              value={category?.categoryName}
              items={newCategorie}
              onChangeHandler={categoryListBoxHandler}
            />
            <p className="text-red-600 font-medium mt-1">{errors.categoryId}</p>
          </div>
          <div className="space-y-2">
            <label className="font-medium">Date *</label>
            <PopOver
              show={popup}
              popupHandler={popupHandler}
              btnClick={
                <FakeField onClick={popupHandler}>
                  <p>{formateDate(expenseObj.date) || "Date"}</p>
                </FakeField>
              }
            >
              <DatePicker dateHandler={dateHandler} />
            </PopOver>
            <p className="text-red-600 font-medium mt-1">{errors.date}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="font-medium">Wallets *</label>
            <ListBox
              value={wallet?.walletName}
              items={newWallets}
              onChangeHandler={walletListBoxHandler}
            />
            <p className="text-red-600 font-medium mt-1">{errors.walletId}</p>
          </div>
          <div className="space-y-2">
            <label className="font-medium">Amount *</label>
            <Input
              placeholder="Amount"
              type="number"
              name="amount"
              onChange={onchangeHandler}
              value={expenseObj?.amount?.toString()}
            />
            <p className="text-red-600 font-medium mt-1">{errors.amount}</p>
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-medium">Description *</label>
          <TextArea
            placeholder="Description"
            name="description"
            onChange={onchangeHandler}
            value={expenseObj.description}
          />
          <p className="text-red-600 font-medium mt-1">{errors.description}</p>
        </div>
        {isLoadingAdd ? (
          <LoadingButton />
        ) : (
          <Button
            name={isUpdate ? "Save" : "Add"}
            icon={!isUpdate ? <PlusIcon className="size-5" /> : <></>}
            className="w-full"
          />
        )}
      </form>
    </div>
  );
};

export default AddExpense;

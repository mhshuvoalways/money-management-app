"use client";

import ClearButton from "@/app/components/common/button/ClearButton";
import Button from "@/app/components/common/button/GradientButton";
import LoadingButton from "@/app/components/common/button/LoadingButton";
import Emoji from "@/app/components/common/emoji";
import ListBox from "@/app/components/common/headlessui/ListBox";
import PlusIcon from "@/app/components/common/icons/Plus";
import Color from "@/app/components/common/input/Color";
import FakeField from "@/app/components/common/input/FakeField";
import Input from "@/app/components/common/input/Input";
import {
  clearErrors,
  clearUpdateObj,
  createCategory,
  updateCategory,
} from "@/app/lib/features/categorySlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { PostCategoryType } from "@/app/types/CategoryType";
import { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { ColorResult } from "react-color";

const items = ["Income", "Expense"];

interface Props {}

const Index: React.FC<Props> = () => {
  const [categoryObj, setCategory] = useState<PostCategoryType>({
    categoryType: items[0],
  });

  const [showEmojiDialog, setShowEmojiDialog] = useState(false);
  const [showBgDialog, setShowBgDialog] = useState(false);

  const dispatch = useAppDispatch();

  const { categories, errors, category, dialog, isLoadingAdd } = useAppSelector(
    (state: RootState) => state.category
  );

  const isUpdate = category._id && !dialog;

  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearErrors(event.target.name));
    setCategory({
      ...categoryObj,
      [event.target.name]: event.target.value,
    });
  };

  const emojiPopupHandler = () => {
    setShowEmojiDialog(!showEmojiDialog);
  };

  const bgPopupHandler = () => {
    setShowBgDialog(!showBgDialog);
  };

  const categoryTypeHandler = (value: string) => {
    dispatch(clearErrors("categoryType"));
    setCategory({
      ...categoryObj,
      categoryType: value,
    });
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    dispatch(clearErrors("icon"));
    emojiPopupHandler();
    setCategory({
      ...categoryObj,
      icon: {
        ...categoryObj.icon,
        emoji: emojiData.emoji,
      },
    });
  };

  const colorHandler = (color: ColorResult) => {
    dispatch(clearErrors("icon"));
    bgPopupHandler();
    setCategory({
      ...categoryObj,
      icon: {
        ...categoryObj.icon,
        bgColor: color.hex,
      },
    });
  };

  useEffect(() => {
    if (isUpdate) {
      setCategory(category);
    } else {
      setCategory({
        categoryName: "",
        categoryType: items[0],
      });
    }
  }, [category, isUpdate]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateObj = {
      ...categoryObj,
      _id: category._id,
    };
    const createObj = {
      ...categoryObj,
      categoryPosition: categories[0].categoryPosition - 1,
    };
    if (isUpdate) {
      dispatch(updateCategory(updateObj));
    } else {
      dispatch(createCategory(createObj));
    }
  };

  return (
    <form className="card" onSubmit={onSubmitHandler}>
      <ClearButton
        title="Category"
        isUpdate={isUpdate ? true : false}
        clearHandler={() => dispatch(clearUpdateObj())}
      />
      <div className="space-y-3 mt-5">
        <div className="space-y-2">
          <label className="font-medium">Name *</label>
          <Input
            placeholder="Category name"
            name="categoryName"
            value={categoryObj?.categoryName}
            onChange={categoryHandler}
          />
          <p className="text-red-600 font-medium mt-1">{errors.categoryName}</p>
        </div>
        <div className="space-y-2">
          <label className="font-medium">Type {isUpdate ? "" : "*"}</label>
          <ListBox
            items={items}
            value={categoryObj.categoryType || ""}
            onChangeHandler={categoryTypeHandler}
            disabled={isUpdate ? true : false}
          />
        </div>
        <div className="flex items-center gap-3 justify-between">
          <div className="space-y-2 w-6/12">
            <label className="font-medium">Icon *</label>
            <Emoji
              popupHandler={emojiPopupHandler}
              show={showEmojiDialog}
              btnClick={
                <FakeField onClick={emojiPopupHandler}>
                  <p>{categoryObj?.icon?.emoji || "Choose..."}</p>
                </FakeField>
              }
              onEmojiClick={onEmojiClick}
            />
            <p className="text-red-600 font-medium mt-1">
              {errors.icon?.emoji}
            </p>
          </div>
          <div className="space-y-2 w-6/12">
            <label className="font-medium">Icon BG color *</label>
            <Color
              show={showBgDialog}
              popupHandler={bgPopupHandler}
              btnClick={
                <FakeField onClick={bgPopupHandler}>
                  {categoryObj?.icon?.bgColor ? (
                    <p
                      style={{
                        background: categoryObj.icon.bgColor,
                      }}
                      className={`w-full h-6 rounded`}
                    ></p>
                  ) : (
                    <p>Choose...</p>
                  )}
                </FakeField>
              }
              color={categoryObj?.icon?.bgColor || ""}
              colorHandler={colorHandler}
            />
            <p className="text-red-600 font-medium mt-1">
              {errors.icon?.bgColor}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {isLoadingAdd ? (
          <LoadingButton />
        ) : (
          <Button
            name={isUpdate ? "Save" : "Add"}
            icon={!isUpdate ? <PlusIcon className="size-5" /> : <></>}
            className="w-full"
          />
        )}
      </div>
    </form>
  );
};

export default Index;

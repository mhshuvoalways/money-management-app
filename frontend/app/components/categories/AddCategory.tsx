"use client";

import Emoji from "@/app/components/common/emoji";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Color from "@/app/components/common/input/Color";
import Input from "@/app/components/common/input/Input";
import {
  createCategory,
  updateCategory,
} from "@/app/lib/features/categorySlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { PostCategoryType } from "@/app/types/CategoryType";
import { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { ColorResult } from "react-color";
import Button from "../common/button/GradientButton";
import FakeField from "../common/input/FakeField";

const list = ["Income", "Expense"];

interface Props {
  categoryObj: PostCategoryType;
}

const Index: React.FC<Props> = ({ categoryObj }) => {
  const [category, setCategory] = useState<PostCategoryType>({
    categoryType: list[0],
    icon: {
      emoji: "🚌",
      bgColor: "",
    },
  });

  const dispatch = useAppDispatch();

  const { errors } = useAppSelector((state: RootState) => state.category);

  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const categoryTypeHandler = (value: string) => {
    setCategory({
      ...category,
      categoryType: value,
    });
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setCategory({
      ...category,
      icon: {
        ...category.icon,
        emoji: emojiData.emoji,
      },
    });
  };

  const colorHandler = (color: ColorResult) => {
    setCategory({
      ...category,
      icon: {
        ...category.icon,
        bgColor: color.hex,
      },
    });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (category._id) {
      dispatch(updateCategory(category));
    } else {
      dispatch(createCategory(category));
    }
  };

  useEffect(() => {
    if (categoryObj._id) {
      setCategory(categoryObj);
    }
  }, [category._id, categoryObj]);

  return (
    <form className="card" onSubmit={onSubmitHandler}>
      <p className="text2">Create a new category</p>
      <div className="space-y-3 mt-5">
        <div className="space-y-2">
          <label className="font-medium">Name</label>
          <Input
            placeholder="Category name"
            name="categoryName"
            value={category?.categoryName}
            onChange={categoryHandler}
          />
          <p className="text-red-600 font-medium mt-1">{errors.categoryName}</p>
        </div>
        <div className="space-y-2">
          <label className="font-medium">Type</label>
          <ListBox
            list={list}
            categoryType={category?.categoryType || ""}
            categoryTypeHandler={categoryTypeHandler}
          />
        </div>
        <div className="flex items-center gap-3 justify-between">
          <div className="space-y-2 w-6/12">
            <label className="font-medium">Icon</label>
            <Emoji
              btnClick={
                <FakeField>
                  <p>{category?.icon?.emoji || "Choose..."}</p>
                </FakeField>
              }
              onEmojiClick={onEmojiClick}
            />
            <p className="text-red-600 font-medium mt-1">
              {errors.icon?.emoji}
            </p>
          </div>
          <div className="space-y-2 w-6/12">
            <label className="font-medium">Icon BG color</label>
            <Color
              btnClick={
                <FakeField>
                  {category?.icon?.bgColor ? (
                    <p
                      style={{
                        background: category.icon.bgColor,
                      }}
                      className={`w-full h-6 rounded`}
                    ></p>
                  ) : (
                    <p>Choose...</p>
                  )}
                </FakeField>
              }
              color={category?.icon?.bgColor || ""}
              colorHandler={colorHandler}
            />
            <p className="text-red-600 font-medium mt-1">
              {errors.icon?.bgColor}
            </p>
          </div>
        </div>
      </div>
      <Button name="Save" className="w-full mt-5" />
    </form>
  );
};

export default Index;

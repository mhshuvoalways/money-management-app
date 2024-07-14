"use client";

import Emoji from "@/app/components/common/emoji";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Color from "@/app/components/common/input/Color";
import Input from "@/app/components/common/input/Input";
import { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { ColorResult } from "react-color";
import Button from "../common/button/GradientButton";
import FakeField from "../common/input/FakeField";

const list = ["Income", "Expense"];

interface Props {}

const Index: React.FC<Props> = () => {
  const [category, setCategory] = useState({
    name: "",
    categoryType: "",
    icon: "",
    color: "",
  });

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setCategory({
      ...category,
      icon: emojiData.emoji,
    });
  };

  const colorHandler = (color: ColorResult) => {
    setCategory({
      ...category,
      color: color.hex,
    });
  };

  return (
    <div className="card">
      <p className="text2">Create a new category</p>
      <div className="space-y-3 mt-5">
        <div className="space-y-2">
          <label className="font-medium">Name</label>
          <Input placeholder="Category name" />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Type</label>
          <ListBox list={list} />
        </div>
        <div className="flex items-center gap-3 justify-between">
          <div className="space-y-2 w-6/12">
            <label className="font-medium">Icon</label>
            <Emoji
              btnClick={
                <FakeField>
                  <p>{category.icon || "Choose..."}</p>
                </FakeField>
              }
              onEmojiClick={onEmojiClick}
            />
          </div>
          <div className="space-y-2 w-6/12">
            <label className="font-medium">Icon BG color</label>
            <Color
              btnClick={
                <FakeField>
                  {category.color ? (
                    <p
                      style={{
                        background: category.color,
                      }}
                      className={`w-full h-6 rounded`}
                    ></p>
                  ) : (
                    <p>Choose...</p>
                  )}
                </FakeField>
              }
              color={category.color}
              colorHandler={colorHandler}
            />
          </div>
        </div>
      </div>
      <Button name="Save" className="w-full mt-5" />
    </div>
  );
};

export default Index;

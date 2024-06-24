"use client";

import PopOver from "@/app/components/common/headlessui/PopOver";
import { MyContext } from "@/app/context";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useContext } from "react";

interface Props {
  btnClick: React.ReactElement;
  onEmojiClick: (emojiData: EmojiClickData) => void;
}

const Emoji: React.FC<Props> = ({ btnClick, onEmojiClick }) => {
  const { darkMode } = useContext(MyContext);

  return (
    <PopOver btnClick={btnClick} className="p-0 w-auto">
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        theme={darkMode ? Theme.DARK : Theme.LIGHT}
        className="!bg-transparent"
      />
    </PopOver>
  );
};

export default Emoji;

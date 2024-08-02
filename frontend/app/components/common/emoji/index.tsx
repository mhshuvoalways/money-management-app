"use client";

import PopOver from "@/app/components/common/headlessui/PopOver";
import { MyContext } from "@/app/context";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useContext } from "react";

interface Props {
  btnClick: React.ReactElement;
  onEmojiClick: (emojiData: EmojiClickData) => void;
  show: boolean;
  popupHandler?: (event: React.MouseEvent<ChildNode>) => void;
}

const Emoji: React.FC<Props> = ({
  btnClick,
  onEmojiClick,
  show,
  popupHandler,
}) => {
  const { darkMode } = useContext(MyContext);

  return (
    <PopOver
      btnClick={btnClick}
      className="p-0 w-auto"
      show={show}
      popupHandler={popupHandler}
    >
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        theme={darkMode ? Theme.DARK : Theme.LIGHT}
        className="!bg-transparent !border-none"
      />
    </PopOver>
  );
};

export default Emoji;

"use client";

import ArrowUpload from "@/app/components/common/icons/ArrowUpload";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

interface Props {
  imageHandler(acceptedFiles: File[]): void;
}

const UploadAvatar: React.FC<Props> = ({ imageHandler }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setIsDragging(false);
    imageHandler(acceptedFiles);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`bg-yellow-50 dark:bg-slate-600 shadow rounded-lg w-full sm:w-6/12 h-32 border-dashed border-2 border-secondary flex items-center justify-center cursor-pointer`}
        >
          <div>
            <ArrowUpload
              className={`size-16 text-white mx-auto transition ${
                isDragging ? "transform scale-125" : ""
              }`}
            />
            <p
              className={`text2 text-center transition ${
                isDragging ? "transform scale-150" : ""
              }`}
            >
              {isDragging ? "Drop it!" : "Click or Drag & Drop"}
            </p>
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadAvatar;

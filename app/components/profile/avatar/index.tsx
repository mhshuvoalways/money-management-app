"use client";

import Avatar from "@/app/components/profile/avatar/Avatar";
import UploadAvatar from "@/app/components/profile/avatar/UploadAvatar";
import { useState } from "react";

interface Props {}

const Index: React.FC<Props> = () => {
  const [imageData, setImageData] = useState<string | undefined>();
  const [image, setImage] = useState<File[]>([]);

  const imageHandler = (acceptedFiles: File[]) => {
    setImage(acceptedFiles);
  };

  return (
    <div className="card">
      <p className="text2">User Photo</p>
      <div className="mt-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-5">
        <Avatar image={image} imageData={imageData} />
        <UploadAvatar imageHandler={imageHandler} />
      </div>
    </div>
  );
};

export default Index;

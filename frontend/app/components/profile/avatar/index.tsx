"use client";

import Avatar from "@/app/components/profile/avatar/Avatar";
import UploadAvatar from "@/app/components/profile/avatar/UploadAvatar";
import UserAvatarSkeleton from "@/app/components/skeleton/UserAvatarSkeleton";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { useState } from "react";

interface Props {}

const Index: React.FC<Props> = () => {
  const { isLoadingGet } = useAppSelector((state: RootState) => state.profile);

  const [image, setImage] = useState<File[]>([]);

  const imageHandler = (acceptedFiles: File[]) => {
    setImage(acceptedFiles);
  };

  return (
    <div className="card">
      <p className="text2">User Photo</p>
      <div className="mt-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-5">
        {isLoadingGet ? <UserAvatarSkeleton /> : <Avatar image={image} />}
        <UploadAvatar imageHandler={imageHandler} />
      </div>
    </div>
  );
};

export default Index;

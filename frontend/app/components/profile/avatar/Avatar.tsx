"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import AvatarPhoto from "../../common/userAvatar/AvatarPhoto";

interface Props {
  image: File[];
}

const Avatar: React.FC<Props> = ({ image }) => {
  const { profile } = useAppSelector((state: RootState) => state.profile);

  const avatarUrl = profile.avatar?.url;

  let src = "";
  if (avatarUrl) {
    src = avatarUrl;
  } else if (image.length) {
    src = URL.createObjectURL(image[0]);
  }

  return (
    <div className="flex justify-center items-center gap-3">
      <AvatarPhoto imageClass="size-32" avatarUrl={src} />
      <div>
        <p className="text1">{profile.name}</p>
        <p className="text3 opacity-80 text-sm font-medium">
          Max file size is 2 MB
        </p>
      </div>
    </div>
  );
};

export default Avatar;

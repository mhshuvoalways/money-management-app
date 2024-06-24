import UserIcon from "@/app/components/common/icons/User";
import Image from "next/image";

interface Props {
  image: File[];
  imageData?: string;
}

const Avatar: React.FC<Props> = ({ image, imageData }) => {
  let src;

  if (imageData) {
    src = imageData;
  } else if (image.length) {
    src = URL.createObjectURL(image[0]);
  }

  return (
    <div className="flex justify-center items-center gap-3">
      {src ? (
        <Image
          src={src}
          className="size-32 rounded-full bg-slate-100 dark:bg-slate-600"
          alt="User Photo"
          width={128}
          height={128}
        />
      ) : (
        <div className="size-32 rounded-full bg-slate-100 dark:bg-slate-600 flex justify-center items-center">
          <UserIcon className="size-20" />
        </div>
      )}
      <div>
        <p className="text1">MH Shuvo</p>
        <p className="text3 opacity-80 text-sm font-medium">
          Max file size is 2 MB
        </p>
      </div>
    </div>
  );
};

export default Avatar;

import CheckIcon from "@/app/components/common/icons/Check";
import UserImage from "@/public/images/mhshuvo.png";
import Image from "next/image";

interface Props {
  mainClass?: string;
  imageClass?: string;
  isVerified: boolean;
}

const UserAvatar: React.FC<Props> = ({ mainClass, imageClass, isVerified }) => {
  return (
    <div className={`flex items-center gap-3 ${mainClass}`}>
      <Image
        src={UserImage}
        className={`rounded-full bg-slate-100 dark:bg-slate-600 ${imageClass}`}
        alt="User Image"
      />
      <div>
        <p className="text2">MH Shuvo</p>
        <p className="text3 opacity-80 text-sm font-medium">
          mhshuvoalways@gmail.com
        </p>
        {isVerified && (
          <div className="flex items-center gap-2 mt-1">
            <div className="size-5 flex items-center justify-center bg-green-400 rounded-full text-white">
              <CheckIcon className="size-4 pt-0.5 pl-0.5" />
            </div>
            <p className="font-medium">Verified Account</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;

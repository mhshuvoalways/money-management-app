import CheckIcon from "@/app/components/common/icons/Check";
import AvatarPhoto from "@/app/components/common/userAvatar/AvatarPhoto";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

interface Props {
  profilePage?: boolean;
  mainClass?: string;
  imageClass?: string;
}

const UserAvatar: React.FC<Props> = ({
  profilePage,
  mainClass,
  imageClass,
}) => {
  const { user } = useAppSelector((state: RootState) => state.user);

  const isVerified = user.isVerified;

  return (
    <div className={`flex items-center gap-3 ${mainClass}`}>
      <AvatarPhoto avatarUrl={user.avatar?.url} imageClass={imageClass} />
      <div>
        <p className="text2">{user.name}</p>
        <p className="text3 opacity-80 text-sm font-medium">{user.email}</p>
        {profilePage && (
          <div className="flex items-center gap-2 mt-1">
            <div
              className={`size-5 flex items-center justify-center rounded-full text-white ${
                isVerified ? "bg-green-400" : "bg-red-400"
              }`}
            >
              <CheckIcon className="size-4 pt-0.5 pl-0.5" />
            </div>
            {isVerified ? (
              <p className="font-medium">Verified Account</p>
            ) : (
              <div className="flex items-center gap-5">
                <p className="font-medium">Not Verified Account</p>
                <p className="text-sm text-green-500 hover:underline cursor-pointer">
                  Verify
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;

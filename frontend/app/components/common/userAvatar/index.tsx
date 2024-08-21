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
  const { profile } = useAppSelector((state: RootState) => state.profile);

  const isVerified = profile?.user?.isVerified;

  return (
    <div className={`flex items-center gap-3 ${mainClass}`}>
      <div>
        <AvatarPhoto avatarUrl={profile?.avatar?.url} imageClass={imageClass} />
      </div>
      <div>
        <p className="text2">{profile?.name}</p>
        <div className="flex items-center gap-2">
          <p className="text3 opacity-80 text-sm font-medium break-all">
            {profile?.user?.email}
          </p>
          {profilePage && (
            <p className="text-xs text-primary hover:underline cursor-pointer">
              {!isVerified && "Change"}
            </p>
          )}
        </div>
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
              <div className="flex items-center gap-2">
                <p className="font-medium">Not Verified</p>
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

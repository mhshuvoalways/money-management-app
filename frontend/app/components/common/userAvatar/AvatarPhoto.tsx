import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import Image from "next/image";

interface Props {
  avatarUrl: string;
  imageClass?: string;
}

const AvatarPhoto: React.FC<Props> = ({ avatarUrl, imageClass }) => {
  const { profile } = useAppSelector((state: RootState) => state.profile);

  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          className={`rounded-full bg-slate-100 dark:bg-slate-600 border-primary border ${imageClass}`}
          alt="Avatar"
          width={300}
          height={300}
        />
      ) : (
        <p
          className={`rounded-full bg-primary dark:bg-slate-600 border dark:border-slate-500 text2 text-white flex items-center justify-center ${imageClass}`}
        >
          {profile?.name.slice(0, 1)}
        </p>
      )}
    </>
  );
};

export default AvatarPhoto;

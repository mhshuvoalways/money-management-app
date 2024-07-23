import Image from "next/image";

interface Props {
  avatarUrl: string;
  imageClass?: string;
}

const AvatarPhoto: React.FC<Props> = ({ avatarUrl, imageClass }) => {
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
          className={`rounded-full bg-slate-100 dark:bg-slate-600 border-primary border ${imageClass}`}
        ></p>
      )}
    </>
  );
};

export default AvatarPhoto;

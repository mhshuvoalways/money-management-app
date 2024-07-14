import FacebookIcon from "@/app/components/common/icons/Facebook";
import LinkedInIcon from "@/app/components/common/icons/LinkedIn";
import TwitterIcon from "@/app/components/common/icons/Twitter";

interface Props {}

const Social: React.FC<Props> = () => {
  return (
    <div className="flex items-center gap-5 my-20">
      <p className="opacity-80 tracking-widest">Follow</p>
      <div className="flex items-center gap-3">
        <FacebookIcon className="size-3" />
        <TwitterIcon className="size-3" />
        <LinkedInIcon className="size-3" />
      </div>
    </div>
  );
};

export default Social;

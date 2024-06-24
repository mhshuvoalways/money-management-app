import CheckIcon from "@/app/components/common/icons/Check";
import UserImage from "@/public/images/mhshuvo.png";
import Image from "next/image";
import Item from "./Item";

interface Props {}

const User: React.FC<Props> = () => {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <Image
          src={UserImage}
          className="size-20 rounded-full bg-slate-100 dark:bg-slate-700"
          alt=""
        />
        <div>
          <p className="text2">MH Shuvo</p>
          <p className="text3 opacity-80 text-sm font-medium">
            mhshuvoalways@gmail.com
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="size-5 flex items-center justify-center bg-green-400 rounded-full text-white">
              <CheckIcon className="size-4 pt-0.5 pl-0.5" />
            </div>
            <p className="font-medium">Verified Account</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly text-center mt-10">
        <Item title="25 June 2024" description="Registered" />
        <p className="h-12 w-0.5 bg-slate-100 dark:bg-slate-600 rounded-full"></p>
        <Item title="Referral" description="06" />
      </div>
      <p className="w-full h-0.5 bg-slate-100 dark:bg-slate-600 rounded-full my-5"></p>
      <div className="flex items-center justify-evenly text-center">
        <Item title="Wallets" description="03" />
        <p className="h-12 w-0.5 bg-slate-100 dark:bg-slate-600 rounded-full"></p>
        <Item title="Categories" description="23" />
      </div>
    </div>
  );
};

export default User;

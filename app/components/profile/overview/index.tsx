import UserAvatar from "../../common/userAvatar";
import Item from "./Item";

interface Props {}

const User: React.FC<Props> = () => {
  return (
    <div className="card">
      <UserAvatar
        imageClass="size-20"
        isVerified
      />
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

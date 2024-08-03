import UserAvatar from "@/app/components/common/userAvatar";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import moment from "moment";
import UserSkeleton from "../../skeleton/UserSkeleton";
import Item from "./Item";

interface Props {}

const User: React.FC<Props> = () => {
  const { profile, isLoadingGet } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { wallets } = useAppSelector((state: RootState) => state.wallet);
  const { categories } = useAppSelector((state: RootState) => state.category);

  return (
    <>
      {isLoadingGet ? (
        <UserSkeleton />
      ) : (
        <div className="card">
          <UserAvatar imageClass="size-20" profilePage />
          <div className="flex items-center justify-evenly text-center mt-10">
            <Item
              title={moment(profile?.user?.createdAt).format("LL")}
              description="Registered"
            />
            <p className="h-12 w-0.5 bg-slate-100 dark:bg-slate-600 rounded-full"></p>
            <Item title="Plan" description={profile.plan} />
          </div>
          <p className="w-full h-0.5 bg-slate-100 dark:bg-slate-600 rounded-full my-5"></p>
          <div className="flex items-center justify-evenly text-center">
            <Item title="Wallets" description={wallets.length.toString()} />
            <p className="h-12 w-0.5 bg-slate-100 dark:bg-slate-600 rounded-full"></p>
            <Item
              title="Categories"
              description={categories.length.toString()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default User;

import Header from "@/app/components/common/header";
import Account from "@/app/components/profile/account";
import Avatar from "@/app/components/profile/avatar";
import Information from "@/app/components/profile/information";
import User from "@/app/components/profile/overview";

const page = () => {
  return (
    <Header>
      <p className="text1">Profile!</p>
      <p className="text3">{`Here's what's happening with your profile.`}</p>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <User />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Avatar />
          <Information />
          <Account />
        </div>
      </div>
    </Header>
  );
};

export default page;

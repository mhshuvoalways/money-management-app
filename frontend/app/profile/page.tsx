"use client";

import Header from "@/app/components/common/header";
import Account from "@/app/components/profile/account";
import Avatar from "@/app/components/profile/avatar";
import DeleteAccount from "@/app/components/profile/deleteAccount";
import Information from "@/app/components/profile/information";
import User from "@/app/components/profile/overview";

const ProfilePage = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <Account />
            <Information />
          </div>
          <DeleteAccount />
        </div>
      </div>
    </Header>
  );
};

export default ProfilePage;

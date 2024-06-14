"use client";

import DropDown from "@/app/components/common/dropdown";
import BarIcon from "@/app/components/common/icons/Bar";
import BellIcon from "@/app/components/common/icons/Bell";
import DarkIcon from "@/app/components/common/icons/Dark";
import LogoutIcon from "@/app/components/common/icons/Logout";
import SunIcon from "@/app/components/common/icons/Sun";
import UserIcon from "@/app/components/common/icons/User";
import Sidebar from "@/app/components/common/sidebar";
import { MyContext } from "@/app/context";
import UserImg from "@/public/images/mhshuvo.png";
import Image from "next/image";
import { useContext, useState } from "react";

const profileMenus = [
  {
    id: 1,
    icon: <UserIcon className="size-5" />,
    name: "My Profile",
    href: "/my-profile",
  },
  {
    id: 2,
    icon: <LogoutIcon className="size-5" />,
    name: "Logout",
    href: "/login",
  },
];

const Index: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { darkMode, toggleDarkMode } = useContext(MyContext);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="px-10 mx-auto container mt-2">
        <div className="bg-white dark:bg-slate-700 px-5 rounded-lg shadow">
          <div className="flex items-center justify-between h-14">
            <BarIcon
              className="size-7 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className="flex items-center gap-5">
              {darkMode ? (
                <SunIcon
                  className="size-9 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full"
                  onClick={toggleDarkMode}
                />
              ) : (
                <DarkIcon
                  className="size-8 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full"
                  onClick={toggleDarkMode}
                />
              )}
              <BellIcon className="size-9 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full" />
              <DropDown
                btnIcon={
                  <Image
                    src={UserImg}
                    alt=""
                    className="size-9 border-2 border-primary rounded-full cursor-pointer"
                  />
                }
                items={profileMenus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

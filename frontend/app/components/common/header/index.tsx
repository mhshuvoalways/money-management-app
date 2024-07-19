"use client";

import DropDown from "@/app/components/common/headlessui/Dropdown";
import BarIcon from "@/app/components/common/icons/Bar";
import BellIcon from "@/app/components/common/icons/Bell";
import DarkIcon from "@/app/components/common/icons/Dark";
import LogoutIcon from "@/app/components/common/icons/Logout";
import SettingIcon from "@/app/components/common/icons/Setting";
import SunIcon from "@/app/components/common/icons/Sun";
import UserIcon from "@/app/components/common/icons/User";
import Sidebar from "@/app/components/common/sidebar";
import { MyContext } from "@/app/context";
import { authenticate } from "@/app/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import UserImg from "@/public/images/mhshuvo.png";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const profileMenus = [
  {
    id: 1,
    icon: <UserIcon className="size-5" />,
    name: "My Profile",
    href: "/profile",
  },
  {
    id: 2,
    icon: <SettingIcon className="size-5" />,
    name: "Settings",
    href: "/settings",
  },
  {
    id: 3,
    icon: <LogoutIcon className="size-5" />,
    name: "Logout",
    href: "/login",
  },
];

interface Props {
  children: React.ReactNode;
}

const Index: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { darkMode, toggleDarkMode } = useContext(MyContext);

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth <= 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isAuth) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="px-0 sm:px-10 mx-auto container sm:mt-2">
        <div className="bg-white dark:bg-slate-700 px-5 rounded-lg shadow sticky top-0 z-10">
          <div className="flex items-center justify-between h-14">
            <Link
              href={"/"}
              className={`font-bold text-xl xl:text-2xl textGradient flex items-center font-montserrat h-14 sm:hidden`}
            >
              PennyCalc
            </Link>
            <BarIcon
              className="size-9 cursor-pointer hidden sm:block hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className="flex items-center gap-5">
              {darkMode ? (
                <SunIcon
                  className="size-9 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition"
                  onClick={toggleDarkMode}
                />
              ) : (
                <DarkIcon
                  className="size-8 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition"
                  onClick={toggleDarkMode}
                />
              )}
              <BellIcon className="size-9 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition" />
              <DropDown
                btnIcon={
                  <Image
                    src={UserImg}
                    alt=""
                    className="size-9 border-2 border-primary rounded-full cursor-pointer"
                  />
                }
                items={profileMenus}
                className="mt-3"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 mb-24 sm:my-10 px-5 sm:px-0">{children}</div>
      </div>
    </div>
  );
};

export default Index;

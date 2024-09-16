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
import AvatarPhoto from "@/app/components/common/userAvatar/AvatarPhoto";
import { MyContext } from "@/app/context";
import useTotalSum from "@/app/hooks/incomeExpense/useTotalSum";
import { authenticate } from "@/app/lib/features/authSlice";
import { getCategories } from "@/app/lib/features/categorySlice";
import { getExpenses } from "@/app/lib/features/expenseSlice";
import { getGoals } from "@/app/lib/features/goalSlice";
import { getIncomes } from "@/app/lib/features/incomeSlice";
import { getMe } from "@/app/lib/features/profileSlice";
import { getWallets } from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
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
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const { profile } = useAppSelector((state: RootState) => state.profile);
  const { wallets } = useAppSelector((state: RootState) => state.wallet);
  const { expenses } = useAppSelector((state: RootState) => state.expense);
  const { incomes } = useAppSelector((state: RootState) => state.income);
  const { categories } = useAppSelector((state: RootState) => state.category);
  const { goals } = useAppSelector((state: RootState) => state.goal);

  const { totalSum: totalExpenseSum } = useTotalSum("expense");
  const { totalSum: totalIncomeSum } = useTotalSum("income");

  useEffect(() => {
    dispatch(authenticate());
    if (!profile?._id) {
      dispatch(getMe());
    }
    if (!incomes.length) {
      dispatch(getIncomes());
    }
    if (!expenses.length) {
      dispatch(getExpenses());
    }
    if (!categories.length) {
      dispatch(getCategories());
    }
    if (!wallets.length) {
      dispatch(getWallets());
    }
    if (!goals.length) {
      dispatch(getGoals());
    }
  }, [
    categories.length,
    dispatch,
    expenses.length,
    goals.length,
    incomes.length,
    profile?._id,
    wallets.length,
  ]);

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
              className={`font-bold text-lg md:text-xl xl:text-2xl textGradient flex items-center font-montserrat h-14 sm:hidden`}
            >
              PennyCalc
            </Link>
            <BarIcon
              className="size-7 lg:size-9 cursor-pointer hidden sm:block hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className="flex items-center gap-2 sm:gap-5">
              {darkMode ? (
                <SunIcon
                  className="size-7 lg:size-9 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition"
                  onClick={toggleDarkMode}
                />
              ) : (
                <DarkIcon
                  className="size-6 lg:size-8 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition"
                  onClick={toggleDarkMode}
                />
              )}
              <BellIcon className="size-7 lg:size-9 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-600 p-1 rounded-full transition" />
              <div className="flex items-center gap-5">
                <DropDown
                  btnIcon={
                    <AvatarPhoto
                      avatarUrl={profile?.avatar?.url}
                      imageClass="size-6 lg:size-9"
                    />
                  }
                  items={profileMenus}
                  className="mt-3"
                />
                <div>
                  <p className="text3 -mb-1 text-sm">Balance</p>
                  <p className="text-green-600 text3 sm:text2 -mt-1 text-end">
                    ${totalIncomeSum - totalExpenseSum}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-24 sm:my-10 px-5 sm:px-0">{children}</div>
      </div>
    </div>
  );
};

export default Index;

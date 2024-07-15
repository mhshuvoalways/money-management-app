"use client";

import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import LoginIcon from "@/app/components/common/icons/Login";
import InputField from "@/app/components/common/input/Input";
import { register } from "@/app/lib/features/user/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import UserType from "@/app/types/UserType";
import Link from "next/link";
import { useState } from "react";
import Social from "../components/social/Social";

interface Props {}

const SignUpPage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event?.target.name]: event?.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(register(user));
  };

  return (
    <div className="h-auto sm:h-screen flex flex-col-reverse sm:flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-10 sm:gap-0">
      <div className="bg-transparent sm:bg-white w-full sm:w-6/12 h-full flex items-center justify-center">
        <div>
          <form className="space-y-5" onSubmit={submitHandler}>
            <p className="text1">Sign Up</p>
            <div>
              <label className="font-medium">Name</label>
              <InputField
                placeholder="John Doe"
                className="mt-2"
                name="name"
                value={user?.name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <InputField
                placeholder="johndoe@gmail.com"
                className="mt-2"
                name="email"
                value={user?.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <InputField
                placeholder="********"
                type="password"
                className="mt-2"
                name="password"
                value={user?.password}
                onChange={changeHandler}
              />
            </div>
            <div className="flex items-center gap-5">
              <GradientButton
                name="Sign Up"
                className="w-full py-1.5 border-primary border"
              />
              <Link href={"/login"}>
                <NoGradientButton
                  name="Login"
                  className="w-full border border-primary py-1.5 px-5 rounded-md hover:rounded-lg transition-all font-medium hover:shadow"
                />
              </Link>
            </div>
          </form>
          <Social />
        </div>
      </div>
      <div className="w-full sm:w-6/12 p-5">
        <LoginIcon />
      </div>
    </div>
  );
};

export default SignUpPage;

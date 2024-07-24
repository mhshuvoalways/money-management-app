"use client";

import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import LoginIcon from "@/app/components/common/icons/Login";
import InputField from "@/app/components/common/input/Input";
import Social from "@/app/components/social/Social";
import { clearErrors, register } from "@/app/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { RegisterLoginType } from "@/app/types/AuthType";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {}

const SignUpPage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { errors, isAuth } = useAppSelector((state: RootState) => state.auth);

  const [user, setUser] = useState<RegisterLoginType>({});

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearErrors(event.target.name));
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const captchaHandler = (value: string | null) => {
    dispatch(clearErrors("recaptcha"));
    setUser({
      ...user,
      recaptcha: value || null,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register(user));
  };

  if (isAuth) {
    redirect("/");
  }

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
              <p className="text-red-600 font-medium mt-1">{errors.name}</p>
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
              <p className="text-red-600 font-medium mt-1">{errors.email}</p>
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
              <p className="text-red-600 font-medium mt-1">{errors.password}</p>
            </div>
            <div>
              <label className="font-medium">Recaptcha</label>
              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITE_KEY || ""}
                onChange={captchaHandler}
                className="mt-2 !rounded-md focus:!rounded-lg cursor-pointer"
              />
              <p className="text-red-600 font-medium mt-1">
                {errors.recaptcha}
              </p>
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
            <p className="text-red-600 font-medium text-center text-lg">
              {errors.message}
            </p>
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

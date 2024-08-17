"use client";

import Button from "@/app/components/common/button/GradientButton";
import Input from "@/app/components/common/input/Input";
import {
  changePassword,
  clearChangePassErrors,
} from "@/app/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { ChangePasswordAuthType } from "@/app/types/AuthType";
import { useState } from "react";
import LoadingButton from "../../common/button/LoadingButton";

interface Props {}

const Information: React.FC<Props> = () => {
  const [password, setPassword] = useState<ChangePasswordAuthType>({});

  const dispatch = useAppDispatch();

  const { changePassWordsErrors, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
    dispatch(clearChangePassErrors(event.target.name));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(changePassword(password));
  };

  return (
    <form className="card" onSubmit={submitHandler}>
      <p className="text2">User Password</p>
      <div className="mt-5">
        <label className="font-medium">Current Password</label>
        <Input
          placeholder="********"
          type="password"
          className="mt-2"
          name="currentPassword"
          value={password.currentPassword}
          onChange={onchangeHandler}
        />
        <p className="text-red-600 font-medium mt-1">
          {changePassWordsErrors.currentPassword}
        </p>
      </div>
      <div className="mt-5">
        <label className="font-medium">New Password</label>
        <Input
          placeholder="********"
          type="password"
          className="mt-2"
          name="newPassword"
          value={password.newPassword}
          onChange={onchangeHandler}
        />
        <p className="text-red-600 font-medium mt-1">
          {changePassWordsErrors.newPassword}
        </p>
      </div>
      <div className="mt-5">
        <label className="font-medium">Confirm Password</label>
        <Input
          placeholder="********"
          type="password"
          className="mt-2"
          name="confirmPassword"
          value={password.confirmPassword}
          onChange={onchangeHandler}
        />
        <p className="text-red-600 font-medium mt-1">
          {changePassWordsErrors.confirmPassword}
        </p>
      </div>
      {isLoading ? (
        <LoadingButton className="mt-5 px-10" />
      ) : (
        <Button name="Save" className="mt-5 px-10" />
      )}
      <p className="text-red-600 font-medium text-center mt-5">
        {changePassWordsErrors.message}
      </p>
    </form>
  );
};

export default Information;

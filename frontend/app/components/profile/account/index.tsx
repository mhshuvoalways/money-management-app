"use client";

import Button from "@/app/components/common/button/GradientButton";
import Input from "@/app/components/common/input/Input";
import { changePassword } from "@/app/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { useState } from "react";

interface Props {}

const Information: React.FC<Props> = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();

  const { errors } = useAppSelector((state: RootState) => state.user);

  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
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
        <p className="text-red-600 font-medium mt-1">{errors.password}</p>
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
      </div>
      <Button name="Save" className="mt-5 px-10" />
    </form>
  );
};

export default Information;

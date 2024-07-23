"use client";

import Button from "@/app/components/common/button/GradientButton";
import Input from "@/app/components/common/input/Input";
import { updateUser } from "@/app/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { PostUserType } from "@/app/types/UserType";
import { useEffect, useState } from "react";

interface Props {}

const Information: React.FC<Props> = () => {
  const [user, setUser] = useState<PostUserType>({});

  const { errors, user: fetchUser } = useAppSelector(
    (state: RootState) => state.user
  );

  const dispatch = useAppDispatch();

  const userHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setUser(fetchUser);
  }, [fetchUser]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser(user));
  };

  return (
    <form className="card" onSubmit={onSubmitHandler}>
      <p className="text2">User Information</p>
      <div className="space-y-5 mt-5">
        <div>
          <label className="font-medium">Full Name</label>
          <Input
            placeholder="Name"
            className="mt-2"
            name="name"
            value={user?.name}
            onChange={userHandler}
          />
          <p className="text-red-600 font-medium mt-1">{errors.name}</p>
        </div>
        <div>
          <label className="font-medium">Phone Number</label>
          <Input
            placeholder="+880123456789"
            type="number"
            className="mt-2"
            name="phone"
            value={user?.phone}
            onChange={userHandler}
          />
        </div>
        <div>
          <label className="font-medium">Address</label>
          <Input
            placeholder="Address"
            className="mt-2"
            name="address"
            value={user?.address}
            onChange={userHandler}
          />
        </div>
      </div>
      <Button name="Save" className="mt-5 px-10" />
    </form>
  );
};

export default Information;

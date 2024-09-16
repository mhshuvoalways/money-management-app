"use client";

import Button from "@/app/components/common/button/GradientButton";
import LoadingButton from "@/app/components/common/button/LoadingButton";
import PlusIcon from "@/app/components/common/icons/Plus";
import Input from "@/app/components/common/input/Input";
import { clearError, createContribution } from "@/app/lib/features/goalSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { CreateGoalType } from "@/app/types/GoalType";
import { useEffect, useState } from "react";

interface Props {}

const Index: React.FC<Props> = () => {
  const [goal, setGoal] = useState<CreateGoalType>({});

  const dispatch = useAppDispatch();

  const { errors, goalObj, isLoadingAdd } = useAppSelector(
    (state: RootState) => state.goal
  );

  const goalHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal({
      ...goal,
      [event.target.name]: event.target.value,
    });
    dispatch(clearError());
  };

  useEffect(() => {
    setGoal(goalObj);
  }, [goalObj]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createContribution(goal));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="space-y-2">
        <label className="font-medium">Contribution</label>
        <Input
          type="number"
          placeholder={"400"}
          name="contribution"
          value={goal?.contribution?.toString()}
          onChange={goalHandler}
        />
        <p className="text-red-600 font-medium mt-1">{errors.contribution}</p>
      </div>
      <div className="mt-5">
        {isLoadingAdd ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button
            name="Add"
            icon={<PlusIcon className="size-5" />}
            className="w-full"
          />
        )}
      </div>
    </form>
  );
};

export default Index;

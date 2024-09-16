"use client";

import Button from "@/app/components/common/button/GradientButton";
import LoadingButton from "@/app/components/common/button/LoadingButton";
import PlusIcon from "@/app/components/common/icons/Plus";
import Input from "@/app/components/common/input/Input";
import {
  clearError,
  createGoal,
  updateGoal,
} from "@/app/lib/features/goalSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { CreateGoalType } from "@/app/types/GoalType";
import { useEffect, useState } from "react";
import ContributionButton from "./ContributionButton";

interface Props {}

const Index: React.FC<Props> = () => {
  const [goal, setGoal] = useState<CreateGoalType>({
    contributionType: "Manual",
  });

  const dispatch = useAppDispatch();

  const { errors, goalObj, dialogName, isLoadingAdd } = useAppSelector(
    (state: RootState) => state.goal
  );

  const isUpdate = dialogName === "update" ? true : false;

  const goalHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal({
      ...goal,
      [event.target.name]: event.target.value,
    });
    dispatch(clearError());
  };

  const goalContributionTypeHandler = (value: string) => {
    setGoal({
      ...goal,
      contributionType: value,
    });
  };

  useEffect(() => {
    if (isUpdate) {
      setGoal(goalObj);
    }
  }, [goalObj, isUpdate]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUpdate) {
      dispatch(updateGoal(goal));
    } else {
      dispatch(createGoal(goal));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-full font-semibold">
        <ContributionButton
          value="Manual"
          selectContribution={goal.contributionType}
          setSelectContribution={goalContributionTypeHandler}
        />
        <ContributionButton
          value="Automatic"
          selectContribution={goal.contributionType}
          setSelectContribution={goalContributionTypeHandler}
        />
      </div>
      <form onSubmit={onSubmitHandler} className="mt-5">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="font-medium">Goal Name *</label>
            <Input
              placeholder="Goal name"
              name="goalName"
              value={goal?.goalName}
              onChange={goalHandler}
            />
            <p className="text-red-600 font-medium mt-1">{errors.goalName}</p>
          </div>
          <div className="space-y-2">
            <label className="font-medium">Target Amount *</label>
            <Input
              type="number"
              placeholder="2000"
              name="targetAmount"
              value={goal?.targetAmount?.toString()}
              onChange={goalHandler}
            />
            <p className="text-red-600 font-medium mt-1">
              {errors.targetAmount}
            </p>
          </div>
          {!isUpdate && (
            <>
              <div className="space-y-2">
                <label className="font-medium">Saved So Far *</label>
                <Input
                  type="number"
                  placeholder="100"
                  name="saved"
                  value={goal?.saved?.toString()}
                  onChange={goalHandler}
                />
                <p className="text-red-600 font-medium mt-1">{errors.saved}</p>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="font-medium">Contribution</label>
                  <p className="text-sm text-gray-400">
                    {goal.contributionType === "Manual"
                      ? "You have to provide your contribution manually"
                      : "Your contribution will be saved automatically at the end of each month"}
                  </p>
                </div>
                <Input
                  type="number"
                  placeholder={"400"}
                  name="contribution"
                  value={goal?.contribution?.toString()}
                  onChange={goalHandler}
                />
                <p className="text-red-600 font-medium mt-1">
                  {errors.contribution}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="mt-5">
          {isLoadingAdd ? (
            <LoadingButton className="w-full" />
          ) : (
            <Button
              name={isUpdate ? "Save" : "Add"}
              icon={!isUpdate ? <PlusIcon className="size-5" /> : <></>}
              className="w-full"
            />
          )}
        </div>
      </form>
    </>
  );
};

export default Index;

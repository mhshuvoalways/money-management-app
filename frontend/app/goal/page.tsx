"use client";

import Button from "@/app/components/common/button/GradientButton";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import PlusIcon from "@/app/components/common/icons/Plus";
import AddContribution from "@/app/components/goal/AddContribution";
import AddGoal from "@/app/components/goal/AddGoal";
import Lists from "@/app/components/goal/Lists";
import Progress from "@/app/components/goal/Progress";
import Goal from "@/app/components/transaction/goal";
import {
  closeDialog,
  deleteGoal,
  dialogHandler,
} from "@/app/lib/features/goalSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetGoalsType } from "@/app/types/GoalType";
import { useEffect, useState } from "react";

const GoalPage = () => {
  const [selected, setSelected] = useState<GetGoalsType>({
    _id: "",
    goalName: "",
    targetAmount: 0,
    saved: 0,
    contributionType: "",
    contributions: [],
  });

  const { dialogName, goals, goalObj, isLoadingDelete } = useAppSelector(
    (state: RootState) => state.goal
  );

  const dispatch = useAppDispatch();

  const selectGoalHandler = (goal: GetGoalsType) => {
    setSelected(goal);
  };

  useEffect(() => {
    if (!selected?._id && goals[0]) {
      setSelected(goals[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals, selected?._id]);

  return (
    <Header>
      <div className="flex justify-between gap-5 flex-wrap items-end">
        <div>
          <p className="text1">Goals!</p>
          <p className="text3">{`Here's what's happening with your goals.`}</p>
        </div>
        <Button
          name="Add Goal"
          icon={<PlusIcon className="size-5" />}
          onClick={() =>
            dispatch(dialogHandler({ dialogName: "add", walletObj: {} }))
          }
        />
      </div>
      <Dialog
        isOpen={dialogName ? true : false}
        title={
          dialogName === "addContribution"
            ? "add contribution"
            : dialogName + " goal"
        }
        openHandler={() => dispatch(closeDialog())}
      >
        {dialogName === "add" && <AddGoal />}
        {dialogName === "update" && <AddGoal />}
        {dialogName === "addContribution" && <AddContribution />}
        {dialogName === "delete" && (
          <ConfirmDeleteDialog
            closeHandler={() => dispatch(closeDialog())}
            onSubmitHandler={() =>
              goalObj._id && dispatch(deleteGoal(goalObj._id))
            }
            isLoading={isLoadingDelete}
          />
        )}
      </Dialog>
      <div className="mt-10 flex gap-10 items-start flex-wrap md:flex-nowrap">
        <Lists goals={goals} selected={selected} onClick={selectGoalHandler} />
        <div className="w-full md:w-9/12 space-y-10">
          <Progress selected={selected} />
          <Goal selected={selected}/>
        </div>
      </div>
    </Header>
  );
};

export default GoalPage;

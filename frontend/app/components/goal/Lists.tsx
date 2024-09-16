import EditIcon from "@/app/components/common/icons/Edit";
import PlusIcon from "@/app/components/common/icons/PlusNoRound";
import TrashIcon from "@/app/components/common/icons/Trash";
import Calc from "@/app/components/goal/Calc";
import { dialogHandler } from "@/app/lib/features/goalSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { GetGoalsType } from "@/app/types/GoalType";
import React from "react";
import GoalItemSkeleton from "../skeleton/goal/GoalItemSkeleton";

interface Props {
  goals: GetGoalsType[];
  selected: GetGoalsType;
  onClick: (obj: GetGoalsType) => void;
}

const Lists: React.FC<Props> = ({ goals, selected, onClick }) => {
  const { isLoadingGet } = useAppSelector((state: RootState) => state.goal);

  const dispatch = useAppDispatch();

  return (
    <div className="space-y-5 w-full md:w-3/12">
      {isLoadingGet ? (
        <GoalItemSkeleton />
      ) : (
        goals.map((g) => (
          <div
            className={`card flex justify-between items-center gap-2 cursor-pointer h-24 ${
              selected._id === g._id && "bgGradient"
            }`}
            key={g._id}
            onClick={() => onClick(g)}
          >
            <Calc
              goal={g}
              className={selected._id === g._id ? "text-slate-100" : ""}
            />
            <div className="flex items-center gap-2">
              <PlusIcon
                className={`size-8 cursor-pointer text-primary hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                  selected._id === g._id
                    ? "dark:bg-slate-100"
                    : "dark:bg-slate-600"
                }`}
                onClick={() =>
                  dispatch(
                    dialogHandler({
                      dialogName: "addContribution",
                      goalObj: g,
                    })
                  )
                }
              />
              <EditIcon
                className={`size-8 cursor-pointer text-primary hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                  selected._id === g._id
                    ? "dark:bg-slate-100"
                    : "dark:bg-slate-600"
                }`}
                onClick={() =>
                  dispatch(
                    dialogHandler({
                      dialogName: "update",
                      goalObj: g,
                    })
                  )
                }
              />
              <TrashIcon
                className={`size-8 cursor-pointer text-red-400 hover:shadow-sm bg-slate-100 rounded py-1.5 px-2 ${
                  selected._id === g._id
                    ? "dark:bg-slate-100"
                    : "dark:bg-slate-600"
                }`}
                onClick={() => {
                  dispatch(
                    dialogHandler({
                      dialogName: "delete",
                      goalObj: g,
                    })
                  );
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Lists;

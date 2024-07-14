import Circle from "@/app/components/common/progressbar/Circle";
import Calc from "@/app/components/goal/Calc";
import { MyContext } from "@/app/context";
import List from "@/app/types/GoalType";
import React, { useContext } from "react";
import { green, slate } from "tailwindcss/colors";

interface Props {
  goals: List[];
  selected: List;
  onClick: (obj: List) => void;
}

const Lists: React.FC<Props> = ({ goals, selected, onClick }) => {
  const { darkMode } = useContext(MyContext);

  return (
    <div className="space-y-5 w-full md:w-3/12">
      {goals.map((g) => (
        <div
          className={`card flex justify-between items-center gap-2 cursor-pointer ${
            selected.id === g.id && "bgGradient"
          }`}
          key={g.id}
          onClick={() => onClick(g)}
        >
          <div className="flex items-center gap-3">
            <div className="size-14 font-bold">
              {selected.id === g.id ? (
                <Circle
                  percentage={g.percentage}
                  textColor={slate[100]}
                  pathColor={green[500]}
                  trailColor={slate[100]}
                />
              ) : (
                <Circle
                  percentage={g.percentage}
                  textColor={darkMode ? slate["300"] : slate["500"]}
                  pathColor={green[600]}
                  trailColor={darkMode ? slate[600] : slate[100]}
                />
              )}
            </div>
            <Calc
              goal={g}
              className={selected.id === g.id ? "text-slate-100" : ""}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lists;

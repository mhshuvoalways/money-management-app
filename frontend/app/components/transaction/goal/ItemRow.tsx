import { GetGoalsType } from "@/app/types/GoalType";
import moment from "moment";

interface Props {
  selected: GetGoalsType;
}

const ItemRow: React.FC<Props> = ({ selected }) => {
  const newArr = selected.contributions.map((con) => ({
    goalName: selected.goalName,
    contribution: Number(con.contribution),
    date: moment(new Date(con.date)).format("LL"),
  }));

  return (
    <>
      {[...newArr].reverse().map((tran, index) => (
        <tr
          key={index}
          className={`font-medium rounded-lg border-t dark:border-slate-500`}
        >
          <td
            className={`px-4 pt-4 text-nowrap ${
              newArr.length !== index + 1 && "p-4"
            }`}
          >
            {tran.goalName}
          </td>
          <td className={`px-4 pt-4 ${newArr.length !== index + 1 && "p-4"}`}>
            {tran.date}
          </td>
          <td className={`px-4 pt-4 ${newArr.length !== index + 1 && "p-4"}`}>
            {tran.contribution}
          </td>
        </tr>
      ))}
    </>
  );
};

export default ItemRow;

import Linebar from "@/app/components/common/progressbar/Linebar";
import List from "@/app/types/Goal";

interface Props {
  selected: List;
}

const Progress: React.FC<Props> = ({ selected }) => {
  return (
    <div className="card">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-1">
          <div>
            <p className="font-medium opacity-80">Saved</p>
            <p className="text1 mt-1">${selected.fulfilled}.00</p>
          </div>
          <div className="text-end">
            <p className="font-medium opacity-80">Goal</p>
            <p className="text1 mt-1">${selected.totalAmount}.00</p>
          </div>
        </div>
        <Linebar percentage={selected.percentage} />
        <div className="flex items-center justify-between gap-1">
          <p className="font-medium opacity-80">{selected.percentage}%</p>
          <p className="font-medium opacity-80 text-end">
            {100 - selected.percentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;

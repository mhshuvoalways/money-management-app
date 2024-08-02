import { GetIncomeExpenseType } from "@/app/types/IncomeExpenseType";

interface NewArray extends GetIncomeExpenseType {
  percentage: string;
}

interface Props {
  title: string;
  percentageArray: NewArray[];
}

const IncomeExpensesBreakDown: React.FC<Props> = ({
  title,
  percentageArray,
}) => {
  return (
    <div className="card">
      <p className="text2">{title}</p>
      <div className="mt-5 space-y-4 overflow-y-auto h-80 pr-2 card-scroll">
        {percentageArray?.map((item, index) => (
          <div
            className={`flex items-center justify-between gap-3 ${
              percentageArray.length !== index + 1 &&
              "dark:border-slate-500 border-b pb-3"
            }`}
            key={index}
          >
            {item.category ? (
              <div className="flex items-center gap-3">
                <p
                  className="size-8 rounded-full flex items-center justify-center"
                  style={{
                    background: item.category.icon.bgColor,
                  }}
                >
                  {item.category.icon.emoji}
                </p>
                <p className="text3 font-medium">
                  {item.category.categoryName}
                </p>
              </div>
            ) : (
              <p>N/A</p>
            )}
            <div className="flex items-center gap-3">
              <p className="text3 font-medium w-20">${item.amount}</p>
              <p className="font-medium">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeExpensesBreakDown;

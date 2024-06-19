const categories = [
  {
    id: 1,
    icon: "🍉",
    name: "Food",
    amount: 342,
    percentage: 32,
  },
  {
    id: 2,
    icon: "🚌",
    name: "Transport",
    amount: 342,
    percentage: 32,
  },
  {
    id: 3,
    icon: "🛍️",
    name: "Education",
    amount: 342,
    percentage: 32,
  },
  {
    id: 4,
    icon: "🍉",
    name: "Food",
    amount: 342,
    percentage: 32,
  },
  {
    id: 5,
    icon: "🚌",
    name: "Transport",
    amount: 342,
    percentage: 32,
  },
  {
    id: 6,
    icon: "🛍️",
    name: "Education",
    amount: 342,
    percentage: 32,
  },
  {
    id: 7,
    icon: "🚌",
    name: "Transport",
    amount: 342,
    percentage: 32,
  },
  {
    id: 8,
    icon: "🛍️",
    name: "Education",
    amount: 342,
    percentage: 32,
  },
  {
    id: 9,
    icon: "🍉",
    name: "Food",
    amount: 348,
    percentage: 32,
  },
];

interface Props {
  title: string;
}

const ExpensesBreakDown: React.FC<Props> = ({ title }) => {
  return (
    <div className="card">
      <p className="text2">{title}</p>
      <div className="mt-5 space-y-4 overflow-y-auto h-80 pr-2 expense-scroll">
        {categories.map((category, index) => (
          <div
            className={`flex items-center justify-between gap-3 ${
              categories.length !== index + 1 &&
              "dark:border-slate-500 border-b pb-3"
            }`}
            key={category.id}
          >
            <p className="text3 font-medium">
              {category.icon} {category.name}
            </p>
            <div className="flex items-center gap-3">
              <p className="text3 font-medium">${category.amount}</p>
              <p className="font-medium">{category.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesBreakDown;

const categories = [
  {
    id: 1,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 2,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 3,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 4,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 5,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 6,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 7,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 8,
    time: "June 09, 2024",
    amount: 342,
    percentage: 32,
  },
  {
    id: 9,
    time: "June 09, 2024",
    amount: -8,
    percentage: -2,
  },
];

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Monthly Savings Breakdown</p>
      <div className="mt-5 space-y-4 overflow-y-auto h-80 pr-2 card-scroll">
        {categories.map((category, index) => (
          <div
            className={`flex items-center justify-between gap-3 ${
              categories.length !== index + 1 &&
              "dark:border-slate-500 border-b pb-3"
            }`}
            key={category.id}
          >
            <p className="text3 font-medium">{category.time}</p>
            <div className="flex items-center gap-3">
              <p className="text3 font-medium">৳{category.amount}</p>
              <p className="font-medium">{category.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;

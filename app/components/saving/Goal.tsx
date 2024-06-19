import Circle from "@/app/components/progressbar/Circle";

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Saving Goals</p>
      <div className="mt-5 grid grid-cols-2 gap-5">
        <div className="w-6/12 sm:w-28 mx-auto">
          <Circle percentage={65} />
          <p className="text2 text-center mt-3">Vacation</p>
        </div>
        <div className="w-6/12 sm:w-28 mx-auto">
          <Circle percentage={19} />
          <p className="text2 text-center mt-3">Gift</p>
        </div>
        <div className="w-6/12 sm:w-28 mx-auto">
          <Circle percentage={91} />
          <p className="text2 text-center mt-3">New Card</p>
        </div>
        <div className="w-6/12 sm:w-28 mx-auto">
          <Circle percentage={78} />
          <p className="text2 text-center mt-3">Laptop</p>
        </div>
      </div>
    </div>
  );
};

export default index;

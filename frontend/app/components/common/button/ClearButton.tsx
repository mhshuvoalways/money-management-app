"use client";

interface Props {
  title: string;
  isUpdate: boolean;
  clearHandler: () => void;
}

const ClearButton: React.FC<Props> = ({ title, isUpdate, clearHandler }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text2">
        {isUpdate ? "Save" : "Add"} {title}
      </p>
      {isUpdate && (
        <p
          className="text3 cursor-pointer hover:underline hover:text-primary py-1 pl-1"
          onClick={clearHandler}
        >
          Clear
        </p>
      )}
    </div>
  );
};

export default ClearButton;

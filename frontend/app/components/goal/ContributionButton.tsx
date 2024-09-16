interface Props {
  value: string;
  selectContribution: string | undefined;
  setSelectContribution: (value: string) => void;
}

const ContributionButton: React.FC<Props> = ({
  value,
  selectContribution,
  setSelectContribution,
}) => {
  return (
    <button
      className={`w-full ${
        selectContribution === value
          ? "bg-white dark:bg-gray-700 py-2 px-3 shadow rounded-full transition"
          : ""
      }`}
      onClick={() => setSelectContribution(value)}
    >
      {value} Contribution
    </button>
  );
};

export default ContributionButton;

interface Props {
  placeholder: string;
  type?: string;
}

const Search: React.FC<Props> = ({ type, placeholder }) => {
  return (
    <input
      type={type || "text"}
      className="w-full py-2 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg"
      placeholder={placeholder}
    />
  );
};

export default Search;

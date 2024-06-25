interface Props {
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
}

const Search: React.FC<Props> = ({ type, placeholder, className, value }) => {
  return (
    <input
      type={type || "text"}
      value={value}
      className={`w-full h-10 py-1 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg hover:ring-1 focus:ring-1 ring-primary ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Search;

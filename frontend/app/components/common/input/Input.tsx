interface Props {
  placeholder?: string;
  type?: string;
  name?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  type = "text",
  placeholder,
  name,
  className,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      className={`w-full h-10 py-1 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg hover:ring-1 focus:ring-1 ring-primary ${className}`}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
};

export default Search;

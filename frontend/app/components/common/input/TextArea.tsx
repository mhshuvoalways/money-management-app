interface Props {
  className?: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({
  className,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <textarea
      className={`w-full h-14 py-1 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg hover:ring-1 focus:ring-1 ring-primary ${className}`}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;

interface Props {
  className?: string;
  placeholder: string;
}

const TextArea: React.FC<Props> = ({ className, placeholder }) => {
  return (
    <textarea
      className={`w-full h-14 py-1 px-4 outline-0 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg hover:ring-1 focus:ring-1 ring-primary ${className}`}
      placeholder={placeholder}
    />
  );
};

export default TextArea;

interface Props {
  children: React.ReactNode;
}

const FakeField: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full h-10 py-1 px-4 bg-slate-100 dark:bg-slate-600 rounded-md focus:rounded-lg hover:ring-1 focus:ring-1 ring-primary">
      {children}
    </div>
  );
};

export default FakeField;

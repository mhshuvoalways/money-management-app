interface Props {
  title: string;
  description: string;
}

const Item: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="w-6/12">
      <p className="text2">{title}</p>
      <p className="text3 opacity-60 text-sm font-medium mt-2">{description}</p>
    </div>
  );
};

export default Item;

import AddCategory from "@/app/components/categories/AddCategory";
import Items from "@/app/components/categories/Items";
import Header from "@/app/components/common/header";
import SettingsHeader from "@/app/components/settings/header";

const categories = [
  {
    id: 1,
    icon: "🍉",
    bg: "#22d3ee",
    name: "Food",
  },
  {
    id: 2,
    icon: "🚌",
    bg: "#7367f0",
    name: "Transport",
  },
  {
    id: 3,
    icon: "🛍️",
    bg: "#22d3ee",
    name: "Education",
  },
  {
    id: 4,
    icon: "🍉",
    bg: "#22d3ee",
    name: "Food",
  },
  {
    id: 5,
    icon: "🚌",
    bg: "#7367f0",
    name: "Transport",
  },
  {
    id: 8,
    icon: "🚌",
    bg: "#22d3ee",
    name: "Transport",
  },
  {
    id: 6,
    icon: "🛍️",
    bg: "#7367f0",
    name: "Education",
  },
];

const page = () => {
  return (
    <Header>
      <p className="text1">Settings!</p>
      <p className="text3">{`Here's what's happening with your settings.`}</p>
      <SettingsHeader />
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <AddCategory />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Items categoryName="Income" categories={categories} />
          <Items categoryName="Expense" categories={categories} />
        </div>
      </div>
    </Header>
  );
};

export default page;

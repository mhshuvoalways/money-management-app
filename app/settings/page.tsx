import CreateCategory from "@/app/components/categories";
import Header from "@/app/components/common/header";

const page = () => {
  return (
    <Header>
      <p className="text1">Settings!</p>
      <p className="text3">{`Here's what's happening with your settings.`}</p>
      <div className="flex items-center gap-5 mt-10">
        <p className="text3 cursor-pointer font-medium">Categories</p>
        <p className="text3 cursor-pointer font-medium">Currencies</p>
        <p className="text3 cursor-pointer font-medium">Support</p>
      </div>
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <CreateCategory />
        </div>
        <div className="w-full lg:w-8/12 space-y-10"></div>
      </div>
    </Header>
  );
};

export default page;

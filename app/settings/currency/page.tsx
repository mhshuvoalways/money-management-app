import Header from "@/app/components/common/header";
import Exchange from "@/app/components/settings/currency/Exchange";
import SettingsHeader from "@/app/components/settings/header";

const page = () => {
  return (
    <Header>
      <p className="text1">Currency!</p>
      <p className="text3">{`Here's what's happening with your currency.`}</p>
      <SettingsHeader />
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <Exchange />
        </div>
        <div className="w-full lg:w-8/12 space-y-10"></div>
      </div>
    </Header>
  );
};

export default page;

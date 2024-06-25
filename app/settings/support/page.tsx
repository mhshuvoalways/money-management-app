import Header from "@/app/components/common/header";
import SettingsHeader from "@/app/components/settings/header";

const page = () => {
  return (
    <Header>
      <p className="text1">Settings!</p>
      <p className="text3">{`Here's what's happening with your settings.`}</p>
      <SettingsHeader />
      <p className="mt-10 flex justify-center items-center text1 h-[calc(100vh/2.5)]">
        The page is comming soon
      </p>
    </Header>
  );
};

export default page;

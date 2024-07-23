import NoGradientButton from "@/app/components/common/button/NoGradientButton";

interface Props {}

const Account: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">Delete Account</p>
      <p className="text3 mt-1 font-medium">Permanently delete your account.</p>
      <p className="mt-2 opacity-80 text3">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </p>
      <NoGradientButton
        name="Delete Account"
        className="mt-5 py-2 px-5 bg-red-600 text-slate-100"
      />
    </div>
  );
};

export default Account;

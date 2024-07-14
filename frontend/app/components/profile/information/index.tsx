import Input from "@/app/components/common/input/Input";
import Button from "../../common/button/GradientButton";

interface Props {}

const Information: React.FC<Props> = () => {
  return (
    <div className="card">
      <p className="text2">User Information</p>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label className="font-medium">Full Name</label>
          <Input placeholder="Name" className="mt-2" />
        </div>
        <div>
          <label className="font-medium">New Email</label>
          <Input placeholder="Email" type="email" className="mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label className="font-medium">New Password</label>
          <Input placeholder="********" type="password" className="mt-2" />
        </div>
        <div>
          <label className="font-medium">Address</label>
          <Input placeholder="Address" className="mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <label className="font-medium">City</label>
          <Input placeholder="City" className="mt-2" />
        </div>
        <div>
          <label className="font-medium">Country</label>
          <Input placeholder="Country" className="mt-2" />
        </div>
      </div>
      <Button name="Save" className="mt-5 px-10" />
    </div>
  );
};

export default Information;

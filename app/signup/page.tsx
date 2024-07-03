import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import LoginIcon from "@/app/components/common/icons/Login";
import InputField from "@/app/components/common/input/Input";
import Link from "next/link";
import Social from "../components/auth/Social";

interface Props {}

const page: React.FC<Props> = () => {
  return (
    <div className="h-auto sm:h-screen flex flex-col-reverse sm:flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-10 sm:gap-0">
      <div className="bg-transparent sm:bg-white w-full sm:w-6/12 h-full flex items-center justify-center">
        <div>
          <div className="space-y-5">
            <p className="text1">Sign Up</p>
            <div>
              <label className="font-medium">Name</label>
              <InputField
                placeholder="John Doe"
                type="email"
                className="mt-2"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <InputField placeholder="johndoe@gmail.com" className="mt-2" />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <InputField
                placeholder="********"
                type="password"
                className="mt-2"
              />
            </div>
            <div className="flex items-center gap-5">
              <GradientButton
                name="Sign Up"
                className="w-full py-1.5 border-primary border"
              />
              <Link href={"/login"}>
                <NoGradientButton
                  name="Login"
                  className="w-full border border-primary py-1.5 px-5 rounded-md hover:rounded-lg transition-all font-medium hover:shadow"
                />
              </Link>
            </div>
          </div>
          <Social />
        </div>
      </div>
      <div className="w-full sm:w-6/12 p-5">
        <LoginIcon />
      </div>
    </div>
  );
};

export default page;

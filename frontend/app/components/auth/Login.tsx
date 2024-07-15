import GradientButton from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import CheckBox from "@/app/components/common/headlessui/CheckBox";
import LoginIcon from "@/app/components/common/icons/Login";
import InputField from "@/app/components/common/input/Input";
import Social from "@/app/components/social/Social";
import GoogleIcon from "@/public/icons/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const Login: React.FC<Props> = () => {
  
  const login = useGoogleLogin({
    // onSuccess: (credentialResponse) => {
    //   dispatch(userLoginwithGoogle(credentialResponse.access_token));
    // },
    // onError: () => {
    //   dispatch(notiAction("Login Failed"));
    // },
  });

  return (
    <div className="h-auto sm:h-screen flex flex-col-reverse sm:flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-10 sm:gap-0">
      <div className="bg-transparent sm:bg-white w-full sm:w-6/12 h-full flex items-center justify-center">
        <div>
          <div className="space-y-5">
            <p className="text1">Login</p>
            <div>
              <label className="font-medium">Email</label>
              <InputField
                placeholder="johndoe@gmail.com"
                type="email"
                className="mt-2"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <InputField
                placeholder="********"
                type="password"
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex gap-1 items-center">
                <CheckBox checked={false} /> Remember me
              </div>
              <Link href={"/"} className="text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <GradientButton
                name="Login"
                className="w-full py-1.5 border-primary border"
              />
              <Link href={"/signup"}>
                <NoGradientButton
                  name="Sign Up"
                  className="w-full border border-primary py-1.5 px-5 rounded-md hover:rounded-lg transition-all font-medium hover:shadow"
                />
              </Link>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text2">Or</p>
                <p>login with using</p>
              </div>
              <NoGradientButton
                name="Login with google"
                icon={
                  <Image src={GoogleIcon} alt="google icon" className="w-6" />
                }
                className="border py-1.5 px-5 rounded-md hover:rounded-lg transition-all font-medium hover:shadow w-full mt-2"
                onClick={login}
              />
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

export default Login;

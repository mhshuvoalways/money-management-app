import LoginPage from "@/app/components/auth/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {}

const page: React.FC<Props> = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
      <LoginPage />
    </GoogleOAuthProvider>
  );
};

export default page;

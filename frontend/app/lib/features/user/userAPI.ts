import axios from "@/app/services/api/axios";
import UserType from "@/app/types/UserType";

export const registerUser = async (user: UserType) => {
  const response = await axios.post("/user/registerUser", user);

  return response;
};

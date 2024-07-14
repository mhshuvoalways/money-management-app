import axios from "@/app/services/api/axios";
import UserType from "@/app/types/UserType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuth: boolean;
  user: UserType;
}

const initialState: UserState = {
  isAuth: false,
  user: {
    name: "",
    email: "",
    avatar: {
      url: "",
      publicId: "",
    },
  },
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: async (state, action: PayloadAction<UserType>) => {
      const user = await axios.post("/user/userRegisterd", action.payload);
      state.user = user.data;
    },
  },
});

export const { registerUser } = counterSlice.actions;

export default counterSlice.reducer;

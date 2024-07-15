import { registerUser } from "@/app/lib/features/user/userAPI";
import UserType from "@/app/types/UserType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  user: UserType;
}

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  error: "",
  user: {
    name: "",
    email: "",
    avatar: {
      url: "",
      publicId: "",
    },
  },
};

export const register = createAsyncThunk(
  "user/register",
  async (user: UserType) => {
    const response = await registerUser(user);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message || "Failed to register";
      });
  },
});

export default counterSlice.reducer;

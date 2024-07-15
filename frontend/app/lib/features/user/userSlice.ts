import { registerUser } from "@/app/lib/features/user/userAPI";
import UserType from "@/app/types/UserType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  errors: {};
  user: UserType;
}

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  error: "",
  errors: {},
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
  async (user: UserType, { rejectWithValue }) => {
    try {
      const response = await registerUser(user);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to register");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.errors = {};
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to register";
        state.errors = action.payload || {};
      });
  },
});

export default userSlice.reducer;

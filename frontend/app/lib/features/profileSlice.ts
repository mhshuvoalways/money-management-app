import axios from "@/app/services/api/axios";
import { GetUserType, PostUserType } from "@/app/types/UserType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorsType extends PostUserType {
  message?: string;
}

interface UserState {
  isLoading: boolean;
  profile: GetUserType;
  message?: string;
  errors: ErrorsType;
}

const initialState: UserState = {
  isLoading: false,
  profile: {
    _id: "",
    name: "",
    avatar: {
      url: "",
      publicId: "",
    },
    phone: "",
    address: "",
    plan: "",
    user: {
      _id: "",
      email: "",
      isVerified: false,
      createdAt: new Date(),
    },
  },
  message: "",
  errors: {},
};

export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (profile: PostUserType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/profile/updateUser`, profile);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update the profile");
    }
  }
);

export const getMe = createAsyncThunk(
  "profile/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/profile/getMe`);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get my profile");
    }
  }
);

export const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.errors[field as keyof typeof state.errors];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // update profile
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.profile = response;
        state.message = message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // get me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(getMe.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.profile = response;
        state.message = message;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;

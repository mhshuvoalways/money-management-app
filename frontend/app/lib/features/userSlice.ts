import axios from "@/app/services/api/axios";
import setAuthToken from "@/app/services/api/setAuthToken";
import {
  ChangePasswordType,
  GetUserType,
  PostUserType,
} from "@/app/types/UserType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface ErrorsType extends PostUserType {
  message?: string;
}

interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  user: GetUserType;
  message?: string;
  errors: ErrorsType;
}

const initialState: UserState = {
  isAuth: true,
  isLoading: false,
  user: {
    _id: "",
    name: "",
    email: "",
    avatar: {
      url: "",
      publicId: "",
    },
    phone: "",
    address: "",
    plan: "",
    isVerified: false,
    createdAt: new Date(),
  },
  message: "",
  errors: {},
};

const handleAuthentication = (
  state: UserState,
  response: any,
  message: string,
  token: string
) => {
  state.isLoading = false;
  state.isAuth = true;
  state.user = response;
  state.message = message;
  setAuthToken(token);
  localStorage.setItem("token", JSON.stringify(token));
};

export const register = createAsyncThunk(
  "user/register",
  async (user: PostUserType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/registerUser", user);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to register");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (user: PostUserType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/loginUser", user);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to login");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: PostUserType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/user/updateUser/${user._id}`, user);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update the user");
    }
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/getMe`);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get my profile");
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (user: ChangePasswordType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/user/changePassword`, user);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to change password");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.errors[field as keyof typeof state.errors];
      }
    },
    authenticate: (state) => {
      const userToken = localStorage.getItem("token");
      const token = userToken ? JSON.parse(userToken) : null;
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          state.isAuth = false;
          localStorage.clear();
        } else {
          state.isAuth = true;
        }
      } else {
        state.isAuth = false;
        localStorage.clear();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        const { response, message, token } = action.payload;
        handleAuthentication(state, response, message, token);
      })
      .addCase(register.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        const { response, message, token } = action.payload;
        handleAuthentication(state, response, message, token);
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.user = response;
        state.message = message;
      })
      .addCase(updateUser.rejected, (state, action) => {
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
        state.user = response;
        state.message = message;
      })
      .addCase(getMe.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.isLoading = false;
        state.message = message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors, authenticate } = userSlice.actions;

export default userSlice.reducer;

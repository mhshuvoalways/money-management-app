import axios from "@/app/services/api/axios";
import setAuthToken from "@/app/services/api/setAuthToken";
import {
  ChangePasswordAuthType,
  RegisterLoginType,
} from "@/app/types/AuthType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface ErrorsType extends RegisterLoginType {
  message?: string;
}

interface ChangePasswordErrorsType extends ChangePasswordAuthType {
  message?: string;
}

interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  message?: string;
  errors: ErrorsType;
  changePassWordsErrors: ChangePasswordErrorsType;
  tokenTimeoutId?: NodeJS.Timeout;
}

const initialState: UserState = {
  isAuth: true,
  isLoading: false,
  message: "",
  errors: {},
  changePassWordsErrors: {},
};

const handleAuthentication = (
  state: UserState,
  token: string,
  message: string
) => {
  state.isLoading = false;
  state.isAuth = true;
  state.message = message;
  setAuthToken(token);
  localStorage.setItem("token", JSON.stringify(token));
};

export const register = createAsyncThunk(
  "auth/register",
  async (auth: RegisterLoginType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/registerUser", auth);
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
  "auth/login",
  async (auth: RegisterLoginType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/loginUser", auth);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to login");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (auth: ChangePasswordAuthType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/auth/changePassword`, auth);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to change password");
    }
  }
);

const logout = (state: UserState) => {
  localStorage.clear();
  state.isAuth = false;
  if (state.tokenTimeoutId) {
    clearTimeout(state.tokenTimeoutId);
    state.tokenTimeoutId = undefined;
  }
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.errors[field as keyof typeof state.errors];
      }
    },
    clearChangePassErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.changePassWordsErrors[
          field as keyof typeof state.changePassWordsErrors
        ];
      }
    },
    authenticate: (state) => {
      const userToken = localStorage.getItem("token");
      const token = userToken ? JSON.parse(userToken) : null;
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          logout(state);
        } else if (decodedToken.exp) {
          state.isAuth = true;
          const timeout = (decodedToken.exp - currentTime) * 1000;
          if (state.tokenTimeoutId) {
            clearTimeout(state.tokenTimeoutId);
          }
          state.tokenTimeoutId = setTimeout(() => {
            logout(state);
          }, timeout);
        } else {
          logout(state);
        }
      } else {
        logout(state);
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
        const { message, token } = action.payload;
        handleAuthentication(state, token, message);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
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
        const { message, token } = action.payload;
        handleAuthentication(state, token, message);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.changePassWordsErrors = {};
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.isLoading = false;
        state.message = message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.changePassWordsErrors = action.payload;
        } else {
          state.changePassWordsErrors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors, clearChangePassErrors, authenticate } =
  userSlice.actions;

export default userSlice.reducer;

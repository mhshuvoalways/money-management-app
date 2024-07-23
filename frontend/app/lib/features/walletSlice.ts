import axios from "@/app/services/api/axios";
import { CreateWalletType, GetWalletType } from "@/app/types/WalletType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorType extends CreateWalletType {
  message?: string;
}

interface CategoryState {
  isLoading: boolean;
  wallets: GetWalletType[];
  dialog: boolean;
  walletObj: CreateWalletType;
  errors: ErrorType;
  message?: string;
}

const initialState: CategoryState = {
  isLoading: false,
  wallets: [],
  dialog: false,
  walletObj: {},
  errors: {},
  message: "",
};

export const createWallet = createAsyncThunk(
  "wallet/createWallet",
  async (wallet: CreateWalletType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/wallet/createWallet", wallet);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to add wallet");
    }
  }
);

export const getWallets = createAsyncThunk(
  "wallet/getWallets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/wallet/getWallets");
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get wallets");
    }
  }
);

export const deleteWallet = createAsyncThunk(
  "wallet/deleteWallet",
  async (walletId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/wallet/deleteWallet/${walletId}`);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to delete wallet");
    }
  }
);

export const updateWallet = createAsyncThunk(
  "wallet/updateWallet",
  async (wallet: CreateWalletType, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/wallet/updateWallet/${wallet._id}`,
        wallet
      );
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update wallet");
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = {};
    },
    addWalletHandler: (state) => {
      state.dialog = !state.dialog;
      if (state.dialog) {
        state.walletObj = {};
      }
    },
    updateWalletHandler: (state, action: PayloadAction<CreateWalletType>) => {
      state.dialog = !state.dialog;
      state.walletObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWallet.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.dialog = !state.dialog;
        state.wallets.push(response);
        state.message = message;
      })
      .addCase(createWallet.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // get wallets
      .addCase(getWallets.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.wallets = response;
        state.message = message;
      })
      .addCase(getWallets.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // delete wallet
      .addCase(deleteWallet.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        const findIndex = state.wallets.filter(
          (item) => item._id !== response._id
        );
        state.wallets = findIndex;
        state.message = message;
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // update wallet
      .addCase(updateWallet.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.dialog = !state.dialog;
        const findIndex = state.wallets.findIndex(
          (item) => item._id === response._id
        );
        state.wallets[findIndex] = response;
        state.message = message;
      })
      .addCase(updateWallet.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearError, addWalletHandler, updateWalletHandler } =
  walletSlice.actions;

export default walletSlice.reducer;

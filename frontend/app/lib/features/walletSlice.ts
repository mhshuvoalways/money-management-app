import axios from "@/app/services/api/axios";
import { CreateWalletType, GetWalletType } from "@/app/types/WalletType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ErrorType extends CreateWalletType {
  message?: string;
}

interface CategoryState {
  isLoading: boolean;
  wallets: GetWalletType[];
  dialogName: string;
  walletObj: CreateWalletType;
  errors: ErrorType;
  message?: string;
}

const initialState: CategoryState = {
  isLoading: false,
  wallets: [],
  dialogName: "",
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

const clearDialog = (state: CategoryState) => {
  state.dialogName = "";
  state.walletObj = {};
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = {};
    },
    dialogHandler: (state, action) => {
      const { dialogName, walletObj } = action.payload;
      state.dialogName = dialogName;
      state.walletObj = walletObj;
    },
    closeDialog: (state) => {
      clearDialog(state);
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
        state.wallets.push(response);
        state.message = message;
        clearDialog(state);
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

      // update wallet
      .addCase(updateWallet.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.dialogName = action.payload;
        const findIndex = state.wallets.findIndex(
          (item) => item._id === response._id
        );
        state.wallets[findIndex] = response;
        state.message = message;
        clearDialog(state);
      })
      .addCase(updateWallet.rejected, (state, action) => {
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
        const newWallets = state.wallets.filter(
          (item) => item._id !== response._id
        );
        state.wallets = newWallets;
        state.message = message;
        clearDialog(state);
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearError, dialogHandler, closeDialog } = walletSlice.actions;

export default walletSlice.reducer;

import axios from "@/app/services/api/axios";
import { CreateWalletType, GetWalletType } from "@/app/types/WalletType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ErrorType extends CreateWalletType {
  message?: string;
}

interface CategoryState {
  isLoadingGet: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: boolean;
  wallets: GetWalletType[];
  dialogName: string;
  walletObj: CreateWalletType;
  errors: ErrorType;
  message?: string;
}

const initialState: CategoryState = {
  isLoadingGet: false,
  isLoadingAdd: false,
  isLoadingDelete: false,
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

export const transferBalance = createAsyncThunk(
  "wallet/transferWallet",
  async (
    wallet: {
      fromWalletId: string;
      toWalletId: string;
      balance: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/wallet/transferWallet`, wallet);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to transfer balance");
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

export const updateWalletAll = createAsyncThunk(
  "wallet/updateWalletAll",
  async (wallets: GetWalletType[], { rejectWithValue }) => {
    try {
      const response = await axios.put(`/wallet/updateWalletAll`, wallets);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update all wallets");
    }
  }
);

const sortByPosition = (state: CategoryState) => {
  return state.wallets.sort((a, b) => a.walletPosition - b.walletPosition);
};

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
    updateWalletsAllHandler: (state, action) => {
      state.wallets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWallet.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.wallets.push(response);
        state.message = message;
        clearDialog(state);
        sortByPosition(state);
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

      // get wallets
      .addCase(getWallets.pending, (state) => {
        state.isLoadingGet = true;
        state.errors = {};
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingGet = false;
        state.wallets = response;
        state.message = message;
        sortByPosition(state);
      })
      .addCase(getWallets.rejected, (state, action) => {
        state.isLoadingGet = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

      // tranfer wallet's balance
      .addCase(transferBalance.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(transferBalance.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.dialogName = action.payload;
        const fromFindIndex = state.wallets.findIndex(
          (item) => item._id === response[0]._id
        );
        const toFindIndex = state.wallets.findIndex(
          (item) => item._id === response[1]._id
        );
        state.wallets[fromFindIndex] = response[0];
        state.wallets[toFindIndex] = response[1];
        state.message = message;
        clearDialog(state);
      })
      .addCase(transferBalance.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

      // update wallet
      .addCase(updateWallet.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.dialogName = action.payload;
        const findIndex = state.wallets.findIndex(
          (item) => item._id === response._id
        );
        state.wallets[findIndex] = response;
        state.message = message;
        clearDialog(state);
      })
      .addCase(updateWallet.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

      // delete wallet
      .addCase(deleteWallet.pending, (state) => {
        state.isLoadingDelete = true;
        state.errors = {};
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingDelete = false;
        const newWallets = state.wallets.filter(
          (item) => item._id !== response._id
        );
        state.wallets = newWallets;
        state.message = message;
        clearDialog(state);
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        state.isLoadingDelete = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const {
  clearError,
  dialogHandler,
  closeDialog,
  updateWalletsAllHandler,
} = walletSlice.actions;

export default walletSlice.reducer;

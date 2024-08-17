import { getWallets } from "@/app/lib/features/walletSlice";
import axios from "@/app/services/api/axios";
import {
  GetIncomeExpenseErrorType,
  GetIncomeExpenseType,
  PostIncomeExpenseType,
} from "@/app/types/IncomeExpenseType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorType extends GetIncomeExpenseErrorType {
  message?: string;
}

interface IncomeState {
  isLoadingGet: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: boolean;
  incomes: GetIncomeExpenseType[];
  income: GetIncomeExpenseType;
  dialog: boolean;
  errors: ErrorType;
  message?: string;
}

const initialState: IncomeState = {
  isLoadingGet: false,
  isLoadingAdd: false,
  isLoadingDelete: false,
  incomes: [],
  income: {
    _id: "",
    category: {
      _id: "",
      categoryPosition: 0,
      categoryName: "",
      categoryType: "",
      icon: {
        emoji: "",
        bgColor: "",
      },
    },
    wallet: {
      _id: "",
      balance: 0,
      walletPosition: 0,
      walletName: "",
    },
    date: new Date(),
    amount: 0,
    description: "",
  },
  dialog: false,
  errors: {},
  message: "",
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (obj: PostIncomeExpenseType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/income/addIncome", obj);
      dispatch(getWallets());
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to add income");
    }
  }
);

export const getIncomes = createAsyncThunk(
  "income/getIncomes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/income/getIncomes");
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get incomes");
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (incomeId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/income/deleteIncome/${incomeId}`);
      dispatch(getWallets());
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to delete income");
    }
  }
);

export const updateIncome = createAsyncThunk(
  "income/updateIncome",
  async (obj: PostIncomeExpenseType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`/income/updateIncome/${obj._id}`, obj);
      dispatch(getWallets());
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update income");
    }
  }
);

const clearObj = (state: IncomeState) => {
  state.dialog = false;
  state.income = {
    _id: "",
    category: {
      _id: "",
      categoryPosition: 0,
      categoryName: "",
      categoryType: "",
      icon: {
        emoji: "",
        bgColor: "",
      },
    },
    wallet: {
      _id: "",
      balance: 0,
      walletPosition: 0,
      walletName: "",
    },
    date: new Date(),
    amount: 0,
    description: "",
  };
};

const sortByDate = (state: IncomeState) => {
  return state.incomes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    clearErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.errors[field as keyof typeof state.errors];
      }
    },
    incomeHandler: (state, action) => {
      const { dialog, income } = action.payload;
      state.income = income;
      if (dialog) {
        state.dialog = true;
      }
    },
    clearIncomeObj: (state) => {
      clearObj(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIncome.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.incomes.push(response);
        sortByDate(state);
        state.message = message;
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // get incomes
      .addCase(getIncomes.pending, (state) => {
        state.isLoadingGet = true;
        state.errors = {};
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingGet = false;
        state.incomes = response;
        sortByDate(state);
        state.message = message;
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.isLoadingGet = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // delete income
      .addCase(deleteIncome.pending, (state) => {
        state.isLoadingDelete = true;
        state.errors = {};
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingDelete = false;
        const findIndex = state.incomes.filter(
          (item) => item._id !== response._id
        );
        state.incomes = findIndex;
        state.message = message;
        clearObj(state);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.isLoadingDelete = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // update income
      .addCase(updateIncome.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        const findIndex = state.incomes.findIndex(
          (item) => item._id === response._id
        );
        state.incomes[findIndex] = response;
        state.message = message;
        sortByDate(state);
        clearObj(state);
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors, clearIncomeObj, incomeHandler } =
  incomeSlice.actions;

export default incomeSlice.reducer;

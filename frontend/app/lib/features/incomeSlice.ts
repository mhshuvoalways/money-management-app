import axios from "@/app/services/api/axios";
import {
  GetIncomeExpenseType,
  PostIncomeExpenseType,
} from "@/app/types/IncomeExpenseType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorType extends PostIncomeExpenseType {
  message?: string;
}

interface CategoryState {
  isLoading: boolean;
  incomes: GetIncomeExpenseType[];
  income: GetIncomeExpenseType;
  errors: ErrorType;
  message?: string;
}

const initialState: CategoryState = {
  isLoading: false,
  incomes: [],
  income: {
    _id: "",
    category: {
      _id: "",
      categoryName: "",
      categoryType: "",
      icon: {
        emoji: "",
        bgColor: "",
      },
    },
    wallet: {
      _id: "",
      walletName: "",
      balance: 0,
    },
    date: "",
    amount: 0,
    description: "",
  },
  errors: {},
  message: "",
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (obj: PostIncomeExpenseType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/income/addIncome", obj);
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
  async (incomeId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/income/deleteIncome/${incomeId}`);
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
  async (obj: PostIncomeExpenseType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/income/updateIncome/${obj._id}`, obj);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update income");
    }
  }
);

const clearObj = (state: CategoryState) => {
  state.income = {
    _id: "",
    category: {
      _id: "",
      categoryName: "",
      categoryType: "",
      icon: {
        emoji: "",
        bgColor: "",
      },
    },
    wallet: {
      _id: "",
      walletName: "",
      balance: 0,
    },
    date: "",
    amount: 0,
    description: "",
  };
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
    clearIncomeObj: (state) => {
      clearObj(state);
    },
    updateIncomeHandler: (
      state,
      action: PayloadAction<GetIncomeExpenseType>
    ) => {
      state.income = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIncome.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.incomes.push(response);
        state.message = message;
      })
      .addCase(addIncome.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // get incomes
      .addCase(getIncomes.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.incomes = response;
        state.message = message;
      })
      .addCase(getIncomes.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // delete income
      .addCase(deleteIncome.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        const findIndex = state.incomes.filter(
          (item) => item._id !== response._id
        );
        state.incomes = findIndex;
        state.message = message;
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // update income
      .addCase(updateIncome.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        const findIndex = state.incomes.findIndex(
          (item) => item._id === response._id
        );
        state.incomes[findIndex] = response;
        state.message = message;
        clearObj(state);
      })
      .addCase(updateIncome.rejected, (state, action) => {
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors, clearIncomeObj, updateIncomeHandler } =
  incomeSlice.actions;

export default incomeSlice.reducer;

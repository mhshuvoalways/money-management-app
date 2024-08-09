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

interface ExpenseState {
  isLoadingGet: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: boolean;
  expenses: GetIncomeExpenseType[];
  expense: GetIncomeExpenseType;
  dialog: boolean;
  errors: ErrorType;
  message?: string;
}

const initialState: ExpenseState = {
  isLoadingGet: false,
  isLoadingAdd: false,
  isLoadingDelete: false,
  expenses: [],
  expense: {
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
    },
    date: new Date(),
    amount: 0,
    description: "",
  },
  dialog: false,
  errors: {},
  message: "",
};

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (obj: PostIncomeExpenseType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/expense/addExpense", obj);
      dispatch(getWallets());
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to add expense");
    }
  }
);

export const getExpenses = createAsyncThunk(
  "expense/getExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/expense/getExpenses");
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get expenses");
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/expense/deleteExpense/${expenseId}`
      );
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to delete expense");
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async (obj: PostIncomeExpenseType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `/expense/updateExpense/${obj._id}`,
        obj
      );
      dispatch(getWallets());
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update expense");
    }
  }
);

const clearObj = (state: ExpenseState) => {
  state.dialog = false;
  state.expense = {
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
    },
    date: new Date(),
    amount: 0,
    description: "",
  };
};

const sortByDate = (state: ExpenseState) => {
  return state.expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const incomeSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.errors[field as keyof typeof state.errors];
      }
    },
    expenseHandler: (state, action) => {
      const { dialog, expense } = action.payload;
      state.expense = expense;
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
      .addCase(addExpense.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.expenses.push(response);
        sortByDate(state);
        state.message = message;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // get expenses
      .addCase(getExpenses.pending, (state) => {
        state.isLoadingGet = true;
        state.errors = {};
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingGet = false;
        state.expenses = response;
        sortByDate(state);
        state.message = message;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoadingGet = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // delete expense
      .addCase(deleteExpense.pending, (state) => {
        state.isLoadingDelete = true;
        state.errors = {};
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingDelete = false;
        const findIndex = state.expenses.filter(
          (item) => item._id !== response._id
        );
        state.expenses = findIndex;
        state.message = message;
        clearObj(state);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoadingDelete = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // update expense
      .addCase(updateExpense.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        const findIndex = state.expenses.findIndex(
          (item) => item._id === response._id
        );
        state.expenses[findIndex] = response;
        state.message = message;
        sortByDate(state);
        clearObj(state);
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors, clearIncomeObj, expenseHandler } =
  incomeSlice.actions;

export default incomeSlice.reducer;

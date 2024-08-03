import axios from "@/app/services/api/axios";
import { GetCategoryType, PostCategoryType } from "@/app/types/CategoryType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIncomes } from "./incomeSlice";

interface ErrorType extends PostCategoryType {
  message?: string;
}

interface CategoryState {
  isLoading: boolean;
  categories: GetCategoryType[];
  category: GetCategoryType;
  dialog: boolean;
  errors: ErrorType;
  message?: string;
}

const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  category: {
    _id: "",
    categoryName: "",
    categoryType: "",
    icon: {
      emoji: "",
      bgColor: "",
    },
  },
  dialog: false,
  errors: {},
  message: "",
};

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (cate: PostCategoryType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/category/createCategory", cate);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to add category");
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/category/getCategories");
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get categories");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/category/deleteCategory/${categoryId}`
      );
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to delete category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (cate: PostCategoryType, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `/category/updateCategory/${cate._id}`,
        cate
      );
      dispatch(getIncomes());
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update category");
    }
  }
);

const clearObj = (state: CategoryState) => {
  state.dialog = false;
  state.category = {
    _id: "",
    categoryName: "",
    categoryType: "",
    icon: {
      emoji: "",
      bgColor: "",
    },
  };
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearErrors: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (field) {
        delete state.errors[field as keyof typeof state.errors];
      }
    },
    categoryHandler: (state, action) => {
      const { dialog, category } = action.payload;
      state.category = category;
      if (dialog) {
        state.dialog = true;
      }
    },
    clearUpdateObj: (state) => {
      clearObj(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.categories.push(response);
        state.message = message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // get categories
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        state.categories = response;
        state.message = message;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        const findIndex = state.categories.filter(
          (item) => item._id !== response._id
        );
        state.categories = findIndex;
        state.message = message;
        clearObj(state);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })
      // update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoading = false;
        const findIndex = state.categories.findIndex(
          (item) => item._id === response._id
        );
        state.categories[findIndex] = response;
        state.message = message;
        clearObj(state);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearErrors, clearUpdateObj, categoryHandler } =
  categorySlice.actions;

export default categorySlice.reducer;

import axios from "@/app/services/api/axios";
import { CreateGoalType, GetGoalsType } from "@/app/types/GoalType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ErrorType extends CreateGoalType {
  message?: string;
}

interface State {
  isLoadingGet: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: boolean;
  goals: GetGoalsType[];
  dialogName: string;
  goalObj: CreateGoalType;
  errors: ErrorType;
  message?: string;
}

const initialState: State = {
  isLoadingGet: false,
  isLoadingAdd: false,
  isLoadingDelete: false,
  goals: [],
  dialogName: "",
  goalObj: {},
  errors: {},
  message: "",
};

export const createGoal = createAsyncThunk(
  "goal/createGoal",
  async (goal: CreateGoalType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/goal/createGoal", goal);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to add goal");
    }
  }
);

export const createContribution = createAsyncThunk(
  "goal/createContribution",
  async (goal: CreateGoalType, { rejectWithValue }) => {
    console.log(goal);
    
    try {
      const response = await axios.put(`/goal/createContribution/${goal._id}`, goal);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to create contribution");
    }
  }
);

export const getGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/goal/getGoals");
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to get goals");
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goal/deleteGoal",
  async (goalId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/goal/deleteGoal/${goalId}`);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to delete goal");
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goal/updateGoal",
  async (goal: CreateGoalType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/goal/updateGoal/${goal._id}`, goal);
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Failed to update goal");
    }
  }
);

const clearDialog = (state: State) => {
  state.dialogName = "";
  state.goalObj = {};
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = {};
    },
    dialogHandler: (state, action) => {
      const { dialogName, goalObj } = action.payload;
      state.dialogName = dialogName;
      state.goalObj = goalObj;
    },
    closeDialog: (state) => {
      clearDialog(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.goals.push(response);
        state.message = message;
        clearDialog(state);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

      // get goals
      .addCase(getGoals.pending, (state) => {
        state.isLoadingGet = true;
        state.errors = {};
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingGet = false;
        state.goals = response;
        state.message = message;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoadingGet = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

      // update goal
      .addCase(updateGoal.pending, (state) => {
        state.isLoadingAdd = true;
        state.errors = {};
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingAdd = false;
        state.dialogName = action.payload;
        const findIndex = state.goals.findIndex(
          (item) => item._id === response._id
        );
        state.goals[findIndex] = response;
        state.message = message;
        clearDialog(state);
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoadingAdd = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      })

        // add contribution
        .addCase(createContribution.pending, (state) => {
          state.isLoadingAdd = true;
          state.errors = {};
        })
        .addCase(createContribution.fulfilled, (state, action) => {
          const { response, message } = action.payload;
          state.isLoadingAdd = false;
          state.dialogName = action.payload;
          const findIndex = state.goals.findIndex(
            (item) => item._id === response._id
          );
          state.goals[findIndex] = response;
          state.message = message;
          clearDialog(state);
        })
        .addCase(createContribution.rejected, (state, action) => {
          state.isLoadingAdd = false;
          if (action.payload) {
            state.errors = action.payload;
          } else {
            state.errors.message = action.error.message;
          }
        })

      // delete goal
      .addCase(deleteGoal.pending, (state) => {
        state.isLoadingDelete = true;
        state.errors = {};
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        const { response, message } = action.payload;
        state.isLoadingDelete = false;
        const newGoals = state.goals.filter(
          (item) => item._id !== response._id
        );
        state.goals = newGoals;
        state.message = message;
        clearDialog(state);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoadingDelete = false;
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors.message = action.error.message;
        }
      });
  },
});

export const { clearError, dialogHandler, closeDialog } = goalSlice.actions;

export default goalSlice.reducer;

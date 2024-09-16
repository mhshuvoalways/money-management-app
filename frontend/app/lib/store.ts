import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import expenseSlice from "./features/expenseSlice";
import goalSlice from "./features/goalSlice";
import incomeSlice from "./features/incomeSlice";
import profileSlice from "./features/profileSlice";
import walletSlice from "./features/walletSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      profile: profileSlice,
      wallet: walletSlice,
      goal: goalSlice,
      category: categorySlice,
      income: incomeSlice,
      expense: expenseSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

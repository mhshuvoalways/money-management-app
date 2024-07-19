import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import userSlice from "./features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      category: categorySlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

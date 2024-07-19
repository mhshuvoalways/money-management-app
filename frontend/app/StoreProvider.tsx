"use client";

import { MyContext } from "@/app/context";
import { AppStore, makeStore } from "@/app/lib/store";
import setAuthToken from "@/app/services/api/setAuthToken";
import { montserrat, openSans, roboto } from "@/app/utils/fonts";
import { useContext, useRef } from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const StoreProvider: React.FC<Props> = ({ children }) => {
  const userToken = localStorage.getItem("token");
  const token = userToken ? JSON.parse(userToken) : null;
  if (token) {
    setAuthToken(token);
  }

  const { darkMode } = useContext(MyContext);

  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <html
      lang="en"
      className={`overflow-x-hidden ${montserrat.variable} ${
        openSans.variable
      } ${roboto.variable} ${darkMode && "dark"}`}
    >
      <body className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-200">
        <Provider store={storeRef.current}>{children}</Provider>;
      </body>
    </html>
  );
};

export default StoreProvider;

"use client";

import { MyContext } from "@/app/context";
import { montserrat, openSans, roboto } from "@/app/utils/fonts";
import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}

const LayOutHtml: React.FC<Props> = ({ children }) => {
  const { darkMode } = useContext(MyContext);

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${
        roboto.variable
      } ${darkMode && "dark"}`}
    >
      <body className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-200">
        {children}
      </body>
    </html>
  );
};

export default LayOutHtml;

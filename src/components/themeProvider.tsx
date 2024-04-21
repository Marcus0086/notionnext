"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

const env = process.env.NODE_ENV || "development";

const noConsole = () => {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  React.useEffect(() => {
    if (env !== "development") {
      noConsole();
    }
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;

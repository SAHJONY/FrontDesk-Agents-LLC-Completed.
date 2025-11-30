"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      {...props}
      themes={["light", "dark", "system"]}
      enableSystem={props.enableSystem ?? true}
      defaultTheme={props.defaultTheme ?? "system"}
    >
      {children}
    </NextThemesProvider>
  );
}

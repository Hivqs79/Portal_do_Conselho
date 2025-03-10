"use client";
import DevPalleteChangerMenu from "@/components/DevPalleteChangerMenu";
import Header from "@/components/Header";
import { ThemeProviderContext, useThemeContext } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material";
import { ReactElement, useEffect } from "react";

export default function InnerLayout({ children }: { children: ReactElement }) {
  return (
    <ThemeProviderContext>
      <CoreLayout>{children}</CoreLayout>
    </ThemeProviderContext>
  );
}

function CoreLayout({ children }: { children: ReactElement }) {
  const { theme, backgroundColor, primaryColor } = useThemeContext();

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--background", backgroundColor);
  }, [primaryColor]);

  return (
    <ThemeProvider theme={theme}>
      <body style={{ backgroundColor: backgroundColor, overflowX: "hidden" }}>
        <Header variant="pedagogic" />
        {children}
        <DevPalleteChangerMenu />
      </body>
    </ThemeProvider>
  );
}

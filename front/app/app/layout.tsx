"use client";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement } from "react";
import { ThemeProviderContext, useThemeContext } from "../hooks/useTheme";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="pt">
      <ThemeProviderContext>
        <InnerLayout>{children}</InnerLayout>
      </ThemeProviderContext>
    </html>
  );
}

function InnerLayout({ children }: { children: ReactElement }) {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <body className="bg-[#f5f5f5] dark:bg-[#333]">
        {children}
      </body>
    </ThemeProvider>
  );
}

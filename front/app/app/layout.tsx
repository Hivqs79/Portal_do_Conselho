"use client";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement } from "react";
import { ThemeProviderContext, useThemeContext } from "../hooks/useTheme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="pt" className="dark">
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
      <body className="bg-[#f0f0f0] dark:bg-[#333]">
        {children}
      </body>
    </ThemeProvider>
  );
}

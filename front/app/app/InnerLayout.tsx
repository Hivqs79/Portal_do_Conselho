"use client"
import { ThemeProviderContext, useThemeContext } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material";
import { ReactElement } from "react";

export default function InnerLayout({ children }: { children: ReactElement }) {
    return  (
        <ThemeProviderContext>
            <CoreLayout>{children}</CoreLayout>
        </ThemeProviderContext>
    )
}

function CoreLayout({ children }: { children: ReactElement }) {
    const { theme } = useThemeContext();
  
    return (
      <ThemeProvider theme={theme}>
        <body className="bg-[#f5f5f5] dark:bg-[#333]">
          {children}
        </body>
      </ThemeProvider>
    );
}
  
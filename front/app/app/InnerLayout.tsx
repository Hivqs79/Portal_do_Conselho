"use client";
import DevPalleteChangerMenu from "@/components/DevPalleteChangerMenu";
import Header from "@/components/Header";
import { ThemeProviderContext, useThemeContext } from "@/hooks/useTheme";
import { Box, ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isLoginPage = pathname?.includes("/login");

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--background", backgroundColor);
  }, [primaryColor]);

  return (
    <ThemeProvider theme={theme}>
      <body style={{ backgroundColor: backgroundColor, overflowX: "hidden" }}>
        {!isLoginPage ? (
          <>
            <Header variant="pedagogic" />
            <Box className="flex flex-col min-h-screen mx-[15%]">
              {children}
            </Box>
          </>
        ) : (
          <>{children}</>
        )}
        <DevPalleteChangerMenu />
      </body>
    </ThemeProvider>
  );
}

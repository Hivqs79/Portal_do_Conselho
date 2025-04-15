"use client";
import DevPalleteChangerMenu from "@/components/DevPalleteChangerMenu";
import Header from "@/components/Header";
import { RoleProvider, useRoleContext } from "@/hooks/useRole";
import { ThemeProviderContext, useThemeContext } from "@/hooks/useTheme";
import { Box, ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import LoadingPage from "@/components/LoadingPage";

export default function InnerLayout({ children }: { children: ReactElement }) {
  return (
    <ThemeProviderContext>
      <RoleProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <CoreLayout>{children}</CoreLayout>
        </LocalizationProvider>
      </RoleProvider>
    </ThemeProviderContext>
  );
}

function CoreLayout({ children }: { children: ReactElement }) {
  const {
    theme,
    backgroundColor,
    primaryColor,
    secondaryColor,
    terciaryColor,
    reloadTheme
  } = useThemeContext();
  const { role, setRole, userId, setUserId } = useRoleContext();
  const pathname = usePathname();
  const isLoginPage = pathname?.includes("/login");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);  

  useEffect(() => {
    reloadTheme();
  }, [hydrated])

  useEffect(() => {
    if (!pathname) {
      document.cookie = `lastRoute=/; path=/`;
    }

    if (pathname !== "/realize-council") {
      document.cookie = `lastRoute=${pathname}; path=/`;
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    );
    document.documentElement.style.setProperty(
      "--terciary-color",
      terciaryColor
    );
  }, [secondaryColor, primaryColor, terciaryColor]);

  useEffect(() => {
    if (role === "") {
      setRole("pedagogic");
    }        
  }, [role, setRole]);

  useEffect(() => {
    if (userId === -1) {
      setUserId(16);
    }        
    console.log("teste inner");
  }, [userId, setUserId]);

  if (!hydrated) {
    return <LoadingPage message="Carregando tema..." />;
  }

  return (
    <ThemeProvider theme={theme}>
      <body style={{ backgroundColor: backgroundColor, overflowX: "hidden" }}>
        {!isLoginPage ? (
          <>
            <Header variant={role} />
            <Box className="flex flex-col mb-24 mx-[5%] sm:mx-[15%]">
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
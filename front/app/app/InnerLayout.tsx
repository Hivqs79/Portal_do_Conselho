"use client";
// import DevPalleteChangerMenu from "@/components/DevPalleteChangerMenu";
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
import { Decryptor } from "@/encryption/Decryptor";

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
    reloadTheme,
  } = useThemeContext();
  const { role, token, setName, setRole, setToken, setUserId } =
    useRoleContext();
  const pathname = usePathname();
  const isLoginPage = pathname?.includes("/login");
  const [hydrated, setHydrated] = useState(false);
  const isChatPage = pathname?.includes("/chat");

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    reloadTheme();
  }, [hydrated]);

  const getTokenFromCookie = () => {
    try {
      const tokenCookie = document.cookie.split("; ").find((row) => row.startsWith("token="));
      const encodedToken = tokenCookie?.split("=")[1] || "";
      const decodedToken = decodeURIComponent(encodedToken);
      const decryptedData = Decryptor(decodedToken);
      return decryptedData;
    } catch (error) {
      console.log("Error in getTokenFromCookie:", error);
      return "";
    }
  };

  useEffect(() => {
    if (!isLoginPage) {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));

      if (userCookie) {
        const decryptedUser = Decryptor(decodeURIComponent(userCookie.split("=")[1]));
        setName(decryptedUser?.name || "");
        setUserId(decryptedUser?.userId || -1);
        setRole(decryptedUser?.role || "");
        const token = getTokenFromCookie();
        setToken(token as string);
      }
    }

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

  if (!hydrated) {
    return <LoadingPage message="Carregando tema..." />;
  }

  return (
    <ThemeProvider theme={theme}>
      <body style={{ backgroundColor: backgroundColor, overflowX: "hidden" }}>
        {!isLoginPage ? (
          <>
            <Header variant={role} />
            <Box
              className={`flex flex-col ${
                isChatPage
                  ? "!pt-[10rem] mx-[1%] sm:mx-[4%] h-[90vh] mb-14"
                  : "mx-[5%] sm:mx-[15%] mb-24"
              }`}
            >
              {children}
            </Box>
          </>
        ) : (
          <>{children}</>
        )}
        {/* <DevPalleteChangerMenu /> */}
      </body>
    </ThemeProvider>
  );
}

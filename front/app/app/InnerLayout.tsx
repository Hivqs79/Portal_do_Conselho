/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

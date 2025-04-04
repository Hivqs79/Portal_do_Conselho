"use client";
import DevPalleteChangerMenu from "@/components/DevPalleteChangerMenu";
import Header from "@/components/Header";
import { RoleProvider, useRoleContext } from "@/hooks/useRole";
import { ThemeProviderContext, useThemeContext } from "@/hooks/useTheme";
import { Box, ThemeProvider } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

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
  } = useThemeContext();
  const { role, setRole } = useRoleContext();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname?.includes("/login");
  const [isCouncilHappening, setIsCouncilHappening] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname !== "/realize-council") {
      sessionStorage.setItem("lastRoute", pathname ? pathname : "/");
    }

    fetch("http://localhost:8081/council?isHappening=true")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const hasActiveCouncil = data.content.length > 0;
        setIsCouncilHappening(hasActiveCouncil);
        
        if (!hasActiveCouncil && pathname === "/realize-council") {
          const lastRoute = sessionStorage.getItem("lastRoute") || "/";
          router.replace(lastRoute);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados: ", error);
        setIsCouncilHappening(false);
        if (pathname === "/realize-council") {
          router.replace("/404");
        }
      });
  }, [pathname, router]);

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

  // Se estiver na rota /realize-council e não houver conselho acontecendo, não renderiza nada
  if (pathname === "/realize-council" && isCouncilHappening === false) {
    return null;
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
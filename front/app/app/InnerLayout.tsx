"use client";
import DevPalleteChangerMenu from "@/components/DevPalleteChangerMenu";
import Header from "@/components/Header";
import { ThemeProviderContext, useThemeContext } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function InnerLayout({ children }: { children: ReactElement }) {
    return (
        <ThemeProviderContext>
            <CoreLayout>{children}</CoreLayout>
        </ThemeProviderContext>
    )
}

function CoreLayout({ children }: { children: ReactElement }) {
    const { theme, backgroundColor } = useThemeContext();
    const pathname = usePathname();
    const isLoginPage = pathname?.includes("/login");

    return (
        <ThemeProvider theme={theme}>
            <body style={{ backgroundColor: backgroundColor }}>
                {!isLoginPage && <Header variant="pedagogic" />}
                {children}
                <DevPalleteChangerMenu />
            </body>
        </ThemeProvider>
    );
}

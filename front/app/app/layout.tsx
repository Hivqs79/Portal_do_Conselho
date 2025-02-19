"use client"
// import type { Metadata } from "next";
import "./globals.css";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { cloneElement, ReactNode, useState, Dispatch, SetStateAction, ReactElement } from "react";
import ThemeSettings from "./ThemeSettings";
import {ThemeProviderContext} from "../hooks/useTheme";

// export const metadata: Metadata = {
//   title: "Portal do Conselho",
//   description: "Um site para a melhor organização de conselhos do SENAI",
// };

interface LayoutProps {
  children: ReactElement;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {   
  // const [mode, setMode] = useState(ThemeSettings.getThemeMode());
  // const [pallete, setPallete] = useState("blue");
  const [theme, setTheme] = useState(ThemeSettings.createThemePallete());
  const childrenWithProps = cloneElement(children, { setTheme });
  // useEffect(() => {
  //   setTheme(ThemeSettings.createThemePallete());
  // })


  return (
    <html lang="pt" className="dark">
      <ThemeProviderContext>        
        <ThemeProvider theme={theme}>
          <body
            className=""
            >
            {children}
          </body>
        </ThemeProvider>
      </ThemeProviderContext>
    </html>
  );
}

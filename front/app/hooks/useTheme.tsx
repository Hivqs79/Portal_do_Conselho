import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { Theme } from "@mui/material/styles";
import ThemeSettings from "../theme/ThemeSettings";
import {BrandColors} from "../theme/BrandColors";

type PossibleColors = "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "purple" | "orange";

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  reloadTheme: () => void;
  changeThemeMode: () => void;
  changePallete: (color: PossibleColors) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderContext = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(ThemeSettings.createThemePallete());
  const [themeColor, setThemeColor] = useState("");
  const [themeMode, setThemeMode] = useState("light");

  const reloadTheme = () => {
    setTheme(ThemeSettings.createThemePallete());
  };

  const changeThemeMode = () => {
    console.log(ThemeSettings.changeThemeMode());
    reloadTheme();
  };

  const changePallete = (color: PossibleColors) => {
    localStorage.setItem("theme", color);
    setThemeColor(color);
    BrandColors.changePallete(color);
    reloadTheme();
  };

  let color: any = localStorage.getItem("theme");

  if (color === null) {
    localStorage.setItem("theme", "blue");
    setThemeColor("blue");    
  } else if (themeColor != color) {
    changePallete(color);
  }


  return (
    <ThemeContext.Provider value={{ theme, setTheme, reloadTheme, changeThemeMode, changePallete }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProviderContext");
  }
  return context;
};

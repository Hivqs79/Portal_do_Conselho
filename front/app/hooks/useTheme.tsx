import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { createTheme, Theme } from "@mui/material/styles";
import ThemeSettings from "../app/ThemeSettings";
import BrandColors from "../app/BrandColors";

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  reloadTheme: () => void;
  changeThemeMode: () => void;
  changePallete: (color: "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "purple" | "orange") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderContext = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(ThemeSettings.createThemePallete());

  const reloadTheme = () => {
    setTheme(ThemeSettings.createThemePallete());
  };

  const changeThemeMode = () => {
    ThemeSettings.changeThemeMode();
    reloadTheme();
  };

  const changePallete = (color: "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "purple" | "orange") => {
    BrandColors.changePallete(color);
    reloadTheme();
  };

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

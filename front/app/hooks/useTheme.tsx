import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Theme } from "@mui/material/styles";
import ThemeSettings from "../theme/ThemeSettings";
import {BrandColors, colors} from "../theme/BrandColors";

type PossibleColors = "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "purple" | "orange";

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  reloadTheme: () => void;
  changeThemeMode: () => void;
  changePallete: (color: PossibleColors) => void;
  primaryColor: string;
  secondaryColor: string;
  terciaryColor: string;
  constrastColor: string;
  backgroundColor: string;
  whiteColor: string;
  blackColor: string;
  colorByMode: string;
  colorByModeSecondary: string;
  lighterColor: (string: string) => string;
  darkerColor: (string: string) => string;
  lightGrayColor: string;
  darkGrayColor: string;
  getThemeMode: () => "dark" | "light";
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderContext = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(ThemeSettings.createThemePallete());
  const [themeColor, setThemeColor] = useState("");
  const primaryColor = BrandColors.primary_color;
  const secondaryColor = BrandColors.secondary_color;
  const terciaryColor = BrandColors.terciary_color;
  const constrastColor = ThemeSettings.getContrastThemeColor();
  const backgroundColor = ThemeSettings.getBackgroundThemeColor();
  const whiteColor = colors.whiteColor;
  const blackColor = colors.blackColor;
  const colorByMode = ThemeSettings.getColorByMode();
  const colorByModeSecondary = ThemeSettings.getColorByModeSecondary();
  const lighterColor = ThemeSettings.lighterColor;
  const darkerColor = ThemeSettings.darkerColor;
  const lightGrayColor = ThemeSettings.lightGrayColor();
  const darkGrayColor = ThemeSettings.darkGrayColor();
  const getThemeMode = () => ThemeSettings.getThemeMode();

  const reloadTheme = () => {
    setTheme(ThemeSettings.createThemePallete());
  };

  const changeThemeMode = () => {
    const mode = ThemeSettings.changeThemeMode();
    localStorage.setItem("mode", mode ? "dark" : "light");
    reloadTheme();
  };

  const changePallete = (color: PossibleColors) => {
    localStorage.setItem("theme", color);
    setThemeColor(color);
    BrandColors.changePallete(color);
    reloadTheme();
  };

  const color: string | null = localStorage.getItem("theme");

  if (color === null) {
    localStorage.setItem("theme", "blue");
    setThemeColor("blue");    
  } else if (themeColor !== color) {
    changePallete(color as PossibleColors);
  }


  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      reloadTheme, 
      changeThemeMode, 
      changePallete, 
      primaryColor, 
      secondaryColor, 
      terciaryColor, 
      constrastColor, 
      backgroundColor, 
      whiteColor, 
      blackColor,
      colorByMode,
      colorByModeSecondary,
      lighterColor,
      darkerColor,
      lightGrayColor,
      darkGrayColor,
      getThemeMode,
    }}>
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

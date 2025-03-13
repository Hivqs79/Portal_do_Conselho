"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Theme } from "@mui/material/styles";
import ThemeSettings from "../theme/ThemeSettings";
import { BrandColors, colors } from "../theme/BrandColors";

type PossibleColors =
  | "gray"
  | "blue"
  | "pink"
  | "yellow"
  | "red"
  | "green"
  | "purple"
  | "orange";

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
  primaryGrayColor: string;
  secondaryGrayColor: string;
  colorByMode: string;
  colorByModeSecondary: string;
  lighterColor: (string: string) => string;
  darkerColor: (string: string) => string;
  textBlackolor: string;
  lightGrayColor: string;
  darkGrayColor: string;
  redDanger: string;
  textDarkColor: string;
  getThemeMode: () => "dark" | "light";
  getThemePallete: () => PossibleColors;
  changeFontSize: (multiplier: number) => void;
  getFontSize: () => number;
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
  const primaryGrayColor = colors.primaryGrayColor;
  const secondaryGrayColor = colors.secondaryGrayColor;
  const colorByMode = ThemeSettings.getColorByMode();
  const colorByModeSecondary = ThemeSettings.getColorByModeSecondary();
  const lighterColor = (color: string) => ThemeSettings.lighterColor(color);
  const darkerColor = ThemeSettings.darkerColor;
  const textBlackolor = ThemeSettings.textBlackolor();
  const textDarkColor = colors.textDarkColor;
  const lightGrayColor = ThemeSettings.lightGrayColor();
  const darkGrayColor = ThemeSettings.darkGrayColor();
  const redDanger = colors.redDanger;
  const getThemeMode = () => ThemeSettings.getThemeMode();
  const getThemePallete = (): PossibleColors => ThemeSettings.getThemePallete() as PossibleColors;  
  const getFontSize = () => ThemeSettings.getFontSize();

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

  const changeFontSize = (multiplier: number) => {
    ThemeSettings.changeFontSize(multiplier);
    reloadTheme();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem("theme");

      const color: PossibleColors = (storedColor as PossibleColors) || "blue";

      if (themeColor !== color) {
        changePallete(color);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
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
        textDarkColor,
        blackColor,
        primaryGrayColor,
        secondaryGrayColor,
        colorByMode,
        colorByModeSecondary,
        lighterColor,
        darkerColor,
        textBlackolor,
        lightGrayColor,
        darkGrayColor,
        redDanger,
        getThemeMode,
        getThemePallete,
        changeFontSize,
        getFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeProviderContext"
    );
  }
  return context;
};

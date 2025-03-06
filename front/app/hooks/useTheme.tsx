import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
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

  const reloadTheme = () => {
    setTheme(ThemeSettings.createThemePallete());
  };

  const changeThemeMode = () => {
    ThemeSettings.changeThemeMode();
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
        blackColor,
        primaryGrayColor,
        secondaryGrayColor,
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

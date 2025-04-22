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
import {
  lighten,
  darken,
  createTheme,
  getContrastRatio,
  Theme
} from "@mui/material/styles";
import { BrandColors, colors } from "@/theme/BrandColors";
import "@fontsource/lora";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/montserrat";
import "@fontsource/inter";
import "@fontsource/merriweather";
import "@fontsource/libre-baskerville";
import OpacityHex from "@/utils/OpacityHex";
import { useLocalStorage } from 'usehooks-ts';

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    terciary: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1_title: true;
    h2_title: true;
    h3_title: true;
    h4_title: true;
    h5_title: true;
    h6_title: true;
    xl_text_light: true;
    xl_text_regular: true;
    xl_text_bold: true;
    lg_text_light: true;
    lg_text_regular: true;
    lg_text_bold: true;
    md_text_light: true;
    md_text_regular: true;
    md_text_bold: true;
    sm_text_light: true;
    sm_text_regular: true;
    sm_text_bold: true;
    xs_text_light: true;
    xs_text_regular: true;
    xs_text_bold: true;
    tn_text_light: true;
    tn_text_regular: true;
    tn_text_bold: true;
  }
}

export type PossibleColors =
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
  textBlackColor: string;
  lightGrayColor: string;
  darkGrayColor: string;
  redDanger: string;
  textDarkColor: string;
  greenConfirm: string;
  lighterColor: (string: string) => string;
  darkerColor: (string: string) => string;
  getThemeMode: () => "dark" | "light";
  getThemePallete: () => PossibleColors;
  changeFontSize: (multiplier: number) => void;
  getFontSize: () => number;
  changeFontFamilyText: (fontFamilyText: string) => void;
  getFontFamilyText: () => string;
  changeFontFamilyTitle: (fontFamilyText: string) => void;
  getFontFamilyTitle: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderContext = ({ children }: { children: ReactNode }) => {

  // ThemeSettings

  const whiteColor = colors.whiteColor;
  const blackColor = colors.blackColor;
  const [mode, setMode] = useLocalStorage("mode", JSON.stringify("light"));
  const [multiplier, setMultiplier] = useLocalStorage("multiplier", JSON.stringify(1));
  const [fontFamilyText, setFontFamilyText] = useLocalStorage("fontFamilyText", JSON.stringify("Poppins"));
  const [fontFamilyTitle, setFontFamilyTitle] = useLocalStorage("fontFamilyTitle", JSON.stringify("Lora"));
  const [color, setColor] = useLocalStorage("theme", JSON.stringify("blue"));

  useEffect(() => {
    reloadTheme();
  }, [mode, multiplier, fontFamilyText, fontFamilyTitle, color])

  const reloadTheme = () => {
    setTheme(createThemePallete());
  };

  function getThemeMode() {
    // if (mode === "dark" && !isDarkMode) {
    //   this.changeThemeMode();
    //   return "dark";
    // }
    // if (mode === "light" && isDarkMode) {
    //   this.changeThemeMode();
    //   return "light";
    // }
    // return isDarkMode ? "dark" : "light";    

    return mode.replaceAll("\\", "").replaceAll("\"", "") === "dark" ? "dark" : "light";
  }

  function getFontSize() {
    return parseFloat(multiplier.replaceAll("\\", "").replaceAll("\"", ""));
  }

  function changeFontSize(multiplierProp: number) {
    if (multiplierProp !== parseInt(multiplier.replaceAll("\\", "").replaceAll("\"", ""))) {
      setMultiplier(multiplierProp.toString());
    }
  }

  function getFontFamilyText() {
    return fontFamilyText.replaceAll("\\", "").replaceAll("\"", "");
  }

  function changeFontFamilyText(fontFamily: string) {
    const currentFont = fontFamilyText.replaceAll("\\", "").replaceAll("\"", "");
    if (fontFamily !== currentFont) {
      setFontFamilyText(JSON.stringify(fontFamily));
    }
  }

  function getFontFamilyTitle() {
    return fontFamilyTitle.replaceAll("\\", "").replaceAll("\"", "");
  }

  function changeFontFamilyTitle(fontFamily: string) {
    const currentFont = fontFamilyTitle.replaceAll("\\", "").replaceAll("\"", "");
    if (fontFamily !== currentFont) {
      setFontFamilyTitle(JSON.stringify(fontFamily));
    }    
  }

  function getThemePallete() {
    return color as PossibleColors;
  }

  function getColorByMode() {
    const modeNow = mode.replaceAll("\\", "").replaceAll("\"", "");
    return modeNow == "light"
      ? BrandColors.primary_color
      : BrandColors.terciary_color;
  }

  function getColorByModeSecondary() {
    const modeNow = mode.replaceAll("\\", "").replaceAll("\"", "");
    return modeNow == "light"
      ? BrandColors.primary_color
      : BrandColors.secondary_color;
  }

  function darkerColor(color: string) {
    return darken(color, 0.2);
  }

  function lighterColor(color: string) {
    return lighten(color, 0.2);
  }

  function getContrastThemeColor() {
    const modeNow = mode.replaceAll("\\", "").replaceAll("\"", "");
    return modeNow == "dark" ? whiteColor : blackColor;
  }

  function getBackgroundThemeColor() {
    const modeNow = mode.replaceAll("\\", "").replaceAll("\"", "");
    return modeNow == "dark" ? blackColor : whiteColor;
  }

  function getBetterContrast(color: string) {
    return getContrastRatio(color, whiteColor) >
      getContrastRatio(color, blackColor)
      ? whiteColor
      : blackColor;
  }

  function createThemePallete() {
    const themeBase = createTheme({});
    const primary_color = BrandColors.primary_color;
    const secondary_color = BrandColors.secondary_color;
    const redDanger = colors.redDanger;
    const terciary_color = BrandColors.terciary_color;
    const colorByMode = getColorByMode();

    const fontSize = (baseSize: number) => {
      return `${baseSize * parseFloat(multiplier.replaceAll("\\", "").replaceAll("\"", ""))}rem`;
    };


    const fontFamilyTextNow = fontFamilyText.replaceAll("\\", "").replaceAll("\"", "");
    const fontFamilyTitleNow = fontFamilyTitle.replaceAll("\\", "").replaceAll("\"", "");

    return createTheme(themeBase, {
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
      palette: {
        primary: {
          main: primary_color,
          light: lighterColor(primary_color),
          dark: darkerColor(primary_color),
          contrastText: getBetterContrast(primary_color),
        },
        secondary: {
          main: secondary_color,
          light: lighterColor(secondary_color),
          dark: darkerColor(secondary_color),
          contrastText: getBetterContrast(secondary_color),
        },
        terciary: themeBase.palette.augmentColor({
          name: "terciary",
          color: {
            main: terciary_color,
            light: lighterColor(terciary_color),
            dark: darkerColor(terciary_color),
            contrastText: getBetterContrast(terciary_color),
          },
        }),
        error: {
          main: redDanger,
          light: lighterColor(redDanger),
          dark: darkerColor(redDanger),
          contrastText: getBetterContrast(redDanger),
        },
      },
      typography: {
        h1_title: {
          fontSize: fontSize(3.5),
          fontFamily: fontFamilyTitleNow,
          color: getContrastThemeColor(),
        },
        h2_title: {
          fontSize: fontSize(3),
          fontFamily: fontFamilyTitleNow,
          color: getContrastThemeColor(),
        },
        h3_title: {
          fontSize: fontSize(2.5),
          fontFamily: fontFamilyTitleNow,
          color: getContrastThemeColor(),
        },
        h4_title: {
          fontSize: fontSize(2.25),
          fontFamily: fontFamilyTitleNow,
          color: getContrastThemeColor(),
        },
        h5_title: {
          fontSize: fontSize(1.875),
          fontFamily: fontFamilyTitleNow,
          color: getContrastThemeColor(),
        },
        h6_title: {
          fontSize: fontSize(1.5),
          fontFamily: fontFamilyTitleNow,
          color: getContrastThemeColor(),
        },
        xl_text_light: {
          fontSize: fontSize(1.25),
          fontWeight: 300,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        xl_text_regular: {
          fontSize: fontSize(1.25),
          fontWeight: 400,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        xl_text_bold: {
          fontSize: fontSize(1.25),
          fontWeight: 700,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        lg_text_light: {
          fontSize: fontSize(1.125),
          fontWeight: 300,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        lg_text_regular: {
          fontSize: fontSize(1.125),
          fontWeight: 400,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        lg_text_bold: {
          fontSize: fontSize(1.125),
          fontWeight: 700,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        md_text_light: {
          fontSize: fontSize(1),
          fontWeight: 300,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        md_text_regular: {
          fontSize: fontSize(1),
          fontWeight: 400,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        md_text_bold: {
          fontSize: fontSize(1),
          fontWeight: 700,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        sm_text_light: {
          fontSize: fontSize(0.875),
          fontWeight: 300,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        sm_text_regular: {
          fontSize: fontSize(0.875),
          fontWeight: 400,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        sm_text_bold: {
          fontSize: fontSize(0.875),
          fontWeight: 700,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        xs_text_light: {
          fontSize: fontSize(0.75),
          fontWeight: 300,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        xs_text_regular: {
          fontSize: fontSize(0.75),
          fontWeight: 400,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        xs_text_bold: {
          fontSize: fontSize(0.75),
          fontWeight: 700,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        tn_text_light: {
          fontSize: fontSize(0.625),
          fontWeight: 300,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        tn_text_regular: {
          fontSize: fontSize(0.625),
          fontWeight: 400,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
        tn_text_bold: {
          fontSize: fontSize(0.625),
          fontWeight: 700,
          fontFamily: fontFamilyTextNow,
          color: getContrastThemeColor(),
        },
      },
      components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: getContrastThemeColor(),
              "&.Mui-focused": {
                color: colorByMode,
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              textTransform: "none",
              "&.Mui-disabled": {
                backgroundColor: OpacityHex(primary_color, 0.5),
                color: OpacityHex(whiteColor, 0.5),
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              "&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: colorByMode,
                borderWidth: "2px",
                color: getContrastThemeColor(),
              },
              "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: colorByMode,
                borderWidth: "2px",
                boxShadow: "2px 2px 4px 1px" + colorByMode + "77",
              },
              "&:hover:not(.Mui-focused).Mui-disabled .MuiOutlinedInput-notchedOutline":
              {
                borderColor: getContrastThemeColor() + "AA",
                color: getContrastThemeColor() + "AA",
              },
              "&.Mui-focused .Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: getContrastThemeColor() + "AA",
                color: getContrastThemeColor() + "AA",
              },
              "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: getContrastThemeColor() + "AA",
                color: getContrastThemeColor() + "AA",
              },
              "&.Mui-disabled .MuiOutlinedInput-input": {
                borderColor: getContrastThemeColor() + "AA",
                textFillColor: getContrastThemeColor() + "AA",
              },
              color: getContrastThemeColor(),
            },
            notchedOutline: {
              borderColor: colorByMode,
              borderWidth: "2px",
            },
          },
        },
        MuiFormLabel: {
          styleOverrides: {
            root: {
              color: getContrastThemeColor(),
              "&.Mui-disabled": {
                color: getContrastThemeColor() + "AA",
              },
            },
          },
        },
        MuiMenu: {
          styleOverrides: {
            root: {
              zIndex: 9999,
            },
            paper: {
              backgroundColor: primary_color,
              color: whiteColor,
              borderRadius: "0px 0px 4px 4px",
              boxShadow: "2px 2px 8px 0px" + primary_color + "77",
            },
            list: {
              padding: "16px 0px",
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              padding: "8px 24px",
            },
          },
        },
        MuiModal: {
          styleOverrides: {
            root: {
              zIndex: 210,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              zIndex: 25,
            },
          },
        },
        MuiPaginationItem: {
          styleOverrides: {
            root: {
              color: getContrastThemeColor(),
              borderColor: colorByMode,
              borderWidth: "2px",
              "&.Mui-selected": {
                backgroundColor: primary_color,
                borderColor: primary_color,
                color: whiteColor,
              },
              "&.Mui-selected:hover": {
                backgroundColor: darkerColor(primary_color),
              },
            },
            ellipsis: {
              borderWidth: "0px",
            },
          },
        },
        MuiSvgIcon: {
          styleOverrides: {
            root: {
              fill: getContrastThemeColor(),
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            root: {
              "& .MuiSvgIcon-root": {
                fill: colors.textDarkColor,
              },
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              zIndex: 10,
              borderRadius: "16px !important",
            },
          },
        },
        MuiAccordionDetails: {
          styleOverrides: {
            root: {
              padding: "8px",
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              "& .MuiSvgIcon-root": {
                fill: colorByMode,
              },
              padding: 0,
            },
          },
        },
        MuiRadio: {
          styleOverrides: {
            root: {
              "& .MuiSvgIcon-root": {
                fill: colorByMode,
              },
              padding: 0,
            },
          },
        },
        MuiDialogActions: {
          styleOverrides: {
            root: {
              justifyContent: "center",
            },
          },
        },
      },
    });
  }

  // useTheme

  const [theme, setTheme] = useState(createThemePallete());
  const [themeColor, setThemeColor] = useState("");
  const primaryColor = BrandColors.primary_color;
  const secondaryColor = BrandColors.secondary_color;
  const terciaryColor = BrandColors.terciary_color;
  const constrastColor = getContrastThemeColor();
  const backgroundColor = getBackgroundThemeColor();
  const primaryGrayColor = colors.primaryGrayColor;
  const secondaryGrayColor = colors.secondaryGrayColor;
  const colorByMode = getColorByMode();
  const colorByModeSecondary = getColorByModeSecondary();
  const textBlackColor = darkerColor(blackColor);
  const textDarkColor = colors.textDarkColor;
  const lightGrayColor = darkerColor(whiteColor);
  const darkGrayColor = lighterColor(blackColor);
  const redDanger = colors.redDanger;
  const greenConfirm = colors.greenConfirm;
  // const lighterColor = (color: string) => lighterColor(color);
  // const darkerColor = darkerColor;
  // const getThemePallete = (): PossibleColors => getThemePallete() as PossibleColors;

  const changeThemeMode = () => {
    setMode(mode.replaceAll("\\", "").replaceAll("\"", "") === "light" ? JSON.stringify("dark") : JSON.stringify("light"));
  };

  const changePallete = (color: PossibleColors) => {
    color = color.replaceAll("\\", "").replaceAll("\"", "") as PossibleColors;
    setColor(JSON.stringify(color));
    setThemeColor(color);
    console.log(color);
    BrandColors.changePallete(color);
  };


  useEffect(() => {
    const storedColor = color;

    const newColor: PossibleColors = (storedColor as PossibleColors) || "blue";

    if (themeColor !== newColor) {
      changePallete(newColor);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
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
        textBlackColor,
        lightGrayColor,
        darkGrayColor,
        redDanger,
        greenConfirm,
        setTheme,
        reloadTheme,
        changeThemeMode,
        changePallete,
        lighterColor,
        darkerColor,
        getThemeMode,
        getThemePallete,
        changeFontSize,
        getFontSize,
        changeFontFamilyText,
        getFontFamilyText,
        changeFontFamilyTitle,
        getFontFamilyTitle
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
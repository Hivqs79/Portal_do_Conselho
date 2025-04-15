import {
  lighten,
  darken,
  createTheme,
  getContrastRatio,
} from "@mui/material/styles";
import { BrandColors, colors } from "./BrandColors";
import "@fontsource/lora";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/montserrat";
import "@fontsource/inter";
import "@fontsource/merriweather";
import "@fontsource/libre-baskerville";
import OpacityHex from "@/utils/OpacityHex";

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
const whiteColor = colors.whiteColor;
const blackColor = colors.blackColor;

export default class ThemeSettings {
  public static getThemeMode(): "dark" | "light" {
    const mode = localStorage.getItem("mode");
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (mode === "dark" && !isDarkMode) {
      this.changeThemeMode();
      return "dark";
    }
    if (mode === "light" && isDarkMode) {
      this.changeThemeMode();
      return "light";
    }
    return isDarkMode ? "dark" : "light";
  }

  public static getThemePallete() {
    const color = localStorage.getItem("theme");
    return color ? color : "blue";
  }

  public static getColorByMode() {
    const mode = this.getThemeMode();
    return mode == "light"
      ? BrandColors.primary_color
      : BrandColors.terciary_color;
  }

  public static getColorByModeSecondary() {
    const mode = this.getThemeMode();
    return mode == "light"
      ? BrandColors.primary_color
      : BrandColors.secondary_color;
  }

  public static lightGrayColor() {
    return this.darkerColor(whiteColor);
  }

  public static darkGrayColor() {
    return this.lighterColor(blackColor);
  }

  public static textBlackolor() {
    return this.darkerColor(blackColor);
  }

  public static darkerColor(color: string) {
    return darken(color, 0.2);
  }

  public static lighterColor(color: string) {
    return lighten(color, 0.2);
  }

  public static getContrastThemeColor() {
    const mode = this.getThemeMode();
    return mode == "dark" ? whiteColor : blackColor;
  }

  public static changeThemeMode() {
    return document.documentElement.classList.toggle("dark");
  }

  public static getBackgroundThemeColor() {
    const mode = this.getThemeMode();
    return mode == "dark" ? blackColor : whiteColor;
  }

  public static getBetterContrast(color: string) {
    return getContrastRatio(color, whiteColor) >
      getContrastRatio(color, blackColor)
      ? whiteColor
      : blackColor;
  }

  public static getFontSize() {
    const multiplier = localStorage.getItem("fontMultiplier");
    if (!multiplier) {
      localStorage.setItem("fontMultiplier", "1");
      return 1;
    }
    return parseFloat(multiplier);
  }

  public static changeFontSize(multiplier: number) {
    localStorage.setItem("fontMultiplier", multiplier.toString());
  }

  public static getFontFamilyText() {
    const fontFamilyText = localStorage.getItem("fontFamilyText");
    if (!fontFamilyText) {
      localStorage.setItem("fontFamilyText", "Poppins");
      return "Poppins";
    }
    return fontFamilyText;
  }

  public static changeFontFamilyText(fontFamilyText: string) {
    localStorage.setItem("fontFamilyText", fontFamilyText);
  }

  public static getFontFamilyTitle() {
    const fontFamilyText = localStorage.getItem("fontFamilyTitle");
    if (!fontFamilyText) {
      localStorage.setItem("fontFamilyTitle", "Lora");
      return "Lora";
    }
    return fontFamilyText;
  }

  public static changeFontFamilyTitle(fontFamilyText: string) {
    localStorage.setItem("fontFamilyTitle", fontFamilyText);
  }

  public static createThemePallete() {
    const themeBase = createTheme({});
    const primary_color = BrandColors.primary_color;
    const secondary_color = BrandColors.secondary_color;
    const redDanger = colors.redDanger;
    const terciary_color = BrandColors.terciary_color;
    const colorByMode = this.getColorByMode();
    const fontMultiplier = this.getFontSize();

    const fontSize = (baseSize: number) => {
      return `${baseSize * fontMultiplier}rem`;
    };

    const fontFamilyText = this.getFontFamilyText();
    const fontFamilyTitle = this.getFontFamilyTitle();

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
          light: this.lighterColor(primary_color),
          dark: this.darkerColor(primary_color),
          contrastText: this.getBetterContrast(primary_color),
        },
        secondary: {
          main: secondary_color,
          light: this.lighterColor(secondary_color),
          dark: this.darkerColor(secondary_color),
          contrastText: this.getBetterContrast(secondary_color),
        },
        terciary: themeBase.palette.augmentColor({
          name: "terciary",
          color: {
            main: terciary_color,
            light: this.lighterColor(terciary_color),
            dark: this.darkerColor(terciary_color),
            contrastText: this.getBetterContrast(terciary_color),
          },
        }),
        error: {
          main: redDanger,
          light: this.lighterColor(redDanger),
          dark: this.darkerColor(redDanger),
          contrastText: this.getBetterContrast(redDanger),
        },
      },
      typography: {
        h1_title: {
          fontSize: fontSize(3.5),
          fontFamily: fontFamilyTitle,
          color: this.getContrastThemeColor(),
        },
        h2_title: {
          fontSize: fontSize(3),
          fontFamily: fontFamilyTitle,
          color: this.getContrastThemeColor(),
        },
        h3_title: {
          fontSize: fontSize(2.5),
          fontFamily: fontFamilyTitle,
          color: this.getContrastThemeColor(),
        },
        h4_title: {
          fontSize: fontSize(2.25),
          fontFamily: fontFamilyTitle,
          color: this.getContrastThemeColor(),
        },
        h5_title: {
          fontSize: fontSize(1.875),
          fontFamily: fontFamilyTitle,
          color: this.getContrastThemeColor(),
        },
        h6_title: {
          fontSize: fontSize(1.5),
          fontFamily: fontFamilyTitle,
          color: this.getContrastThemeColor(),
        },
        xl_text_light: {
          fontSize: fontSize(1.25),
          fontWeight: 300,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        xl_text_regular: {
          fontSize: fontSize(1.25),
          fontWeight: 400,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        xl_text_bold: {
          fontSize: fontSize(1.25),
          fontWeight: 700,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        lg_text_light: {
          fontSize: fontSize(1.125),
          fontWeight: 300,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        lg_text_regular: {
          fontSize: fontSize(1.125),
          fontWeight: 400,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        lg_text_bold: {
          fontSize: fontSize(1.125),
          fontWeight: 700,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        md_text_light: {
          fontSize: fontSize(1),
          fontWeight: 300,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        md_text_regular: {
          fontSize: fontSize(1),
          fontWeight: 400,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        md_text_bold: {
          fontSize: fontSize(1),
          fontWeight: 700,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        sm_text_light: {
          fontSize: fontSize(0.875),
          fontWeight: 300,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        sm_text_regular: {
          fontSize: fontSize(0.875),
          fontWeight: 400,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        sm_text_bold: {
          fontSize: fontSize(0.875),
          fontWeight: 700,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        xs_text_light: {
          fontSize: fontSize(0.75),
          fontWeight: 300,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        xs_text_regular: {
          fontSize: fontSize(0.75),
          fontWeight: 400,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        xs_text_bold: {
          fontSize: fontSize(0.75),
          fontWeight: 700,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        tn_text_light: {
          fontSize: fontSize(0.625),
          fontWeight: 300,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        tn_text_regular: {
          fontSize: fontSize(0.625),
          fontWeight: 400,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
        tn_text_bold: {
          fontSize: fontSize(0.625),
          fontWeight: 700,
          fontFamily: fontFamilyText,
          color: this.getContrastThemeColor(),
        },
      },
      components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: this.getContrastThemeColor(),
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
                  color: this.getContrastThemeColor(),
                },
              "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: colorByMode,
                  borderWidth: "2px",
                  boxShadow: "2px 2px 4px 1px" + colorByMode + "77",
                },
              "&:hover:not(.Mui-focused).Mui-disabled .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: this.getContrastThemeColor() + "AA",
                  color: this.getContrastThemeColor() + "AA",
                },
              "&.Mui-focused .Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: this.getContrastThemeColor() + "AA",
                color: this.getContrastThemeColor() + "AA",
              },
              "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: this.getContrastThemeColor() + "AA",
                color: this.getContrastThemeColor() + "AA",
              },
              "&.Mui-disabled .MuiOutlinedInput-input": {
                borderColor: this.getContrastThemeColor() + "AA",
                textFillColor: this.getContrastThemeColor() + "AA",
              },
              color: this.getContrastThemeColor(),
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
              color: this.getContrastThemeColor(),
              "&.Mui-disabled": {
                color: this.getContrastThemeColor() + "AA",
              },
            },
          },
        },
        MuiMenu: {
          styleOverrides: {
            root: {
              zIndex: 25,
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
              color: this.getContrastThemeColor(),
              borderColor: colorByMode,
              borderWidth: "2px",
              "&.Mui-selected": {
                backgroundColor: primary_color,
                borderColor: primary_color,
                color: whiteColor,
              },
              "&.Mui-selected:hover": {
                backgroundColor: this.darkerColor(primary_color),
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
              fill: this.getContrastThemeColor(),
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
}

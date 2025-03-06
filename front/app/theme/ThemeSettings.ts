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
    const isDarkMode = document.documentElement.classList.contains("dark");
    return isDarkMode ? "dark" : "light";
  }

  public static changeThemeMode() {
    return document.documentElement.classList.toggle("dark");
  }

  public static getContrastThemeColor() {
    const mode = this.getThemeMode();
    return mode == "dark" ? whiteColor : blackColor;
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

  public static createThemePallete() {
    const themeBase = createTheme({});
    const mode = this.getThemeMode();
    const primary_color = BrandColors.primary_color;
    const secondary_color = BrandColors.secondary_color;
    const terciary_color = BrandColors.terciary_color;

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
          light: lighten(primary_color, 0.2),
          dark: darken(primary_color, 0.2),
          contrastText: this.getBetterContrast(primary_color),
        },
        secondary: {
          main: secondary_color,
          light: lighten(secondary_color, 0.2),
          dark: darken(secondary_color, 0.2),
          contrastText: this.getBetterContrast(secondary_color),
        },
        terciary: themeBase.palette.augmentColor({
          name: "terciary",
          color: {
            main: terciary_color,
            light: lighten(terciary_color, 0.2),
            dark: darken(terciary_color, 0.2),
            contrastText: this.getBetterContrast(terciary_color),
          },
        }),
      },
      typography: {
        h1_title: {
          fontSize: "3.5rem",
          fontFamily: "Lora",
          color: this.getContrastThemeColor(),
        },
        h2_title: {
          fontSize: "3rem",
          fontFamily: "Lora",
          color: this.getContrastThemeColor(),
        },
        h3_title: {
          fontSize: "2.5rem",
          fontFamily: "Lora",
          color: this.getContrastThemeColor(),
        },
        h4_title: {
          fontSize: "2.25rem",
          fontFamily: "Lora",
          color: this.getContrastThemeColor(),
        },
        h5_title: {
          fontSize: "1.875rem",
          fontFamily: "Lora",
          color: this.getContrastThemeColor(),
        },
        h6_title: {
          fontSize: "1.5rem",
          fontFamily: "Lora",
          color: this.getContrastThemeColor(),
        },
        xl_text_light: {
          fontSize: "1.25rem",
          fontWeight: 300,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        xl_text_regular: {
          fontSize: "1.25rem",
          fontWeight: 400,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        xl_text_bold: {
          fontSize: "1.25rem",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        lg_text_light: {
          fontSize: "1.125rem",
          fontWeight: 300,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        lg_text_regular: {
          fontSize: "1.125rem",
          fontWeight: 400,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        lg_text_bold: {
          fontSize: "1.125rem",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        md_text_light: {
          fontSize: "1rem",
          fontWeight: 300,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        md_text_regular: {
          fontSize: "1rem",
          fontWeight: 400,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        md_text_bold: {
          fontSize: "1rem",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        sm_text_light: {
          fontSize: "0.875rem",
          fontWeight: 300,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        sm_text_regular: {
          fontSize: "0.875rem",
          fontWeight: 400,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        sm_text_bold: {
          fontSize: "0.875rem",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        xs_text_light: {
          fontSize: "0.75rem",
          fontWeight: 300,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        xs_text_regular: {
          fontSize: "0.75rem",
          fontWeight: 400,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        xs_text_bold: {
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        tn_text_light: {
          fontSize: "0.625rem",
          fontWeight: 300,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        tn_text_regular: {
          fontSize: "0.625rem",
          fontWeight: 400,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
        tn_text_bold: {
          fontSize: "0.625rem",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: this.getContrastThemeColor(),
        },
      },
      components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: this.getContrastThemeColor(),
              "&.Mui-focused": {
                color: mode == "light" ? primary_color : terciary_color,
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              "&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: mode == "light" ? primary_color : terciary_color,
                borderWidth: "2px",
                color: this.getContrastThemeColor(),
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: mode == "light" ? primary_color : terciary_color,
                borderWidth: "2px",
                boxShadow:
                  "2px 2px 4px 1px" +
                  (mode == "light" ? primary_color : terciary_color) +
                  "77",
              },
              color: this.getContrastThemeColor(),
            },
            notchedOutline: {
              borderColor: mode == "light" ? primary_color : terciary_color,
              borderWidth: "2px",
            },
          },
        },
      },
    });
  }
}

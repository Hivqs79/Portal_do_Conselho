import { Dispatch, SetStateAction} from "react";
import { lighten, darken, createTheme, getContrastRatio } from "@mui/material/styles";
import BrandColors from "./BrandColors";

export default class ThemeSettings {

  public static getThemeMode(): "dark" | "light" {
    const isDarkMode = document.documentElement.classList.contains('dark');
    return isDarkMode ? 'dark' : 'light';
  };

  public static changeThemeMode(setMode: Dispatch<SetStateAction<"dark" | "light">>, mode: "dark" | "light") {
    document.documentElement.classList.toggle('dark'); 
    setMode(mode === 'dark' ? 'light' : 'dark'); 
    console.log(this.getThemeMode());
  }

  public static createThemePallete() {
    let themeBase = createTheme({});
    let mode = this.getThemeMode();
    const primary_color = BrandColors.primary_color;
    const secondary_color = BrandColors.secondary_color;
    const terciary_color = BrandColors.terciary_color;

    return createTheme (themeBase,
      {
      palette: {
        primary: {
          main: primary_color,
          light: lighten(primary_color, 0.2),
          dark: darken(primary_color, 0.2),
          contrastText: getContrastRatio(primary_color, '#f5f5f5') > getContrastRatio(primary_color, '#191919') ? '#f5f5f5' : '#191919',
        },
        secondary: {
          main: secondary_color,
          light: lighten(secondary_color, 0.2),
          dark: darken(secondary_color, 0.2),
          contrastText: getContrastRatio(secondary_color, '#f5f5f5') > getContrastRatio(secondary_color, '#191919') ? '#f5f5f5' : '#191919',
        },
        terciary: themeBase.palette.augmentColor({
          color: {
          main: terciary_color,
          light: lighten(terciary_color, 0.2),
          dark: darken(terciary_color, 0.2),
          contrastText: getContrastRatio(terciary_color, '#f5f5f5') > getContrastRatio(terciary_color, '#191919') ? '#f5f5f5' : '#191919',
          },
          name: 'terciary',
        }),
      },
      components: {   
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: (mode == 'dark' ? "#f5f5f5" : "#191919"),
            },
          },
        },
      },
    });
  }

  
}
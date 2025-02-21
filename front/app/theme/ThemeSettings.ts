import { lighten, darken, createTheme, getContrastRatio } from "@mui/material/styles";
import {BrandColors} from "./BrandColors";

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    terciary: true;
  }
}

const whiteColor = "#f5f5f5";
const blackColor = "#333333";

export default class ThemeSettings {

  public static getThemeMode(): "dark" | "light" {
    const isDarkMode = document.documentElement.classList.contains('dark');
    return isDarkMode ? 'dark' : 'light';
  };

  public static changeThemeMode() {
    document.documentElement.classList.toggle('dark'); 
    console.log(this.getThemeMode());  
  };

  public static getContrastThemeColor() {  
    let mode = this.getThemeMode();  
    return (mode == 'dark' ? whiteColor : blackColor);
  }

  public static getBackgroundThemeColor() {    
    let mode = this.getThemeMode();  
    return (mode == 'dark' ? blackColor : whiteColor);
  }

  public static getBetterContrast(color: string) {
    return getContrastRatio(color, whiteColor) > getContrastRatio(color, blackColor) ? whiteColor : blackColor;
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
          contrastText: this.getBetterContrast(primary_color),
        },
        secondary: {
          main: secondary_color,
          light: lighten(secondary_color, 0.2),
          dark: darken(secondary_color, 0.2),
          contrastText: this.getBetterContrast(secondary_color),
        },
        terciary: themeBase.palette.augmentColor({
          color: {
            main: terciary_color,
            light: lighten(terciary_color, 0.2),
            dark: darken(terciary_color, 0.2),
            contrastText: this.getBetterContrast(terciary_color),
          },
          name: 'terciary',
        }),
      },
      components: {   
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: this.getContrastThemeColor(),
              '&.Mui-focused': {
                color: (mode == "light" ? primary_color : terciary_color),
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {   
            root: {              
              '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                borderColor: (mode == "light" ? primary_color : terciary_color),
                borderWidth: "2px",
                color: this.getContrastThemeColor(),
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (mode == "light" ? primary_color : terciary_color),
                borderWidth: "2px",
                boxShadow: '2px 2px 4px 1px' + (mode == "light" ? primary_color : terciary_color) + '77',
              },
              color: this.getContrastThemeColor(),
            },         
            notchedOutline: {
              borderColor: (mode == "light" ? primary_color : terciary_color),
              borderWidth: "2px",
            },
          },
        },              
      },
    });
  }

  
}
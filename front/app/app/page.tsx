"use client"
import { Container, Box, Button, TextField } from "@mui/material";
import { lighten, darken, createTheme, getContrastRatio, ThemeProvider, useColorScheme } from "@mui/material/styles";
import colors from "./colors";


declare module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary'];
  }

  interface PaletteOptions {
    primary?: PaletteOptions['primary'];
  }

  interface Palette {
    secondary: Palette['secondary'];
  }

  interface PaletteOptions {
    secondary?: PaletteOptions['secondary'];
  }

}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary: true;
  }
}

let theme = createTheme({});
const primary_color = colors.primary_color;
const secondary_color = colors.secondary_color;
const terciary_color = colors.terciary_color;


theme = createTheme(theme, {
  palette: {
    primary: {
      main: primary_color,
      light: lighten(primary_color, 0.2),
      dark: darken(primary_color, 0.2),
      contrastText: getContrastRatio(primary_color, '#f0f0f0') > getContrastRatio(primary_color, '#333') ? '#f0f0f0' : '#333',
    },
    secondary: {
      main: secondary_color,
      light: lighten(secondary_color, 0.2),
      dark: darken(secondary_color, 0.2),
      contrastText: getContrastRatio(secondary_color, '#f0f0f0') > getContrastRatio(secondary_color, '#333') ? '#f0f0f0' : '#333',
    },
    terciary: theme.palette.augmentColor({
      color: {
      main: terciary_color,
      light: lighten(terciary_color, 0.2),
      dark: darken(terciary_color, 0.2),
      contrastText: getContrastRatio(terciary_color, '#f0f0f0') > getContrastRatio(terciary_color, '#333') ? '#f0f0f0' : '#333',
      },
      name: 'terciary',
    }),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          outline: "#dd1155",
          color: "#dd1155"
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#dd1155"
        },
      },
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"lg"} className="flex flex-row gap-8 justify-center items-center min-h-screen bg-[#f0f0f0] dark:bg-[#333]">
        <Box className="flex flex-col gap-4">
          <Button 
            variant="contained" 
            color="primary"
            sx={{width: 300}}
            >
            Teste Primary
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            sx={{width: 300}}
            >
            Teste Secondary
          </Button>
          <Button 
            variant="contained" 
            color="terciary"
            sx={{width: 300}}
            >
            Teste Terciary
          </Button>
        </Box>
        <Box>
          <TextField 
            id="outlined-search" 
            label="Test field" 
            type="search" 
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

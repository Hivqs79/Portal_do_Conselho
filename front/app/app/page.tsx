"use client"
import { Container, Box, Button, TextField, Switch, FormControlLabel } from "@mui/material";
import { lighten, darken, createTheme, getContrastRatio, ThemeProvider, useColorScheme, ThemeOptions } from "@mui/material/styles";
import colors from "./colors";
import { Dispatch, SetStateAction, useMemo, useState } from "react";


function getThemeMode(): "dark" | "light" {
  const isDarkMode = document.documentElement.classList.contains('dark');
  return isDarkMode ? 'dark' : 'light';
};

function changeThemeMode(setMode: Dispatch<SetStateAction<"dark" | "light">>, mode: "dark" | "light") {
  document.documentElement.classList.toggle('dark'); 
  setMode(mode === 'dark' ? 'light' : 'dark'); 
  console.log(getThemeMode());
}

let themeBase = createTheme({});
const primary_color = colors.primary_color;
const secondary_color = colors.secondary_color;
const terciary_color = colors.terciary_color;


const getDesignTokens = (mode: 'light' | 'dark') => ({
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
    terciary: themeBase.palette.augmentColor({
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: (mode == 'dark' ? "#333" : "#f0f0f0"),
        },
      },
    },
  },
});

export default function Home() {
  const [mode, setMode] = useState(getThemeMode());
  const theme = useMemo(() => createTheme(themeBase, getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"lg"} className="flex flex-col gap-8 justify-center items-center min-h-screen bg-[#f0f0f0] dark:bg-[#333]">
        <Box className="flex flex-row gap-8 justify-center items-center">        
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
              color="secondary"
            />
          </Box>
        </Box>
        <Box>
          <FormControlLabel 
            control={<Switch
                defaultChecked 
                onChange={() => changeThemeMode(setMode, mode)} 
              />} 
            label="Dark mode"
            
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

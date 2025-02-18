"use client"
import { Container, Box, Button, TextField, Switch, FormControlLabel } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import BrandColors from "./BrandColors";
import ThemeSettings from "./ThemeSettings";


export default function Home() {
  const [mode, setMode] = useState(ThemeSettings.getThemeMode());
  const [pallete, setPallete] = useState("blue");
  const [theme, setTheme] = useState(ThemeSettings.createThemePallete());

  useEffect(() => {
    setTheme(createTheme(ThemeSettings.createThemePallete()));
  }, [mode, pallete])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"lg"} className="flex flex-col gap-8 justify-center items-center min-h-screen bg-[#f0f0f0] dark:bg-[#333]">
        <Box className="flex flex-row gap-8 justify-center items-center">        
          <Box className="flex flex-col gap-4">
            <Button 
              variant="contained" 
              color="primary"
              sx={{width: 300}}
              onClick={() => {BrandColors.changePallete("blue"); setPallete("blue"); console.log(BrandColors.primary_color)}}
              >
              Teste Primary
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              sx={{width: 300}}
              onClick={() => {BrandColors.changePallete("green"); setPallete("green"); console.log(BrandColors.primary_color)}}
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
                onChange={() => ThemeSettings.changeThemeMode(setMode, mode)} 
              />} 
            label="Dark mode"
            
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

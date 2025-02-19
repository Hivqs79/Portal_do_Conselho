"use client"
import { Container, Box, Button, TextField, Switch, FormControlLabel, Theme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import BrandColors from "./BrandColors";
import ThemeSettings from "./ThemeSettings";
import {useThemeContext} from "../hooks/useTheme";

interface ChildComponentProps {
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const Home: FC<ChildComponentProps> = ({setTheme}) => {
  const {mode, setMode, pallete, setPallete} = useThemeContext();
  

  return (    
      <Container maxWidth={"lg"} className="flex flex-col gap-8 justify-center items-center min-h-screen bg-[#f0f0f0] dark:bg-[#333]">
        <Box className="flex flex-row gap-8 justify-center items-center">        
          <Box className="flex flex-col gap-4">
            <Button 
              variant="contained" 
              color="primary"
              sx={{width: 300}}
              onClick={() => {BrandColors.changePallete("blue"); setTheme(ThemeSettings.createThemePallete()); console.log(BrandColors.primary_color)}}
              >
              Teste Primary
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              sx={{width: 300}}
              onClick={() => {BrandColors.changePallete("green"); setTheme(ThemeSettings.createThemePallete()); console.log(BrandColors.primary_color)}}
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
  );
}

export default Home;
"use client";
import { Container , Box, Button, TextField, Switch, FormControlLabel, RadioGroup, Radio, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
import { colors } from "@/theme/BrandColors";
import { useState } from "react";

export default function Home() {
  const [ color, setColor ] = useState("");
  const { changeThemeMode, changePallete } = useThemeContext();

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    let colorChosen = (event.target as HTMLInputElement).value as "purple" | "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "orange";
    setColor(colorChosen);
    changePallete(colorChosen);
  };

  return (
    <Container maxWidth={"lg"} className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <Box className="flex flex-row gap-8 justify-center items-center">
        <Box className="flex flex-col gap-4">
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300 }}            
          >
            Teste Primary
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 300 }}            
          >
            Teste Secondary
          </Button>
          <Button
            variant="contained"
            color="terciary"
            sx={{ width: 300 }}                      
          >
            Teste Terciary
          </Button>
        </Box>
        <Box className="!flex !flex-col !gap-5">
          <TextField
            id="outlined-search"
            label="Email"
            type="search"
            color="primary"
          />
          <TextField
            id="outlined-search"
            label="Password"
            type="search"
            color="primary"
          />
        </Box>
      </Box>
      <Box>
        <FormControlLabel
          control={<Switch
            defaultChecked
            onChange={() => changeThemeMode()}
          />}
          label="Dark mode"
        />
      </Box>
      <Box>
        <Typography variant="subtitle1">Pallete changer</Typography>
        <RadioGroup value={color} defaultValue="" onChange={handleChangeColor} row>
          {new Array("blue","green","red","orange","pink","purple","yellow","gray").map((color, index) => {
              return <FormControlLabel          
                label 
                value={color}   
                key={index}         
                control={<Radio 
                  className={`!text-${color}Primary`}/>}
              />
          })}          
        </RadioGroup>
      </Box>
    </Container>
  );
}
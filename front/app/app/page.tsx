"use client";
import { Container , Box, Button, TextField, Switch, FormControlLabel, RadioGroup, Radio, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
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
        <Typography variant="xl_text_bold">Pallete changer</Typography>
        <RadioGroup value={color} defaultValue="" onChange={handleChangeColor} row>
          {new Array("blue","green","red","orange","pink","purple","yellow","gray").map((color, index) => {
              return <FormControlLabel          
                label={<Typography variant="lg_text_regular">{color}</Typography>} 
                value={color}   
                key={index}         
                control={<Radio />}
              />
          })}          
        </RadioGroup>
      </Box>
      <Box className="!flex !flex-row !gap-8 items-center">
        <Typography variant="h1_title">h1_title</Typography>
        <Typography variant="h2_title">h2_title</Typography>
        <Typography variant="h3_title">h3_title</Typography>
        <Typography variant="h4_title">h4_title</Typography>
        <Typography variant="h5_title">h5_title</Typography>
        <Typography variant="h6_title">h6_title</Typography>
      </Box>
      <Box className="!flex !flex-row !gap-8 items-center">
        <Box className="!flex !flex-col">
          <Typography variant="xl_text_bold">xl_text_bold</Typography>
          <Typography variant="xl_text_regular">xl_text_regular</Typography>
          <Typography variant="xl_text_light">xl_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="lg_text_bold">lg_text_bold</Typography>
          <Typography variant="lg_text_regular">lg_text_regular</Typography>
          <Typography variant="lg_text_light">lg_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="md_text_bold">md_text_bold</Typography>
          <Typography variant="md_text_regular">md_text_regular</Typography>
          <Typography variant="md_text_light">md_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="sm_text_bold">sm_text_bold</Typography>
          <Typography variant="sm_text_regular">sm_text_regular</Typography>
          <Typography variant="sm_text_light">sm_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="xs_text_bold">xs_text_bold</Typography>
          <Typography variant="xs_text_regular">xs_text_regular</Typography>
          <Typography variant="xs_text_light">xs_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="tn_text_bold">tn_text_bold</Typography>
          <Typography variant="tn_text_regular">tn_text_regular</Typography>
          <Typography variant="tn_text_light">tn_text_light</Typography>
        </Box>
      </Box>
    </Container>
  );
}
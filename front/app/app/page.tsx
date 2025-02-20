"use client";
import { Container, Box, Button, TextField, Switch, FormControlLabel } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";

export default function Home() {
  const { changeThemeMode, changePallete } = useThemeContext();

  return (
    <Container maxWidth={"lg"} className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <Box className="flex flex-row gap-8 justify-center items-center">
        <Box className="flex flex-col gap-4">
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300 }}
            onClick={() => changePallete("blue")}
          >
            Teste Primary
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 300 }}
            onClick={() => changePallete("green")}
          >
            Teste Secondary
          </Button>
          <Button
            variant="contained"
            color="terciary"
            sx={{ width: 300 }}
            onClick={() => changePallete("red")}
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
            onChange={() => changeThemeMode()}
          />}
          label="Dark mode"
        />
      </Box>
    </Container>
  );
}
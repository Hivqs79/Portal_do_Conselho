"use client";
import Title from "@/components/Title";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";
import { Box, TextField, Typography } from "@mui/material";

export default function AddUser() {
  const { constrastColor, colorByModeSecondary } = useThemeContext();

  return (
    <Box>
      <Title textHighlight="Adicionar" text="usuário" />

      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-10"
      ></div>

    
        <Typography variant="xl_text_bold" style={{color: colorByModeSecondary}}>Nome Completo</Typography>
        <TextField className="w-full !mb-8" label="Nome Completo" />

        <Typography variant="xl_text_bold" style={{color: colorByModeSecondary}}>Email</Typography>
        <TextField className="w-full !mb-8" label="Email"/>
    </Box>
  );
}

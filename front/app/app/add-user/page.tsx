"use client";
import Title from "@/components/Title";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function AddUser() {
  const {
    constrastColor,
    colorByModeSecondary,
    lightGrayColor,
    whiteColor,
    primaryColor,
  } = useThemeContext();
  const [userType, setUserType] = useState("Student");
  console.log(userType);

  return (
    <Box>
      <Title text="Adicionar usuário" />

      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-16"
      ></div>

      <Typography
        variant="xl_text_bold"
        style={{ color: colorByModeSecondary }}
      >
        Nome Completo
      </Typography>
      <TextField className="w-full !mb-8 !mt-4" label="Nome Completo" />

      <Typography
        variant="xl_text_bold"
        style={{ color: colorByModeSecondary }}
      >
        Email
      </Typography>
      <TextField className="w-full !mb-8 !mt-4" label="Email" />

      <Box className={"flex w-full mb-16 flex-col lg:flex-row lg:gap-16"}>
        <Box className=" flex flex-col items-start w-1/2">
          <Typography
            variant="xl_text_bold"
            style={{ color: colorByModeSecondary }}
          >
            Tipo de Usuário
          </Typography>
          <Select
            className="!min-w-52 !mb-8 mt-4"
            value={userType}
            size="medium"
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          >
            <MenuItem value={"Student"}>Aluno</MenuItem>
            <MenuItem value={"Representative"}>Representante</MenuItem>
            <MenuItem value={"Teacher"}>Professor</MenuItem>
            <MenuItem value={"Pedagogue"}>Pedagogo</MenuItem>
            <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
            <MenuItem value={"Pedagogical Technician"}>
              Técnico Pedagógico
            </MenuItem>
          </Select>
        </Box>
        {(userType === "Student" || userType === "Representative") && (
          <Box className="w-1/2">
            <Typography
              variant="xl_text_bold"
              style={{ color: colorByModeSecondary }}
            >
              Turma
            </Typography>
            <TextField className="w-full !mb-8 !mt-4" label="Turma" />
          </Box>
        )}
      </Box>

      <Typography
        variant="md_text_regular"
        style={{ color: OpacityHex(constrastColor, 0.6) }}
      >
        Ao adicionar este usuário, o email cadastrado receberá um email contendo
        suas informações de login, como sua senha de acesso, que será gerada
        aleatóriamente, podendo ser alterada posteriormente, assim como sua foto
        de perfil que de início será a padrão.
      </Typography>

      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-10"
      ></div>

      <Box className="flex flex-row gap-4">
        <Button
          variant="contained"
          className="w-full small:w-fit"
          style={{ backgroundColor: lightGrayColor }}
        >
          <Typography variant="md_text_regular">Cancelar</Typography>
        </Button>

        <Button
          variant="contained"
          className="w-full small:w-fit"
          style={{ backgroundColor: primaryColor }}
        >
          <Typography variant="md_text_regular" style={{ color: whiteColor }}>
            Adicionar
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

"use client";
import Title from "@/components/Title";
import SelectTable from "@/components/table/SelectTable";
import { useThemeContext } from "@/hooks/useTheme";
import Class from "@/interfaces/Class";
import OpacityHex from "@/utils/OpacityHex";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AddUser() {
  const {
    constrastColor,
    colorByModeSecondary,
    lightGrayColor,
    whiteColor,
    primaryColor,
  } = useThemeContext();
  const [userType, setUserType] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [classExistents, setClassExistents] = useState<Class[]>([]);
  const [searchClass, setSearchClass] = useState<string>("");

  const createUser = async () => {
    console.log("testeCreate");
    const response = await fetch(`http://localhost:8081/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        typeUser: userType,
        class_id: selectedClass,
      }),
    });
    response.json().then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch(
        "http://localhost:8081/class" +
          (searchClass ? "?name=" + searchClass : "")
      );
      const data = await response.json();
      setSelectedClass(data.content[0] && data.content[0].id);
      setClassExistents(data.content);
    };
    fetchClass();
  }, [searchClass]);

  return (
    <Box>
      <Title textHighlight="Adicionar usuário" />

      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-8"
      ></div>

      <Typography
        variant="xl_text_bold"
        style={{ color: colorByModeSecondary }}
      >
        Nome Completo
      </Typography>
      <TextField
        className="w-full !mb-8 !mt-4"
        label="Nome Completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Typography
        variant="xl_text_bold"
        style={{ color: colorByModeSecondary }}
      >
        Email
      </Typography>
      <TextField
        className="w-full !mb-8 !mt-4"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Box className="w-full flex flex-col items-start">
        <Typography
          variant="xl_text_bold"
          style={{ color: colorByModeSecondary }}
        >
          Tipo de Usuário
        </Typography>
        <Select
          className="w-full !mb-8 mt-4"
          value={userType}
          size="medium"
          onChange={(e) => {
            setUserType(e.target.value);
          }}
        >
          <MenuItem value={"student"}>Aluno</MenuItem>
          <MenuItem value={"representative"}>Representante</MenuItem>
          <MenuItem value={"teacher"}>Professor</MenuItem>
          <MenuItem value={"pedagogic"}>Pedagogo</MenuItem>
          <MenuItem value={"supervisor"}>Supervisor</MenuItem>
          <MenuItem value={"pedagogical Technician"}>
            Técnico Pedagógico
          </MenuItem>
        </Select>
      </Box>

      {(userType === "student" || userType === "representative") && (
        <SelectTable
          value={selectedClass}
          setRadioSelectedItem={setSelectedClass}
          name="Lista de Turmas"
          rows={classExistents}
          selectType="single"
          setSearch={setSearchClass}
        />
      )}

      <Box className="mt-8">
        <Typography
          variant="md_text_regular"
          style={{ color: OpacityHex(constrastColor, 0.6) }}
        >
          Ao adicionar este usuário, o email cadastrado receberá um email
          contendo suas informações de login, como sua senha de acesso, que será
          gerada aleatóriamente, podendo ser alterada posteriormente, assim como
          sua foto de perfil que de início será a padrão.
        </Typography>
      </Box>

      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-8"
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

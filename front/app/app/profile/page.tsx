/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import Icon from "@/components/Icon";
import UploadImageModal from "@/components/modals/UploadImageModal";
import Title from "@/components/Title";
import Photo from "@/components/profile/Photo";
import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { useRoleContext } from "@/hooks/useRole";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import LoadingModal from "@/components/modals/LoadingModal";

export default function Profile() {
  const {
    primaryColor,
    whiteColor,
    colorByModeSecondary,
    constrastColor,
    textBlackColor,
    colorByMode,
  } = useThemeContext();

  const { role, name, userId, token } = useRoleContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createDate, setCreateDate] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackmessage, setSnackMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setSnackMessage("Texto copiado para a área de transferência!");
        openSnackbar();
      })
      .catch((err) => {
        console.error("Erro ao copiar texto:", err);
      });
  };

  async function fetchUser() {
    try {
      if (userId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("user data: ", data);
            setCreateDate(
              data.createDate.split("T")[0].split("-").reverse().join("/")
            );
            setEmail(data.userAuthentication.username);
          });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function fetchUserClass() {
    try {
      if (userId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/student/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Student: ", data);
            setStudentClass(
              data.studentClass?.[0]?.name || "Você ainda não está em uma turma"
            );
          });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
    if (role === "student") {
      fetchUserClass();
    }
  }, []);

  const validatePassword = () => {
    if (!oldPassword || oldPassword.trim() === "") {
      console.log("A senha atual não pode estar vazia!");
      setSnackMessage("A senha atual não pode estar vazia!");
      openSnackbar();
      return false;
    }

    if (!password || password.trim() === "") {
      console.log("A nova senha não pode estar vazia!");
      setSnackMessage("A nova senha não pode estar vazia!");
      openSnackbar();
      return false;
    }

    if (password === oldPassword) {
      console.log("A nova senha precisa ser diferente da senha atual!");
      setSnackMessage("A nova senha precisa ser diferente da senha atual!");
      openSnackbar();
      return false;
    }

    if (password !== confirmPassword) {
      console.log("As senhas não coincidem!");
      setSnackMessage("As senhas não coincidem!");
      openSnackbar();
      return false;
    }

    if (password.length < 8) {
      console.log("A nova senha precisa ter no mínimo 8 caracteres!");
      setSnackMessage("A nova senha precisa ter no mínimo 8 caracteres!");
      openSnackbar();
      return false;
    }

    return true;
  };

  console.log("tokena asdasdasdasd: ", token);

  const changePassword = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: password,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          console.log(data);
          if (data.message === "Senha incorreta") {
            setSnackMessage("Senha atual incorreta!");
            openSnackbar();
            return;
          }
          console.log("Senha alterada com sucesso!");
          console.log("Nova senha:", password);
          setSnackMessage("Senha alterada com sucesso!");
          openSnackbar();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      console.log("Password changed successfully!");
    } catch (error) {
      console.log("Error changing password:", error);
      setIsLoading(false);
      setSnackMessage("Erro ao alterar senha. Tente novamente.");
      openSnackbar();
    }
  };

  const handleSave = async () => {
    const isValid = validatePassword();

    if (!isValid) return;

    await changePassword();
  };

  const translateRole = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "pedagogic":
        return "Pedagógico";
      case "subpedagogic":
        return "Subpedagógico";
      case "supervisor":
        return "Supervisor";
      case "teacher":
        return "Professor";
      case "leader":
        return "Representante";
      case "student":
        return "Aluno";
      default:
        return "";
    }
  };

  return (
    <Box className={`${isModalOpen && "overflow-hidden"}`}>
      <Title textHighlight="Perfil" />
      <Box className="md:flex md:flex-nowrap gap-10">
        <Box
          style={{ backgroundColor: primaryColor }}
          className="flex h-full flex-col items-center justify-between rounded-normal gap-5 p-5 md:w-[600px] md:h-[927px]"
        >
          <Box className="flex flex-col justify-center items-center gap-5">
            <Box className="relative">
              <Photo idUser={1} rounded={true} classname="h-40 w-40" />
              <Box className="absolute right-0 bottom-0">
                <Button
                  variant="contained"
                  color="secondary"
                  className="!min-w-0 !border-2"
                  sx={{ width: 35, height: 35, padding: 0 }}
                  onClick={openModal}
                >
                  <Icon
                    IconPassed={LuPencilLine}
                    color={textBlackColor}
                    className="text-[1.5rem]"
                  />
                </Button>
              </Box>
            </Box>
            <Typography
              className="text-center"
              variant="lg_text_regular"
              color={whiteColor}
            >
              {name}
            </Typography>
            <Typography
              className="text-center"
              variant="lg_text_regular"
              color={whiteColor}
            >
              {translateRole(role)}
            </Typography>
          </Box>
          <Typography
            className="text-center"
            variant="lg_text_regular"
            color={whiteColor}
          >
            Adicionado em: {createDate}
          </Typography>
        </Box>
        <Box className="mt-10 flex flex-col gap-10 md:mt-0 md:justify-start md:items-center w-full">
          <Box className="w-full flex flex-col justify-center items-start gap-2">
            <Typography color={colorByModeSecondary} variant="xl_text_bold">
              Informações gerais
            </Typography>
            <Typography
              color={colorByModeSecondary}
              variant="md_text_bold"
              className="!mt-5"
            >
              Nome Completo
            </Typography>
            <input
              style={{
                color: OpacityHex(constrastColor, 0.6),
                borderColor: OpacityHex(primaryColor, 0.6),
                padding: "14.5px 14px",
              }}
              readOnly
              value={name ? name : ""}
              className="bg-transparent outline-none border-2 rounded-normal w-full cursor-copy"
              onClick={() => handleCopy(name ? name : "")}
            />
          </Box>
          <Box className="w-full flex flex-col justify-center items-start gap-2">
            <Typography color={colorByModeSecondary} variant="md_text_bold">
              Email
            </Typography>
            <input
              style={{
                color: OpacityHex(constrastColor, 0.6),
                borderColor: OpacityHex(primaryColor, 0.6),
                padding: "14.5px 14px",
              }}
              readOnly
              value={email}
              className="bg-transparent outline-none border-2 rounded-normal w-full cursor-copy"
              onClick={() => handleCopy(email)}
            />
          </Box>
          {role === "student" && (
            <Box className="w-full flex flex-col justify-center items-start gap-2">
              <Typography color={colorByModeSecondary} variant="md_text_bold">
                Turma
              </Typography>
              <input
                style={{
                  color: OpacityHex(constrastColor, 0.6),
                  borderColor: OpacityHex(primaryColor, 0.6),
                  padding: "14.5px 14px",
                }}
                value={studentClass}
                readOnly
                className="bg-transparent outline-none border-2 rounded-normal w-full cursor-copy"
                onClick={() => handleCopy(studentClass)}
              />
            </Box>
          )}
          <Box className="w-full flex flex-col justify-center items-start gap-2">
            <Typography
              color={colorByModeSecondary}
              variant="xl_text_bold"
              className="!mt-5"
            >
              Trocar senha
            </Typography>
            <Typography
              color={colorByModeSecondary}
              variant="md_text_bold"
              className="!mt-5"
            >
              Senha atual
            </Typography>
            <TextField
              label="Senha atual"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              className="w-full"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setOldPassword(e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Icon
                        color={colorByMode}
                        IconPassed={showPassword ? FaRegEyeSlash : FaRegEye}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              color={colorByModeSecondary}
              variant="md_text_bold"
              className="!mt-5"
            >
              Nova senha
            </Typography>
            <TextField
              label="Nova senha"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              className="w-full"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Icon
                        color={colorByMode}
                        IconPassed={showPassword ? FaRegEyeSlash : FaRegEye}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              color={colorByModeSecondary}
              variant="md_text_bold"
              className="!mt-5"
            >
              Confirmar nova senha
            </Typography>
            <TextField
              label="Confirmar nova senha"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              className="w-full"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setConfirmPassword(e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Icon
                        color={colorByMode}
                        IconPassed={showPassword ? FaRegEyeSlash : FaRegEye}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button variant="contained" fullWidth onClick={handleSave}>
            <Typography color={whiteColor} variant="lg_text_bold">
              Salvar
            </Typography>
          </Button>
        </Box>
      </Box>

      {isSnackbarOpen && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message={snackmessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: primaryColor,
              color: whiteColor,
            },
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <Icon IconPassed={IoClose} color={whiteColor} />
            </IconButton>
          }
        />
      )}
      {isModalOpen && <UploadImageModal onClose={closeModal} />}
      {isLoading && <LoadingModal />}
    </Box>
  );
}

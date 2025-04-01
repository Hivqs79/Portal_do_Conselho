"use client";
import Icon from "@/components/Icon";
import UploadImageModal from "@/components/Modals/UploadImageModal";
import Title from "@/components/Title";
import Photo from "@/components/profile/Photo";
import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

export default function Profile() {
  const {
    primaryColor,
    whiteColor,
    colorByModeSecondary,
    constrastColor,
    textBlackolor,
  } = useThemeContext();

  const [isStudent, setRole] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

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
        openSnackbar();
      })
      .catch((err) => {
        console.error("Erro ao copiar texto:", err);
      });
  };

  return (
    <Box className={`${isModalOpen && "overflow-hidden"}`}>
      <Title textHighlight="Perfil" />
      <Box className="md:flex md:flex-nowrap gap-10">
        <Box
          style={{ backgroundColor: primaryColor }}
          className="flex h-ful flex-col items-center justify-between rounded-normal gap-5 p-5 md:w-[600px] md:h-[600px]"
        >
          <span className="flex flex-col justify-center items-center gap-5">
            <span className="relative">
              <Photo idUser={1} rounded={true} classname="h-40 w-40" />
              <span className="absolute right-0 bottom-0">
                <Button
                  variant="contained"
                  color="secondary"
                  className="!min-w-0 !border-2"
                  sx={{ width: 35, height: 35, padding: 0 }}
                  onClick={openModal}
                >
                  <Icon
                    IconPassed={LuPencilLine}
                    color={textBlackolor}
                    className="text-[1.5rem]"
                  />
                </Button>
              </span>
            </span>
            <Typography
              className="text-center"
              variant="lg_text_regular"
              color={whiteColor}
            >
              Pedro Henrique Panstein
            </Typography>
            <Typography
              className="text-center"
              variant="lg_text_regular"
              color={whiteColor}
            >
              Aluno
            </Typography>
          </span>
          <Typography
            className="text-center"
            variant="lg_text_regular"
            color={whiteColor}
          >
            Adicionado em: 12/03/2025
          </Typography>
        </Box>
        <Box className="mt-10 flex flex-col gap-10 md:mt-0 md:justify-start md:items-center w-full">
          <span className="w-full flex flex-col justify-center items-start gap-2">
            <Typography color={colorByModeSecondary} variant="lg_text_bold">
              Nome Completo
            </Typography>
            <input
              style={{
                color: OpacityHex(constrastColor, 0.6),
                borderColor: OpacityHex(constrastColor, 0.6),
              }}
              readOnly
              value={"Pedro Henrique Panstein"}
              className="bg-transparent outline-none border-2 rounded-small p-2 w-full cursor-copy"
              onClick={() => handleCopy("Pedro Henrique Panstein")}
            />
          </span>
          <span className="w-full flex flex-col justify-center items-start gap-2">
            <Typography color={colorByModeSecondary} variant="lg_text_bold">
              Email
            </Typography>
            <input
              style={{
                color: OpacityHex(constrastColor, 0.6),
                borderColor: OpacityHex(constrastColor, 0.6),
              }}
              readOnly
              value={"teste@estudante.sesisenai.org.br"}
              className="bg-transparent outline-none border-2 rounded-small p-2 w-full cursor-copy"
              onClick={() => handleCopy("teste@estudante.sesisenai.org.br")}
            />
          </span>
          {isStudent && (
            <span className="w-full flex flex-col justify-center items-start gap-2">
              <Typography color={colorByModeSecondary} variant="lg_text_bold">
                Turma
              </Typography>
              <input
                style={{
                  color: OpacityHex(constrastColor, 0.6),
                  borderColor: OpacityHex(constrastColor, 0.6),
                }}
                value={"AI PSIN 2023/2 INT1"}
                readOnly
                className="bg-transparent outline-none border-2 rounded-small p-2 w-full cursor-copy"
                onClick={() => handleCopy("AI PSIN 2023/2 INT1")}
              />
            </span>
          )}
        </Box>
      </Box>

      {isSnackbarOpen && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message="Texto copiado para a área de transferência!"
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
    </Box>
  );
}

"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography, Button, Modal } from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import Photo from "../profile/Photo";
import { FiUpload } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";

interface UploadImageModalProps {
  onClose: () => void;
}

export default function UploadImageModal({ onClose }: UploadImageModalProps) {
  const {
    primaryColor,
    redDanger,
    backgroundColor,
    terciaryColor,
    whiteColor,
    textBlackColor,
  } = useThemeContext();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);  

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log("Arquivo selecionado:", file);
    }
  };

  // Função para lidar com o arrastar e soltar
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log("Arquivo arrastado e solto:", file);
    }
  }, []);

  // Função para prevenir o comportamento padrão ao arrastar sobre a área
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <Modal
        open
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          outline: "none",
        }}
      >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: backgroundColor }}
        className="p-5 rounded-lg w-full max-w-[800px] m-5"
      >
        {/* Cabeçalho do modal */}
        <span className="flex justify-between items-center">
          <Typography variant="lg_text_bold" color={primaryColor}>
            Adicionar nova imagem de perfil
          </Typography>
          <span onClick={onClose}>
            <Icon
              IconPassed={IoClose}
              color={redDanger}
              className="cursor-pointer text-[2rem]"
            />
          </span>
        </span>

        <Box
          bgcolor={terciaryColor}
          className="p-5 rounded-normal mt-4 flex flex-col justify-center items-center gap-5 md:flex-row md:gap-10"
        >
          <div
            className="relative"
            onClick={() => document.getElementById("fileInput")?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ cursor: "pointer" }}
          >
            <Photo
              classname="p-0 m-0 h-[200px] w-[200px]"
              rounded={true}
              editPhoto={selectedImage}
              profile={true}
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-black/50 flex justify-center items-center rounded-full -translate-y-1/2">
              <Icon
                IconPassed={FiUpload}
                color={terciaryColor}
                className="text-[4rem]"
              />
            </span>
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="rounded-full"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div>
            <Typography variant="md_text_regular" color={textBlackColor}>
              Siga as seguintes orientações para a foto:
            </Typography>

            <ul className="list-disc pl-5 mt-3">
              <li>
                <Typography variant="sm_text_regular" color={textBlackColor}>
                  Olhe diretamente para a câmera e não para os lados;
                </Typography>
              </li>
              <li>
                <Typography variant="sm_text_regular" color={textBlackColor}>
                  Não use nenhum acessório decorativo, como chapéu, boné, óculos
                  escuros, etc;
                </Typography>
              </li>
              <li>
                <Typography variant="sm_text_regular" color={textBlackColor}>
                  Dê preferência para fundos claros;
                </Typography>
              </li>
              <li>
                <Typography variant="sm_text_regular" color={textBlackColor}>
                  A foto deve ser do busto para cima;
                </Typography>
              </li>
            </ul>
          </div>
        </Box>
        <Box className="flex justify-between gap-3 mt-5">
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              width: "45%",
              color: textBlackColor,
              backgroundColor: terciaryColor,
              borderWidth: 2,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "45%",
              backgroundColor: primaryColor,
              color: whiteColor,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Salvar foto
          </Button>
        </Box>
      </div>
    </Modal>
  );
}

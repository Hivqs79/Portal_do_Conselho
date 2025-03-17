"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import { useEffect } from "react";

interface CommentariesModalProps {
  onClose: () => void;
}

export default function CommentariesModal({ onClose }: CommentariesModalProps) {
  const { primaryColor, redDanger, backgroundColor } = useThemeContext();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Box className="bg-black/60 fixed inset-0 flex justify-center items-center z-50">
        <Box
          style={{ backgroundColor: backgroundColor }}
          className="p-5 rounded-lg w-full max-w-[800px] m-5"
        >
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
        </Box>
      </Box>
    </>
  );
}

"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import { useEffect, useState, useRef } from "react"; // Adicione useRef
import OpacityHex from "@/hooks/OpacityHex";

interface ConfirmChangesProps {
  title: string;
  description: string;
  onClose: () => void;
}

export default function ConfirmChanges({
  title,
  description,
  onClose,
}: ConfirmChangesProps) {
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const {
    whiteColor,
    textBlackolor,
    colorByModeSecondary,
    backgroundColor,
    redDanger,
  } = useThemeContext();
  const spanValue = "Confirmar cancelamento do conselho atual";

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
    if (event.key === "Enter") {
      const result = handleConfirmClick();
      if (result) {
        console.log("oi: ", result);
        onClose();
      }
    }
  };

  function handleConfirmClick() {
    if (inputRef.current?.value === spanValue) {
      alert("Cancelamento efetuado com sucesso!");
      onClose();
      return true;
    } else {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
      }, 3000);
    }
  }

  const onCloseConfirmModal = () => {
    setIsModalConfirmOpen(false);
  };

  function openConfirmDelete() {
    setIsModalConfirmOpen(true);
  }

  return (
    <>
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
        {!isModalConfirmOpen ? (
          <Box
            style={{ backgroundColor: backgroundColor }}
            className="p-6 rounded-lg w-full max-w-[600px] m-5"
          >
            <Box className="flex justify-between items-center">
              <Box>
                <Typography variant="xl_text_bold" color={colorByModeSecondary}>
                  {title}
                </Typography>
              </Box>
              <span onClick={onClose}>
                <Icon
                  IconPassed={IoClose}
                  color={redDanger}
                  className="cursor-pointer text-[2rem]"
                />
              </span>
            </Box>
            <Box className="mt-6">
              <Typography variant="lg_text_regular">{description}</Typography>
            </Box>
            <Box className="flex items-center gap-10 mt-8">
              <Button
                onClick={onClose}
                className="w-full"
                variant="contained"
                color="terciary"
              >
                <Typography variant="lg_text_bold" color={textBlackolor}>
                  Voltar
                </Typography>
              </Button>
              <Button
                onClick={() => openConfirmDelete()}
                className="w-full"
                variant="contained"
                color="primary"
              >
                <Typography variant="lg_text_bold" color={whiteColor}>
                  Cancelar Conselho
                </Typography>
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            onClick={onCloseConfirmModal}
            className="bg-black/60 fixed inset-0 flex justify-center items-center z-50"
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: backgroundColor }}
              className="p-6 rounded-lg w-full max-w-[600px] m-5"
            >
              <Box className="flex justify-between items-center">
                <Box>
                  <Typography
                    variant="xl_text_bold"
                    color={colorByModeSecondary}
                  >
                    Quase lá!
                  </Typography>
                </Box>
                <span onClick={onCloseConfirmModal}>
                  <Icon
                    IconPassed={IoClose}
                    color={redDanger}
                    className="cursor-pointer text-[2rem]"
                  />
                </span>
              </Box>
              <Box className="my-6">
                <Typography variant="lg_text_regular">
                  Para você cancelar o conselho, voce precisa escrever esta
                  frase{" "}
                  <span
                    style={{
                      backgroundColor: OpacityHex(redDanger, 0.1),
                      color: redDanger,
                    }}
                    className="font-bold rounded-normal p-1"
                  >
                    {spanValue}
                  </span>{" "}
                  no campo de texto abaixo:
                </Typography>
              </Box>
              <TextField
                inputRef={inputRef}
                autoComplete="off"
                id="outlined-search"
                label="Confirmar frase"
                type="search"
                error={isValid ? false : true}
                helperText={
                  isValid
                    ? ""
                    : "Frase incorreta, verifique as letras e espaçamentos"
                }
                slotProps={{
                  input: {
                    endAdornment: null,
                  },
                }}
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Box className="flex items-center gap-10 mt-8">
                <Button
                  onClick={onCloseConfirmModal}
                  className="w-full"
                  variant="contained"
                  color="terciary"
                >
                  <Typography variant="lg_text_bold" color={textBlackolor}>
                    Voltar
                  </Typography>
                </Button>
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  onClick={() => handleConfirmClick()}
                >
                  <Typography variant="lg_text_bold" color={whiteColor}>
                    Confirmar
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Modal>
    </>
  );
}

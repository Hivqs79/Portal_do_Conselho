import React, { useEffect, useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { IconButton, Snackbar, Typography } from "@mui/material";
import Icon from "../Icon";
import { IoClose, IoCopyOutline } from "react-icons/io5";

interface TextareaProps {
  readonly: boolean;
  title: string;
  content?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  copyButton?: boolean;
}

export default function TextareaComponent({
  readonly,
  title,
  content,
  placeholder,
  onChange,
  value,
  copyButton,
}: TextareaProps) {
  const [isCopy, setIsCopy] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Estado para animação
  const {
    primaryColor,
    constrastColor,
    backgroundColor,
    colorByModeSecondary,
    whiteColor,
  } = useThemeContext();

  useEffect(() => {
    if (copyButton) {
      setIsCopy(true);
    }
  }, [copyButton]);

  function copyTextArea() {
    navigator.clipboard
      .writeText(value || content || "")
      .then(() => {
        triggerAnimation(); // Chama animação
        openSnackbar();
      })
      .catch((err) => {
        console.error("Erro ao copiar texto:", err);
      });
  }

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  if (readonly) {
    return (
      <>
        <div className="w-full">
          <Typography variant="lg_text_bold" color={colorByModeSecondary}>
            {title}
          </Typography>
          <div
            style={{
              background: backgroundColor,
              border: `2px solid ${colorByModeSecondary}`,
            }}
            className="rounded-normal p-1 mt-3 min-h-[200px] "
          >
            <span className={`${isCopy ? "relative" : ""}`}>
              <textarea
                className={`${
                  isCopy ? "cursor-copy" : ""
                } cursor-default w-full min-h-[200px] pl-3 pt-2 text-[16px] outline-none resize-none bg-transparent`}
                readOnly
                value={value || content || ""}
                placeholder={placeholder}
                style={{
                  color: constrastColor,
                }}
              />
              {isCopy && (
                <span
                  onClick={() => copyTextArea()}
                  className={`absolute bottom-1 right-2 ${
                    isAnimating ? "animate-copy" : ""
                  }`} // Adiciona classe de animação
                >
                  <Icon
                    color={colorByModeSecondary}
                    IconPassed={IoCopyOutline}
                  />
                </span>
              )}
            </span>
          </div>
        </div>
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
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        <Typography variant="lg_text_bold" color={colorByModeSecondary}>
          {title}
        </Typography>
        <div
          style={{
            background: backgroundColor,
            border: `2px solid ${colorByModeSecondary}`,
          }}
          className="rounded-normal p-1 mt-3 min-h-[200px] "
        >
          <textarea
            className="w-full min-h-[200px] pl-3 pr-1 pt-2 text-[16px] outline-none resize-none bg-transparent"
            value={value || content || ""} // Use value ou content, ou string vazia
            placeholder={placeholder}
            style={{ color: constrastColor }}
            onChange={onChange ? onChange : undefined} // Garante que onChange não seja passado como `null`
            readOnly={!onChange} // Se onChange não existir, torne o campo somente leitura
          />
        </div>
      </div>
    </>
  );
}

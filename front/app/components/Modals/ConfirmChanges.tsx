"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import { useEffect } from "react";

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
  const { primaryColor, colorByMode, colorByModeSecondary, backgroundColor, redDanger } = useThemeContext();

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
      <div
        onClick={onClose}
        className="bg-black/60 fixed inset-0 flex justify-center items-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundColor: backgroundColor }}
          className="p-5 rounded-lg w-full max-w-[1000px] m-5"
        >
          <Box className="flex justify-between items-center">
            <Box>
              <Typography variant="lg_text_bold" color={primaryColor}>
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
          <Box>
            <Typography variant="md_text_regular">
              {description}
            </Typography>
          </Box>
        </div>
      </div>
    </>
  );
}

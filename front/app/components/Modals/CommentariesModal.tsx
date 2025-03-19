"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import { useEffect } from "react";
import Anotation from "../Anotation";

interface CommentariesModalProps {
  onClose: () => void;
  student: boolean;
  name: string;
  anotations: TeacherAnnotation[];
}

export default function CommentariesModal({
  onClose,
  student,
  name,
  anotations,
}: CommentariesModalProps) {
  const {
    primaryColor,
    redDanger,
    backgroundColor,
    constrastColor,
    terciaryColor,
  } = useThemeContext();

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

  const verifyRank = (rank: string | undefined | null): string => {
    return rank ?? "none";
  };

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
                {student
                  ? "Comentarios para o Aluno: "
                  : "Anotações para a turma: "}
              </Typography>
              <Typography variant="lg_text_bold" color={constrastColor}>
                {name}
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
          <Box
            style={{ backgroundColor: terciaryColor }}
            className="p-2 mt-8 rounded-big"
          >
            <span className="flex rounded-big flex-col max-h-[550px] p-2 gap-5 overflow-y-scroll">
              {anotations.map((anotation: any, index: number) => (
                <Anotation
                  key={index}
                  name={anotation.name}
                  rank={verifyRank(anotation.rank)}
                  positiveContent={anotation.positiveContent}
                  negativeContent={anotation.negativeContent}
                />
              ))}
            </span>
          </Box>
        </div>
      </div>
    </>
  );
}

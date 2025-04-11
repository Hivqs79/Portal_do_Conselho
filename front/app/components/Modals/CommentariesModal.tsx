"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Modal, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import { useEffect } from "react";
import AccordionComponent from "../AccordionComponent";
import OpacityHex from "@/utils/OpacityHex";
import { Rank } from "@/interfaces/RankType";
import Annotations from "@/app/annotations/page";
import AvaliationInputs from "../council/AvaliationInputs";

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
    redDanger,
    backgroundColor,
    constrastColor,
    terciaryColor,
    colorByModeSecondary,
  } = useThemeContext();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  console.log("annotations: ", anotations);

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
          className="p-5 rounded-lg w-full max-w-[1000px] m-5"
        >
          <Box className="flex justify-between items-center">
            <Box>
              <Typography variant="lg_text_bold" color={colorByModeSecondary}>
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
            style={{ backgroundColor: OpacityHex(colorByModeSecondary, 0.2) }}
            className="p-2 mt-8 rounded-big"
          >
            <span className="flex rounded-big flex-col max-h-[550px] p-2 gap-2 overflow-y-scroll">
              {anotations.map((anotation: any, index: number) => (
                console.log("anotation 2: ", anotation),
                console.log("strengths: ", anotation.strengths),
                console.log("toImprove: ", anotation.toImprove),
                <AccordionComponent
                  type="default"
                  key={index}
                  name={anotation.teacher.name}
                  rank={verifyRank(anotation.rank) as Rank}
                >
                  <AvaliationInputs
                    Positivecontent={anotation.strengths}
                    Negativecontent={anotation.toImprove}
                    copyButton
                    readOnly
                  />
                </AccordionComponent>
              ))}
            </span>
          </Box>
        </div>
      </Modal>
    </>
  );
}

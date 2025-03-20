"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Popover, Typography } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Icon from "./Icon";
import { useEffect, useRef, useState } from "react";
import Rank from "./rank/Rank";
import TextareaComponent from "./input/TextareaComponent";

interface AnotationProps {
  name: string;
  rank: string;
  positiveContent: string;
  negativeContent: string;
}

export default function Anotation({
  name,
  rank,
  positiveContent,
  negativeContent,
}: AnotationProps) {
  const [isOpenInputs, setIsOpenInputs] = useState(false);
  const { primaryColor, whiteColor, backgroundColor } = useThemeContext();

  const showIputs = () => {
    setIsOpenInputs(true);
  };

  const translateRank = (rank: string) => {
    switch (rank) {
      case "excellent":
        return "Excelente";
      case "good":
        return "Bom";
      case "average":
        return "Mediano";
      case "critical":
        return "Crítico";
      case "none":
        return "Nenhum rank";
    }
  };

  const closeIputs = () => {
    setIsOpenInputs(false);
  };

  return (
    <>
      <Box>
        <Box
          style={{ backgroundColor: primaryColor }}
          className={`flex justify-between items-center rounded-big p-5 ${
            isOpenInputs ? "rounded-b-none" : ""
          }`}
        >
          <Typography variant="lg_text_bold" color={whiteColor}>
            {name}
          </Typography>
          {!isOpenInputs ? (
            <span onClick={showIputs}>
              <Icon
                color={whiteColor}
                className="text-[2.5rem]"
                IconPassed={IoIosArrowDown}
              />
            </span>
          ) : (
            <span className="flex gap-5 justify-end items-center">
              <span className="flex items-center gap-5">
                <Typography variant="lg_text_bold" color={whiteColor}>
                  Classificação da turma:
                </Typography>
                <span title={translateRank(rank)}>
                  <Rank
                    outline={true}
                    popover={false}
                    type={
                      rank as
                        | "excellent"
                        | "good"
                        | "average"
                        | "critical"
                        | "none"
                    }
                  />
                </span>
              </span>
              <span onClick={closeIputs}>
                <Icon
                  color={whiteColor}
                  className="text-[2.5rem]"
                  IconPassed={IoIosArrowUp}
                />
              </span>
            </span>
          )}
        </Box>
        {isOpenInputs && (
          <Box
            style={{
              backgroundColor: backgroundColor,
              borderColor: primaryColor,
            }}
            className="p-5 border-2 flex flex-wrap gap-6 md:flex-nowrap rounded-b-big"
          >
            <TextareaComponent
              readonly={true}
              title="Pontos Positivos"
              content={positiveContent}
              copyButton={true}
            />
            <div
              style={{ backgroundColor: primaryColor }}
              className="hidden lg:block w-[.2rem] h-[255px]"
            ></div>
            <TextareaComponent
              readonly={true}
              title="Pontos a Melhorar"
              content={negativeContent}
              copyButton={true}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

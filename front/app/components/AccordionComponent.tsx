"use client";
import { useThemeContext } from "@/hooks/useTheme";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import Icon from "./Icon";
import TextareaComponent from "./input/TextareaComponent";
import Rank from "./rank/Rank";
import { useState } from "react";

interface AnotationProps {
  type: "default" | "notification" | "council";
  outlined?: boolean;
  name: string;
  description?: string;
  rank?: string;
  positiveContent?: string;
  negativeContent?: string;
}

export default function AccordionComponent({
  type,
  name,
  description,
  rank,
  positiveContent,
  negativeContent,
  outlined,
}: AnotationProps) {
  const { primaryColor, whiteColor, backgroundColor, colorByModeSecondary } =
    useThemeContext();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <Accordion
      sx={{
        boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}`,
        backgroundColor: outlined ? backgroundColor : "transparent",
        // boxShadow: `0px 0px 5px 1px ${colorByModeSecondary}30`,
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: "4px 0 !important",
        },
      }}
    >
      <AccordionSummary
        onClick={() => setIsOpen(!isOpen)}
        expandIcon={
          <Icon
            IconPassed={IoIosArrowDown}
            color={outlined ? colorByModeSecondary : whiteColor}
            className="text-[2.5rem]"
          />
        }
        sx={{
          backgroundColor: outlined ? backgroundColor : primaryColor,
          color: whiteColor,
          boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}`,
          padding: "8px",
          borderRadius: "16px",
          "&.Mui-expanded": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            "& .MuiAccordionSummary-content": {
              margin: "0px !important",
            },
          },
        }}
      >
        <Box className="flex justify-between items-center w-full mx-5">
          <Typography
            variant="lg_text_bold"
            color={outlined ? colorByModeSecondary : whiteColor}
          >
            {name}
          </Typography>
          {isOpen && type === "council" && (
            <Box
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-5 cursor-default"
            >
              <Typography
                variant="lg_text_bold"
                color={outlined ? colorByModeSecondary : whiteColor}
              >
                Classificação da turma:
              </Typography>
              <Box title={translateRank(rank as string)}>
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
              </Box>
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        className="rounded-b-big"
        sx={{
          backgroundColor: "transparent",
          borderTop: "none",
          borderColor: colorByModeSecondary,
          paddingLeft: "16px !important",
        }}
      >
        {type === "council" && (
          <Box className="flex gap-10 p-2">
            <TextareaComponent
              readonly={true}
              title="Pontos Positivos"
              content={positiveContent}
              copyButton={true}
            />
            <div
              style={{ backgroundColor: colorByModeSecondary }}
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
        {type === "default" && (
          <Box className="flex gap-10 p-2">
            <Typography variant="lg_text_regular">{description}</Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

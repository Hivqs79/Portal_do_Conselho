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
        border: `2px solid ${colorByModeSecondary}`,
        borderRadius: "16px",
        backgroundColor: outlined ? backgroundColor : primaryColor,
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: "4px !important",
        },
      }}
    >
      <AccordionSummary
        onClick={() => setIsOpen(!isOpen)}
        expandIcon={
          <Icon
            IconPassed={IoIosArrowDown}
            color={outlined ? primaryColor : whiteColor}
            className="text-[2.5rem]"
          />
        }
        sx={{
          backgroundColor: outlined ? backgroundColor : primaryColor,
          color: whiteColor,
          borderColor: outlined ? colorByModeSecondary : "",
          borderWidth: outlined ? "2px" : "none",
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
        <span className="flex justify-between items-center w-full mx-5">
          <Typography
            variant="lg_text_bold"
            color={outlined ? colorByModeSecondary : whiteColor}
          >
            {name}
          </Typography>
          {isOpen && type === "council" && (
            <span
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-5 cursor-default"
            >
              <Typography
                variant="lg_text_bold"
                color={outlined ? colorByModeSecondary : whiteColor}
              >
                Classificação da turma:
              </Typography>
              <span title={translateRank(rank as string)}>
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
          )}
        </span>
      </AccordionSummary>
      <AccordionDetails
        className="rounded-b-big"
        sx={{ backgroundColor: backgroundColor }}
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
            <Typography variant="md_text_regular">{description}</Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

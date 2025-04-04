"use client";
import { useThemeContext } from "@/hooks/useTheme";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import Icon from "./Icon";
import { useState } from "react";
import OpacityHex from "@/utils/OpacityHex";

interface AnotationProps {
  type: "default" | "notification" | "council";
  outlined?: boolean;
  name: string;
  description?: string;
  onChange?: () => void;
  checked?: boolean;
  viwed?: boolean;
  rank?: string;
  positiveContent?: string;
  negativeContent?: string;
}

export default function AccordionComponent({
  type,
  name,
  description,
  outlined,
  onChange,
  checked,
  viwed,
  rank,
  positiveContent,
  negativeContent,
}: AnotationProps) {
  const {
    primaryColor,
    whiteColor,
    backgroundColor,
    colorByModeSecondary,
    terciaryColor,
    colorByMode,
    secondaryColor,
  } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      sx={{
        boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}`,
        backgroundColor: outlined ? backgroundColor : "transparent",
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
          backgroundColor: outlined
            ? viwed
              ? OpacityHex(secondaryColor, 0.18)
              : backgroundColor
            : primaryColor,
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
          "&.Mui-focusVisible": {
            backgroundColor: outlined
              ? backgroundColor + " !important"
              : "transparent !important",
          },
        }}
      >
        <Box className="flex justify-between items-center w-full mx-2">
          <Box className="flex items-center gap-2">
            {type === "notification" && (
              <Checkbox
                onClick={(e) => e.stopPropagation()}
                onChange={onChange}
                checked={checked}
                className="!mr-2"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fill: outlined ? colorByMode : terciaryColor,
                  },
                }}
              />
            )}
            <Typography
              variant="lg_text_bold"
              color={outlined ? colorByMode : whiteColor}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        className="rounded-b-big"
        sx={{
          backgroundColor: "transparent",
          borderTop: "none",
          borderColor: colorByModeSecondary,
          paddingLeft: "8px !important",
        }}
      >
        {type !== "council" && (
          <Box className="flex gap-10 p-2">
            <Typography variant="lg_text_regular">{description}</Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

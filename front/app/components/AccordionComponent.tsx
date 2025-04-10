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
import { Rank as RankType } from "@/interfaces/RankType";
import Rank from "./rank/Rank";

interface AnotationProps {
  type: "default" | "notification" | "council" | "table";
  outlined?: boolean;
  name: string;
  children: React.ReactNode;
  onChangeCheckbox?: () => void;
  checked?: boolean;
  viewed?: boolean;
  rank?: RankType;
  onChangeRank?: (rank: RankType) => void;
  onClick?: () => void;
}

export default function AccordionComponent({
  type,
  name,
  children,
  outlined,
  onChangeCheckbox,
  checked,
  viewed = true,
  rank,
  onChangeRank,  
  onClick,
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
        boxShadow:
          type === "table"
            ? "none"
            : `inset 0px 0px 0px 2px ${colorByModeSecondary}`,
        backgroundColor: outlined
          ? type === "table"
            ? "transparent"
            : backgroundColor
          : "transparent",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: type === "table" ? "0px !important" : "4px 0 !important",
        },
      }}
    >
      <AccordionSummary
        onClick={() => {
          setIsOpen(!isOpen);
          onClick && onClick();
        }}
        expandIcon={
          <Icon
            IconPassed={IoIosArrowDown}
            color={outlined ? colorByModeSecondary : whiteColor}
            className="text-[2.5rem]"
          />
        }
        sx={{
          backgroundColor: outlined
            ? (!viewed
              ? OpacityHex(secondaryColor, 0.18)
              : (type === "table"
                ? "transparent"
              : backgroundColor))
            : primaryColor,
          color: whiteColor,
          boxShadow:
            type === "table"
              ? "none"
              : `inset 0px 0px 0px 2px ${colorByModeSecondary}`,
          borderTop:
            type === "table" ? `1px solid ${colorByModeSecondary}` : "none",
          padding: "8px",
          borderRadius: type === "table" ? "0px" : "16px",
          "& .MuiAccordionSummary-content": {
            margin: "0px !important",
          },
          "&.Mui-expanded": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor:
              type === "table"
                ? OpacityHex(secondaryColor, 0.18)
                : "transparent",
            boxShadow:
              type === "table"
                ? `0px 2px 4px 2px ${OpacityHex(colorByModeSecondary, 0.18)}`
                : "none",
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
          <Box className="flex items-center flex-1 justify-between gap-2">
            <Box className="flex items-center">
              {type === "notification" && (
                <Checkbox
                  onClick={(e) => e.stopPropagation()}
                  onChange={onChangeCheckbox}
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
            {rank && (
              <Box onClick={(e) => e.stopPropagation()} className="flex items-center">
                <Rank variant="annotation" type={rank} outline={false} popover={true} onRankChange={onChangeRank}/>
              </Box>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        className={type === "table" ? "rounded-b-big" : ""}
        sx={{
          backgroundColor: "transparent",
          borderTop: "none",
          borderColor: colorByModeSecondary,
          paddingLeft: type !== "council" ? "18px !important" : "8px !important",
        }}
      >
        {type !== "council" && children}
      </AccordionDetails>
    </Accordion>
  );
}

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
  type: "default" | "notification" | "council" | "table" | "support";
  outlined?: boolean;
  frequency?: number | boolean;
  name: string;
  children: React.ReactNode;
  rankViwed?: boolean;
  onChangeCheckbox?: () => void;
  checked?: boolean;
  viewed?: boolean;
  rank?: RankType;
  onChangeRank?: (rank: RankType) => void;
  onClick?: () => void;
  open?: boolean;
}

export default function AccordionComponent({
  type,
  name,
  frequency,
  children,
  outlined,
  onChangeCheckbox,
  checked,
  rankViwed,
  viewed = true,
  rank,
  onChangeRank, 
  onClick,
  open = false
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
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Accordion
      expanded={isOpen}
      sx={{
        boxShadow:
          type === "table" || type === "default"
            ? "none"
            : `inset 0px 0px 0px 2px ${colorByModeSecondary}`,
          borderRadius: type === "table" ? "0px" : "16px",
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
          if(onClick) onClick();
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
                : type === "default" || type === "support" ? primaryColor : "transparent",
            boxShadow:
              type === "table"
                ? `0px 2px 4px 2px ${OpacityHex(colorByModeSecondary, 0.18)}`
                : (type === "default" || type === "notification") ? `inset 0px 0px 0px 2px ${colorByModeSecondary}` : "none",
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
            <Box className="flex items-center flex-1">
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
                variant="md_text_bold"
                className="flex-1"
                color={outlined ? colorByMode : whiteColor}
              >
                {name}
              </Typography>
              {frequency && (
                <Typography
                  variant="lg_text_regular"
                  className="hidden md:flex-1 md:flex text-center pl-[8%] lg:pl-0 lg:pr-4 lg:justify-center"
                  color={outlined ? colorByMode : whiteColor}
                >
                  {frequency}%
                </Typography>
              )}
            </Box>
            {rank && (
              <Box
                onClick={(e) => !frequency || !rankViwed && e.stopPropagation()}
                className={`flex justify-end items-center ${
                  frequency ? "w-1/5 lg:w-1/4" : ""
                }`}
              >
                <Rank
                  variant="annotation"
                  type={rank}
                  outline={frequency ? true : false}
                  popover={frequency || rankViwed ? false : true}
                  onRankChange={onChangeRank}
                />
              </Box>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        className={type === "table" ? "rounded-b-big" : ""}
        sx={{
          backgroundColor: type === "default" ? backgroundColor : "transparent",
          borderBottomLeftRadius: type === "default" ? "16px" : "0px",
          borderBottomRightRadius: type === "default" ? "16px" : "0px",
          borderTop: "none",
          padding: type === "default" ? "0px !important" : "8px 0px !important",
          borderColor: colorByModeSecondary,
          paddingLeft:
            type !== "council" && type !== "default" ? "18px !important" : type === "default" ? "0px !important" : "8px !important",
          paddingRight: type !== "council" && type !== "default" ? "18px !important" : "0px !important",
        }}
      >
        {type !== "council" && children}
      </AccordionDetails>
    </Accordion>
  );
}
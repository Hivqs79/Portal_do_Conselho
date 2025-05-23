/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import {
  FaRegFaceFrown,
  FaRegFaceLaugh,
  FaRegFaceMeh,
  FaRegFaceSmile,
} from "react-icons/fa6";
import { Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";
import { RiSubtractFill } from "react-icons/ri";
import { Encryptor } from "@/encryption/Encryptor";
import { Rank as RankType } from "@/interfaces/RankType";

interface RankProps {
  variant?: "default" | "council" | "annotation";
  type: RankType;
  outline: boolean;
  popover: boolean;
  onRankChange?: (
    rank: RankType
  ) => void;
}

export default function Rank({
  variant = "default",
  type,
  outline,
  popover,
  onRankChange,
}: RankProps) {
  const {
    colorByModeSecondary,
    constrastColor,
    secondaryColor,
    whiteColor,
    secondaryGrayColor,
  } = useThemeContext();

  const [selectedRank, setSelectedRank] = useState(type);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setSelectedRank(type);
  }, [type]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (
    newRank: RankType
  ) => {
    setSelectedRank(newRank);
    if (onRankChange) {
      onRankChange(newRank);
      const encryptedRank = Encryptor({ rank: newRank });
      localStorage.setItem("rank", encryptedRank);
    }
    handleClose();
  };

  const handleSelectNormalRank = (
    newRank: RankType
  ) => {
    setSelectedRank(newRank);
    if (onRankChange) {
      onRankChange(newRank);
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "rank-popover" : undefined;

  const className = `text-4xl p-1 ${
    outline ? "border-[2px] rounded-normal" : ""
  }`;

  const rank = {
    EXCELLENT: <FaRegFaceLaugh style={{borderColor: colorByModeSecondary}} className={`${className} text-[#549600]`} />,
    GOOD: <FaRegFaceSmile style={{borderColor: colorByModeSecondary}} className={`${className} text-[#7ABA28]`} />,
    AVERAGE: <FaRegFaceMeh style={{borderColor: colorByModeSecondary}} className={`${className} text-[#F3C91C]`} />,
    CRITICAL: <FaRegFaceFrown style={{borderColor: colorByModeSecondary}} className={`${className} text-[#FE3535]`} />,
    NONE: <RiSubtractFill style={{borderColor: colorByModeSecondary}} className={`${className} text-gray-400`} />,
  };

  const rankLabels = {
    EXCELLENT: "Ótimo",
    GOOD: "Bom",
    AVERAGE: "Mediano",
    CRITICAL: "Crítico",
    NONE: "Nenhum",
  };

  if (popover && outline) {
    console.error(
      "O popover não pode usar a função outline (marque como false)"
    );
    return (
      <p className="text-red-500">
        O popover não pode usar a função outline (marque como false)
      </p>
    );
  }

  const translateRank = (rank: string) => {
    switch (rank) {
      case "EXCELLENT":
        return "Excelente";
      case "GOOD":
        return "Bom";
      case "AVERAGE":
        return "Mediano";
      case "CRITICAL":
        return "Crítico";
      case "NONE":
        return "Nenhum rank";
    }
  };

  if (variant === "council" || variant === "annotation") {
    if (popover) {
      return (
        <>
          <div className="inline-flex justify-center items-center gap-3">
            <span
              title={translateRank(selectedRank)}
              style={{
                borderColor: whiteColor,
                color: constrastColor,
                backgroundColor: secondaryGrayColor,
              }}
              className="cursor-pointer flex items-center gap-1 border-[2px] rounded-normal"
              onClick={handleClick}
            >
              {variant === "council" ? (rank[selectedRank] ? rank[selectedRank] : rank["NONE"]) : (rank[type] ? rank[type] : rank["NONE"])}
            </span>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <div
              className="p-4 flex flex-col space-y-2 z-40"
              style={{ backgroundColor: OpacityHex(secondaryColor, 0.2) }}
            >
              {(["EXCELLENT", "GOOD", "AVERAGE", "CRITICAL"] as const).map(
                (key) => (
                  <div
                    key={key}
                    className="rankHover flex items-center gap-2 p-2 rounded-lg cursor-pointer transition"
                    onClick={() => handleSelect(key)}
                  >
                    {rank[key]}{" "}
                    <span className="capitalize">{rankLabels[key]}</span>
                  </div>
                )
              )}
            </div>
          </Popover>
        </>
      );
    }

    return (
      <div title={translateRank(selectedRank)} style={{backgroundColor: whiteColor}} className="rounded-normal inline-flex items-center gap-2">{rank[selectedRank]}</div>
    );
  } else if (variant === "default") {
    if (popover) {
      return (
        <>
          <div className="inline-flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-3 w-full">
            <Typography
              variant="lg_text_bold"
              style={{ color: colorByModeSecondary }}
            >
              Rank:
            </Typography>
            <span
              title={translateRank(selectedRank)}
              style={{
                borderColor: colorByModeSecondary,
                color: constrastColor,
              }}
              className="cursor-pointer w-full flex justify-center p-1 sm:justify-start items-center gap-1 border-[2px] rounded-normal sm:w-[120px]"
              onClick={handleClick}
            >
              {rank[selectedRank]}
              <span title={translateRank(selectedRank)} className="capitalize">{rankLabels[selectedRank] ? rankLabels[selectedRank] : <span className="flex justify-center items-center">{rank["NONE"]}{rankLabels["NONE"]}</span>}</span>
            </span>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <div
              className="p-4 flex flex-col space-y-2 z-40"
              style={{ backgroundColor: OpacityHex(secondaryColor, 0.2) }}
            >
              {(["EXCELLENT", "GOOD", "AVERAGE", "CRITICAL"] as const).map(
                (key) => (
                  <div
                    key={key}
                    className="rankHover flex items-center gap-2 p-2 rounded-lg cursor-pointer transition"
                    onClick={() => handleSelectNormalRank(key)}
                  >
                    {rank[key]}{" "}
                    <span className="capitalize">{rankLabels[key]}</span>
                  </div>
                )
              )}
            </div>
          </Popover>
        </>
      );
    }

    return (
      <div className="inline-flex justify-center items-center gap-3">
        <span
          title={translateRank(selectedRank)}
          style={{
            borderColor: whiteColor,
            color: constrastColor,
            backgroundColor: secondaryGrayColor,
          }}
          className="flex items-center gap-1 border-[2px] rounded-normal"
        >
          {rank[selectedRank]}
        </span>
      </div>
    );
  }
}

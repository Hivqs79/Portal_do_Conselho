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
import OpacityHex from "@/hooks/OpacityHex";
import { RiSubtractFill } from "react-icons/ri";
import { Encryptor } from "@/encryption/Encryptor";

interface RankProps {
  variant?: "default" | "council";
  type: "excellent" | "good" | "average" | "critical" | "none";
  outline: boolean;
  popover: boolean;
  onRankChange?: (
    rank: "excellent" | "good" | "average" | "critical" | "none"
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
    newRank: "excellent" | "good" | "average" | "critical" | "none"
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
    newRank: "excellent" | "good" | "average" | "critical" | "none"
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
    excellent: <FaRegFaceLaugh className={`${className} text-[#549600]`} />,
    good: <FaRegFaceSmile className={`${className} text-[#7ABA28]`} />,
    average: <FaRegFaceMeh className={`${className} text-[#F3C91C]`} />,
    critical: <FaRegFaceFrown className={`${className} text-[#FE3535]`} />,
    none: <RiSubtractFill className={`${className} text-gray-400`} />,
  };

  const rankLabels = {
    excellent: "Ótimo",
    good: "Bom",
    average: "Mediano",
    critical: "Crítico",
    none: "Nenhum",
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

  if (variant === "council") {
    if (popover) {
      return (
        <>
          <div className="inline-flex justify-center items-center gap-3">
            <span
              style={{
                borderColor: whiteColor,
                color: constrastColor,
                backgroundColor: secondaryGrayColor,
              }}
              className="cursor-pointer flex items-center gap-1 border-[2px] rounded-normal"
              onClick={handleClick}
            >
              {rank[selectedRank]}
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
              {(["excellent", "good", "average", "critical"] as const).map(
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
      <div className="inline-flex items-center gap-2">{rank[selectedRank]}</div>
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
              style={{
                borderColor: colorByModeSecondary,
                color: constrastColor,
              }}
              className="cursor-pointer w-full flex justify-center p-1 sm:justify-start items-center gap-1 border-[2px] rounded-normal sm:w-[120px]"
              onClick={handleClick}
            >
              {rank[selectedRank]}
              <span className="capitalize">{rankLabels[selectedRank]}</span>
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
              {(["excellent", "good", "average", "critical"] as const).map(
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

"use client";
import { BrandColors } from "@/theme/BrandColors";
import {
  FaRegFaceFrown,
  FaRegFaceLaugh,
  FaRegFaceMeh,
  FaRegFaceSmile,
} from "react-icons/fa6";
import { Popover } from "@mui/material";
import { useState } from "react";

interface RankProps {
  type: "otimo" | "bom" | "mediano" | "critico";
  outline: boolean;
  popover: boolean;
}

export default function Rank({ type, outline, popover }: RankProps) {
  const primaryColor = BrandColors.primary_color;
  const terciaryColor = BrandColors.terciary_color;

  const [selectedRank, setSelectedRank] = useState(type);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newRank: "otimo" | "bom" | "mediano" | "critico") => {
    setSelectedRank(newRank);
    console.log(`Selecionado: ${newRank}`);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "rank-popover" : undefined;

  const className = `text-4xl p-1 ${
    outline ? "border-[2px] p-1 text-4xl rounded-normal" : ""
  }`;

  const rank = {
    otimo: (
      <FaRegFaceLaugh
        className={`${className} text-[#549600]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
    bom: (
      <FaRegFaceSmile
        className={`${className} text-[#7ABA28]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
    mediano: (
      <FaRegFaceMeh
        className={`${className} text-[#F3C91C]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
    critico: (
      <FaRegFaceFrown
        className={`${className} text-[#FE3535]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
  };

  if (popover) {
    return (
      <>
        <div
          className="inline-flex justify-center items-center gap-5 cursor-pointer"
          onClick={handleClick}
        >
          <span>Rank:</span>
          <span>{rank[selectedRank]}</span>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <div className="p-4 flex flex-col space-y-2">
            {Object.entries(rank).map(([key, icon]) => (
              <div
                key={key}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                onClick={() =>
                  handleSelect(key as "otimo" | "bom" | "mediano" | "critico")
                }
              >
                {icon} <span className="capitalize">{key}</span>
              </div>
            ))}
          </div>
        </Popover>
      </>
    );
  }

  return rank[selectedRank];
}

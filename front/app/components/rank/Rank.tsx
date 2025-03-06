"use client";
import {
  FaRegFaceFrown,
  FaRegFaceLaugh,
  FaRegFaceMeh,
  FaRegFaceSmile,
} from "react-icons/fa6";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";

interface RankProps {
  type: "otimo" | "bom" | "mediano" | "critico";
  outline: boolean;
  popover: boolean;
}

export default function Rank({ type, outline, popover }: RankProps) {
  const { primaryGrayColor, constrastColor } = useThemeContext();

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
            ? {
                // backgroundColor: secondaryGrayColor,
                borderColor: primaryGrayColor,
              }
            : {}
        }
      />
    ),
    bom: (
      <FaRegFaceSmile
        className={`${className} text-[#7ABA28]`}
        style={
          outline
            ? {
                // backgroundColor: secondaryGrayColor,
                borderColor: primaryGrayColor,
              }
            : {}
        }
      />
    ),
    mediano: (
      <FaRegFaceMeh
        className={`${className} text-[#F3C91C]`}
        style={
          outline
            ? {
                // backgroundColor: secondaryGrayColor,
                borderColor: primaryGrayColor,
              }
            : {}
        }
      />
    ),
    critico: (
      <FaRegFaceFrown
        className={`${className} text-[#FE3535]`}
        style={
          outline
            ? {
                // backgroundColor: secondaryGrayColor,
                borderColor: primaryGrayColor,
              }
            : {}
        }
      />
    ),
  };

  const rankLabels = {
    otimo: "Ótimo",
    bom: "Bom",
    mediano: "Mediano",
    critico: "Crítico",
  };

  if (popover && outline) {
    console.error("O popover não pode usar a função outline (marque como false)");
    return (
      <p className="text-red-500">
        O popover não pode usar a função outline (marque como false)
      </p>
    );
  }

  if (popover) {
    return (
      <>
        <div className="inline-flex justify-center items-center gap-3">
          <Typography variant="lg_text_bold" style={{ color: constrastColor }}>
            Rank:
          </Typography>
          <span
            style={{
              borderColor: primaryGrayColor,
              // backgroundColor: secondaryGrayColor,
              color: constrastColor,
            }}
            className="cursor-pointer flex items-center justify-start gap-1 border-[2px] rounded-normal w-[120px]"
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
          <div className="p-4 flex flex-col space-y-2">
            {Object.entries(rank).map(([key, icon]) => (
              <div
                key={key}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                onClick={() =>
                  handleSelect(key as "otimo" | "bom" | "mediano" | "critico")
                }
              >
                {icon}{" "}
                <span className="capitalize">
                  {rankLabels[key as keyof typeof rankLabels]}
                </span>
              </div>
            ))}
          </div>
        </Popover>
      </>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">{rank[selectedRank]}</div>
  );
}

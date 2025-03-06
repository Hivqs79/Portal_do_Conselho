"use client";

import { useState, useEffect } from "react";
import Rank from "../rank/Rank";
import { useThemeContext } from "@/hooks/useTheme";
import { Button, IconButton, Typography } from "@mui/material";
import Icon from "../Icon";
import { FaRegEye } from "react-icons/fa6";
import { TableRowProps } from "@/interfaces/TableRowProps";
import hexToRGBA from "@/hooks/hexToRGBA";

export default function TableRow({
  variant,
  user,
  rank,
  frequencia,
  className,
}: TableRowProps) {
  const [selectedRank, setSelectedRank] = useState(rank);
  const { backgroundColor, primaryColor, constrastColor } = useThemeContext();

  useEffect(() => {
    setSelectedRank(rank);
  }, [rank]);

  if (variant == "primary") {
    return (
      <div
        style={{
          backgroundColor: hexToRGBA(constrastColor, 0.01),
          borderColor: primaryColor,
        }}
        className={`${className} flex flex-row gap-4 justify-between items-center p-4 w-screen max-w-[100%]`}
      >
        <p style={{ color: constrastColor }}>Turma 1</p>
        <p style={{ color: constrastColor }} className="hidden md:block">
          00/00/0000
        </p>
        <p style={{ color: constrastColor }} className="hidden lg:block big:mr-6">
          00:00
        </p>
        <div className="flex justify-center items-center gap-4">
          <span className="hidden small:flex justify-center items-center">
            {selectedRank && (
              <Rank type={selectedRank} outline={true} popover={false} />
            )}
          </span>
          <span className="hidden extraSmall:block">
            <Button variant="contained" color="primary">
              <Icon IconPassed={FaRegEye} color="primary" />
            </Button>
          </span>
          <Button variant="contained" color="primary">
            <Typography variant="sm_text_bold" color="white">
              Realizar
            </Typography>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {variant}
      {user}
      {rank}
      {frequencia}
    </>
  );
}

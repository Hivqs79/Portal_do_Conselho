"use client";

import { useState, useEffect } from "react";
import Rank from "../rank/Rank";
import { useThemeContext } from "@/hooks/useTheme";
import { Button, IconButton, Typography } from "@mui/material";
import Icon from "../Icon";
import { FaRegEye } from "react-icons/fa6";
import { TableRowProps } from "@/interfaces/TableRowProps";
import hexToRGBA from "@/hooks/OpacityHex";
import { RiCalendarScheduleLine } from "react-icons/ri";

export default function TableRow({
  variant,
  user,
  rank,
  frequencia,
  turmaNome,
  className,
  horario,
  data,
}: TableRowProps) {
  const [selectedRank, setSelectedRank] = useState(rank);
  const { backgroundColor, primaryColor, constrastColor } = useThemeContext();

  useEffect(() => {
    setSelectedRank(rank);
  }, [rank]);

  if (variant == "primary") {
    return (
      <>
        <tr
          style={{
            backgroundColor: hexToRGBA(constrastColor, 0.01),
            borderColor: primaryColor,
          }}
          className={`${className} max-w-[1024px] flex flex-row justify-between items-center p-3 w-[100%]`}
        >
          <td style={{ color: constrastColor }} className="md:w-[250px]">
            {turmaNome}
          </td>
          <td
            style={{ color: constrastColor }}
            className="hidden w-[100px] md:flex justify-center"
          >
            <span className="">{data}</span>
          </td>
          <td
            style={{ color: constrastColor }}
            className="hidden w-[100px] lg:flex justify-center"
          >
            <span className="hidden lg:block">{horario}</span>
          </td>
          <td className="flex justify-end items-center w-auto md:w-[300px] gap-4 md:justify-end">
            <span className="hidden small:flex justify-center items-center">
              {selectedRank && (
                <Rank type={selectedRank} outline={true} popover={false} />
              )}
            </span>
            <span className="extraSmall:block">
              <Button variant="contained" color="primary">
                <Icon IconPassed={FaRegEye} color="primary" />
              </Button>
            </span>
            <span className="extraSmall:hidden">
              <Button variant="contained" color="primary">
                <Icon IconPassed={RiCalendarScheduleLine} color="primary" />
              </Button>
            </span>
            <span className="hidden extraSmall:block">
              <Button variant="contained" color="primary">
                <Typography variant="sm_text_bold" color="white">
                  Realizar
                </Typography>
              </Button>
            </span>
          </td>
        </tr>
      </>
    );
  }

  return null;
}

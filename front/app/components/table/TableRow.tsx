"use client";

import { useState, useEffect } from "react";
import Rank from "../rank/Rank";
import { useThemeContext } from "@/hooks/useTheme";
import { Button, Typography } from "@mui/material";
import Icon from "../Icon";
import { FaRegEye } from "react-icons/fa6";
import { TableRowContent } from "@/interfaces/TableRowContent";
import hexToRGBA from "@/hooks/hexToRGBA";
import { PiPlayBold } from "react-icons/pi";
import { LuPencilLine } from "react-icons/lu";

interface TableRowProps {
  content: TableRowContent;
  rank?: boolean;
  realizeButton?: boolean;
  visualizeIconButton?: boolean;
  visualizeButton?: boolean;
  editButton?: boolean;
}

export default function TableRow({  
  content,
  rank = false,
  realizeButton = false,
  visualizeIconButton = false,
  visualizeButton = false,
  editButton = false
}: TableRowProps) {
  const [selectedRank, setSelectedRank] = useState(content.rank);
  const { primaryColor, constrastColor, whiteColor,backgroundColor } = useThemeContext();

  useEffect(() => {
    setSelectedRank(content.rank);
  }, [content.rank]);

  
  return (
    <>
      <tr
          style={{
              backgroundColor: backgroundColor,
              borderColor: primaryColor,
          }}
          className={`${content.className} flex rounded-b-big justify-between items-center p-3 w-full`}
      >
          <td style={{ color: constrastColor }} className="flex-1">
              <span>{content.turmaNome}</span>
          </td>
          <td style={{ color: constrastColor }} className="hidden md:flex-1 md:flex text-center lg:justify-center">
              <span>{content.data}</span>
          </td>
          {content.horario && (
            <td style={{ color: constrastColor }} className="hidden lg:flex-1 lg:flex text-center justify-center">
                <span>{content.horario}</span>
            </td>            
          )}
          <td className="flex justify-end items-center w-1/3 gap-2 sm:gap-4">
            {rank && (
              <span className="hidden sm:flex justify-center items-center">
                  {selectedRank && <Rank type={selectedRank} outline={true} popover={false} />}
              </span>              
            )}
            
            {visualizeIconButton && (
              <Icon IconPassed={FaRegEye} color={whiteColor} isButton={true} colorButton={primaryColor} />              
            )}

            {visualizeButton && (
              <>
                <Button variant="contained" color="primary" className="!hidden sm:!flex">
                    <Typography variant="sm_text_bold" color="white">
                        Visualizar
                    </Typography>
                    <Icon IconPassed={FaRegEye} color={whiteColor} className="!ml-2 !w-6 !h-6"/>
                </Button>
                <Icon IconPassed={FaRegEye } color={whiteColor} isButton={true} colorButton={primaryColor} classNameButton={"!block sm:!hidden"} />
              </>
            )}
            
            {realizeButton && (
              <>
                <Icon IconPassed={PiPlayBold } color={whiteColor} isButton={true} colorButton={primaryColor} classNameButton={"!block small:!hidden"} />
                            
                <span className="hidden small:block">
                    <Button variant="contained" color="primary">
                        <Typography variant="sm_text_bold" color="white">
                            Realizar
                        </Typography>
                    </Button>
                </span>
              </>
            )}

            {editButton && (
              <>
                <Button variant="contained" color="primary" className="!hidden sm:!flex">
                    <Typography variant="sm_text_bold" color="white">
                        Editar
                    </Typography>
                    <Icon IconPassed={LuPencilLine} color={whiteColor} className="!ml-2 !w-6 !h-6"/>
                </Button>
                <Icon IconPassed={LuPencilLine} color={whiteColor} isButton={true} colorButton={primaryColor} classNameButton="!block sm:!hidden"/>
              </>
            )}
          </td>
      </tr>
    </>
  );
}

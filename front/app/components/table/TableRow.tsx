"use client";

import { useState, useEffect } from "react";
import Rank from "../rank/Rank";
import { useThemeContext } from "@/hooks/useTheme";
import { FaRegEye } from "react-icons/fa6";
import { TableRowContent } from "@/interfaces/TableRowContent";
import TableCouncilRow from "@/interfaces/TableCouncilRow";
import { PiPlayBold } from "react-icons/pi";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import TableButton from "./TableButton";
import { IoClose } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import OpacityHex from "@/utils/OpacityHex";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { TableRowButtons } from "@/interfaces/TableRowButtons";

interface TableRowProps {
  content: TableCouncilRow;
  rowButtons: TableRowButtons;
}

export default function TableRow({  
  content,
  rowButtons,
}: TableRowProps) {
  // const [selectedRank, setSelectedRank] = useState((content as TableCouncilRow).rank && (content as TableCouncilRow).rank);
  const { primaryColor, constrastColor, backgroundColor } = useThemeContext();
  const {rank,
    realizeButton,
    onClickRealize,
    visualizeIconButton,
    visualizeButton,
    onClickVisualize,
    editButton,
    deleteButton,
    seeButton,
    anotationButton,
    closeButton,
    releasedButton,
    releaseButton,
  } = rowButtons;

  // useEffect(() => {
  //   setSelectedRank(content.rank);
  // }, [content.rank]);
  
  return (
    <>
      <tr
          style={{
            backgroundColor: OpacityHex(constrastColor, 0.01),
            borderColor: primaryColor,
          }}
          className={`${content.className} flex rounded-b-big justify-between items-center p-3 w-full`}
      >
        {(content as TableCouncilRow).aclass.name && (          
          <td style={{ color: constrastColor }} className="flex-1">
              <Typography variant="lg_text_regular">{(content as TableCouncilRow).aclass.name}</Typography>
          </td>
        )}
        {(content as TableCouncilRow).startDateTime && (              
          <td style={{ color: constrastColor }} className="hidden md:flex-1 md:flex text-center lg:justify-center">
              <Typography variant="lg_text_regular">{dayjs((content as TableCouncilRow).startDateTime).format("DD/MM/YYYY")}</Typography>
          </td>
        )}
        {(content as TableCouncilRow).startDateTime && (
          <td style={{ color: constrastColor }} className="hidden lg:flex-1 lg:flex text-center justify-center">
              <Typography variant="lg_text_regular">{dayjs((content as TableCouncilRow).startDateTime).format("HH:mm")}</Typography>
          </td>            
        )}

          <td className="flex justify-end items-center w-2/5 lg:w-1/3 gap-2 sm:gap-4">
            {/* {rank && (
              <span className="hidden md:flex justify-center items-center">
                  {selectedRank && <Rank type={selectedRank} outline={true} popover={false} />}
              </span>              
            )}                         */}

            {(visualizeButton || seeButton || visualizeIconButton) && <TableButton onClick={() => onClickVisualize && onClickVisualize(content)} text={(seeButton ? "Olhar" : "Visualizar")} onlyIcon={visualizeIconButton} icon={FaRegEye}/>}
            
            {realizeButton && <TableButton text="Realizar" onlyTextInBigSize={true} icon={PiPlayBold}onClick={() => onClickRealize && onClickRealize(content)} />}

            {(editButton || anotationButton) && <TableButton text={anotationButton ? "Anotar" : "Editar"} icon={LuPencilLine} />}

            {(releasedButton || releaseButton) && <TableButton text={releasedButton ? "Liberado" : "Liberar"} icon={FaRegClock}/>}

            {closeButton && <TableButton text="Fechar" icon={IoClose}/>}

            {deleteButton && <TableButton text="Excluir" icon={LuTrash}/>}
          </td>
      </tr>
    </>
  );
}

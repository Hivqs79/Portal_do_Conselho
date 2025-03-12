"use client";

import { useState, useEffect } from "react";
import Rank from "../rank/Rank";
import { useThemeContext } from "@/hooks/useTheme";
import { FaRegEye } from "react-icons/fa6";
import { TableRowContent } from "@/interfaces/TableRowContent";
import { PiPlayBold } from "react-icons/pi";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import TableButton from "./TableButton";
import { IoClose } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

interface TableRowProps {
  content: TableRowContent;
  rowButtons: TableRowButtons;
}

export default function TableRow({  
  content,
  rowButtons,
}: TableRowProps) {
  const [selectedRank, setSelectedRank] = useState(content.rank);
  const { primaryColor, constrastColor, backgroundColor } = useThemeContext();
  const {rank,
    realizeButton,
    visualizeIconButton,
    visualizeButton,
    editButton,
    deleteButton,
    seeButton,
    anotationButton,
    closeButton,
    releasedButton,
    releaseButton
  } = rowButtons;

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
          {content.data && (
            <td style={{ color: constrastColor }} className="hidden md:flex-1 md:flex text-center lg:justify-center">
                <span>{content.data}</span>
            </td>
          )}
          {content.horario && (
            <td style={{ color: constrastColor }} className="hidden lg:flex-1 lg:flex text-center justify-center">
                <span>{content.horario}</span>
            </td>            
          )}

          <td className="flex justify-end items-center w-2/5 lg:w-1/3 gap-2 sm:gap-4">
            {rank && (
              <span className="hidden md:flex justify-center items-center">
                  {selectedRank && <Rank type={selectedRank} outline={true} popover={false} />}
              </span>              
            )}                        

            {(visualizeButton || seeButton || visualizeIconButton) && <TableButton text={(seeButton ? "Olhar" : "Visualizar")} onlyIcon={visualizeIconButton} icon={FaRegEye}/>}
            
            {realizeButton && <TableButton text="Realizar" onlyTextInBigSize={true} icon={PiPlayBold} />}

            {(editButton || anotationButton) && <TableButton text={anotationButton ? "Anotar" : "Editar"} icon={LuPencilLine} />}

            {(releasedButton || releaseButton) && <TableButton text={releasedButton ? "Liberado" : "Liberar"} icon={FaRegClock}/>}

            {closeButton && <TableButton text="Fechar" icon={IoClose}/>}

            {deleteButton && <TableButton text="Excluir" icon={LuTrash}/>}
          </td>
      </tr>
    </>
  );
}

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

import Rank from "../rank/Rank";
import { useThemeContext } from "@/hooks/useTheme";
import { FaRegEye } from "react-icons/fa6";
import { PiPlayBold } from "react-icons/pi";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import TableButton from "./TableButton";
import { IoClose } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import OpacityHex from "@/utils/OpacityHex";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import TableCouncilRow from "@/interfaces/table/row/TableCouncilRow";
import relativeTime from "dayjs/plugin/relativeTime";
import TablePreCouncilRow from "@/interfaces/table/row/TablePreCouncilRow";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface TableRowProps {
  content: TableRowPossibleTypes;
  rowButtons: TableRowButtons;
}

export default function TableRow({ content, rowButtons }: TableRowProps) {
  const { constrastColor, colorByModeSecondary } = useThemeContext();
  const {
    rankButton,
    rankVisualizer,
    realizeButton,
    onClickRealize,
    visualizeIconButton,
    visualizeButton,
    onClickVisualize,
    editButton,
    onClickEdit,
    deleteButton,
    onClickDelete,
    seeButton,
    inicializeButton,
    onClickInicialize,
    annotationButton,
    onClickAnnotation,
    closeButton,
    releasedButton,
    releaseButton,
    preCouncilButton,
    onClickRelease
  } = rowButtons;

  let date =
    "startDateTime" in content
      ? content.startDateTime
      : "council" in content
        ? content.council.startDateTime
        : "preCouncil" in content
          ? content.preCouncil.startDateTime
          : null;

  const finalDate =
    "finalDateTime" in content
      ? content.finalDateTime
      : null;

  function getStudentNameAndRemoveDate() {
    date = null;
    if (!("student" in content)) return "";
    return content.student.name;
  }

  let name = "";
  if ("council" in content && content.council?.aclass) {
    name = content.council.aclass.name;
  } else if (
    "student" in content &&
    content.student &&
    typeof content.student === "object" &&
    "name" in content.student
  ) {
    date = null;
    name = content.student.name as string;
  }  else if (
    "aclass" in content &&
    content.aclass &&
    typeof content.aclass === "object" &&
    "name" in content.aclass
  ) {
    name = content.aclass.name || ("name" in content ? content.name : "");
  } else if (
    "preCouncil" in content &&
    content.preCouncil &&
    typeof content.preCouncil === "object" &&
    "aclass" in content.preCouncil
  ) {
    name = content.preCouncil.aclass.name;
  } else if ("name" in content) {
    name = content.name;
  }

  const funcao = "userAuthentication" in content ? content.userAuthentication.role : "";

  const rank = "rank" in content && content.rank;

  const transformRole = (role: string) => {
    switch (role) {
      case "STUDENT":
        return "Aluno";
      case "TEACHER":
        return "Professor";
      case "SUPERVISOR":
        return "Supervisor";
      case "PEDAGOGIC":
        return "Pedagógico";
      case "SUBPEDAGOGIC":
        return "Subpedagógico";
      case "ADMIN":
        return "Administrador";
      default:
        return role;
    }
  };

  return (
    <>
      <tr
        style={{
          backgroundColor: OpacityHex(constrastColor, 0.01),
          borderColor: colorByModeSecondary,
        }}
        className={`${content.className} flex rounded-b-big justify-between items-center p-3 w-full`}
      >
        <td style={{ color: constrastColor }} className="flex-1">
          <Typography variant="lg_text_regular">{name}</Typography>
        </td>
        {funcao && (
          <td
            style={{ color: constrastColor }}
            className="hidden md:flex-1 md:flex text-center lg:justify-center"
          >
            <Typography variant="lg_text_regular">
              {transformRole(funcao)}
            </Typography>
          </td>
        )}
        {date && (
          <td
            style={{ color: constrastColor }}
            className="hidden md:flex-1 md:flex text-center lg:justify-center"
          >
            <Typography variant="lg_text_regular">
              {dayjs(date).format("DD/MM/YYYY")}
            </Typography>
          </td>
        )}
        {date && (
          <td
            style={{ color: constrastColor }}
            className="hidden lg:flex-1 lg:flex text-center justify-center"
          >
            <Typography variant="lg_text_regular">
              {finalDate ? dayjs(finalDate).format("DD/MM/YYYY") : dayjs(date).format("HH:mm")}
            </Typography>
          </td>
        )}

        <td className="flex justify-end items-center w-2/5 lg:w-1/3 gap-2 sm:gap-4">
          {rankButton ||
            (rankVisualizer && (
              <span className="hidden md:flex justify-center items-center">
                {rank && (
                  <Rank
                    variant="annotation"
                    type={rank}
                    outline={rankButton ? false : true}
                    popover={rankButton ? true : false}
                  />
                )}
              </span>
            ))}
          {(visualizeButton || seeButton || visualizeIconButton) && (
            <TableButton
              onClick={() => onClickVisualize && onClickVisualize(content)}
              text={seeButton ? "Olhar" : "Visualizar"}
              onlyIcon={visualizeIconButton}
              icon={FaRegEye}
            />
          )}
          {realizeButton && (
            <TableButton
              text={(content as TableCouncilRow).buttonText || "Realizar"}
              onlyTextInBigSize={true}
              icon={PiPlayBold}
              onClick={() => onClickRealize?.(content)}
              disabled={(content as TableCouncilRow).isDisabled ?? false}
              tooltip={
                (content as TableCouncilRow).status === "expired"
                  ? "Este conselho expirou. Edite para um novo horário."
                  : (content as TableCouncilRow).status === "scheduled"
                    ? `Disponível ${dayjs(
                      (content as TableCouncilRow).startDateTime
                    ).fromNow()}`
                    : "Clique para realizar este conselho"
              }
            />
          )}
          {(editButton || annotationButton) && (
            <TableButton
              text={annotationButton ? "Anotar" : "Editar"}
              icon={LuPencilLine}
              onClick={() => onClickAnnotation && onClickAnnotation(content) || onClickEdit && onClickEdit(content)}
            />
          )}
          {(releasedButton || releaseButton) && (
            <TableButton
              text={releasedButton ? "Liberado" : "Liberar"}
              icon={FaRegClock}
              onClick={() =>
                releaseButton && onClickRelease && onClickRelease(content)
              }
            />
          )}
          {preCouncilButton && (
            <span className="!hidden sm:!flex">
              <TableButton
                text={(content as TablePreCouncilRow).buttonText}
                disabled={true}
                onlyTextInBigSize={true}
                tooltip={
                  (content as TablePreCouncilRow).status === "answered"
                    ? "Este pré-conselho já foi respondido"
                    : (content as TablePreCouncilRow).status === "not-answered"
                      ? "Este pré-conselho não foi respondido"
                      : (content as TablePreCouncilRow).status === "released"
                        ? "Este pré-conselho foi liberado"
                        : `Será liberado ${dayjs(
                          (content as TablePreCouncilRow).startDateTime
                        ).fromNow()}`
                }
              />
            </span>
          )}
          {inicializeButton && (
            <TableButton
              text={"Iniciar"}
              onClick={() => onClickInicialize && onClickInicialize(content)}
            />
          )}
          {closeButton && <TableButton text="Fechar" icon={IoClose} />}
          {deleteButton && <TableButton text="Excluir" onClick={() => onClickDelete && onClickDelete(content)} icon={LuTrash} />}
        </td>
      </tr>
    </>
  );
}

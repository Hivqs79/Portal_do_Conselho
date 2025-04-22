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
    deleteButton,
    seeButton,
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

  const name =
    "council" in content && ("student" in content ? content.student == null : true)
      ? content.council.aclass && content.council.aclass.name
        ? content.council.aclass.name
        : ""
      : "student" in content
        ? getStudentNameAndRemoveDate()
        : "aclass" in content
          ? content.aclass.name
          : "preCouncil" in content
            ? content.preCouncil.aclass.name
            : "";

  const rank = "rank" in content && content.rank;

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
              onClick={() => onClickAnnotation && onClickAnnotation(content)}
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
          {closeButton && <TableButton text="Fechar" icon={IoClose} />}
          {deleteButton && <TableButton text="Excluir" icon={LuTrash} />}
        </td>
      </tr>
    </>
  );
}

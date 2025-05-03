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
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Modal, Typography } from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import { Teacher } from "@/interfaces/users/Teacher";
import { SiGoogleclassroom } from "react-icons/si";
import Class from "@/interfaces/Class";
import { LuPencilLine } from "react-icons/lu";
import CouncilForm from "@/components/council/CouncilForm";
import { CouncilFormProps } from "@/interfaces/council/CouncilFormProps";
import { isArray } from "util";
import { useState } from "react";
import ConfirmChanges from "../modals/ConfirmChanges";
import OpacityHex from "@/utils/OpacityHex";

interface CouncilModalProps {
  open: boolean;
  close: () => void;
  confirmFunction?: () => void;
  verifyForm?: () => boolean;
  setEditing?: (value: boolean) => void;
  editing?: boolean;
  variant: string;
  councilInformation: CouncilFormProps;
  type: "council" | "pre-council";
  awaitingAnswer?: boolean
}

export default function CouncilModal({
  open,
  close,
  confirmFunction,
  verifyForm,
  setEditing,
  editing,
  variant,
  councilInformation,
  type,
  awaitingAnswer
}: CouncilModalProps) {
  const {
    primaryColor,
    terciaryColor,
    colorByMode,
    colorByModeSecondary,
    backgroundColor,
    redDanger,
    whiteColor,
    textBlackColor,
    getThemeMode
  } = useThemeContext();

  const date = councilInformation.visualizedCouncil
    ? dayjs(councilInformation.visualizedCouncil.startDateTime)
    : councilInformation.date;
  const time = councilInformation.visualizedCouncil
    ? dayjs(councilInformation.visualizedCouncil.startDateTime)
    : councilInformation.time;

  const finalDate = councilInformation.visualizedCouncil
    ? "finalDateTime" in councilInformation.visualizedCouncil ?
      dayjs(councilInformation.visualizedCouncil.finalDateTime)
      : null
    : councilInformation.finalDate;

  const teachers = councilInformation.visualizedCouncil
    ? (councilInformation.visualizedCouncil.teachers as Teacher[])
    : isArray(councilInformation.teachers) &&
    councilInformation.teachers.filter(
      (t) => councilInformation.selectedTeachers[t.id]
    );
  const classSelected = councilInformation.visualizedCouncil
    ? (councilInformation.visualizedCouncil.aclass as Class)
    : (councilInformation.classExistents.find(
      (c) => c.id === councilInformation.selectedClass
    ) as Class);
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
        if (setEditing) {
          setEditing(false);
        }
      }}
      className="flex items-center justify-center"
    >
      <Box
        className="py-2 px-4 z-50 mx-16 max-w-[800px] rounded-big mt-24"
        style={{ backgroundColor: backgroundColor }}
      >
        <Box className="flex flex-col w-full max-h-[80vh] overflow-y-auto p-6  gap-10">
          <Box className="flex items-center flex-row w-full">
            <Box className="flex flex-col w-full mr-4">
              <Typography variant="xl_text_bold" color={colorByModeSecondary}>
                {variant === "confirm" ? "Confirmar " : "Detalhes do "}{type === "pre-council" ? "pré-" : ""}conselho
              </Typography>
              {variant === "confirm" && (
                <Typography variant="md_text_regular">
                  Confirme as informações abaixo sobre o {type === "pre-council" ? "pré-" : ""}conselho que será
                  adicionado
                </Typography>
              )}
            </Box>
            <Box className="flex w-fit h-fit gap-1">
              {(variant !== "confirm" && !editing && (awaitingAnswer !== undefined ? !awaitingAnswer : true)) && (
                <Icon
                  IconPassed={LuPencilLine}
                  colorButton={getThemeMode() === "light" ? terciaryColor : OpacityHex(primaryColor, 0.5)}
                  className="size-10"
                  classNameButton="!p-1 !max-w-[36px]"
                  color={getThemeMode() === "light" ? primaryColor : terciaryColor}
                  isButton={true}
                  onClick={() => setEditing && setEditing(true)}
                />
              )}
              <Box
                onClick={() => {
                  close();
                  if (setEditing) {
                    setEditing(false);
                  }
                }}
              >
                <Icon
                  IconPassed={IoClose}
                  color={redDanger}
                  className="size-10"
                />
              </Box>
            </Box>
          </Box>
          {editing && councilInformation ? (
            <CouncilForm
              councilInformation={councilInformation}
              verifyForm={verifyForm}
              variant="editing"
              type={type}
            />
          ) : (
            <>
              {awaitingAnswer &&
                <Typography variant="lg_text_regular" color={redDanger}>
                  O pré-conselho está dentro do período para resposta, aguarde até o prazo final para visualizar as respostas.
                </Typography>
              }
              <Box className="flex flex-col md:flex-row gap-8">
                <Box className="flex flex-col w-full gap-4">
                  <Typography
                    color={colorByModeSecondary}
                    variant="xl_text_bold"
                  >
                    Data {type === "pre-council" ? "de início" : "do conselho"}
                  </Typography>
                  <DatePicker
                    label={`Data ${type === "pre-council" ? "de início" : "do conselho"}`}
                    disabled
                    value={date}
                    slotProps={{
                      openPickerIcon: {
                        style: { color: colorByMode },
                        component: FaRegCalendarAlt,
                      },
                    }}
                  />
                </Box>
                <Box className="flex flex-col w-full gap-4">
                  <Typography
                    color={colorByModeSecondary}
                    variant="xl_text_bold"
                  >
                    {type === "pre-council" ? "Data final" : "Horário do conselho"}
                  </Typography>
                  {type === "council" ?
                    <TimePicker
                      label="Horário do conselho"
                      disabled
                      value={time}
                      slotProps={{
                        openPickerIcon: {
                          style: { color: colorByMode },
                          component: FaRegClock,
                        },
                      }}
                    />
                    : <DatePicker
                      label="Data final"
                      disabled
                      value={finalDate}
                      slotProps={{
                        openPickerIcon: {
                          style: { color: colorByMode },
                          component: FaRegCalendarAlt,
                        },
                      }}
                    />}
                </Box>
              </Box>
              <Box className="flex flex-col md:flex-row gap-8">
                <Box className="w-full">
                  <Typography
                    color={colorByModeSecondary}
                    variant="xl_text_bold"
                  >
                    Professores
                  </Typography>
                  <Box
                    style={{ backgroundColor: primaryColor }}
                    className="p-4 mt-4 rounded-lg"
                  >
                    <Box
                      className="flex flex-col gap-4 w-full max-h-48 overflow-y-auto"
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: primaryColor,
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: whiteColor,
                          borderRadius: "4px",
                        },
                      }}
                    >
                      {teachers &&
                        teachers.length !== 0 &&
                        isArray(teachers) ? (
                        teachers.map((teacher, index) => (
                          <Typography
                            key={teacher.id}
                            color={whiteColor}
                            variant="md_text_regular"
                          >
                            {index + 1} - {teacher.name}
                          </Typography>
                        ))
                      ) : (
                        <Typography
                          color={whiteColor}
                          variant="md_text_regular"
                        >
                          Nenhum professor selecionado
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className="w-full">
                  <Typography
                    color={colorByModeSecondary}
                    variant="xl_text_bold"
                  >
                    Turma
                  </Typography>
                  <Box
                    style={{ backgroundColor: primaryColor }}
                    className="flex flex-row w-full gap-4 rounded-lg p-4 mt-4"
                  >
                    <Icon IconPassed={SiGoogleclassroom} color={whiteColor} />
                    <Typography color={whiteColor} variant="md_text_regular">
                      {classSelected
                        ? classSelected.name
                        : "Nenhuma turma selecionada"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {(variant === "confirm" || editing) && (
            <Box className="w-full">
              <Box className="flex flex-row gap-8 justify-between">
                <Button
                  variant="contained"
                  onClick={() => {
                    if (setEditing) {
                      setEditing(false);
                    }
                  }}
                  className="h-fit w-full"
                  color="terciary"
                >
                  <Typography
                    style={{ color: textBlackColor }}
                    variant="md_text_bold"
                  >
                    Cancelar
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (editing) {
                      if (verifyForm && verifyForm()) {
                        setOpenConfirm(true);
                      }
                      return;
                    }
                    setOpenConfirm(true);
                  }}
                  className="h-fit w-full"
                  color="primary"
                >
                  <Typography
                    variant="md_text_bold"
                    style={{ color: whiteColor }}
                  >
                    {editing ? "Salvar" : "Criar"}
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
          {openConfirm && (
            <ConfirmChanges
              type="default"
              title={`Tem certeza que deseja ${editing ? "editar" : "criar"
                } esse ${type === "pre-council" ? "pré-" : ""}conselho?`}
              description={`Ao confirmar, este ${type === "pre-council" ? "pré-" : ""}conselho ${editing
                ? "será atualizado"
                : `irá para a lista de ${type === "pre-council" ? "pré-conselhos criados" : "conselhos para realizar"}`
                }, mas não se preocupe, você poderá editá-lo ${editing ? "novamente" : ""
                } a qualquer momento.`}
              confirmButtonText={`${editing ? "Editar" : "Criar"} ${type === "pre-council" ? "pré-" : ""}conselho`}
              onClose={() => setOpenConfirm(false)}
              firstConfirmButton={() => {
                setOpenConfirm(false);
                close();
                confirmFunction?.();
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

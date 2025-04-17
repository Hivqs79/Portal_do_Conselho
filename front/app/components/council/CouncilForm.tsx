"use client";
import { Box, Button, Icon, Typography } from "@mui/material";
import SelectTable from "../table/SelectTable";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useThemeContext } from "@/hooks/useTheme";
import { TimePicker } from "@mui/x-date-pickers";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import { useWindowWidth } from "@react-hook/window-size";
import CouncilModal from "@/components/council/CouncilModal";
import { CouncilFormProps } from "@/interfaces/CouncilFormProps";

interface CreateCouncilFormProps {
  councilInformation: CouncilFormProps;
  verifyForm?: () => boolean;
  variant: string;
  type: "council" | "pre-council";
}

export default function CouncilForm({
  councilInformation,
  verifyForm,
  variant,
  type
}: CreateCouncilFormProps) {
  const { colorByMode, colorByModeSecondary, whiteColor } = useThemeContext();
  const windowWidth = useWindowWidth();
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    visualizedCouncil,
    selectedTeachers,
    selectedClass,
    setSelectedTeachers,
    setSelectedClass,
    teachers,
    classExistents,
    setDate,
    setTime,
    setFinalDate,
    date,
    time,
    finalDate,
    setSearchTeachers,
    setSearchClass,
    submitForm,
  } = councilInformation;

  const setSelectedTeachersCallback = useCallback(() => {
    if (variant === "editing" && visualizedCouncil) {                 
      setSelectedTeachers(Object.fromEntries(visualizedCouncil.teachers.map(t => [t.id, true])));
    }
  }, [variant, visualizedCouncil, setSelectedTeachers]);

  useEffect(() => {
    setSelectedTeachersCallback();
  }, [setSelectedTeachersCallback]);

  return (
    <Box
      style={{ borderColor: colorByModeSecondary }}
      className="outline-component flex flex-col rounded-big sm:p-8 gap-8 sm:border-[2px]"
    >
      <Box className="flex flex-col md:flex-row w-full justify-between gap-8">
        <Box className="flex flex-col w-full gap-4">
          <Typography color={colorByModeSecondary} variant="xl_text_bold">
            Data {type === "pre-council" ? "de início": "do conselho"}
          </Typography>
          <DatePicker
            label={`Data ${type === "pre-council" ? "de início": "do conselho"}`}
            minDate={dayjs()}
            value={date}
            onChange={(e) => e && setDate(e)}
            slots={{
              openPickerIcon: Icon,
            }}
            slotProps={{
              openPickerIcon: {
                style: { color: colorByMode },
                component: FaRegCalendarAlt,
              },
            }}
          />
        </Box>
        <div
          style={{ backgroundColor: colorByModeSecondary }}
          className="hidden md:block w-[2px]"
        />
        <Box className="flex flex-col w-full gap-4">
          <Typography color={colorByModeSecondary} variant="xl_text_bold">
            {setTime ? "Horário do conselho" : "Data final"}
          </Typography>
          {setTime ? (
            <TimePicker
              label="Horário do conselho"
              onChange={(e) => e && setTime(e)}
              value={time}
              slots={{
                openPickerIcon: Icon,
              }}
              slotProps={{
                openPickerIcon: {
                  style: { color: colorByMode },
                  component: FaRegClock,
                },
              }}
            />
          ) : (
            setFinalDate && (
              <DatePicker
                label="Data final"
                minDate={dayjs()}
                value={finalDate}
                onChange={(e) => e && setFinalDate(e)}
                slots={{
                  openPickerIcon: Icon,
                }}
                slotProps={{
                  openPickerIcon: {
                    style: { color: colorByMode },
                    component: FaRegCalendarAlt,
                  },
                }}
              />
            )
          )}
        </Box>
      </Box>
      <Box className="flex flex-col gap-12">
        {variant === "create" && (
          <Box className="flex flex-col gap-4">
            <Typography color={colorByModeSecondary} variant="xl_text_bold">
              Turma
            </Typography>
            <SelectTable
              value={selectedClass}
              setRadioSelectedItem={(classId) => {
                setSelectedClass(classId);
                setSelectedTeachers({});
              }}
              name="Lista de Turmas"
              rows={classExistents}
              selectType="single"
              setSearch={setSearchClass}
            />
          </Box>
        )}
        <Box className="flex flex-col gap-4">
          <Typography color={colorByModeSecondary} variant="xl_text_bold">
            Professores
          </Typography>
          <SelectTable
            value={selectedTeachers}
            setSelectedItems={setSelectedTeachers}
            name="Lista de professores"
            rows={teachers}
            selectType="multiple"
            setSearch={setSearchTeachers}
          />
        </Box>

        {variant === "create" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (verifyForm && verifyForm()) {
                setOpenConfirm(true);
              }
            }}
          >
            <Typography
              variant={
                windowWidth < 640 ? "md_text_regular" : "xl_text_regular"
              }
              color={whiteColor}
            >
              Salvar e revisar o {type === "pre-council" ? "pré-": ""}conselho
            </Typography>
          </Button>
        )}
      </Box>
      <CouncilModal
        open={openConfirm}
        close={() => setOpenConfirm(false)}
        councilInformation={councilInformation}
        confirmFunction={submitForm}
        variant="confirm"
        type={type}
      />
    </Box>
  );
}

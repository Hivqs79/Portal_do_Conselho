import {
  Box,
  Button,
  Icon,
  Typography,
} from "@mui/material";
import SelectTable from "../table/SelectTable";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useThemeContext } from "@/hooks/useTheme";
import { TimePicker } from "@mui/x-date-pickers";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import { useWindowWidth } from "@react-hook/window-size";
import ConfirmCouncilModal from "./CouncilModal";
import { CouncilForm } from "@/interfaces/CouncilForm";

interface CreateCouncilFormProps {
  concilInformation: CouncilForm;
}

export default function CreateCouncilForm({
  concilInformation
}: CreateCouncilFormProps) {
  const { primaryColor, colorByMode, whiteColor } = useThemeContext();
  const windowWidth = useWindowWidth();
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    selectedTeachers,
    selectedClass,
    setSelectedTeachers,
    setSelectedClass,
    teachers,
    classExistents,
    setDate,
    setTime,
    date,
    time,
    setSearchTeachers,
    setSearchClass,
    submitForm,
  } = concilInformation;

  return (
    <Box
      style={{ borderColor: primaryColor }}
      className="outline-component flex flex-col rounded-big sm:p-8 gap-8 sm:border-[2px]"
    >
      <Box className="flex flex-col md:flex-row w-full justify-between gap-8">
        <Box className="flex flex-col w-full gap-4">
          <Typography color={colorByMode} variant="xl_text_bold">
            Data do conselho
          </Typography>
          <DatePicker
            label="Data do conselho"
            minDate={dayjs().add(1, "day")}
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
          style={{ backgroundColor: primaryColor }}
          className="hidden md:block w-[2px]"
        />
        <Box className="flex flex-col w-full gap-4">
          <Typography color={colorByMode} variant="xl_text_bold">
            Horário do conselho
          </Typography>
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
        </Box>
      </Box>
      <Box className="flex flex-col gap-12">
        <Box className="flex flex-col gap-4">
          <Typography color={colorByMode} variant="xl_text_bold">
            Turma
          </Typography>
          <SelectTable
            value={selectedClass}
            setRadioSelectedItem={setSelectedClass}
            name="Lista de Turmas"
            rows={classExistents}
            selectType="single"
            setSearch={setSearchClass}
          />
        </Box>
        <Box className="flex flex-col gap-4">
          <Typography color={colorByMode} variant="xl_text_bold">
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenConfirm(true)}
        >
          <Typography
            variant={windowWidth < 640 ? "md_text_regular" : "xl_text_regular"}
            color={whiteColor}
          >
            Salvar e revisar o conselho
          </Typography>
        </Button>
      </Box>
      <ConfirmCouncilModal
        open={openConfirm}
        close={() => setOpenConfirm(false)}
        date={date}
        time={time}
        teachers={Array.from(teachers).filter((teacher) => selectedTeachers[teacher.id])}
        classSelected={classExistents.find((c) => c.id === selectedClass)!}
        confirmFunction={submitForm}
        variant="confirm"
      />
    </Box>
  );
}

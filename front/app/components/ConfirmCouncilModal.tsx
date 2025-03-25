import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Modal, Typography } from "@mui/material";
import Icon from "./Icon";
import { IoClose } from "react-icons/io5";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import { Teacher } from "@/interfaces/Teacher";
import { SiGoogleclassroom } from "react-icons/si";
import Class from "@/interfaces/Class";

interface ConfirmCouncilModalProps {
  open: boolean;
  close: () => void;
  date: dayjs.Dayjs;
  time: dayjs.Dayjs;
  teachers: Teacher[];
  classSelected: Class;
}

export default function ConfirmCouncilModal({
  open,
  close,
  date,
  time,
  teachers,
  classSelected,
}: ConfirmCouncilModalProps) {
  const {
    primaryColor,
    colorByMode,
    backgroundColor,
    redDanger,
    whiteColor,
    textBlackolor,
  } = useThemeContext();

  return (
    <Modal
      open={open}
      onClose={() => close()}
      className="flex items-center justify-center"
    >
      <Box
        style={{ backgroundColor: backgroundColor }}
        className="flex flex-col p-8 z-30 w-full mx-16 max-w-[800px] rounded-big gap-10"
      >
        <Box className="flex flex-row w-full">
          <Box className="flex flex-col w-full">
            <Typography variant="xl_text_bold" color={colorByMode}>
              Confirmar conselho
            </Typography>
            <Typography variant="md_text_regular">
              Confirme as informações abaixo sobre o conselho que será
              adicionado
            </Typography>
          </Box>
          <Box className="flex w-fit h-fit" onClick={() => close()}>
            <Icon IconPassed={IoClose} color={redDanger} className="size-10" />
          </Box>
        </Box>
        <Box className="flex flex-col md:flex-row md:gap-8">
          <Box className="flex flex-col w-full gap-4">
            <Typography color={colorByMode} variant="xl_text_bold">
              Data do conselho
            </Typography>
            <DatePicker
              label="Data do conselho"
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
            <Typography color={colorByMode} variant="xl_text_bold">
              Horário do conselho
            </Typography>
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
          </Box>
        </Box>
        <Box className="flex flex-col md:flex-row md:gap-8">
          <Box className="w-full">
            <Typography color={colorByMode} variant="xl_text_bold">
              Professores
            </Typography>
            <Box
              style={{ backgroundColor: primaryColor }}
              className="flex flex-col gap-4 w-full rounded-lg p-4 mt-4"
            >
              {teachers.map((teacher, index) => (
                <Typography
                  key={teacher.id}
                  color={whiteColor}
                  variant="md_text_regular"
                >
                  {index + 1} - {teacher.name}
                </Typography>
              ))}
              {teachers.length === 0 && (
                <Typography color={whiteColor} variant="md_text_regular">
                  Nenhum professor selecionado
                </Typography>
              )}
            </Box>
          </Box>
          <Box className="w-full">
            <Typography color={whiteColor} variant="xl_text_bold">
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
        <Box className="w-full">
          <Box className="flex flex-row gap-8 justify-between">
            <Button
              variant="contained"
              onClick={() => close()}
              className="h-fit w-full"
              color="terciary"
            >
              <Typography
                style={{ color: textBlackolor }}
                variant="xl_text_bold"
              >
                Cancelar
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => close()}
              className="h-fit w-full"
              color="primary"
            >
              <Typography variant="xl_text_bold" style={{ color: whiteColor }}>
                Criar Conselho
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

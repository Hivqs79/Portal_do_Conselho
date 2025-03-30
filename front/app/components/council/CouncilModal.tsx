import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Modal, Typography } from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import { Teacher } from "@/interfaces/Teacher";
import { SiGoogleclassroom } from "react-icons/si";
import Class from "@/interfaces/Class";
import { LuPencilLine } from "react-icons/lu";
import CouncilForm from "@/components/council/CouncilForm";
import { CouncilFormProps } from "@/interfaces/CouncilFormProps";
import { isArray } from "util";

interface CouncilModalProps {
  open: boolean;
  close: () => void;
  confirmFunction?: () => void;
  verifyForm?: () => boolean;
  setEditing?: (value: boolean) => void;
  editing?: boolean;
  variant: string;
  councilInformation: CouncilFormProps;
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
}: CouncilModalProps) {
  const {
    primaryColor,
    terciaryColor,
    colorByMode,
    backgroundColor,
    redDanger,
    whiteColor,
    textBlackolor,
  } = useThemeContext();

  const date = councilInformation.visualizedCouncil  ? dayjs(councilInformation.visualizedCouncil.startDateTime) : councilInformation.date;
  const time = councilInformation.visualizedCouncil  ? dayjs(councilInformation.visualizedCouncil.startDateTime) : councilInformation.time;
  const teachers = councilInformation.visualizedCouncil ? councilInformation.visualizedCouncil.teachers as Teacher[] : isArray(councilInformation.teachers) && councilInformation.teachers.filter((t) => councilInformation.selectedTeachers[t.id]);
  const classSelected = councilInformation.visualizedCouncil ?  councilInformation.visualizedCouncil.aclass as Class : councilInformation.classExistents.find((c) => c.id === councilInformation.selectedClass) as Class;

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
        className="p-4 z-50 mx-16 max-w-[800px] rounded-big mt-24"
        style={{ backgroundColor: backgroundColor }}
      >
        <Box className="flex flex-col w-full max-h-[80vh] overflow-y-auto p-8  gap-10">
          <Box className="flex flex-row w-full">
            <Box className="flex flex-col w-full">
              <Typography variant="xl_text_bold" color={colorByMode}>
                {variant === "confirm" ? "Confirmar " : "Detalhes do "}conselho
              </Typography>
              {variant === "confirm" && (
                <Typography variant="md_text_regular">
                  Confirme as informações abaixo sobre o conselho que será
                  adicionado
                </Typography>
              )}
            </Box>
            <Box className="flex w-fit h-fit gap-1">
              {(variant !== "confirm" && !editing) && (
                <Icon
                  IconPassed={LuPencilLine}
                  colorButton={terciaryColor}
                  className="size-10"
                  classNameButton="!p-1 !max-w-[36px]"
                  color={primaryColor}
                  isButton={true}
                  onClick={() => setEditing && setEditing(true)}
                />
              )}
              <Box
                onClick={() => {
                  close();
                  if(setEditing) {
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
            <CouncilForm councilInformation={councilInformation} verifyForm={verifyForm} variant="editing"/>
          ) : (
            <>
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
                      {(teachers && teachers.length !== 0 && isArray(teachers)) ? (
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
            </>
          )}
          {(variant === "confirm" || editing) && (
            <Box className="w-full">
              <Box className="flex flex-row gap-8 justify-between">
                <Button
                  variant="contained"
                  onClick={() => {
                    close(); 
                    if(setEditing) {
                      setEditing(false);
                    }
                  }
                  }
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
                  onClick={() => {
                    if (confirmFunction && (verifyForm && verifyForm())) {
                      close();
                      confirmFunction();
                    }
                  }}
                  className="h-fit w-full"
                  color="primary"
                >
                  <Typography
                    variant="xl_text_bold"
                    style={{ color: whiteColor }}
                  >
                    {editing ? "Salvar " : "Criar "} conselho
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
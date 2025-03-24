import {
    Box,
    Button,
    Icon,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import SelectTable from "./table/SelectTable";
import { createElement, Dispatch, ElementType, SetStateAction } from "react";
import { Teacher } from "@/interfaces/Teacher";
import Class from "@/interfaces/Class";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useThemeContext } from "@/hooks/useTheme";
import { TimePicker } from "@mui/x-date-pickers";
// import Icon from "./Icon";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";

interface CreateCouncilFormProps {
    selectedTeachers: { [key: string]: boolean };
    selectedClass: number | null;
    setSelectedTeachers: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    setSelectedClass: Dispatch<SetStateAction<number | null>>;
    teachers: Teacher[];
    classExistents: Class[];
}

export default function CreateCouncilForm({
    selectedTeachers,
    selectedClass,
    setSelectedTeachers,
    setSelectedClass,
    teachers,
    classExistents,
}: CreateCouncilFormProps) {
    const { primaryColor, whiteColor } = useThemeContext();

    return (
        <Box
            style={{ borderColor: primaryColor }}
            className="outline-component flex flex-col rounded-big p-8 gap-8 border-[2px]"
        >
            <Box className="flex flex-row w-full justify-between gap-8">
                <Box className="flex flex-col w-full gap-4">
                    <Typography color="primary" variant="xl_text_bold">
                        Data do conselho
                    </Typography>
                    <DatePicker
                        label="Data do conselho"
                        slots={{
                            openPickerIcon: Icon,
                        }}
                        slotProps={{
                            openPickerIcon: {
                                style: { color: primaryColor },
                                component: RiCalendarScheduleLine,
                            },
                        }}
                    />
                </Box>
                <div
                    style={{ backgroundColor: primaryColor }}
                    className="block w-[2px]"
                />
                <Box className="flex flex-col w-full gap-4">
                    <Typography color="primary" variant="xl_text_bold">
                        Horário do conselho
                    </Typography>
                    <TimePicker
                        label="Horário do conselho"
                        slots={{
                            openPickerIcon: Icon,
                        }}
                        slotProps={{
                            openPickerIcon: {
                                style: { color: primaryColor },
                                component: FaRegClock,
                            },
                        }}
                    />
                </Box>
            </Box>
            <Box className="flex flex-col gap-12">
                <Box className="flex flex-col gap-4">
                    <Typography color="primary" variant="xl_text_bold">
                        Turma
                    </Typography>
                    <SelectTable
                        value={selectedClass}
                        setRadioSelectedItem={setSelectedClass}
                        name="Lista de Turmas"
                        rows={classExistents}
                        selectType="single"
                    />
                </Box>
                <Box className="flex flex-col gap-4">
                    <Typography color="primary" variant="xl_text_bold">
                        Professores
                    </Typography>
                    <SelectTable
                        value={selectedTeachers}
                        setSelectedItems={setSelectedTeachers}
                        name="Lista de professores"
                        rows={teachers}
                        selectType="multiple"
                    />
                </Box>
                <Button variant="contained" color="primary">
                    <Typography variant="xl_text_regular" color={whiteColor}>Salvar e revisar o conselho</Typography>
                </Button>
            </Box>
        </Box>
    );
}

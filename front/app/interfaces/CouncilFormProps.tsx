import { Dispatch, SetStateAction } from "react";
import { Teacher } from "./Teacher";
import Class from "./Class";
import dayjs from "dayjs";
import TableCouncilRow from "./TableCouncilRow";

export interface CouncilFormProps {
    visualizedCouncil: TableCouncilRow | null;
    selectedTeachers: { [key: string]: boolean };
    selectedClass: number | null;
    setSelectedTeachers: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    setSelectedClass: Dispatch<SetStateAction<number | null>>;
    teachers: Teacher[];
    classExistents: Class[];
    setDate: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    setTime: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    date: dayjs.Dayjs | null;
    time: dayjs.Dayjs | null;
    setSearchTeachers: Dispatch<SetStateAction<string>>;
    setSearchClass: Dispatch<SetStateAction<string>>;
    submitForm: () => void;
}
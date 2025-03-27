import { Dispatch, SetStateAction } from "react";
import { Teacher } from "./Teacher";
import Class from "./Class";
import dayjs from "dayjs";

export interface CouncilForm {
    selectedTeachers: { [key: string]: boolean };
    selectedClass: number | null;
    setSelectedTeachers: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    setSelectedClass: Dispatch<SetStateAction<number | null>>;
    teachers: Teacher[];
    classExistents: Class[];
    setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
    setTime: Dispatch<SetStateAction<dayjs.Dayjs>>;
    date: dayjs.Dayjs;
    time: dayjs.Dayjs;
    setSearchTeachers: Dispatch<SetStateAction<string>>;
    setSearchClass: Dispatch<SetStateAction<string>>;
    submitForm: () => void;
}
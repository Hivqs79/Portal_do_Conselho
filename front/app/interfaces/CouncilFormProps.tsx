import { Dispatch, SetStateAction } from "react";
import { Teacher } from "./Teacher";
import Class from "./Class";
import dayjs from "dayjs";
import TableCouncilRow from "./table/row/TableCouncilRow";
import TablePreCouncilRow from "./table/row/TablePreCouncilRow";

export interface CouncilFormProps {
    visualizedCouncil?: TableCouncilRow | TablePreCouncilRow | null;
    selectedTeachers: { [key: string]: boolean };
    selectedClass: number | null;
    setSelectedTeachers: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    setSelectedClass: Dispatch<SetStateAction<number | null>>;
    teachers: Teacher[];
    classExistents: Class[];
    setDate: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    setTime?: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    setFinalDate?: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    date: dayjs.Dayjs | null;
    time?: dayjs.Dayjs | null;
    finalDate?: dayjs.Dayjs | null;
    setSearchTeachers: Dispatch<SetStateAction<string>>;
    setSearchClass: Dispatch<SetStateAction<string>>;
    submitForm: () => void;
}
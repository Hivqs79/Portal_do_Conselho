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

import { Dispatch, SetStateAction } from "react";
import { Teacher } from "../users/Teacher";
import Class from "../Class";
import dayjs from "dayjs";
import TableCouncilRow from "../table/row/TableCouncilRow";
import TablePreCouncilRow from "../table/row/TablePreCouncilRow";

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
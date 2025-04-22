import Class from "@/interfaces/Class"
import { Teacher } from "@/interfaces/users/Teacher"

type PreCouncilStatus = "answered" | "not-answered" | "released" | "scheduled";

export default interface PreCouncil {
    id: number,
    startDateTime: Date,
    finalDateTime: Date,
    aclass: Class,
    teachers: Teacher[],
    answered: boolean,
    status?: PreCouncilStatus,
};
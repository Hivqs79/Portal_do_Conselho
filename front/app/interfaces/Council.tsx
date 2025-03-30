import Class from "./Class"
import { Teacher } from "./Teacher"

export default interface Council {
    id: number,
    startDateTime: Date,
    teachers: Teacher[],
    aclass: Class[],
}
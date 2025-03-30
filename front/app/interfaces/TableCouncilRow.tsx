import Class from "./Class";
import {Teacher} from "./Teacher";
import { TableRowContent } from "./TableRowContent";

export default interface TableCouncilRow extends TableRowContent {
    id: number,
    turmaNome: string,
    startDateTime: Date
    teachers: Teacher[],
    aclass: Class
}
import Council from "../../Council";
import { TableRowContent } from "./TableRowContent";

export default interface TableAnnotationRow extends TableRowContent {
    id: number,
    rank: string,
    strengths: string,
    toImprove: string,
    council: Council,
}
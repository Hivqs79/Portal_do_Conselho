import PreCouncil from "@/interfaces/PreCouncil";
import { TableRowContent } from "./TableRowContent";

export default interface TablePreCouncilRow extends TableRowContent, PreCouncil {
    buttonText?: string;
    isDisabled?: boolean;
}
import PreCouncil from "@/interfaces/pre-council/PreCouncil";
import { TableRowContent } from "./TableRowContent";

export default interface TablePreCouncilRow extends TableRowContent, PreCouncil {
    buttonText?: string;
    isDisabled?: boolean;
}
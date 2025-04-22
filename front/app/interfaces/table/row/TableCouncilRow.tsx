import Council from "@/interfaces/council/Council";
import { TableRowContent } from "./TableRowContent";

export default interface TableCouncilRow extends TableRowContent, Council {
  buttonText?: string;
  isDisabled?: boolean;
}
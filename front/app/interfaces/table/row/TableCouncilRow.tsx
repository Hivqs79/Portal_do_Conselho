import Council from "@/interfaces/Council";
import { TableRowContent } from "./TableRowContent";

type CouncilStatus = 'expired' | 'active' | 'scheduled';

export default interface TableCouncilRow extends TableRowContent, Council {
  status?: CouncilStatus;
  buttonText?: string;
  isDisabled?: boolean;
}
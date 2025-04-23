import UserManagement from "@/interfaces/UserManagement";
import { TableRowContent } from "./TableRowContent";

export default interface TableUserManagementRow extends TableRowContent, UserManagement {
}
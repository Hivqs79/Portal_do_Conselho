import { TableHeaderContent } from "./TableHeaderContent";
import { TableRowContent } from "./TableRowContent";

export interface TableContent {
    headers: TableHeaderContent[];
    rows: TableRowContent[];
}

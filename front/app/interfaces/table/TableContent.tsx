import { ResponseApiPageable } from "../ResponseApiPageable";
import { TableRowPossibleTypes } from "./row/TableRowPossibleTypes";

export interface TableContent extends ResponseApiPageable<TableRowPossibleTypes> {}
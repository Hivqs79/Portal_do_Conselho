import { TableHeaderContent } from "./TableHeaderContent";
import { TableRowContent } from "./TableRowContent";

export interface TableContentPageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

export interface TableContent {
    headers: TableHeaderContent[];
    content: TableRowContent[];
    pageable: TableContentPageable;
    
}

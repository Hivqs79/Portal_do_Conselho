export interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    count: number;
    setCount: (count: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
}
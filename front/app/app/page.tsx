"use client";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { TableContent } from "@/interfaces/TableContent";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableContent, setTableContent] = useState<TableContent>();
  const { role } = useRoleContext();

  const rowButtons: TableRowButtons = {
    visualizeIconButton: true,
  };
  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    orderButton: true,
    filterButton: true,
  };

  useEffect(() => {
    const fetchTableContent = async () => {
      const response = await fetch("http://localhost:3030/feedback");
      const data: TableContent = await response.json();
      setTableContent(data);
      setPage(data.pageable.pageNumber + 1);
      setCount(data.pageable.totalPages);
      setRowsPerPage(data.pageable.pageSize);
    };
    fetchTableContent();
  }, []);

  return (
    <Box>
      <Title isWelcomeMensage={true} />
      {(role !== "admin" && (
        <>
          <Box className="!mb-6">
            <Typography variant="h6_title">Últimos feedbacks</Typography>
          </Box>
          {tableContent && (
            <Table
              content={tableContent}
              headerButtons={headerButtons}
              rowButtons={rowButtons}
            />
          )}
          <PaginationTable
            page={page}
            setPage={setPage}
            count={count}
            setCount={setCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </>
      )) ||
        (role === "admin" && <Box></Box>)}
    </Box>
  );
}

"use client";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const {token} = useRoleContext();
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
  
  const headers: TableHeaderContent[] = [
    {
      name: "Turma",
    },
    {
      name: "Data",
    },
    {
      name: "Horário",
    },
  ];

  useEffect(() => {
    const fetchTableContent = async () => {
      const response = await fetch("http://localhost:3030/feedback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

        }
      });
      const data: TableContent = await response.json();
      setTableContent(data);                  
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
              tableContent={tableContent}
              headers={headers}
              headerButtons={headerButtons}
              rowButtons={rowButtons}
            />
          )}
          <PaginationTable
            page={page}
            setPage={setPage}
            count={tableContent ? tableContent.totalElements : 1}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(rowsPerPage: number) => {
              setRowsPerPage(rowsPerPage);
              setPage(1);
            }}
          />
        </>
      )) ||
        (role === "admin" && <Box></Box>)}
    </Box>
  );
}

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableContent, setTableContent] = useState<TableContent | null>(null);
  const { role, userId } = useRoleContext();

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
      if (!userId || role === "admin") return;
      const typeOfRequest = (role === "student" || role === "leader") ? "student" : "user";  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/${typeOfRequest}/${typeOfRequest}-id/${userId}?isReturned=true&page=${page - 1}&size=${rowsPerPage}`	
      );
      const data = await response.json();
      console.log(data);
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

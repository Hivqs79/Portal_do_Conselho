"use client";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function ReleaseCouncil() {
  const [feedbacks, setFeedbacks] = useState<TableContent | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    try {
      const fetchFeedbacks = async () => {
        const response = await fetch(
          "http://localhost:8081/feedbacks/class?page=" + (page - 1) + "&size=" + rowsPerPage
        );
        const data = await response.json();
        setFeedbacks(data);
        // console.log(data);
      };
      fetchFeedbacks();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  })

  const rowButtons: TableRowButtons = {
    rankVisualizer: true,
    releaseButton: true,
    visualizeIconButton: true,
    onClickVisualize: (row: TableRowPossibleTypes) => {
      // setVisualizedCouncil(row);
      // setSelectedClass((row as TableCouncilRow).aclass.id);
      // setDate(dayjs((row as TableCouncilRow).startDateTime));
      // setTime(dayjs((row as TableCouncilRow).startDateTime));
    },
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    orderButton: true,
    filterButton: true,
  };

  const headers: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Horário" },
  ];

  return (
    <Box>
      <Title textHighlight="Liberação" text="de feedbacks" />
      <Table
        tableContent={feedbacks}
        headers={headers}
        headerButtons={headerButtons}
        rowButtons={rowButtons}
      />
      <PaginationTable
        count={feedbacks ? feedbacks.totalPages : 0}
        page={feedbacks ? feedbacks.pageable.pageNumber + 1 : 1}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(rowsPerPage: number) => setRowsPerPage(rowsPerPage)}
      />
    </Box>
  );
}

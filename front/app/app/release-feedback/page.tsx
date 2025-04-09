"use client";
import AnnotationsModal from "@/components/modals/AnnotationsModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import TableRow from "@/components/table/TableRow";
import Title from "@/components/Title";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import TableCouncilRow from "@/interfaces/table/row/TableCouncilRow";
import TableFeedbackRow from "@/interfaces/table/row/TableFeedbackRow";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function ReleaseCouncil() {
  const [feedbacks, setFeedbacks] = useState<TableContent | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [feedbackSearch, setFeedbackSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [studentTerm, setStudentTerm] = useState<string>("");
  const [studentContent, setStudentContent] = useState<TableRowPossibleTypes>();

  useEffect(() => {
    try {
      const fetchFeedbacks = async () => {
        const response = await fetch(
          "http://localhost:8081/feedbacks/class?page=" +
            (page - 1) +
            "&size=" +
            rowsPerPage +
            "&className=" +
            feedbackSearch
        );
        console.log("Response:", feedbackSearch);
        const data = await response.json();
        setFeedbacks(data);
      };
      fetchFeedbacks();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [page, rowsPerPage, feedbackSearch]);

  const rowButtons: TableRowButtons = {
    rankVisualizer: true,
    releaseButton: true,
    visualizeIconButton: true,
    onClickVisualize: async (row: TableRowPossibleTypes) => {
      setIsOpen(true);
      console.log("Row clicked:", row);
      setStudentContent(row);
    
      const councilId = (row as TableFeedbackRow).council.id;
      console.log("id council:", councilId);
    
      try {
        const feedbackContent = await fetchFeedbackContent(councilId);
        console.log(feedbackContent);
      } catch (error) {
        console.error("Error fetching feedback content:", error);
      }
    },    
  };

  const fetchFeedbackContent = async (idCouncil: number) => {
    try {
      const response = await fetch(
        "http://localhost:8081/feedbacks/student?councilId=" + idCouncil,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };
  

  const headerButtonsClass: TableHeaderButtons = {
    rank: "EXCELLENT",
    rankVisualizer: true,
    rankText: "Classificação da Turma",
  };

  const headersClass: TableHeaderContent[] = [{ name: "Nome da Turma" }];

  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setStudentTerm(term),
  };

  const headerStudent: TableHeaderContent[] = [
    { name: "Aluno" },
    { name: "Frequência" },
  ];

  const rowButtonsStudent: TableRowButtons = {
    rankVisualizer: true,
    visualizeButton: true,
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setFeedbackSearch(term),
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
      <AnnotationsModal
        open={isOpen}
        close={() => setIsOpen(false)}
        classNegativeContent="teste" //TODO: PUXAR DA API
        classPositiveContent="teste" //TODO: PUXAR DA API
        contentStudent={[]} //TODO: PUXAR DA API
        headerButtonsClass={headerButtonsClass}
        headerButtonsStudent={headerButtonsStudent}
        headersClass={headersClass}
        headersStudent={headerStudent}
        rowButtonsStudent={rowButtonsStudent}
      />
    </Box>
  );
}

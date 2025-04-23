"use client";
import FeedbackModal from "@/components/modals/FeedbackModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import FeedbackStudent from "@/interfaces/feedback/FeedbackStudent";
import FeedbackUser from "@/interfaces/feedback/FeedbackUser";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableContent, setTableContent] = useState<TableContent | null>(null);
  const { role, userId } = useRoleContext();
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackUser | FeedbackStudent | null>(null);
  const [satisfied, setSatisfied] = useState<boolean | null>(null);

  const rowButtons: TableRowButtons = {
    visualizeIconButton: true,
    onClickVisualize(row: TableRowPossibleTypes) {
      setSelectedFeedback((row as FeedbackUser | FeedbackStudent));
      setOpen(true);
    },
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
  
  const headersFeedback: TableHeaderContent[] = [
    {
      name: "Feedback",
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

  const fetchChangeSatisfied = async () => {
    if (!selectedFeedback) return;
    const typeOfRequest = (role === "student" || role === "leader") ? "student" : "user";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/${typeOfRequest}/${selectedFeedback.id}/satisfied/${satisfied}`
    );
    const data = await response.json();
    console.log(data);
  };

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
          <FeedbackModal 
            open={open} 
            close={() => {
              setOpen(false);
              setSelectedFeedback(null);
            }}
            feedback={selectedFeedback}
            headers={headersFeedback}
            satisfied={satisfied}
            setSatisfied={setSatisfied}
          />
        </>
      )) ||
        (role === "admin" && <Box></Box>)}
    </Box>
  );
}

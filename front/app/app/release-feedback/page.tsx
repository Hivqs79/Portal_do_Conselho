"use client";
import AnnotationsModal from "@/components/modals/AnnotationsModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import FeedbackClass from "@/interfaces/FeedbackClass";
import FeedbackStudent from "@/interfaces/FeedbackStudent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import TableFeedbackRow from "@/interfaces/table/row/TableFeedbackRow";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function ReleaseFeedback() {
  const [feedbacks, setFeedbacks] = useState<TableContent | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [feedbackSearch, setFeedbackSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [studentTerm, setStudentTerm] = useState<string>("");
  const [studentContent, setStudentContent] = useState<TableRowPossibleTypes[]>();
  const [councilId, setCouncilId] = useState<number>(0);
  const [classContent, setClassContent] = useState<FeedbackClass>();

  useEffect(() => {
    try {
      const fetchFeedbacks = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/class?isReturned=false
            &page=${page - 1}
            &size=${rowsPerPage}
            &className=${feedbackSearch}`
        );
        console.log("Response:", feedbackSearch);
        const data = await response.json();
        console.log("THIS data", data)
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
      setClassContent(row as FeedbackClass);
      const councilId = (row as TableFeedbackRow).council.id;
      setCouncilId(councilId);
      console.log("councilId", councilId);
    },
    onClickRealize: async () => {
    },
  };

  console.log("Student content: ", studentContent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/student?isReturned=false&councilId=${councilId}&studentName=${studentTerm}`,
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

        const data = await response.json();
        console.log("alunos: ", data.content);
        if (data.content.length > 0) {
          const frequency = "frequency" in data.content[0] ? data.content[0].frequency : null;
          console.log("frequency", frequency);
        }
        setStudentContent(data.content as FeedbackStudent[]);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [councilId, studentTerm]);

  const headerButtonsClass: TableHeaderButtons = {
    rank: "EXCELLENT",
    rankVisualizer: true,
    rankText: "Classificação da Turma",
  };

  const headersClass: TableHeaderContent[] = [{ name: `Turma: ${classContent?.council.aclass.name}` }];

  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setStudentTerm(term);
      setPage(1);
    },
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
        setRowsPerPage={(rowsPerPage: number) => {
          setRowsPerPage(rowsPerPage);
          setPage(1);
        }}
      />
      <AnnotationsModal
        open={isOpen}
        close={() => setIsOpen(false)}
        classNegativeContent={classContent?.toImprove ?? ""}
        classPositiveContent={classContent?.strengths ?? ""}
        contentStudent={studentContent ? studentContent : null}
        headerButtonsClass={headerButtonsClass}
        headerButtonsStudent={headerButtonsStudent}
        headersClass={headersClass}
        headersStudent={headerStudent}
        rowButtonsStudent={rowButtonsStudent}
        variant="feedback"
      />
    </Box>
  );
}

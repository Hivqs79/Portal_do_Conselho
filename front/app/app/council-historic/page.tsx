/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import Title from "@/components/Title";
import AnnotationsModal from "@/components/modals/AnnotationsModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import { useRoleContext } from "@/hooks/useRole";
import FeedbackClass from "@/interfaces/feedback/FeedbackClass";
import FeedbackStudent from "@/interfaces/feedback/FeedbackStudent";
import { TableContent } from "@/interfaces/table/TableContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import TableFeedbackRow from "@/interfaces/table/row/TableFeedbackRow";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function CouncilHistoric() {
  const [feedbacks, setFeedbacks] = useState<TableContent | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [feedbackSearch, setFeedbackSearch] = useState<string>("");
  const { token, role, userId } = useRoleContext();
  const [isOpen, setIsOpen] = useState(false);
  const [studentContent, setStudentContent] = useState<TableRowPossibleTypes[]>();
  const [classContent, setClassContent] = useState<FeedbackClass>();
  const [councilId, setCouncilId] = useState<number>(0);
  const [studentTerm, setStudentTerm] = useState<string>("");

  const fetchStudentsFeedback = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/student?isReturned=true &councilId=${councilId}&studentName=${studentTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data.content as FeedbackStudent[];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentsFeedback();
        setStudentContent(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [councilId, studentTerm]);
  
  useEffect(() => {
    try {
      const fetchFeedbacks = async () => {
        const response = await fetch(
          role !== "teacher" ? `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/class?isReturned=true&page=${page - 1}&size=${rowsPerPage}&className=${feedbackSearch}` : `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/class/teacher/${userId}?page${page - 1}&size=${rowsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", feedbackSearch);
        const data = await response.json();
        console.log("THIS data", data);
        setFeedbacks(data);
      };
      fetchFeedbacks();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [page, rowsPerPage, feedbackSearch]);
  
  const headersCouncil: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Horário" },
  ];

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setFeedbackSearch(term),
    orderButton: true,
    filterButton: true,
  };

  const rowButtonsCouncil: TableRowButtons = {
    rankVisualizer: true,
    visualizeIconButton: true,
    onClickVisualize: async (row: TableRowPossibleTypes) => {
      console.log("Row clicked:", row);
      setClassContent(row as FeedbackClass);
      const councilId = (row as TableFeedbackRow).council.id;
      console.log("councilId", councilId);
      setCouncilId(councilId);
      setIsOpen(true);
    },
  };

  const headerButtonsClass: TableHeaderButtons = {
    rank: "EXCELLENT",
    rankVisualizer: true,
    rankText: "Classificação da Turma",
  };

  const headersClass: TableHeaderContent[] = [
    { name: `Turma: ${classContent?.council.aclass.name}` },
  ];

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
  
  return (
    <Box>
      <Title textHighlight="Histórico" text="de conselhos" />
      <Table
        tableContent={feedbacks}
        headers={headersCouncil}
        headerButtons={headerButtons}
        rowButtons={rowButtonsCouncil}
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
        readOnly={true}
      />
    </Box>
  );
}

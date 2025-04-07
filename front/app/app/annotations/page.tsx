"use client";
import Title from "@/components/Title";
import Table from "@/components/table/Table";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TableContent } from "@/interfaces/table/TableContent";
import { useRoleContext } from "@/hooks/useRole";
import PaginationTable from "@/components/table/Pagination";
import AnnotationsModal from "@/components/modals/AnnotationsModal";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import TableAnnotationRow from "@/interfaces/table/row/TableAnnotationRow";
import { Rank } from "@/interfaces/RankType";
import Annotation from "@/interfaces/Annotation";

export default function Annotations() {
  const [classAnnotations, setClassAnnotations] = useState<TableContent | null>(null);
  const [studentAnnotations, setStudentAnnotations] = useState<TableContent | null>(null);
  const { userId } = useRoleContext();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");

  console.log(classSearch);
  const rowButtons: TableRowButtons = {
    annotationButton: true,
    onClickAnnotation: (row: TableRowPossibleTypes) => {
      console.log(row);
      setIsModalOpen(true);      
      setSelectedAnnotation((row as TableAnnotationRow));
    },
    rankButton: true
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    orderButton: true,
    filterButton: true,
    setSearch: (term: string) => setClassSearch(term)
  };

  const headers: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Horário" },
  ];

  const headerButtonsClass: TableHeaderButtons = {
    rank: selectedAnnotation?.rank ? selectedAnnotation.rank : "NONE",
    setRank: (rank: Rank) => {
      if (!selectedAnnotation) return;

      setSelectedAnnotation({
        id: selectedAnnotation.id,
        rank: rank,
        strengths: selectedAnnotation.strengths,
        toImprove: selectedAnnotation.toImprove,
        council: selectedAnnotation.council,
        teacher: selectedAnnotation.teacher,
      });
    },
    rankText: "Classificar turma: "
  };

  const headersClass: TableHeaderContent[] = [
    { name: "Turma " + selectedAnnotation?.council.aclass.name},
  ];

  const rowButtonsStudent: TableRowButtons = {
    rankButton: true,
    annotationButton: true,
    onClickAnnotation: (row: TableRowPossibleTypes) => {
      console.log(row);
    },
  };

  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setStudentSearch(term)
  };  

  const headersStudent: TableHeaderContent[] = [
    { name: "Nome" },
  ];

  useEffect(() => {
    const fetchClassAnnotations = async () => {
      const response = await fetch(`http://localhost:8081/annotations/class?teacherId=${userId}&page=${page - 1}&size=${rowsPerPage}&className=${classSearch}`);
      const data = await response.json();
      console.log(data);
      setClassAnnotations(data);
    };    
    fetchClassAnnotations();
  }, [userId, page, rowsPerPage, classSearch]);

  useEffect(() => {
    const fetchStudentAnnotations = async (councilId: number, teacherId?: number) => {
      const response = await fetch(`http://localhost:8081/annotations/student?councilId=${councilId}&teacherId=${teacherId}&studentName=${studentSearch}`);
      const data = await response.json();
      console.log(data);
      setStudentAnnotations(data);
    };
    if (!selectedAnnotation) return;
    fetchStudentAnnotations(selectedAnnotation.council.id, selectedAnnotation.teacher.id);
  }, [selectedAnnotation?.id, studentSearch]);

  function setPositiveClassContent(content: string) {
    if (!selectedAnnotation) return;
    setSelectedAnnotation({
      id: selectedAnnotation.id,
      rank: selectedAnnotation.rank,
      strengths: content,
      toImprove: selectedAnnotation.toImprove,
      council: selectedAnnotation.council,
      teacher: selectedAnnotation.teacher,
    });
  }

  function setNegativeClassContent(content: string) {
    if (!selectedAnnotation) return;
    setSelectedAnnotation({
      id: selectedAnnotation.id,
      rank: selectedAnnotation.rank,
      strengths: selectedAnnotation.strengths,
      toImprove: content,
      council: selectedAnnotation.council,
      teacher: selectedAnnotation.teacher,
    });
  }

  return (
    <Box>
      <Title textHighlight="Anotações" text="para os conselhos" />
      <Table
        headers={headers}
        rowButtons={rowButtons}
        headerButtons={headerButtons}
        tableContent={classAnnotations}
      />
      <PaginationTable 
        count={classAnnotations ? classAnnotations.totalPages : 0}
        page={classAnnotations ? classAnnotations.pageable.pageNumber + 1 : 1}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(rowsPerPage: number) => setRowsPerPage(rowsPerPage)}
        />
        <AnnotationsModal 
          variant="annotations"
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
          classPositiveContent={selectedAnnotation?.strengths ? selectedAnnotation.strengths : ""}
          setClassPositiveContent={setPositiveClassContent}
          classNegativeContent={selectedAnnotation?.toImprove ? selectedAnnotation.toImprove : ""}
          setClassNegativeContent={setNegativeClassContent}          
          headerButtonsClass={headerButtonsClass}
          headersClass={headersClass}
          contentStudent={studentAnnotations}
          headersStudent={headersStudent}
          rowButtonsStudent={rowButtonsStudent}
          headerButtonsStudent={headerButtonsStudent}
        />
    </Box>
  );
}

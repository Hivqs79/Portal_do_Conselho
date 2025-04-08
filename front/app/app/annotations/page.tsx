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
  const [selectedStudents, setSelectedStudents] = useState<TableAnnotationRow[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [idStudentChanged, setIdStudentChanged] = useState(0);

  const rowButtons: TableRowButtons = {
    annotationButton: true,
    onClickAnnotation: (row: TableRowPossibleTypes) => {
      console.log(row);
      setIsModalOpen(true);
      setSelectedAnnotation((row as TableAnnotationRow));;
    },
    rankVisualizer: true,
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
    { name: "Turma " + selectedAnnotation?.council.aclass.name },
  ];

  const rowButtonsStudent = {
    setRank: (rank: Rank, idStudent: number) => {
      if (!selectedStudents) return;
      setSelectedStudents(selectedStudents.map((row) => {
        if (row.id === idStudent) {
          return {
            ...row,
            rank: rank,
          };
        }
        return row;
      }))
      setIdStudentChanged(idStudent);
    },
    setPositiveStudentContent: (content: string, idStudent: number) => {
      if (!selectedStudents) return;
      setSelectedStudents(selectedStudents.map((row) => {
        if (row.id === idStudent) {
          return {
            ...row,
            strengths: content,
          };
        }
        return row;
      }))
      setIdStudentChanged(idStudent);
    },
    setNegativeStudentContent: (content: string, idStudent: number) => {
      if (!selectedStudents) return;
      setSelectedStudents(selectedStudents.map((row) => {
        if (row.id === idStudent) {
          return {
            ...row,
            toImprove: content,
          };
        }
        return row;
      }))
      setIdStudentChanged(idStudent);
    },
  };

  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setStudentSearch(term),
    searchValue: studentSearch,
  };

  const headersStudent: TableHeaderContent[] = [
    { name: "Nome" },
  ];

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

  useEffect(() => {
    const fetchClassAnnotations = async () => {
      const response = await fetch(`http://localhost:8081/annotations/class?teacherId=${userId}&page=${page - 1}&size=${rowsPerPage}&className=${classSearch}`);
      const data = await response.json();
      console.log(data);
      setClassAnnotations(data);
    };
    fetchClassAnnotations();
  }, [userId, page, rowsPerPage, classSearch, isModalOpen]);

  useEffect(() => {
    const fetchStudentAnnotations = async (councilId: number, teacherId?: number) => {
      const response = await fetch(`http://localhost:8081/annotations/student?councilId=${councilId}&teacherId=${teacherId}&studentName=${studentSearch}`);
      const data = await response.json();
      console.log(data);
      setStudentAnnotations(data);
      setSelectedStudents(data.content);
    };
    if (!selectedAnnotation) return;
    fetchStudentAnnotations(selectedAnnotation.council.id, selectedAnnotation.teacher.id);
  }, [selectedAnnotation?.id, studentSearch]);

  useEffect(() => {
    async function updateClassAnnotation() {
      if (!selectedAnnotation) return;
      const response = await fetch(`http://localhost:8081/annotations/class/${selectedAnnotation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank: selectedAnnotation.rank,
          strengths: selectedAnnotation.strengths,
          toImprove: selectedAnnotation.toImprove,
          teacher_id: selectedAnnotation.teacher.id,
          council_id: selectedAnnotation.council.id,
        }),
      });
      console.log(response);
    }
    updateClassAnnotation();
  }, [selectedAnnotation]);

  useEffect(() => {
    async function updateStudentAnnotation() {
      if (!selectedStudents) return;
      const row = selectedStudents.find((row: TableRowPossibleTypes) => {
        if ('student' in row) {
          return row.student.id === idStudentChanged;
        }
        return false;
      }) as TableAnnotationRow | undefined;
      const idAnnotation = row?.id;
      if (!idAnnotation) return;
      const response = await fetch(`http://localhost:8081/annotations/student/${idAnnotation}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank: row.rank,
          strengths: row.strengths,
          toImprove: row.toImprove,
          teacher_id: row.teacher.id,
          council_id: row.council.id,
          student_id: row.student.id,
        }),
      });
      console.log(response);
    }
    updateStudentAnnotation();
  }, [selectedStudents]);

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
        contentStudent={selectedStudents}
        headersStudent={headersStudent}
        rowButtonsStudent={rowButtonsStudent}
        headerButtonsStudent={headerButtonsStudent}
      />
    </Box>
  );
}

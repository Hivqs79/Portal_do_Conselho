"use client";
import Title from "@/components/Title";
import Table from "@/components/table/Table";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TableContent } from "@/interfaces/table/TableContent";
import { useRoleContext } from "@/hooks/useRole";
import PaginationTable from "@/components/table/Pagination";
import AnnotationsModal from "@/components/modals/AnnotationsModal";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import TableAnnotationRow from "@/interfaces/table/row/TableAnnotationRow";
import { Rank } from "@/interfaces/RankType";
import Annotation from "@/interfaces/Annotation";
import AutoSaveIndicator from "@/components/AutoSaveIndicator";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";

export default function Annotations() {
  const [classAnnotations, setClassAnnotations] = useState<TableContent | null>(
    null
  );
  const { userId } = useRoleContext();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<
    TableAnnotationRow[]
  >([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [idStudentChanged, setIdStudentChanged] = useState(0);
  const [isSaved, setSaved] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [sentRequests, setSentRequests] = useState(false);
  const [editedRows, setEditedRows] = useState<Record<number, TableAnnotationRow>>({});
  const {backgroundColor} = useThemeContext();
  const [showSaved, setShowSaved] = useState(false);

  const rowButtons: TableRowButtons = {
    annotationButton: true,
    onClickAnnotation: (row: TableRowPossibleTypes) => {
      console.log(row);
      setIsModalOpen(true);
      setSelectedAnnotation(row as TableAnnotationRow);
    },
    rankVisualizer: true,
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    orderButton: true,
    filterButton: true,
    setSearch: (term: string) => setClassSearch(term),
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
    rankText: "Classificar turma: ",
  };

  const headersClass: TableHeaderContent[] = [
    { name: "Turma " + selectedAnnotation?.council.aclass.name },
  ];

  const rowButtonsStudent = {
    setRank: (rank: Rank, idStudent: number) => {
      if (!selectedStudents) return;
      setIdStudentChanged(idStudent);
      setSelectedStudents(
        selectedStudents.map((row) => {
          if (row.student.id === idStudent) {
            return {
              ...row,
              rank: rank,
            };
          }
          return row;
        })
      );
    },
    setPositiveStudentContent: (content: string, idStudent: number) => {
      if (!selectedStudents) return;
      setIdStudentChanged(idStudent);
      setSelectedStudents(
        selectedStudents.map((row) => {
          if (row.student.id === idStudent) {
            return {
              ...row,
              strengths: content,
            };
          }
          return row;
        })
      );
    },
    setNegativeStudentContent: (content: string, idStudent: number) => {
      if (!selectedStudents) return;
      setIdStudentChanged(idStudent);
      setSelectedStudents(
        selectedStudents.map((row) => {
          if (row.student.id === idStudent) {
            return {
              ...row,
              toImprove: content,
            };
          }
          return row;
        })
      );
    },
  };

  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setStudentSearch(term)
      setPage(1)      
    },
    searchValue: studentSearch,
  };

  const headersStudent: TableHeaderContent[] = [{ name: "Nome" }];

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/class?isHappening=false&isFinished=false&teacherId=${userId}&page=${page - 1
        }&size=${rowsPerPage}&className=${classSearch}`
      );
      const data = await response.json();
      console.log(data);
      setClassAnnotations(data);
    };
    fetchClassAnnotations();
  }, [userId, page, rowsPerPage, classSearch, isModalOpen]);

  useEffect(() => {
    const fetchStudentAnnotations = async (
      councilId: number,
      teacherId?: number
    ) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/student?councilId=${councilId}&teacherId=${teacherId}&studentName=${studentSearch}`
      );
      const data = await response.json();
      setSelectedStudents(data.content);
    };
    if (!selectedAnnotation) return;
    fetchStudentAnnotations(
      selectedAnnotation.council.id,
      selectedAnnotation.teacher.id
    );
  }, [selectedAnnotation?.id, studentSearch]);

  let timeoutIdClass: NodeJS.Timeout | null = null;

  const debouncedUpdateClassAnnotation = async () => {
    setSaved(false);
    timeoutIdClass = setTimeout(async () => {
      if (!selectedAnnotation) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/class/${selectedAnnotation.id}`,
        {
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
        }
      );
      console.log(response);
      setSaved(true);
    }, 2000);
  };

  useEffect(() => {
    debouncedUpdateClassAnnotation();
    return () => {
      if (timeoutIdClass) {
        clearTimeout(timeoutIdClass);
      }
    };
  }, [selectedAnnotation]);

  
  useEffect(() => {
    debouncedUpdateStudentAnnotation();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setSentRequests(false);
    };
  }, [selectedStudents]);

  const debouncedUpdateStudentAnnotation = () => {
    if (!selectedStudents) return;

    const row = selectedStudents.find(row => "student" in row && row.student.id === idStudentChanged) as TableAnnotationRow | undefined;
    if (!row) return;

    setEditedRows(prev => ({ ...prev, [row.id]: row }));
    setSaved(false);
    if (timeoutId) clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (Object.keys(editedRows).length === 0 || sentRequests) return;
  
    const debounce = setTimeout(() => {
      const newTimeoutId = setTimeout(async () => {
        const responses = await Promise.all(
          Object.keys(editedRows).map(id => {
            const row = editedRows[parseInt(id)];
            return fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/student/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                rank: row.rank,
                strengths: row.strengths,
                toImprove: row.toImprove,
                teacher_id: row.teacher.id,
                council_id: row.council.id,
                student_id: row.student.id,
              })
            });
          })
        );
        console.log(responses);
        setEditedRows({});
        setSaved(true);
        setSentRequests(true);
      }, 2000);
      setTimeoutId(newTimeoutId);
    }, 500);
  
    return () => clearTimeout(debounce);
  }, [editedRows]);

  useEffect(() => {
    if (isModalOpen) {
      setShowSaved(true);
      if (isSaved == true) {
        setTimeout(() => {
          setShowSaved(false);
        }, 3000);
      }
    } else {
      setShowSaved(false);
    }
  }, [isSaved]);

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
        setRowsPerPage={(rowsPerPage: number) => {
          setRowsPerPage(rowsPerPage); 
          setPage(1); 
        }}
      />
      <AnnotationsModal
        variant="annotations"
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        classPositiveContent={
          selectedAnnotation?.strengths ? selectedAnnotation.strengths : ""
        }
        setClassPositiveContent={setPositiveClassContent}
        classNegativeContent={
          selectedAnnotation?.toImprove ? selectedAnnotation.toImprove : ""
        }
        setClassNegativeContent={setNegativeClassContent}
        headerButtonsClass={headerButtonsClass}
        headersClass={headersClass}
        contentStudent={selectedStudents}
        headersStudent={headersStudent}
        rowButtonsStudent={rowButtonsStudent}
        headerButtonsStudent={headerButtonsStudent}
      />
      <Box style={{backgroundColor: OpacityHex(backgroundColor, 0.4)}} className={"fixed bottom-3 duration-200 p-2 rounded-lg left-8 z-[1000] " + (showSaved ? "opacity-100" : "opacity-0")}>
        <AutoSaveIndicator
          saved={isSaved}
          text={isSaved ? "Salvo" : "Salvando..."}
        />
      </Box>
    </Box>
  );
}
"use client";
import Title from "@/components/Title";
import CouncilForm from "@/components/council/CouncilForm";
import CouncilModal from "@/components/council/CouncilModal";
import LoadingModal from "@/components/modals/LoadingModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import { useThemeContext } from "@/hooks/useTheme";
import Class from "@/interfaces/Class";
import { CouncilFormProps } from "@/interfaces/CouncilFormProps";
import { Teacher } from "@/interfaces/Teacher";
import TablePreCouncilRow from "@/interfaces/table/row/TablePreCouncilRow";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { Box, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { use, useEffect, useState } from "react";

export default function PreCouncil() {
  const { redDanger } = useThemeContext();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visualizedCouncil, setVisualizedCouncil] =
    useState<TableRowPossibleTypes | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classExistents, setClassExistents] = useState<Class[]>([]);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [finalDate, setFinalDate] = useState<dayjs.Dayjs | null>(null);
  const [searchTeachers, setSearchTeachers] = useState<string>("");
  const [searchClass, setSearchClass] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const createCouncil = async () => {
    console.log("testeCreate");
    setIsLoading(true);
    const response = await fetch("http://localhost:8081/pre-council", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class_id: selectedClass,
        teachers_id: Object.keys(selectedTeachers)
          .filter((id) => selectedTeachers[id])
          .map((id) => parseInt(id)),
      }),
    });
    response.json().then((data) => {
      console.log(data);
      resetInputs();
      setIsLoading(false);
    });
  };

  const councilInformation: CouncilFormProps = {
    visualizedCouncil: visualizedCouncil as TablePreCouncilRow,
    selectedTeachers: selectedTeachers,
    selectedClass: selectedClass,
    setSelectedTeachers: setSelectedTeachers,
    setSelectedClass: setSelectedClass,
    teachers: teachers,
    classExistents: classExistents,
    setDate: setDate,
    setFinalDate: setFinalDate,   
    date: date,    
    finalDate: finalDate,    
    setSearchTeachers: setSearchTeachers,
    setSearchClass: setSearchClass,
    // submitForm: isEditing ? editCouncil : createCouncil,
    submitForm: () => {},
  };

  const verifyInputs = () => {
    const now = dayjs();

    if (!date) {
      setSnackbarMessage("Selecione uma data");
      return false;
    }

    if (!finalDate) {
      setSnackbarMessage("Selecione uma data final");
      return false;
    }

    if (date.isBefore(now, "day")) {
      setSnackbarMessage(
        "Não é possível agendar pré-conselhos para datas passadas"
      );
      return false;
    }    
    if (finalDate.isBefore(now, "day")) {
      setSnackbarMessage(
        "Não é possível agendar pré-conselhos para datas passadas"
      );
      return false;
    }

    if (finalDate.isBefore(date, "day")) {
      setSnackbarMessage("A data final não pode ser anterior a data inicial");
      return false;
    }

    if (finalDate.isSame(date, "day")) {
        setSnackbarMessage("A data final não pode ser igual a data inicial");
        return false;
    }

    if (!Object.keys(selectedTeachers).length) {
      setSnackbarMessage("Selecione pelo menos um professor");
      return false;
    }

    if (!selectedClass) {
      setSnackbarMessage("Selecione uma turma");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch(
        "http://localhost:8081/class" +
          (searchClass ? "?name=" + searchClass : "")
      );
      const data = await response.json();
      setSelectedClass(data.content[0] && data.content[0].id);
      setClassExistents(data.content);
    };
    fetchClass();
  }, [searchClass, isCreate]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(
        "http://localhost:8081/class/teacher/" +
          (selectedClass ? selectedClass : "")
      );
      const data = await response.json();
      setTeachers(data);
    };
    if (!selectedClass) return;
    fetchTeachers();
  }, [selectedClass, isCreate]);
  
  return (
    <Box>
      <Title textHighlight="Pré-conselho" />
      {isCreate ? (
        <CouncilForm
          councilInformation={councilInformation}
          verifyForm={verifyInputs}
          variant="create"
        />
      ) : (
        // <>
        //       <Table
        //         tableContent={councils}
        //         headers={headers}
        //         headerButtons={headerButtons}
        //         rowButtons={rowButtons}
        //       />
        //       <PaginationTable
        //         count={councils ? councils.totalPages : 0}
        //         page={councils ? councils.pageable.pageNumber + 1 : 1}
        //         setPage={setPage}
        //         rowsPerPage={rowsPerPage}
        //         setRowsPerPage={(rowsPerPage: number) => {
        //           setRowsPerPage(rowsPerPage);
        //           setPage(1);
        //         }}
        //       />
        //       <CouncilModal
        //         open={visualizedCouncil !== null}
        //         close={() => setVisualizedCouncil(null)}
        //         councilInformation={councilInformation}
        //         confirmFunction={editCouncil}
        //         verifyForm={verifyInputs}
        //         setEditing={(value: boolean) => setIsEditing(value)}
        //         editing={isEditing}
        //         variant="details"
        //       />
        <></>
      )}
      <Snackbar
        open={!!snackbarMessage}
        onClose={() => setSnackbarMessage("")}
        autoHideDuration={5000}
        message={snackbarMessage}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: redDanger,
          },
        }}
      />
      {isLoading && <LoadingModal />}
    </Box>
  );
}

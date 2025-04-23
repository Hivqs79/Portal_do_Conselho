"use client";
import SwapButton from "@/components/SwapButton";
import Title from "@/components/Title";
import CouncilForm from "@/components/council/CouncilForm";
import CouncilModal from "@/components/council/CouncilModal";
import LoadingModal from "@/components/modals/LoadingModal";
import PreCouncilModal from "@/components/pre-council/PreCouncilModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import { useThemeContext } from "@/hooks/useTheme";
import Class from "@/interfaces/Class";
import { CouncilFormProps } from "@/interfaces/council/CouncilFormProps";
import { Teacher } from "@/interfaces/users/Teacher";
import { TableContent } from "@/interfaces/table/TableContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import TablePreCouncilRow from "@/interfaces/table/row/TablePreCouncilRow";
import TablePreCouncilSectionRow from "@/interfaces/table/row/TablePreCouncilSectionRow";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { Box, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRoleContext } from "@/hooks/useRole";

type PreCouncilStatus = "answered" | "not-answered" | "released" | "scheduled";

export default function PreCouncil() {
  const { redDanger } = useThemeContext();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [preCouncils, setPreCouncils] = useState<TableContent | null>(null);
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [preCouncilSections, setPreCouncilSections] = useState<TablePreCouncilSectionRow[]>([]);
  const { token } = useRoleContext();

  const rowButtons: TableRowButtons = {
      visualizeIconButton: true,
      preCouncilButton: true,
      onClickVisualize: (row: TableRowPossibleTypes) => {
        setVisualizedCouncil(row);
        setSelectedClass((row as TablePreCouncilRow).aclass.id);
        setDate(dayjs((row as TablePreCouncilRow).startDateTime));
        setFinalDate(dayjs((row as TablePreCouncilRow).finalDateTime));
      },      
    };
  
    const headerButtons: TableHeaderButtons = {
      searchInput: true,
      setSearch: (term: string) => {
        setSearchClass(term); 
        setPage(1);
      },
      orderButton: true,
      filterButton: true,
    };
  
    const headers: TableHeaderContent[] = [
      { name: "Turma" },
      { name: "Data" },
      { name: "Data final" },
    ];
    
  const createPreCouncil = async () => {
    console.log("testeCreate");
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        class_id: selectedClass,
        startDateTime: date,
        finalDateTime: finalDate,
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

  const resetInputs = () => {
    setDate(null);
    setFinalDate(null);
    setSelectedTeachers({});
    setSearchClass("");
    setSearchTeachers("");
  };

  const editPreCouncil = async () => {
    console.log("testeEdit");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council/${visualizedCouncil?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },        
        body: JSON.stringify({
          startDateTime: date,
          finalDateTime: finalDate,
          class_id: selectedClass,
          teachers_id: Object.keys(selectedTeachers)
            .filter((id) => selectedTeachers[id])
            .map((id) => parseInt(id)),
        }),
      }
    );
    response.json().then((data) => {
      console.log(data);
      setIsEditing(false);
      resetInputs();
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
    submitForm: isEditing ? editPreCouncil : createPreCouncil,
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

  const processPreCouncilData = (preCouncil: TablePreCouncilRow): TablePreCouncilRow => {
    if (!preCouncil.startDateTime || !preCouncil.finalDateTime) return preCouncil;

    const now = dayjs();
    const preCouncilStartDate = dayjs(preCouncil.startDateTime);
    const preCouncilFinalDate = dayjs(preCouncil.finalDateTime);

    let status: PreCouncilStatus = "scheduled";
    let buttonText = "Agendado";
    let isDisabled = true;

    if (preCouncil.answered) {
      status = "answered";
      buttonText = "Respondido";
      isDisabled = true;
    }
    else if (preCouncilStartDate < now && now < preCouncilFinalDate) {
      status = "released";
      buttonText = "Liberado";
      isDisabled = true;
    } else if (preCouncilFinalDate < now) {
      status = "not-answered";
      buttonText = "Não respondido";
      isDisabled = true;
    }

    return {
      ...preCouncil,
      status,
      buttonText,
      isDisabled,
    };
  };

  useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class${searchClass ? "?name=" + searchClass : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class/teacher/${selectedClass ? selectedClass : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTeachers(data);
    };
    if (!selectedClass) return;
    fetchTeachers();
  }, [selectedClass, isCreate]);

  useEffect(() => {
    const fetchCouncil = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council?page=${page - 1}&size=${rowsPerPage}&className=${searchClass}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setPreCouncils({
        ...data,
        content: data.content.map(processPreCouncilData)
      });
    };

    fetchCouncil();
  }, [isCreate, isEditing, page, rowsPerPage, searchClass]);

  useEffect(() => {
    const fetchPreCouncilSections = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council/section/pre-council/${visualizedCouncil?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPreCouncilSections(data);
    }
    if (visualizedCouncil !== null && (visualizedCouncil as TablePreCouncilRow).status !== "scheduled") {
      fetchPreCouncilSections();
    }    
  }, [visualizedCouncil]);

  return (
    <Box>
      <Title textHighlight="Pré-conselho" />
      <SwapButton
        button1Text={"Adicionar Pré-conselho"}
        button2Text={"Visualizar Pré-conselhos"}
        onClickButton1={() => setIsCreate(true)}
        onClickButton2={() => {
          setIsCreate(false);
          resetInputs();
        }}
      />
      {isCreate ? (
        <CouncilForm
          councilInformation={councilInformation}
          verifyForm={verifyInputs}
          variant="create"
          type="pre-council"
        />
      ) : (
        <>
          <Table
            tableContent={preCouncils}
            headers={headers}
            headerButtons={headerButtons}
            rowButtons={rowButtons}
          />
          <PaginationTable
            count={preCouncils ? preCouncils.totalPages : 0}
            page={preCouncils ? preCouncils.pageable.pageNumber + 1 : 1}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(rowsPerPage: number) => {
              setRowsPerPage(rowsPerPage);
              setPage(1);
            }}
          />
          <CouncilModal
            open={
              visualizedCouncil !== null && 
              (
                (visualizedCouncil as TablePreCouncilRow).status === "scheduled" 
                  || 
                (visualizedCouncil as TablePreCouncilRow).status === "released"
              )
            }
            close={() => setVisualizedCouncil(null)}
            councilInformation={councilInformation}
            confirmFunction={editPreCouncil}
            verifyForm={verifyInputs}
            setEditing={(value: boolean) => setIsEditing(value)}
            editing={isEditing}
            variant="details"
            type="pre-council"
            awaitingAnswer={(visualizedCouncil as TablePreCouncilRow)?.status === "released"}
          />
          <PreCouncilModal 
            open={
              visualizedCouncil !== null && 
              (visualizedCouncil as TablePreCouncilRow)?.status !== "scheduled" &&
              (visualizedCouncil as TablePreCouncilRow)?.status !== "released"
            }
            close={() => setVisualizedCouncil(null)}
            preCouncilSections={preCouncilSections}
            answered={(visualizedCouncil as TablePreCouncilRow)?.answered}
            readOnly={true}
          />
        </>
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

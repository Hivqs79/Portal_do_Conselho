"use client";
import CouncilForm from "@/components/council/CouncilForm";
import SwapButton from "@/components/SwapButton";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import Class from "@/interfaces/Class";
import { TableContent } from "@/interfaces/table/TableContent";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { Teacher } from "@/interfaces/Teacher";
import { Box, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import TableCouncilRow from "@/interfaces/table/row/TableCouncilRow";
import CouncilModal from "@/components/council/CouncilModal";
import { CouncilFormProps } from "@/interfaces/CouncilFormProps";
import { useThemeContext } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/Modals/LoadingModal";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import PaginationTable from "@/components/table/Pagination";

type CouncilStatus = "expired" | "active" | "scheduled";

export default function Council() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classExistents, setClassExistents] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<{
    [key: string]: boolean;
  }>({});
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [councils, setCouncils] = useState<TableContent | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [searchTeachers, setSearchTeachers] = useState<string>("");
  const [searchClass, setSearchClass] = useState<string>("");
  const [visualizedCouncil, setVisualizedCouncil] =
    useState<TableRowPossibleTypes | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { redDanger } = useThemeContext();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rowButtons: TableRowButtons = {
    realizeButton: true,
    visualizeIconButton: true,
    onClickVisualize: (row: TableRowPossibleTypes) => {
      setVisualizedCouncil(row);
      setSelectedClass((row as TableCouncilRow).aclass.id);
      setDate(dayjs((row as TableCouncilRow).startDateTime));
      setTime(dayjs((row as TableCouncilRow).startDateTime));
    },
    onClickRealize: async (row: TableRowPossibleTypes) => {
      if (!verifyCouncil(row)) return;

      setIsLoading(true);
      await modifyCouncilStatus(row.id);
      localStorage.setItem("councilDataInicialize", JSON.stringify(row));
      router.push("/realize-council");
    },
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setSearchClass(term),
    orderButton: true,
    filterButton: true,
  };

  const headers: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Horário" },
  ];

  const processCouncilData = (council: TableCouncilRow): TableCouncilRow => {
    if (!council.startDateTime) return council;

    const now = dayjs();
    const councilDateTime = dayjs(council.startDateTime);
    const toleranceMinutes = 10;
    const minutesDifference = councilDateTime.diff(now, "minute");

    let status: CouncilStatus = "active";
    let buttonText = "Realizar";
    let isDisabled = false;

    if (minutesDifference < -toleranceMinutes) {
      status = "expired";
      buttonText = "Expirado";
      isDisabled = true;
    } else if (minutesDifference > toleranceMinutes) {
      status = "scheduled";
      buttonText = "Agendado";
      isDisabled = true;
    }

    return {
      ...council,
      status,
      buttonText,
      isDisabled,
    };
  };

  const verifyCouncil = (council: TableRowPossibleTypes) => {
    if (!("startDateTime" in council)) {
      setSnackbarMessage("O horário do conselho não foi definido.");
      return false;
    }

    const now = dayjs();
    const councilDateTime = dayjs(council.startDateTime);
    const minutesBeforeAllowed = 10;

    if (councilDateTime.isAfter(now)) {
      const minutesUntilCouncil = councilDateTime.diff(now, "minute");

      if (minutesUntilCouncil > minutesBeforeAllowed) {
        setSnackbarMessage(
          `O conselho ainda não está no horário correto. Você poderá iniciá-lo apenas quando faltar no máximo ${minutesBeforeAllowed} minutos para o horário.`
        );
        return false;
      }

      return true;
    }

    const minutesAfterCouncil = now.diff(councilDateTime, "minute");
    if (minutesAfterCouncil > minutesBeforeAllowed) {
      setSnackbarMessage(
        `O conselho já passou do horário permitido (${minutesBeforeAllowed} minutos de tolerância). Edite-o para um novo horário.`
      );
      return false;
    }

    return true;
  };

  const modifyCouncilStatus = async (id: number) => {
    const response = await fetch("http://localhost:8081/council/modify/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Edited");
  };

  const createCouncil = async () => {
    console.log("testeCreate");
    const response = await fetch("http://localhost:8081/council", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDateTime:
          date?.format("YYYY-MM-DD") + "T" + time?.format("HH:mm:ss"),
        class_id: selectedClass,
        teachers_id: Object.keys(selectedTeachers)
          .filter((id) => selectedTeachers[id])
          .map((id) => parseInt(id)),
      }),
    });
    response.json().then((data) => {
      console.log(data);
      resetInputs();
    });
  };

  const editCouncil = async () => {
    console.log("testeEdit");
    const response = await fetch(
      "http://localhost:8081/council/" + visualizedCouncil?.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDateTime:
            date?.format("YYYY-MM-DD") + "T" + time?.format("HH:mm:ss"),
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

  const resetInputs = () => {
    setDate(null);
    setTime(null);
    setSelectedTeachers({});
    setSearchClass("");
    setSearchTeachers("");
  };

  const verifyInputs = () => {
    const now = dayjs();

    if (!date) {
      setSnackbarMessage("Selecione uma data");
      return false;
    }

    if (!time) {
      setSnackbarMessage("Selecione um horário");
      return false;
    }

    const selectedDateTime = dayjs(date)
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0);

    if (date.isBefore(now, "day")) {
      setSnackbarMessage(
        "Não é possível agendar conselhos para datas passadas"
      );
      return false;
    }

    if (selectedDateTime.isBefore(now.add(5, "minute"))) {
      setSnackbarMessage(
        "O horário deve ser pelo menos 5 minutos após o horário atual"
      );
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

  const councilInformation: CouncilFormProps = {
    visualizedCouncil: visualizedCouncil as TableCouncilRow,
    selectedTeachers: selectedTeachers,
    selectedClass: selectedClass,
    setSelectedTeachers: setSelectedTeachers,
    setSelectedClass: setSelectedClass,
    teachers: teachers,
    classExistents: classExistents,
    setDate: setDate,
    setTime: setTime,
    date: date,
    time: time,
    setSearchTeachers: setSearchTeachers,
    setSearchClass: setSearchClass,
    submitForm: isEditing ? editCouncil : createCouncil,
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(
        "http://localhost:8081/class/teacher/" +
          (selectedClass ? selectedClass : "")
      );
      const data = await response.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, [selectedClass, isCreate]);

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
    const fetchCouncil = async () => {
      const response = await fetch(
        `http://localhost:8081/council?page=${page - 1}&size=${rowsPerPage}&className=${searchClass}`
      );
      const data = await response.json();
      
      setCouncils({
        ...data,
        content: data.content.map(processCouncilData)
      });
    };
    
    fetchCouncil();
  }, [isCreate, isEditing, page, rowsPerPage, searchClass]);

  return (
    <Box>
      <Title textHighlight="Planejamento" text="de conselhos" />
      <SwapButton
        button1Text={"Adicionar Conselho"}
        button2Text={"Realizar Conselho"}
        onClickButton1={() => setIsCreate(true)}
        onClickButton2={() => {
          setIsCreate(false);
          setSearchClass("");
          setSearchTeachers("");
        }}
      />
      {isCreate ? (
        <CouncilForm
          councilInformation={councilInformation}
          verifyForm={verifyInputs}
          variant="create"
        />
      ) : (
        <>
          <Table
            tableContent={councils}
            headers={headers}
            headerButtons={headerButtons}
            rowButtons={rowButtons}
          />
          <PaginationTable
            count={councils ? councils.totalPages : 0}
            page={councils ? councils.pageable.pageNumber + 1 : 1}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(rowsPerPage: number) =>
              setRowsPerPage(rowsPerPage)
            }
          />
          <CouncilModal
            open={visualizedCouncil !== null}
            close={() => setVisualizedCouncil(null)}
            councilInformation={councilInformation}
            confirmFunction={editCouncil}
            verifyForm={verifyInputs}
            setEditing={(value: boolean) => setIsEditing(value)}
            editing={isEditing}
            variant="details"
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

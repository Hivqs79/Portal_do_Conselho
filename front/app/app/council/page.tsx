"use client";
import CouncilForm from "@/components/council/CouncilForm";
import SwapButton from "@/components/SwapButton";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import Class from "@/interfaces/Class";
import { TableContent } from "@/interfaces/TableContent";
import { TableHeaderContent } from "@/interfaces/TableHeaderContent";
import { Teacher } from "@/interfaces/Teacher";
import { Box, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableRowButtons } from "@/interfaces/TableRowButtons";
import { TableHeaderButtons } from "@/interfaces/TableHeaderButtons";
import TableCouncilRow from "@/interfaces/TableCouncilRow";
import CouncilModal from "@/components/council/CouncilModal";
import { CouncilFormProps } from "@/interfaces/CouncilFormProps";
import { useThemeContext } from "@/hooks/useTheme";

export default function Council() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classExistents, setClassExistents] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<{ [key: string]: boolean; }>({});
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [councils, setCouncils] = useState<TableContent>();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [searchTeachers, setSearchTeachers] = useState<string>("");
  const [searchClass, setSearchClass] = useState<string>("");
  const [visualizedCouncil, setVisualizedCouncil] = useState<TableCouncilRow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {redDanger} = useThemeContext();

  const rowButtons: TableRowButtons = {
    realizeButton: true,
    visualizeIconButton: true,
    onClickVisualize: (row: TableCouncilRow) => {
      setVisualizedCouncil(row);
      setSelectedClass(row.aclass.id);
      setDate(dayjs(row.startDateTime));
      setTime(dayjs(row.startDateTime));
    },
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    orderButton: true,
    filterButton: true,
  };

  const headers: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Horário" },
  ];  

  const createCouncil = async () => {
    console.log("testeCreate");
    const response = await fetch("http://localhost:8081/council", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDateTime: date?.format("YYYY-MM-DD") + "T" + time?.format("HH:mm:ss"),
        class_id: selectedClass,
        teachers_id: Object.keys(selectedTeachers).filter((id) => selectedTeachers[id]).map((id) => parseInt(id)),
      }),
    });
    response.json().then((data) => {
      console.log(data);
      resetInputs();
    });
  };  

  const editCouncil = async () => {
    console.log("testeEdit");
    const response = await fetch("http://localhost:8081/council/" + visualizedCouncil?.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDateTime: date?.format("YYYY-MM-DD") + "T" + time?.format("HH:mm:ss"),
        class_id: selectedClass,
        teachers_id: Object.keys(selectedTeachers).filter((id) => selectedTeachers[id]).map((id) => parseInt(id)),
      }),
    });
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
    if (!date || date.isBefore(dayjs())) {
      setSnackbarMessage("Selecione uma data válida");
      return false;
    }
    if (!time) {
      setSnackbarMessage("Selecione um horário");
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
  }

  const councilInformation: CouncilFormProps = {
    visualizedCouncil: visualizedCouncil,
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
    submitForm: isEditing ? editCouncil : createCouncil
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(
        "http://localhost:8081/class/teacher/" + (selectedClass ? selectedClass : "")
      );
      const data = await response.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, [selectedClass, isCreate]);

  useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch(
        "http://localhost:8081/class" + (searchClass ? "?name=" + searchClass : "")
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
        "http://localhost:8081/council"
      );
      const data = await response.json();
      setCouncils(data);
      console.log(data);
    };
    fetchCouncil();
    console.log("teste do council");
  }, [isCreate, isEditing]);

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
            tableContent={councils ? councils : {} as TableContent}
            headers={headers}
            headerButtons={headerButtons}
            rowButtons={rowButtons}
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
    </Box>
  );
}
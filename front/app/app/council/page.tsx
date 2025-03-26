"use client";
import CreateCouncilForm from "@/components/CreateCouncilForm";
import SwapButton from "@/components/SwapButton";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import Class from "@/interfaces/Class";
import { TableContent } from "@/interfaces/TableContent";
import { TableHeaderContent } from "@/interfaces/TableHeaderContent";
import { Teacher } from "@/interfaces/Teacher";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Council() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classExistents, setClassExistents] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<{[key: string]: boolean;}>({});
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs().add(1, "day"));
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs().add(1, "hour"));
  const [councils, setCouncils] = useState<TableContent>();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [searchTeachers, setSearchTeachers] = useState<string>("");
  const [searchClass, setSearchClass] = useState<string>("");

  const rowButtons: TableRowButtons = {
    realizeButton: true,
    visualizeIconButton: true,
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
    const response = await fetch("http://localhost:8081/council", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDateTime: date.add(time.get("hour"), "hour").add(-3, "hour").add(time.get("minute"), "minute").toISOString(),
        class_id: selectedClass,
        teachers_id: Object.keys(selectedTeachers),
      }),
    });
    const data = await response.json();
    console.log(data);    
    resetInputs();
  };

  const resetInputs = () => {
    setDate(dayjs().add(1, "day"));
    setTime(dayjs().add(1, "hour"));
    setSelectedTeachers({});
    setSearchClass("");
    setSearchTeachers("");
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch(
        "http://localhost:8081/class/teacher/" + selectedClass
      );
      const data = await response.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, [selectedClass]);

  useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch(
        "http://localhost:8081/class" + "?name=" + searchClass
      );
      const data = await response.json();
      setSelectedClass(data.content[0] && data.content[0].id);
      setClassExistents(data.content);
    };
    fetchClass();
  }, [searchClass]);

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
  }, []);

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
        <CreateCouncilForm
          selectedTeachers={selectedTeachers}
          selectedClass={selectedClass}
          setSelectedTeachers={setSelectedTeachers}
          setSelectedClass={setSelectedClass}
          teachers={teachers}
          classExistents={classExistents}
          setDate={setDate}
          setTime={setTime}
          date={date}
          time={time}
          setSearchTeachers={setSearchTeachers}
          setSearchClass={setSearchClass}
          submitForm={createCouncil}
        />
      ) : (
        <Table
          tableContent={councils ? councils : {} as TableContent}
          headers={headers}
          headerButtons={headerButtons}
          rowButtons={rowButtons}
        />
      )}
    </Box>
  );
}

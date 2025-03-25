"use client";
import CreateCouncilForm from "@/components/CreateCouncilForm";
import SwapButton from "@/components/SwapButton";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import Class from "@/interfaces/Class";
import { Teacher } from "@/interfaces/Teacher";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Council() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classExistents, setClassExistents] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<{
    [key: string]: boolean;
  }>({});
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs().add(1, "day"));
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs().add(1, "hour"));
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const rowButtons: TableRowButtons = {
		realizeButton: true,
    visualizeIconButton: true,
    rank: true
	}
	const headerButtons: TableHeaderButtons = {
		searchInput: true,
		orderButton: true,
		filterButton: true		
	}

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
      const response = await fetch("http://localhost:8081/class");
      const data = await response.json();
      setSelectedClass(data.content[0].id);
      setClassExistents(data.content);
    };
    fetchClass();
  }, []);

  return (
    <Box>
      <Title textHighlight="Planejamento" text="de conselhos" />
      <SwapButton
        button1Text={"Adicionar Conselho"}
        button2Text={"Realizar Conselho"}
        onClickButton1={() => setIsCreate(true)}
        onClickButton2={() => setIsCreate(false)}
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
        />
      ) : (
        <Table
          content={{
            headers: [
              {
                name: "Turma",
                key: "turmaNome",
              },
              {
                name: "Data",
                key: "data",
              },
              {
                name: "Horário",
                key: "horario",
              },
            ],
            content: [
              {
                turmaNome: "Turma A",
                data: "10/03/2025",
                horario: "8:00",
              },
              {
                turmaNome: "Turma B",
                data: "11/03/2025",
                horario: "8:00",
              },
              {
                turmaNome: "Turma C",
                data: "12/03/2025",
                horario: "8:00",
              },
              {
                turmaNome: "Turma A",
                data: "10/03/2025",
                horario: "8:00",
              },
              {
                turmaNome: "Turma B",
                data: "11/03/2025",
                horario: "8:00",
              },
              {
                turmaNome: "Turma C",
                data: "12/03/2025",
                horario: "8:00",
              },
            ],
            pageable: {
              pageNumber: 0,
              pageSize: 10,
              sort: {
                sorted: false,
                unsorted: true,
                empty: true,
              },
              offset: 0,
              paged: true,
              unpaged: false,
              totalElements: 6,
              totalPages: 1,
              last: true,
              first: true,
              size: 10,
              number: 0,
              numberOfElements: 6,
              empty: false,
            },
          }}          
          headerButtons={headerButtons}
          rowButtons={rowButtons}
        />
      )}
      <Button
        onClick={() => {
          console.log(selectedTeachers);
          console.log(selectedClass);
          console.log(date);
          console.log(time);
        }}
      >
        Teste
      </Button>
    </Box>
  );
}

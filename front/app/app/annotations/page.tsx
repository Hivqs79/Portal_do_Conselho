"use client";
import Title from "@/components/Title";
import Table from "@/components/table/Table";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import { TableContent } from "@/interfaces/table/TableContent";
import { useRoleContext } from "@/hooks/useRole";

export default function Annotations() {
  const [annotations, setAnnotations] = useState<TableContent | null>(null);
  const { userId, role } = useRoleContext();


  const rowButtons: TableRowButtons = {
    annotationButton: true,
    onClickAnnotation: (row: any) => {
      console.log(row);
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

  useEffect(() => {
    const fetchAnnotations = async () => {
      const response = await fetch("http://localhost:8081/annotations/class?teacherId=" + userId);
      const data = await response.json();
      setAnnotations(data);
      console.log(data);
    };
    fetchAnnotations();
  }, [userId]);

  return (
    <Box>
      <Title textHighlight="Anotações" text="para os conselhos" />
      <Table
        headers={headers}
        rowButtons={rowButtons}
        headerButtons={headerButtons}
        tableContent={annotations}
      />
    </Box>
  );
}

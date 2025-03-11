"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TableRow from "./TableRow";
import { useThemeContext } from "@/hooks/useTheme";
import TableHeader from "./TableHeader";
import { TableContent } from "@/interfaces/TableContent";

const tableContent: TableContent = {
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
  rows: [
    {
      turmaNome: "Turma A",
      data: "10/03/2025",
      horario: "08:00",
      rank: "excellent",            
    },
    {
      turmaNome: "Turma B",
      data: "11/03/2025",
      horario: "09:30",
      rank: "good",            
    },
    {
      turmaNome: "Turma C",
      data: "12/03/2025",
      horario: "14:00",
      rank: "average",            
    },
    {
      turmaNome: "Turma A",
      data: "10/03/2025",
      horario: "08:00",
      rank: "excellent",            
    },
    {
      turmaNome: "Turma B",
      data: "11/03/2025",
      horario: "09:30",
      rank: "critical",            
    },
    {
      turmaNome: "Turma C",
      data: "12/03/2025",
      horario: "14:00",
      rank: "average",            
    },
  ],
};

export default function Table() {
  const { primaryColor } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = tableContent.rows.filter((row) =>
    row.turmaNome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex justify-center items-start overflow-hidden outline-component">
      <Box
        style={{ borderColor: primaryColor }}
        className="flex justify-center items-start flex-col border-[2px] rounded-big w-full max-w-full"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full max-w-full">
            <TableHeader variant="Table" headers={tableContent.headers} setSearchTerm={setSearchTerm} searchInput={true} filterButton={true} orderButton={true} />
            <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, index) => {
                    row.className = (index === 0 ? "border-t-0 " : "border-t-2 ");
                      return (
                        <TableRow
                          key={index}
                          content={row}
                        />
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center">
                      <Typography variant="h6_title" color="primary">
                          Nenhum item encontrado.
                      </Typography>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </Box>
    </div>
  );
}
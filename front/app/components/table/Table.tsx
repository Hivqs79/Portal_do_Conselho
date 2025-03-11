"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TableRow from "./TableRow";
import { useThemeContext } from "@/hooks/useTheme";
import { TableRowProps } from "@/interfaces/TableRowProps";
import TableHeader from "./TableHeader";

interface TableProps {
  variant: "primary" | "secondary";
}

export default function Table({ variant }: TableProps) {
  const { primaryColor } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");

  const tableRows: TableRowProps[] = [
    {
      variant: "primary",
      user: "class",
      turmaNome: "AI PSIN 2023/2 INT1",
      rank: "otimo",
      data: "10/03/2025",
      horario: "08:00",
    },
    {
      variant: "primary",
      user: "class",
      turmaNome: "Turma B",
      rank: "bom",
      data: "11/03/2025",
      horario: "09:30",
    },
    {
      variant: "primary",
      user: "class",
      turmaNome: "Turma C",
      rank: "mediano",
      data: "12/03/2025",
      horario: "14:00",
    },
    {
      variant: "primary",
      user: "class",
      turmaNome: "Turma A",
      rank: "otimo",
      data: "10/03/2025",
      horario: "08:00",
    },
    {
      variant: "primary",
      user: "class",
      turmaNome: "Turma B",
      rank: "critico",
      data: "11/03/2025",
      horario: "09:30",
    },
    {
      variant: "primary",
      user: "class",
      turmaNome: "Turma C",
      rank: "mediano",
      data: "12/03/2025",
      horario: "14:00",
    },
  ];

  const filteredRows = tableRows.filter((row) =>
    row.turmaNome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (variant === "primary") {
    return (
      <div className="w-full flex justify-center items-start">
        <Box
          style={{ borderColor: primaryColor }}
          className="flex justify-center items-start flex-col border-[2px] overflow-hidden rounded-big w-full max-w-full"
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full max-w-full">
              <TableHeader variant="Table" setSearchTerm={setSearchTerm} />
              <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, index) => (
                    <TableRow
                      key={index}
                      variant={row.variant}
                      user={row.user}
                      rank={row.rank}
                      turmaNome={row.turmaNome}
                      data={row.data}
                      horario={row.horario}
                      className={`
                        ${index === 0 ? "border-t-0" : "border-t-2"}
                      `}
                    />
                  ))
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
}
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
    { variant: "primary", user: "class", turmaNome: "Turma A", rank: "otimo" },
    { variant: "primary", user: "class", turmaNome: "Turma B", rank: "bom" },
    { variant: "primary", user: "class", turmaNome: "Turma C", rank: "mediano" },
    { variant: "primary", user: "class", turmaNome: "Turma D", rank: "bom" },
    { variant: "primary", user: "class", turmaNome: "Turma E", rank: "bom" },
    { variant: "primary", user: "class", turmaNome: "Turma F", rank: "bom" },
    { variant: "primary", user: "class", turmaNome: "Turma G", rank: "mediano" },
    { variant: "primary", user: "class", turmaNome: "Turma H", rank: "critico" },
    { variant: "primary", user: "class", turmaNome: "Turma I", rank: "bom" },
  ];

  // Filtra os resultados baseando-se no nome da turma
  const filteredRows = tableRows.filter((row) =>
    row.turmaNome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (variant === "primary") {
    return (
      <div className="w-screen flex justify-center items-start">
        <Box
          style={{ borderColor: primaryColor }}
          className="flex justify-center items-start flex-col border-[2px] overflow-hidden rounded-big max-w-[1024px] mx-10"
        >
          <TableHeader setSearchTerm={setSearchTerm} />
          {filteredRows.length > 0 ? (
            filteredRows.map((row, index) => (
              <TableRow
                key={index}
                variant={row.variant}
                user={row.user}
                rank={row.rank}
                turmaNome={row.turmaNome}
                className={`${
                  index === 0
                    ? "border-t-0"
                    : index === filteredRows.length - 1
                    ? "rounded-b-big border-t-2"
                    : "border-t-2"
                }`}
              />
            ))
          ) : (
            <div className="p-4 w-screen max-w-[100%] text-center">
              <Typography variant="h6_title" color="primary">
                Nenhum item encontrado.
              </Typography>
            </div>
          )}
        </Box>
      </div>
    );
  }
}

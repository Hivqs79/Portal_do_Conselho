"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TableRow from "./TableRow";
import { useThemeContext } from "@/hooks/useTheme";
import TableHeader from "./TableHeader";
import { TableContent } from "@/interfaces/TableContent";

interface TableProps {
  content: TableContent,
  searchInput?: boolean,
  filterButton?: boolean,
  orderButton?: boolean,
  rank?: boolean;
  realizeButton?: boolean;
  visualizeIconButton?: boolean;
  visualizeButton?: boolean;
  editButton?: boolean;
}

export default function Table({ 
  content, 
  searchInput = false, 
  filterButton = false, 
  orderButton = false, 
  rank = false, 
  realizeButton = false, 
  visualizeIconButton = false, 
  visualizeButton = false,
  editButton = false
}: TableProps) {
  const { primaryColor } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");  

  const filteredRows = content.rows.filter((row) =>
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
            <TableHeader 
              variant="Table" 
              headers={content.headers} 
              setSearchTerm={setSearchTerm} 
              searchInput={searchInput} 
              filterButton={filterButton} 
              orderButton={orderButton} 
            />
            <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, index) => {
                    row.className = (index === 0 ? "border-t-0 " : "border-t-2 ");
                      return (
                        <TableRow
                          key={index}
                          content={row}
                          rank={rank}
                          realizeButton={realizeButton}
                          visualizeIconButton={visualizeIconButton}
                          visualizeButton={visualizeButton}
                          editButton={editButton}
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
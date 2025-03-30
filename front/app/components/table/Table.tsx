"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TableRow from "./TableRow";
import { useThemeContext } from "@/hooks/useTheme";
import TableHeader from "./TableHeader";
import { TableContent } from "@/interfaces/TableContent";
import { TableRowContent } from "@/interfaces/TableRowContent";
import { TableHeaderContent } from "@/interfaces/TableHeaderContent";
import TableCouncilRow from "@/interfaces/TableCouncilRow";
import { TableHeaderButtons } from "@/interfaces/TableHeaderButtons";
import { TableRowButtons } from "@/interfaces/TableRowButtons";

interface TableProps {
  tableContent: TableContent,
  headers: TableHeaderContent[],
  headerButtons?: TableHeaderButtons,
  rowButtons?: TableRowButtons,
}

export default function Table({ 
  tableContent, 
  headers,
  headerButtons ={},
  rowButtons = {}
}: TableProps) {
  const { primaryColor } = useThemeContext();
  const [search, setSearch] = useState("");    
  headerButtons.setSearch = setSearch;
  headerButtons.searchValue = search;
  
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
              headers={headers} 
              headerButtons={headerButtons}
            />
            <tbody>
                {tableContent.content.length > 0 ? (
                  tableContent.content.map((row : TableCouncilRow, index) => {
                    row.className = (index === 0 ? "border-t-0 " : "border-t-2 ");
                      return (
                        <TableRow
                          key={index}
                          content={row}
                          rowButtons={rowButtons}
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
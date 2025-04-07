"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TableRow from "./TableRow";
import { useThemeContext } from "@/hooks/useTheme";
import TableHeader from "./TableHeader";
import { TableContent } from "@/interfaces/table/TableContent";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";

interface TableProps {
  tableContent: TableContent | null,
  headers: TableHeaderContent[],
  headerButtons?: TableHeaderButtons,
  rowButtons?: TableRowButtons,
  withoutOutline?: boolean,
}

export default function Table({
  tableContent,
  headers,
  headerButtons = {},
  rowButtons = {},
  withoutOutline = false
}: TableProps) {
  const { colorByModeSecondary } = useThemeContext();
  
  return (
    <div className={"w-full flex justify-center items-start overflow-hidden " + (withoutOutline ? "" : "outline-component")}>
      <Box
        style={{ boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}` }}
        className="flex justify-center items-start rounded-b-big z-10 flex-col w-full max-w-full"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full max-w-full rounded-t-2xl">
            <TableHeader
              variant="table"
              headers={headers}
              headerButtons={headerButtons}
            />
            <tbody>
              {tableContent && tableContent.content.length > 0 ? (
                tableContent.content.map((row: TableRowPossibleTypes, index) => {
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
/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
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
    <div className={"w-full flex justify-center items-start overflow-hidden " + (withoutOutline ? "rounded-big" : "outline-component")}>
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
              {(tableContent && tableContent.content && tableContent.content.length > 0) ? (
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
                    <Typography variant="xl_text_regular">
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
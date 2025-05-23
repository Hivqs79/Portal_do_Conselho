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
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Modal, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import AvaliationInputs from "../council/AvaliationInputs";
import TableHeader from "../table/TableHeader";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import AccordionTable from "../table/AccordionTable";

interface AnnotationsModalProps {
  open: boolean;
  close: () => void;
  variant?: string;
  classPositiveContent: string;
  setClassPositiveContent?: (content: string) => void;
  classNegativeContent: string;
  setClassNegativeContent?: (content: string) => void;
  headersClass: TableHeaderContent[];
  headerButtonsClass: TableHeaderButtons;
  contentStudent: TableRowPossibleTypes[] | null;
  headersStudent: TableHeaderContent[];
  rowButtonsStudent: TableRowButtons;
  headerButtonsStudent: TableHeaderButtons;
  readOnly?: boolean;
}
export default function AnnotationsModal({
  open,
  close,
  variant,
  classPositiveContent,
  setClassPositiveContent,
  classNegativeContent,
  setClassNegativeContent,
  headersClass,
  headerButtonsClass,
  contentStudent,
  headersStudent,
  headerButtonsStudent,
  rowButtonsStudent,
  readOnly = false,
}: AnnotationsModalProps) {
  const { colorByModeSecondary, redDanger, backgroundColor } =
    useThemeContext();

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
      }}
      className="flex items-center justify-center"
    >
      <Box
        className="py-2 px-4 z-50 mx-4 sm:mx-16 w-full max-w-[950px] rounded-big mt-24"
        style={{ backgroundColor: backgroundColor }}
      >
        <Box className="flex flex-col w-full max-h-[80vh] p-6 overflow-y-auto gap-10">
          <Box className="flex items-center flex-row w-full">
            <Box className="flex flex-col w-full">
              <Typography variant="xl_text_bold" color={colorByModeSecondary}>
                Anotações do conselho
              </Typography>
            </Box>
            <Box className="flex w-fit h-fit gap-1">
              <Box
                onClick={() => {
                  close();
                }}
              >
                <Icon
                  IconPassed={IoClose}
                  color={redDanger}
                  className="size-10"
                />
              </Box>
            </Box>
          </Box>
          <Box className="outline-component">
            <table className="w-full rounded-t-2xl overflow-hidden">
              <TableHeader
                variant="annotation"
                headers={headersClass}
                headerButtons={headerButtonsClass}
              />
            </table>
            <Box
              style={{ borderColor: colorByModeSecondary }}
              className="flex flex-col border-[2px] border-t-0 rounded-b-2xl"
            >
              <AvaliationInputs
                readOnly={variant !== "annotations" || readOnly}
                Positivecontent={classPositiveContent}
                Negativecontent={classNegativeContent}
                onPositiveChange={setClassPositiveContent}
                onNegativeChange={setClassNegativeContent}
                copyButton={true}
                withoutBorder={true}
              />
              <Box className="p-5">                
                <AccordionTable
                  variant={variant === "feedback" ? "feedback" : "annotation"}
                  headers={headersStudent}
                  headerButtons={headerButtonsStudent}
                  rowButtons={rowButtonsStudent}
                  content={contentStudent}
                  readOnly={readOnly}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

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

import { Box, Modal, Typography } from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { useThemeContext } from "@/hooks/useTheme";
import PreCouncilSection from "@/interfaces/pre-council/PreCouncilSection";
import AccordionTable from "../table/AccordionTable";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import FeedbackUser from "@/interfaces/feedback/FeedbackUser";

interface PreCouncilModalProps {
  open: boolean;
  close: () => void;
  answered?: boolean;
  preCouncilSections: PreCouncilSection[] | FeedbackUser[];
  readOnly?: boolean;
  rowButtons?: TableRowButtons;
  message?: string;
}

export default function PreCouncilModal({
  open,
  close,
  answered = true,
  preCouncilSections,
  readOnly = false,
  rowButtons = {},
  message,
}: PreCouncilModalProps) {
  const { backgroundColor, redDanger, colorByModeSecondary } = useThemeContext();

  const headers: TableHeaderContent[] = [
    { name: "Seções" },
  ];

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
      }}
      className="flex items-center justify-center"
    >
      <Box
        className={`py-2 px-4 z-50 mx-4 sm:mx-16 mt-28 w-full rounded-big  ${answered ? "max-w-[1000px]" : "max-w-[600px]"}`}
        style={{ backgroundColor: backgroundColor }}
      >
        <Box className="flex flex-col w-full max-h-[80vh] overflow-y-auto p-2 sm:p-4 gap-10">
          <Box className="flex items-center flex-row w-full">
            <Box className="flex flex-col w-full mr-4">
              <Typography variant="xl_text_bold" color={colorByModeSecondary}>
                Detalhes do pré-conselho
              </Typography>
            </Box>
            <Box className="flex w-fit h-fit gap-1">
              <Box
                onClick={() => { close(); }}
              >
                <Icon
                  IconPassed={IoClose}
                  color={redDanger}
                  className="size-10"
                />
              </Box>
            </Box>
          </Box>

          {message &&
            <Typography variant="md_text_regular">
              {message}
            </Typography>
          }
          {answered ? (
            <AccordionTable
              variant="pre-council"
              headers={headers}
              headerButtons={[] as TableHeaderButtons}
              rowButtons={rowButtons}
              content={preCouncilSections}
              readOnly={readOnly}
            />
          ) : (
            <Typography variant="md_text_bold" color={redDanger}>
              {`O pré-conselho não respondido pela turma ${preCouncilSections[0]?.preCouncil.aclass.name} durante o tempo de resposta`}
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
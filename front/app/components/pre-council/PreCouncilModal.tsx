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
}

export default function PreCouncilModal({
  open,
  close,
  answered = true,
  preCouncilSections,
  readOnly = false,
  rowButtons = {},
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
        className={`py-2 px-4 z-50 mx-4 sm:mx-16 w-full rounded-big mt-24 ${answered ? "max-w-[1000px]" : "max-w-[600px]"}`}
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
        </Box>
        <Box className="flex flex-col p-2 sm:p-4">
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
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Modal, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import AvaliationInputs from "../council/AvaliationInputs";

interface AnnotationsModalProps {
  open: boolean;
  close: () => void;
  variant: string;
}
export default function AnnotationsModal({
  open,
  close,
  variant,
}: AnnotationsModalProps) {
  const { colorByModeSecondary, redDanger } = useThemeContext();

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
      }}
      className="flex items-center justify-center"
    >
      <Box className="flex flex-col w-full max-h-[80vh] overflow-y-auto p-8 gap-10">
        <Box className="flex flex-row w-full">
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
        <AvaliationInputs
            writeOnly={variant !== "annotations"}
            Positivecontent="Teste"
            Negativecontent="Teste"
            onPositiveChange={() => {}}
            onNegativeChange={() => {}}
        />

        
      </Box>
    </Modal>
  );
}

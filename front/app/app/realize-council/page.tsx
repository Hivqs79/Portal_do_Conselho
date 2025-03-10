"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import hexToRGBA from "@/hooks/hexToRGBA";
import { useThemeContext } from "@/hooks/useTheme";
import { Box } from "@mui/material";

export default function RealizeCouncil() {
  const { constrastColor, backgroundColor, primaryColor } = useThemeContext();
  return (
    <Box>
      <Title textHighlight="Conselho" text="da turma:" />
      <Box
        className="mt-[72px] rounded-big p-2 m-0 flex justify-center items-center"
        bgcolor={hexToRGBA(constrastColor, 0.1)}
      >
        <Box borderColor={primaryColor} className="rounded-big border-2 w-full p-2 m-0" bgcolor={backgroundColor}>
          <Box
            style={{ borderColor: primaryColor }}
            className="w-full overflow-hidden rounded-t-big"
          >
            <table className="p-0 m-0 w-full">
              <TableHeader variant="council" />
            </table>
            <AvaliationInputs />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

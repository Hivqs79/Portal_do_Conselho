"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import StudentCouncilForm from "@/components/StudentCouncilForm";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import hexToRGBA from "@/hooks/hexToRGBA";
import { useThemeContext } from "@/hooks/useTheme";
import { Box } from "@mui/material";

export default function RealizeCouncil() {
  const students = [
    {
      name: "Pedro Henrique Panstein",
      frequencia: 90.12,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "excellent",
    },
    {
      name: "Pedro Augusto Wilhelm",
      frequencia: 90.12,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "excellent",
    },
    {
      name: "Mateus Henrique Bosquetti",
      frequencia: 90.12,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "excellent",
    },
    {
      name: "Vinícius Eduardo dos Santos",
      frequencia: 90.12,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "excellent",
    },
    {
      name: "Kauan Eggert",
      frequencia: 90.12,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "excellent",
    },
  ];

  const { constrastColor, backgroundColor, primaryColor } = useThemeContext();
  return (
    <Box>
      <Title textHighlight="Conselho" text="da turma:" />
      <Box
        className=" rounded-big p-2 m-0 flex justify-center items-center"
        bgcolor={hexToRGBA(constrastColor, 0.1)}
      >
        <Box
          borderColor={primaryColor}
          className="rounded-big border-2 w-full p-2 m-0"
          bgcolor={backgroundColor}
        >
          <Box
            style={{ borderColor: primaryColor }}
            className="w-full overflow-hidden rounded-t-big flex flex-col gap-6"
          >
            <div>
              <table className="p-0 m-0 w-full">
                <TableHeader variant="council" />
              </table>
              <AvaliationInputs
                wrtiteOnly={false}
                Positivecontent="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, itaque! Exercitationem, dolore consectetur cupiditate ab maiores impedit facere ad tempore quod, odit rerum consequatur perferendis."
                Negativecontent="Este aluno precisa melhorar em algumas coisas"
              />
            </div>
            <div>
              <StudentCouncilForm
                student="Pedro Henrique Panstein"
                frequencia={90.12}
                comments="teste"
                negativeContent=""
                positiveContent=""
                rank="excellent"
              />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

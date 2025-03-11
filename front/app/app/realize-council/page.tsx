"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import StudentCouncilForm from "@/components/StudentCouncilForm";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import hexToRGBA from "@/hooks/hexToRGBA";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

type StudentType = {
  name: string;
  frequencia: number;
  comments: string;
  negativeContent: string;
  positiveContent: string;
  rank: "excellent" | "good" | "average" | "critical" | "none";
};

export default function RealizeCouncil() {
  const students: StudentType[] = [
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
      frequencia: 80.95,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "good",
    },
    {
      name: "Mateus Henrique Bosquetti",
      frequencia: 86.0,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "average",
    },
    {
      name: "Vinícius Eduardo dos Santos",
      frequencia: 65.27,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "critical",
    },
    {
      name: "Kauan Eggert",
      frequencia: 96.78,
      comments: "teste",
      negativeContent: "",
      positiveContent: "",
      rank: "none",
    },
  ];

  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  const handleNextStudent = () => {
    setCurrentStudentIndex((prevIndex) => (prevIndex + 1) % students.length);
  };

  const handlePreviousStudent = () => {
    setCurrentStudentIndex((prevIndex) =>
      prevIndex === 0 ? students.length - 1 : prevIndex - 1
    );
  };

  const { constrastColor, backgroundColor, primaryColor, whiteColor } =
    useThemeContext();

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
                student={students[currentStudentIndex].name}
                frequencia={students[currentStudentIndex].frequencia}
                comments={students[currentStudentIndex].comments}
                negativeContent={students[currentStudentIndex].negativeContent}
                positiveContent={students[currentStudentIndex].positiveContent}
                rank={students[currentStudentIndex].rank}
                onNext={handleNextStudent}
                onPrevious={handlePreviousStudent}
              />
            </div>
          </Box>
          <Button className="w-full !mt-3 !rounded-normal" variant="contained" color="primary">
            <Typography variant="lg_text_bold" color={whiteColor}>
              Terminar Conselho
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

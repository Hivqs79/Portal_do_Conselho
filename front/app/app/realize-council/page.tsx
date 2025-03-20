"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import CommentariesModal from "@/components/Modals/CommentariesModal";
import ConfirmChanges from "@/components/Modals/ConfirmChanges";
import StudentCouncilForm from "@/components/StudentCouncilForm";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import { Decryptor } from "@/encryption/Decryptor";
import { Encryptor } from "@/encryption/Encryptor";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type UserComment = {
  name: string;
  rank: string;
  positiveContent: string;
  negativeContent: string;
};

type User = {
  name: string;
  frequencia?: number;
  imageKey: string;
  rank?: string;
  comments: UserComment[];
};

type CouncilClass = {
  name: string;
  teacherAnotations: TeacherAnnotation[];
};

type CouncilData = {
  ["council-form"]: {
    class: CouncilClass;
    users: User[];
  };
};

export default function RealizeCouncil() {
  const [data, setData] = useState<CouncilData | null>(null);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [positiveContent, setPositiveContent] = useState("");
  const [negativeContent, setNegativeContent] = useState("");

  const [positiveClassContent, setPositiveClassContent] = useState("");
  const [negativeClassContent, setNegativeClassContent] = useState("");
  const [actualRank, setActualRank] = useState<
    "none" | "average" | "excellent" | "good" | "critical"
  >("none");

  const [isModalTeacherOpen, setIsModalTeacherOpen] = useState(false);
  const [isModalStudentOpen, setIsModalStudentOpen] = useState(false);
  const [isUniversalModalOpen, setIsUniversalModalOpen] = useState(false);
  const {
    constrastColor,
    backgroundColor,
    colorByModeSecondary,
    whiteColor,
    textBlackolor,
  } = useThemeContext();

  useEffect(() => {
    const fetchCouncilContent = async () => {
      const response = await fetch("http://localhost:3030/studentCouncil");
      const result: CouncilData = await response.json();
      setData(result);
    };

    fetchCouncilContent();
  }, []);

  const getDecryptedData = (key: string): string => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = Decryptor(encryptedData);
      return decryptedData ? decryptedData[key] : "";
    }
    return "";
  };

  const saveEncryptedData = (key: string, value: string) => {
    const encryptedData = Encryptor({ [key]: value });
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    const savedPositiveContent = getDecryptedData("positiveContent");
    const savedNegativeContent = getDecryptedData("negativeContent");

    if (savedPositiveContent) {
      setPositiveClassContent(savedPositiveContent);
    }

    if (savedNegativeContent) {
      setNegativeClassContent(savedNegativeContent);
    }
  }, []);

  const handlePositiveChange = (content: string) => {
    setPositiveClassContent(content);
    saveEncryptedData("positiveContent", content);
  };

  const handleNegativeChange = (content: string) => {
    setNegativeClassContent(content);
    saveEncryptedData("negativeContent", content);
  };

  const handleRankChange = (rank: string) => {
    setActualRank(
      rank as "none" | "average" | "excellent" | "good" | "critical"
    );
    saveEncryptedData("rank", rank);
  };

  const handleNextStudent = () => {
    if (data !== null) {
      setCurrentStudentIndex(
        (prevIndex) => (prevIndex + 1) % data["council-form"].users.length
      );
    }
  };

  const handlePreviousStudent = () => {
    if (data !== null) {
      setCurrentStudentIndex((prevIndex) =>
        prevIndex === 0 ? data["council-form"].users.length - 1 : prevIndex - 1
      );
    }
  };

  const openTeacherModal = () => {
    setIsModalTeacherOpen(true);
  };

  const closeTeacherModal = () => {
    setIsModalTeacherOpen(false);
  };

  const openStudentModal = () => {
    setIsModalStudentOpen(true);
  };

  const closeStudentModal = () => {
    setIsModalStudentOpen(false);
  };

  function finalizeCouncil() {
    const ClassRank = getDecryptedData("rank");
    const ClassnegativeContent = getDecryptedData("negativeContent");
    const ClasspositiveContent = getDecryptedData("positiveContent");

    let studentsData: { [key: string]: any } = {};
    let councilClassName: string = "";

    const savedData = localStorage.getItem("studentsData");
    if (savedData) {
      const decryptedData = Decryptor(savedData);
      if (decryptedData) {
        studentsData = decryptedData;
      } else {
        studentsData = [];
      }
    }

    if (data) {
      councilClassName = data["council-form"].class.name;
      if (
        ClassRank === "none" ||
        ClassnegativeContent === "" ||
        ClasspositiveContent === ""
      ) {
        console.log("Você deve preencher todos os campos da turma!");
        return;
      }

      for (let i = 0; i < data["council-form"].users.length; i++) {
        const userName = data["council-form"].users[i].name;
        if (studentsData[userName] === undefined) {
          console.log("Você deve preencer o aluno: ", userName);
          return;
        } else if (
          studentsData[userName].frequencia === 0 ||
          studentsData[userName].rank === "none" ||
          studentsData[userName].positiveContent === "" ||
          studentsData[userName].negativeContent === ""
        ) {
          console.log("Aluno incompleto: ", userName);
          return;
        }
      }
      console.log("Conselho finalizado com sucesso!");
      console.log("data: ", data);
      console.log(
        "Final json: ",
        formatFinalCouncilJson(
          ClassRank,
          ClassnegativeContent,
          ClasspositiveContent,
          studentsData,
          councilClassName
        )
      );
      return;
    }
  }

  function cancelCouncil() {
    setIsUniversalModalOpen(true);
  }

  function formatFinalCouncilJson(
    ClassRank: string,
    ClassnegativeContent: string,
    ClasspositiveContent: string,
    studentsData: { [key: string]: any },
    councilClassName: string
  ): any {
    const studentsArray = Object.keys(studentsData).map((studentName) => {
      return {
        name: studentName,
        frequencia: studentsData[studentName].frequencia,
        rank: studentsData[studentName].rank,
        positiveContent: studentsData[studentName].positiveContent,
        negativeContent: studentsData[studentName].negativeContent,
      };
    });

    const formattedData = {
      "council-form": {
        class: {
          name: councilClassName,
          ClassRank: ClassRank,
          ClassnegativeContent: ClassnegativeContent,
          ClasspositiveContent: ClasspositiveContent,
        },
        users: studentsArray,
      },
    };

    return formattedData;
  }

  function verifyRank() {
    if (data) {
      const rank = data["council-form"].users[currentStudentIndex].rank;
      if (rank === undefined || rank === null) {
        return "none";
      }
      return rank as "none" | "average" | "excellent" | "good" | "critical";
    }
    return "none";
  }

  function verifyFrequency() {
    if (data) {
      const frequency =
        data["council-form"].users[currentStudentIndex].frequencia;
      if (frequency === undefined || frequency === null) {
        return 0;
      }
      return frequency;
    }
    return 0;
  }

  const closeUniversalModal = () => {
    setIsUniversalModalOpen(false);
  };

  return (
    <Box>
      <Title
        textHighlight="Conselho"
        text={`da turma: ${data ? data["council-form"].class.name : ""}`}
      />
      <Box
        className={`rounded-big m-0 flex justify-center items-center outline-[16px] outline`}
        style={{ outlineColor: OpacityHex(constrastColor, 0.1) }}
      >
        <Box
          borderColor={colorByModeSecondary}
          className="rounded-big border-2 w-full p-5 m-0"
          bgcolor={backgroundColor}
        >
          <Box
            style={{ borderColor: colorByModeSecondary }}
            className="w-full overflow-hidden rounded-t-big flex flex-col gap-6"
          >
            <div>
              <table className="p-0 m-0 w-full">
                <TableHeader
                  variant="council"
                  headers={[]}
                  headerButtons={{
                    onChangeRank: handleRankChange,
                  }}
                  openCommentsModal={openTeacherModal}
                  data={actualRank}
                />
              </table>
              <AvaliationInputs
                writeOnly={false}
                Positivecontent={positiveClassContent}
                Negativecontent={negativeClassContent}
                onPositiveChange={handlePositiveChange}
                onNegativeChange={handleNegativeChange}
              />
            </div>
            <div>
              <StudentCouncilForm
                student={
                  data
                    ? data["council-form"].users[currentStudentIndex].name
                    : ""
                }
                frequencia={verifyFrequency()}
                comments=""
                negativeContent={negativeContent}
                positiveContent={positiveContent}
                rank={verifyRank()}
                onNext={handleNextStudent}
                onPrevious={handlePreviousStudent}
                openCommentsModal={openStudentModal}
                imageKey={
                  data
                    ? data["council-form"].users[currentStudentIndex].imageKey
                    : ""
                }
              />
            </div>
          </Box>
          <Box className="flex gap-10">
            <Button
              className="w-full !mt-5 !rounded-normal"
              variant="contained"
              color="terciary"
              onClick={() => cancelCouncil()}
            >
              <Typography variant="lg_text_bold" color={textBlackolor}>
                Cancelar Conselho
              </Typography>
            </Button>
            <Button
              className="w-full !mt-5 !rounded-normal"
              variant="contained"
              color="primary"
              onClick={() => finalizeCouncil()}
            >
              <Typography variant="lg_text_bold" color={whiteColor}>
                Terminar Conselho
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      {isModalTeacherOpen && (
        <CommentariesModal
          anotations={data ? data["council-form"].class.teacherAnotations : []}
          student={false}
          name={data ? data["council-form"].class.name : ""}
          onClose={closeTeacherModal}
        />
      )}
      {isModalStudentOpen && (
        <CommentariesModal
          anotations={
            data ? data["council-form"].users[currentStudentIndex].comments : []
          }
          student={true}
          name={
            data ? data["council-form"].users[currentStudentIndex].name : ""
          }
          onClose={closeStudentModal}
        />
      )}
      {isUniversalModalOpen && (
        <ConfirmChanges
          title="Cancelar Conselho"
          confirmText="Confirmar cancelamento do conselho atual"
          secondDescription="Para você cancelar o conselho, voce precisa escrever a frase abaixo no campo de texto para confirmar o cancelamento do conselho atual"
          confirmColor="green"
          description="Você tem certeza que deseja cancelar este conselho? Ao fazer isso ele voltará para a lista de conselhos a fazer e todo o progresso será perdido."
          onClose={closeUniversalModal}
        />
      )}
    </Box>
  );
}

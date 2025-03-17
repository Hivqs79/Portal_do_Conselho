"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import CommentariesModal from "@/components/Modals/CommentariesModal";
import StudentCouncilForm from "@/components/StudentCouncilForm";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import { Decryptor } from "@/encryption/Decryptor";
import { Encryptor } from "@/encryption/Encryptor";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type TeacherAnnotation = {
  name: string;
  rank?: string;
  positiveContent: string;
  negativeContent: string;
};

type UserComment = {
  name: string;
  rank?: string;
  positiveContent: string;
  negativeContent: string;
};

type User = {
  name: string;
  frequencia: number;
  imageKey: string;
  negativeContent: string;
  positiveContent: string;
  rank: string;
  comments: UserComment[];
};

type CouncilClass = {
  name: string;
  positiveContent: string;
  negativeContent: string;
  rank: string;
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

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // console.log("handle: " + rank)
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

  const { constrastColor, backgroundColor, primaryColor, whiteColor } =
    useThemeContext();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Title
        textHighlight="Conselho"
        text={`da turma: ${data ? data["council-form"].class.name : ""}`}
      />
      <Box
        className="rounded-big m-0 flex justify-center items-center outline-[16px] outline"
        style={{ outlineColor: OpacityHex(constrastColor, 0.1) }}
      >
        <Box
          borderColor={primaryColor}
          className="rounded-big border-2 w-full p-5 m-0"
          bgcolor={backgroundColor}
        >
          <Box
            style={{ borderColor: primaryColor }}
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
                  openCommentsModal={openModal}
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
                frequencia={
                  data
                    ? data["council-form"].users[currentStudentIndex].frequencia
                    : 0
                }
                comments=""
                negativeContent={negativeContent}
                positiveContent={positiveContent}
                rank={
                  data
                    ? (data["council-form"].users[currentStudentIndex].rank as
                        | "none"
                        | "average"
                        | "excellent"
                        | "good"
                        | "critical")
                    : "none"
                }
                onNext={handleNextStudent}
                onPrevious={handlePreviousStudent}
              />
            </div>
          </Box>
          <Button
            className="w-full !mt-5 !rounded-normal"
            variant="contained"
            color="primary"
          >
            <Typography variant="lg_text_bold" color={whiteColor}>
              Terminar Conselho
            </Typography>
          </Button>
        </Box>
      </Box>
      {isModalOpen && <CommentariesModal onClose={closeModal} />}
    </Box>
  );
}

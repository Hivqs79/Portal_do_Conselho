"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import StudentCouncilForm from "@/components/StudentCouncilForm";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import { Decryptor } from "@/encryption/Decryptor";
import { Encryptor } from "@/encryption/Encryptor";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import testeJson from "@/teste.json";

export default function RealizeCouncil() {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [positiveContent, setPositiveContent] = useState("");
  const [negativeContent, setNegativeContent] = useState("");

  const [positiveClassContent, setPositiveClassContent] = useState("");
  const [negativeClassContent, setNegativeClassContent] = useState("");

  const [actualRank, setActualRank] = useState("none");

  // Função para descriptografar dados do localStorage
  const getDecryptedData = (key: string): string => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = Decryptor(encryptedData);
      return decryptedData ? decryptedData[key] : "";
    }
    return "";
  };

  // Função para criptografar e salvar dados no localStorage
  const saveEncryptedData = (key: string, value: string) => {
    const encryptedData = Encryptor({ [key]: value });
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    // Recupera e descriptografa os dados do localStorage ao montar o componente
    const savedPositiveContent = getDecryptedData("positiveContent");
    const savedNegativeContent = getDecryptedData("negativeContent");
    const savedRank = getDecryptedData("rank");

    if (savedRank) {
      setActualRank(savedRank); // Define o estado com o valor recuperado
    }

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
    setActualRank(rank);
    saveEncryptedData("rank", rank);
  };

  const handleNextStudent = () => {
    setCurrentStudentIndex(
      (prevIndex) => (prevIndex + 1) % testeJson["council-form"].users.length
    );
  };

  const handlePreviousStudent = () => {
    setCurrentStudentIndex((prevIndex) =>
      prevIndex === 0
        ? testeJson["council-form"].users.length - 1
        : prevIndex - 1
    );
  };

  const { constrastColor, backgroundColor, primaryColor, whiteColor } =
    useThemeContext();

  return (
    <Box>
      <Title textHighlight="Conselho" text="da turma:" />
      <Box
        className="rounded-big m-0 flex justify-center items-center outline-[16px] outline"
        // bgcolor={OpacityHex(constrastColor, 0.1)}
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
                  onChangeRank={handleRankChange}
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
                  testeJson["council-form"].users[currentStudentIndex].name
                }
                frequencia={
                  testeJson["council-form"].users[currentStudentIndex]
                    .frequencia
                }
                comments=""
                negativeContent={negativeContent}
                positiveContent={positiveContent}
                rank={
                  testeJson["council-form"].users[currentStudentIndex].rank as
                    | "none"
                    | "average"
                    | "excellent"
                    | "good"
                    | "critical"
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
    </Box>
  );
}

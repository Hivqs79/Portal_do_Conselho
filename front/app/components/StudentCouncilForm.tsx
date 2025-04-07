"use client";
import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import Rank from "./rank/Rank";
import Photo from "./profile/Photo";
import TextareaComponent from "./input/TextareaComponent";
import Icon from "./Icon";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AutoSaveIndicator from "./AutoSaveIndicator";
import { useState, useEffect, useRef } from "react";
import { Decryptor } from "@/encryption/Decryptor";
import { Encryptor } from "@/encryption/Encryptor";

interface StudentCouncilFormProps {
  users: User[];
  student: string;
  frequencia: number;
  rank: "excellent" | "good" | "average" | "critical" | "none";
  positiveContent: string;
  negativeContent: string;
  id_user?: number;
  comments: string;
  onNext: () => void;
  onPrevious: () => void;
  openCommentsModal?: (open: boolean) => void;
}

export default function StudentCouncilForm({
  users,
  student,
  frequencia: initialFrequencia,
  rank: initialRank,
  positiveContent: initialPositiveContent,
  negativeContent: initialNegativeContent,
  comments,
  id_user,
  onNext,
  onPrevious,
  openCommentsModal,
}: StudentCouncilFormProps) {
  const [frequenciaAtualizada, setFrequenciaAtual] =
    useState(initialFrequencia);
  const [positiveContentAtualizado, setPositiveContentAtual] = useState(
    initialPositiveContent
  );
  const [negativeContentAtualizado, setNegativeContentAtual] = useState(
    initialNegativeContent
  );
  const [rankAtualizado, setRankAtual] = useState(initialRank);

  const { constrastColor, colorByModeSecondary, primaryColor, whiteColor } =
    useThemeContext();
  const [frequencia, setFrequencia] = useState<number | null>(
    initialFrequencia ?? ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [positiveContent, setPositiveContent] = useState(
    initialPositiveContent
  );
  const [negativeContent, setNegativeContent] = useState(
    initialNegativeContent
  );
  const [rank, setRank] = useState(initialRank);
  const [isDisable, setDisable] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const savedData = localStorage.getItem("studentsData");
    const studentsData = savedData ? Decryptor(savedData) || {} : {};

    const hasSavedData = Object.keys(studentsData).length > 0;

    if (!hasSavedData && users && users.length > 0) {
      const initialData: Record<string, any> = {};

      users.forEach((user) => {
        initialData[user.name] = {
          id_user: user.id,
          frequencia: 0,
          comments: "",
          negativeContent: "",
          positiveContent: "",
          rank: "none",
        };
      });

      localStorage.setItem("studentsData", Encryptor(initialData));
    }
  }, [users]);

  useEffect(() => {
    setFrequencia(initialFrequencia);
    setPositiveContent(initialPositiveContent);
    setNegativeContent(initialNegativeContent);
    setRank(initialRank);

    const savedData = localStorage.getItem("studentsData");
    if (savedData) {
      const studentsData = Decryptor(savedData);
      if (studentsData && studentsData[student]) {
        setFrequencia(studentsData[student].frequencia);
        setPositiveContent(studentsData[student].positiveContent || "");
        setNegativeContent(studentsData[student].negativeContent || "");
        setRank(studentsData[student].rank);

        setFrequenciaAtual(studentsData[student].frequencia);
        setPositiveContentAtual(studentsData[student].positiveContent || "");
        setNegativeContentAtual(studentsData[student].negativeContent || "");
        setRankAtual(studentsData[student].rank);
      }
    }
  }, [student]);

  const saveToLocalStorage = () => {
    setDisable(true);
    setIsSaving(true);

    const studentData = {
      id_user,
      frequencia,
      comments,
      negativeContent,
      positiveContent,
      rank,
    };

    const savedData = localStorage.getItem("studentsData");
    const studentsData = savedData ? Decryptor(savedData) || {} : {};

    studentsData[student] = studentData;
    localStorage.setItem("studentsData", Encryptor(studentsData));

    setTimeout(() => {
      setIsSaving(false);
      setDisable(false);
    }, 1000);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const debounceSave = setTimeout(() => {
      if (
        positiveContent !== positiveContentAtualizado ||
        negativeContent !== negativeContentAtualizado ||
        frequencia !== frequenciaAtualizada ||
        rank !== rankAtualizado
      ) {
        saveToLocalStorage();
        if (frequencia !== null) {
          setFrequenciaAtual(frequencia);
        }
        setPositiveContentAtual(positiveContent);
        setNegativeContentAtual(negativeContent);
        setRankAtual(rank);
      }
    });

    return () => clearTimeout(debounceSave);
  }, [positiveContent, negativeContent, frequencia, rank]);

  // Restante do código permanece o mesmo...
  const handleFrequenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", ".");
    let parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      setFrequencia(null);
    } else {
      setFrequencia(parsedValue > 100 ? 100 : parsedValue);
    }
  };

  const handleRankChange = (newRank: string) => {
    setRank(newRank as "excellent" | "good" | "average" | "critical" | "none");
  };

  const openModal = () => {
    if (openCommentsModal) {
      openCommentsModal(true);
    }
  };

  return (
    <>
      <Box
        style={{
          borderColor: colorByModeSecondary,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          background: "rgba(255, 255, 255, 0.02)",
        }}
        className="relative w-full border-2 rounded-big p-5 px-9 xl:px-16 flex flex-col gap-5 pb-10 lg:pb-5 transition-all duration-300"
      >
        <Box className="flex flex-wrap lg:flex-nowrap gap-5 lg:gap-10 justify-center">
          <Box className="flex flex-col justify-between items-start gap-5 h-[550px]">
            <Box className="flex flex-wrap justify-between items-center gap-4">
              <Typography
                variant="lg_text_bold"
                color={constrastColor}
                sx={{ fontSize: "1.25rem", fontWeight: 600 }}
              >
                <span style={{ color: colorByModeSecondary }}>Aluno:</span>{" "}
                {student}
              </Typography>
            </Box>
            <Photo
              classname="max-w-[200px] max-h-[290px] h-[300px] w-[350px] sm:max-w-[250px] mx-auto rounded-lg shadow-md"
              idUser={1}
              rounded={false}
            />
            <span className="flex flex-col justify-center items-center gap-4 w-full">
              <span className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center flex-wrap gap-y-4 gap-x-4">
                <Typography
                  variant="lg_text_bold"
                  color={colorByModeSecondary}
                  sx={{ fontWeight: 600 }}
                >
                  Frequência:
                </Typography>
                <Box className="relative flex items-center w-full sm:w-auto">
                  <input
                    style={{
                      borderColor: colorByModeSecondary,
                      color: OpacityHex(constrastColor, 0.7),
                      paddingRight: "20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                    placeholder={String(0)}
                    type="number"
                    value={frequencia ?? ""}
                    onChange={handleFrequenciaChange}
                    min={0}
                    max={100}
                    className="text-center bg-none rounded-normal appearance-none border-2 w-full sm:w-[120px] font-bold h-[48px] flex justify-center items-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none outline-none transition-all duration-200 focus:shadow-md"
                  />
                  <span
                    style={{ color: OpacityHex(constrastColor, 0.7) }}
                    className="absolute right-2 font-bold"
                  >
                    %
                  </span>
                </Box>
              </span>
              <span className="w-full">
                <Rank
                  variant="default"
                  popover={true}
                  outline={false}
                  type={rank}
                  onRankChange={handleRankChange}
                />
              </span>
            </span>
            <span className="lg:hidden w-full">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  padding: "10px 0",
                  background: primaryColor,
                }}
                color="primary"
              >
                <Typography variant="sm_text_bold" color={whiteColor}>
                  Ver comentários
                </Typography>
              </Button>
            </span>
            <span className="hidden lg:block w-full">
              <Button
                variant="contained"
                onClick={() => openModal()}
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  padding: "10px 0",
                  background: primaryColor,
                }}
                color="primary"
              >
                <Typography variant="lg_text_bold" color={whiteColor}>
                  Ver comentários
                </Typography>
              </Button>
            </span>
          </Box>
          <Box
            style={{ backgroundColor: colorByModeSecondary }}
            className="hidden lg:block w-[.2rem] rounded-full h-[550px]"
          ></Box>
          <Box className="w-full flex justify-between flex-col gap-5 lg:h-[550px]">
            <TextareaComponent
              title="Pontos Positivos"
              readonly={false}
              placeholder="Escreva algo aqui..."
              value={positiveContent}
              onChange={(e) => setPositiveContent(e.target.value)}
            />
            <TextareaComponent
              title="Pontos a Melhorar"
              readonly={false}
              placeholder="Escreva algo aqui..."
              value={negativeContent}
              onChange={(e) => setNegativeContent(e.target.value)}
            />
          </Box>
        </Box>
        {!isDisable ? (
          <>
            <span
              onClick={onPrevious}
              className="absolute left-[-12px] lg:left-[-10] xl:left-0 top-1/3 lg:top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <Icon
                color={colorByModeSecondary}
                className="text-6xl"
                IconPassed={IoIosArrowBack}
              />
            </span>
            <span
              onClick={onNext}
              className="absolute right-[-12px] lg:right-[-10] xl:right-0 top-1/3 lg:top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <Icon
                color={colorByModeSecondary}
                className="text-6xl"
                IconPassed={IoIosArrowForward}
              />
            </span>
          </>
        ) : (
          <>
            <span className="absolute opacity-30 left-[-12px] lg:left-[-10] xl:left-0 top-1/3 lg:top-1/2 -translate-y-1/2 !cursor-wait">
              <Icon
                color={primaryColor}
                className="text-6xl"
                IconPassed={IoIosArrowBack}
                cursor="cursor-not-allowed"
              />
            </span>
            <span className="absolute opacity-30 right-[-12px] lg:right-[-10] xl:right-0 top-1/3 lg:top-1/2 -translate-y-1/2 !cursor-wait">
              <Icon
                color={primaryColor}
                className="text-6xl"
                IconPassed={IoIosArrowForward}
                cursor="cursor-not-allowed"
              />
            </span>
          </>
        )}
        <Box className="absolute bottom-2 left-3 lg:bottom-auto lg:left-auto lg:right-[2.5rem] lg:top-5 xl:right-[4rem]">
          <AutoSaveIndicator saved={!isSaving} />
        </Box>
      </Box>
    </>
  );
}

"use client";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Button, Typography } from "@mui/material";
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
  student: string;
  frequencia: number;
  rank: "excellent" | "good" | "average" | "critical" | "none";
  positiveContent: string;
  negativeContent: string;
  comments: string;
  onNext: () => void;
  onPrevious: () => void;
}

export default function StudentCouncilForm({
  student,
  frequencia: initialFrequencia,
  rank: initialRank,
  positiveContent: initialPositiveContent,
  negativeContent: initialNegativeContent,
  comments,
  onNext,
  onPrevious,
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

  // Carrega os dados do localStorage quando o student muda
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

  // Função para salvar no localStorage
  const saveToLocalStorage = () => {
    setDisable(true);
    setIsSaving(true);

    const studentData = {
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

  // Monitora alterações e salva após um tempo de inatividade
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

  return (
    <>
      <div
        style={{ borderColor: primaryColor }}
        className="relative w-full border-2 rounded-big p-5 px-9 xl:px-16 flex flex-col gap-5 pb-10 lg:pb-5"
      >
        <div className="flex flex-wrap lg:flex-nowrap gap-5 lg:gap-10 justify-center">
          <div className="flex flex-col justify-between items-start gap-5 h-[550px]">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <Typography variant="lg_text_bold" color={constrastColor}>
                <span style={{ color: colorByModeSecondary }}>Aluno:</span>{" "}
                {student}
              </Typography>
            </div>
            <Photo classname="lg:w-[250px] mx-auto" rounded={false} />
            <span className="flex flex-col justify-center items-center gap-4 w-full">
              <span className="flex justify-between w-full items-center flex-wrap gap-y-4 gap-x-4">
                <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                  Frequência:
                </Typography>
                <div className="relative flex items-center">
                  <input
                    style={{
                      borderColor: primaryColor,
                      color: OpacityHex(constrastColor, 0.7),
                      paddingRight: "20px",
                    }}
                    placeholder={String(initialFrequencia)}
                    type="number"
                    value={frequencia ?? ""}
                    onChange={handleFrequenciaChange}
                    min={0}
                    max={100}
                    className="text-center bg-none bg-transparent appearance-none border-2 w-[120px] font-bold h-[40px] flex justify-center items-center rounded-small [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none outline-none"
                  />
                  <span
                    style={{ color: OpacityHex(constrastColor, 0.7) }}
                    className="absolute right-2 font-bold"
                  >
                    %
                  </span>
                </div>
              </span>
              <span className="w-full">
                <Rank
                  variant="default"
                  popover={true}
                  outline={false}
                  type={rank}
                  studentName={student}
                  onRankChange={handleRankChange}
                />
              </span>
            </span>
            <span className="lg:hidden">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                color="primary"
              >
                <Typography variant="sm_text_bold" color={whiteColor}>
                  Ver comentários
                </Typography>
              </Button>
            </span>
            <span className="hidden lg:block w-full">
              <Button variant="contained" className="!w-full" color="primary">
                <Typography variant="lg_text_bold" color={whiteColor}>
                  Ver comentários
                </Typography>
              </Button>
            </span>
          </div>
          <div
            style={{ backgroundColor: primaryColor }}
            className="hidden lg:block w-[.2rem] rounded-full h-[550px]"
          ></div>
          <div className="w-full flex justify-between flex-col gap-5 lg:h-[550px]">
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
          </div>
        </div>
        {!isDisable ? (
          <>
            <span
              onClick={onPrevious}
              className="absolute left-[-12px] lg:left-[-10] xl:left-0 top-1/3 lg:top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <Icon
                color={primaryColor}
                className="text-6xl"
                IconPassed={IoIosArrowBack}
              />
            </span>
            <span
              onClick={onNext}
              className="absolute right-[-12px] lg:right-[-10] xl:right-0 top-1/3 lg:top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <Icon
                color={primaryColor}
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
        <div className="absolute bottom-2 left-3 lg:hidden lg:bottom-[20px]">
          <AutoSaveIndicator saved={!isSaving} />
        </div>
        <div className="absolute hidden lg:block right-[4rem] top-5">
          <AutoSaveIndicator saved={!isSaving} />
        </div>
      </div>
    </>
  );
}

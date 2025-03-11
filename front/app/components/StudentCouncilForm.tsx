"use client";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Button, Skeleton, Typography } from "@mui/material";
import Rank from "./rank/Rank";
import Photo from "./profile/Photo";
import TextareaComponent from "./input/TextareaComponent";
import Icon from "./Icon";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AutoSaveIndicator from "./AutoSaveIndicator";
import { useState, useEffect } from "react";
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
  const { constrastColor, colorByModeSecondary, primaryColor, whiteColor } =
    useThemeContext();
  const [frequencia, setFrequencia] = useState<number | string>(
    initialFrequencia
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
    const debounceSave = setTimeout(() => {
      if (
        positiveContent !== initialPositiveContent ||
        negativeContent !== initialNegativeContent ||
        frequencia !== initialFrequencia ||
        rank !== initialRank
      ) {
        saveToLocalStorage();
      }
    });

    return () => clearTimeout(debounceSave);
  }, [positiveContent, negativeContent, frequencia, rank]);

  const handleFrequenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      setFrequencia("");
    } else {
      setFrequencia(value > 100 ? 100 : value);
    }
  };

  const handleRankChange = (newRank: string) => {
    setRank(newRank as "excellent" | "good" | "average" | "critical" | "none");
  };

  return (
    <>
      <div
        style={{ borderColor: primaryColor }}
        className="relative w-full border-2 rounded-big p-5 px-10 xl:px-16 flex flex-col gap-5 pb-10 lg:pb-5"
      >
        <div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Typography variant="lg_text_bold" color={constrastColor}>
              <span style={{ color: colorByModeSecondary }}>Aluno:</span>{" "}
              {student}
            </Typography>
            <span className="flex flex-wrap justify-start items-center gap-y-5 gap-x-10">
              <span className="flex justify-start items-center gap-4 flex-wrap">
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
                    value={frequencia}
                    onChange={handleFrequenciaChange}
                    min={0}
                    max={100}
                    className="text-center bg-none bg-transparent appearance-none border-2 w-24 font-bold h-[40px] flex justify-center items-center rounded-small [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="absolute right-2 text-gray-500 font-bold">
                    %
                  </span>
                </div>
              </span>
              <Rank
                variant="default"
                popover={true}
                outline={false}
                type={rank}
                studentName={student}
                onRankChange={handleRankChange}
              />
            </span>
          </div>
          <div
            style={{ backgroundColor: primaryColor }}
            className="w-full h-[2px] rounded-full mt-2"
          ></div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center">
          <div className="flex flex-col justify-start items-center gap-5">
            <Photo classname="lg:w-[250px]" rounded={false} />
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
          <div className="w-full flex flex-col gap-5">
            <TextareaComponent
              title="Pontos Positivos"
              readonly={false} // Modo editável
              placeholder="Escreva algo aqui..."
              value={positiveContent} // Passe o estado local como value
              onChange={(e) => setPositiveContent(e.target.value)} // Passe o onChange
            />
            <TextareaComponent
              title="Pontos a Melhorar"
              readonly={false} // Modo editável
              placeholder="Escreva algo aqui..."
              value={negativeContent} // Passe o estado local como value
              onChange={(e) => setNegativeContent(e.target.value)} // Passe o onChange
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
        <div className="absolute bottom-2 left-3 lg:left-[65px] lg:bottom-[20px]">
          <AutoSaveIndicator saved={!isSaving} />
        </div>
      </div>
    </>
  );
}

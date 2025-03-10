"use client";
import hexToRGBA from "@/hooks/hexToRGBA";
import { useThemeContext } from "@/hooks/useTheme";
import { Button, Skeleton, Typography } from "@mui/material";
import Rank from "./rank/Rank";
import Photo from "./profile/Photo";
import TextareaComponent from "./input/TextareaComponent";
import Icon from "./Icon";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AutoSaveIndicator from "./AutoSaveIndicator";
import { useState } from "react";

interface StudentCouncilFormProps {
  student: string;
  frequencia: number;
  rank: "excellent" | "good" | "average" | "critical" | "none";
  positiveContent: string;
  negativeContent: string;
  comments: string;
}

export default function StudentCouncilForm({
  student,
  frequencia,
  rank,
  positiveContent,
  negativeContent,
  comments,
}: StudentCouncilFormProps) {
  const { constrastColor, colorByModeSecondary, primaryColor, whiteColor } =
    useThemeContext();
  const [frequenciaAtual, setFrequencia] = useState<number | string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      setFrequencia("");
    } else {
      setFrequencia(value > 100 ? 100 : value);
    }
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
                      color: hexToRGBA(constrastColor, 0.7),
                      paddingRight: "20px", // Garante espaço para o %
                    }}
                    placeholder={`${frequencia}%`}
                    type="number"
                    value={frequenciaAtual}
                    onChange={handleChange}
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
              whriteOnly={false}
              content={positiveContent}
              placeholder="Escreva algo aqui..."
            />
            <TextareaComponent
              title="Pontos a Melhorar"
              whriteOnly={false}
              content={positiveContent}
              placeholder="Escreva algo aqui..."
            />
          </div>
        </div>
        <Icon
          color={primaryColor}
          className="absolute left-[-12px] lg:left-[-10] xl:left-0 top-1/3 lg:top-1/2 -translate-y-1/2 text-6xl"
          IconPassed={IoIosArrowBack}
        />
        <Icon
          color={primaryColor}
          className="absolute right-[-12px] lg:right-[-10] xl:right-0 top-1/3 lg:top-1/2 -translate-y-1/2 text-6xl"
          IconPassed={IoIosArrowForward}
        />
        <div className="absolute bottom-2 left-3 lg:left-[65px] lg:bottom-[20px]">
          <AutoSaveIndicator saved={false} />
        </div>
      </div>
    </>
  );
}

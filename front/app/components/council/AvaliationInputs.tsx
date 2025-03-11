"use client";
import { useThemeContext } from "@/hooks/useTheme";
import TextareaComponent from "../input/TextareaComponent";

interface AvaliationInputsProps {
  wrtiteOnly: boolean;
  Positivecontent?: string;
  Negativecontent?: string;
}

export default function AvaliationInputs({
  wrtiteOnly,
  Positivecontent,
  Negativecontent,
}: AvaliationInputsProps) {
  const { primaryColor } = useThemeContext();
  return (
    <>
      <div
        style={{ borderColor: primaryColor }}
        className="w-full flex-col lg:flex-row rounded-b-big p-2 sm:p-5 flex border-[2px] border-t-0 justify-center items-center flex-wrap gap-4 md:flex-nowrap"
      >
        <TextareaComponent
          title="Pontos Positivos"
          content={Positivecontent}
          readonly={wrtiteOnly}
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="hidden lg:block w-[5px] h-[255px]"
        ></div>
        <TextareaComponent
          title="Pontos a melhorar"
          content={Negativecontent}
          readonly={wrtiteOnly}
        />
      </div>
    </>
  );
}

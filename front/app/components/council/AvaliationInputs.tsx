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
        className="w-full flex-col lg:flex-row rounded-b-big p-2 flex border-[2px] border-t-0 justify-center items-center flex-wrap gap-4 md:flex-nowrap lg:h-[280px]"
      >
        <TextareaComponent
          title="Pontos Positivos"
          content={Positivecontent}
          whriteOnly={wrtiteOnly}
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="hidden lg:block w-[5px] h-full"
        ></div>
        <TextareaComponent
          title="Pontos a melhorar"
          content={Negativecontent}
          whriteOnly={wrtiteOnly}
        />
      </div>
    </>
  );
}

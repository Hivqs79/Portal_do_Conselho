"use client";
import { useThemeContext } from "@/hooks/useTheme";
import TextareaComponent from "../input/TextareaComponent";

interface AvaliationInputsProps {
  writeOnly: boolean;
  Positivecontent?: string | null;
  Negativecontent?: string | null;
  onPositiveChange: (content: string) => void;
  onNegativeChange: (content: string) => void;
}

export default function AvaliationInputs({
  writeOnly,
  Positivecontent,
  Negativecontent,
  onPositiveChange,
  onNegativeChange,
}: AvaliationInputsProps) {
  const { primaryColor, colorByModeSecondary } = useThemeContext();

  const handlePositiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPositiveChange(e.target.value);
  };

  const handleNegativeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNegativeChange(e.target.value);
  };

  return (
    <>
      <div
        style={{ borderColor: colorByModeSecondary }}
        className="w-full flex-col lg:flex-row rounded-b-big p-5 flex border-[2px] border-t-0 justify-center items-center flex-wrap gap-4 md:flex-nowrap"
      >
        <TextareaComponent
          title="Pontos Positivos"
          content={Positivecontent as string}
          readonly={writeOnly}
          placeholder="Digite algo aqui..."
          onChange={handlePositiveChange}
        />
        <div
          style={{ backgroundColor: colorByModeSecondary }}
          className="hidden lg:block w-[.2rem] h-[255px]"
        ></div>
        <TextareaComponent
          title="Pontos a melhorar"
          content={Negativecontent as string}
          readonly={writeOnly}
          placeholder="Digite algo aqui..."
          onChange={handleNegativeChange}
        />
      </div>
    </>
  );
}

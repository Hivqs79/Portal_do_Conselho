"use client";
import { useThemeContext } from "@/hooks/useTheme";
import TextareaComponent from "../input/TextareaComponent";

interface AvaliationInputsProps {
  readOnly: boolean;
  Positivecontent?: string | null;
  Negativecontent?: string | null;
  onPositiveChange?: (content: string) => void;
  onNegativeChange?: (content: string) => void;
  copyButton?: boolean;
  withoutBorder?: boolean;
}

export default function AvaliationInputs({
  readOnly,
  Positivecontent,
  Negativecontent,
  onPositiveChange,
  onNegativeChange,
  copyButton,
  withoutBorder,
}: AvaliationInputsProps) {
  const { colorByModeSecondary } = useThemeContext();

  const handlePositiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(onPositiveChange) onPositiveChange(e.target.value);
  };

  const handleNegativeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(onNegativeChange) onNegativeChange(e.target.value);
  };

  return (
    <>
      <div
        style={{ borderColor: colorByModeSecondary}}
        className={"w-full flex-col lg:flex-row rounded-b-big py-4 px-2 sm:p-5 flex border-t-0 justify-center items-center flex-wrap gap-4 md:flex-nowrap " + (withoutBorder ? "border-0" : "border-[2px]")}
      >
        <TextareaComponent
          title="Pontos Positivos"
          content={Positivecontent as string}
          readonly={readOnly}
          placeholder={readOnly ? "Nada aqui..." : "Digite algo aqui..."}
          onChange={handlePositiveChange}
          copyButton={copyButton}
        />
        <div
          style={{ backgroundColor: colorByModeSecondary }}
          className="hidden lg:block w-[.2rem] h-[255px]"
        ></div>
        <TextareaComponent
          title="Pontos a melhorar"
          content={Negativecontent as string}
          readonly={readOnly}
          placeholder={readOnly ? "Nada aqui..." : "Digite algo aqui..."}
          onChange={handleNegativeChange}
          copyButton={copyButton}
        />
      </div>
    </>
  );
}

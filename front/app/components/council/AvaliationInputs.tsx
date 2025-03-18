"use client";
import { useThemeContext } from "@/hooks/useTheme";
import TextareaComponent from "../input/TextareaComponent";

interface AvaliationInputsProps {
  writeOnly: boolean;
  Positivecontent?: string;
  Negativecontent?: string;
  onPositiveChange: (content: string) => void; // Recebe uma string
  onNegativeChange: (content: string) => void; // Recebe uma string
}

export default function AvaliationInputs({
  writeOnly,
  Positivecontent,
  Negativecontent,
  onPositiveChange,
  onNegativeChange,
}: AvaliationInputsProps) {
  const { primaryColor } = useThemeContext();

  // Converte o evento em uma string e repassa para onPositiveChange
  const handlePositiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPositiveChange(e.target.value);
  };

  // Converte o evento em uma string e repassa para onNegativeChange
  const handleNegativeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNegativeChange(e.target.value);
  };

  return (
    <>
      <div
        style={{ borderColor: primaryColor }}
        className="w-full flex-col lg:flex-row rounded-b-big p-2 sm:p-5 flex border-[2px] border-t-0 justify-center items-center flex-wrap gap-4 md:flex-nowrap"
      >
        <TextareaComponent
          title="Pontos Positivos"
          content={Positivecontent}
          readonly={writeOnly}
          placeholder="Digite algo aqui..."
          onChange={handlePositiveChange} // Passa o evento diretamente
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="hidden lg:block w-[.2rem] h-[255px]"
        ></div>
        <TextareaComponent
          title="Pontos a melhorar"
          content={Negativecontent}
          readonly={writeOnly}
          placeholder="Digite algo aqui..."
          onChange={handleNegativeChange} // Passa o evento diretamente
        />
      </div>
    </>
  );
}

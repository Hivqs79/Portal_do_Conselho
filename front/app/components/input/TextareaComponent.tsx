import React from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { Typography } from "@mui/material";

interface TextareaProps {
  readonly: boolean;
  title: string;
  content?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Adicione a prop onChange
  value?: string; // Adicione a prop value
}

export default function TextareaComponent({
  readonly,
  title,
  content,
  placeholder,
  onChange, // Receba a prop onChange
  value, // Receba a prop value
}: TextareaProps) {
  const {
    primaryColor,
    constrastColor,
    backgroundColor,
    colorByModeSecondary,
  } = useThemeContext();

  if (readonly) {
    return (
      <>
        <div className="w-full">
          <Typography variant="lg_text_bold" color={colorByModeSecondary}>
            {title}
          </Typography>
          <div
            style={{
              background: backgroundColor,
              border: `2px solid ${primaryColor}`,
            }}
            className="rounded-normal p-1 mt-3 min-h-[200px] "
          >
            <textarea
              className="cursor-default w-full min-h-[200px] pl-3 pt-2 text-[16px] outline-none resize-none bg-transparent"
              readOnly
              value={value || content || ""}
              placeholder={placeholder}
              style={{
                color: constrastColor,
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        <Typography variant="lg_text_bold" color={colorByModeSecondary}>
          {title}
        </Typography>
        <div
          style={{
            background: backgroundColor,
            border: `2px solid ${primaryColor}`,
          }}
          className="rounded-normal p-1 mt-3 min-h-[200px] "
        >
          <textarea
            className="w-full min-h-[200px] pl-3 pr-1 pt-2 text-[16px] outline-none resize-none bg-transparent"
            value={value || content || ""} // Use value ou content, ou string vazia
            placeholder={placeholder}
            style={{ color: constrastColor }}
            onChange={onChange ? onChange : undefined} // Garante que onChange não seja passado como `null`
            readOnly={!onChange} // Se onChange não existir, torne o campo somente leitura
          />
        </div>
      </div>
    </>
  );
}

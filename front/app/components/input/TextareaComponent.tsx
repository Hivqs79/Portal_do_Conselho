import React from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { TextareaAutosize, Typography } from "@mui/material";

interface TextareaProps {
  whriteOnly: boolean;
  title: string;
  content?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Adicione a prop onChange
  value?: string; // Adicione a prop value
}

export default function TextareaComponent({
  whriteOnly,
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

  if (whriteOnly) {
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
              readOnly // Campo somente leitura
              value={value || content || ""} // Use value ou content, ou string vazia
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
            style={{
              color: constrastColor,
            }}
            onChange={onChange} // Passe o onChange para o textarea
          />
        </div>
      </div>
    </>
  );
}

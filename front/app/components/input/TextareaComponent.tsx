import React from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { TextareaAutosize, Typography } from "@mui/material";

interface TextareaProps {
  whriteOnly: boolean;
  title: string;
  content?: string;
}

export default function TextareaComponent({
  whriteOnly,
  title,
  content,
}: TextareaProps) {
  const { primaryColor, constrastColor, backgroundColor } = useThemeContext();

  if (whriteOnly) {
    return (
      <>
        <div className="w-full">
          <Typography variant="lg_text_bold" color="primary">
            {title}
          </Typography>
          <div
            style={{
              background: backgroundColor,
              border: `2px solid ${primaryColor}`,
            }}
            className="rounded-normal mt-3"
          >
            <textarea
              className="cursor-default w-full p-[8px] text-[16px] outline-none resize-none bg-transparent"
              readOnly
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
        <Typography variant="lg_text_bold" color="primary">
          {title}
        </Typography>
        <div
          style={{
            background: backgroundColor,
            border: `2px solid ${primaryColor}`,
          }}
          className="rounded-normal mt-3 min-h-[200px]"
        >
          <textarea
            className="w-full min-h-[200px] p-[8px] text-[16px] outline-none resize-none bg-transparent"
            style={{
              color: constrastColor,
            }}
          />
        </div>
      </div>
    </>
  );
}

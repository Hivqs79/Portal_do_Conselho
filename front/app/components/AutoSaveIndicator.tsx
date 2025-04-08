"use client";

import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";

interface AutoSaveIndicatorProps {
  saved: boolean;
  text: string;
}

export default function AutoSaveIndicator({ saved, text }: AutoSaveIndicatorProps) {
  const { constrastColor, colorByModeSecondary } = useThemeContext();

  if (saved) {
    return (
      <>
        <div className="flex items-center gap-2 opacity-40">
          <div className="relative">
            <div
              style={{ backgroundColor: colorByModeSecondary }}
              className="w-3 h-3 rounded-full relative"
            ></div>
          </div>
          <span style={{color: OpacityHex(constrastColor, 0.8)}} className="text-sm">{text}</span>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          style={{ backgroundColor: colorByModeSecondary }}
          className="w-3 h-3 rounded-full animate-ping absolute"
        ></div>
        <div
          style={{ backgroundColor: colorByModeSecondary }}
          className="w-3 h-3 rounded-full relative"
        ></div>
      </div>
      <span style={{color: OpacityHex(constrastColor, 0.8)}} className="text-sm">Salvando alterações</span>
    </div>
  );
}

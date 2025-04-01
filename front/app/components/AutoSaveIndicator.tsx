"use client";

import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { dividerClasses } from "@mui/material";

interface AutoSaveIndicatorProps {
  saved: boolean;
}

export default function AutoSaveIndicator({ saved }: AutoSaveIndicatorProps) {
  const { primaryColor, constrastColor, colorByModeSecondary } = useThemeContext();

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
          <span style={{color: OpacityHex(constrastColor, 0.8)}} className="text-sm">Alterações salvas</span>
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

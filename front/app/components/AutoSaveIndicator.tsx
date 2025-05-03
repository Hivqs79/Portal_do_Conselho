/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";

import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";

interface AutoSaveIndicatorProps {
  saved: boolean;
  text: string;
}

export default function AutoSaveIndicator({
  saved,
  text,
}: AutoSaveIndicatorProps) {
  const { constrastColor, colorByModeSecondary } = useThemeContext();
  
    return (
        <div
          className={"flex items-center gap-2 " + (saved ? "opacity-40" : "")}
        >
          <div className="relative">
            {!saved && (
              <div
                style={{ backgroundColor: colorByModeSecondary }}
                className="w-3 h-3 rounded-full animate-ping absolute"
              ></div>
            )}
            <div
              style={{ backgroundColor: colorByModeSecondary }}
              className="w-3 h-3 rounded-full relative"
            ></div>
          </div>
          <span
            style={{ color: OpacityHex(constrastColor, 0.8) }}
            className="text-sm"
          >
            {text}
          </span>
        </div>
    );  
}

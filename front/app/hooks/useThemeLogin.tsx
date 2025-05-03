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

import { Button, ButtonProps, darken, styled, TextField, TextFieldProps } from "@mui/material";
import { colors } from "@/theme/BrandColors";
import { createContext, useContext } from "react";

interface ThemeLoginContextType {
    mode: string;
    BlueTextField: typeof BlueTextField;
    BlueButton: typeof BlueButton;
    bluePrimary: string;
    blueSecondary: string;
    blueTerciary: string;
    colorByMode: string;
    colorByModeSecondary: string;
}

const ThemeLoginContext = createContext<ThemeLoginContextType | undefined>(undefined);

const mode = (typeof window !== "undefined" ? localStorage.getItem("mode")?.replaceAll("\\", "").replaceAll("\"", "") : "light") || "light";
const bluePrimary = colors.pallete.blue.primary;
const blueSecondary = colors.pallete.blue.secondary;
const blueTerciary = colors.pallete.blue.terciary;
const colorByMode = (mode == "light" ? bluePrimary : blueTerciary);
const colorByModeSecondary = (mode == "light" ? bluePrimary : blueSecondary);
console.log(mode);

const BlueTextField = styled(TextField)<TextFieldProps>(({ }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colorByMode,
      },
      "&:hover fieldset": {
        borderColor: colorByMode,
      },
      "&.Mui-focused fieldset": {
        borderColor: colorByMode,
        boxShadow: '2px 2px 4px 1px' + colorByMode + '77',
      },
      '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
        borderColor: blueSecondary,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: colorByMode,
      },
    },
}));

const BlueButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: bluePrimary,
    color: theme.palette.getContrastText(bluePrimary),
    textTransform: 'none',
    "&:hover": {
      backgroundColor: darken(bluePrimary, 0.2),
    },
}));

export function ThemeLoginProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeLoginContext.Provider value={{ 
            mode, 
            BlueTextField, 
            BlueButton, 
            bluePrimary,
            blueSecondary,
            blueTerciary,
            colorByMode,
            colorByModeSecondary
        }}>
            {children}
        </ThemeLoginContext.Provider>
    );
}

export function useThemeLoginContext() {
    const context = useContext(ThemeLoginContext);
    if (context === undefined) {
        throw new Error('useThemeLoginContext must be used within a ThemeLoginProvider');
    }
    return context;
}
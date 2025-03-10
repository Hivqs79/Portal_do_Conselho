import { Button, ButtonProps, darken, styled, TextField, TextFieldProps } from "@mui/material";
import { colors } from "@/theme/BrandColors";
import { createContext, useContext } from "react";

interface ThemeLoginContextType {
    mode: string;
    BlueTextField: any;
    BlueButton: any;
    bluePrimary: string;
    blueSecondary: string;
    blueTerciary: string;
    colorByMode: string;
    colorByModeSecondary: string;
}

const ThemeLoginContext = createContext<ThemeLoginContextType | undefined>(undefined);

const mode = (typeof window !== "undefined" ? localStorage.getItem("mode") : "light") || "light";
const bluePrimary = colors.pallete.blue.primary;
const blueSecondary = colors.pallete.blue.secondary;
const blueTerciary = colors.pallete.blue.terciary;
const colorByMode = (mode == "light" ? bluePrimary : blueTerciary);
const colorByModeSecondary = (mode == "light" ? bluePrimary : blueSecondary);

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
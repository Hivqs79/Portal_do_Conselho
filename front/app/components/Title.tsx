"use client";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

interface TitleProps {
    textHighlight?: string;
    text?: string;
    isWelcomeMensage?: boolean;
}

export default function Title({textHighlight, text, isWelcomeMensage=false}: TitleProps) {
    const { colorByModeSecondary } = useThemeContext();
    const { role } = useRoleContext();

    if (isWelcomeMensage) {
        textHighlight = `Bem vindo(a), ${role}`;
        text = "ao Portal do Conselho";
    }
    return (
        <Box className={`flex !mt-[10rem] !mb-[4.5rem] ` + (isWelcomeMensage && "justify-center text-center")}>
            <Typography variant="h4_title" color={colorByModeSecondary} className="font-bold">
                {textHighlight}
                <Typography variant="h4_title" className="font-normal">{isWelcomeMensage && <br/>} {text}</Typography>
            </Typography>            
        </Box>
    );
}
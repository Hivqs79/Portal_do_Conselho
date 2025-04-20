"use client";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

interface TitleProps {
    textHighlight?: string;
    text?: string;
    isWelcomeMensage?: boolean;
    className?: string;
}

export default function Title({textHighlight, text, isWelcomeMensage=false, className = ""}: TitleProps) {
    const { colorByModeSecondary } = useThemeContext();
    const { name } = useRoleContext();

    if (isWelcomeMensage) {
        textHighlight = `Bem vindo(a), ${name ? name.split(" ")[0] : ""}`;
        text = "ao Portal do Conselho";
    }
    return (
        <Box className={`flex !mt-[10rem] !mb-[4.5rem] ` + (isWelcomeMensage && "justify-center text-center")}>
            <Typography variant="h4_title" color={colorByModeSecondary} className={"font-bold " + className}>
                {textHighlight}
                <Typography variant="h4_title" className="font-normal">{isWelcomeMensage && <br/>} {text}</Typography>
            </Typography>            
        </Box>
    );
}
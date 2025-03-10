"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

interface TitleProps {
    textHighlight: string;
    text?: string;
}

export default function Title({textHighlight, text}: TitleProps) {
    const { colorByModeSecondary } = useThemeContext();
    return (
        <Box className="flex flex-row !mt-36">
            <Typography variant="h4_title" color={colorByModeSecondary} className="font-bold">
                {textHighlight}
                <Typography variant="h4_title" className="font-normal"> {text}</Typography>
            </Typography>            
        </Box>
    );
}
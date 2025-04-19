"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import AvaliationInputs from "../council/AvaliationInputs";

interface PreCouncilSectionProps {
    title: string;
    description: string;
    positiveContent?: string;
    negativeContent?: string;
    setPositiveContent?: (content: string) => void;
    setNegativeContent?: (content: string) => void;
}

export default function PreCouncilSection({
    title,
    description,
    positiveContent,
    negativeContent,
    setPositiveContent,
    setNegativeContent
}: PreCouncilSectionProps) {
    const { primaryColor, backgroundColor, colorByModeSecondary, whiteColor } = useThemeContext();

    return (
        <Box style={{ borderColor: colorByModeSecondary, backgroundColor: primaryColor }} className="border-[2px] rounded-big overflow-hidden">
            <Box style={{ backgroundColor: primaryColor, boxShadow: `inset 0px -2px 0px 0px ${colorByModeSecondary}` }} className="flex justify-between items-center w-full p-6">
                <Box className="flex flex-col gap-2">
                    <Typography variant={"lg_text_bold"} color={whiteColor}>{title}</Typography>
                    <Typography variant={"md_text_regular"} color={whiteColor}>{description}</Typography>
                </Box>
            </Box>
            <Box
                style={{ backgroundColor: backgroundColor }}
                className="px-2"
            >
                <AvaliationInputs
                    readOnly={false}
                    withoutBorder
                    Positivecontent={positiveContent}
                    Negativecontent={negativeContent}
                    onPositiveChange={setPositiveContent}
                    onNegativeChange={setNegativeContent}
                />
            </Box>
        </Box>
    );
}
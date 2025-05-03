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
                    <Typography variant={"md_text_bold"} color={whiteColor}>{title}</Typography>
                </Box>
            </Box>
            <Box
                style={{ backgroundColor: backgroundColor }}
                className="px-2"
            >
                {description !== "Teacher section" &&
                    <Box style={{ borderColor: colorByModeSecondary }} className="p-4 border-b">
                        <Typography variant={"md_text_regular"}>{description}</Typography>
                    </Box>
                }
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
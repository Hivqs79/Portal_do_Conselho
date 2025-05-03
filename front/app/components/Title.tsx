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
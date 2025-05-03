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
import { Button, Typography } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import { useState } from "react";

interface SwapButtonProps {
    button1Text: string;
    button2Text: string;
    onClickButton1: () => void;
    onClickButton2: () => void;
}

export default function SwapButton({ button1Text, button2Text, onClickButton1, onClickButton2 }: SwapButtonProps) {
    const {primaryColor, terciaryColor} = useThemeContext();
    const [button1Focused, setButton1Focused] = useState(true);
    const windowWidth = useWindowWidth();

    return (
        <Button style={{ backgroundColor: terciaryColor }} className="relative !p-0 flex flex-row items-center !rounded-lg w-full z-10 h-12 !mb-8">
            <div 
                style={{ backgroundColor: primaryColor }} 
                className={`absolute z-20 top-0 left-0 w-[50%] h-12 rounded-lg transition-transform duration-300 ease-in-out ${button1Focused ? 'translate-x-0' : 'translate-x-full'}`} 
                onClick={() => console.log("clicou")}
            />

            <Typography 
                variant={windowWidth < 640 ? "xs_text_bold" : "md_text_bold"}
                color={button1Focused ? terciaryColor : primaryColor}                 
                onClick={() => {
                    setButton1Focused(true);
                    onClickButton1();
                }}
                className="flex justify-center z-30 w-1/2 text-center h-full items-center cursor-pointer ease-in duration-100"
            >
                {button1Text}
            </Typography>
            <Typography 
                variant={windowWidth < 640 ? "xs_text_bold" : "md_text_bold"}
                color={!button1Focused ? terciaryColor : primaryColor}                 
                onClick={() => {
                    setButton1Focused(false);
                    onClickButton2();
                }}
                className="flex justify-center z-30 w-1/2 text-center h-full items-center cursor-pointer ease-in duration-100"
            >
                {button2Text}
            </Typography>
        </Button>
    );
}
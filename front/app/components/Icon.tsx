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

import React from "react";
import { IconType } from "react-icons";
import { useThemeContext } from "@/hooks/useTheme";
import { Button } from "@mui/material";

interface IconProps {
    IconPassed: IconType;
    color?: string;
    className?: string;
    isButton?: boolean;
    colorButton?: string;
    classNameButton?: string;
    cursor?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Icon({ IconPassed, color, colorButton, isButton = false, className = "w-6 h-6", classNameButton, cursor = "cursor-pointer", onClick, disabled}: IconProps) {
    const { constrastColor, blackColor, secondaryColor } = useThemeContext();

    const inlineStyle = { color: color || (isButton ? blackColor : constrastColor) };
    const inlineStyleButton = { backgroundColor: colorButton || secondaryColor };    
    
    return isButton ? (
        <Button
            style={inlineStyleButton}
            className={"!rounded-small !w-[36px] md:!w-[53px] !h-[36px] !min-w-[36px] !flex !justify-center !items-center " + classNameButton + (disabled ? " opacity-50" : "")}            
            onClick={onClick}            
            disabled={disabled}
        >
            <IconPassed style={inlineStyle} className={`${cursor + " "}` + className}/>
        </Button>
    ) : (
        <IconPassed style={inlineStyle} className={" " + cursor + " " + className}/>
    );
}

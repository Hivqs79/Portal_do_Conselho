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
}

export default function Icon({ IconPassed, color, colorButton, isButton = false, className = "w-6 h-6", classNameButton, cursor = "cursor-pointer" }: IconProps) {
    const { constrastColor, blackColor, secondaryColor } = useThemeContext();

    const inlineStyle = { color: color || (isButton ? blackColor : constrastColor) };
    const inlineStyleButton = { backgroundColor: colorButton || secondaryColor };
    
    
    return isButton ? (
        <Button
            style={inlineStyleButton}
            className={"!rounded-small !w-[36px] md:!w-[53px] !h-[36px] !min-w-[36px] !flex !justify-center !items-center " + classNameButton}            
        >
            <IconPassed style={inlineStyle} className={`${cursor + " "}` + className}/>
        </Button>
    ) : (
        <IconPassed style={inlineStyle} className={"cursor-pointer " + className}/>
    );
}

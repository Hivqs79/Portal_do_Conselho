import React from "react";
import { IconType } from "react-icons";
import { useThemeContext } from "@/hooks/useTheme";

interface IconProps {
    IconPassed: IconType;
    color?: string;
    className?: string;
}

export default function Icon({ IconPassed, color, className = "w-6 h-6" }: IconProps) {
    const { constrastColor } = useThemeContext();

    const inlineStyle = { color: color || constrastColor };

    return (
        <IconPassed style={inlineStyle} className={"cursor-pointer " + className} />
    );
}

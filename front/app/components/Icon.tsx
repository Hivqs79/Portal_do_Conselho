import React, { useEffect, useState } from "react";
import ThemeSettings from "@/theme/ThemeSettings";
import { IconType } from "react-icons";

interface IconProps {
    IconPassed: IconType;
    color?: string;
}

export default function Icon({ IconPassed, color }: IconProps) {
    const [defaultColor, setDefaultColor] = useState(ThemeSettings.getContrastThemeColor());

    useEffect(() => {
        const htmlElement = document.documentElement;

        const observer = new MutationObserver(() => {
            setDefaultColor(ThemeSettings.getContrastThemeColor());
        });

        observer.observe(htmlElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const inlineStyle = { color: color || defaultColor };

    return (
        <IconPassed style={inlineStyle} className="w-6 h-6" />
    );
}

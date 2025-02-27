import ThemeSettings from "@/theme/ThemeSettings";
import { IconType } from "react-icons";

interface IconProps {
    IconPassed: IconType;
    color?: string;
}

let defaultColor = ThemeSettings.getContrastThemeColor();

export default function Icon({ IconPassed, color = defaultColor }: IconProps) {
    const inlineStyle = { color };

    return (
        <IconPassed style={inlineStyle} className="w-6 h-6" />
    );
}

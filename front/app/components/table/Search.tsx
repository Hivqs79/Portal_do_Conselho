import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "../Icon";
import OpacityHex from "@/utils/OpacityHex";

interface SearchProps {
    type?: string;
    setSearch?: (search: string) => void;
}

export default function Search({ setSearch, type }: SearchProps) {
    const { primaryColor, secondaryColor, colorByModeSecondary, colorByMode, whiteColor, backgroundColor } = useThemeContext();
    const [isFocused, setIsFocused] = useState(false); 
    const randomId = `search-input-${crypto.randomUUID()}`;

    return (
        <>
            <Icon IconPassed={IoSearch} isButton={true} classNameButton={type === "chat" ? "!hidden" : "lg:!hidden"}/>

            <div className={`relative w-full ${type === "chat" ? "" : "max-w-xs hidden lg:block"} cursor-text`}>
                <label
                    htmlFor={randomId}
                    style={{ backgroundColor: type === "chat" ? backgroundColor : primaryColor, color: type === "chat" ? colorByModeSecondary : whiteColor }}
                    className={`cursor-text absolute left-4 font-semibold transition-all ${type === "chat" ? "pt-[.42rem]" : " "} ${
                        isFocused
                        ? `top-[-8px] font-normal text-xs !pt-0`
                        : "top-[10px] -translate-y-[5px] text-base"
                    }`}
                >
                    Pesquisa
                </label>
                <input
                    id={randomId}
                    type="text"
                    style={{ borderColor: type === "chat" ? colorByModeSecondary : secondaryColor, color: colorByMode}}
                    className={`w-full pl-4 pr-10 ${type === "chat" ? "h-[50px]" : "h-[36px]"} text-sm font-semibold border-2 rounded-md bg-transparent focus:outline-none`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => setIsFocused(e.target.value !== "")}
                    onChange={(e) => setSearch && setSearch(e.target.value)}
                />
                <IoSearch
                    color={ type === "chat" ? colorByModeSecondary : secondaryColor }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none"
                />
            </div>  
        </>
    );
}
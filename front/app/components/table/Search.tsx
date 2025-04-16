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
    const { primaryColor, secondaryColor, colorByModeSecondary, terciaryColor, whiteColor } = useThemeContext();
    const [isFocused, setIsFocused] = useState(false); 
    const randomId = `search-input-${crypto.randomUUID()}`;

    return (
        <>
            <Icon IconPassed={IoSearch} isButton={true} classNameButton="lg:!hidden"/>                

            <div className={`relative w-full ${type === "chat" ? "" : "max-w-xs"} cursor-text hidden lg:block`}>
                <label
                    htmlFor={randomId}
                    style={{ backgroundColor: type === "chat" ? terciaryColor : primaryColor, color: type === "chat" ? primaryColor : whiteColor }}
                    className={`cursor-text absolute left-4 font-semibold transition-all ${type === "chat" ? "pt-[.5rem]" : " "} ${
                        isFocused
                        ? "top-[-8px] font-normal text-xs pt-0"
                        : "top-[10px] -translate-y-[5px] text-base"
                    }`}
                >
                    Pesquisa
                </label>
                <input
                    id={randomId}
                    type="text"
                    style={{ borderColor: type === "chat" ? colorByModeSecondary : secondaryColor }}
                    className={`w-full pl-4 pr-10 ${type === "chat" ? "h-[50px]" : "h-[36px]"} text-white text-sm font-semibold border-2 rounded-md bg-transparent focus:outline-none`}
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
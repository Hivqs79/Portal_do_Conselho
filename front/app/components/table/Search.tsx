import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "../Icon";

interface SearchProps {
    setSearch?: (search: string) => void;
}

export default function Search({ setSearch }: SearchProps) {
    const { primaryColor, secondaryColor } = useThemeContext();
    const [isFocused, setIsFocused] = useState(false); 
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Icon IconPassed={IoSearch} isButton={true} classNameButton="lg:!hidden"/>                

            <div className="relative w-full max-w-xs cursor-text hidden lg:block">
                <label
                    htmlFor="search"
                    style={{ backgroundColor: primaryColor }}
                    className={`cursor-text absolute left-4 text-white font-semibold transition-all ${
                        isFocused
                        ? "top-[-8px] font-normal text-xs"
                        : "top-[10px] -translate-y-[5px] text-base"
                    }`}
                >
                    Pesquisa
                </label>
                <input
                    id="search"
                    ref={inputRef}
                    type="text"
                    style={{ borderColor: secondaryColor }}
                    className="w-full pl-4 pr-10 h-[36px] text-white text-sm font-semibold border-2 rounded-md bg-transparent focus:outline-none"
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => setIsFocused(e.target.value !== "")}
                    onChange={(e) => setSearch && setSearch(e.target.value)}
                />
                <IoSearch
                    color={secondaryColor}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none"
                />
            </div>  
        </>
    );
}
import { Button, Typography } from "@mui/material";
import { HiOutlineFilter } from "react-icons/hi";
import Icon from "../Icon";
import { IoSearch } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { useThemeContext } from "@/hooks/useTheme";
import { useState } from "react";

export default function TableHeader() {
  const { primaryColor, secondaryColor } = useThemeContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div
          style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
          className="w-full max-w-[1024px] p-3 flex justify-between items-center"
        >
          <Typography variant="sm_text_bold" color="white">
            Conselho
          </Typography>
          <div className="hidden md:flex ml-[100px] lg:ml-[15%] gap-[12rem] big:ml-[11%] big:gap-[12.5rem]">
            <span className="hidden md:block ">
              <Typography variant="sm_text_bold" color="white">
                Data
              </Typography>
            </span>
            <span className="hidden lg:block ">
              <Typography variant="sm_text_bold" color="white">
                Horario
              </Typography>
            </span>
          </div>
          <div className="flex gap-2">
            <button
              style={{ backgroundColor: secondaryColor }}
              className="text-black rounded-small w-[36px] md:w-[53px] h-[36px] flex justify-center items-center"
            >
              <Icon IconPassed={HiOutlineFilter} color="black" />
            </button>
            <span className="block">
              <button
                style={{ backgroundColor: secondaryColor }}
                className="text-black rounded-small w-[36px] h-[36px] flex justify-center items-center"
              >
                <Icon IconPassed={VscSettings} color="black" />
              </button>
            </span>
            <span className="md:hidden">
              <button
                style={{ backgroundColor: secondaryColor }}
                className="text-black rounded-small w-[36px] h-[36px] flex justify-center items-center"
              >
                <Icon IconPassed={IoSearch} color="black" />
              </button>
            </span>
            <div className="hidden md:block relative w-full max-w-xs">
              <label
                className={`absolute left-4 text-white font-semibold transition-all ${
                  isFocused
                    ? "top-[-8px] font-normal text-xs"
                    : "top-[10px] -translate-y-[5px] text-base"
                }`}
              >
                Pesquisa
              </label>
              <input
                type="text"
                style={{ borderColor: secondaryColor }}
                className="w-full big:w-full pl-4 pr-10 h-[36px] text-white text-sm font-semibold border-2 rounded-md bg-transparent focus:outline-none"
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => setIsFocused(e.target.value !== "")}
              />
              <IoSearch
                color={secondaryColor}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

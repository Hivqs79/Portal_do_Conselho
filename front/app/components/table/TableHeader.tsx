"use client";
import { useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { HiOutlineFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "../Icon";
import Rank from "../rank/Rank";

interface TableHeaderProps {
  variant: "Table" | "council";
  setSearchTerm?: (term: string) => void;
}

export default function TableHeader({
  variant,
  setSearchTerm,
}: TableHeaderProps) {
  const { primaryColor, secondaryColor, whiteColor, textDarkColor } =
    useThemeContext();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (variant == "Table") {
    return (
      <thead
        style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
        className="max-w-[1024px]"
      >
        <tr className="w-full flex justify-between items-center p-3">
          <th className="flex w-full md:w-[100px] xl:w-[200px] p-0">
            <Typography variant="sm_text_bold" color="white">
              Turma
            </Typography>
          </th>
          <th className="hidden md:flex">
            <span className="w-[100px] p-0">
              <Typography variant="sm_text_bold" color="white">
                Data
              </Typography>
            </span>
          </th>
          <th className="hidden lg:flex text-center">
            <span className="w-[100px] hidden lg:block p-0">
              <Typography variant="sm_text_bold" color="white">
                Horario
              </Typography>
            </span>
          </th>
          <th className="flex gap-2 md:w-[300px] justify-end">
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

            <div className="relative w-full max-w-xs cursor-text hidden md:block">
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
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              />
              <IoSearch
                color={secondaryColor}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none"
              />
            </div>
          </th>
        </tr>
      </thead>
    );
  }

  if (variant == "council") {
    return (
      <>
        <thead
          style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
          className="max-w-[1024px] rounded-big"
        >
          <tr className="w-full flex flex-wrap gap-5 justify-between items-center p-3">
            <th className="flex w-full md:w-[250px] p-0">
              <Typography variant="sm_text_bold" color="white">
                Feedback da turma no geral
              </Typography>
            </th>
            <th className="">
              <span className="flex justify-start items-center gap-5 flex-wrap">
                <span className="p-0 flex justify-center items-center gap-2">
                  <Typography variant="sm_text_bold" color={whiteColor}>
                    Classificar turma
                  </Typography>
                  <Rank
                    variant="council"
                    outline={false}
                    type="none"
                    popover={true}
                  />
                </span>
                <span>
                  <Button variant="contained" color={`secondary`}>
                    <Typography variant="sm_text_bold" color={textDarkColor}>
                      Ver anotações
                    </Typography>
                  </Button>
                </span>
              </span>
            </th>
          </tr>
        </thead>
      </>
    );
  }
}

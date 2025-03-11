"use client";
import { useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { HiOutlineFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "../Icon";
import Search from "./Search";
import Rank from "../rank/Rank";

interface TableHeaderProps {
  variant: "Table" | "council";
  searchInput?: boolean;
  setSearchTerm?: (term: string) => void;
  filterButton?: boolean;
  setFilter?: (filter: boolean) => void;
  orderButton?: boolean;
  setOrder?: (order: boolean) => void;  
}

export default function TableHeader({
  variant,
  setSearchTerm,
  searchInput = false,
  setFilter,
  filterButton = false,
  setOrder,
  orderButton = false,

}: TableHeaderProps) {
  const { primaryColor, whiteColor, textDarkColor } = useThemeContext();   

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
            { filterButton && <Icon IconPassed={HiOutlineFilter} isButton={true} />}                        
            { orderButton && <Icon IconPassed={VscSettings} isButton={true} />}
            { searchInput && <Search setSearchTerm={setSearchTerm}/>}
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

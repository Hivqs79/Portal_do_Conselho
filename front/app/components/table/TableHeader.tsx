"use client";
import { Button, Typography } from "@mui/material";
import { HiOutlineFilter } from "react-icons/hi";
import { VscSettings } from "react-icons/vsc";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "../Icon";
import Search from "./Search";
import Rank from "../rank/Rank";
import { TableHeaderContent } from "@/interfaces/TableHeaderContent";

interface TableHeaderProps {
  variant: "Table" | "council";
  headers: TableHeaderContent[];
  headerButtons: TableHeaderButtons;   
}

export default function TableHeader({
  variant,
  headers,
  headerButtons,

}: TableHeaderProps) {
  const { primaryColor, whiteColor, textDarkColor } = useThemeContext();   
  const {filterButton, 
    orderButton, 
    searchInput, 
    setSearch,
    setFilter,
    setOrder
  } = headerButtons;

  if (variant == "Table") {
    return (
      <thead style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="w-full">
        <tr className="flex justify-between items-center p-3">
            {headers.map((header, index) => (
                <th key={index} 
                    className={(index !== 0 ?                                                           
                                (index === 1 ? `hidden lg:justify-center md:flex md:flex-1`             //the second 
                              : `hidden justify-center lg:flex lg:flex-1`)                              //the third
                                : `flex flex-1`)                                                        //the first
                                + ` p-0`}                                                               //all
                > 
                    <Typography variant="sm_text_bold" color={whiteColor} className={(index === 1 ? `md:pl-6 lg:pl-0` : ``)}>
                        {header.name}
                    </Typography>
                </th>
            ))}
            <th className="flex gap-2 w-2/5 lg:w-1/3 justify-end">
                {filterButton && <Icon IconPassed={HiOutlineFilter} isButton={true} />}
                {orderButton && <Icon IconPassed={VscSettings} isButton={true} />}
                {searchInput && <Search setSearch={setSearch} />}
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

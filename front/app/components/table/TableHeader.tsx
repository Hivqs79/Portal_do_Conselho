/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import { useCallback, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { HiOutlineFilter } from "react-icons/hi";
import { VscSettings } from "react-icons/vsc";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "../Icon";
import Search from "./Search";
import Rank from "../rank/Rank";
import { Decryptor } from "@/encryption/Decryptor";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { Rank as RankType } from "@/interfaces/RankType";

interface TableHeaderProps {
  variant: "table" | "council" | "annotation" | "pre-council";
  headers: TableHeaderContent[];
  headerButtons: TableHeaderButtons;
  rank?: RankType;
  openCommentsModal?: (open: boolean) => void;
}

export default function TableHeader({
  variant,
  headers,
  headerButtons,
  rank: rankProp,
  openCommentsModal,
}: TableHeaderProps) {
  const [actualRank, setActualRank] = useState(rankProp);

  const { primaryColor, whiteColor, textDarkColor, colorByModeSecondary } = useThemeContext();
  const {
    filterButton,
    orderButton,
    searchInput,
    setSearch,
    // setFilter,
    // setOrder,
    setRank,
    rank,
    rankText,
    rankVisualizer,
  } = headerButtons;

  useEffect(() => {
    const savedRank = localStorage.getItem("rank");
    if (savedRank !== null) {
      const decryptedRank = Decryptor(savedRank);
      if (decryptedRank && decryptedRank.rank) {
        setActualRank(decryptedRank.rank);
      }
    }
  }, []);

  const openModal = () => {
    if (openCommentsModal) {
      openCommentsModal(true);
    }
  };

  const handleRankChange = useCallback(() => {
    if (setRank && variant !== "annotation" && variant !== "pre-council" && actualRank) {
      setRank(actualRank)
    };
   }, [actualRank, setRank, variant])

  useEffect(() => {     
    handleRankChange();
  }, [handleRankChange]);

  if (variant == "table" || variant == "annotation" || variant == "pre-council") {
    return (
      <thead
        style={{ backgroundColor: primaryColor, boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}` }}
        className="flex justify-between w-full rounded-t-big"
      >
        <tr className={"flex w-full justify-between items-center p-3 " + (variant == "annotation" ? " px-5" : "") + (variant == "pre-council" ? " p-6" : "")}>
          {headers.map((header, index) => (
            <th
              key={index}
              className={
                (index !== 0
                  ? index === 1
                    ? `hidden lg:justify-center md:flex md:flex-1`
                    : `hidden justify-center lg:flex lg:flex-1`
                  : `flex flex-1`) + ` p-0`
              }
            >
              <Typography
                variant="md_text_bold"
                color={whiteColor}
                className={index === 1 ? `md:pl-6 lg:pl-0` : ``}
              >
                {header.name}
              </Typography>
            </th>
          ))}
          <th className="flex items-center gap-2 w-2/5 lg:w-1/3 justify-end">
            {rank && (
              <>
                <Typography variant="md_text_bold" color={whiteColor} className="hidden sm:flex">
                  {rankText}
                </Typography>
                <Rank variant="annotation" outline={false} popover={rankVisualizer ? false : true} type={rank} onRankChange={setRank} />
              </>
            )}
            {filterButton && (
              <Icon IconPassed={HiOutlineFilter} isButton={true} />
            )}
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
          style={{ backgroundColor: primaryColor, boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}` }}
          className="max-w-[1024px] rounded-t-big"
        >
          <tr className="w-full flex flex-wrap gap-5 justify-between items-center p-3 lg:px-6">
            <th className="flex flex-1 w-full md:w-[250px] p-0">
              <Typography variant="sm_text_bold" color={whiteColor}>
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
                    type={actualRank ? actualRank : "NONE"}
                    popover={true}
                    onRankChange={setActualRank}
                  />
                </span>
                <span onClick={openModal}>
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
